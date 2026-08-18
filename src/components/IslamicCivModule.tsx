'use client';

import React, { useState } from 'react';
import { BookOpen, Play, RefreshCw, Trophy, ArrowRight, CheckCircle2, XCircle, Sparkles, AlertCircle } from 'lucide-react';

interface AsmaNoun {
  id: string;
  base: string;
  meaning: string;
  marfu: string;
  mansub: string;
  majrur: string;
}

const asmaNouns: AsmaNoun[] = [
  { id: 'n1', base: 'أَب', meaning: 'Ayah', marfu: 'أَبُوكَ', mansub: 'أَبَاكَ', majrur: 'أَبِيكَ' },
  { id: 'n2', base: 'أَخ', meaning: 'Saudara', marfu: 'أَخُوكَ', mansub: 'أَخَاكَ', majrur: 'أَخِيكَ' },
  { id: 'n3', base: 'حَم', meaning: 'Ipar', marfu: 'حَمُوكَ', mansub: 'حَمَاكَ', majrur: 'حَمِيكَ' },
  { id: 'n4', base: 'فُو', meaning: 'Mulut', marfu: 'فُوكَ', mansub: 'فَاكَ', majrur: 'فِيكَ' },
  { id: 'n5', base: 'ذُو', meaning: 'Pemilik', marfu: 'ذُو مَالٍ', mansub: 'ذَا مَالٍ', majrur: 'ذِي مَالٍ' },
];

interface AfalVerb {
  id: string;
  base: string;
  meaning: string;
  marfu: string;
  mansubMajzum: string;
  suffixRemoved: string;
}

const afalVerbs: AfalVerb[] = [
  { id: 'v1', base: 'يَكْتُبُونَ', meaning: 'Mereka (Lk) menulis', marfu: 'يَكْتُبُونَ', mansubMajzum: 'يَكْتُبُوا', suffixRemoved: 'نَ' },
  { id: 'v2', base: 'تَكْتُبِينَ', meaning: 'Kamu (Pr) menulis', marfu: 'تَكْتُبِينَ', mansubMajzum: 'تَكْتُبِي', suffixRemoved: 'نَ' },
  { id: 'v3', base: 'يَكْتُبَانِ', meaning: 'Mereka Berdua menulis', marfu: 'يَكْتُبَانِ', mansubMajzum: 'يَكْتُبَا', suffixRemoved: 'نِ' },
];

interface QuizItem {
  id: string;
  sentence: string;
  translation: string;
  options: string[];
  correct: string;
  explanation: string;
}

const quizData: QuizItem[] = [
  {
    id: 'q1',
    sentence: 'جَاءَ ... الطَّالِبِ (أَب)',
    translation: 'Ayah siswa itu telah datang.',
    options: ['أَبُو', 'أَبَا', 'أَبِي'],
    correct: 'أَبُو',
    explanation: 'Sebagai subjek (Fa\'il) dari kata kerja jaa\'a, kedudukannya adalah marfu\'. Tanda rafa\' untuk Asmaul Khamsah adalah Wawu (abuu).'
  },
  {
    id: 'q2',
    sentence: 'الْمُسْلِمُونَ لَنْ ... الْعَدْلَ (يُحَقِّقُونَ)',
    translation: 'Kaum Muslimin tidak akan pernah [bisa] mewujudkan keadilan.',
    options: ['يُحَقِّقُونَ', 'يُحَقِّقُوا', 'يُحَقِّقْ'],
    correct: 'يُحَقِّقُوا',
    explanation: 'Ada amil nawasib "Lan". Af\'alul Khamsah (yuhaqqiquuna) ketika nasab kehilangan huruf Nun (hadzfun nuun) di akhir kata menjadi yuhaqqiquu.'
  },
  {
    id: 'q3',
    sentence: 'سَلَّمْتُ عَلَى ... (أَخ)',
    translation: 'Saya memberi salam kepada saudaramu.',
    options: ['أَخُوكَ', 'أَخَاكَ', 'أَخِيكَ'],
    correct: 'أَخِيكَ',
    explanation: 'Karena didahului huruf jar "\'alaa", kedudukannya adalah majrur. Tanda jar untuk Asmaul Khamsah adalah Ya\' (akhiika).'
  }
];

