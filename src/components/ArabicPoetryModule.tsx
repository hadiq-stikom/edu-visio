'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Play, RefreshCw, Trophy, ArrowRight, CheckCircle2, XCircle, Sparkles, Scale } from 'lucide-react';

interface RootVerb {
  id: string;
  root: string; // e.g. ح - س - ن
  base: string; // حَسُنَ
  tafdhil: string; // أَحْسَنُ
  translation: string;
}

const rootVerbs: RootVerb[] = [
  { id: 'v1', root: 'ح - س - ن', base: 'حَسُنَ', tafdhil: 'أَحْسَنُ', translation: 'Baik ➔ Lebih Baik' },
  { id: 'v2', root: 'ك - ب - ر', base: 'كَبُرَ', tafdhil: 'أَكْبَرُ', translation: 'Besar ➔ Lebih Besar / Terbesar' },
  { id: 'v3', root: 'ش - ه - ر', base: 'شَهُرَ', tafdhil: 'أَشْهَرُ', translation: 'Terkenal ➔ Lebih Terkenal' },
  { id: 'v4', root: 'ف - ض - ل', base: 'فَضُلَ', tafdhil: 'أَفْضَلُ', translation: 'Utama ➔ Lebih Utama' },
];

interface QuizItem {
  id: string;
  baseSentence: string;
  translation: string;
  options: string[];
  correct: string;
  explanation: string;
}

const quizData: QuizItem[] = [
  {
    id: 'q1',
    baseSentence: 'شِعْرُ الْمَدْحِ ... مِنْ شِعْرِ الرَّثَاءِ (فَضُلَ)',
    translation: 'Puisi pujian ... daripada puisi duka.',
    options: ['أَفْضَلُ', 'فُضْلَى', 'أَفْضَلَ'],
    correct: 'أَفْضَلُ',
    explanation: 'Dalam perbandingan menggunakan "min", wazan yang digunakan selalu "af\'alu" (mutilasi kasus marfu\' dengan dammah: afdhalu) tanpa terpengaruh gender subjek.'
  },
  {
    id: 'q2',
    baseSentence: 'خَدِيجَةُ هِيَ الْبِنْتُ ... فِي الْفَصْلِ (كَبُرَ)',
    translation: 'Khadijah adalah anak perempuan ... di kelas.',
    options: ['أَكْبَرُ', 'الْكُبْرَى', 'الْأَكْبَرُ'],
    correct: 'الْكُبْرَى',
    explanation: 'Untuk menunjukkan arti "paling/ter-" yang menyertai isim ma\'rifah feminin (al-bint), Isim Tafdhil harus mengikuti wazan "fu\'laa" (al-kubra).'
  },
  {
    id: 'q3',
    baseSentence: 'هَذَا الْكِتَابُ ... نَفْعًا مِنْ ذَلِكَ (نَفَعَ)',
    translation: 'Buku ini ... manfaatnya daripada itu.',
    options: ['أَنْفَعُ', 'نَافِعٌ', 'نَفْعًا'],
    correct: 'أَنْفَعُ',
    explanation: 'Pola komparatif umum menggunakan wazan "af\'alu", yaitu "anfa\'u" (lebih bermanfaat).'
  }
];

