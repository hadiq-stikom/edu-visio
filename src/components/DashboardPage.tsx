'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SubjectIcon } from '@/components/SubjectIcon';
import { BookOpen, Search, ArrowRight, Compass, HelpCircle } from 'lucide-react';

interface ModuleCard {
  id: string;
  title: string;
  category: 'MIPA' | 'IPS' | 'AGAMA';
  slug: string;
  description: string;
  moduleCount: number;
  status: 'Ready' | 'Dalam Pengembangan';
  iconName: string;
  colorTheme: {
    bg: string;
    text: string;
    badge: string;
    border: string;
  };
}

type Grade = 'kelas-10' | 'kelas-11' | 'kelas-12';
type Category = 'Semua' | 'MIPA' | 'IPS' | 'AGAMA';

const modulesData: Record<Grade, ModuleCard[]> = {
  'kelas-10': [
    {
      id: 'mtk-10',
      title: 'Matematika',
      category: 'MIPA',
      slug: 'matematika',
      description: 'Eksponen, barisan & deret, trigonometri, sistem persamaan, fungsi kuadrat, dan peluang.',
      moduleCount: 29,
      status: 'Ready',
      iconName: 'Calculator',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
    {
      id: 'fis-10',
      title: 'Fisika',
      category: 'MIPA',
      slug: 'fisika',
      description: 'Gerak lurus, gaya dan gerak, hukum Newton, serta energi kinetik dan potensial.',
      moduleCount: 7,
      status: 'Ready',
      iconName: 'Atom',
      colorTheme: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
        border: 'hover:border-purple-500',
      },
    },
    {
      id: 'kim-10',
      title: 'Kimia',
      category: 'MIPA',
      slug: 'kimia',
      description: 'Struktur atom, tabel periodika, ikatan kimia, dan stoikiometri.',
      moduleCount: 6,
      status: 'Dalam Pengembangan',
      iconName: 'FlaskConical',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'bio-10',
      title: 'Biologi',
      category: 'MIPA',
      slug: 'biologi',
      description: 'Sel, jaringan, organisme, ekosistem, dan interaksi makhluk hidup.',
      moduleCount: 6,
      status: 'Dalam Pengembangan',
      iconName: 'Leaf',
      colorTheme: {
        bg: 'bg-green-500/10 dark:bg-green-500/20',
        text: 'text-green-600 dark:text-green-400',
        badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        border: 'hover:border-green-500',
      },
    },
    {
      id: 'eko-10',
      title: 'Ekonomi',
      category: 'IPS',
      slug: 'ekonomi',
      description: 'Kegiatan ekonomi, permintaan dan penawaran, serta sistem keuangan dasar.',
      moduleCount: 5,
      status: 'Dalam Pengembangan',
      iconName: 'TrendingUp',
      colorTheme: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
        border: 'hover:border-orange-500',
      },
    },
    {
      id: 'sos-10',
      title: 'Sosiologi',
      category: 'IPS',
      slug: 'sosiologi',
      description: 'Interaksi sosial, kelompok sosial, dan dinamika kehidupan bermasyarakat.',
      moduleCount: 5,
      status: 'Dalam Pengembangan',
      iconName: 'Users',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'geo-10',
      title: 'Geografi',
      category: 'IPS',
      slug: 'geografi',
      description: 'Pemetaan, atmosfer, hidrosfer, litospher, dan biosfer.',
      moduleCount: 5,
      status: 'Dalam Pengembangan',
      iconName: 'Globe',
      colorTheme: {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
        border: 'hover:border-cyan-500',
      },
    },
    {
      id: 'alquran-10',
      title: 'Alquran & Hadits',
      category: 'AGAMA',
      slug: 'alquran-hadits',
      description: 'Ilmu tafsir, ilmu hadits, dan pemahaman teks keagamaan.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-teal-500/10 dark:bg-teal-500/20',
        text: 'text-teal-600 dark:text-teal-400',
        badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
        border: 'hover:border-teal-500',
      },
    },
    {
      id: 'arab-10',
      title: 'Bahasa Arab',
      category: 'AGAMA',
      slug: 'bahasa-arab',
      description: 'Nahwu, sharaf, muhadatsah, dan pemahaman tata bahasa Arab.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'aqidah-10',
      title: 'Aqidah Akhlak',
      category: 'AGAMA',
      slug: 'aqidah-akhlak',
      description: 'Tauhid, akhlak terpuji, dan menjauhi akhlak tercela.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'ski-10',
      title: 'Sejarah Islam',
      category: 'AGAMA',
      slug: 'ski',
      description: 'Sejarah kebudayaan Islam dari masa Nabi hingga peradaban modern.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
  ],
  'kelas-11': [
    {
      id: 'mtk-11',
      title: 'Matematika',
      category: 'MIPA',
      slug: 'matematika',
      description: 'Fungsi komposisi, fungsi invers, dan matriks.',
      moduleCount: 4,
      status: 'Ready',
      iconName: 'Calculator',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
    {
      id: 'fis-11',
      title: 'Fisika',
      category: 'MIPA',
      slug: 'fisika',
      description: 'Usaha dan energi, impuls dan momentum, gerak melingkar, dan gravitasi.',
      moduleCount: 8,
      status: 'Ready',
      iconName: 'Atom',
      colorTheme: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
        border: 'hover:border-purple-500',
      },
    },
    {
      id: 'kim-11',
      title: 'Kimia',
      category: 'MIPA',
      slug: 'kimia',
      description: 'Termokimia, laju reaksi, kesetimbangan kimia, dan asam-basa.',
      moduleCount: 7,
      status: 'Dalam Pengembangan',
      iconName: 'FlaskConical',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'bio-11',
      title: 'Biologi',
      category: 'MIPA',
      slug: 'biologi',
      description: 'Sistem reproduksi, evolusi, bioteknologi, dan ekosistem.',
      moduleCount: 7,
      status: 'Dalam Pengembangan',
      iconName: 'Leaf',
      colorTheme: {
        bg: 'bg-green-500/10 dark:bg-green-500/20',
        text: 'text-green-600 dark:text-green-400',
        badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        border: 'hover:border-green-500',
      },
    },
    {
      id: 'eko-11',
      title: 'Ekonomi',
      category: 'IPS',
      slug: 'ekonomi',
      description: 'Pembangunan ekonomi, kebijakan fiskal dan moneter, serta perdagangan internasional.',
      moduleCount: 6,
      status: 'Dalam Pengembangan',
      iconName: 'TrendingUp',
      colorTheme: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
        border: 'hover:border-orange-500',
      },
    },
    {
      id: 'sos-11',
      title: 'Sosiologi',
      category: 'IPS',
      slug: 'sosiologi',
      description: 'Stratifikasi sosial, mobilitas sosial, dan perubahan sosial.',
      moduleCount: 6,
      status: 'Dalam Pengembangan',
      iconName: 'Users',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'geo-11',
      title: 'Geografi',
      category: 'IPS',
      slug: 'geografi',
      description: 'Tectonic plate, cuaca dan iklim, regional Indonesia, dan GIS.',
      moduleCount: 6,
      status: 'Dalam Pengembangan',
      iconName: 'Globe',
      colorTheme: {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
        border: 'hover:border-cyan-500',
      },
    },
    {
      id: 'alquran-11',
      title: 'Alquran & Hadits',
      category: 'AGAMA',
      slug: 'alquran-hadits',
      description: 'Kajian ayat dan hadits tingkat lanjut.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-teal-500/10 dark:bg-teal-500/20',
        text: 'text-teal-600 dark:text-teal-400',
        badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
        border: 'hover:border-teal-500',
      },
    },
    {
      id: 'arab-11',
      title: 'Bahasa Arab',
      category: 'AGAMA',
      slug: 'bahasa-arab',
      description: 'Pendalaman tata bahasa dan sastra Arab.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'aqidah-11',
      title: 'Aqidah Akhlak',
      category: 'AGAMA',
      slug: 'aqidah-akhlak',
      description: 'Kajian teologi Islam dan tasawuf dasar.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'ski-11',
      title: 'Sejarah Islam',
      category: 'AGAMA',
      slug: 'ski',
      description: 'Dinasti Islam dan penyebaran Islam di berbagai wilayah.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
  ],
  'kelas-12': [
    {
      id: 'mtk-12',
      title: 'Matematika',
      category: 'MIPA',
      slug: 'matematika',
      description: 'Transformasi fungsi, lingkaran, dan kombinatorik.',
      moduleCount: 12,
      status: 'Ready',
      iconName: 'Calculator',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
    {
      id: 'fis-12',
      title: 'Fisika',
      category: 'MIPA',
      slug: 'fisika',
      description: 'Listrik statis, arus & medan magnet, gelombang elektromagnetik, dan optik.',
      moduleCount: 12,
      status: 'Ready',
      iconName: 'Atom',
      colorTheme: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/20',
        text: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
        border: 'hover:border-purple-500',
      },
    },
    {
      id: 'kim-12',
      title: 'Kimia',
      category: 'MIPA',
      slug: 'kimia',
      description: 'Hidrokarbon, senyawa organik, polymer, elektrokimia, dan nuklir.',
      moduleCount: 10,
      status: 'Dalam Pengembangan',
      iconName: 'FlaskConical',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'bio-12',
      title: 'Biologi',
      category: 'MIPA',
      slug: 'biologi',
      description: 'Bioteknologi, pangan, imunologi, ekologi, dan kelestarian lingkungan.',
      moduleCount: 10,
      status: 'Dalam Pengembangan',
      iconName: 'Leaf',
      colorTheme: {
        bg: 'bg-green-500/10 dark:bg-green-500/20',
        text: 'text-green-600 dark:text-green-400',
        badge: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
        border: 'hover:border-green-500',
      },
    },
    {
      id: 'eko-12',
      title: 'Ekonomi',
      category: 'IPS',
      slug: 'ekonomi',
      description: 'Pertumbuhan dan pembangunan ekonomi, APBN, dan kebijakan fiskal.',
      moduleCount: 8,
      status: 'Dalam Pengembangan',
      iconName: 'TrendingUp',
      colorTheme: {
        bg: 'bg-orange-500/10 dark:bg-orange-500/20',
        text: 'text-orange-600 dark:text-orange-400',
        badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
        border: 'hover:border-orange-500',
      },
    },
    {
      id: 'sos-12',
      title: 'Sosiologi',
      category: 'IPS',
      slug: 'sosiologi',
      description: 'Globalisasi, masyarakat multikultural, konflik sosial, dan solusi.',
      moduleCount: 8,
      status: 'Dalam Pengembangan',
      iconName: 'Users',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'geo-12',
      title: 'Geografi',
      category: 'IPS',
      slug: 'geografi',
      description: 'Analisis spasial, dinamika kependudukan, mitigasi bencana, dan pemanfaatan.',
      moduleCount: 8,
      status: 'Dalam Pengembangan',
      iconName: 'Globe',
      colorTheme: {
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
        text: 'text-cyan-600 dark:text-cyan-400',
        badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
        border: 'hover:border-cyan-500',
      },
    },
    {
      id: 'alquran-12',
      title: 'Alquran & Hadits',
      category: 'AGAMA',
      slug: 'alquran-hadits',
      description: 'Analisis kontemporer ayat dan hadits.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-teal-500/10 dark:bg-teal-500/20',
        text: 'text-teal-600 dark:text-teal-400',
        badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
        border: 'hover:border-teal-500',
      },
    },
    {
      id: 'arab-12',
      title: 'Bahasa Arab',
      category: 'AGAMA',
      slug: 'bahasa-arab',
      description: 'Komunikasi lanjut dan penulisan karya ilmiah Arab.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-rose-500/10 dark:bg-rose-500/20',
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
        border: 'hover:border-rose-500',
      },
    },
    {
      id: 'aqidah-12',
      title: 'Aqidah Akhlak',
      category: 'AGAMA',
      slug: 'aqidah-akhlak',
      description: 'Penerapan akhlak dalam kehidupan modern.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/20',
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
        border: 'hover:border-amber-500',
      },
    },
    {
      id: 'ski-12',
      title: 'Sejarah Islam',
      category: 'AGAMA',
      slug: 'ski',
      description: 'Sejarah penyebaran Islam di Indonesia dan peradaban dunia.',
      moduleCount: 0,
      status: 'Dalam Pengembangan',
      iconName: 'BookOpen',
      colorTheme: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/20',
        text: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
        border: 'hover:border-blue-500',
      },
    },
  ],
};

