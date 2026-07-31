'use client';

import React, { useState, useEffect } from 'react';
import { Battery, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

export default function OhmLawModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [v, setV] = useState(6); // Voltage 1 to 24V
  const [r, setR] = useState(3); // Resistance 1 to 10 Ohm
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Calculated Current (I = V / R)
  const current = v / r;
  
  // Target Current
  const [targetI, setTargetI] = useState(2); 
  
  const generateNewTarget = () => {
    // Current is V / R. Let's find a valid integer or .5 decimal target
    // between 0.5 and 12
    const possibleV = Math.floor(Math.random() * 24) + 1;
    const possibleR = Math.floor(Math.random() * 10) + 1;
    const tI = possibleV / possibleR;
    
    if (tI % 0.5 !== 0 || tI === targetI || tI === current) {
      return generateNewTarget();
    }
    
    setTargetI(tI);
  };
  
  useEffect(() => {
    if (showSuccess) return;
    
    // Check if current matches target
    if (Math.abs(current - targetI) < 0.01) {
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
        setV(1);
        setR(1);
      }, 4000);
    }
  }, [current, targetI, showSuccess]);

  // Visuals for electrons
  // Electron speed is proportional to current. Higher current = faster animation.
  // Using an array to generate multiple electron particles
  const electrons = Array.from({ length: 15 });
  const animationDuration = current === 0 ? 0 : Math.max(0.5, 4 / current);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 2: Arus Searah
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Arus, Hambatan & Hukum Ohm</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Atur tegangan baterai (V) dan perhatikan rintangan di dalam kawat (R). Semakin besar tegangan, semakin kuat dorongannya. Namun, semakin besar hambatan, arus elektron (I) semakin terhambat!
          </p>
          
          <div className="flex flex-wrap gap-3">
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
            </button>
          </div>
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Mengganti Baterai</p>
                  <p className="mb-2">Sebuah lampu senter memiliki lampu dengan hambatan tetap 3 Ω. Awalnya dihubungkan ke baterai 1.5 V, lalu diganti baterai 6 V. Apa akibatnya terhadap arus?</p>
                  <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Penyelesaian:</p>
                  <p>Arus (I) = V / R. Awalnya I = 1.5 / 3 = 0.5 Ampere. Setelah baterai diganti, I = 6 / 3 = 2.0 Ampere. Arus naik 4 kali lipat, lampu jadi sangat terang!</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-orange-500 mb-2" />
          <span className="text-xs text-orange-700 dark:text-orange-400 font-bold uppercase text-center mb-1">Target Arus</span>
          <span className="text-xl font-black text-orange-600 dark:text-orange-500 text-center leading-tight">{targetI} Ampere</span>
          <span className="text-xs text-orange-500/70 mt-2 font-mono">Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="h-20 w-20 text-yellow-300 fill-yellow-300 mb-3 animate-bounce" />
                <h3 className="text-4xl font-black text-white drop-shadow-md mb-2">Arus Tepat!</h3>
                <div className="bg-emerald-800/50 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">Arus (I): {current} A</p>
                  <p className="text-sm leading-relaxed">
                    Kerja bagus! Tegangan {v} V dibagi dengan Hambatan {r} Ω menghasilkan Arus persis {current} Ampere.
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            {/* Wire and Circuit Visualization */}
            <div className="z-10 w-full relative flex flex-col items-center">
               
               {/* Main Wire Cylinder */}
               <div className="w-full max-w-lg h-24 relative overflow-hidden rounded-lg shadow-inner flex items-center justify-center" 
                    style={{ background: 'linear-gradient(to bottom, #d97706, #fbbf24, #d97706)' }}>
                 
                 {/* Visual Representation of Resistance (Obstacles in wire) */}
                 <div className="absolute inset-0 flex justify-around items-center opacity-70">
                   {Array.from({length: r}).map((_, i) => (
                      <div key={`res-${i}`} className="w-4 h-full bg-amber-950/40 transform -skew-x-12"></div>
                   ))}
                 </div>
                 
                 {/* Electrons moving */}
                 <div className="absolute inset-0 flex">
                   {electrons.map((_, i) => {
                     // Offset start times so they don't clump
                     const delay = (i / electrons.length) * animationDuration;
                     return (
                       <div 
                         key={`e-${i}`}
                         className="absolute w-4 h-4 bg-sky-200 rounded-full shadow-[0_0_8px_4px_rgba(186,230,253,0.8)] border border-white"
                         style={{
                           top: `${20 + Math.random() * 60}%`, // random vertical pos within wire
                           left: '-5%',
                           animation: current > 0 ? `moveElectron ${animationDuration}s linear infinite` : 'none',
                           animationDelay: `-${delay}s`
                         }}
                       />
                     );
                   })}
                 </div>

                 <style dangerouslySetInnerHTML={{__html: `
                   @keyframes moveElectron {
                     0% { transform: translateX(0); }
                     100% { transform: translateX(600px); }
                   }
                 `}} />
               </div>
               
               {/* Battery and Wires */}
               <div className="w-full max-w-lg mt-6 flex justify-between items-center relative px-8">
                 {/* Left Wire Down */}
                 <div className="absolute left-8 top-[-24px] w-2 h-16 bg-slate-400"></div>
                 {/* Right Wire Down */}
                 <div className="absolute right-8 top-[-24px] w-2 h-16 bg-slate-400"></div>
                 {/* Bottom Connecting Wire */}
                 <div className="w-full h-2 bg-slate-400 relative top-6"></div>
                 
                 {/* Battery Component */}
                 <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center bg-slate-800 p-2 rounded-xl border-2 border-slate-600 shadow-xl z-10">
                   <div className="w-6 h-2 bg-slate-400 rounded-t-sm mb-1"></div>
                   <div className="w-24 h-12 bg-gradient-to-r from-red-600 via-red-500 to-black rounded flex items-center justify-between px-3">
                     <span className="text-white font-black text-xl">+</span>
                     <span className="text-white font-bold">{v}V</span>
                     <span className="text-white font-black text-xl">-</span>
                   </div>
                 </div>
               </div>

            </div>
            
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
               <span className="text-xs text-slate-400 font-bold uppercase">Kecepatan Elektron</span>
               <div className={`font-black ${current === 0 ? 'text-slate-500' : current > 3 ? 'text-rose-400' : 'text-sky-400'}`}>
                 {current === 0 ? 'Berhenti' : current > 3 ? 'Sangat Cepat' : 'Normal'}
               </div>
            </div>
            
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              <span> 
                Sesuai Hukum Ohm, Kuat Arus (I) berbanding lurus dengan Tegangan (V) dan berbanding terbalik dengan Hambatan (R).
                Saat ini baterai mendorong dengan kekuatan {v} Volt, tetapi mendapat rintangan sebesar {r} Ohm, sehingga arus yang mengalir adalah {current % 1 === 0 ? current : current.toFixed(2)} Ampere.
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <MoveHorizontal className="h-4 w-4 text-orange-500" />
             <h3 className="font-bold text-slate-900 dark:text-white">Panel Kendali</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-red-800 dark:text-red-300">Tegangan (V)</label>
                <span className="text-sm font-mono font-bold text-red-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm">{v} Volt</span>
              </div>
              <input type="range" min="1" max="24" step="1" value={v} onChange={e => setV(parseInt(e.target.value))} className="w-full accent-red-500" />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-amber-800 dark:text-amber-300">Hambatan (R)</label>
                <span className="text-sm font-mono font-bold text-amber-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm">{r} Ω</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={r} onChange={e => setR(parseInt(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>
          
          <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800/30 text-center">
             <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">Kuat Arus (I)</p>
             <div className="font-mono text-4xl font-black text-orange-700 dark:text-orange-300">
                {current % 1 === 0 ? current : current.toFixed(2)} A
             </div>
             <p className="text-xs text-orange-500/70 mt-2 font-mono bg-white dark:bg-slate-800 inline-block px-3 py-1 rounded-full border border-orange-200 dark:border-orange-800">I = V / R</p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" /> Hukum Ohm
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Konsep Dasar</h4>
                <p className="mb-2">Hukum Ohm menyatakan bahwa kuat arus listrik (I) yang mengalir melalui sebuah konduktor berbanding lurus dengan beda potensial atau tegangan (V), dan berbanding terbalik dengan hambatannya (R).</p>
                <p className="font-mono bg-white dark:bg-slate-900 px-3 py-2 rounded-lg inline-block border border-slate-200 dark:border-slate-700 text-orange-600 font-bold text-lg">
                  I = V / R
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-800/30">
                  <h4 className="font-bold text-red-800 dark:text-red-400 mb-1">V (Volt)</h4>
                  <p className="text-xs">Tegangan: Kekuatan "dorongan" elektron</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-800/30">
                  <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">R (Ohm)</h4>
                  <p className="text-xs">Hambatan: Rintangan di kawat</p>
                </div>
                <div className="bg-sky-50 dark:bg-sky-900/20 p-3 rounded-xl border border-sky-100 dark:border-sky-800/30">
                  <h4 className="font-bold text-sky-800 dark:text-sky-400 mb-1">I (Ampere)</h4>
                  <p className="text-xs">Arus: Jumlah elektron yang mengalir</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200 dark:shadow-none"
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
