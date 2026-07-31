import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Compass, Layers } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
              <Image src="/logo.png" alt="EduVisio Logo" width={40} height={40} className="object-cover scale-110" />
            </div>
            <div>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-teal-400">
                EduVisio
              </span>
              <span className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Madrasah Aliyah
              </span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
            Mata Pelajaran
          </Link>
          <Link href="/?category=MIPA" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
            MIPA
          </Link>
          <Link href="/?category=IPS" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
            IPS
          </Link>
          <Link href="/?category=AGAMA" className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors dark:text-gray-300 dark:hover:text-emerald-400">
            AGAMA
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/30">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            EduVisio Beta
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-950 mt-auto">
      <div className="container mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-emerald-600">EduVisio</span> - Media Pembelajaran Interaktif & Simulasi Kreatif Madrasah Aliyah.
        </p>
      </div>
    </footer>
  );
};
