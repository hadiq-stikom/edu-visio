'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, Gauge, Activity, RefreshCw } from 'lucide-react';

export default function GGLInductionModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [mode, setMode] = useState<'sliding' | 'magnet'>('sliding');

  // Sliding Wire Mode States
  const [bField, setBField] = useState(1.2); // Tesla (0.1 to 2.0)
  const [length, setLength] = useState(0.5); // Meters (0.1 to 1.0)
  const [velocity, setVelocity] = useState(4); // m/s (1 to 10)

  // Moving Magnet Mode States
  const [turns, setTurns] = useState(200); // N (50 to 500)
  const [magnetSpeed, setMagnetSpeed] = useState(5); // v (1 to 10 m/s)
  const [dFlux, setDFlux] = useState(0.02); // Wb/s (0.005 to 0.05)

  // Target challenge
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetGGL, setTargetGGL] = useState(5.0); // Volts (different from default 2.4)

  // Calculations
  // Sliding wire: E = B * l * v
  const gglSliding = bField * length * velocity;

  // Moving magnet: E = N * (dPhi/dt) where dPhi/dt = dFlux * magnetSpeed
  const gglMagnet = turns * dFlux * magnetSpeed;

  const currentGGL = mode === 'sliding' ? gglSliding : gglMagnet;

  const generateNewTarget = () => {
    const targets = [1.2, 2.4, 3.6, 5.0, 8.0, 10.0, 15.0];
    const filtered = targets.filter(t => Math.abs(t - targetGGL) > 0.5);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetGGL(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(currentGGL - targetGGL) < 0.15) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentGGL, targetGGL, showSuccess]);

  // Galvanometer Needle Angle (-60 to +60 degrees)
  const needleAngle = Math.min(Math.max((currentGGL / 20) * 60, -60), 60);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Magnet className="h-3.5 w-3.5" /> Bab 3: Kemagnetan (Sub 3)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Gaya Gerak Listrik (GGL) Induksi</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Simulasikan Hukum Faraday dan Hukum Lenz. Perubahan fluks magnet menimbulkan tegangan GGL Induksi (ε) yang menghasilkan arus listrik pada kumparan atau kawat meluncur.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-sm font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Kawat Meluncur):</p>
                  <p className="mb-2">Kawat l = 50 cm = 0,5 m meluncur dengan kecepatan v = 4 m/s dalam medan magnet tegak lurus B = 1,2 T. Hitung GGL Induksi!</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    ε = B × l × v = 1,2 × 0,5 × 4 = 2,4 Volt.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 2 (Hukum Faraday Kumparan):</p>
                  <p className="mb-2">Kumparan dengan N = 200 lilitan mengalami perubahan fluks sebesar ΔΦ/Δt = 0,02 Wb/s. Hitung besar GGL Induksi!</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    |ε| = N × (ΔΦ/Δt) = 200 × 0,02 = 4,0 Volt.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Challenge Card */}
        <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-5 min-w-[200px] shadow-sm shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider mb-1">
            <Target className="h-4 w-4" /> Tantangan Target GGL
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 my-1">
            ε = {targetGGL.toFixed(1)} V
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
            Atur parameter agar ε ≈ {targetGGL.toFixed(1)} Volt
          </p>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-emerald-100 dark:border-emerald-800">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Skor: {score}</span>
          </div>

          {showSuccess && (
            <div className="absolute inset-0 bg-emerald-600 dark:bg-emerald-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
              <Star className="h-10 w-10 text-amber-300 fill-amber-300 mb-1 animate-bounce" />
              <h4 className="font-black text-lg">Target GGL Tercapai!</h4>
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
            {/* Mode Switch Tabs */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 flex gap-2">
              <button
                onClick={() => setMode('sliding')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  mode === 'sliding'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                Kawat Meluncur (B · l · v)
              </button>
              <button
                onClick={() => setMode('magnet')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  mode === 'magnet'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                Magnet & Kumparan (-N dΦ/dt)
              </button>
            </div>

            {/* SVG Visualizer */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
              <svg width="100%" height="340" viewBox="0 0 550 340" className="w-full">
                {/* Galvanometer Gauge (Top Center) */}
                <g transform="translate(430, 80)">
                  <rect x="-60" y="-45" width="120" height="75" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  {/* Gauge Arc */}
                  <path d="M -40 10 A 45 45 0 0 1 40 10" fill="none" stroke="#64748b" strokeWidth="3" />
                  {/* Needle */}
                  <line
                    x1="0"
                    y1="15"
                    x2={40 * Math.sin((needleAngle * Math.PI) / 180)}
                    y2={-40 * Math.cos((needleAngle * Math.PI) / 180)}
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="0" cy="15" r="4" fill="#f87171" />
                  <text x="0" y="24" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">
                    GALVANOMETER
                  </text>
                  <text x="0" y="-28" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">
                    {currentGGL.toFixed(2)} V
                  </text>
                </g>

                {mode === 'sliding' ? (
                  <g transform="translate(160, 190)">
                    {/* Rails */}
                    <line x1="-100" y1="-60" x2="180" y2="-60" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                    <line x1="-100" y1="60" x2="180" y2="60" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                    <line x1="-100" y1="-60" x2="-100" y2="60" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

                    {/* Sliding Wire */}
                    <line x1="40" y1="-70" x2="40" y2="70" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />

                    {/* Velocity Arrow */}
                    <path d="M 40 0 L 110 0" stroke="#10b981" strokeWidth="3.5" markerEnd="url(#arrow-green)" />
                    <text x="75" y="-12" fill="#34d399" fontSize="12" fontWeight="bold">
                      v = {velocity} m/s
                    </text>

                    {/* Magnetic Field Crosses B */}
                    {[-70, -10, 50, 110, 150].map((x) =>
                      [-35, 35].map((y) => (
                        <text key={`${x}-${y}`} x={x} y={y} fill="#3b82f6" fontSize="14" opacity="0.6" textAnchor="middle">
                          ✕
                        </text>
                      ))
                    )}
                    <text x="140" y="-80" fill="#60a5fa" fontSize="11" fontWeight="bold">
                      B = {bField.toFixed(1)} T
                    </text>
                  </g>
                ) : (
                  <g transform="translate(200, 200)">
                    {/* Coil */}
                    <rect x="-30" y="-55" width="60" height="110" rx="8" fill="none" stroke="#f59e0b" strokeWidth="6" />
                    {Array.from({ length: 7 }).map((_, i) => (
                      <line key={i} x1="-30" y1={-45 + i * 15} x2="30" y2={-45 + i * 15} stroke="#fbbf24" strokeWidth="3" />
                    ))}
                    <text x="0" y="75" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {turns} Lilitan
                    </text>

                    {/* Magnet Bar */}
                    <g transform="translate(-160, -25)">
                      <rect x="0" y="0" width="50" height="50" fill="#ef4444" rx="4" />
                      <rect x="50" y="0" width="50" height="50" fill="#3b82f6" rx="4" />
                      <text x="25" y="32" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">
                        U
                      </text>
                      <text x="75" y="32" fill="#ffffff" fontSize="18" fontWeight="black" textAnchor="middle">
                        S
                      </text>
                      {/* Arrow Motion */}
                      <path d="M 110 25 L 140 25" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-green)" />
                    </g>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed">
              <strong>Hukum Lenz:</strong> Arus induksi yang dihasilkan selalu menciptakan medan magnetik baru yang melawan/menentang arah perubahan fluks semula. Semakin cepat gerakan (v) atau semakin banyak lilitan (N), semakin besar GGL yang tercipta!
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Kontrol Parameter
            </h3>
          </div>

          {mode === 'sliding' ? (
            <div className="space-y-5 flex-1">
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Medan Magnet (B)</label>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {bField.toFixed(1)} T
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={bField}
                  onChange={(e) => setBField(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Panjang Kawat (l)</label>
                  <span className="text-xs font-mono font-bold text-amber-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {length.toFixed(1)} m
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Kecepatan Meluncur (v)</label>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {velocity} m/s
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={velocity}
                  onChange={(e) => setVelocity(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5 flex-1">
              <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-purple-800 dark:text-purple-300">Jumlah Lilitan (N)</label>
                  <span className="text-xs font-mono font-bold text-purple-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {turns} Lilitan
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={turns}
                  onChange={(e) => setTurns(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Kecepatan Magnet (v)</label>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {magnetSpeed} m/s
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={magnetSpeed}
                  onChange={(e) => setMagnetSpeed(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Result Output Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Tegangan Induksi (GGL ε)</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ε = {currentGGL.toFixed(3)} Volt
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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Ringkasan GGL Induksi
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
                <strong>Hukum Faraday:</strong> Tegangan GGL induksi sebanding dengan laju perubahan fluks magnet yang melingkupi kumparan.
              </p>
              <div className="bg-emerald-50 dark:bg-emerald-950/50 p-4 rounded-xl space-y-2 font-mono text-xs">
                <p className="font-bold text-emerald-900 dark:text-emerald-200 font-sans text-sm">Hukum Faraday:</p>
                <p>ε = -N × (ΔΦ / Δt)</p>
                <p className="font-bold text-emerald-900 dark:text-emerald-200 font-sans text-sm mt-2">Kawat Meluncur di Atas Rel:</p>
                <p>ε = B × l × v × sin(θ)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
