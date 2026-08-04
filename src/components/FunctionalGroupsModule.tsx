'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Beaker, Pipette, Flame } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Substance = {
  id: string;
  name: string;
  group: string;
  formula: string;
  initialColor: string;
};

type Reagent = {
  id: string;
  name: string;
  desc: string;
  color: string;
};

const SUBSTANCES: Substance[] = [
  { id: 'etanol', name: 'Etanol', group: 'Alkohol (-OH)', formula: 'CH₃-CH₂-OH', initialColor: 'bg-slate-100/40 dark:bg-slate-800/40' },
  { id: 'propanal', name: 'Propanal', group: 'Aldehid (-CHO)', formula: 'CH₃-CH₂-CHO', initialColor: 'bg-slate-100/40 dark:bg-slate-800/40' },
  { id: 'propanon', name: 'Propanon (Aseton)', group: 'Keton (-CO-)', formula: 'CH₃-CO-CH₃', initialColor: 'bg-slate-100/40 dark:bg-slate-800/40' },
  { id: 'asam_asetat', name: 'Asam Asetat', group: 'Karboksilat (-COOH)', formula: 'CH₃-COOH', initialColor: 'bg-slate-100/40 dark:bg-slate-800/40' },
];

const REAGENTS: Reagent[] = [
  { id: 'tollens', name: 'Uji Tollens (AgNO₃ + NH₃)', desc: 'Pengoksidasi lemah, mendeteksi Aldehid.', color: 'bg-gray-200/60 dark:bg-gray-700/60' },
  { id: 'fehling', name: 'Uji Fehling (Cu²⁺)', desc: 'Pengoksidasi lemah, warna awal biru.', color: 'bg-blue-500/60 dark:bg-blue-600/60' },
  { id: 'natrium', name: 'Logam Natrium (Na)', desc: 'Logam aktif pembentuk basa kuat.', color: 'bg-stone-300' },
  { id: 'lakmus', name: 'Kertas Lakmus Biru', desc: 'Indikator asam-basa.', color: 'bg-blue-400' },
];

