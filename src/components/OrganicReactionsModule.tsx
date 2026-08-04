'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Play, Zap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function OrganicReactionsModule() {
  const { addScore } = useUser();
  
  // 'idle', 'approaching', 'breaking', 'bonded'
  const [animState, setAnimState] = useState<'idle' | 'approaching' | 'breaking' | 'bonded'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const playAnimation = () => {
    if (animState !== 'idle') return;
    
    setAnimState('approaching');
    setTimeout(() => {
      setAnimState('breaking');
      setTimeout(() => {
        setAnimState('bonded');
        if (!showSuccess) {
          setTimeout(() => {
            setShowSuccess(true);
            addScore(100);
          }, 1000);
        }
      }, 1500);
    }, 1500);
  };

  const reset = () => {
    setAnimState('idle');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
          Mekanisme Reaksi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Reaksi Spesifik (Adisi)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Amati proses mikroskopis putusnya ikatan rangkap dua (alkena) menjadi ikatan tunggal (alkana) ketika diserang oleh senyawa lain, sebuah proses yang disebut <strong>Reaksi Adisi</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-sm font-semibold rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-rose-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Jenis reaksi apakah perubahan etena (CH₂=CH₂) menjadi etana (CH₃-CH₃) menggunakan gas hidrogen (H₂)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perubahan dari ikatan rangkap dua (alkena) menjadi ikatan tunggal (alkana) dengan cara "menambahkan" atom H pada masing-masing atom C ikatan rangkap disebut <strong>Reaksi Adisi</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa bunyi Aturan Markovnikov pada reaksi adisi HCl ke dalam propena (CH₂=CH-CH₃)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Aturan Markovnikov: "Yang kaya makin kaya". Atom Hidrogen (H) dari HCl akan masuk ke atom Karbon (C) ikatan rangkap yang sudah memiliki lebih banyak atom Hidrogen. Sehingga hasilnya adalah 2-kloropropana.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
           <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Adisi Etena dengan Asam Bromida (HBr)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">C₂H₄ (Etena) + HBr → C₂H₅Br (Bromoetana)</p>
           </div>
           
           <div className="flex gap-2">
              <button 
                onClick={playAnimation}
                disabled={animState !== 'idle'}
                className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Play className="w-5 h-5" /> Mulai Reaksi
              </button>
              <button 
                onClick={reset}
                className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
           </div>
        </div>

        {/* Visualizer Area */}
        <div className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
           
           {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-rose-600/95 dark:bg-rose-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Pemecah Ikatan!</h3>
               <div className="bg-rose-800/50 dark:bg-rose-900/80 border border-rose-400/50 p-4 rounded-xl text-rose-50 max-w-md">
                 <p className="text-sm leading-relaxed mb-2">
                   Anda telah berhasil mengamati terjadinya reaksi Adisi! Ikatan rangkap dua (pi bond) yang lebih lemah putus untuk membentuk ikatan kovalen baru dengan Hidrogen dan Bromin.
                 </p>
                 <span className="text-rose-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); reset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-rose-700 rounded-xl font-bold hover:bg-rose-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
           )}

           {/* Descriptive Status */}
           <div className="absolute top-6 inset-x-0 text-center z-10">
              <span className="inline-block px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm font-medium text-sm text-gray-700 dark:text-gray-300">
                 {animState === 'idle' && 'Klik "Mulai Reaksi" untuk melihat mekanisme Adisi.'}
                 {animState === 'approaching' && 'Molekul HBr mendekati ikatan rangkap Etena...'}
                 {animState === 'breaking' && 'Ikatan rangkap (pi) putus karena diserang...'}
                 {animState === 'bonded' && 'Atom H dan Br berikatan, ikatan berubah menjadi tunggal.'}
              </span>
           </div>

           <div className="relative flex items-center justify-center w-full max-w-[600px] h-full">
              
              {/* Ethene (Center) */}
              <div className="relative flex items-center justify-center w-[300px]">
                 
                 {/* Left C */}
                 <div className="absolute left-10 flex items-center justify-center w-14 h-14 bg-slate-800 dark:bg-slate-700 rounded-full z-20 text-white font-bold text-xl border-4 border-slate-900">
                    C
                 </div>
                 {/* Top Left H */}
                 <div className={`absolute top-[-40px] left-[-10px] w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 transition-transform duration-1000 ${animState === 'bonded' ? '-rotate-12 translate-x-4 translate-y-2' : ''}`}>
                    H
                 </div>
                 <div className={`absolute top-[-20px] left-[10px] w-1 h-8 bg-gray-400 origin-bottom transition-transform duration-1000 ${animState === 'bonded' ? '-rotate-[30deg]' : '-rotate-45'}`}></div>
                 
                 {/* Bottom Left H */}
                 <div className={`absolute bottom-[-40px] left-[-10px] w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 transition-transform duration-1000 ${animState === 'bonded' ? 'rotate-12 translate-x-4 -translate-y-2' : ''}`}>
                    H
                 </div>
                 <div className={`absolute bottom-[-20px] left-[10px] w-1 h-8 bg-gray-400 origin-top transition-transform duration-1000 ${animState === 'bonded' ? 'rotate-[30deg]' : 'rotate-45'}`}></div>

                 {/* Right C */}
                 <div className="absolute right-10 flex items-center justify-center w-14 h-14 bg-slate-800 dark:bg-slate-700 rounded-full z-20 text-white font-bold text-xl border-4 border-slate-900">
                    C
                 </div>
                 {/* Top Right H */}
                 <div className={`absolute top-[-40px] right-[-10px] w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 transition-transform duration-1000 ${animState === 'bonded' ? 'rotate-12 -translate-x-4 translate-y-2' : ''}`}>
                    H
                 </div>
                 <div className={`absolute top-[-20px] right-[10px] w-1 h-8 bg-gray-400 origin-bottom transition-transform duration-1000 ${animState === 'bonded' ? 'rotate-[30deg]' : 'rotate-45'}`}></div>

                 {/* Bottom Right H */}
                 <div className={`absolute bottom-[-40px] right-[-10px] w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 transition-transform duration-1000 ${animState === 'bonded' ? '-rotate-12 -translate-x-4 -translate-y-2' : ''}`}>
                    H
                 </div>
                 <div className={`absolute bottom-[-20px] right-[10px] w-1 h-8 bg-gray-400 origin-top transition-transform duration-1000 ${animState === 'bonded' ? '-rotate-[30deg]' : '-rotate-45'}`}></div>

                 {/* Double Bonds (Middle) */}
                 <div className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-2 z-10">
                    {/* Top Bond (Pi Bond) - Breaks */}
                    <div className={`w-20 h-2 bg-gray-400 dark:bg-gray-500 rounded-full origin-center transition-all duration-1000 ${
                       animState === 'breaking' || animState === 'bonded' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                    }`}></div>
                    
                    {/* Bottom Bond (Sigma Bond) - Stays */}
                    <div className="w-20 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                 </div>

                 {/* Breaking effect (Zap icon) */}
                 {animState === 'breaking' && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[20px] z-30 animate-ping">
                       <Zap className="w-10 h-10 text-yellow-400 fill-yellow-400" />
                    </div>
                 )}
              </div>

              {/* HBr Molecule (Approaches from top) */}
              <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-1500 z-30 ${
                 animState === 'idle' ? 'top-[-100px] opacity-100' : 
                 animState === 'approaching' ? 'top-[40px] opacity-100' :
                 animState === 'breaking' ? 'top-[40px] opacity-0' : 'top-[40px] opacity-0'
              }`}>
                 <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">H</div>
                    <div className="w-1 h-4 bg-gray-300"></div>
                    <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-red-900">Br</div>
                 </div>
              </div>
              
              {/* Splitting H and Br */}
              {/* The new H attaching to left C */}
              <div className={`absolute transition-all duration-1000 z-30 ${
                 animState === 'bonded' ? 'top-[110px] left-[150px] opacity-100 scale-100' : 'top-[40px] left-[250px] opacity-0 scale-50'
              }`}>
                 <div className="w-1 h-10 bg-emerald-500 absolute bottom-[-30px] left-1/2 -translate-x-1/2 z-0 origin-bottom"></div>
                 <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-emerald-400 relative z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">H</div>
              </div>

              {/* The new Br attaching to right C */}
              <div className={`absolute transition-all duration-1000 z-30 ${
                 animState === 'bonded' ? 'top-[95px] right-[135px] opacity-100 scale-100' : 'top-[70px] left-[250px] opacity-0 scale-50'
              }`}>
                 <div className="w-1 h-10 bg-emerald-500 absolute bottom-[-20px] left-1/2 -translate-x-1/2 z-0 origin-bottom"></div>
                 <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-emerald-400 relative z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">Br</div>
              </div>

           </div>
        </div>

      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" /> Reaksi Senyawa Organik
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Reaksi Adisi</h4>
                <p>Adisi adalah reaksi penambahan molekul ke dalam ikatan rangkap dua (alkena) atau rangkap tiga (alkuna), sehingga ikatan rangkap tersebut terputus dan berkurang (dari rangkap menjadi tunggal).</p>
                <p className="mt-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">CH₂=CH₂ + HBr → CH₃-CH₂Br</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Reaksi Substitusi</h4>
                <p>Substitusi adalah reaksi pertukaran atau penggantian suatu atom atau gugus atom oleh atom atau gugus atom lain. Sering terjadi pada alkana (yang semua ikatannya sudah jenuh tunggal).</p>
                <p className="mt-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">CH₄ + Cl₂ → CH₃Cl + HCl</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Reaksi Eliminasi</h4>
                <p>Eliminasi adalah kebalikan dari adisi. Sebuah molekul melepaskan sebagian unsurnya untuk membentuk ikatan rangkap dua yang baru dari ikatan tunggal.</p>
                <p className="mt-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">CH₃-CH₂Br + NaOH → CH₂=CH₂ + NaBr + H₂O</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors"
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
