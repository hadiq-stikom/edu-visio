'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Play, RefreshCw, Trophy, ArrowRight, CheckCircle2, XCircle, Settings2, Wand2 } from 'lucide-react';

interface Verb {
  id: string;
  malum: string;
  majhul: string;
  translation: string;
  tense: 'madhi' | 'mudhari';
  steps: {
    title: string;
    description: string;
    state: string;
  }[];
}

const verbsData: Verb[] = [
  { 
    id: 'v1', 
    malum: 'كَتَبَ', 
    majhul: 'كُتِبَ', 
    translation: 'Menulis / Ditulis', 
    tense: 'madhi',
    steps: [
      { title: 'Bentuk Asal (Ma\'lum)', description: 'Kata kerja aktif lampau dengan harakat normal.', state: 'كَتَبَ' },
      { title: 'Dammah di Awal', description: 'Didammahkan huruf pertamanya (Ka ➔ Ku).', state: 'كُتَبَ' },
      { title: 'Kasrah Sebelum Akhir', description: 'Dikasrahkan huruf sebelum akhir (Ta ➔ Ti).', state: 'كُتِبَ' },
    ]
  },
  { 
    id: 'v2', 
    malum: 'يَكْتُبُ', 
    majhul: 'يُكْتَبُ', 
    translation: 'Sedang menulis / Sedang ditulis', 
    tense: 'mudhari',
    steps: [
      { title: 'Bentuk Asal (Ma\'lum)', description: 'Kata kerja aktif sekarang/akan datang.', state: 'يَكْتُبُ' },
      { title: 'Dammah di Awal', description: 'Didammahkan huruf mudhara\'ah pertama (Ya ➔ Yu).', state: 'يُكْتُبُ' },
      { title: 'Fathah Sebelum Akhir', description: 'Difathahkan huruf sebelum akhir (Tu ➔ Ta).', state: 'يُكْتَبُ' },
    ]
  },
  { 
    id: 'v3', 
    malum: 'فَتَحَ', 
    majhul: 'فُتِحَ', 
    translation: 'Membuka / Dibuka', 
    tense: 'madhi',
    steps: [
      { title: 'Bentuk Asal', description: 'Kata kerja aktif lampau.', state: 'فَتَحَ' },
      { title: 'Dammah di Awal', description: 'Didammahkan huruf pertama (Fa ➔ Fu).', state: 'فُتِحَ' },
      { title: 'Kasrah Sebelum Akhir', description: 'Dikasrahkan huruf sebelum akhir (Ta ➔ Ti).', state: 'فُتِحَ' },
    ]
  },
  { 
    id: 'v4', 
    malum: 'يَفْتَحُ', 
    majhul: 'يُفْتَحُ', 
    translation: 'Sedang membuka / Sedang dibuka', 
    tense: 'mudhari',
    steps: [
      { title: 'Bentuk Asal', description: 'Kata kerja aktif sekarang.', state: 'يَفْتَحُ' },
      { title: 'Dammah di Awal', description: 'Didammahkan huruf pertama (Ya ➔ Yu).', state: 'يُفْتَحُ' },
      { title: 'Fathah Sebelum Akhir', description: 'Difathahkan huruf sebelum akhir (Ta ➔ Ta).', state: 'يُفْتَحُ' },
    ]
  }
];

interface QuizItem {
  id: string;
  sentenceMalum: string;
  sentenceTranslation: string;
  options: string[];
  correct: string;
  explanation: string;
}

