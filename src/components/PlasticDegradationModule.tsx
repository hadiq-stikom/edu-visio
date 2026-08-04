'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Leaf, Recycle, Trash2, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type TrashItem = {
  id: string;
  name: string;
  type: 'organik' | 'anorganik';
  degradeTime: string;
  emoji: string;
};

const TRASH_ITEMS: TrashItem[] = [
  { id: 't1', name: 'Sisa Apel', type: 'organik', degradeTime: '2 bulan', emoji: '🍎' },
  { id: 't2', name: 'Botol PET (Air Mineral)', type: 'anorganik', degradeTime: '450 tahun', emoji: '🍾' },
  { id: 't3', name: 'Daun Pisang', type: 'organik', degradeTime: '3-4 minggu', emoji: '🌿' },
  { id: 't4', name: 'Kantong Plastik (Kresek)', type: 'anorganik', degradeTime: '10-20 tahun (menjadi mikroplastik)', emoji: '🛍️' },
  { id: 't5', name: 'Wadah Styrofoam', type: 'anorganik', degradeTime: 'Lebih dari 500 tahun / Tidak dapat terurai', emoji: '🥡' },
];

export default function PlasticDegradationModule() {
  const { addScore } = useUser();
  const [items, setItems] = useState<TrashItem[]>(TRASH_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ msg: string, isCorrect: boolean } | null>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleSort = (binType: 'organik' | 'anorganik') => {
    if (gameOver) return;
    
    const currentItem = items[currentIndex];
    const isCorrect = currentItem.type === binType;
    
    if (isCorrect) {
      setGameScore(prev => prev + 1);
      setFeedback({ msg: `Benar! ${currentItem.name} membutuhkan waktu ${currentItem.degradeTime} untuk terurai.`, isCorrect: true });
    } else {
      setFeedback({ msg: `Salah! ${currentItem.name} adalah sampah ${currentItem.type}. Waktu urainya: ${currentItem.degradeTime}.`, isCorrect: false });
    }

    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setFeedback(null);
      } else {
        setGameOver(true);
        if (!showSuccess) {
           setTimeout(() => {
             setShowSuccess(true);
             addScore(100);
           }, 1000);
        }
      }
    }, 2500);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setGameScore(0);
    setGameOver(false);
    setFeedback(null);
    setShowSuccess(false);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Peduli Lingkungan
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Plastik dan Degradasi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Kekuatan ikatan kovalen polimer buatan membuatnya sangat tahan lama, tetapi hal ini memicu krisis lingkungan karena alam tidak bisa menguraikannya dengan cepat. Mari pilah sampah berikut!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-sm font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <BookOpen className="h-4 w-4" /> Baca Teori Singkat
          </button>
          <button 
            onClick={() => setShowExamples(!showExamples)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {showExamples ? 'Sembunyikan Contoh Soal' : 'Tampilkan Contoh Soal'}
            {showExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Examples Section */}
      {showExamples && (
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 text-left">
            <BookOpen className="h-6 w-6 text-emerald-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa sampah plastik tidak dapat diuraikan oleh bakteri pembusuk (biodegradable)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karena bakteri dan jamur pengurai di alam tidak memiliki <strong>enzim yang spesifik</strong> untuk memutus ikatan kovalen rantai karbon polimer sintetik (buatan pabrik). Bakteri hanya bisa mencerna polimer alam seperti selulosa (kayu) atau protein.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa yang dimaksud dengan <em>mikroplastik</em> dan mengapa berbahaya bagi rantai makanan?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Plastik di lautan perlahan terpecah karena ombak dan sinar UV menjadi partikel sangat kecil (mikroplastik), tetapi ikatannya tidak hancur. Partikel ini dimakan plankton, lalu ikan, dan akhirnya menumpuk di tubuh manusia yang memakan ikan tersebut, menyebabkan potensi gangguan kesehatan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl relative min-h-[450px] flex flex-col items-center">
          
          {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center rounded-3xl">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Pahlawan Lingkungan!</h3>
               <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                 <p className="text-sm leading-relaxed mb-2">
                   Skor Anda: {score} dari {items.length}!<br/><br/>
                   Dengan memisahkan sampah organik dan anorganik (plastik), kita dapat memfasilitasi daur ulang plastik dan mengurangi volume sampah di tempat pembuangan akhir.
                 </p>
                 <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={resetGame}
                 className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
               >
                 Main Lagi
               </button>
             </div>
          )}

          <div className="w-full flex justify-between items-center mb-8">
             <div className="text-gray-500 font-bold">Item {Math.min(currentIndex + 1, items.length)} / {items.length}</div>
             <div className="text-emerald-600 font-bold text-xl">Skor: {score}</div>
          </div>

          {!gameOver ? (
            <div className="flex-1 flex flex-col items-center justify-center w-full">
               
               {/* Item to Sort */}
               <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-full border-4 border-slate-200 dark:border-slate-700 mb-12 shadow-lg animate-in zoom-in duration-300 relative">
                  <div className="text-7xl">{currentItem.emoji}</div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                     {currentItem.name}
                  </div>
               </div>

               {/* Bins */}
               <div className="flex gap-8 md:gap-16 w-full justify-center opacity-100">
                  <button 
                     onClick={() => handleSort('organik')}
                     disabled={feedback !== null}
                     className="flex flex-col items-center group disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                  >
                     <div className="w-24 h-28 bg-green-500 rounded-b-xl border-4 border-green-600 flex flex-col justify-end items-center pb-4 relative overflow-hidden">
                        <div className="absolute top-0 w-28 h-4 bg-green-600 rounded-t-lg -ml-2 -mr-2"></div>
                        <Leaf className="w-10 h-10 text-white mb-2" />
                     </div>
                     <span className="font-bold text-gray-800 dark:text-gray-200 mt-4 group-hover:text-green-600">Organik (Terurai)</span>
                  </button>

                  <button 
                     onClick={() => handleSort('anorganik')}
                     disabled={feedback !== null}
                     className="flex flex-col items-center group disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                  >
                     <div className="w-24 h-28 bg-blue-500 rounded-b-xl border-4 border-blue-600 flex flex-col justify-end items-center pb-4 relative overflow-hidden">
                        <div className="absolute top-0 w-28 h-4 bg-blue-600 rounded-t-lg -ml-2 -mr-2"></div>
                        <Recycle className="w-10 h-10 text-white mb-2" />
                     </div>
                     <span className="font-bold text-gray-800 dark:text-gray-200 mt-4 group-hover:text-blue-600">Plastik / Daur Ulang</span>
                  </button>
               </div>

               {/* Feedback Message */}
               {feedback && (
                  <div className={`mt-8 px-6 py-3 rounded-xl text-center font-bold animate-in fade-in slide-in-from-bottom-4 ${
                     feedback.isCorrect ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                     {feedback.msg}
                  </div>
               )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center w-full">
               <div className="animate-pulse flex flex-col items-center gap-4 text-emerald-500">
                  <RefreshCw className="w-12 h-12" />
                  <span className="font-bold">Memuat hasil...</span>
               </div>
            </div>
          )}

        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Masalah Limbah Polimer
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Ketahanan Plastik Sintetik</h4>
                <p>Polimer sintetis (buatan) seperti Polietilena dan PVC sangat sulit diuraikan oleh mikroorganisme di alam (non-biodegradable). Hal ini karena alam tidak memiliki enzim untuk memutus ikatan kovalen C-C yang sangat stabil tersebut.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Polimer Biodegradabel</h4>
                <p>Saat ini, ilmuwan terus mengembangkan bioplastik yang terbuat dari bahan alam (seperti pati singkong, asam laktat) yang disebut PLA (Polylactic Acid). Ikatan esternya lebih mudah diputus oleh air dan bakteri sehingga bisa hancur dalam hitungan bulan.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Solusi 3R</h4>
                <p>Untuk mengatasi sampah polimer saat ini, terapkan:</p>
                <ul className="list-disc pl-5 mt-1">
                  <li><strong>Reduce:</strong> Kurangi penggunaan plastik sekali pakai.</li>
                  <li><strong>Reuse:</strong> Gunakan kembali wadah plastik yang aman.</li>
                  <li><strong>Recycle:</strong> Daur ulang (lelehkan dan cetak kembali) sampah termoplastik.</li>
                </ul>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