export default function ArabicPoetryModule() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game'>('intro');
  const [introTab, setIntroTab] = useState<'morph' | 'scale'>('morph');
  const [selectedVerb, setSelectedVerb] = useState<RootVerb>(rootVerbs[0]);
  const [morphStep, setMorphStep] = useState(0); // 0: base, 1: adding Alif, 2: finished
  const [isAnimating, setIsAnimating] = useState(false);

  // Comparison scale states
  const [leftWeight, setLeftWeight] = useState<string>('شِعْرُ الرَّثَاءِ');
  const [rightWeight, setRightWeight] = useState<string>('شِعْرُ الْمَدْحِ');
  const [scaleAngle, setScaleAngle] = useState(0); // in degrees: positive = right side heavier/better, negative = left side

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const startMorphAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setMorphStep(0);

    setTimeout(() => setMorphStep(1), 1000); // add alif prefix
    setTimeout(() => {
      setMorphStep(2); // fully morphed
      setIsAnimating(false);
    }, 2500);
  };

  const adjustScale = (option: 'right' | 'left' | 'equal') => {
    if (option === 'right') {
      setScaleAngle(10);
    } else if (option === 'left') {
      setScaleAngle(-10);
    } else {
      setScaleAngle(0);
    }
  };

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
        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold tracking-wider mb-3 uppercase">
          Bab 3: Puisi Arab (الشعر العربي)
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          Isim Tafdhil (إِسْمُ التَّفْضِيْلِ)
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Pelajari wazan perbandingan (lebih/paling) dalam bahasa Arab secara interaktif.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'intro'
              ? 'border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" /> 1. Konsep & Animasi AHA!
        </button>
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === 'game'
              ? 'border-rose-500 text-rose-600 dark:text-rose-400 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Play className="w-4 h-4" /> 2. Laboratorium Latihan
        </button>
      </div>

      {/* TAB 1: INTRO */}
      {activeTab === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => setIntroTab('morph')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'morph'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Wazan Morphing (أَفْعَلُ)
            </button>
            <button
              onClick={() => setIntroTab('scale')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'scale'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Timbangan Komparasi (مِنْ)
            </button>
          </div>

          {/* Morphing Concept Simulator */}
          {introTab === 'morph' && (
            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Bagaimana Isim Tafdhil Dibentuk?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Mengambil 3 huruf akar (Tsulatsi) dan memasukkannya ke cetakan Wazan <code className="font-bold">أَفْعَلُ</code>.
                  </p>
                </div>
                <button
                  onClick={startMorphAnimation}
                  disabled={isAnimating}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Morph into Tafdhil!
                </button>
              </div>

              {/* Selector for Verb Roots */}
              <div className="flex gap-2 flex-wrap">
                {rootVerbs.map(v => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVerb(v); setMorphStep(0); }}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedVerb.id === v.id
                        ? 'bg-rose-50 border-rose-350 text-rose-600 dark:bg-rose-950/20 dark:border-rose-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {v.base} ({v.translation.split(' ➔ ')[0]})
                  </button>
                ))}
              </div>

              {/* Animating Board */}
              <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center min-h-[200px]">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Wazan Transmuter
                </div>

                <div className="flex items-center gap-8 z-10" dir="rtl">
                  {/* Visual letters */}
                  <div className="text-5xl sm:text-6xl font-arabic font-extrabold text-slate-100 flex items-center gap-1">
                    {morphStep === 0 && (
                      <span className="animate-in fade-in">{selectedVerb.base}</span>
                    )}
                    {morphStep === 1 && (
                      <span className="animate-in fade-in flex">
                        <span className="text-rose-400 font-black animate-pulse">أَ</span>
                        <span>{selectedVerb.base}</span>
                      </span>
                    )}
                    {morphStep === 2 && (
                      <span className="animate-in fade-in text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        {selectedVerb.tafdhil}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-6 text-center h-12 flex items-center justify-center">
                  <p className="text-sm font-mono text-rose-400 animate-in fade-in duration-300 max-w-md">
                    {morphStep === 0 && `Kata dasar: ${selectedVerb.base} (Akar: ${selectedVerb.root})`}
                    {morphStep === 1 && "Menambahkan Alif Hamzah (أَ) di depan kata..."}
                    {morphStep === 2 && `💡 AHA! Menjadi ${selectedVerb.tafdhil} (Wazan أَفْعَلُ) yang berarti "${selectedVerb.translation.split(' ➔ ')[1]}"`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Comparison Scale */}
          {introTab === 'scale' && (
            <div className="bg-white dark:bg-slate-855 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  Timbangan Perbandingan (Min / مِـنْ)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Isim Tafdhil membandingkan dua subjek. Gunakan kata "Min" (مِنْ) untuk menyatakan "daripada".
                </p>
              </div>

              {/* The Visual Scale */}
              <div className="bg-slate-950 rounded-2xl p-8 flex flex-col justify-center items-center min-h-[250px] relative overflow-hidden">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Timbangan Neraca Komparatif
                </div>

                {/* Scale base and balance bar */}
                <div className="w-full max-w-md flex flex-col items-center mt-6">
                  {/* Balance bar */}
                  <div 
                    className="w-64 h-2 bg-slate-700 rounded-full relative transition-all duration-700 ease-out"
                    style={{ transform: `rotate(${scaleAngle}deg)` }}
                  >
                    {/* Left Plate hook */}
                    <div className="absolute -left-1 -top-8 w-1 h-8 bg-slate-600 flex justify-center">
                      <div className="absolute -bottom-10 w-24 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-xs text-slate-350 p-2 font-arabic font-bold text-center">
                        {leftWeight}
                      </div>
                    </div>
                    {/* Right Plate hook */}
                    <div className="absolute -right-1 -top-8 w-1 h-8 bg-slate-600 flex justify-center">
                      <div className="absolute -bottom-10 w-24 h-12 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-xs text-slate-350 p-2 font-arabic font-bold text-center">
                        {rightWeight}
                      </div>
                    </div>
                  </div>
                  {/* Stand */}
                  <div className="w-4 h-24 bg-slate-750 mt-1"></div>
                  <div className="w-20 h-4 bg-slate-700 rounded-t-xl"></div>
                </div>

                {/* Controls */}
                <div className="flex gap-2 mt-8 z-10">
                  <button 
                    onClick={() => adjustScale('right')}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-750 text-xs text-slate-300 hover:text-white rounded-lg cursor-pointer"
                  >
                    Pujian Lebih Baik (أَفْضَلُ)
                  </button>
                  <button 
                    onClick={() => adjustScale('equal')}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-750 text-xs text-slate-300 hover:text-white rounded-lg cursor-pointer"
                  >
                    Seimbang
                  </button>
                  <button 
                    onClick={() => adjustScale('left')}
                    className="px-3 py-1.5 bg-slate-800 border border-slate-750 text-xs text-slate-300 hover:text-white rounded-lg cursor-pointer"
                  >
                    Duka Lebih Baik
                  </button>
                </div>

                {/* Sentence Render */}
                <div className="mt-6 text-center h-8" dir="rtl">
                  {scaleAngle > 0 && (
                    <span className="text-xl font-arabic font-bold text-emerald-400 animate-in fade-in">
                      شِعْرُ الْمَدْحِ <span className="underline decoration-2">أَفْضَلُ</span> مِنْ شِعْرِ الرَّثَاءِ
                    </span>
                  )}
                  {scaleAngle < 0 && (
                    <span className="text-xl font-arabic font-bold text-emerald-400 animate-in fade-in">
                      شِعْرُ الرَّثَاءِ <span className="underline decoration-2">أَفْضَلُ</span> مِنْ شِعْرِ الْمَدْحِ
                    </span>
                  )}
                  {scaleAngle === 0 && (
                    <span className="text-slate-500 font-mono text-xs">Pilih salah satu kondisi timbangan di atas!</span>
                  )}
                </div>
              </div>
            </div>
          )}

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
                <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Lengkapi Kalimat</span>
                <h3 className="text-3xl font-arabic font-bold text-slate-800 dark:text-slate-100" dir="rtl">
                  {quizData[currentQuestion].baseSentence}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Arti: "{quizData[currentQuestion].translation}"
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
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-rose-400 hover:bg-slate-50'
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

              {/* Explanation */}
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
            <div className="text-center py-10 space-y-6 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Latihan Selesai!</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Anda memperoleh total skor:</p>
                <div className="text-5xl font-black text-rose-600 mt-3">{score} / {quizData.length * 10}</div>
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
