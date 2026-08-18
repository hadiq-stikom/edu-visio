'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RefreshCw, Trophy, BookOpen, ArrowRight, HelpCircle, AlertCircle, Play } from 'lucide-react';

type WordType = 'noun' | 'adjective' | 'noun_def' | 'noun_indef';

interface Word {
  id: string;
  arabic: string;
  translation: string;
  type: WordType;
  gender: 'm' | 'f';
  definiteness: 'def' | 'indef';
  case: 'marfu' | 'mansub' | 'majrur';
}

interface Rule {
  id: string;
  name: string;
  description: string;
  validate: (w1: Word, w2: Word) => boolean;
}

const words: Word[] = [
  { id: 'w1', arabic: 'كُرَةُ', translation: 'Bola', type: 'noun_indef', gender: 'f', definiteness: 'indef', case: 'marfu' },
  { id: 'w2', arabic: 'الْقَدَمِ', translation: 'Kaki (Sepak)', type: 'noun_def', gender: 'm', definiteness: 'def', case: 'majrur' },
  { id: 'w3', arabic: 'الطَّالِبُ', translation: 'Siswa', type: 'noun', gender: 'm', definiteness: 'def', case: 'marfu' },
  { id: 'w4', arabic: 'الْجَدِيدُ', translation: 'Baru', type: 'adjective', gender: 'm', definiteness: 'def', case: 'marfu' },
  { id: 'w5', arabic: 'سَاحَةُ', translation: 'Lapangan', type: 'noun_indef', gender: 'f', definiteness: 'indef', case: 'marfu' },
  { id: 'w6', arabic: 'الْمَدْرَسَةِ', translation: 'Sekolah', type: 'noun_def', gender: 'f', definiteness: 'def', case: 'majrur' },
  { id: 'w7', arabic: 'رِيَاضَةٌ', translation: 'Olahraga', type: 'noun', gender: 'f', definiteness: 'indef', case: 'marfu' },
  { id: 'w8', arabic: 'فَرْدِيَّةٌ', translation: 'Individu', type: 'adjective', gender: 'f', definiteness: 'indef', case: 'marfu' },
];

const rules: Rule[] = [
  {
    id: 'idhafah',
    name: 'Idhafah (Kata Majemuk)',
    description: 'Mudhaf (tanpa Al, harakat bebas) + Mudhaf Ilaih (harakat Kasrah/Majrur).',
    validate: (w1, w2) => w1.type === 'noun_indef' && w2.case === 'majrur',
  },
  {
    id: 'naat',
    name: 'Na\'at & Man\'ut (Kata Sifat)',
    description: 'Kata sifat (Na\'at) harus mengikuti kata benda (Man\'ut) dalam jenis kelamin, jumlah, dan harakat akhir.',
    validate: (w1, w2) => 
      (w1.type === 'noun' || w1.type === 'noun_def' || w1.type === 'noun_indef') && 
      w2.type === 'adjective' && 
      w1.gender === w2.gender && 
      w1.definiteness === w2.definiteness && 
      w1.case === w2.case,
  }
];

