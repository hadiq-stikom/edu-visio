'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { SUBJECTS, Subject } from '@/lib/data';
import { SubjectIcon } from '@/components/SubjectIcon';
import { BookOpen, Search, ArrowRight, Compass, HelpCircle } from 'lucide-react';

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const validCategories = ['MIPA', 'IPS', 'Keagamaan', 'Umum'];
  const initialCategory: 'Semua' | 'MIPA' | 'IPS' = validCategories.includes(categoryParam as any) ? (categoryParam as 'MIPA' | 'IPS') : 'Semua';

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<typeof initialCategory>(initialCategory);

  useEffect(() => {
    if (validCategories.includes(categoryParam as any)) {
      setActiveTab(categoryParam as 'MIPA' | 'IPS');
    } else {
      setActiveTab('Semua');
    }
  }, [categoryParam]);

const filteredSubjects = SUBJECTS.filter((subject) => {
  const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        subject.description.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory = activeTab === 'Semua' || subject.category === activeTab;
  return matchesSearch && matchesCategory;
});

const totalTopics = (subject: Subject) => subject.chapters.reduce((sum, chapter) => sum + chapter.topics.length, 0);

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-4 border border-emerald-200/50 dark:border-emerald-800/30">
            <Compass className="h-3.5 w-3.5" />
            Eksplorasi Sains & Sosial Secara Visual
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Media Pembelajaran <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">Interaktif</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Platform visualisasi konsep abstrak untuk siswa Madrasah Aliyah. Belajar lebih menyenangkan melalui modul interaktif dan simulasi grafis langsung.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm max-w-4xl mx-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari mata pelajaran atau topik..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-950 text-sm border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto justify-start md:justify-end">
            {(['Semua', 'MIPA', 'IPS'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15'
                    : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60'
                }`}
              >
                {tab === 'Semua' ? 'Semua Kategori' : `${tab}`}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Subjects */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject) => (
              <div
                key={subject.id}
                className={`group relative flex flex-col justify-between bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800/80 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 ${subject.colorTheme.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3.5 rounded-2xl ${subject.colorTheme.bg} ${subject.colorTheme.text} transition-all group-hover:scale-110`}>
                      <SubjectIcon name={subject.iconName} className="h-7 w-7" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${subject.colorTheme.badge}`}>
                      {subject.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {subject.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {totalTopics(subject)} Modul Interaktif
                    </span>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                      <BookOpen className="h-3 w-3" /> Ready
                    </span>
                  </div>

                  <Link
                    href={`/subject/${subject.slug}`}
                    className="flex items-center justify-center gap-1.5 w-full bg-gray-50 dark:bg-gray-950 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white text-gray-700 dark:text-gray-300 font-semibold text-sm py-3 px-4 rounded-xl border border-gray-100 dark:border-gray-800/80 transition-all group-hover:border-emerald-600"
                  >
                    Buka Modul Pembelajaran
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm max-w-lg mx-auto">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Mata Pelajaran Tidak Ditemukan</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Silakan periksa kata kunci pencarian Anda atau gunakan filter kategori yang lain.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
