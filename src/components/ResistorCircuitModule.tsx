'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb, BookOpen, X, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

export default function ResistorCircuitModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [isParallel, setIsParallel] = useState(false);
  const [r1, setR1] = useState(2); // 1-10 Ohm
  const [r2, setR2] = useState(2); // 1-10 Ohm
  const [v, setV] = useState(6); // 1-12 V
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Calculations
  const rEq = isParallel ? (r1 * r2) / (r1 + r2) : (r1 + r2);
  const power = (v * v) / rEq; // Watt
  
  // Target Power (W)
  const [targetPower, setTargetPower] = useState(18);
  
  const generateNewTarget = () => {
    // Generate achievable target
    const tParallel = Math.random() > 0.5;
    const tR1 = Math.floor(Math.random() * 9) + 1; // 1-10
    const tR2 = Math.floor(Math.random() * 9) + 1;
    const tV = Math.floor(Math.random() * 11) + 1; // 1-12
    const tReq = tParallel ? (tR1 * tR2) / (tR1 + tR2) : (tR1 + tR2);
    const tPower = (tV * tV) / tReq;
    
    // Check if it's too complex decimal, try again if not integer or simple decimal
    if (tPower % 0.5 !== 0 || tPower === targetPower) {
      return generateNewTarget();
    }
    
    setTargetPower(tPower);
  };
  
  useEffect(() => {
    if (showSuccess) return;
    
    if (Math.abs(power - targetPower) < 0.01) {
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
        setR1(1);
        setR2(1);
        setV(1);
      }, 4000);
    }
  }, [power, targetPower, showSuccess]);

  // Visuals for lightbulb
  const maxExpectedPower = 144; // V=12, Req=1 -> 144
  const brightness = Math.min(100, (power / 20) * 100); // Scale up to 100% opacity for glow

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 2: Arus Searah
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Rangkaian Hambatan & Daya</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Rangkai hambatan (Resistor) secara Seri atau Paralel untuk mengendalikan Daya Listrik (P) yang mencapai Bohlam Lampu. Semakin besar Daya, semakin terang lampu menyala!
          </p>
          
          <div className="flex flex-wrap gap-3">
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
            </button>
          </div>
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Penerapan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Lampu Rumah</p>
                  <p className="mb-2">Jika Anda memiliki dua lampu dan ingin menyalakannya setajam mungkin, haruskah disusun secara Seri atau Paralel?</p>
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mb-1">Penyelesaian:</p>
                  <p>Secara <strong>Paralel!</strong> Resistor (hambatan) yang disusun paralel akan memperkecil total hambatan pengganti (Req). Karena P = V² / Req, semakin kecil Req, semakin besar Daya (P) yang dihasilkan!</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-amber-500 mb-2" />
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase text-center mb-1">Target Daya</span>
          <span className="text-xl font-black text-amber-600 dark:text-amber-500 text-center leading-tight">{targetPower} Watt</span>
          <span className="text-xs text-amber-500/70 mt-2 font-mono">Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Hambatan Tepat!</h3>
                <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">Daya: {power} Watt</p>
                  <p className="text-sm leading-relaxed">
                    Tepat! Anda menyusun hambatan secara <strong>{isParallel ? 'Paralel' : 'Seri'}</strong> sehingga Hambatan Total (R) menjadi {rEq.toFixed(2)} Ω. Dengan tegangan {v} V, daya yang dihasilkan sesuai target!
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            <div className="z-10 w-full relative h-64 flex items-center justify-center">
               
               {/* Lightbulb Glow Effect */}
               <div 
                 className="absolute right-[40px] top-[10px] w-24 h-24 rounded-full"
                 style={{ 
                   background: `radial-gradient(circle, rgba(253,224,71,${brightness/100}) 0%, rgba(253,224,71,0) 70%)`,
                   filter: `blur(${power/4}px)`,
                   transform: `scale(${1 + power/40})`,
                   transition: 'all 0.3s ease'
                 }}
               />

               <svg width="450" height="250" className="overflow-visible">
                 
                 {/* Battery / Source */}
                 <g transform="translate(40, 125)">
                    <rect x="-10" y="-20" width="20" height="40" fill="#374151" rx="2" />
                    <rect x="-5" y="-24" width="10" height="4" fill="#9ca3af" />
                    <text x="-25" y="-15" fill="#ef4444" fontSize="16" fontWeight="bold">+</text>
                    <text x="-20" y="30" fill="#9ca3af" fontSize="16" fontWeight="bold">-</text>
                    <text x="0" y="5" fill="#fff" fontSize="12" textAnchor="middle" fontWeight="bold" transform="rotate(-90)">{v}V</text>
                 </g>

                 {/* Resistor symbol path generator */}
                 {/* Zigzag for resistor */}
                 <defs>
                   <g id="resistor" stroke="#fbbf24" strokeWidth="3" fill="none">
                     <path d="M 0 0 L 10 0 L 15 -10 L 25 10 L 35 -10 L 45 10 L 55 -10 L 60 0 L 70 0" />
                   </g>
                 </defs>

                 {/* Wires & Resistors */}
                 {isParallel ? (
                   // Parallel Circuit
                   <g stroke="#9ca3af" strokeWidth="3" fill="none">
                     <path d="M 40 105 L 40 40 L 120 40" />
                     <path d="M 40 145 L 40 210 L 120 210" />
                     
                     {/* Junctions */}
                     <circle cx="120" cy="125" r="4" fill="#9ca3af" />
                     <path d="M 120 40 L 120 210" />
                     
                     <path d="M 120 80 L 160 80" />
                     <use href="#resistor" x="160" y="80" />
                     <path d="M 230 80 L 270 80" />
                     <text x="195" y="60" fill="#fff" fontSize="14" textAnchor="middle" stroke="none">{r1}Ω</text>
                     
                     <path d="M 120 170 L 160 170" />
                     <use href="#resistor" x="160" y="170" />
                     <path d="M 230 170 L 270 170" />
                     <text x="195" y="150" fill="#fff" fontSize="14" textAnchor="middle" stroke="none">{r2}Ω</text>
                     
                     <path d="M 270 40 L 270 210" />
                     <circle cx="270" cy="125" r="4" fill="#9ca3af" />
                     
                     <path d="M 270 40 L 370 40 L 370 110" />
                     <path d="M 270 210 L 370 210 L 370 140" />
                   </g>
                 ) : (
                   // Series Circuit
                   <g stroke="#9ca3af" strokeWidth="3" fill="none">
                     <path d="M 40 105 L 40 40 L 120 40" />
                     
                     <use href="#resistor" x="120" y="40" />
                     <text x="155" y="25" fill="#fff" fontSize="14" textAnchor="middle" stroke="none">{r1}Ω</text>
                     
                     <path d="M 190 40 L 230 40" />
                     
                     <use href="#resistor" x="230" y="40" />
                     <text x="265" y="25" fill="#fff" fontSize="14" textAnchor="middle" stroke="none">{r2}Ω</text>
                     
                     <path d="M 300 40 L 370 40 L 370 110" />
                     <path d="M 40 145 L 40 210 L 370 210 L 370 140" />
                   </g>
                 )}
                 
                 {/* Lightbulb (Representing Power Dissipation) */}
                 <g transform="translate(370, 125)">
                   {/* Bulb Base */}
                   <rect x="-10" y="-15" width="20" height="30" fill="#374151" stroke="#9ca3af" strokeWidth="2" />
                   {/* Glass */}
                   <circle cx="0" cy="-25" r="25" fill={power > 0 ? `rgba(253, 224, 71, ${Math.max(0.2, brightness/100)})` : 'rgba(255,255,255,0.1)'} stroke="#e5e7eb" strokeWidth="2" />
                   {/* Filament */}
                   <path d="M -8 -15 L -10 -25 L 0 -35 L 10 -25 L 8 -15" stroke={power > 0 ? "#fef08a" : "#9ca3af"} strokeWidth="2" fill="none" />
                 </g>
               </svg>
            </div>
            
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 flex flex-col gap-1">
               <span className="text-xs text-slate-400 font-bold uppercase">Hambatan Pengganti</span>
               <div className="font-mono text-xl font-black text-amber-400">
                 {rEq % 1 === 0 ? rEq : rEq.toFixed(2)} Ω
               </div>
            </div>
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              {isParallel ? (
                <span> Di rangkaian <strong>Paralel</strong>, arus memiliki 2 cabang untuk lewat, sehingga Hambatan Total (Req) <strong>mengecil</strong> ({rEq.toFixed(2)} Ω). Hal ini menyebabkan Arus (I) membesar, dan Daya (P) naik drastis. Lampu menyala sangat terang!</span>
              ) : (
                <span> Di rangkaian <strong>Seri</strong>, arus harus melewati kedua rintangan secara berurutan, sehingga Hambatan Total (Req) <strong>membesar</strong> ({rEq.toFixed(2)} Ω). Akibatnya arus melemah, dan Daya turun.</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-300">Rangkaian (Seri / Paralel)</span>
            <button 
              onClick={() => setIsParallel(!isParallel)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isParallel ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isParallel ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-red-800 dark:text-red-300">Tegangan (V)</label>
                <span className="text-sm font-mono font-bold text-red-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{v} Volt</span>
              </div>
              <input type="range" min="1" max="12" step="1" value={v} onChange={e => setV(parseInt(e.target.value))} className="w-full accent-red-500" />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-amber-800 dark:text-amber-300">Resistor 1 (R₁)</label>
                <span className="text-sm font-mono font-bold text-amber-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{r1} Ω</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={r1} onChange={e => setR1(parseInt(e.target.value))} className="w-full accent-amber-500" />
            </div>
            
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-orange-800 dark:text-orange-300">Resistor 2 (R₂)</label>
                <span className="text-sm font-mono font-bold text-orange-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{r2} Ω</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={r2} onChange={e => setR2(parseInt(e.target.value))} className="w-full accent-orange-500" />
            </div>
          </div>
          
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-100 dark:border-amber-800/30 text-center relative overflow-hidden">
             {/* Glow effect for power display */}
             <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle, rgba(245,158,11,${brightness/100}) 0%, transparent 100%)`}}></div>
             
             <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 relative z-10">Daya Lampu (P)</p>
             <div className="font-mono text-4xl font-black text-amber-600 dark:text-amber-300 relative z-10">
                {power % 1 === 0 ? power : power.toFixed(2)} W
             </div>
             <p className="text-xs text-amber-500/70 mt-2 font-mono bg-white dark:bg-gray-800 inline-block px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800/50 relative z-10">P = V² / Req</p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-500" /> Rangkaian & Daya Listrik
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Resistor Seri</h4>
                  <p className="font-mono text-blue-600 dark:text-blue-400 mb-2 font-bold">R = R₁ + R₂</p>
                  <p className="text-xs">Hambatan total makin besar. Arus makin kecil.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Resistor Paralel</h4>
                  <p className="font-mono text-blue-600 dark:text-blue-400 mb-2 font-bold">1/R = 1/R₁ + 1/R₂</p>
                  <p className="text-xs">Hambatan total makin kecil (kurang dari nilai terkecil).</p>
                </div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Daya Listrik (P)</h4>
                <p className="mb-2">Energi yang dilepaskan per detik (terlihat sebagai terang lampu). Dirumuskan sebagai:</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-3 py-2 rounded-lg inline-block border border-amber-200 dark:border-amber-700 text-amber-600 font-bold text-lg">
                  P = V² / R
                </p>
                <p className="mt-2 text-xs">Semakin kecil R (misal dengan dirangkai paralel), maka P akan membesar, dan lampu makin terang!</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-amber-200 dark:shadow-none"
              >
                Paham!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