export default function ArabicSportsModule() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game'>('intro');
  const [introTab, setIntroTab] = useState<'idhafah' | 'naat'>('idhafah');
  
  // Animation states for Intro - Idhafah
  const [idhafahStep, setIdhafahStep] = useState(0); // 0: separate, 1: merge & highlight, 2: change harakat, 3: completed
  const [isAnimatingIdhafah, setIsAnimatingIdhafah] = useState(false);

  // Animation states for Intro - Na'at Man'ut
  const [naatStep, setNaatStep] = useState(0); // 0: separate, 1: matching gender, 2: matching definiteness, 3: completed
  const [isAnimatingNaat, setIsAnimatingNaat] = useState(false);

  // Game states
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<{w1: Word, w2: Word, rule: Rule}[]>([]);
  const [feedback, setFeedback] = useState<{type: 'success'|'error', msg: string} | null>(null);
  const [availableWords, setAvailableWords] = useState<Word[]>([...words]);
  const [score, setScore] = useState(0);

  const startIdhafahAnimation = () => {
    if (isAnimatingIdhafah) return;
    setIsAnimatingIdhafah(true);
    setIdhafahStep(0);
    
    setTimeout(() => setIdhafahStep(1), 800);  // move closer & highlight
    setTimeout(() => setIdhafahStep(2), 2000); // transform harakat
    setTimeout(() => {
      setIdhafahStep(3); // finish
      setIsAnimatingIdhafah(false);
    }, 3500);
  };

  const startNaatAnimation = () => {
    if (isAnimatingNaat) return;
    setIsAnimatingNaat(true);
    setNaatStep(0);

    setTimeout(() => setNaatStep(1), 1000); // match gender (+ ta marbutah)
    setTimeout(() => setNaatStep(2), 2500); // match definiteness (remove Al, add tanwin)
    setTimeout(() => {
      setNaatStep(3); // finish
      setIsAnimatingNaat(false);
    }, 4000);
  };

  const handleWordClick = (word: Word) => {
    if (selectedWords.find(w => w.id === word.id)) {
      setSelectedWords(selectedWords.filter(w => w.id !== word.id));
      return;
    }

    if (selectedWords.length < 2) {
      const newSelection = [...selectedWords, word];
      setSelectedWords(newSelection);

      if (newSelection.length === 2) {
        checkMatch(newSelection[0], newSelection[1]);
      }
    }
  };

  const checkMatch = (w1: Word, w2: Word) => {
    let matchedRule: Rule | null = null;
    
    for (const rule of rules) {
      if (rule.validate(w1, w2)) {
        matchedRule = rule;
        break;
      }
    }

    if (matchedRule) {
      setFeedback({ type: 'success', msg: `Tepat! Anda menemukan susunan ${matchedRule.name}.` });
      setMatchedPairs([...matchedPairs, { w1, w2, rule: matchedRule }]);
      setAvailableWords(availableWords.filter(w => w.id !== w1.id && w.id !== w2.id));
      setScore(s => s + 10);
      setTimeout(() => {
        setSelectedWords([]);
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback({ type: 'error', msg: 'Susunan kurang tepat. Perhatikan kaidah Na\'at atau Idhafah.' });
      setTimeout(() => {
        setSelectedWords([]);
        setFeedback(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setAvailableWords([...words]);
    setMatchedPairs([]);
    setSelectedWords([]);
    setFeedback(null);
    setScore(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300">
      {/* Module Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wider mb-3 uppercase">
          Bab 1: Olahraga (الرياضة)
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          Idhafah & Na'at Man'ut
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Kuasai dua pilar utama pembentukan frase/kata majemuk dalam bahasa Arab secara interaktif.
        </p>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'intro'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 1. Konsep & Animasi AHA!
        </button>
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'game'
              ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Play className="w-4 h-4" /> 2. Laboratorium Latihan
        </button>
      </div>

      {/* TAB 1: INTRO / AHA ANIMATION */}
      {activeTab === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => { setIntroTab('idhafah'); setIdhafahStep(0); }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'idhafah'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Kaidah Idhafah (Kata Majemuk)
            </button>
            <button
              onClick={() => { setIntroTab('naat'); setNaatStep(0); }}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'naat'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Kaidah Na'at Man'ut (Kata Sifat)
            </button>
          </div>

          {/* Kaidah Idhafah Simulator */}
          {introTab === 'idhafah' && (
            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Bagaimana Idhafah Terbentuk?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Menggabungkan dua kata benda menjadi satu kesatuan makna (kepunyaan/jenis).
                  </p>
                </div>
                <button
                  onClick={startIdhafahAnimation}
                  disabled={isAnimatingIdhafah}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isAnimatingIdhafah ? 'animate-spin' : ''}`} />
                  Fuses & Morph!
                </button>
              </div>

              {/* The AHA Animating Board */}
              <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[180px]">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Visual Harakat Morpher
                </div>
                <div className="flex items-center gap-4 sm:gap-12 relative z-10 transition-all duration-700" dir="rtl">
                  {/* Word 1: Mudhaf */}
                  <div className={`flex flex-col items-center transition-all duration-700 ${
                    idhafahStep >= 1 ? '-translate-x-2 sm:-translate-x-4' : ''
                  }`}>
                    <div className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl shadow-lg relative flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl font-arabic font-bold text-slate-100 flex" dir="rtl">
                        كُـرَ
                        <span className={`transition-all duration-500 px-1 rounded ${
                          idhafahStep === 1 ? 'bg-amber-500/30 text-amber-300 animate-pulse' :
                          idhafahStep >= 2 ? 'bg-emerald-500/20 text-emerald-400' : ''
                        }`}>
                          {idhafahStep >= 2 ? 'ةُ' : 'ةٌ'}
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Mudhaf (Benda)</span>
                    </div>
                  </div>

                  {/* Plus or Arrow icon */}
                  <div className={`transition-all duration-500 text-slate-600 ${
                    idhafahStep >= 1 ? 'opacity-0 scale-75' : 'opacity-100'
                  }`}>
                    <span className="text-3xl font-bold text-slate-500 font-mono">+</span>
                  </div>

                  {/* Word 2: Mudhaf Ilaih */}
                  <div className={`flex flex-col items-center transition-all duration-700 ${
                    idhafahStep >= 1 ? 'translate-x-2 sm:translate-x-4' : ''
                  }`}>
                    <div className="bg-slate-800 border border-slate-700 text-white p-4 rounded-xl shadow-lg relative flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl font-arabic font-bold text-slate-100 flex" dir="rtl">
                        الْـقَـدَ
                        <span className={`transition-all duration-500 px-1 rounded ${
                          idhafahStep === 1 ? 'bg-blue-500/30 text-blue-300 animate-pulse' :
                          idhafahStep >= 2 ? 'bg-emerald-500/20 text-emerald-400' : ''
                        }`}>
                          {idhafahStep >= 2 ? 'مِ' : 'مُ'}
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Mudhaf Ilaih (Penerang)</span>
                    </div>
                  </div>
                </div>
                {/* Explanatory bubble overlay */}
                <div className="mt-6 text-center h-12 flex items-center justify-center">
                  <p className="text-sm font-mono text-emerald-400 animate-in fade-in duration-300 max-w-md">
                    {idhafahStep === 0 && "Dua kata terpisah dengan harakat normal."}
                    {idhafahStep === 1 && "Fusing! Perhatikan harakat akhir kedua kata yang disorot..."}
                    {idhafahStep === 2 && "💡 AHA! Tanwin pada Mudhaf hilang (ةٌ ➔ ةُ) & Mudhaf Ilaih berubah harakat ke Kasrah (مُ ➔ مِ)"}
                    {idhafahStep === 3 && "Satu kesatuan: كُرَةُ الْقَدَمِ (Bola Kaki / Sepak Bola)"}
                  </p>
                </div>
              </div>

              {/* Formula & Analogy Box */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/55 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-1.5">
                    <span className="text-emerald-500">🛡️</span> Syarat Mudhaf (Kata ke-1)
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Tidak boleh diawali Alif Lam (<code className="bg-slate-250 dark:bg-slate-800 px-1 rounded">الـ</code>).</li>
                    <li>Tidak boleh diakhiri Tanwin (<code className="bg-slate-250 dark:bg-slate-800 px-1 rounded">ً ٌ ٍ</code>).</li>
                    <li>Harakat akhir dinamis mengikuti kedudukan dalam kalimat.</li>
                  </ul>
                </div>
                <div className="p-4 bg-teal-50/55 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/50 rounded-2xl">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-1.5">
                    <span className="text-teal-500">🔒</span> Syarat Mudhaf Ilaih (Kata ke-2)
                  </h4>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-4">
                    <li>Harakat akhir wajib Kasrah (Majrur: <code className="bg-slate-250 dark:bg-slate-800 px-1 rounded">ـِ / ـٍ</code>).</li>
                    <li>Biasanya berbentuk ma'rifah (menggunakan <code className="bg-slate-250 dark:bg-slate-800 px-1 rounded">الـ</code>).</li>
                    <li>Menunjukkan kepemilikan atau spesifikasi dari kata pertama.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Kaidah Na\'at Man\'ut Simulator */}
          {introTab === 'naat' && (
            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Bagaimana Na'at Man'ut Bekerja?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Kata sifat (Na'at) selalu meniru kata benda (Man'ut) layaknya cermin.
                  </p>
                </div>
                <button
                  onClick={startNaatAnimation}
                  disabled={isAnimatingNaat}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-4 h-4 ${isAnimatingNaat ? 'animate-spin' : ''}`} />
                  Mirroring Action!
                </button>
              </div>

              {/* The AHA Animating Board */}
              <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[180px]">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Visual Mirroring Simulator
                </div>

                <div className="flex items-center gap-4 sm:gap-12 relative z-10 transition-all duration-700" dir="rtl">
                  {/* Word 1: Man'ut */}
                  <div className="flex flex-col items-center">
                    <div className="bg-slate-800 border-2 border-emerald-500/30 text-white p-4 rounded-xl shadow-lg relative flex flex-col items-center">
                      <span className="text-4xl sm:text-5xl font-arabic font-bold text-slate-100" dir="rtl">
                        رِيَاضَةٌ
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Man'ut (Benda)</span>
                    </div>
                  </div>

                  {/* Plus/Link indicator */}
                  <div className="text-slate-600">
                    <ArrowRight className="w-6 h-6 text-emerald-400 rotate-180" />
                  </div>

                  {/* Word 2: Na'at */}
                  <div className="flex flex-col items-center">
                    <div className={`p-4 rounded-xl shadow-lg relative flex flex-col items-center transition-all duration-500 ${
                      naatStep >= 1 ? 'bg-slate-800 border-2 border-emerald-500/60' : 'bg-slate-800 border border-slate-700 opacity-60'
                    }`}>
                      <span className="text-4xl sm:text-5xl font-arabic font-bold text-slate-100 flex items-center gap-0.5" dir="rtl">
                        {naatStep === 0 && 'فَرْدِيٌّ'}
                        {naatStep === 1 && (
                          <span className="flex">
                            فَرْدِيَّ
                            <span className="text-emerald-400 bg-emerald-500/20 px-0.5 rounded animate-bounce">ةٌ</span>
                          </span>
                        )}
                        {naatStep >= 2 && 'فَرْدِيَّةٌ'}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest mt-2">Na'at (Sifat)</span>
                    </div>
                  </div>
                </div>

                {/* Explanatory bubble overlay */}
                <div className="mt-6 text-center h-12 flex items-center justify-center">
                  <p className="text-sm font-mono text-emerald-400 animate-in fade-in duration-300 max-w-md">
                    {naatStep === 0 && "Kata benda feminin (رِيَاضَةٌ) & Kata sifat aslinya maskulin (فَرْدِيٌّ)."}
                    {naatStep === 1 && "💡 Gender Matching! Kata sifat otomatis menambah Ta' Marbutah (ةٌ) agar feminin."}
                    {naatStep === 2 && "💡 AHA! Keduanya selaras sempurna dalam Jenis (Feminim) & Tanwin (Indefinite)."}
                    {naatStep === 3 && "Satu Frasa: رِيَاضَةٌ فَرْدِيَّةٌ (Olahraga Individu)"}
                  </p>
                </div>
              </div>

              {/* The AHA points */}
              <div className="p-5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50 rounded-2xl">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-2 flex items-center gap-2">
                  <AlertCircle className="text-amber-500 w-4 h-4" /> 4 Keselarasan Wajib Na'at-Man'ut
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-400">
                  <div className="space-y-1">
                    <p><strong>1. Jenis Kelamin (Mudzakar/Muannats):</strong> Bila benda feminin (ada <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">ة</code>), sifat juga wajib feminin.</p>
                    <p><strong>2. Jumlah (Tunggal/Ganda/Jamak):</strong> Jika benda tunggal, kata sifat harus tunggal.</p>
                  </div>
                  <div className="space-y-1">
                    <p><strong>3. Kejelasan (Ma'rifah/Nakirah):</strong> Jika benda diawali <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">الـ</code>, sifat wajib memakainya juga.</p>
                    <p><strong>4. I'rab (Harakat Akhir):</strong> Jika benda berharakat dammah, sifat ikut dammah.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action button to continue */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveTab('game')}
              className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Lanjutkan ke Laboratorium Latihan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: GAME PRACTICE */}
      {activeTab === 'game' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Trophy className="text-amber-500 w-5 h-5" />
              <span className="font-bold text-slate-700 dark:text-slate-300">Skor: {score}</span>
            </div>
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Reset Latihan
            </button>
          </div>

          {/* Play Board */}
          <div className="relative min-h-[250px] bg-slate-100/50 dark:bg-slate-950/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-wrap gap-4 justify-center items-center">
            {availableWords.map(word => {
              const isSelected = selectedWords.find(w => w.id === word.id);
              return (
                <button
                  key={word.id}
                  onClick={() => handleWordClick(word)}
                  className={`
                    group relative flex flex-col items-center justify-center p-4 min-w-[120px] rounded-2xl transition-all duration-300 transform cursor-pointer
                    ${isSelected 
                      ? 'bg-emerald-500 text-white shadow-lg scale-110 -translate-y-2' 
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow border border-slate-200 dark:border-slate-800 hover:border-emerald-300 hover:shadow-md hover:-translate-y-1'
                    }
                  `}
                >
                  <span className="text-3xl font-bold font-arabic mb-1" dir="rtl">{word.arabic}</span>
                  <span className={`text-xs font-medium ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    {word.translation}
                  </span>
                  
                  {isSelected && (
                    <span className="absolute -top-2 -right-2 bg-emerald-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                      {selectedWords.findIndex(w => w.id === word.id) + 1}
                    </span>
                  )}
                </button>
              )
            })}

            {availableWords.length === 0 && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Luar Biasa!</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Anda berhasil memasangkan semua kata.</p>
              </div>
            )}
          </div>

          {/* Feedback Banner */}
          {feedback && (
            <div className={`
              p-4 rounded-xl flex items-center gap-3 transition-all duration-300 transform animate-in fade-in slide-in-from-top-2
              ${feedback.type === 'success' ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300' : 'bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300'}
            `}>
              {feedback.type === 'success' ? <CheckCircle2 className="w-5 h-5 animate-bounce" /> : <XCircle className="w-5 h-5 animate-pulse" />}
              <span className="font-semibold">{feedback.msg}</span>
            </div>
          )}

          {/* Matched Pairs Collection */}
          {matchedPairs.length > 0 && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 fade-in duration-500">
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="bg-slate-800 dark:bg-slate-700 text-white w-6 h-6 rounded-md flex items-center justify-center text-xs">
                  {matchedPairs.length}
                </span>
                Koleksi Berhasil
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {matchedPairs.map((pair, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-md transform transition hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-3">
                      <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">
                        {pair.rule.name}
                      </span>
                    </div>
                    <div className="flex justify-end gap-2 mb-1" dir="rtl">
                      <span className="text-3xl font-bold font-arabic">{pair.w1.arabic}</span>
                      <span className="text-3xl font-bold font-arabic text-emerald-200">{pair.w2.arabic}</span>
                    </div>
                    <div className="text-right text-sm text-emerald-100 font-medium">
                      {pair.w1.translation} {pair.w2.translation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
