'use client';

import React, { useState, useEffect } from 'react';
import { GitMerge, BookOpen, X, Target, Star, MoveHorizontal, Lightbulb, Activity } from 'lucide-react';

export default function KirchhoffModule({ mode = 'basic' }: { mode?: 'basic' | 'complex' }) {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // --- STATE FOR BASIC (KIRCHHOFF I - NODE) ---
  const [i1, setI1] = useState(2); // In
  const [i2, setI2] = useState(3); // In
  const [i3, setI3] = useState(4); // Out
  const [i4, setI4] = useState(1); // Out
  
  const inTotal = i1 + i2;
  const outTotal = i3 + i4;
  const isBalanced = inTotal === outTotal;
  
  const [targetNodeI, setTargetNodeI] = useState(5);

  // --- STATE FOR COMPLEX (KIRCHHOFF II - LOOP) ---
  const [v1, setV1] = useState(12); // Battery 1 (Left, points Up)
  const [v2, setV2] = useState(6);  // Battery 2 (Right, points Up, so it opposes V1)
  const [r, setR] = useState(2);    // Resistor top
  
  // I = (V1 - V2) / R (Assuming clockwise loop)
  const loopCurrent = (v1 - v2) / r;
  
  const [targetLoopI, setTargetLoopI] = useState(3);

  const generateNewTarget = () => {
    if (mode === 'basic') {
      const targets = [4, 5, 6, 7, 8, 9, 10];
      const available = targets.filter(t => t !== targetNodeI);
      setTargetNodeI(available[Math.floor(Math.random() * available.length)]);
    } else {
      // Loop Target
      // possible V: 1-24, R: 1-10
      const tv1 = Math.floor(Math.random() * 24) + 1;
      const tv2 = Math.floor(Math.random() * 12) + 1;
      const tr = Math.floor(Math.random() * 5) + 1;
      const tI = (tv1 - tv2) / tr;
      if (tI % 0.5 !== 0 || tI === targetLoopI || tI <= 0) {
        return generateNewTarget();
      }
      setTargetLoopI(tI);
    }
  };

  useEffect(() => {
    if (showSuccess) return;
    
    if (mode === 'basic') {
      if (isBalanced && inTotal === targetNodeI) {
        triggerSuccess();
      }
    } else {
      if (Math.abs(loopCurrent - targetLoopI) < 0.01) {
        triggerSuccess();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inTotal, outTotal, isBalanced, targetNodeI, loopCurrent, targetLoopI, showSuccess, mode]);

  const triggerSuccess = () => {
    setShowSuccess(true);
    setScore(s => s + 100);
    setTimeout(() => {
      setShowSuccess(false);
      generateNewTarget();
      if (mode === 'basic') {
        setI1(1); setI2(1); setI3(1); setI4(1);
      } else {
        setV1(1); setV2(1); setR(1);
      }
    }, 4000);
  };

  const isBasic = mode === 'basic';

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${isBasic ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'}`}>
            {isBasic ? <GitMerge className="h-3.5 w-3.5" /> : <Activity className="h-3.5 w-3.5" />} 
            Bab 2: Arus Searah
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {isBasic ? 'Hukum Kirchhoff I (Titik Percabangan)' : 'Hukum Kirchhoff II (Loop Tertutup)'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            {isBasic 
              ? 'Menurut Kirchhoff I, total arus yang masuk ke suatu titik percabangan harus sama dengan total arus yang keluar dari titik tersebut. Ibarat air dalam pipa, tidak ada air yang hilang atau tercipta di percabangan!'
              : 'Menurut Kirchhoff II, total penurunan tegangan pada satu loop tertutup harus sama dengan nol (ΣV + ΣIR = 0). Dua baterai yang melawan satu sama lain akan saling mengurangi kekuatan dorongnya.'}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowTheoryModal(true)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isBasic ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400' : 'bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-400'}`}
            >
              <BookOpen className="h-4 w-4" /> Baca Teori Singkat
            </button>
          </div>
        </div>
        
        <div className={`flex flex-col items-center justify-center border rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0 ${isBasic ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-900/50' : 'bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:border-purple-900/50'}`}>
          <Target className={`h-8 w-8 mb-2 ${isBasic ? 'text-indigo-500' : 'text-purple-500'}`} />
          <span className={`text-xs font-bold uppercase text-center mb-1 ${isBasic ? 'text-indigo-700 dark:text-indigo-400' : 'text-purple-700 dark:text-purple-400'}`}>
            {isBasic ? 'Target Arus Masuk' : 'Target Arus Loop'}
          </span>
          <span className={`text-xl font-black text-center leading-tight ${isBasic ? 'text-indigo-600 dark:text-indigo-500' : 'text-purple-600 dark:text-purple-500'}`}>
            {isBasic ? `${targetNodeI} Ampere` : `${targetLoopI} Ampere`}
          </span>
          <span className={`text-xs mt-2 font-mono ${isBasic ? 'text-indigo-500/70' : 'text-purple-500/70'}`}>Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Loop Seimbang!</h3>
                <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">
                    {isBasic ? `Seimbang di ${inTotal}A` : `Arus Loop: ${loopCurrent}A`}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {isBasic 
                      ? `Arus Masuk (${i1}+${i2}) sama dengan Arus Keluar (${i3}+${i4}). Persis sesuai target ${targetNodeI}A!`
                      : `(V₁ - V₂) / R = (${v1} - ${v2}) / ${r} = ${loopCurrent} Ampere. Tepat sasaran!`}
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            <div className="z-10 w-full relative h-64 flex items-center justify-center">
               {isBasic ? (
                 // --- BASIC NODE VISUALIZATION ---
                 <svg width="400" height="250" className="overflow-visible">
                   {/* Wires */}
                   <path d="M 50 50 L 200 125" stroke="#94a3b8" strokeWidth="8" />
                   <path d="M 50 200 L 200 125" stroke="#94a3b8" strokeWidth="8" />
                   <path d="M 200 125 L 350 50" stroke="#94a3b8" strokeWidth="8" />
                   <path d="M 200 125 L 350 200" stroke="#94a3b8" strokeWidth="8" />
                   
                   {/* Junction */}
                   <circle cx="200" cy="125" r="12" fill={isBalanced ? "#10b981" : "#ef4444"} stroke="#fff" strokeWidth="4" className="transition-colors duration-300" />
                   
                   {/* Arrows & Labels IN */}
                   <g transform="translate(110, 80) rotate(26)">
                     <polygon points="0,-10 20,0 0,10" fill="#3b82f6" />
                   </g>
                   <text x="80" y="70" fill="#60a5fa" fontSize="16" fontWeight="bold">I₁ = {i1}A</text>
                   
                   <g transform="translate(110, 170) rotate(-26)">
                     <polygon points="0,-10 20,0 0,10" fill="#3b82f6" />
                   </g>
                   <text x="80" y="195" fill="#60a5fa" fontSize="16" fontWeight="bold">I₂ = {i2}A</text>

                   {/* Arrows & Labels OUT */}
                   <g transform="translate(290, 80) rotate(-26)">
                     <polygon points="0,-10 20,0 0,10" fill="#f59e0b" />
                   </g>
                   <text x="310" y="70" fill="#fbbf24" fontSize="16" fontWeight="bold">I₃ = {i3}A</text>
                   
                   <g transform="translate(290, 170) rotate(26)">
                     <polygon points="0,-10 20,0 0,10" fill="#f59e0b" />
                   </g>
                   <text x="310" y="195" fill="#fbbf24" fontSize="16" fontWeight="bold">I₄ = {i4}A</text>

                   {/* Equation Display in center */}
                   <rect x="130" y="10" width="140" height="30" rx="8" fill="#1e293b" stroke="#334155" />
                   <text x="200" y="30" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
                     Σ Masuk = Σ Keluar
                   </text>
                 </svg>
               ) : (
                 // --- COMPLEX LOOP VISUALIZATION ---
                 <svg width="400" height="200" className="overflow-visible">
                   
                   {/* Loop path */}
                   <rect x="50" y="50" width="300" height="100" fill="none" stroke="#94a3b8" strokeWidth="6" rx="8" />
                   
                   {/* Top Resistor (R) */}
                   <rect x="175" y="40" width="50" height="20" fill="#1e293b" />
                   <path d="M 160 50 L 170 50 L 175 40 L 185 60 L 195 40 L 205 60 L 215 40 L 225 60 L 230 50 L 240 50" stroke="#fbbf24" strokeWidth="4" fill="none" />
                   <text x="200" y="30" fill="#fbbf24" fontSize="16" fontWeight="bold" textAnchor="middle">R = {r}Ω</text>

                   {/* Left Battery (V1) */}
                   <rect x="40" y="85" width="20" height="30" fill="#1e293b" />
                   <line x1="30" y1="95" x2="70" y2="95" stroke="#ef4444" strokeWidth="4" />
                   <line x1="40" y1="105" x2="60" y2="105" stroke="#94a3b8" strokeWidth="4" />
                   <text x="15" y="105" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="end">V₁ = {v1}V</text>
                   
                   {/* Right Battery (V2) - Opposing */}
                   <rect x="340" y="85" width="20" height="30" fill="#1e293b" />
                   <line x1="330" y1="95" x2="370" y2="95" stroke="#ef4444" strokeWidth="4" />
                   <line x1="340" y1="105" x2="360" y2="105" stroke="#94a3b8" strokeWidth="4" />
                   <text x="385" y="105" fill="#ef4444" fontSize="16" fontWeight="bold" textAnchor="start">V₂ = {v2}V</text>

                   {/* Current Flow Indicators */}
                   {loopCurrent !== 0 && (
                     <g>
                       {/* Arrow pointing clockwise if loopCurrent > 0, counter if < 0 */}
                       <path d={loopCurrent > 0 ? "M 130 50 L 150 40 L 150 60 Z" : "M 270 50 L 250 40 L 250 60 Z"} fill="#3b82f6" />
                       <path d={loopCurrent > 0 ? "M 270 150 L 250 140 L 250 160 Z" : "M 130 150 L 150 140 L 150 160 Z"} fill="#3b82f6" />
                       <text x="200" y="180" fill="#60a5fa" fontSize="16" fontWeight="bold" textAnchor="middle">
                         Arus Loop (I) = {Math.abs(loopCurrent).toFixed(2)}A
                       </text>
                     </g>
                   )}
                 </svg>
               )}
            </div>
            
            {isBasic && (
              <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
                 <span className="text-xs text-slate-400 font-bold uppercase">Status Titik Cabang</span>
                 <div className={`font-black ${isBalanced ? 'text-emerald-400' : 'text-rose-400'}`}>
                   {isBalanced ? 'Seimbang (ΣI = 0)' : 'TIDAK Seimbang!'}
                 </div>
              </div>
            )}
            {!isBasic && (
              <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
                 <span className="text-xs text-slate-400 font-bold uppercase">Arah Arus Dominan</span>
                 <div className={`font-black ${loopCurrent > 0 ? 'text-sky-400' : loopCurrent < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                   {loopCurrent > 0 ? 'Searah Jarum Jam' : loopCurrent < 0 ? 'Berlawanan Jarum Jam' : 'Berhenti'}
                 </div>
              </div>
            )}
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              {isBasic ? (
                <span> Total arus masuk adalah <strong>{inTotal}A</strong>, sementara total arus keluar adalah <strong>{outTotal}A</strong>. {isBalanced ? 'Cabang ini mematuhi Kirchhoff I dengan sempurna!' : 'Ketidakseimbangan ini mustahil di dunia nyata, elektron akan menumpuk di titik cabang! Sesuaikan!'}</span>
              ) : (
                <span> V₁ mendorong {v1}V searah jarum jam, dan V₂ melawan sebesar {v2}V. Tegangan netto ({v1 - v2}V) inilah yang dibagi oleh hambatan R={r}Ω untuk menghasilkan arus {loopCurrent}A.</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <MoveHorizontal className={`h-4 w-4 ${isBasic ? 'text-indigo-500' : 'text-purple-500'}`} />
             <h3 className="font-bold text-slate-900 dark:text-white">Panel Kendali</h3>
          </div>
          
          <div className="space-y-5 flex-1">
            {isBasic ? (
              <>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Arus Masuk (I₁)</label>
                    <span className="text-xs font-mono font-bold text-blue-600">{i1} A</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={i1} onChange={e => setI1(parseInt(e.target.value))} className="w-full accent-blue-500 h-1.5" />
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Arus Masuk (I₂)</label>
                    <span className="text-xs font-mono font-bold text-blue-600">{i2} A</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={i2} onChange={e => setI2(parseInt(e.target.value))} className="w-full accent-blue-500 h-1.5" />
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-100 dark:border-amber-900/30 mt-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Arus Keluar (I₃)</label>
                    <span className="text-xs font-mono font-bold text-amber-600">{i3} A</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={i3} onChange={e => setI3(parseInt(e.target.value))} className="w-full accent-amber-500 h-1.5" />
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Arus Keluar (I₄)</label>
                    <span className="text-xs font-mono font-bold text-amber-600">{i4} A</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={i4} onChange={e => setI4(parseInt(e.target.value))} className="w-full accent-amber-500 h-1.5" />
                </div>
              </>
            ) : (
              <>
                <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-red-800 dark:text-red-300">Baterai Kiri (V₁)</label>
                    <span className="text-sm font-mono font-bold text-red-600">{v1} V</span>
                  </div>
                  <input type="range" min="1" max="24" step="1" value={v1} onChange={e => setV1(parseInt(e.target.value))} className="w-full accent-red-500" />
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-orange-800 dark:text-orange-300">Baterai Kanan (V₂)</label>
                    <span className="text-sm font-mono font-bold text-orange-600">{v2} V</span>
                  </div>
                  <input type="range" min="1" max="24" step="1" value={v2} onChange={e => setV2(parseInt(e.target.value))} className="w-full accent-orange-500" />
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-2xl border border-yellow-100 dark:border-yellow-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-bold text-yellow-800 dark:text-yellow-300">Hambatan (R)</label>
                    <span className="text-sm font-mono font-bold text-yellow-600">{r} Ω</span>
                  </div>
                  <input type="range" min="1" max="10" step="1" value={r} onChange={e => setR(parseInt(e.target.value))} className="w-full accent-yellow-500" />
                </div>
              </>
            )}
          </div>
          
          <div className={`p-4 rounded-2xl border text-center ${isBasic ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800/30' : 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30'}`}>
             <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isBasic ? 'text-indigo-600 dark:text-indigo-400' : 'text-purple-600 dark:text-purple-400'}`}>
               {isBasic ? 'Kalkulasi Arus' : 'Arus Loop Netto'}
             </p>
             <div className={`font-mono text-3xl font-black ${isBasic ? 'text-indigo-700 dark:text-indigo-300' : 'text-purple-700 dark:text-purple-300'}`}>
                {isBasic ? (
                  <span>
                    <span className="text-blue-500">{inTotal}</span> = <span className="text-amber-500">{outTotal}</span>
                  </span>
                ) : (
                  <span>{loopCurrent % 1 === 0 ? loopCurrent : loopCurrent.toFixed(2)} A</span>
                )}
             </div>
             <p className={`text-[10px] mt-2 font-mono ${isBasic ? 'text-indigo-500/70' : 'text-purple-500/70'}`}>
               {isBasic ? 'I₁ + I₂ = I₃ + I₄' : 'I = (V₁ - V₂) / R'}
             </p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" /> Hukum Kirchhoff
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <h4 className="font-bold text-indigo-800 dark:text-indigo-400 mb-1">Kirchhoff I (Arus)</h4>
                <p className="mb-2">Total arus yang masuk pada suatu titik percabangan sama dengan total arus yang keluar. Mengikuti prinsip kekekalan muatan.</p>
                <p className="font-mono bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg inline-block border border-indigo-200 dark:border-indigo-700 text-indigo-600 font-bold">
                  Σ I_masuk = Σ I_keluar
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-1">Kirchhoff II (Tegangan)</h4>
                <p className="mb-2">Dalam suatu rangkaian tertutup (loop), jumlah aljabar gaya gerak listrik (E) dan penurunan tegangan (IR) sama dengan nol. Mengikuti prinsip kekekalan energi.</p>
                <p className="font-mono bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg inline-block border border-purple-200 dark:border-purple-700 text-purple-600 font-bold">
                  Σ V + Σ (I × R) = 0
                </p>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
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
