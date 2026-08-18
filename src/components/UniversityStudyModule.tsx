'use client';

import React, { useState } from 'react';
import { BookOpen, Play, RefreshCw, Trophy, ArrowRight, CheckCircle2, XCircle, Settings2, Sliders, Shield } from 'lucide-react';

interface MudhariVerb {
  id: string;
  meaning: string;
  marfu: string;
  mansub: string;
  majzum: string;
  explanationMansub: string;
  explanationMajzum: string;
}

const verbsData: MudhariVerb[] = [
  {
    id: 'v1',
    meaning: 'Pergi',
    marfu: 'يَذْهَبُ',
    mansub: 'يَذْهَبَ',
    majzum: 'يَذْهَبْ',
    explanationMansub: '💡 Fathah: Harakat dammah di akhir (بُ) berubah menjadi fathah (بَ) karena amil nawasib.',
    explanationMajzum: '💡 Sukun: Harakat dammah di akhir (بُ) berubah menjadi sukun (بْ) karena amil jawazim.'
  },
  {
    id: 'v2',
    meaning: 'Mereka (Lk) pergi',
    marfu: 'يَذْهَبُونَ',
    mansub: 'يَذْهَبُوا',
    majzum: 'يَذْهَبُوا',
    explanationMansub: '💡 Hadzfun Nun: Huruf Nun (نَ) di akhir kata dihilangkan/dibuang.',
    explanationMajzum: '💡 Hadzfun Nun: Huruf Nun (نَ) di akhir kata dihilangkan/dibuang.'
  },
  {
    id: 'v3',
    meaning: 'Berjalan (Huruf Illat)',
    marfu: 'يَمْشِي',
    mansub: 'يَمْشِيَ',
    majzum: 'يَمْشِ',
    explanationMansub: '💡 Fathah Zhahirah: Harakat fathah nampak jelas pada huruf Ya\' (يَ).',
    explanationMajzum: '💡 Hadzful Illat: Huruf penyakit/lemah Ya\' (ي) di akhir kata dipotong/dihapus total!'
  }
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
    sentence: 'أُرِيدُ أَنْ ... فِي الْجَامِعَةِ (أَدْرُسُ)',
    translation: 'Saya ingin belajar di universitas.',
    options: ['أَدْرُسُ', 'أَدْرُسَ', 'أَدْرُسْ'],
    correct: 'أَدْرُسَ',
    explanation: 'Didahului oleh huruf "an" (Amil Nawasib), sehingga fi\'il mudhari\' harus mansub dengan tanda harakat akhir fathah (adrusa).'
  },
  {
    id: 'q2',
    sentence: 'الطَّالِبُ لَمْ ... إِلَى الْمَكْتَبَةِ (يَذْهَبُ)',
    translation: 'Siswa itu belum pergi ke perpustakaan.',
    options: ['يَذْهَبُ', 'يَذْهَبَ', 'يَذْهَبْ'],
    correct: 'يَذْهَبْ',
    explanation: 'Didahului oleh amil jawazim "lam", membuat kata kerja mudhari\' berharakat sukun di akhir (yadzhab).'
  },
  {
    id: 'q3',
    sentence: 'الْأَوْلَادُ لَنْ ... الْيَوْمَ (يَلْعَبُونَ)',
    translation: 'Anak-anak tidak akan bermain hari ini.',
    options: ['يَلْعَبُونَ', 'يَلْعَبُوا', 'يَلْعَبْ'],
    correct: 'يَلْعَبُوا',
    explanation: 'Sebagai Af\'alul Khamsah yang diawali amil nawasib "Lan", huruf Nun di akhir dibuang sehingga menjadi yal\'abuu.'
  }
];

