"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Trophy, User } from 'lucide-react';

export default function MobileNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Beranda', href: '/', icon: Home },
    { name: 'Jelajah', href: '#', icon: Compass },
    { name: 'Peringkat', href: '#', icon: Trophy },
    { name: 'Profil', href: '#', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <div 
                className={`p-1.5 rounded-full transition-colors ${
                  isActive 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'fill-emerald-600/20' : ''}`} />
              </div>
              <span 
                className={`text-[10px] font-medium ${
                  isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
