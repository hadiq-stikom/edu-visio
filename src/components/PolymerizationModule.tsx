'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Play, Zap, Droplet } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function PolymerizationModule() {
  const { addScore } = useUser();
  const [mode, setMode] = useState<'adisi' | 'kondensasi'>('adisi');
  
  // 'idle', 'reacting', 'finished'
  const [animState, setAnimState] = useState<'idle' | 'reacting' | 'finished'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [testedModes, setTestedModes] = useState<Set<string>>(new Set());
  
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const startReaction = () => {
    if (animState !== 'idle') return;
    setAnimState('reacting');
    
    setTimeout(() => {
      setAnimState('finished');
      
      setTestedModes(prev => {
        const next = new Set(prev).add(mode);
        if (next.size === 2 && !showSuccess) {
          setTimeout(() => {
            setShowSuccess(true);
            addScore(100);
          }, 1000);
        }
        return next;
      });
      
    }, 2500); // 2.5 seconds reaction
  };

  const reset = () => {
    setAnimState('idle');
  };

  const switchMode = (m: 'adisi' | 'kondensasi') => {
    setMode(m);
    setAnimState('idle');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          Mekanisme Reaksi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Reaksi Polimerisasi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Polimer dibentuk melalui dua cara utama: <strong>Adisi</strong> (pemutusan ikatan rangkap) dan <strong>Kondensasi</strong> (penggabungan dengan pelepasan molekul kecil seperti air).
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-orange-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa syarat utama agar suatu monomer dapat mengalami polimerisasi adisi?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monomernya harus memiliki <strong>ikatan tak jenuh (ikatan rangkap dua atau tiga)</strong>, seperti pada etena atau propena. Ikatan rangkap ini akan terbuka (putus) untuk saling berikatan dengan monomer lain.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Pembentukan protein dari asam amino merupakan contoh dari jenis polimerisasi apa? Mengapa?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Polimerisasi Kondensasi</strong>. Karena dalam penggabungan dua gugus fungsi pada asam amino (-NH₂ dan -COOH) membentuk ikatan peptida, selalu diikuti dengan <strong>pelepasan molekul air (H₂O)</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
           <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button 
                onClick={() => switchMode('adisi')}
                className={`px-6 py-2 rounded-lg font-bold transition-all text-sm ${
                   mode === 'adisi' ? 'bg-white dark:bg-gray-900 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Adisi
              </button>
              <button 
                onClick={() => switchMode('kondensasi')}
                className={`px-6 py-2 rounded-lg font-bold transition-all text-sm ${
                   mode === 'kondensasi' ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Kondensasi
              </button>
           </div>
           
           <div className="flex gap-2">
              <button 
                onClick={startReaction}
                disabled={animState !== 'idle'}
                className={`px-6 py-2.5 text-white font-bold rounded-xl transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50 ${
                   mode === 'adisi' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
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
        <div className="relative w-full h-[400px] bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col items-center justify-center">
           
           {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-orange-600/95 dark:bg-orange-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Katalisator Handal!</h3>
               <div className="bg-orange-800/50 dark:bg-orange-900/80 border border-orange-400/50 p-4 rounded-xl text-orange-50 max-w-md">
                 <p className="text-sm leading-relaxed mb-2">
                   Anda telah mengamati dua jalur sintesis polimer terbesar di industri kimia: <strong>Adisi</strong> untuk plastik seperti PE/PVC, dan <strong>Kondensasi</strong> untuk serat seperti Nilon/Poliester!
                 </p>
                 <span className="text-orange-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); reset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-orange-700 rounded-xl font-bold hover:bg-orange-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
           )}

           {/* ADISI MODE */}
           {mode === 'adisi' && (
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                 <div className="absolute top-6 inset-x-0 text-center z-10">
                    <span className="inline-block px-4 py-2 bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-900/50 rounded-xl shadow-sm font-medium text-sm text-gray-700 dark:text-gray-300">
                       {animState === 'idle' && 'Polimerisasi Adisi: Monomer dengan ikatan rangkap dua (Etena).'}
                       {animState === 'reacting' && 'Inisiator menyerang, ikatan rangkap (pi) terbuka...'}
                       {animState === 'finished' && 'Monomer-monomer tersambung menjadi rantai panjang.'}
                    </span>
                 </div>
                 
                 <div className="relative flex items-center justify-center h-full w-full max-w-[600px]">
                    {/* Monomer 1 */}
                    <div className={`absolute flex items-center transition-all duration-2000 ${
                       animState === 'idle' ? 'left-[10%] opacity-100' :
                       animState === 'reacting' ? 'left-[20%] opacity-100' :
                       'left-[30%] opacity-100'
                    }`}>
                       <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                       <div className="flex flex-col gap-1 z-0 relative">
                          <div className={`w-8 h-1.5 bg-gray-400 transition-all duration-2000 origin-center ${
                             animState === 'finished' ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100 relative'
                          }`}></div>
                          <div className="w-8 h-1.5 bg-gray-400"></div>
                          
                          {/* Zap effect on the bond */}
                          {animState === 'reacting' && (
                             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping">
                                <Zap className="w-6 h-6 text-yellow-400" />
                             </div>
                          )}
                       </div>
                       <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                       
                       {/* New Bond right */}
                       <div className={`absolute right-[-24px] top-1/2 -translate-y-1/2 h-1.5 bg-orange-500 z-0 transition-all duration-2000 ${
                          animState === 'finished' ? 'w-6 opacity-100' : 'w-0 opacity-0'
                       }`}></div>
                    </div>

                    {/* Monomer 2 */}
                    <div className={`absolute flex items-center transition-all duration-2000 ${
                       animState === 'idle' ? 'right-[10%] opacity-100' :
                       animState === 'reacting' ? 'right-[20%] opacity-100' :
                       'right-[30%] opacity-100'
                    }`}>
                       {/* New Bond left (from previous) */}
                       
                       <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                       <div className="flex flex-col gap-1 z-0 relative">
                          <div className={`w-8 h-1.5 bg-gray-400 transition-all duration-2000 origin-center ${
                             animState === 'finished' ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100 relative'
                          }`}></div>
                          <div className="w-8 h-1.5 bg-gray-400"></div>
                          
                          {animState === 'reacting' && (
                             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping" style={{ animationDelay: '0.2s' }}>
                                <Zap className="w-6 h-6 text-yellow-400" />
                             </div>
                          )}
                       </div>
                       <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                    </div>
                 </div>
              </div>
           )}

           {/* KONDENSASI MODE */}
           {mode === 'kondensasi' && (
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                 <div className="absolute top-6 inset-x-0 text-center z-10">
                    <span className="inline-block px-4 py-2 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900/50 rounded-xl shadow-sm font-medium text-sm text-gray-700 dark:text-gray-300">
                       {animState === 'idle' && 'Polimerisasi Kondensasi: Dua monomer dengan gugus fungsi berbeda di ujungnya.'}
                       {animState === 'reacting' && 'Gugus -OH dan -H bereaksi, berpisah dari monomer...'}
                       {animState === 'finished' && 'Terbentuk ikatan baru. Molekul H₂O (Air) dilepaskan!'}
                    </span>
                 </div>
                 
                 <div className="relative flex items-center justify-center h-full w-full max-w-[600px]">
                    {/* Monomer 1 (e.g. Diacid) */}
                    <div className={`absolute flex items-center transition-all duration-2000 ${
                       animState === 'idle' ? 'left-[15%] opacity-100' :
                       animState === 'reacting' ? 'left-[22%] opacity-100' :
                       'left-[30%] opacity-100'
                    }`}>
                       <div className="px-4 py-3 bg-indigo-100 dark:bg-indigo-900/40 border-2 border-indigo-300 dark:border-indigo-700 rounded-lg text-indigo-800 dark:text-indigo-200 font-bold">R₁</div>
                       <div className="w-6 h-1.5 bg-gray-400"></div>
                       {/* Functional Group OH */}
                       <div className="relative">
                          <div className={`flex items-center justify-center w-10 h-10 bg-rose-500 rounded-full text-white text-xs font-bold border-2 border-rose-600 transition-all duration-2000 ${
                             animState === 'finished' ? 'translate-y-[-80px] translate-x-[40px] opacity-0 scale-50' : 'translate-y-0 opacity-100'
                          }`}>OH</div>
                       </div>
                    </div>

                    {/* Monomer 2 (e.g. Diamine or Diol) */}
                    <div className={`absolute flex items-center transition-all duration-2000 ${
                       animState === 'idle' ? 'right-[15%] opacity-100' :
                       animState === 'reacting' ? 'right-[22%] opacity-100' :
                       'right-[30%] opacity-100'
                    }`}>
                       {/* Functional Group H */}
                       <div className="relative">
                          <div className={`flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full text-white text-xs font-bold border-2 border-cyan-600 transition-all duration-2000 ${
                             animState === 'finished' ? 'translate-y-[-80px] translate-x-[-40px] opacity-0 scale-50' : 'translate-y-0 opacity-100'
                          }`}>H</div>
                       </div>
                       <div className="w-6 h-1.5 bg-gray-400"></div>
                       <div className="px-4 py-3 bg-teal-100 dark:bg-teal-900/40 border-2 border-teal-300 dark:border-teal-700 rounded-lg text-teal-800 dark:text-teal-200 font-bold">R₂</div>
                    </div>
                    
                    {/* The New Bond */}
                    <div className={`absolute left-1/2 -translate-x-1/2 h-1.5 bg-blue-500 z-0 transition-all duration-2000 ${
                       animState === 'finished' ? 'w-16 opacity-100' : 'w-0 opacity-0'
                    }`}></div>

                    {/* Water Droplet (H2O) */}
                    {animState === 'finished' && (
                       <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex flex-col items-center animate-in slide-in-from-bottom-8 fade-in duration-1000">
                          <div className="flex items-center gap-0">
                             <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-cyan-600">H</div>
                             <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-xs font-bold text-white border border-rose-600 -ml-1 z-10">O</div>
                             <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-cyan-600 -ml-1">H</div>
                          </div>
                          <span className="text-xs text-blue-500 font-bold mt-2">H₂O Terlepas</span>
                       </div>
                    )}
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
                <BookOpen className="h-5 w-5 text-orange-500" /> Reaksi Polimerisasi
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Polimerisasi Adisi</h4>
                <p>Penggabungan monomer yang memiliki ikatan rangkap (tak jenuh). Dalam reaksi ini, ikatan rangkap terbuka menjadi ikatan tunggal untuk berikatan dengan monomer lain.</p>
                <ul className="list-disc pl-5 mt-2 text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <li><strong>Tidak ada molekul yang hilang.</strong> Massa polimer = total massa monomer.</li>
                  <li>Contoh: Pembentukan Polietilena (PE), PVC (pipa air), Teflon, dan Polistirena.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Polimerisasi Kondensasi</h4>
                <p>Penggabungan dua molekul monomer yang memiliki sedikitnya dua gugus fungsi berbeda di ujungnya (misal: -OH, -COOH, -NH₂). Reaksi ini saling mengikat dua gugus fungsi tersebut dan melepaskan sebuah molekul kecil.</p>
                <ul className="list-disc pl-5 mt-2 text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <li><strong>Ada molekul sisa (biasanya air / H₂O atau amonia / NH₃).</strong> Massa polimer &lt; total massa monomer.</li>
                  <li>Contoh: Pembentukan Nilon (serat pakaian), PET (botol plastik), dan Protein.</li>
                </ul>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors"
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
