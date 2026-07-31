'use client';

import React, { useState, useEffect } from 'react';
import { Zap, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal } from 'lucide-react';

export default function CapacitorModule({ mode = 'circuit' }: { mode?: 'circuit' | 'energy' }) {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [isParallel, setIsParallel] = useState(false);
  const [c1, setC1] = useState(2); // 1-10 μF
  const [c2, setC2] = useState(2); // 1-10 μF
  const [v, setV] = useState(5); // 1-12 V
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Target Value (C_eq or Energy)
  const [targetValue, setTargetValue] = useState(mode === 'energy' ? 25 : 4);
  
  // Calculations
  const cEq = isParallel ? (c1 + c2) : (c1 * c2) / (c1 + c2);
  const energy = 0.5 * cEq * (v * v); // μJ
  
  const generateNewTarget = () => {
    // Generate achievable target
    // Random mode, c1, c2, v
    const tParallel = Math.random() > 0.5;
    const tC1 = Math.floor(Math.random() * 9) + 1; // 1-10
    const tC2 = Math.floor(Math.random() * 9) + 1;
    const tV = Math.floor(Math.random() * 11) + 1; // 1-12
    const tCeq = tParallel ? (tC1 + tC2) : (tC1 * tC2) / (tC1 + tC2);
    const tEnergy = 0.5 * tCeq * (tV * tV);
    
    // Check if it's too complex decimal, try again if not integer or simple decimal
    if (mode === 'circuit') {
      if (tCeq % 0.5 !== 0) return generateNewTarget();
      setTargetValue(tCeq);
    } else {
      if (tEnergy % 0.5 !== 0) return generateNewTarget();
      setTargetValue(tEnergy);
    }
  };
  
  useEffect(() => {
    if (showSuccess) return;
    
    const currentVal = mode === 'energy' ? energy : cEq;
    if (Math.abs(currentVal - targetValue) < 0.01) {
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
        setC1(1);
        setC2(1);
        setV(1);
      }, 4000);
    }
  }, [energy, cEq, targetValue, showSuccess, mode]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 1: Listrik Statis
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'circuit' ? 'Rangkaian Kapasitor' : 'Energi Kapasitor'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            {mode === 'circuit' 
              ? 'Rangkai kapasitor secara seri atau paralel. Perhatikan bagaimana Kapasitas Total (C) berubah secara unik ketika digabungkan!' 
              : 'Perhatikan bagaimana susunan kapasitor Seri/Paralel dan besarnya Tegangan (V) memengaruhi Energi (W) yang tersimpan di dalamnya!'}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
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
                {mode === 'energy' ? (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Flash Kamera</p>
                    <p className="mb-2">Sebuah flash kamera butuh energi yang tersimpan dengan cepat. Jika kita memasang kapasitor secara paralel, apa yang terjadi?</p>
                    <p className="font-semibold text-cyan-700 dark:text-cyan-400 mb-1">Penyelesaian:</p>
                    <p>Secara paralel, kapasitas total akan dijumlah (C1 + C2). Makin besar kapasitas total, energi (W) yang tersimpan (½ C V²) akan semakin besar, membuat kilat cahaya flash semakin terang.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Menurunkan Kapasitas</p>
                    <p className="mb-2">Anda hanya punya kapasitor 4 μF dan 4 μF. Tapi Anda butuh kapasitor 2 μF. Apa yang harus dilakukan?</p>
                    <p className="font-semibold text-cyan-700 dark:text-cyan-400 mb-1">Penyelesaian:</p>
                    <p>Rangkai secara SERI! Rumusnya 1/C = 1/4 + 1/4 = 2/4. Maka C = 4/2 = 2 μF.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-cyan-500 mb-2" />
          <span className="text-xs text-cyan-700 dark:text-cyan-400 font-bold uppercase text-center mb-1">
            {mode === 'circuit' ? 'Target Kapasitas' : 'Target Energi'}
          </span>
          <span className="text-xl font-black text-cyan-600 dark:text-cyan-500 text-center leading-tight">
            {targetValue} {mode === 'circuit' ? 'μF' : 'μJ'}
          </span>
          <span className="text-xs text-cyan-500/70 mt-2 font-mono">Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* PCB Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Kapasitas Tepat!</h3>
                <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">
                    {mode === 'circuit' ? `Kapasitas Total: ${cEq} μF` : `Energi: ${energy} μJ`}
                  </p>
                  <p className="text-sm leading-relaxed">
                    Tepat! Anda menyusun kapasitor secara <strong>{isParallel ? 'Paralel' : 'Seri'}</strong> menghasilkan C = {cEq.toFixed(2)} μF. 
                    {mode === 'energy' && ` Pada tegangan ${v} Volt, energi yang tersimpan pas untuk memicu lampu!`}
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            <div className="z-10 w-full relative h-48 flex items-center justify-center">
               <svg width="400" height="200" className="overflow-visible">
                 <defs>
                   <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                     <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
                   </marker>
                 </defs>
                 
                 {/* Battery / Source */}
                 <g transform="translate(40, 100)">
                    <circle cx="0" cy="0" r="25" fill="#1f2937" stroke="#fbbf24" strokeWidth="4" />
                    <text x="0" y="5" fill="#fbbf24" fontSize="16" textAnchor="middle" fontWeight="bold">{v}V</text>
                 </g>

                 {/* Wires & Capacitors */}
                 {isParallel ? (
                   // Parallel Circuit
                   <g stroke="#10b981" strokeWidth="4" fill="none">
                     <path d="M 65 100 L 150 100 L 150 50 L 220 50" />
                     <path d="M 150 100 L 150 150 L 220 150" />
                     <path d="M 240 50 L 310 50 L 310 100 L 330 100" />
                     <path d="M 240 150 L 310 150 L 310 100" />
                     {/* C1 Top */}
                     <line x1="220" y1="35" x2="220" y2="65" stroke="#fff" strokeWidth="6" />
                     <line x1="240" y1="35" x2="240" y2="65" stroke="#fff" strokeWidth="6" />
                     <text x="230" y="20" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold" stroke="none">{c1}μF</text>
                     {/* C2 Bottom */}
                     <line x1="220" y1="135" x2="220" y2="165" stroke="#fff" strokeWidth="6" />
                     <line x1="240" y1="135" x2="240" y2="165" stroke="#fff" strokeWidth="6" />
                     <text x="230" y="190" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold" stroke="none">{c2}μF</text>
                     
                     <path d="M 330 100 L 330 20 L 40 20 L 40 75" markerEnd="url(#arrow)" />
                   </g>
                 ) : (
                   // Series Circuit
                   <g stroke="#10b981" strokeWidth="4" fill="none">
                     <path d="M 65 100 L 160 100" />
                     {/* C1 */}
                     <line x1="160" y1="85" x2="160" y2="115" stroke="#fff" strokeWidth="6" />
                     <line x1="180" y1="85" x2="180" y2="115" stroke="#fff" strokeWidth="6" />
                     <text x="170" y="70" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold" stroke="none">{c1}μF</text>
                     
                     <path d="M 180 100 L 260 100" />
                     
                     {/* C2 */}
                     <line x1="260" y1="85" x2="260" y2="115" stroke="#fff" strokeWidth="6" />
                     <line x1="280" y1="85" x2="280" y2="115" stroke="#fff" strokeWidth="6" />
                     <text x="270" y="70" fill="#fff" fontSize="14" textAnchor="middle" fontWeight="bold" stroke="none">{c2}μF</text>
                     
                     <path d="M 280 100 L 330 100 L 330 20 L 40 20 L 40 75" markerEnd="url(#arrow)" />
                   </g>
                 )}
               </svg>
            </div>
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              {isParallel ? (
                <span> Di rangkaian <strong>Paralel</strong>, rumus gabungannya dijumlah biasa (C₁ + C₂). Itulah mengapa kapasitas total saat ini sangat besar (C = {cEq.toFixed(2)} μF) dan menyimpan lebih banyak energi! (Ini kebalikan dari sifat Resistor).</span>
              ) : (
                <span> Di rangkaian <strong>Seri</strong>, rumus gabungannya adalah pecahan (1/C = 1/C₁ + 1/C₂). Kapasitas total akan selalu <strong>lebih kecil</strong> dari nilai komponen terkecilnya (C = {cEq.toFixed(2)} μF).</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/50 flex justify-between items-center">
            <span className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Rangkaian (Seri / Paralel)</span>
            <button 
              onClick={() => setIsParallel(!isParallel)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isParallel ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isParallel ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          
          <div className="space-y-6 flex-1">
            {mode === 'energy' && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tegangan (V)</label>
                  <span className="text-sm font-mono font-bold text-gray-600 dark:text-gray-400">{v} V</span>
                </div>
                <input type="range" min="1" max="12" step="1" value={v} onChange={e => setV(parseInt(e.target.value))} className="w-full accent-gray-500" />
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Kapasitor 1 (C₁)</label>
                <span className="text-sm font-mono font-bold text-blue-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{c1} μF</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={c1} onChange={e => setC1(parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
            
            <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-teal-800 dark:text-teal-300">Kapasitor 2 (C₂)</label>
                <span className="text-sm font-mono font-bold text-teal-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{c2} μF</span>
              </div>
              <input type="range" min="1" max="10" step="1" value={c2} onChange={e => setC2(parseInt(e.target.value))} className="w-full accent-teal-500" />
            </div>
          </div>
          
          {mode === 'energy' ? (
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800/30 text-center">
               <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Energi (W)</p>
               <div className="font-mono text-3xl font-black text-cyan-700 dark:text-cyan-300">
                  {energy % 1 === 0 ? energy : energy.toFixed(2)} μJ
               </div>
               <p className="text-[10px] text-cyan-500/70 mt-2 font-mono">W = 1/2 × C × V²</p>
            </div>
          ) : (
            <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800/30 text-center">
               <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">Kapasitas Total (C)</p>
               <div className="font-mono text-3xl font-black text-cyan-700 dark:text-cyan-300">
                  {cEq % 1 === 0 ? cEq : cEq.toFixed(2)} μF
               </div>
               <p className="text-[10px] text-cyan-500/70 mt-2 font-mono">
                 {isParallel ? 'C = C₁ + C₂' : '1/C = 1/C₁ + 1/C₂'}
               </p>
            </div>
          )}
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-500" /> Rangkaian Kapasitor
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Energi dalam Kapasitor (W)</h4>
                <p className="mb-2">Energi yang tersimpan di dalam medan listrik di antara keping kapasitor berbanding lurus dengan kapasitas (C) dan kuadrat tegangan (V).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-3 py-2 rounded-lg inline-block border border-gray-200 dark:border-gray-700 text-cyan-600 font-bold text-lg">
                  W = ½ C V²
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Rangkaian Seri</h4>
                  <p className="font-mono text-xs mb-1">1/C = 1/C₁ + 1/C₂</p>
                  <p className="text-xs">Kapasitas total akan selalu <strong>lebih kecil</strong> dari kapasitor yang paling kecil.</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                  <h4 className="font-bold text-indigo-800 dark:text-indigo-400 mb-1">Rangkaian Paralel</h4>
                  <p className="font-mono text-xs mb-1">C = C₁ + C₂</p>
                  <p className="text-xs">Kapasitas total akan <strong>bertambah besar</strong> (jumlah totalnya).</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-cyan-200 dark:shadow-none"
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