const gradeLabels: Record<Grade, string> = {
  'kelas-10': 'Kelas 10',
  'kelas-11': 'Kelas 11',
  'kelas-12': 'Kelas 12',
};

const gradeOrder: Grade[] = ['kelas-10', 'kelas-11', 'kelas-12'];

export default function DashboardPage() {
  const [activeGrade, setActiveGrade] = useState<Grade>('kelas-12');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Semua');

  const filteredModules = modulesData[activeGrade].filter((mod) => {
    const matchesSearch =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || mod.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-10">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16 mt-4">
          {/* Left Text Column */}
          <div className="flex-1 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-6 border border-emerald-200/50 dark:border-emerald-800/30">
              <Compass className="h-3.5 w-3.5" />
              Belajar Sains, Sosial & Agama Lebih Seru!
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Pahami Konsep Sulit Jadi Lebih{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                Mudah
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Mari bawa pengalaman belajarmu ke level selanjutnya! EduVisio hadir menemanimu memahami konsep pelajaran sekolah secara mendalam lewat eksplorasi visual yang interaktif dan menyenangkan.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button 
                onClick={() => {
                  window.scrollTo({
                    top: document.getElementById('search-filter-section')?.offsetTop ? document.getElementById('search-filter-section')!.offsetTop - 100 : 500,
                    behavior: 'smooth'
                  });
                }}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Mulai Belajar Sekarang <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Right Image Column */}
          <div className="flex-1 w-full max-w-lg relative animate-fade-in-up">
            <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-500/10 border-4 border-white dark:border-gray-800/80 backdrop-blur-sm z-10">
               <Image 
                 src="/hero.png" 
                 alt="Siswa Madrasah Aliyah Belajar dengan EduVisio" 
                 fill
                 className="object-cover hover:scale-105 transition-transform duration-700"
                 priority
               />
            </div>
            
            {/* Decorative floating elements */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-tr from-teal-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Grade Tabs */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {gradeOrder.map((grade) => (
            <button
              key={grade}
              onClick={() => setActiveGrade(grade)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                activeGrade === grade
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
            >
              {gradeLabels[grade]}
            </button>
          ))}
        </div>

        {/* Search & Category Filter Bar */}
        <div id="search-filter-section" className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-sm max-w-5xl mx-auto">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Cari mata pelajaran atau topik..."
              className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-950 text-sm border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto justify-start md:justify-end">
            {(['Semua', 'MIPA', 'IPS', 'AGAMA'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${
                  activeCategory === tab
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/15'
                    : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/60'
                }`}
              >
                {tab === 'Semua' ? 'Semua Kategori' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Modules */}
        {filteredModules.length > 0 ? (
          <div key={`${activeGrade}-${activeCategory}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {filteredModules.map((mod) => (
              <div
                key={mod.id}
                className={`group relative flex flex-col justify-between bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200/80 dark:border-gray-800/80 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 ${mod.colorTheme.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`p-3.5 rounded-2xl ${mod.colorTheme.bg} ${mod.colorTheme.text} transition-all group-hover:scale-110`}
                    >
                      <SubjectIcon name={mod.iconName} className="h-7 w-7" />
                    </div>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${mod.colorTheme.badge}`}
                    >
                      {mod.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800/80 pt-4 mt-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {mod.moduleCount} Modul Interaktif
                    </span>
                    <span
                      className={`text-xs font-semibold flex items-center gap-1 px-2.5 py-1 rounded-lg ${
                        mod.status === 'Ready'
                          ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                      }`}
                    >
                      <BookOpen className="h-3 w-3" />
                      {mod.status}
                    </span>
                  </div>

                  <Link
                    href={`/subject/${mod.slug}-${activeGrade.split('-')[1]}`}
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
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Wah, pelajaran yang kamu cari belum ada nih.
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Coba periksa lagi kata kuncinya atau gunakan filter kategori yang lain ya!
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
