'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Radiation } from 'lucide-react';

export default function RadioactivityModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for time in half-lives (t/T_1/2)
  const [timeCycles, setTimeCycles] = useState(0); // 0 to 5 half-lives
  
  // Calculations
  // N = N0 * (1/2)^(t/T)
  const remainingPercentage = 100 * Math.pow(0.5, timeCycles);

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [guessPercentage, setGuessPercentage] = useState(100);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: timeCycles is 3 (3 half-lives), and guess is exactly 12.5
    if (timeCycles === 3 && Math.abs(guessPercentage - 12.5) < 0.1) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [timeCycles, guessPercentage, showSuccess, hasWon]);

  // Generate SVG path for the exponential decay curve
  const generateCurvePath = () => {
    const width = 400;
    const height = 150;
    let path = `M 0 ${0}`;
    
    // 0 to 5 cycles maps to 0 to width
    for (let x = 0; x <= width; x += 10) {
      const t = (x / width) * 5;
      const n = Math.pow(0.5, t); // 1.0 to 0.03125
      const y = height * (1 - n); // SVG y is inverted (0 is top, height is bottom)
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Radiation className="h-3.5 w-3.5" /> Bab 9: Fisika Inti (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Radioaktivitas & Waktu Paruh</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Inti atom yang tidak stabil secara spontan akan memancarkan radiasi (Alfa, Beta, atau Gamma) untuk menjadi stabil. Proses ini disebut peluruhan radioaktif. Waktu paruh adalah waktu yang dibutuhkan agar separuh dari inti atom tersebut meluruh.
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
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Penanggalan Karbon (Carbon Dating)</p>
                  <p className="mb-2">Karbon-14 memiliki waktu paruh sekitar 5.730 tahun. Sebuah fosil tulang ditemukan mengandung hanya 25% Karbon-14 dibandingkan tulang makhluk hidup modern. Berapa perkiraan umur fosil tersebut?</p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p>Persentase sisa = 25% = 1/4 = (1/2)&sup2;.<br/>
                  Artinya fosil telah melewati 2 siklus waktu paruh (t = 2T).<br/>
                  Umur fosil = 2 &times; 5.730 tahun = <strong>11.460 tahun</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-1 shadow-lg shadow-emerald-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-emerald-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
                Ayo coba atur waktu berjalan hingga <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">3 Waktu Paruh</strong>, lalu tebak dengan tepat berapa persen sisa zat radioaktif yang belum meluruh!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              Kurva Peluruhan Eksponensial (N vs t)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-end p-4 pt-10">
              
              <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1="0" y1="150" x2="400" y2="150" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1="150" x2="0" y2="0" stroke="#475569" strokeWidth="2" />
                
                {/* Half-life grid lines */}
                {[1, 2, 3, 4, 5].map(t => (
                  <g key={t}>
                    <line x1={(t / 5) * 400} y1="0" x2={(t / 5) * 400} y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                    <text x={(t / 5) * 400} y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">{t}T</text>
                  </g>
                ))}
                
                {/* Curve */}
                <path d={generateCurvePath()} fill="none" stroke="#10b981" strokeWidth="3" />
                
                {/* Area under curve for visual effect */}
                <path d={`M 0 150 L 0 0 ${generateCurvePath()} L 400 150 Z`} fill="url(#decayGradient)" />
                <defs>
                  <linearGradient id="decayGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Current Time Indicator */}
                <line x1={(timeCycles / 5) * 400} y1="0" x2={(timeCycles / 5) * 400} y2="150" stroke="white" strokeWidth="1" />
                <circle cx={(timeCycles / 5) * 400} cy={150 * (1 - remainingPercentage / 100)} r="4" fill="white" />
                
                {/* Axis Labels */}
                <text x="-10" y="10" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 -10 10)">Sisa (N)</text>
              </svg>

              {/* Success Overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-emerald-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Keren Banget! Tepat Sasaran!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Setelah 3 kali waktu paruh, sisa unsur yang belum meluruh adalah (1/2) &times; (1/2) &times; (1/2) = 1/8 atau persis 12.5%!</p>
                    <p className="text-emerald-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4">
                <div className="text-left">
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">Waktu Berjalan (t)</div>
                  <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{timeCycles.toFixed(1)} Waktu Paruh</div>
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 flex flex-col items-center justify-center text-center">
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-1">Sisa Inti Induk (N)</div>
                <div className="text-2xl font-mono font-bold text-emerald-700 dark:text-emerald-300">{remainingPercentage.toFixed(1)}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-emerald-500" />
              Kendali Simulasi
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Berjalannya Waktu</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                    {timeCycles.toFixed(1)} T
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5" 
                  step="0.5"
                  value={timeCycles} 
                  onChange={(e) => setTimeCycles(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-emerald-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 font-mono">
                  <span>0</span>
                  <span>5x Waktu Paruh</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tebakan Sisa (%)</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">
                    {guessPercentage.toFixed(1)}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="0.5"
                  value={guessPercentage} 
                  onChange={(e) => setGuessPercentage(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-amber-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Rumus Peluruhan</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <span className="text-xs text-gray-500 mb-1">N = N&lt;sub&gt;0&lt;/sub&gt; &times; (1/2)&lt;sup&gt;t/T&lt;/sup&gt;</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Peluruhan itu peristiwa acak lho! Kita tidak bisa menebak kapan satu atom tertentu akan meluruh, tetapi dalam jumlah besar, pola eksponensialnya sangat akurat dan bisa diprediksi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Radioaktivitas & Waktu Paruh
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sinar Radioaktif</h4>
                <p className="mb-3">
                  Inti yang tidak stabil meluruh dengan memancarkan partikel atau gelombang elektromagnetik:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  <li><strong>Sinar Alfa (&alpha;):</strong> Partikel masif bermuatan positif (identik dengan inti Helium). Daya tembus paling lemah.</li>
                  <li><strong>Sinar Beta (&beta;):</strong> Elektron atau positron berkecepatan tinggi. Daya tembus menengah.</li>
                  <li><strong>Sinar Gamma (&gamma;):</strong> Foton berenergi sangat tinggi (gelombang elektromagnetik) tanpa massa dan tanpa muatan. Daya tembus paling kuat.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Waktu Paruh (Half-life, T)</h4>
                <p className="mb-3">
                  Waktu paruh adalah waktu yang diperlukan oleh zat radioaktif agar separuh dari intinya meluruh menjadi unsur lain. Rumus peluruhannya adalah:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg flex flex-col">
                  <span>N = N<sub>0</sub> &times; (1/2)<sup>t/T</sup></span>
                </div>
                <p className="text-sm">
                  Di mana <strong>N</strong> adalah jumlah akhir, <strong>N<sub>0</sub></strong> adalah jumlah awal, <strong>t</strong> adalah waktu yang berlalu, dan <strong>T</strong> adalah waktu paruh.
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