export default function UniversityStudyModule() {
  const [activeTab, setActiveTab] = useState<'intro' | 'game'>('intro');
  const [selectedVerb, setSelectedVerb] = useState<MudhariVerb>(verbsData[0]);
  const [amilFilter, setAmilFilter] = useState<'none' | 'nawasib' | 'jawazim'>('none');
  const [isAnimating, setIsAnimating] = useState(false);

  // Quiz states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const applyAmil = (filter: 'none' | 'nawasib' | 'jawazim') => {
    setIsAnimating(true);
    setAmilFilter(filter);
    setTimeout(() => setIsAnimating(false), 500);
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
          Bab 5: Studi di Universitas (الدراسة في الجامعة)
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-2">
          I'rab Fi'il Mudhari'
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
          Simulasikan bagaimana partikel amil mengubah harakat akhir kata kerja mudhari\'.
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
          <div className="bg-white dark:bg-slate-850 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                Penyaring Partikel Amil
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Alirkan Fi'il Mudhari' ke penyaring Amil Nawasib (Mansub) atau Amil Jawazim (Majzum).
              </p>
            </div>

            {/* Verb Selectors */}
            <div className="flex gap-2 flex-wrap">
              {verbsData.map(v => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVerb(v); setAmilFilter('none'); }}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedVerb.id === v.id
                      ? 'bg-rose-50 border-rose-350 text-rose-600 dark:bg-rose-950/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400'
                  }`}
                >
                  {v.marfu} ({v.meaning})
                </button>
              ))}
            </div>

            {/* Visualizer Pipeline */}
            <div className="bg-slate-950 rounded-2xl p-8 relative flex flex-col justify-center items-center overflow-hidden min-h-[220px]">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-600 dark:text-slate-500 uppercase tracking-widest">
                Particle Filter Pipeline
              </div>

              <div className="flex items-center gap-8 z-10" dir="rtl">
                <div className={`text-5xl sm:text-6xl font-arabic font-extrabold text-slate-100 flex items-center transition-all ${
                  isAnimating ? 'scale-90 opacity-60' : 'scale-100 opacity-100'
                }`}>
                  {amilFilter === 'none' && <span>{selectedVerb.marfu}</span>}
                  {amilFilter === 'nawasib' && <span className="text-amber-400">{selectedVerb.mansub}</span>}
                  {amilFilter === 'jawazim' && <span className="text-rose-400">{selectedVerb.majzum}</span>}
                </div>
              </div>

              {/* Filters Controls */}
              <div className="flex gap-2 mt-8 z-10">
                <button
                  onClick={() => applyAmil('none')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    amilFilter === 'none' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Tanpa Amil (Marfu')
                </button>
                <button
                  onClick={() => applyAmil('nawasib')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    amilFilter === 'nawasib' ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Filter Nawasib (لَنْ / أَنْ)
                </button>
                <button
                  onClick={() => applyAmil('jawazim')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                    amilFilter === 'jawazim' ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  Filter Jawazim (لَمْ)
                </button>
              </div>

              {/* Explanation sentence */}
              <div className="mt-4 text-center h-12 flex items-center justify-center">
                <p className="text-sm font-mono text-rose-400 animate-in fade-in max-w-md">
                  {amilFilter === 'none' && "Normal: Fi'il dalam keadaan Marfu'. Huruf vokal/harakat akhir normal."}
                  {amilFilter === 'nawasib' && selectedVerb.explanationMansub}
                  {amilFilter === 'jawazim' && selectedVerb.explanationMajzum}
                </p>
              </div>
            </div>

            {/* Formula Rules */}
            <div className="p-5 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-2xl">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3 flex items-center gap-2">
                <Sliders className="text-rose-500 w-4 h-4" /> Macam-macam Amil Pengubah
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-400">
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-350">1. Amil Nawasib (Menasabkan):</p>
                  <p>Mencakup: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">أَنْ</code> (bahwa), <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">لَنْ</code> (tidak akan), <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">كَيْ</code> (agar), <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">حَتَّى</code> (sehingga).</p>
                  <p className="mt-1">Mengubah harakat akhir menjadi <strong>Fathah</strong> atau membuang Nun.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-slate-700 dark:text-slate-350">2. Amil Jawazim (Menjazamkan):</p>
                  <p>Mencakup: <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">لَمْ</code> (tidak/belum), <code className="bg-slate-200 dark:bg-slate-800 px-1 rounded">لَا</code> (larangan).</p>
                  <p className="mt-1">Mengubah harakat akhir menjadi <strong>Sukun</strong>, membuang Nun, atau menghapus huruf illat (lemah) di akhir kata.</p>
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
