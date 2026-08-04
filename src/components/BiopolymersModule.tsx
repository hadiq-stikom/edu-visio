'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Dna, Droplet, ArrowRight, Activity } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function BiopolymersModule() {
  const { addScore } = useUser();
  const [step, setStep] = useState(0); // 0: select, 1: bonding, 2: finished
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    if (step === 2 && !showSuccess) {
      setTimeout(() => {
        setShowSuccess(true);
        addScore(100);
      }, 1500);
    }
  }, [step, showSuccess, addScore]);

  const startSynthesis = () => {
    setStep(1);
    setTimeout(() => {
      setStep(2);
    }, 3000);
  };

  const reset = () => {
    setStep(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-3">
          Kimia Kehidupan
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Biopolimer Organik (Protein)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          DNA, RNA, dan Protein adalah makromolekul yang menopang kehidupan. Mari kita simulasikan bagaimana tubuh Anda merakit asam amino menjadi protein melalui sintesis polipeptida!
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
                Apa monomer penyusun dari DNA dan Protein?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2">Pembahasan:</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                  <li>Monomer dari DNA adalah <strong>Nukleotida</strong> (terdiri dari gula pentosa, basa nitrogen, dan gugus fosfat).</li>
                  <li>Monomer dari Protein adalah <strong>Asam Amino</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Ikatan kovalen khusus apa yang menghubungkan antar asam amino dalam rantai protein?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ikatan tersebut disebut <strong>Ikatan Peptida</strong>. Ini adalah jenis ikatan amida yang terbentuk dari reaksi kondensasi antara gugus karboksil (-COOH) dari asam amino satu dengan gugus amina (-NH₂) dari asam amino lainnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl max-w-4xl mx-auto flex flex-col items-center">
        
        {showSuccess && (
           <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rose-600/95 dark:bg-rose-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
             <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
             <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Sintesis Protein Berhasil!</h3>
             <div className="bg-rose-800/50 dark:bg-rose-900/80 border border-rose-400/50 p-4 rounded-xl text-rose-50 max-w-md">
               <p className="text-sm leading-relaxed mb-2">
                 Tubuh Anda menyusun protein seperti ini setiap detik! Ribuan asam amino dirangkai menjadi rantai panjang yang kemudian melipat menjadi bentuk 3D spesifik untuk membentuk otot, enzim, dan antibodi.
               </p>
               <span className="text-rose-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
             </div>
             <button 
               onClick={() => { setShowSuccess(false); reset(); }}
               className="mt-6 px-6 py-2.5 bg-white text-rose-700 rounded-xl font-bold hover:bg-rose-50 transition-colors"
             >
               Kembali
             </button>
           </div>
        )}

        <div className="w-full flex justify-between items-center mb-8">
           <div className="flex items-center gap-2">
              <Dna className="w-6 h-6 text-rose-500" />
              <span className="font-bold text-gray-800 dark:text-gray-200">Sintesis Polipeptida (Translasi)</span>
           </div>
           {step === 0 && (
             <button 
               onClick={startSynthesis}
               className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-rose-200 dark:shadow-none"
             >
               Gabungkan Asam Amino
             </button>
           )}
           {step === 2 && (
             <button 
               onClick={reset}
               className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl transition-colors"
             >
               <RefreshCw className="w-4 h-4 inline-block mr-2" /> Ulangi
             </button>
           )}
        </div>

        <div className="relative w-full h-[300px] bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden py-10">
           
           {/* Background Info */}
           <div className="absolute top-4 inset-x-0 text-center">
              <span className="inline-block px-4 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm text-sm font-medium text-gray-600 dark:text-gray-400">
                 {step === 0 && 'Terdapat 3 asam amino bebas (Glisin, Alanin, Valin)'}
                 {step === 1 && 'Proses Kondensasi: Melepaskan H₂O dan membentuk Ikatan Peptida...'}
                 {step === 2 && 'Terbentuk Rantai Tripeptida (Protein Mini)'}
              </span>
           </div>

           {/* Visualization */}
           <div className="relative flex items-center justify-center w-full max-w-[600px] h-[150px]">
              
              {/* Glycine */}
              <div className={`absolute flex flex-col items-center transition-all duration-[2000ms] ${
                 step === 0 ? 'left-[10%] opacity-100' : 'left-[30%] opacity-100'
              }`}>
                 <div className="w-16 h-16 bg-blue-100 border-4 border-blue-400 rounded-full flex items-center justify-center font-bold text-blue-700 shadow-sm z-20">Gly</div>
                 {step === 0 && <span className="text-xs font-bold text-gray-500 mt-2">Glisin</span>}
              </div>

              {/* Alanine */}
              <div className={`absolute flex flex-col items-center transition-all duration-[2000ms] ${
                 step === 0 ? 'left-[45%] opacity-100' : 'left-[50%] opacity-100'
              }`}>
                 <div className="w-16 h-16 bg-purple-100 border-4 border-purple-400 rounded-full flex items-center justify-center font-bold text-purple-700 shadow-sm z-20">Ala</div>
                 {step === 0 && <span className="text-xs font-bold text-gray-500 mt-2">Alanin</span>}
                 
                 {/* Peptide Bond Left */}
                 <div className={`absolute top-8 right-16 h-2 bg-rose-400 z-10 transition-all duration-[2000ms] origin-right ${
                    step > 0 ? 'w-24 opacity-100' : 'w-0 opacity-0'
                 }`}></div>
              </div>

              {/* Valine */}
              <div className={`absolute flex flex-col items-center transition-all duration-[2000ms] ${
                 step === 0 ? 'right-[10%] opacity-100' : 'right-[30%] opacity-100'
              }`}>
                 <div className="w-16 h-16 bg-amber-100 border-4 border-amber-400 rounded-full flex items-center justify-center font-bold text-amber-700 shadow-sm z-20">Val</div>
                 {step === 0 && <span className="text-xs font-bold text-gray-500 mt-2">Valin</span>}
                 
                 {/* Peptide Bond Right */}
                 <div className={`absolute top-8 right-16 h-2 bg-rose-400 z-10 transition-all duration-[2000ms] origin-right ${
                    step > 0 ? 'w-24 opacity-100' : 'w-0 opacity-0'
                 }`}></div>
              </div>

              {/* Water Droplets (Condensation) */}
              {step > 0 && (
                 <>
                   <div className="absolute left-[40%] bottom-0 flex flex-col items-center animate-in slide-in-from-top-10 fade-in duration-1000">
                      <Droplet className="w-5 h-5 text-cyan-500" />
                      <span className="text-[10px] font-bold text-cyan-600">H₂O</span>
                   </div>
                   <div className="absolute right-[40%] bottom-0 flex flex-col items-center animate-in slide-in-from-top-10 fade-in duration-1000 delay-500">
                      <Droplet className="w-5 h-5 text-cyan-500" />
                      <span className="text-[10px] font-bold text-cyan-600">H₂O</span>
                   </div>
                 </>
              )}

              {/* Final State Text */}
              {step === 2 && (
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 animate-in slide-in-from-bottom-4 fade-in">
                    <Activity className="w-4 h-4 text-rose-500" />
                    <span className="font-bold text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30 px-3 py-1 rounded-lg">Rantai Peptida</span>
                 </div>
              )}
           </div>

        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" /> Makromolekul Biologi
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <p>Tubuh makhluk hidup dibangun dari tiga biopolimer utama:</p>
              
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-base">1. Protein (Polipeptida)</h4>
                <p>Terbentuk dari polimerisasi kondensasi 20 jenis asam amino. Asam amino diikat oleh ikatan amida yang secara khusus disebut <strong>Ikatan Peptida</strong>. Protein berfungsi sebagai pembangun otot, enzim pencernaan, dan antibodi.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-base">2. Asam Nukleat (DNA & RNA)</h4>
                <p>Monomernya adalah <strong>Nukleotida</strong>. Polimer ini bertugas menyimpan informasi genetik (cetak biru) untuk mengatur segala aktivitas sel, termasuk memberikan instruksi bagaimana sel harus menyusun protein.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1 text-base">3. Karbohidrat (Polisakarida)</h4>
                <p>Seperti amilum dan glikogen, merupakan polimer dari glukosa yang berfungsi sebagai penyimpan energi bagi sel.</p>
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
