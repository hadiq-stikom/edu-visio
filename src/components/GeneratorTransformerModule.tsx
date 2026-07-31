'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, Zap, Cpu, RotateCw, Activity } from 'lucide-react';

export default function GeneratorTransformerModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [devMode, setDevMode] = useState<'generator' | 'transformer'>('generator');

  // Generator States
  const [genN, setGenN] = useState(200); // Turns N (50 to 500)
  const [genB, setGenB] = useState(0.8); // Tesla (0.1 to 2.0)
  const [genArea, setGenArea] = useState(0.04); // m^2 (0.01 to 0.10)
  const [genOmega, setGenOmega] = useState(50); // rad/s (10 to 100)

  // Transformer States
  const [vPrimary, setVPrimary] = useState(220); // Volts (12 to 240)
  const [nPrimary, setNPrimary] = useState(500); // Turns (100 to 1000)
  const [nSecondary, setNSecondary] = useState(100); // Turns (20 to 2000)
  const [efficiency, setEfficiency] = useState(90); // % (50 to 100)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetVal, setTargetVal] = useState(120); // Target Gen V_max or Trafo V_sec (different from default 320)

  // Generator Calculations
  // E_max = N * B * A * omega
  const eMaxGenerator = genN * genB * genArea * genOmega;

  // Transformer Calculations
  // V_s = V_p * (N_s / N_p)
  const vSecondary = vPrimary * (nSecondary / nPrimary);
  const isStepUp = nSecondary > nPrimary;

  const currentOutput = devMode === 'generator' ? eMaxGenerator : vSecondary;

  const generateNewTarget = () => {
    if (devMode === 'generator') {
      const targets = [120, 240, 320, 480, 640];
      const filtered = targets.filter(t => Math.abs(t - targetVal) > 20);
      setTargetVal(filtered[Math.floor(Math.random() * filtered.length)]);
    } else {
      const targets = [24, 44, 110, 220, 440];
      const filtered = targets.filter(t => Math.abs(t - targetVal) > 10);
      setTargetVal(filtered[Math.floor(Math.random() * filtered.length)]);
    }
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(currentOutput - targetVal) < (devMode === 'generator' ? 15 : 5)) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentOutput, targetVal, showSuccess, devMode]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Magnet className="h-3.5 w-3.5" /> Bab 3: Kemagnetan (Sub 4)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Generator & Transformator</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Simulasikan pembangkitan listrik AC oleh Generator dan pengubahan tegangan oleh Transformator (Trafo Step-Up / Step-Down) beserta efisiensinya.
          </p>

          <div className="flex flex-wrap gap-3">
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Generator AC):</p>
                  <p className="mb-2">Generator dengan N = 200 lilitan dan luas loop A = 0,04 m² berputar dengan kec. sudut ω = 50 rad/s dalam medan magnet B = 0,8 T. Hitung tegangan puncak ε_max!</p>
                  <p className="font-semibold text-violet-600 dark:text-violet-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    ε_max = N × B × A × ω = 200 × 0,8 × 0,04 × 50 = 320 Volt.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 2 (Transformator):</p>
                  <p className="mb-2">Transformator dihubungkan ke sumber Vp = 220 V dengan lilitan primer Np = 500 dan sekunder Ns = 100. Berapa tegangan keluaran sekunder Vs?</p>
                  <p className="font-semibold text-violet-600 dark:text-violet-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    Vs = Vp × (Ns / Np) = 220 × (100 / 500) = 44 Volt (Step-Down).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Challenge Card */}
        <div className="flex flex-col items-center justify-center bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/50 rounded-2xl p-5 min-w-[200px] shadow-sm shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs text-violet-700 dark:text-violet-300 font-bold uppercase tracking-wider mb-1">
            <Target className="h-4 w-4" /> Tantangan Target Output
          </div>
          <div className="text-3xl font-black text-violet-600 dark:text-violet-400 my-1">
            {targetVal.toFixed(0)} V
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
            Atur parameter agar Tegangan ≈ {targetVal.toFixed(0)} Volt
          </p>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-violet-100 dark:border-violet-800">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Skor: {score}</span>
          </div>

          {showSuccess && (
            <div className="absolute inset-0 bg-violet-600 dark:bg-violet-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
              <Star className="h-10 w-10 text-amber-300 fill-amber-300 mb-1 animate-bounce" />
              <h4 className="font-black text-lg">Target Tercapai!</h4>
              <p className="text-xs opacity-90">+100 Poin Tambahan</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Diagram */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[460px] flex flex-col relative">
            {/* Device Selector Tabs */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 flex gap-2">
              <button
                onClick={() => setDevMode('generator')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  devMode === 'generator'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <RotateCw className="h-3.5 w-3.5" /> Generator AC (Rotasi)
              </button>
              <button
                onClick={() => setDevMode('transformer')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  devMode === 'transformer'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <Cpu className="h-3.5 w-3.5" /> Transformator (Trafo)
              </button>
            </div>

            {/* SVG Visualizer */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
              <svg width="100%" height="340" viewBox="0 0 550 340" className="w-full">
                {devMode === 'generator' ? (
                  <g transform="translate(275, 170)">
                    {/* Magnet Poles */}
                    <rect x="-210" y="-80" width="80" height="160" fill="#ef4444" rx="8" />
                    <text x="-170" y="10" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">
                      U
                    </text>

                    <rect x="130" y="-80" width="80" height="160" fill="#3b82f6" rx="8" />
                    <text x="170" y="10" fill="#ffffff" fontSize="24" fontWeight="black" textAnchor="middle">
                      S
                    </text>

                    {/* Rotating Coil Loop */}
                    <rect
                      x="-70"
                      y="-50"
                      width="140"
                      height="100"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="5"
                      rx="6"
                      transform="rotate(25)"
                      className="animate-spin-slow"
                    />

                    {/* AC Waveform Display (Bottom) */}
                    <path
                      d="M -180 120 Q -135 90 -90 120 T 0 120 T 90 120 T 180 120"
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                    />
                    <text x="0" y="142" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Gelombang AC Sinusoidal (V_max = {eMaxGenerator.toFixed(1)} V)
                    </text>
                  </g>
                ) : (
                  <g transform="translate(275, 170)">
                    {/* Iron Core Ring */}
                    <rect x="-140" y="-90" width="280" height="180" rx="16" fill="none" stroke="#64748b" strokeWidth="24" />
                    <rect x="-90" y="-40" width="180" height="80" rx="8" fill="#090d16" />

                    {/* Primary Winding (Left) */}
                    <rect x="-155" y="-70" width="30" height="140" fill="none" stroke="#ef4444" strokeWidth="4" rx="4" />
                    <text x="-140" y="-105" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Primer: {nPrimary} N ({vPrimary} V)
                    </text>

                    {/* Secondary Winding (Right) */}
                    <rect x="125" y="-70" width="30" height="140" fill="none" stroke="#3b82f6" strokeWidth="4" rx="4" />
                    <text x="140" y="-105" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">
                      Sekunder: {nSecondary} N ({vSecondary.toFixed(1)} V)
                    </text>

                    {/* Trafo Type Badge */}
                    <rect x="-70" y="-20" width="140" height="40" rx="20" fill={isStepUp ? '#15803d' : '#b45309'} />
                    <text x="0" y="5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                      {isStepUp ? 'Trafo Step-Up ↑' : 'Trafo Step-Down ↓'}
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-violet-50 dark:bg-violet-950/30 p-4 rounded-2xl border border-violet-200 dark:border-violet-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-violet-900 dark:text-violet-200 leading-relaxed">
              <strong>Prinsip Transformator:</strong> Trafo mengubah tegangan AC dengan memindahkan daya listrik melalui induksi elektromagnetik antar kumparan. Jika lilitan sekunder (Ns) lebih banyak dari primer (Np), tegangan dinaikkan (Step-Up).
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-500" /> Kontrol Parameter
            </h3>
          </div>

          {devMode === 'generator' ? (
            <div className="space-y-5 flex-1">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-purple-800 dark:text-purple-300">Jumlah Lilitan (N)</label>
                  <span className="text-xs font-mono font-bold text-purple-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {genN} Lilitan
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={genN}
                  onChange={(e) => setGenN(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Medan Magnet (B)</label>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {genB.toFixed(1)} T
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={genB}
                  onChange={(e) => setGenB(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Kec. Sudut Rotasi (ω)</label>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {genOmega} rad/s
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={genOmega}
                  onChange={(e) => setGenOmega(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5 flex-1">
              <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-red-800 dark:text-red-300">Tegangan Primer (Vp)</label>
                  <span className="text-xs font-mono font-bold text-red-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {vPrimary} V
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="240"
                  step="12"
                  value={vPrimary}
                  onChange={(e) => setVPrimary(parseInt(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Lilitan Primer (Np)</label>
                  <span className="text-xs font-mono font-bold text-amber-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {nPrimary} N
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={nPrimary}
                  onChange={(e) => setNPrimary(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Lilitan Sekunder (Ns)</label>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {nSecondary} N
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="20"
                  value={nSecondary}
                  onChange={(e) => setNSecondary(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            </div>
          )}

          {/* Result Output Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">
              {devMode === 'generator' ? 'Tegangan Maksimum (E_max)' : 'Tegangan Sekunder (Vs)'}
            </div>
            <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
              {currentOutput.toFixed(1)} Volt
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-500" /> Ringkasan Generator & Transformator
              </h3>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="py-4 space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed overflow-y-auto max-h-[70vh]">
              <p>
                <strong>Generator:</strong> Mengubah energi mekanik rotasi menjadi energi listrik bergelombang AC sinusoidal.
              </p>
              <div className="bg-violet-50 dark:bg-violet-950/50 p-4 rounded-xl space-y-2 font-mono text-xs">
                <p className="font-bold text-violet-900 dark:text-violet-200 font-sans text-sm">Persamaan GGL Generator:</p>
                <p>ε(t) = N × B × A × ω × sin(ωt)</p>
                <p className="font-bold text-violet-900 dark:text-violet-200 font-sans text-sm mt-2">Persamaan Transformator:</p>
                <p>Vp / Vs = Np / Ns = Is / Ip</p>
                <p>η = (Ps / Pp) × 100%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
