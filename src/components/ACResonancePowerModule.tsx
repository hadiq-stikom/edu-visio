'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

export default function ACResonancePowerModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [r, setR] = useState(20); // Ohm
  const [l, setL] = useState(50); // mH
  const [c, setC] = useState(50); // uF
  const [v, setV] = useState(100); // Volts (V_rms)
  const [omegaSource, setOmegaSource] = useState(1000); // rad/s (Source frequency)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetOmega, setTargetOmega] = useState(500); // Target resonance frequency
  
  useEffect(() => {
    // initial target different from default omega_0 (which is 1/sqrt(50e-3 * 50e-6) = 1/sqrt(2500e-9) = 1/50e-4.5 = 632 rad/s)
    setTargetOmega(1000); 
  }, []);

  // Calculations
  const omega0 = 1 / Math.sqrt((l * 1e-3) * (c * 1e-6));
  
  const xl = omegaSource * l * 1e-3;
  const xc = 1 / (omegaSource * c * 1e-6);
  const z = Math.sqrt(r * r + Math.pow(xl - xc, 2));
  
  const irms = v / z;
  const power = irms * irms * r; // Watts
  
  // Max possible power (at resonance, Z = R, so Irms = V/R)
  const maxPower = (v / r) * (v / r) * r;

  const generateNewTarget = () => {
    const targets = [400, 500, 800, 1000, 1250, 1500, 2000];
    const filtered = targets.filter(t => Math.abs(t - targetOmega) > 100);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetOmega(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(omega0 - targetOmega) < 20.0) { // Tolerance 20 rad/s
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [omega0, targetOmega, showSuccess]);

  // Resonance Curve SVG
  const width = 500;
  const height = 240;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;
  
  const minW = 100;
  const maxW = 3000;
  const points = 100;
  
  let path = '';
  
  for (let i = 0; i <= points; i++) {
    const w = minW + (i / points) * (maxW - minW);
    const wXl = w * l * 1e-3;
    const wXc = 1 / (w * c * 1e-6);
    const wZ = Math.sqrt(r * r + Math.pow(wXl - wXc, 2));
    const wI = v / wZ; // Current at this frequency
    
    // Scale X
    const x = margin.left + (i / points) * graphW;
    
    // Scale Y (Max possible current is V/R. Vmax=250, Rmin=10 -> max I = 25A)
    // Let's dynamically scale based on current max possible V/R for the graph to not bounce too much
    // Or just fix max I = 25A
    const yMax = 25;
    const y = margin.top + graphH - (wI / yMax) * graphH;
    
    if (i === 0) path += `M ${x} ${y} `;
    else path += `L ${x} ${y} `;
  }
  
  // Calculate X position of resonance and source frequency
  const getX = (val: number) => {
    if (val < minW) return margin.left;
    if (val > maxW) return margin.left + graphW;
    return margin.left + ((val - minW) / (maxW - minW)) * graphW;
  };
  
  const xRes = getX(omega0);
  const xSource = getX(omegaSource);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 4: Arus Bolak-Balik (Sub 3)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Resonansi & Daya AC</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Simulasikan peristiwa resonansi pada rangkaian RLC seri di mana frekuensi sumber (ω) sama dengan frekuensi resonansi (ω_0). Pada kondisi ini, arus dan daya mencapai nilai maksimum!
          </p>

          <div className="flex flex-wrap gap-3">
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Frekuensi Resonansi):</p>
                  <p className="mb-2">Sebuah rangkaian RLC seri memiliki induktor L = 40 mH dan kapasitor C = 10 μF. Berapakah frekuensi sudut resonansinya (ω_0)?</p>
                  <p className="font-semibold text-rose-600 dark:text-rose-400 mb-1">Penyelesaian:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>L = 40 × 10⁻³ H</li>
                    <li>C = 10 × 10⁻⁶ F</li>
                    <li>ω_0 = 1 / √(L × C) = 1 / √(400 × 10⁻⁹) = 1 / √(4 × 10⁻⁷)</li>
                    <li>ω_0 = 1 / (2 × 10⁻³.⁵) ≈ 1581 rad/s</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-1 shadow-lg shadow-rose-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-rose-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-rose-100 text-sm mb-4 leading-relaxed">
                Atur L dan C sehingga frekuensi resonansi (ω_0) berada di angka <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{targetOmega} rad/s</strong>!
              </p>
              
              <div className="mt-4 p-3 bg-black/20 rounded-xl">
                <div className="text-xs text-rose-200 mb-1">Status (ω_0) Saat Ini:</div>
                <div className={`font-mono text-xl font-bold flex items-center gap-2 ${Math.abs(omega0 - targetOmega) < 20.0 ? 'text-green-300' : 'text-white'}`}>
                  {omega0.toFixed(0)} rad/s
                  {Math.abs(omega0 - targetOmega) < 20.0 && (
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
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5 text-rose-500" />
              Kurva Resonansi Arus
            </h3>
            
            <div className="relative w-full aspect-video md:aspect-[2/1] bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              {/* Chart SVG */}
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1={margin.left} y1={margin.top} x2={margin.left} y2={height - margin.bottom} stroke="#94a3b8" strokeWidth="1" />
                <line x1={margin.left} y1={height - margin.bottom} x2={width - margin.right} y2={height - margin.bottom} stroke="#94a3b8" strokeWidth="1" />
                
                {/* Resonance Frequency Line */}
                <line x1={xRes} y1={margin.top} x2={xRes} y2={height - margin.bottom} stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="2" opacity="0.6" />
                <text x={xRes + 5} y={margin.top + 10} fill="#f43f5e" fontSize="10" fontWeight="bold">ω_0</text>
                
                {/* Source Frequency Line */}
                <line x1={xSource} y1={margin.top} x2={xSource} y2={height - margin.bottom} stroke="#3b82f6" strokeWidth="2" opacity="0.8" />
                <text x={xSource - 25} y={margin.top + 25} fill="#3b82f6" fontSize="10" fontWeight="bold">ω src</text>

                {/* Y Axis Labels */}
                <text x={10} y={margin.top + 10} fill="#64748b" fontSize="10">25 A</text>
                <text x={10} y={height - margin.bottom} fill="#64748b" fontSize="10">0 A</text>
                
                {/* X Axis Labels */}
                <text x={margin.left} y={height - margin.bottom + 15} fill="#64748b" fontSize="10">100</text>
                <text x={width - margin.right - 20} y={height - margin.bottom + 15} fill="#64748b" fontSize="10">3000 rad/s</text>

                {/* Current Path */}
                <path d={path} fill="none" stroke="#f43f5e" strokeWidth="3" />
                
                {/* Current Point */}
                <circle cx={xSource} cy={margin.top + graphH - (irms / 25) * graphH} r="6" fill="#3b82f6" />
              </svg>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-rose-50 dark:bg-rose-900/20 p-3 rounded-xl border border-rose-100 dark:border-rose-900/50">
                <div className="text-xs text-rose-600 dark:text-rose-400 font-bold mb-1">Frek Resonansi (ω_0)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{omega0.toFixed(0)} rad/s</div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">Arus Saat Ini (I)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{irms.toFixed(2)} A</div>
              </div>

              <div className="col-span-2 bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1 flex justify-between">
                    <span>Daya Disipasi (P)</span>
                    <span>Max: {maxPower.toFixed(0)} W</span>
                  </div>
                  <div className="font-mono text-gray-900 dark:text-white font-bold">{power.toFixed(1)} W</div>
                </div>
                {/* Power Bar */}
                <div className="absolute bottom-0 left-0 h-1.5 bg-emerald-500 opacity-80" style={{ width: `${(power / maxPower) * 100}%` }}></div>
              </div>
            </div>

            {showSuccess && (
              <div className="absolute inset-0 bg-rose-600 dark:bg-rose-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
                <Star className="h-10 w-10 text-amber-300 fill-amber-300 mb-1 animate-bounce" />
                <h4 className="font-black text-lg">Target Tercapai!</h4>
                <p className="text-xs opacity-90">+100 Poin Tambahan</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-rose-500" />
              Kontrol Variabel
            </h3>
            
            <div className="space-y-6">
              {/* L Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Induktansi (L)
                  </label>
                  <span className="bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 text-xs font-mono px-2 py-0.5 rounded">
                    {l} mH
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={l}
                  onChange={(e) => setL(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              {/* C Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Kapasitansi (C)
                  </label>
                  <span className="bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300 text-xs font-mono px-2 py-0.5 rounded">
                    {c} μF
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              {/* Omega Source Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Frekuensi Sumber (ω)
                  </label>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-mono px-2 py-0.5 rounded">
                    {omegaSource} rad/s
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={omegaSource}
                  onChange={(e) => setOmegaSource(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              
              {/* V Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Tegangan Sumber (V_rms)
                  </label>
                  <span className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 text-xs font-mono px-2 py-0.5 rounded">
                    {v} V
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="10"
                  value={v}
                  onChange={(e) => setV(Number(e.target.value))}
                  className="w-full accent-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-950/30 p-4 rounded-2xl border border-rose-200 dark:border-rose-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-rose-900 dark:text-rose-200 leading-relaxed">
              <p className="text-sm">
                <strong>Resonansi:</strong> Terjadi jika frekuensi sumber (ω) = frekuensi resonansi (ω_0). Pada saat ini, X_L saling meniadakan dengan X_C, sehingga Impedansi minimal (Z = R) dan arus memuncak ke nilai tertingginya!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-rose-50 dark:bg-rose-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" />
                Resonansi & Daya AC
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Frekuensi Resonansi</h4>
                <p className="mb-3">
                  Resonansi terjadi saat Reaktansi Induktif sama dengan Reaktansi Kapasitif (X_L = X_C). Ini membuat Impedansi menjadi paling kecil (Z = R), dan Arus listrik menjadi maksimum. Frekuensinya disebut frekuensi resonansi (ω_0):
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>ω_0 = 1 / √(L × C)</p>
                  <p>f_0 = 1 / (2π√(L × C))</p>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Daya Disipasi</h4>
                <p className="mb-3">
                  Pada rangkaian AC, daya listrik hanya diserap oleh hambatan murni (Resistor). Daya disipasi dirumuskan dengan:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>P = I_rms² × R</p>
                  <p>P = V_rms × I_rms × cos(φ)</p>
                </div>
                <p>Besaran cos(φ) disebut juga <strong>Faktor Daya</strong>. Saat resonansi, faktor daya bernilai 1 karena φ = 0°.</p>
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