const quizData: QuizItem[] = [
  {
    id: 'q1',
    sentenceMalum: 'كَتَبَ الطَّالِبُ الرِّسَالَةَ',
    sentenceTranslation: 'Siswa itu menulis surat.',
    options: ['كُتِبَتْ الرِّسَالَةُ', 'كُتِبَ الرِّسَالَةَ', 'يُكْتَبُ الرِّسَالَةُ'],
    correct: 'كُتِبَتْ الرِّسَالَةُ',
    explanation: 'Subjek (Siswa) dibuang. Objek (ar-risalah) adalah feminin, sehingga kata kerja pasif madhi disesuaikan menjadi feminin (kutibat) dan harakat objek berubah menjadi marfu\' (dammah).'
  },
  {
    id: 'q2',
    sentenceMalum: 'يَفْتَحُ عَلِيٌّ الْبَابَ',
    sentenceTranslation: 'Ali sedang membuka pintu.',
    options: ['يُفْتَحُ الْبَابُ', 'فُتِحَ الْبَابُ', 'يَفْتَحُ الْبَابَ'],
    correct: 'يُفْتَحُ الْبَابُ',
    explanation: 'Fi\'il mudhari\' aktif (yaftahu) diubah menjadi pasif (yuftahu) karena objek (al-bab) adalah maskulin. Harakat objek berubah menjadi dammah (naibul fa\'il).'
  },
  {
    id: 'q3',
    sentenceMalum: 'قَرَأَ مُحَمَّدٌ الْكِتَابَ',
    sentenceTranslation: 'Muhammad telah membaca buku itu.',
    options: ['قُرِئَ الْكِتَابُ', 'قُرِئَتْ الْكِتَابُ', 'يُقْرَأُ الْكِتَابُ'],
    correct: 'قُرِئَ الْكِتَابُ',
    explanation: 'Fi\'il madhi pasif dari qara\'a adalah quri\'a. Buku (al-kitab) adalah maskulin dan mendapatkan harakat dammah.'
  }
];

