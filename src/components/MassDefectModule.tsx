'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Atom } from 'lucide-react';

export default function MassDefectModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for separation (0 = combined, 100 = fully separated)
  const [separation, setSeparation] = useState(100);
  
  // Physics constants for Helium-4
  const massProton = 1.00728;
  const massNeutron = 1.00866;
  const massHe4 = 4.00150;
  
  const totalConstituentMass = 2 * massProton + 2 * massNeutron;
  const massDefect = totalConstituentMass - massHe4;
  const bindingEnergy = massDefect * 931.5; // MeV

  // Calculated current mass based on separation (for visual effect)
  const currentMass = massHe4 + (massDefect * (separation / 100));

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [energyGuess, setEnergyGuess] = useState(0);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Separation = 0 (combined) AND energy guess is close to 28.3
    if (separation === 0 && Math.abs(energyGuess - 28.3) < 0.5) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [separation, energyGuess, showSuccess, hasWon]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Atom className="h-3.5 w-3.5" /> Bab 9: Fisika Inti (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Defek Massa & Energi Ikat</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Massa sebuah inti atom ternyata lebih kecil dibandingkan jumlah massa proton dan neutron pembentuknya! Selisih massa ini (Defek Massa) berubah menjadi Energi Ikat Inti yang sangat besar (E=mc&sup2;) untuk mengikat partikel-partikel inti agar tidak tercerai-berai.
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
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Energi Ikat Inti Helium</p>
                  <p className="mb-2">Massa proton = 1.0078 sma, massa neutron = 1.0086 sma. Jika massa inti Helium (2 proton + 2 neutron) adalah 4.0026 sma dan 1 sma = 931.5 MeV. Hitung defek massa dan energi ikatnya!</p>
                  <p className="font-semibold text-violet-700 dark:text-violet-400 mb-1">Penyelesaian:</p>
                  <p>Massa penyusun = 2(1.0078) + 2(1.0086) = 2.0156 + 2.0172 = 4.0328 sma.<br/>
                  Defek massa (&Delta;m) = Massa penyusun - Massa inti = 4.0328 - 4.0026 = <strong>0.0302 sma</strong>.<br/>
                  Energi Ikat (E) = &Delta;m &times; 931.5 = 0.0302 &times; 931.5 = <strong>28.13 MeV</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-1 shadow-lg shadow-violet-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-violet-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-violet-100 text-sm mb-4 leading-relaxed">
                Ayo coba satukan nukleon pembentuk Helium-4, lalu atur <i>slider</i> perkiraan Energi Ikat (MeV) agar sesuai dengan defek massanya (~28.3 MeV)!
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
              <Activity className="h-5 w-5 text-violet-500" />
              Timbangan Massa Nukleon (Helium-4)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 p-0 flex items-center justify-center">
              
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Background Grid */}
                <pattern id="gridx_mass" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#gridx_mass)" />

                {/* Scale (Timbangan) Base */}
                <path d="M 150 180 L 250 180 L 220 150 L 180 150 Z" fill="#475569" />
                <rect x="180" y="140" width="40" height="10" fill="#cbd5e1" />
                
                {/* Scale Plate */}
                <path d="M 120 140 L 280 140 L 270 145 L 130 145 Z" fill="#94a3b8" />
                
                {/* Mass Readout on Scale */}
                <rect x="175" y="155" width="50" height="20" fill="#0f172a" rx="2" />
                <text x="200" y="170" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle" className="font-mono">
                  {currentMass.toFixed(5)} u
                </text>

                {/* Particles */}
                <g className="transition-all duration-300">
                  {/* Protons (Red) */}
                  <circle cx={200 - (separation * 0.4)} cy={125 - (separation * 0.1)} r="12" fill="#ef4444" />
                  <text x={200 - (separation * 0.4)} y={129 - (separation * 0.1)} fill="white" fontSize="10" textAnchor="middle">p</text>
                  
                  <circle cx={210 + (separation * 0.3)} cy={110 - (separation * 0.3)} r="12" fill="#ef4444" />
                  <text x={210 + (separation * 0.3)} y={114 - (separation * 0.3)} fill="white" fontSize="10" textAnchor="middle">p</text>

                  {/* Neutrons (Blue) */}
                  <circle cx={190 - (separation * 0.2)} cy={110 - (separation * 0.4)} r="12" fill="#3b82f6" />
                  <text x={190 - (separation * 0.2)} y={114 - (separation * 0.4)} fill="white" fontSize="10" textAnchor="middle">n</text>
                  
                  <circle cx={215 + (separation * 0.4)} cy={130 - (separation * 0.2)} r="12" fill="#3b82f6" />
                  <text x={215 + (separation * 0.4)} y={134 - (separation * 0.2)} fill="white" fontSize="10" textAnchor="middle">n</text>
                </g>

                {/* Binding Energy Animation (only visible when close to combined) */}
                {separation < 10 && (
                  <g className="animate-pulse opacity-70">
                    <circle cx="200" cy="120" r="30" fill="url(#energyGlow)" opacity="0.6" />
                    <defs>
                      <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#eab308" stopOpacity="1" />
                        <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <path d="M 230 120 Q 250 100 270 90 L 260 85 M 270 90 L 275 100" fill="none" stroke="#eab308" strokeWidth="2" />
                    <text x="280" y="85" fill="#eab308" fontSize="12" fontWeight="bold">Energi Ikat (+)</text>
                  </g>
                )}
              </svg>

              {/* Success Overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-violet-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Keren Banget! Tepat Sasaran!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Defek massa Helium-4 adalah ~0.03038 u yang setara dengan energi ikat sebesar 28.3 MeV. Energi raksasa inilah yang ditambang pada reaktor fusi matahari!</p>
                    <p className="text-violet-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Massa Total Komponen (Terpisah)</div>
                <div className="text-xl font-mono font-bold text-gray-800 dark:text-gray-100">{totalConstituentMass.toFixed(5)} u</div>
              </div>
              <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-xl border border-violet-200 dark:border-violet-800">
                <div className="text-xs text-violet-600 dark:text-violet-400 font-bold mb-1">Massa Inti He-4 (Bersatu)</div>
                <div className="text-xl font-mono font-bold text-violet-700 dark:text-violet-300">{massHe4.toFixed(5)} u</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-violet-500" />
              Kendali Simulasi
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Penyatuan Inti</span>
                  <span className="text-sm font-bold text-violet-600 dark:text-violet-400 font-mono bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded">
                    {100 - separation}% Bersatu
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="1"
                  value={100 - separation} 
                  onChange={(e) => setSeparation(100 - parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-violet-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 font-mono">
                  <span>Terpisah</span>
                  <span>Bersatu</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tebak Energi Ikat (MeV)</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">
                    {energyGuess.toFixed(1)} MeV
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="50" 
                  step="0.1"
                  value={energyGuess} 
                  onChange={(e) => setEnergyGuess(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-amber-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Faktor Konversi</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-bold mb-1">1 u = 931.5 MeV</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Defek massa (massa yang hilang) tidak benar-benar lenyap lho, melainkan berubah bentuk menjadi Energi (E=mc&sup2;). Semakin besar energi ikat per nukleon suatu unsur, semakin stabil inti unsur tersebut!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-violet-50 dark:bg-violet-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-500" />
                Defek Massa & Energi Ikat
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Defek Massa (&Delta;m)</h4>
                <p className="mb-3">
                  Inti atom terdiri dari proton dan neutron (disebut nukleon). Namun, jika kita menimbang inti atom secara utuh, massanya selalu lebih kecil daripada jumlah massa proton dan neutron yang membentuknya. Selisih massa ini disebut defek massa.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-sm">
                  &Delta;m = (Z &times; m<sub>p</sub> + (A - Z) &times; m<sub>n</sub>) - m<sub>inti</sub>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Energi Ikat Inti (Binding Energy)</h4>
                <p className="mb-3">
                  Kemana hilangnya massa tersebut? Berdasarkan teori relativitas Einstein, massa yang hilang (defek massa) berubah menjadi energi ikat inti yang merekatkan proton dan neutron agar tidak tolak-menolak (gaya inti kuat).
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  E = &Delta;m &times; c&sup2;
                </div>
                <p className="text-sm">
                  Dalam fisika inti, 1 satuan massa atom (sma atau u) setara dengan energi sebesar 931.5 MeV. Sehingga rumusnya praktisnya adalah <strong>E = &Delta;m &times; 931.5 MeV</strong>.
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
