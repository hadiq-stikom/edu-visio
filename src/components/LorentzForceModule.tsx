'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export default function LorentzForceModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [mode, setMode] = useState<'charge' | 'wire'>('charge'); // 'charge' or 'wire'
  
  // Charge mode states
  const [q, setQ] = useState(2); // in uC (-5 to +5)
  const [v, setV] = useState(5); // in 10^5 m/s (1 to 10)
  const [bCharge, setBCharge] = useState(0.8); // Tesla (0.1 to 2.0)
  const [angleCharge, setAngleCharge] = useState(90); // degrees (0 to 90)

  // Wire mode states
  const [current, setCurrent] = useState(4); // Amperes (1 to 10)
  const [length, setLength] = useState(0.5); // Meters (0.1 to 2.0)
  const [bWire, setBWire] = useState(1.0); // Tesla (0.1 to 2.0)
  const [angleWire, setAngleWire] = useState(90); // degrees (0 to 90)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetForce, setTargetForce] = useState(1.5); // Target force in Newton (different from default 0.8)

  // Calculations
  // For Charge: F = |q| * 10^-6 * (v * 10^5) * B * sin(theta) = q * v * B * sin(theta) * 0.1 Newton
  const sinCharge = Math.sin((angleCharge * Math.PI) / 180);
  const forceCharge = Math.abs(q) * v * bCharge * sinCharge * 0.1; // in Newton

  // For Wire: F = I * L * B * sin(theta)
  const sinWire = Math.sin((angleWire * Math.PI) / 180);
  const forceWire = current * length * bWire * sinWire; // in Newton

  const currentForce = mode === 'charge' ? forceCharge : forceWire;

  const generateNewTarget = () => {
    const targets = [0.4, 0.8, 1.2, 1.6, 2.0, 3.0, 4.0];
    const filtered = targets.filter(t => Math.abs(t - targetForce) > 0.1);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetForce(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(currentForce - targetForce) < 0.05) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentForce, targetForce, showSuccess]);

  // Visual calculation
  const forceArrowLength = Math.min(currentForce * 35, 130);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Magnet className="h-3.5 w-3.5" /> Bab 3: Kemagnetan (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Medan Magnet & Gaya Lorentz</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Simulasikan vektor Gaya Lorentz (F) yang timbul akibat muatan bergerak (q) atau kawat berarus (I) yang berada di dalam medan magnet luar (B). Gunakan Aturan Tangan Kanan!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Muatan Bergerak):</p>
                  <p className="mb-2">Sebuah muatan positif q = +2 μC bergerak dengan kecepatan v = 5 × 10⁵ m/s tegak lurus terhadap medan magnet homogen B = 0,8 Tesla. Berapa besar Gaya Lorentz yang dialami muatan?</p>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    F = q × v × B × sin(90°)<br />
                    F = (2 × 10⁻⁶) × (5 × 10⁵) × 0,8 × 1<br />
                    F = 1 × 0,8 = 0,8 Newton.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 2 (Kawat Berarus):</p>
                  <p className="mb-2">Kawat lurus sepanjang 0,5 m dialiri arus listrik 4 A berada dalam medan magnet 1,0 T membentuk sudut 30°. Hitung gaya magnet pada kawat!</p>
                  <p className="font-semibold text-indigo-600 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    F = I × L × B × sin(30°)<br />
                    F = 4 × 0,5 × 1,0 × 0,5 = 1,0 Newton.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Challenge Card */}
        <div className="flex flex-col items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/50 rounded-2xl p-5 min-w-[200px] shadow-sm shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider mb-1">
            <Target className="h-4 w-4" /> Tantangan Target
          </div>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 my-1">
            F = {targetForce.toFixed(2)} N
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
            Atur parameter agar F ≈ {targetForce.toFixed(2)} N
          </p>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-800">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Skor: {score}</span>
          </div>

          {showSuccess && (
            <div className="absolute inset-0 bg-indigo-600 dark:bg-indigo-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
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
            {/* Mode Switch Tabs */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 flex gap-2">
              <button
                onClick={() => setMode('charge')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  mode === 'charge'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                Muatan Bergerak (q · v · B)
              </button>
              <button
                onClick={() => setMode('wire')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all ${
                  mode === 'wire'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                Kawat Berarus (I · L · B)
              </button>
            </div>

            {/* SVG Visualizer */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
              <svg width="100%" height="340" viewBox="0 0 550 340" className="w-full">
                <defs>
                  <marker id="arrow-v" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ec4899" />
                  </marker>
                  <marker id="arrow-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
                  </marker>
                  <marker id="arrow-f" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" />
                  </marker>
                </defs>

                {/* Grid Field B (Background Crosses / Dots) */}
                <g opacity="0.3">
                  {[80, 180, 280, 380, 480].map((x) =>
                    [60, 130, 200, 270].map((y) => (
                      <g key={`${x}-${y}`}>
                        <circle cx={x} cy={y} r="10" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2,2" />
                        <text x={x} y={y + 3} fontSize="10" fill="#3b82f6" textAnchor="middle" className="font-bold">
                          ✕
                        </text>
                      </g>
                    ))
                  )}
                  <text x="490" y="30" fontSize="11" fill="#60a5fa" className="font-bold">
                    Medan B (Masuk Bidang ✕)
                  </text>
                </g>

                {/* Center origin */}
                <g transform="translate(250, 170)">
                  {mode === 'charge' ? (
                    <>
                      {/* Velocity Vector */}
                      <line
                        x1="0"
                        y1="0"
                        x2={130 * Math.cos(((180 - angleCharge) * Math.PI) / 180)}
                        y2={-130 * Math.sin(((180 - angleCharge) * Math.PI) / 180)}
                        stroke="#ec4899"
                        strokeWidth="3.5"
                        markerEnd="url(#arrow-v)"
                      />
                      <text
                        x={145 * Math.cos(((180 - angleCharge) * Math.PI) / 180)}
                        y={-145 * Math.sin(((180 - angleCharge) * Math.PI) / 180)}
                        fill="#f472b6"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        v ({v} × 10⁵ m/s)
                      </text>

                      {/* Lorentz Force Vector */}
                      {forceArrowLength > 5 && (
                        <>
                          <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={q >= 0 ? -forceArrowLength : forceArrowLength}
                            stroke="#22c55e"
                            strokeWidth="4"
                            markerEnd="url(#arrow-f)"
                          />
                          <text
                            x="12"
                            y={q >= 0 ? -forceArrowLength - 5 : forceArrowLength + 15}
                            fill="#4ade80"
                            fontSize="13"
                            fontWeight="bold"
                          >
                            F ({forceCharge.toFixed(2)} N)
                          </text>
                        </>
                      )}

                      {/* Particle Blob */}
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill={q > 0 ? '#ef4444' : q < 0 ? '#3b82f6' : '#9ca3af'}
                        className="shadow-lg animate-pulse"
                      />
                      <text x="0" y="5" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
                        {q > 0 ? `+${q}μC` : q < 0 ? `${q}μC` : '0'}
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Wire representation */}
                      <line
                        x1={-120 * Math.cos(((180 - angleWire) * Math.PI) / 180)}
                        y1={120 * Math.sin(((180 - angleWire) * Math.PI) / 180)}
                        x2={120 * Math.cos(((180 - angleWire) * Math.PI) / 180)}
                        y2={-120 * Math.sin(((180 - angleWire) * Math.PI) / 180)}
                        stroke="#f59e0b"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />

                      {/* Current Arrow */}
                      <line
                        x1="0"
                        y1="0"
                        x2={100 * Math.cos(((180 - angleWire) * Math.PI) / 180)}
                        y2={-100 * Math.sin(((180 - angleWire) * Math.PI) / 180)}
                        stroke="#ec4899"
                        strokeWidth="3.5"
                        markerEnd="url(#arrow-v)"
                      />
                      <text
                        x={115 * Math.cos(((180 - angleWire) * Math.PI) / 180)}
                        y={-115 * Math.sin(((180 - angleWire) * Math.PI) / 180)}
                        fill="#f472b6"
                        fontSize="12"
                        fontWeight="bold"
                      >
                        I ({current} A)
                      </text>

                      {/* Lorentz Force Vector */}
                      {forceArrowLength > 5 && (
                        <>
                          <line
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={-forceArrowLength}
                            stroke="#22c55e"
                            strokeWidth="4"
                            markerEnd="url(#arrow-f)"
                          />
                          <text x="12" y={-forceArrowLength - 5} fill="#4ade80" fontSize="13" fontWeight="bold">
                            F ({forceWire.toFixed(2)} N)
                          </text>
                        </>
                      )}
                    </>
                  )}
                </g>
              </svg>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
              <p className="text-sm">
                <strong>Aturan Tangan Kanan:</strong> Rentangkan tangan kanan Anda. Ibu jari menunjuk arah Kecepatan (v) / Arus (I), Jari Telunjuk menunjuk arah Medan Magnet (B), dan Telapak Tangan mendorong ke arah Gaya Lorentz (F). Jika muatan bernilai negatif (-q), arah gaya menjadi berlawanan arah!
              </p>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Zap className="h-4 w-4 text-indigo-500" /> Kontrol Parameter
            </h3>
            <span className="text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold px-2.5 py-1 rounded-full">
              {mode === 'charge' ? 'Muatan' : 'Kawat'}
            </span>
          </div>

          {mode === 'charge' ? (
            <div className="space-y-5 flex-1">
              <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-pink-800 dark:text-pink-300">Muatan Partikel (q)</label>
                  <span className="text-xs font-mono font-bold text-pink-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {q > 0 ? `+${q}` : q} μC
                  </span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={q}
                  onChange={(e) => setQ(parseInt(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Kecepatan Partikel (v)</label>
                  <span className="text-xs font-mono font-bold text-amber-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {v} × 10⁵ m/s
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={v}
                  onChange={(e) => setV(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Medan Magnet (B)</label>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {bCharge.toFixed(1)} T
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={bCharge}
                  onChange={(e) => setBCharge(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Sudut Vektor (θ)</label>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {angleCharge}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="15"
                  value={angleCharge}
                  onChange={(e) => setAngleCharge(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5 flex-1">
              <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-2xl border border-pink-100 dark:border-pink-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-pink-800 dark:text-pink-300">Arus Listrik (I)</label>
                  <span className="text-xs font-mono font-bold text-pink-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {current} A
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={current}
                  onChange={(e) => setCurrent(parseInt(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Panjang Kawat (L)</label>
                  <span className="text-xs font-mono font-bold text-amber-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {length.toFixed(1)} m
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Medan Magnet (B)</label>
                  <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {bWire.toFixed(1)} T
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.1"
                  value={bWire}
                  onChange={(e) => setBWire(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Sudut Vektor (θ)</label>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {angleWire}°
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  step="15"
                  value={angleWire}
                  onChange={(e) => setAngleWire(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          )}

          {/* Result Output Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Hasil Perhitungan Gaya</div>
            <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              F = {currentForce.toFixed(3)} N
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
                <BookOpen className="h-5 w-5 text-indigo-500" /> Ringkasan Teori Gaya Lorentz
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
                <strong>Gaya Lorentz</strong> adalah gaya yang dialami oleh muatan listrik bergerak atau kawat berarus listrik yang ditempatkan di dalam medan magnet luar.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-950/50 p-4 rounded-xl space-y-2">
                <p className="font-bold text-indigo-900 dark:text-indigo-200">1. Muatan Bergerak dalam Medan Magnet:</p>
                <p className="font-mono text-xs">F = q × v × B × sin(θ)</p>
                <p className="font-bold text-indigo-900 dark:text-indigo-200">2. Kawat Berarus dalam Medan Magnet:</p>
                <p className="font-mono text-xs">F = I × L × B × sin(θ)</p>
              </div>
              <p>
                <strong>Keterangan:</strong><br />
                • F = Gaya Lorentz (N)<br />
                • q = Besar muatan (C)<br />
                • v = Kecepatan gerak muatan (m/s)<br />
                • I = Kuat arus listrik (A)<br />
                • L = Panjang kawat (m)<br />
                • B = Kuat medan magnet (Tesla)<br />
                • θ = Sudut antara vektor kecepatan/arus dengan medan magnet.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
