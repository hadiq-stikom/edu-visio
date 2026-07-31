"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Compass, Layers, Star, Moon, Sun } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';

export const Header = () => {
  const { totalScore, isMounted: isUserMounted } = useUser();
  const { theme, toggleTheme, isMounted: isThemeMounted } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 dark:border-gray-800">
              <Image src="/logo.png" alt="EduVisio Logo" width={40} height={40} className="object-cover scale-110" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-teal-400">
                EduVisio
              </span>
              <span className="hidden sm:inline-block ml-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Madrasah Aliyah
              </span>
            </div>
          </Link>
        </div>



        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Score Badge */}
          {isUserMounted && (
            <div className="flex shrink-0 whitespace-nowrap items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-bold text-xs sm:text-sm shadow-sm border border-amber-200 dark:border-amber-800/50">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-500 text-amber-500 shrink-0" />
              <span>{totalScore} PTS</span>
            </div>
          )}
          
          {/* Theme Toggle */}
          {isThemeMounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          )}
          
          <div className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/30 hidden sm:flex">
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
