'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Plus, Minus, Info, Link2 } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function PolymerStructureModule() {
  const { addScore } = useUser();
  const [monomerCount, setMonomerCount] = useState(1);
  const [isPolymerized, setIsPolymerized] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const addMonomer = () => {
    if (monomerCount < 10) {
      setMonomerCount(prev => prev + 1);
    }
  };

  const removeMonomer = () => {
    if (monomerCount > 1) {
      setMonomerCount(prev => prev - 1);
      if (isPolymerized) setIsPolymerized(false);
    }
  };

  const togglePolymerization = () => {
    const newState = !isPolymerized;
    setIsPolymerized(newState);
    
    if (newState && monomerCount === 10 && !showSuccess) {
      setTimeout(() => {
        setShowSuccess(true);
        addScore(100);
      }, 1000);
    }
  };

  const reset = () => {
    setMonomerCount(1);
    setIsPolymerized(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400 text-xs font-bold uppercase tracking-wider mb-3">
          Dasar Makromolekul
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Struktur Polimer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Polimer adalah molekul raksasa (makromolekul) yang terbentuk dari gabungan molekul-molekul kecil yang disebut Monomer. Mari buat polimer pertama Anda dari monomer Etena!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 text-sm font-semibold rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-violet-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa perbedaan utama antara Monomer dan Polimer?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Monomer</strong> adalah unit molekul kecil tunggal (seperti satu balok Lego). <strong>Polimer</strong> adalah molekul raksasa (makromolekul) yang terbentuk ketika ribuan atau jutaan monomer saling berikatan membentuk rantai panjang yang berulang.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Jika nama monomernya adalah "stirena", apa nama polimer yang dihasilkan?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-violet-600 dark:text-violet-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tata nama polimer sintetik (buatan) yang paling umum adalah dengan menambahkan kata "poli-" di depan nama monomernya. Jadi polimernya disebut <strong>Polistirena</strong> (bahan pembuat styrofoam).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl max-w-5xl mx-auto">
        
        <div className="grid lg:grid-cols-4 gap-8">
           
           {/* Controls */}
           <div className="lg:col-span-1 space-y-4">
             <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col items-center">
               <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-center">Atur Jumlah Monomer</h3>
               
               <div className="flex items-center gap-4">
                  <button 
                    onClick={removeMonomer}
                    disabled={monomerCount === 1}
                    className="w-12 h-12 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <div className="text-3xl font-black text-gray-900 dark:text-white w-12 text-center">
                    {monomerCount}
                  </div>
                  <button 
                    onClick={addMonomer}
                    disabled={monomerCount === 10 || isPolymerized}
                    className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
               </div>
               
               <p className="text-xs text-gray-500 mt-4 text-center">Maksimal 10 monomer untuk simulasi ini.</p>
             </div>

             <button 
                onClick={togglePolymerization}
                disabled={monomerCount < 2}
                className={`w-full py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg ${
                   monomerCount < 2 
                     ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600' 
                     : isPolymerized
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 dark:shadow-none'
                        : 'bg-violet-600 hover:bg-violet-700 text-white shadow-violet-200 dark:shadow-none'
                }`}
             >
                {isPolymerized ? (
                  <>Pisahkan (Depolimerisasi)</>
                ) : (
                  <><Link2 className="w-5 h-5" /> Gabungkan (Polimerisasi)</>
                )}
             </button>

             {isPolymerized && (
               <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800/30 text-center animate-in fade-in zoom-in duration-300">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mb-1">Status: Berhasil!</span>
                  <span className="text-emerald-800 dark:text-emerald-200 text-sm">Terbentuk rantai Polietilena.</span>
               </div>
             )}
           </div>

           {/* Visualizer */}
           <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
              
              {showSuccess && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-violet-600/95 dark:bg-violet-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                  <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Pembuat Polimer!</h3>
                  <div className="bg-violet-800/50 dark:bg-violet-900/80 border border-violet-400/50 p-4 rounded-xl text-violet-50 max-w-md">
                    <p className="text-sm leading-relaxed mb-2">
                      Anda telah menggabungkan 10 monomer etena menjadi rantai polimer polietilena yang panjang! Di dunia nyata, panjang rantai ini bisa mencapai ratusan ribu monomer.
                    </p>
                    <span className="text-violet-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
                  </div>
                  <button 
                    onClick={() => { setShowSuccess(false); reset(); }}
                    className="mt-6 px-6 py-2.5 bg-white text-violet-700 rounded-xl font-bold hover:bg-violet-50 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              )}

              <div className="absolute top-4 left-4 right-4 flex justify-between text-sm font-bold text-gray-500">
                 <span>Nama: {isPolymerized ? 'Polietilena' : 'Etena (Monomer)'}</span>
                 <span className="font-mono">n = {monomerCount}</span>
              </div>

              {/* Molecule Display */}
              <div className="w-full h-full flex items-center justify-center overflow-x-auto custom-scrollbar py-10 px-4">
                 <div className="flex items-center transition-all duration-500">
                    
                    {Array.from({ length: monomerCount }).map((_, i) => (
                       <div 
                         key={i} 
                         className={`relative flex items-center transition-all duration-700 ease-in-out ${
                           isPolymerized ? 'mr-0' : 'mr-8'
                         }`}
                       >
                          {/* Monomer Etena block */}
                          <div className={`relative flex items-center justify-center p-2 rounded-xl transition-colors duration-500 ${isPolymerized ? 'bg-transparent' : 'bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700'}`}>
                             
                             <div className="flex items-center gap-1">
                                {/* Left C */}
                                <div className="flex flex-col items-center">
                                   <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mb-1">H</div>
                                   <div className="w-10 h-10 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                                   <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-1">H</div>
                                </div>
                                
                                {/* Bond between C's */}
                                <div className="flex flex-col gap-1 z-0">
                                   {/* Top bond (pi) breaks when polymerized */}
                                   <div className={`w-6 h-1.5 bg-gray-400 rounded-full transition-all duration-700 ${isPolymerized ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100 relative'}`}></div>
                                   {/* Bottom bond (sigma) */}
                                   <div className="w-6 h-1.5 bg-gray-400 rounded-full relative"></div>
                                </div>

                                {/* Right C */}
                                <div className="flex flex-col items-center">
                                   <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mb-1">H</div>
                                   <div className="w-10 h-10 bg-slate-800 dark:bg-slate-700 rounded-full flex items-center justify-center text-white font-bold border-2 border-slate-900 z-10">C</div>
                                   <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold mt-1">H</div>
                                </div>
                             </div>

                             {/* Connecting bond between monomers (only visible when polymerized and not the last one) */}
                             {isPolymerized && i < monomerCount - 1 && (
                                <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-8 h-1.5 bg-emerald-500 rounded-full z-0 animate-in fade-in duration-500 delay-300"></div>
                             )}

                             {/* Parentheses for Polymer notation */}
                             {isPolymerized && i === 0 && (
                                <div className="absolute left-[-15px] top-[-10px] bottom-[-10px] w-6 border-l-4 border-y-4 border-gray-400/50 rounded-l-2xl z-0"></div>
                             )}
                             {isPolymerized && i === monomerCount - 1 && (
                                <>
                                  <div className="absolute right-[-15px] top-[-10px] bottom-[-10px] w-6 border-r-4 border-y-4 border-gray-400/50 rounded-r-2xl z-0"></div>
                                  <div className="absolute right-[-30px] bottom-[-20px] font-mono font-bold text-gray-500 text-lg">n</div>
                                </>
                             )}
                          </div>
                       </div>
                    ))}

                 </div>
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
                <BookOpen className="h-5 w-5 text-violet-500" /> Konsep Polimer
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Apa itu Polimer?</h4>
                <p>Kata "polimer" berasal dari bahasa Yunani, yaitu <em>poly</em> yang berarti "banyak" dan <em>meros</em> yang berarti "bagian". Jadi, polimer adalah makromolekul (molekul raksasa) yang dibangun dari pengulangan banyak unit kecil (monomer).</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Monomer vs Polimer</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Monomer:</strong> Etena (C₂H₄). Berwujud gas pada suhu ruang. Memiliki satu ikatan rangkap dua.</li>
                  <li><strong>Polimer:</strong> Polietilena (PE). Berwujud padat/plastik. Ikatan rangkap dua telah terbuka menjadi ikatan tunggal yang menghubungkan jutaan monomer etena.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Derajat Polimerisasi (n)</h4>
                <p>Lambang "n" di ujung tanda kurung menunjukkan derajat polimerisasi, yaitu jumlah monomer yang menyusun rantai polimer tersebut. Nilai n bisa berkisar dari ratusan hingga ratusan ribu.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
           height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
           background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
           background-color: #cbd5e1;
           border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
           background-color: #334155;
        }
      `}} />
    </div>
  );
}
