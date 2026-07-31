'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, Layers, Circle, AlignLeft } from 'lucide-react';

export default function MagneticInductionModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [geoMode, setGeoMode] = useState<'straight' | 'circular' | 'solenoid'>('straight');

  // Shared / Specific States
  const [current, setCurrent] = useState(5); // Amperes (1 to 10)
  const [distance, setDistance] = useState(0.04); // Meters (0.01 to 0.10) for straight wire
  const [radius, setRadius] = useState(0.05); // Meters (0.01 to 0.10) for loop
  const [turns, setTurns] = useState(100); // N (10 to 500)
  const [length, setLength] = useState(0.4); // Solenoid length L (0.1 to 1.0 m)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetB, setTargetB] = useState(5.0); // Target B in x10^-5 Tesla (different from default 2.5)

  // Physical Constants: mu_0 = 4*pi*10^-7
  const mu0 = 4 * Math.PI * 1e-7;

  // Calculations B in Tesla
  let bVal = 0;
  if (geoMode === 'straight') {
    bVal = (mu0 * current) / (2 * Math.PI * distance);
  } else if (geoMode === 'circular') {
    bVal = (mu0 * current * turns) / (2 * radius);
  } else {
    // Solenoid
    bVal = (mu0 * turns * current) / length;
  }

  // B scaled to x10^-5 Tesla for user friendly reading
  const bDisplay = bVal * 1e5;

  const generateNewTarget = () => {
    const targets = [1.5, 2.5, 4.0, 6.2, 8.0, 10.0, 15.0];
    const filtered = targets.filter(t => Math.abs(t - targetB) > 0.5);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetB(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (Math.abs(bDisplay - targetB) < 0.25) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [bDisplay, targetB, showSuccess]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Magnet className="h-3.5 w-3.5" /> Bab 3: Kemagnetan (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Medan Magnet Induksi</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Pelajari medan magnet induksi (B) di sekitar kawat lurus berarus, kawat melingkar, dan solenoida berdasarkan Hukum Biot-Savart & Hukum Ampere.
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

          {/* Example Problems */}
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Soal & Pembahasan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Kawat Lurus):</p>
                  <p className="mb-2">Sebuah kawat lurus panjang dialiri arus I = 5 A. Hitung induksi magnet pada titik berjarak a = 4 cm = 0,04 m!</p>
                  <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    B = (μ₀ × I) / (2π × a) = ((4π × 10⁻⁷) × 5) / (2π × 0,04)<br />
                    B = (2 × 10⁻⁶) / 0,08 = 2,5 × 10⁻⁵ Tesla.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 2 (Solenoida):</p>
                  <p className="mb-2">Solenoida panjang 0,4 m memiliki N = 200 lilitan dialiri arus 2 A. Berapa besar medan magnet di pusat solenoida?</p>
                  <p className="font-semibold text-cyan-600 dark:text-cyan-400 mb-1">Penyelesaian:</p>
                  <p className="font-mono text-xs">
                    B = (μ₀ × N × I) / L = ((4π × 10⁻⁷) × 200 × 2) / 0,4<br />
                    B = 4π × 10⁻⁴ ≈ 1,26 × 10⁻³ Tesla.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Target Challenge Card */}
        <div className="flex flex-col items-center justify-center bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50 rounded-2xl p-5 min-w-[200px] shadow-sm shrink-0 relative overflow-hidden">
          <div className="flex items-center gap-1.5 text-xs text-cyan-700 dark:text-cyan-300 font-bold uppercase tracking-wider mb-1">
            <Target className="h-4 w-4" /> Tantangan Target B
          </div>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 my-1">
            {targetB.toFixed(1)} × 10⁻⁵ T
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
            Atur parameter agar B ≈ {targetB.toFixed(1)} × 10⁻⁵ Tesla
          </p>

          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-xl border border-cyan-100 dark:border-cyan-800">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Skor: {score}</span>
          </div>

          {showSuccess && (
            <div className="absolute inset-0 bg-cyan-600 dark:bg-cyan-700 text-white flex flex-col items-center justify-center p-4 text-center animate-in zoom-in-95 z-20">
              <Star className="h-10 w-10 text-amber-300 fill-amber-300 mb-1 animate-bounce" />
              <h4 className="font-black text-lg">Target Medan B Tercapai!</h4>
              <p className="text-xs opacity-90">+100 Poin Tambahan</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[460px] flex flex-col relative">
            {/* Geometri Selector Tabs */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 flex gap-2">
              <button
                onClick={() => setGeoMode('straight')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  geoMode === 'straight'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <AlignLeft className="h-3.5 w-3.5" /> Kawat Lurus
              </button>
              <button
                onClick={() => setGeoMode('circular')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  geoMode === 'circular'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <Circle className="h-3.5 w-3.5" /> Kawat Melingkar
              </button>
              <button
                onClick={() => setGeoMode('solenoid')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  geoMode === 'solenoid'
                    ? 'bg-cyan-600 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                <Layers className="h-3.5 w-3.5" /> Solenoida
              </button>
            </div>

            {/* SVG Visualizer */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
              <svg width="100%" height="340" viewBox="0 0 550 340" className="w-full">
                {geoMode === 'straight' && (
                  <g transform="translate(275, 170)">
                    {/* Wire */}
                    <line x1="0" y1="-140" x2="0" y2="140" stroke="#f59e0b" strokeWidth="8" strokeLinecap="round" />
                    {/* Current Direction Arrow */}
                    <path d="M 0 -80 L 0 -130" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
                    <text x="12" y="-100" fill="#f87171" fontSize="13" fontWeight="bold">
                      I ({current} A)
                    </text>

                    {/* Concentric Magnetic Field Rings */}
                    {[40, 75, 110, 145].map((r, i) => (
                      <circle
                        key={i}
                        cx="0"
                        cy="0"
                        r={r}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth={Math.max(1, 3.5 - i * 0.7)}
                        strokeDasharray="6,4"
                        opacity={0.8 - i * 0.15}
                      />
                    ))}

                    {/* Observation Point */}
                    <circle cx={distance * 1800} cy="0" r="6" fill="#38bdf8" className="animate-ping" />
                    <circle cx={distance * 1800} cy="0" r="5" fill="#0284c7" />
                    <line x1="0" y1="0" x2={distance * 1800} y2="0" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="3,3" />
                    <text x={distance * 900} y="-8" fill="#e0f2fe" fontSize="11" textAnchor="middle">
                      a = {(distance * 100).toFixed(0)} cm
                    </text>
                    <text x={distance * 1800 + 10} y="4" fill="#38bdf8" fontSize="13" fontWeight="bold">
                      B = {bDisplay.toFixed(2)} × 10⁻⁵ T
                    </text>
                  </g>
                )}

                {geoMode === 'circular' && (
                  <g transform="translate(275, 170)">
                    {/* Circular Loop */}
                    <ellipse
                      cx="0"
                      cy="0"
                      rx={radius * 1800}
                      ry={radius * 900}
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="7"
                    />
                    <text x="0" y={-radius * 900 - 10} fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {turns} Lilitan, I = {current} A
                    </text>

                    {/* Center Point & B Vector */}
                    <line x1="0" y1="0" x2="0" y2="-110" stroke="#06b6d4" strokeWidth="4" markerEnd="url(#arrow-cyan)" />
                    <text x="12" y="-90" fill="#38bdf8" fontSize="14" fontWeight="bold">
                      B (Pusat) = {bDisplay.toFixed(2)} × 10⁻⁵ T
                    </text>
                    <circle cx="0" cy="0" r="6" fill="#06b6d4" />
                  </g>
                )}

                {geoMode === 'solenoid' && (
                  <g transform="translate(275, 170)">
                    {/* Solenoid Coils Visual */}
                    <rect
                      x={-length * 200}
                      y="-45"
                      width={length * 400}
                      height="90"
                      rx="10"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                      opacity="0.5"
                    />

                    {/* Coil Turns */}
                    {Array.from({ length: 12 }).map((_, i) => {
                      const step = (length * 360) / 11;
                      const xPos = -length * 180 + i * step;
                      return (
                        <path
                          key={i}
                          d={`M ${xPos} -45 C ${xPos + 15} -55, ${xPos + 15} 55, ${xPos} 45`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="5"
                        />
                      );
                    })}

                    {/* Center Field Vector */}
                    <line x1={-length * 180} y1="0" x2={length * 180} y2="0" stroke="#06b6d4" strokeWidth="4" />
                    <text x="0" y="-55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                      B (Pusat Solenoida) = {bDisplay.toFixed(2)} × 10⁻⁵ T
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Insight Box */}
          <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-cyan-900 dark:text-cyan-200 leading-relaxed">
              <strong>Aturan Tangan Kanan 1:</strong> Genggam kawat dengan tangan kanan Anda. Ibu jari menunjukkan arah arus listrik (I), sedangkan empat jari lainnya melingkar menunjukkan arah garis medan magnet (B).
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Magnet className="h-4 w-4 text-cyan-500" /> Kontrol Parameter
            </h3>
          </div>

          <div className="space-y-5 flex-1">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-amber-800 dark:text-amber-300">Arus Listrik (I)</label>
                <span className="text-xs font-mono font-bold text-amber-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
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
                className="w-full accent-amber-500"
              />
            </div>

            {geoMode === 'straight' && (
              <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-900/30">
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-bold text-cyan-800 dark:text-cyan-300">Jarak Titik (a)</label>
                  <span className="text-xs font-mono font-bold text-cyan-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                    {(distance * 100).toFixed(1)} cm
                  </span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.10"
                  step="0.01"
                  value={distance}
                  onChange={(e) => setDistance(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>
            )}

            {geoMode === 'circular' && (
              <>
                <div className="bg-cyan-50 dark:bg-cyan-950/30 p-4 rounded-2xl border border-cyan-100 dark:border-cyan-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-cyan-800 dark:text-cyan-300">Jari-Jari Lingkaran (r)</label>
                    <span className="text-xs font-mono font-bold text-cyan-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                      {(radius * 100).toFixed(1)} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.10"
                    step="0.01"
                    value={radius}
                    onChange={(e) => setRadius(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-purple-800 dark:text-purple-300">Jumlah Lilitan (N)</label>
                    <span className="text-xs font-mono font-bold text-purple-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                      {turns} Lilitan
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={turns}
                    onChange={(e) => setTurns(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </>
            )}

            {geoMode === 'solenoid' && (
              <>
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

                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-blue-800 dark:text-blue-300">Panjang Solenoida (L)</label>
                    <span className="text-xs font-mono font-bold text-blue-600 bg-white dark:bg-gray-800 px-2 py-0.5 rounded">
                      {length.toFixed(2)} m
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="1.00"
                    step="0.05"
                    value={length}
                    onChange={(e) => setLength(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </>
            )}
          </div>

          {/* Result Output Card */}
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-semibold">Hasil Medan Magnet (B)</div>
            <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">
              {bDisplay.toFixed(3)} × 10⁻⁵ Tesla
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
                <BookOpen className="h-5 w-5 text-cyan-500" /> Ringkasan Medan Magnet Induksi
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
                Medan magnet induksi disekitar kawat penghantar dirumuskan oleh Hans Christian Oersted dan dimodelkan secara matematis oleh Biot-Savart & Ampere:
              </p>
              <div className="bg-cyan-50 dark:bg-cyan-950/50 p-4 rounded-xl space-y-2">
                <p className="font-bold text-cyan-900 dark:text-cyan-200">1. Kawat Lurus Panjang:</p>
                <p className="font-mono text-xs">B = (μ₀ × I) / (2π × a)</p>
                <p className="font-bold text-cyan-900 dark:text-cyan-200">2. Kawat Melingkar (di Pusat):</p>
                <p className="font-mono text-xs">B = (μ₀ × I × N) / (2 × r)</p>
                <p className="font-bold text-cyan-900 dark:text-cyan-200">3. Solenoida (di Pusat):</p>
                <p className="font-mono text-xs">B = (μ₀ × N × I) / L</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