export default function ArabicYouthModule() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game'>('intro');
  const [selectedVerb, setSelectedVerb] = useState<Verb>(verbsData[0]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startTransformAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStep(0);

    setTimeout(() => setCurrentStep(1), 1000); // dammah first
    setTimeout(() => setCurrentStep(2), 2500); // kasrah/fathah next
    setTimeout(() => {
      setIsAnimating(false);
    }, 3800);
  };

  useEffect(() => {
    setCurrentStep(0);
  }, [selectedVerb]);

  const handleAnswerSubmit = (option: string) => {
    if (showExplanation) return;
    setSelectedOption(option);
    setShowExplanation(true);
    if (option === quizData[currentQuestion].correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider mb-3 uppercase">
          Bab 2: Pemuda (الشباب)
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          Fi'il Mabni Ma'lum & Majhul
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Pahami perubahan kata kerja dari bentuk aktif (Ma'lum) menjadi pasif (Majhul) secara dinamis.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'intro'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 1. Konsep & Animasi AHA!
        </button>
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'game'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Play className="w-4 h-4" /> 2. Laboratorium Latihan
        </button>
      </div>

      {/* TAB 1: CONCEPT & MORPHING */}
      {activeTab === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Verb Selector */}
          <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            {verbsData.map(v => (
              <button
                key={v.id}
                onClick={() => { setSelectedVerb(v); }}
                className={`flex-1 min-w-[120px] py-2 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedVerb.id === v.id
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-700'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <span className="font-arabic block text-lg font-bold">{v.malum}</span>
                <span className="text-[10px] text-slate-400 font-normal">({v.translation.split('/')[0]})</span>
              </button>
            ))}
          </div>

          {/* Morphing Simulator Board */}
          <div className="bg-white dark:bg-slate-855 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  Visualizer Transformasi Harakat
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tipe: {selectedVerb.tense === 'madhi' ? 'Fi\'il Madhi (Lampau)' : 'Fi\'il Mudhari\' (Sekarang)'}
                </p>
              </div>
              <button
                onClick={startTransformAnimation}
                disabled={isAnimating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                <Wand2 className="w-4 h-4" /> Transform Verb!
              </button>
            </div>

            {/* AHA Animation Area */}
            <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[220px]">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                Verb Harakat Transmuter
              </div>

              {/* The changing Arabic Word */}
              <div className="relative z-10 py-6" dir="rtl">
                <span className="text-5xl sm:text-6xl font-arabic font-extrabold text-slate-100 flex gap-2">
                  {/* Step-by-step rendering with glowing harakats */}
                  {currentStep === 0 && (
                    <span className="animate-in fade-in zoom-in">{selectedVerb.steps[0].state}</span>
                  )}
                  {currentStep === 1 && (
                    <span className="animate-in fade-in text-blue-400">{selectedVerb.steps[1].state}</span>
                  )}
                  {currentStep >= 2 && (
                    <span className="animate-in fade-in text-emerald-400 font-bold drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      {selectedVerb.steps[2].state}
                    </span>
                  )}
                </span>
              </div>

              {/* Explanatory overlay */}
              <div className="mt-4 text-center h-16 flex flex-col justify-center items-center">
                <h4 className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-1">
                  {selectedVerb.steps[currentStep].title}
                </h4>
                <p className="text-sm font-mono text-blue-400 dark:text-blue-300 max-w-md">
                  {selectedVerb.steps[currentStep].description}
                </p>
              </div>

              {/* Steps Progress dots */}
              <div className="flex gap-2 mt-4">
                {selectedVerb.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentStep ? 'bg-blue-500 w-4' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Explanatory card of Kaidah */}
            <div className="p-5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 rounded-2xl">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 flex items-center gap-2">
                <Settings2 className="text-blue-500 w-4 h-4" /> Rumus Perubahan Harakat
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-350">Fi'il Madhi Majhul (Pasif Lampau):</p>
                  <p className="italic font-arabic text-right text-lg border-b pb-1 mb-1">يُضَمُّ أَوَّلُهُ وَيُكْسَرُ مَا قَبْلَ آخِرِهِ</p>
                  <p>Harkat huruf pertama diganti <strong>Dammah ( ُ )</strong>, dan harakat sebelum huruf terakhir diganti <strong>Kasrah ( ِ )</strong>.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-350">Fi'il Mudhari' Majhul (Pasif Sekarang):</p>
                  <p className="italic font-arabic text-right text-lg border-b pb-1 mb-1">يُضَمُّ أَوَّلُهُ وَيُفْتَحُ مَا قَبْلَ آخِرِهِ</p>
                  <p>Harkat huruf pertama diganti <strong>Dammah ( ُ )</strong>, dan harakat sebelum huruf terakhir diganti <strong>Fathah ( َ )</strong>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveTab('game')}
              className="flex items-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              Lanjutkan ke Latihan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PRACTICE */}
      {activeTab === 'game' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {!quizFinished ? (
            <div className="space-y-6">
              {/* Quiz Header Info */}
              <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-sm font-bold text-slate-500">
                  Pertanyaan {currentQuestion + 1} dari {quizData.length}
                </span>
                <div className="flex items-center gap-2">
                  <Trophy className="text-amber-500 w-5 h-5" />
                  <span className="font-bold text-slate-700 dark:text-slate-300">Skor: {score}</span>
                </div>
              </div>

              {/* The Active Sentence */}
              <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800/80 text-center space-y-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Bentuk Ma'lum (Aktif)</span>
                <h3 className="text-3xl font-arabic font-bold text-slate-800 dark:text-slate-100" dir="rtl">
                  {quizData[currentQuestion].sentenceMalum}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Arti: "{quizData[currentQuestion].sentenceTranslation}"
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {quizData[currentQuestion].options.map((option, idx) => {
                  const isCorrect = option === quizData[currentQuestion].correct;
                  const isSelected = option === selectedOption;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(option)}
                      disabled={showExplanation}
                      className={`
                        p-4 rounded-2xl border-2 text-right transition-all flex justify-between items-center cursor-pointer
                        ${showExplanation
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-300'
                            : isSelected
                              ? 'bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-950/20 dark:text-rose-300'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 opacity-60'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-slate-50'
                        }
                      `}
                    >
                      <span>
                        {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                      </span>
                      <span className="text-xl font-arabic font-bold" dir="rtl">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation section */}
              {showExplanation && (
                <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-300">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Pembahasan:</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {quizData[currentQuestion].explanation}
                  </p>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      {currentQuestion < quizData.length - 1 ? 'Pertanyaan Selanjutnya' : 'Lihat Hasil Akhir'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-10 space-y-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Latihan Selesai!</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Anda memperoleh total skor:</p>
                <div className="text-5xl font-black text-emerald-600 mt-3">{score} / {quizData.length * 10}</div>
              </div>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm mx-auto shadow-md transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Coba Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