export default function IslamicCivModule() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game'>('intro');
  const [introTab, setIntroTab] = useState<'asma' | 'afal'>('asma');
  
  // Asmaul Khamsah states
  const [selectedAsma, setSelectedAsma] = useState<AsmaNoun>(asmaNouns[0]);
  const [asmaCase, setAsmaCase] = useState<'marfu' | 'mansub' | 'majrur'>('marfu');
  const [isAsmaAnimating, setIsAsmaAnimating] = useState(false);

  // Af'alul Khamsah states
  const [selectedAfal, setSelectedAfal] = useState<AfalVerb>(afalVerbs[0]);
  const [afalState, setAfalState] = useState<'marfu' | 'mansubMajzum'>('marfu');
  const [isAfalAnimating, setIsAfalAnimating] = useState(false);

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const changeAsmaCase = (c: 'marfu' | 'mansub' | 'majrur') => {
    setIsAsmaAnimating(true);
    setAsmaCase(c);
    setTimeout(() => setIsAsmaAnimating(false), 500);
  };

  const changeAfalState = (s: 'marfu' | 'mansubMajzum') => {
    setIsAfalAnimating(true);
    setAfalState(s);
    setTimeout(() => setIsAfalAnimating(false), 500);
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
        <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold tracking-wider mb-3 uppercase">
          Bab 4: Peradaban Islam (الحضارة الإسلامية)
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          Asmaul & Af'alul Khamsah
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Visualisasikan perubahan huruf penyambung pada 5 Noun dan penghilangan Nun pada 5 Verb khusus.
        </p>
      </div>

      {/* Tabs */}
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

      {/* TAB 1: INTRO */}
      {activeTab === 'intro' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => setIntroTab('asma')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'asma'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Asmaul Khamsah (5 Isim)
            </button>
            <button
              onClick={() => setIntroTab('afal')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                introTab === 'afal'
                  ? 'bg-white dark:bg-slate-800 text-slate-850 dark:text-slate-100 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Af'alul Khamsah (5 Fi'il)
            </button>
          </div>

          {/* ASMAUL KHAMSAH */}
          {introTab === 'asma' && (
            <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                    Simulator I'rab Asmaul Khamsah
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Isim khusus ini berganti huruf vokal penghubung tergantung kedudukannya (Rafa'/Nasab/Jarr).
                  </p>
                </div>
              </div>

              {/* Selector */}
              <div className="flex gap-2 flex-wrap">
                {asmaNouns.map(n => (
                  <button
                    key={n.id}
                    onClick={() => { setSelectedAsma(n); }}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedAsma.id === n.id
                        ? 'bg-emerald-50 border-emerald-350 text-emerald-600 dark:bg-emerald-950/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {n.base} ({n.meaning})
                  </button>
                ))}
              </div>

              {/* AHA Morphing Area */}
              <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[220px]">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Harakat Case Changer
                </div>

                <div className="flex items-center gap-8 z-10" dir="rtl">
                  <div className={`text-5xl sm:text-6xl font-arabic font-extrabold text-slate-100 flex items-center transition-all ${
                    isAsmaAnimating ? 'scale-90 opacity-50' : 'scale-100 opacity-100'
                  }`}>
                    {asmaCase === 'marfu' && (
                      <span className="flex">
                        {selectedAsma.marfu.slice(0, -2)}
                        <span className="text-blue-400 px-1 border-b border-blue-500">و</span>
                        <span>{selectedAsma.marfu.slice(-2)}</span>
                      </span>
                    )}
                    {asmaCase === 'mansub' && (
                      <span className="flex">
                        {selectedAsma.mansub.slice(0, -2)}
                        <span className="text-amber-400 px-1 border-b border-amber-500">ا</span>
                        <span>{selectedAsma.mansub.slice(-2)}</span>
                      </span>
                    )}
                    {asmaCase === 'majrur' && (
                      <span className="flex">
                        {selectedAsma.majrur.slice(0, -2)}
                        <span className="text-rose-400 px-1 border-b border-rose-500">ي</span>
                        <span>{selectedAsma.majrur.slice(-2)}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Case selector buttons inside board */}
                <div className="flex gap-2 mt-8 z-10">
                  <button
                    onClick={() => changeAsmaCase('marfu')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      asmaCase === 'marfu' ? 'bg-blue-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Rafa' (و)
                  </button>
                  <button
                    onClick={() => changeAsmaCase('mansub')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      asmaCase === 'mansub' ? 'bg-amber-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Nasab (ا)
                  </button>
                  <button
                    onClick={() => changeAsmaCase('majrur')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      asmaCase === 'majrur' ? 'bg-rose-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Jarr (ي)
                  </button>
                </div>

                {/* Explanation sentence */}
                <div className="mt-4 text-center h-12 flex items-center justify-center">
                  <p className="text-sm font-mono text-emerald-400 animate-in fade-in max-w-md">
                    {asmaCase === 'marfu' && "💡 AHA! Saat kedudukan Rafa' (contoh: subjek / pelaku), huruf penyambungnya wajib memakai WAWU (و)."}
                    {asmaCase === 'mansub' && "💡 AHA! Saat kedudukan Nasab (contoh: objek penderita), huruf penyambungnya wajib memakai ALIF (ا)."}
                    {asmaCase === 'majrur' && "💡 AHA! Saat kedudukan Jarr (didahului huruf jar), huruf penyambungnya wajib memakai YA' (ي)."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AF'ALUL KHAMSAH */}
          {introTab === 'afal' && (
            <div className="bg-white dark:bg-slate-855 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  Simulator Penghilangan Nun (Hadzfun Nun)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  5 kata kerja khusus (Af'alul Khamsah) akan kehilangan huruf Nun di akhirnya jika didahului Amil Nasab/Jazm.
                </p>
              </div>

              {/* Selector */}
              <div className="flex gap-2 flex-wrap">
                {afalVerbs.map(v => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedAfal(v); }}
                    className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      selectedAfal.id === v.id
                        ? 'bg-emerald-50 border-emerald-350 text-emerald-600 dark:bg-emerald-950/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'
                    }`}
                  >
                    {v.base}
                  </button>
                ))}
              </div>

              {/* AHA Board */}
              <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[220px]">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                  Nun Disappearer
                </div>

                <div className="flex items-center gap-8 z-10" dir="rtl">
                  <div className={`text-5xl sm:text-6xl font-arabic font-extrabold text-slate-100 flex items-center transition-all ${
                    isAfalAnimating ? 'scale-95 opacity-60' : 'scale-100 opacity-100'
                  }`}>
                    {afalState === 'marfu' ? (
                      <span className="flex">
                        {selectedAfal.marfu}
                      </span>
                    ) : (
                      <span className="flex">
                        {selectedAfal.mansubMajzum}
                        <span className="text-rose-500 line-through decoration-2 opacity-30 px-1">
                          {selectedAfal.suffixRemoved}
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                {/* State selector buttons inside board */}
                <div className="flex gap-2 mt-8 z-10">
                  <button
                    onClick={() => changeAfalState('marfu')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      afalState === 'marfu' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Marfu' (Normal)
                  </button>
                  <button
                    onClick={() => changeAfalState('mansubMajzum')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      afalState === 'mansubMajzum' ? 'bg-rose-600 text-white shadow animate-pulse' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Kemasukan Amil (لَنْ / لَمْ)
                  </button>
                </div>

                {/* Explanation sentence */}
                <div className="mt-4 text-center h-12 flex items-center justify-center">
                  <p className="text-sm font-mono text-emerald-400 animate-in fade-in max-w-md">
                    {afalState === 'marfu' && `Normal: Huruf Nun (${selectedAfal.suffixRemoved}) tetap kokoh berada di akhir kata.`}
                    {afalState === 'mansubMajzum' && `💡 AHA! Huruf Nun (${selectedAfal.suffixRemoved}) gugur/hilang karena terkena dampak Amil Nasab/Jazm.`}
                  </p>
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
                  {quizData[currentQuestion].sentence}
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
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-800 hover:border-emerald-450 hover:bg-slate-50'
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