export default function FunctionalGroupsModule() {
  const { addScore } = useUser();
  const [activeSubstance, setActiveSubstance] = useState<Substance>(SUBSTANCES[0]);
  const [activeReagent, setActiveReagent] = useState<Reagent>(REAGENTS[0]);
  const [reactionState, setReactionState] = useState<'idle' | 'dropping' | 'reacted'>('idle');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [testedReactions, setTestedReactions] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const testReaction = () => {
    setReactionState('dropping');
    setTimeout(() => {
      setReactionState('reacted');
      
      const reactionId = `${activeSubstance.id}-${activeReagent.id}`;
      setTestedReactions(prev => {
        const next = new Set(prev).add(reactionId);
        
        // Count positive reactions they've found
        // 1. tollens + propanal
        // 2. fehling + propanal
        // 3. natrium + etanol (or asam asetat)
        // 4. lakmus + asam asetat
        const positiveCount = Array.from(next).filter(id => 
          id === 'propanal-tollens' || 
          id === 'propanal-fehling' || 
          id === 'etanol-natrium' || 
          id === 'asam_asetat-natrium' || 
          id === 'asam_asetat-lakmus'
        ).length;
        
        if (positiveCount >= 3 && !showSuccess) {
          setTimeout(() => {
            setShowSuccess(true);
            addScore(100);
          }, 1500);
        }
        
        return next;
      });
      
    }, 1500);
  };

  const getResult = () => {
    const sid = activeSubstance.id;
    const rid = activeReagent.id;

    if (rid === 'tollens') {
       if (sid === 'propanal') return { resultText: 'Positif (Terbentuk Cermin Perak)', resultStyle: 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 opacity-90 border-2 border-gray-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.8)]', hasBubbles: false };
       return { resultText: 'Negatif (Tidak Ada Perubahan)', resultStyle: activeSubstance.initialColor, hasBubbles: false };
    }
    
    if (rid === 'fehling') {
       if (sid === 'propanal') return { resultText: 'Positif (Endapan Merah Bata)', resultStyle: 'bg-red-600/90 dark:bg-red-700/90 border-b-8 border-red-800', hasBubbles: false };
       return { resultText: 'Negatif (Tetap Biru)', resultStyle: 'bg-blue-500/60 dark:bg-blue-600/60', hasBubbles: false };
    }
    
    if (rid === 'natrium') {
       if (sid === 'etanol' || sid === 'asam_asetat') return { resultText: 'Positif (Gelembung Gas H₂)', resultStyle: activeSubstance.initialColor, hasBubbles: true };
       return { resultText: 'Negatif (Tidak Ada Reaksi)', resultStyle: activeSubstance.initialColor, hasBubbles: false };
    }
    
    if (rid === 'lakmus') {
       if (sid === 'asam_asetat') return { resultText: 'Positif (Lakmus Biru Menjadi Merah)', resultStyle: 'bg-red-400/80', hasBubbles: false };
       return { resultText: 'Negatif (Tetap Biru)', resultStyle: 'bg-blue-400/80', hasBubbles: false };
    }

    return { resultText: 'Negatif', resultStyle: activeSubstance.initialColor, hasBubbles: false };
  };

  const currentResult = reactionState === 'reacted' ? getResult() : { resultText: '', resultStyle: activeSubstance.initialColor, hasBubbles: false };

  const handleReset = () => {
    setReactionState('idle');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Lab Mini
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Identifikasi Gugus Fungsi
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Beberapa senyawa organik memiliki kesamaan rumus umum namun berbeda sifat karena gugus fungsinya. Gunakan uji laboratorium kimia berikut untuk membedakan Alkohol, Eter, Aldehid, Keton, dan Asam Karboksilat.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-sm font-semibold rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-amber-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Senyawa organik dengan rumus molekul C₃H₆O diuji dengan pereaksi Tollens dan tidak menghasilkan cermin perak. Senyawa tersebut adalah...
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rumus C₃H₆O memiliki format CₙH₂ₙO, yang merupakan rumus umum untuk Aldehid dan Keton (isomer fungsi). Karena tidak bereaksi dengan uji Tollens (negatif), maka senyawa tersebut adalah <strong>Keton</strong> (Propanon/Aseton). Aldehid bereaksi positif dengan Tollens.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Senyawa etanol (alkohol) dan dimetil eter (eter) merupakan isomer. Bagaimana cara membedakan keduanya secara kimiawi di laboratorium?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mereaksikan keduanya dengan <strong>logam aktif seperti Natrium (Na)</strong>. Alkohol (etanol) akan bereaksi melepaskan gas hidrogen (H₂) membentuk natrium etoksida. Sedangkan eter (dimetil eter) tidak bereaksi dengan logam Na karena tidak memiliki ikatan O-H.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Settings Panel (Left) */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">1. Pilih Sampel Uji</h3>
            <div className="space-y-2">
              {SUBSTANCES.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => { setActiveSubstance(sub); handleReset(); }}
                  className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition-all ${
                    activeSubstance.id === sub.id
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                      : 'border-gray-200 hover:border-emerald-300 dark:border-gray-700 dark:hover:border-emerald-600'
                  }`}
                >
                  <div>
                    <div className={`font-bold ${activeSubstance.id === sub.id ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                      {sub.name}
                    </div>
                    <div className="text-xs text-gray-500">{sub.group}</div>
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-400">{sub.formula}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">2. Pilih Pereaksi Kimia</h3>
            <div className="space-y-2">
              {REAGENTS.map(rea => (
                <button
                  key={rea.id}
                  onClick={() => { setActiveReagent(rea); handleReset(); }}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    activeReagent.id === rea.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-600'
                  }`}
                >
                  <div className={`font-bold ${activeReagent.id === rea.id ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                    {rea.name}
                  </div>
                  <div className="text-xs text-gray-500">{rea.desc}</div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Visualizer Area (Right) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col items-center">
          
          {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Detektif Kimia!</h3>
               <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                 <p className="font-bold text-lg mb-2">Analisis Berhasil</p>
                 <p className="text-sm leading-relaxed mb-2">
                   Anda telah berhasil menemukan setidaknya 3 reaksi pengujian spesifik yang bernilai Positif. Ini menunjukkan bahwa meskipun senyawa tersebut tidak berwarna, kita bisa mengenalinya lewat reaksinya.
                 </p>
                 <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); handleReset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
          )}

          <div className="w-full flex justify-between items-start z-10 mb-8">
             <div className="text-left">
                <span className="text-xs text-gray-500 font-bold block mb-1">Sampel Uji</span>
                <span className="font-mono bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg text-sm border border-gray-200 dark:border-gray-700">
                   {activeSubstance.name} ({activeSubstance.formula})
                </span>
             </div>
             
             {reactionState === 'reacted' && currentResult.resultText && (
                <div className="text-right animate-in fade-in slide-in-from-right-4">
                   <span className="text-xs text-gray-500 font-bold block mb-1">Hasil Reaksi</span>
                   <span className={`font-bold px-3 py-1.5 rounded-lg text-sm border ${
                      currentResult.resultText.includes('Positif') ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'
                   }`}>
                      {currentResult.resultText}
                   </span>
                </div>
             )}
          </div>

          <div className="flex-1 flex justify-center items-end relative z-10 w-full pb-10 mt-6">
             
             {/* Pipette / Dropper (Animates down) */}
             <div className={`absolute -top-12 z-30 transition-all duration-1000 ${reactionState === 'dropping' ? 'translate-y-24 scale-100 opacity-100' : 'translate-y-0 scale-90 opacity-0'}`}>
                <div className="relative">
                   <Pipette className="w-16 h-16 text-gray-600 dark:text-gray-300 drop-shadow-lg -rotate-45" />
                   {reactionState === 'dropping' && (
                     <div className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full ${activeReagent.color} animate-[dropLiquid_1s_ease-in-out_infinite]`}></div>
                   )}
                </div>
             </div>

             {/* Test Tube */}
             <div className="relative w-28 h-64 flex justify-center z-20">
                <div className="absolute inset-0 border-4 border-t-0 border-white/60 dark:border-white/20 rounded-b-[40px] drop-shadow-xl z-20 pointer-events-none"></div>
                <div className="absolute top-0 inset-x-0 h-4 border-2 border-white/60 dark:border-white/20 rounded-[50%] z-20 pointer-events-none"></div>
                
                {/* Liquid Inside */}
                <div className={`absolute bottom-2 inset-x-2 rounded-b-[30px] transition-all duration-1000 ${reactionState === 'reacted' ? currentResult.resultStyle : activeSubstance.initialColor} ${reactionState === 'dropping' ? 'h-36' : 'h-32'} z-10 overflow-hidden`}>
                   
                   {/* Liquid Surface */}
                   <div className="absolute top-0 inset-x-0 h-2 bg-white/30 dark:bg-black/20 rounded-[50%] z-20"></div>

                   {/* Gas Bubbles Effect */}
                   {currentResult.hasBubbles && reactionState === 'reacted' && (
                      <div className="absolute inset-0">
                         {Array.from({length: 15}).map((_, i) => (
                           <div 
                              key={i} 
                              className="absolute bottom-0 w-2 h-2 rounded-full border border-white/50 bg-white/20 animate-[bubbleUp_2s_ease-in_infinite]"
                              style={{ 
                                left: `${Math.random() * 80 + 10}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${1 + Math.random() * 2}s` 
                              }}
                           />
                         ))}
                      </div>
                   )}
                </div>
             </div>
             
             {/* Heat source (Bunsen burner if Tollens or Fehling) */}
             {(activeReagent.id === 'tollens' || activeReagent.id === 'fehling') && reactionState === 'reacted' && (
               <div className="absolute -bottom-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500 z-10">
                 <Flame className="w-12 h-12 text-orange-500 animate-pulse drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                 <div className="w-6 h-4 bg-gray-400 rounded-t-md"></div>
               </div>
             )}

          </div>
          
          {/* Progress Bar & Controls */}
          <div className="mt-8 w-full max-w-md flex flex-col items-center gap-4 z-20">
             
             <div className="flex gap-3">
               {reactionState === 'idle' ? (
                  <button
                    onClick={testReaction}
                    className="px-8 py-3 rounded-xl font-bold flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all"
                  >
                    <Beaker className="w-5 h-5" />
                    Uji Sampel
                  </button>
               ) : (
                  <button
                    onClick={handleReset}
                    disabled={reactionState === 'dropping'}
                    className="px-6 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
                  </button>
               )}
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
                <BookOpen className="h-5 w-5 text-amber-500" /> Pengujian Gugus Fungsi
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Uji Membedakan Aldehid & Keton</h4>
                <p>Aldehid dan Keton memiliki rumus umum yang sama (C<sub>n</sub>H<sub>2n</sub>O). Namun, aldehid lebih mudah dioksidasi karena memiliki atom H yang terikat pada karbon karbonil.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Uji Tollens:</strong> Aldehid mereduksi ion Ag⁺ menjadi endapan perak (Ag) yang menempel di dinding tabung (cermin perak). Keton tidak bereaksi.</li>
                  <li><strong>Uji Fehling:</strong> Aldehid mereduksi ion Cu²⁺ (biru) menjadi endapan merah bata (Cu₂O). Keton tidak bereaksi.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Uji Logam Natrium (Na)</h4>
                <p>Digunakan untuk membedakan Alkohol (-OH) dan Eter (-O-), yang memiliki rumus umum C<sub>n</sub>H<sub>2n+2</sub>O.</p>
                <p className="mt-1">Alkohol bereaksi dengan logam Na karena atom H pada gugus -OH dapat digantikan (substitusi) oleh logam aktif, menghasilkan <strong>gas Hidrogen (H₂)</strong>. Eter tidak bereaksi.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Uji Kertas Lakmus</h4>
                <p>Asam Karboksilat bersifat asam lemah, sehingga dapat memerahkan kertas lakmus biru. Alkohol, eter, aldehid, dan keton cenderung netral.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dropLiquid {
          0% { transform: translate(-50%, 0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, 40px) scale(0.5); opacity: 0; }
        }
        @keyframes bubbleUp {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-100px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
