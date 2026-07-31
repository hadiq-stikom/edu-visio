'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SUBJECTS, Subject } from '@/lib/data';
import { ArrowLeft, PlayCircle, Clock, ChevronDown } from 'lucide-react';
import { Header, Footer } from '@/components/Navigation';

const GRADE_MAP: Record<string, string> = {
  '10': 'Kelas 10',
  '11': 'Kelas 11',
  '12': 'Kelas 12',
};

function resolveSubject(slug: string): { subject: Subject | undefined; gradeLabel: string | null } {
  const direct = SUBJECTS.find((s) => s.slug === slug);
  if (direct) {
    const gradeMatch = slug.match(/-(\d{2})$/);
    const gradeLabel = gradeMatch ? (GRADE_MAP[gradeMatch[1]] ?? null) : null;
    return { subject: direct, gradeLabel };
  }
  return { subject: undefined, gradeLabel: null };
}

export default function SubjectPage() {
  const { slug } = useParams();
  const { subject, gradeLabel } = resolveSubject(slug as string);
  const storageKey = `openChapters_${slug}`;

  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    const lastOpened = sessionStorage.getItem(`${storageKey}_last`);
    
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        setOpenChapters(parsed); 
        
        // Auto-scroll to the last opened chapter
        setTimeout(() => {
          let targetId = lastOpened;
          if (!targetId || !parsed[targetId]) {
            targetId = Object.keys(parsed).find(k => parsed[k]) || null;
          }
          
          if (targetId) {
            const el = document.getElementById(targetId);
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
          }
        }, 150);
      } catch { /* ignore */ }
    }
    setIsLoaded(true);
  }, [storageKey]);

  React.useEffect(() => {
    if (isLoaded) {
      sessionStorage.setItem(storageKey, JSON.stringify(openChapters));
    }
  }, [openChapters, storageKey, isLoaded]);

  if (!subject) return <div className="p-10 text-center">Mata Pelajaran tidak ditemukan.</div>;

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => {
      const newState = {
        ...prev,
        [chapterId]: !prev[chapterId],
      };
      
      // Save this as the last interacted chapter if we are opening it
      if (newState[chapterId]) {
        sessionStorage.setItem(`${storageKey}_last`, chapterId);
      }
      
      return newState;
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 dark:bg-gray-950 py-10">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Dashboard
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{subject.name}</h1>
              {gradeLabel && (
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  {gradeLabel}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">{subject.description}</p>
          </div>

          <div className="space-y-4">
            {subject.chapters.map((chapter) => {
              const isOpen = openChapters[chapter.id] ?? false;

              return (
                <div id={chapter.id} key={chapter.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-8 rounded-full bg-emerald-500" />
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white">{chapter.title}</h2>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 space-y-4">
                      {chapter.topics.map((topic) => (
                        <div key={topic.id} className="bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">{topic.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{topic.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {topic.duration}</span>
                              <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">{topic.difficulty}</span>
                            </div>
                          </div>

                          {topic.hasSimulation ? (
                            <Link href={`/simulation/${topic.simulationType}`} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all whitespace-nowrap border border-transparent shadow-sm dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30 dark:hover:bg-emerald-500/20 dark:shadow-none">
                              <PlayCircle className="h-4 w-4" /> Mulai Simulasi
                            </Link>
                          ) : (
                            <span className="text-sm text-gray-400 font-medium px-4 py-2.5 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl whitespace-nowrap">
                              Hanya Teks
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
