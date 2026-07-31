'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Compass } from 'lucide-react';

export default function RLCSeriesModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [r, setR] = useState(40); // Ohm (10 to 100)
  const [l, setL] = useState(50); // mH (10 to 100)
  const [c, setC] = useState(250); // uF (10 to 500)
  const [omega, setOmega] = useState(1000); // rad/s (100 to 2000)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetPhi, setTargetPhi] = useState(45); // Target angle in degrees
  
  useEffect(() => {
    // Initial target different from default state
    // Default state: X_L = 1000 * 50e-3 = 50 Ohm
    // X_C = 1 / (1000 * 250e-6) = 1 / 0.25 = 4 Ohm
    // tan(phi) = (50 - 4)/40 = 46/40 = 1.15 => phi = ~49 deg.
    setTargetPhi(-45); // -45 deg -> Capacitive
  }, []);

  // Calculations
  const xl = omega * l * 1e-3; // Ohm
  const xc = 1 / (omega * c * 1e-6); // Ohm
  const z = Math.sqrt(r * r + Math.pow(xl - xc, 2)); // Ohm
  const phiRad = Math.atan2(xl - xc, r);
  const phiDeg = (phiRad * 180) / Math.PI;

  const generateNewTarget = () => {
    const targets = [-60, -45, -30, 0, 30, 45, 60];
    const filtered = targets.filter(t => Math.abs(t - targetPhi) > 5);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetPhi(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(phiDeg - targetPhi) < 2.0) { // Tolerance 2 degrees
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [phiDeg, targetPhi, showSuccess]);

  // Phasor Diagram SVG
  const width = 400;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  
  // Scale for vectors (max R is 100, max XL/XC could be ~200)
  // Let's use scale = 1.2 pixels per Ohm
  const scale = 1.2;
  
  const vx = cx + r * scale;
  const vy = cy - (xl - xc) * scale; // In SVG, y is down, so we subtract to go up
  const vxl = cy - xl * scale;
  const vxc = cy + xc * scale;

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="h-3.5 w-3.5" /> Bab 4: Arus Bolak-Balik (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Rangkaian RLC Seri</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Visualisasikan diagram fasor dari Impedansi (Z) dan Beda Fase (φ) pada rangkaian RLC Seri. 
            Cari tahu kapan rangkaian bersifat induktif, kapasitif, atau resonansi!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Impedansi):</p>
                  <p className="mb-2">Rangkaian RLC seri dengan R = 30 Ω, L = 0.6 H, dan C = 500 μF dipasang pada tegangan AC dengan frekuensi sudut ω = 100 rad/s. Tentukan Impedansi (Z) rangkaian!</p>
                  <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Penyelesaian:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                    <li>X_L = ω × L = 100 × 0.6 = 60 Ω</li>
                    <li>X_C = 1 / (ω × C) = 1 / (100 × 500 × 10⁻⁶) = 20 Ω</li>
                    <li>Z = √(R² + (X_L - X_C)²)</li>
                    <li>Z = √(30² + (60 - 20)²) = √(900 + 1600) = √2500 = 50 Ω</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-1 shadow-lg shadow-blue-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Atur slider sehingga Beda Fase (φ) mendekati <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{targetPhi.toFixed(0)}°</strong>!
              </p>
              
              <div className="mt-4 p-3 bg-black/20 rounded-xl">
                <div className="text-xs text-blue-200 mb-1">Status Fase (φ) Saat Ini:</div>
                <div className={`font-mono text-xl font-bold flex items-center gap-2 ${Math.abs(phiDeg - targetPhi) < 2.0 ? 'text-green-300' : 'text-white'}`}>
                  {phiDeg.toFixed(1)}°
                  {Math.abs(phiDeg - targetPhi) < 2.0 && (
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
              <Compass className="h-5 w-5 text-blue-500" />
              Diagram Fasor Impedansi
            </h3>
            
            <div className="relative w-full aspect-square md:aspect-video bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 flex justify-center items-center">
              {/* SVG Phasor */}
              <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-[400px]">
                {/* Axes */}
                <line x1={0} y1={cy} x2={width} y2={cy} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1={cx} y1={0} x2={cx} y2={height} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                
                <text x={width - 20} y={cy + 15} fill="#64748b" fontSize="12">Sumbu R</text>
                <text x={cx + 10} y={20} fill="#64748b" fontSize="12">Sumbu X_L (+)</text>
                <text x={cx + 10} y={height - 10} fill="#64748b" fontSize="12">Sumbu X_C (-)</text>

                {/* Vector R */}
                <line x1={cx} y1={cy} x2={vx} y2={cy} stroke="#f59e0b" strokeWidth="3" />
                <polygon points={`${vx},${cy - 4} ${vx + 8},${cy} ${vx},${cy + 4}`} fill="#f59e0b" />
                <text x={vx / 2 + cx / 2} y={cy + 20} fill="#f59e0b" fontSize="14" fontWeight="bold">R</text>

                {/* Vector X_L */}
                <line x1={cx} y1={cy} x2={cx} y2={vxl} stroke="#ef4444" strokeWidth="3" />
                <polygon points={`${cx - 4},${vxl} ${cx},${vxl - 8} ${cx + 4},${vxl}`} fill="#ef4444" />
                <text x={cx - 30} y={vxl / 2 + cy / 2} fill="#ef4444" fontSize="14" fontWeight="bold">X_L</text>

                {/* Vector X_C */}
                <line x1={cx} y1={cy} x2={cx} y2={vxc} stroke="#3b82f6" strokeWidth="3" />
                <polygon points={`${cx - 4},${vxc} ${cx},${vxc + 8} ${cx + 4},${vxc}`} fill="#3b82f6" />
                <text x={cx + 10} y={vxc / 2 + cy / 2} fill="#3b82f6" fontSize="14" fontWeight="bold">X_C</text>

                {/* Vector X_L - X_C */}
                <line x1={vx} y1={cy} x2={vx} y2={vy} stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
                <text x={vx + 10} y={vy / 2 + cy / 2} fill="#8b5cf6" fontSize="12" fontWeight="bold">X_L - X_C</text>

                {/* Vector Z */}
                <line x1={cx} y1={cy} x2={vx} y2={vy} stroke="#10b981" strokeWidth="4" />
                {/* Arrowhead Z */}
                <g transform={`translate(${vx}, ${vy}) rotate(${-phiDeg})`}>
                  <polygon points={`0,-5 10,0 0,5`} fill="#10b981" />
                </g>
                <text x={cx + (vx - cx) / 2 - 10} y={cy + (vy - cy) / 2 - 15} fill="#10b981" fontSize="16" fontWeight="bold">Z</text>

                {/* Angle Arc */}
                <path d={`M ${cx + 30} ${cy} A 30 30 0 0 ${phiDeg > 0 ? 0 : 1} ${cx + 30 * Math.cos(phiRad)} ${cy - 30 * Math.sin(phiRad)}`} fill="none" stroke="#6366f1" strokeWidth="2" />
                <text x={cx + 40} y={cy - 10 * Math.sign(phiRad)} fill="#6366f1" fontSize="14" fontWeight="bold">φ</text>
              </svg>
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/50">
                <div className="text-xs text-amber-600 dark:text-amber-400 font-bold mb-1">R (Resistansi)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{r.toFixed(1)} Ω</div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/50">
                <div className="text-xs text-red-600 dark:text-red-400 font-bold mb-1">X_L (Induktif)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{xl.toFixed(1)} Ω</div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1">X_C (Kapasitif)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{xc.toFixed(1)} Ω</div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">Z (Impedansi)</div>
                <div className="font-mono text-gray-900 dark:text-white font-bold">{z.toFixed(1)} Ω</div>
              </div>
            </div>

            {showSuccess && (
              <div className="absolute inset-0 bg-blue-600 dark:bg-blue-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
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
              <MoveHorizontal className="h-5 w-5 text-blue-500" />
              Komponen
            </h3>
            
            <div className="space-y-6">
              {/* R Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Resistor (R)
                  </label>
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 text-xs font-mono px-2 py-0.5 rounded">
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
                  className="w-full accent-amber-500"
                />
              </div>

              {/* L Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Induktor (L)
                  </label>
                  <span className="bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 text-xs font-mono px-2 py-0.5 rounded">
                    {l} mH
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={l}
                  onChange={(e) => setL(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              {/* C Slider */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Kapasitor (C)
                  </label>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-mono px-2 py-0.5 rounded">
                    {c} μF
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full accent-blue-500"
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
                  min="100"
                  max="2000"
                  step="50"
                  value={omega}
                  onChange={(e) => setOmega(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-200 dark:border-blue-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
              <p className="text-sm">
                <strong>Sifat Rangkaian:</strong><br />
                - Jika X_L &gt; X_C, arus tertinggal tegangan (Induktif, φ positif)<br />
                - Jika X_C &gt; X_L, arus mendahului tegangan (Kapasitif, φ negatif)<br />
                - Jika X_L = X_C, sefase (Resonansi, φ = 0)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Rangkaian RLC Seri
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Reaktansi & Impedansi</h4>
                <p className="mb-3">
                  Setiap komponen pada AC memiliki hambatan semua (reaktansi):
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>X_L = ωL (Reaktansi Induktif)</p>
                  <p>X_C = 1 / (ωC) (Reaktansi Kapasitif)</p>
                  <p>Z = √(R² + (X_L - X_C)²) (Impedansi)</p>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Beda Fase</h4>
                <p className="mb-3">
                  Tegangan induktor mendahului arus 90°, sedangkan tegangan kapasitor tertinggal 90°. Sudut fase (φ) rangkaian adalah:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-sm">
                  <p>tan(φ) = (X_L - X_C) / R</p>
                </div>
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
