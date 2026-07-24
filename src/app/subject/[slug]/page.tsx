'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SUBJECTS } from '@/lib/data';
import { ArrowLeft, PlayCircle, BookOpen, Clock, ChevronDown } from 'lucide-react';
import { Header, Footer } from '@/components/Navigation';

export default function SubjectPage() {
  const { slug } = useParams();
  const subject = SUBJECTS.find((s) => s.slug === slug);
  const storageKey = `openChapters_${slug}`;

  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const saved = sessionStorage.getItem(storageKey);
    if (saved) {
      try { setOpenChapters(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, [storageKey]);

  React.useEffect(() => {
    sessionStorage.setItem(storageKey, JSON.stringify(openChapters));
  }, [openChapters, storageKey]);

  if (!subject) return <div className="p-10 text-center">Mata Pelajaran tidak ditemukan.</div>;

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{subject.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl">{subject.description}</p>
          </div>

          <div className="space-y-4">
            {subject.chapters.map((chapter) => {
              const isOpen = openChapters[chapter.id] ?? false;

              return (
                <div key={chapter.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
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
                            <Link href={`/simulation/${topic.simulationType}`} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-all whitespace-nowrap">
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
