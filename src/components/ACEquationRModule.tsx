'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, RefreshCw } from 'lucide-react';

export default function ACEquationRModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [vm, setVm] = useState(100); // V_max in Volts
  const [omega, setOmega] = useState(100); // rad/s
  const [r, setR] = useState(50); // Ohm
  const [showRms, setShowRms] = useState(false);

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetIrms, setTargetIrms] = useState(2.82); // Initialized differently from default 1.41 to avoid instant win

  // Calculations
  const im = vm / r;
  const vrms = vm / Math.sqrt(2);
  const irms = im / Math.sqrt(2);

  // Animation ref for moving current
  const wireRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      if (wireRef.current) {
        const time = (Date.now() - startTime) / 1000;
        // Make it visible, scale time down slightly for smoothness
        const scaledOmega = omega * 0.02;
        
        // I = Im * sin(omega * t)
        // Displacement (position of charges) is the integral of velocity (current)
        // pos = - (Im / scaledOmega) * cos(scaledOmega * t)
        // We multiply by a factor (e.g. 15) to make the movement distance visually clear
        const moveScale = 15;
        const offset = -(im / scaledOmega) * Math.cos(scaledOmega * time) * moveScale;
        
        wireRef.current.style.strokeDashoffset = offset.toString();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [omega, im]);

  const generateNewTarget = () => {
    const targets = [0.71, 1.41, 2.12, 2.82, 3.53, 4.24, 5.65];
    const filtered = targets.filter(t => Math.abs(t - targetIrms) > 0.1);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetIrms(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    // Don't trigger if vm or r is 0 to avoid unintended behavior
    if (Math.abs(irms - targetIrms) < 0.05 && vm > 0) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [irms, targetIrms, showSuccess]);

  // SVG Chart generation
  const width = 500;
  const height = 240;
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;
  
  // Time scale for 2 full cycles of max omega (let's say we plot t from 0 to 0.125s)
  const tMax = 0.125; 
  const points = 100;
  
  // Generate paths
  let vPath = '';
  let iPath = '';
  
  for (let i = 0; i <= points; i++) {
    const t = (i / points) * tMax;
    const x = margin.left + (i / points) * graphW;
    
    // V = Vm * sin(omega * t)
    const vValue = vm * Math.sin(omega * t);
    // I = Im * sin(omega * t)
    const iValue = im * Math.sin(omega * t);
    
    // Scale for Y: max Vm is 250, let's scale to fit graphH
    const yV = margin.top + graphH/2 - (vValue / 250) * (graphH/2);
    // Scale for I: max Im is 25 (250/10), scale I differently to be visible
    // Let's multiply I by 10 for visualization scale
    const yI = margin.top + graphH/2 - (iValue * 10 / 250) * (graphH/2);
    
    if (i === 0) {
      vPath += `M ${x} ${yV} `;
      iPath += `M ${x} ${yI} `;
    } else {
      vPath += `L ${x} ${yV} `;
      iPath += `L ${x} ${yI} `;
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="h-3.5 w-3.5" /> Bab 4: Arus Bolak-Balik (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Persamaan AC & Rangkaian R</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Simulasikan tegangan dan arus bolak-balik (AC) pada resistor murni. Perhatikan hubungan antara nilai maksimum (V_max, I_max) dengan nilai efektif (RMS).
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

          {/* Example Problems */}
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Soal & Pembahasan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Nilai Efektif):</p>
                  <p className="mb-2">Tegangan bolak-balik memiliki persamaan V = 200 sin(100t). Hitung tegangan efektif (V_rms) pada rangkaian!</p>
                  <p className="font-semibold text-orange-600 dark:text-orange-400 mb-1">Penyelesaian:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>V_max = 200 Volt</li>
                    <li>V_rms = V_max / √2</li>
                    <li>V_rms = 200 / 1.414 = 141.4 Volt</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-1 shadow-lg shadow-orange-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-orange-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-orange-100 text-sm mb-4 leading-relaxed">
                Atur slider sehingga Arus Efektif (I_rms) bernilai tepat <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{targetIrms.toFixed(2)} A</strong>!
              </p>
              
              <div className="mt-4 p-3 bg-black/20 rounded-xl">
                <div className="text-xs text-orange-200 mb-1">Status Arus (I_rms) Saat Ini:</div>
                <div className={`font-mono text-xl font-bold flex items-center gap-2 ${Math.abs(irms - targetIrms) < 0.05 ? 'text-green-300' : 'text-white'}`}>
                  {irms.toFixed(2)} A
                  {Math.abs(irms - targetIrms) < 0.05 && (
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full animate-pulse">
                      Tepat!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="h-5 w-5 text-orange-500" />
                Simulasi Sirkuit & Gelombang AC
              </h3>
              
              <button 
                onClick={() => setShowRms(!showRms)}
                className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Tampilkan {showRms ? 'Max' : 'RMS'}
              </button>
            </div>

            {/* Circuit Animation */}
            <div className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-6 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Visualisasi Aliran Arus (Elektron)</div>
              <svg viewBox="0 0 400 180" className="w-full max-w-sm h-auto drop-shadow-sm">
                {/* Base circuit wire (gray) */}
                <path 
                  d="M 180 140 
                     L 50 140 L 50 40 L 160 40 
                     L 165 30 L 175 50 L 185 30 L 195 50 L 205 30 L 215 50 L 225 30 L 235 50 L 240 40 
                     L 350 40 L 350 140 L 220 140" 
                  fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-700" 
                />
                
                {/* AC Source Circle */}
                <circle cx="200" cy="140" r="22" fill="white" className="dark:fill-gray-800" stroke="currentColor" strokeWidth="4" />
                <path d="M 186 140 Q 193 125, 200 140 T 214 140" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-800 dark:text-gray-200" />

                {/* Animated Current (blue dashes) */}
                <path 
                  ref={wireRef}
                  d="M 180 140 
                     L 50 140 L 50 40 L 160 40 
                     L 165 30 L 175 50 L 185 30 L 195 50 L 205 30 L 215 50 L 225 30 L 235 50 L 240 40 
                     L 350 40 L 350 140 L 220 140" 
                  fill="none" stroke="#3b82f6" strokeWidth="6" 
                  strokeDasharray="12 28" 
                  strokeLinecap="round"
                />
                
                {/* Labels */}
                <text x="200" y="20" textAnchor="middle" className="text-xs font-bold fill-gray-500 dark:fill-gray-400">Resistor (R)</text>
                <text x="200" y="178" textAnchor="middle" className="text-xs font-bold fill-gray-500 dark:fill-gray-400">Sumber Tegangan AC</text>
              </svg>
            </div>
            
            <div className="relative w-full aspect-video md:aspect-[2/1] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Chart SVG */}
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1={margin.left} y1={margin.top + graphH/2} x2={width - margin.right} y2={margin.top + graphH/2} stroke="#94a3b8" strokeDasharray="4 4" strokeWidth="1" />
                <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#94a3b8" strokeWidth="1" />
                
                {/* V_rms / V_max lines */}
                {showRms && (
                  <>
                    <line x1={margin.left} y1={margin.top + graphH/2 - (vrms / 250) * (graphH/2)} x2={width - margin.right} y2={margin.top + graphH/2 - (vrms / 250) * (graphH/2)} stroke="#f97316" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.5" />
                    <line x1={margin.left} y1={margin.top + graphH/2 + (vrms / 250) * (graphH/2)} x2={width - margin.right} y2={margin.top + graphH/2 + (vrms / 250) * (graphH/2)} stroke="#f97316" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.5" />
                    <text x={margin.left + 5} y={margin.top + graphH/2 - (vrms / 250) * (graphH/2) - 5} fill="#f97316" fontSize="12" fontWeight="bold">V_rms</text>
                  </>
                )}

                {/* Voltage Path */}
                <path d={vPath} fill="none" stroke="#f97316" strokeWidth="2.5" />
                
                {/* Current Path */}
                <path d={iPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.8" />
              </svg>
              
              {/* Legend */}
              <div className="absolute top-2 right-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-xs shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-0.5 bg-orange-500"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">Tegangan (V)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span className="text-gray-700 dark:text-gray-300 font-semibold">Arus (I x10)</span>
                </div>
              </div>

              {/* Success Overlay directly in the chart container */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-orange-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Target Tercapai!</h4>
                    <p className="text-orange-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900/50">
                <div className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mb-1">Tegangan (V)</div>
                <div className="font-mono text-gray-900 dark:text-white">
                  <div>V_max = <span className="font-bold">{vm.toFixed(1)} V</span></div>
                  <div>V_rms = <span className="font-bold text-orange-600 dark:text-orange-400">{vrms.toFixed(1)} V</span></div>
                  <div className="text-xs text-gray-500 mt-1">V(t) = {vm.toFixed(0)} sin({omega}t)</div>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">Arus (I)</div>
                <div className="font-mono text-gray-900 dark:text-white">
                  <div>I_max = <span className="font-bold">{im.toFixed(2)} A</span></div>
                  <div>I_rms = <span className="font-bold text-blue-600 dark:text-blue-400">{irms.toFixed(2)} A</span></div>
                  <div className="text-xs text-gray-500 mt-1">I(t) = {im.toFixed(2)} sin({omega}t)</div>
                </div>
            </div>
          </div>
        </div>
      </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-orange-500" />
              Kontrol Variabel
            </h3>
            
            <div className="space-y-6">
              {/* Vm Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Teg. Maks (V_max)
                  </label>
                  <span className="bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-mono px-2 py-0.5 rounded">
                    {vm} V
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="10"
                  value={vm}
                  onChange={(e) => setVm(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>

              {/* R Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Hambatan (R)
                  </label>
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs font-mono px-2 py-0.5 rounded">
                    {r} Ω
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={r}
                  onChange={(e) => setR(Number(e.target.value))}
                  className="w-full accent-gray-500"
                />
              </div>

              {/* Omega Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Frek. Sudut (ω)
                  </label>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-mono px-2 py-0.5 rounded">
                    {omega} rad/s
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="10"
                  value={omega}
                  onChange={(e) => setOmega(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-200 dark:border-orange-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-900 dark:text-orange-200 leading-relaxed">
              <p className="text-sm">
                <strong>Catatan:</strong> Pada resistor murni (R), tegangan dan arus bolak-balik memiliki <strong>fase yang sama</strong> (sefase). Artinya, tegangan dan arus mencapai titik maksimum secara bersamaan!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-orange-50 dark:bg-orange-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Persamaan Arus Bolak-Balik (AC)
              </h3>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Tegangan dan Arus Maksimum vs Efektif</h4>
                <p className="mb-3">
                  Alat ukur listrik bolak-balik (AC) seperti voltmeter dan amperemeter mengukur nilai efektif (RMS - Root Mean Square), bukan nilai maksimum. Hubungannya adalah:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>V_rms = V_max / √2 = 0.707 × V_max</p>
                  <p>I_rms = I_max / √2 = 0.707 × I_max</p>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Resistor pada Rangkaian AC</h4>
                <p className="mb-3">
                  Jika sebuah resistor (R) dialiri arus bolak-balik, tegangan dan arusnya berada dalam fase yang sama (sefase). Persamaan matematisnya adalah:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>V = V_max × sin(ωt)</p>
                  <p>I = I_max × sin(ωt)</p>
                </div>
                <p>
                  Frekuensi sudut (ω) menentukan seberapa cepat gelombang berosilasi, dengan ω = 2πf, di mana f adalah frekuensi dalam Hertz.
                </p>
              </section>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
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
