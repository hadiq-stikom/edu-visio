'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, Info, Star, Thermometer, Flame, Snowflake, RefreshCw, BookOpen, X, ChevronDown, ChevronUp, Droplets } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Solute = {
  id: string;
  name: string;
  type: string;
  formula: string;
  i: number;
  desc: string;
  color: string;
  particles: { type: string; color: string }[];
};

const SOLUTES: Solute[] = [
  { 
    id: 'water', name: 'Air Murni', type: 'Pelarut Murni', formula: 'H₂O', i: 1, 
    desc: 'Hanya berisi molekul air. Tidak ada zat terlarut yang menghalangi penguapan atau pembekuan.', 
    color: 'bg-blue-300/20', particles: [] 
  },
  { 
    id: 'glucose', name: 'Glukosa 1 molal', type: 'Non-Elektrolit', formula: 'C₆H₁₂O₆', i: 1, 
    desc: 'Zat non-elektrolit. Dalam larutan tetap dalam bentuk molekul utuh (i = 1).', 
    color: 'bg-amber-100/30', 
    particles: [{ type: 'C₆H₁₂O₆', color: 'bg-emerald-400' }] 
  },
  { 
    id: 'nacl', name: 'Garam (NaCl) 1 molal', type: 'Elektrolit Kuat', formula: 'NaCl', i: 2, 
    desc: 'Elektrolit kuat. 1 molekul terurai menjadi 2 partikel ion: Na⁺ dan Cl⁻ (i = 2).', 
    color: 'bg-slate-200/30', 
    particles: [{ type: 'Na⁺', color: 'bg-blue-500' }, { type: 'Cl⁻', color: 'bg-yellow-400' }] 
  },
  { 
    id: 'mgcl2', name: 'MgCl₂ 1 molal', type: 'Elektrolit Kuat', formula: 'MgCl₂', i: 3, 
    desc: 'Elektrolit kuat. 1 molekul terurai menjadi 3 partikel ion: Mg²⁺ dan 2 Cl⁻ (i = 3).', 
    color: 'bg-purple-100/30', 
    particles: [{ type: 'Mg²⁺', color: 'bg-purple-500' }, { type: 'Cl⁻', color: 'bg-yellow-400' }, { type: 'Cl⁻', color: 'bg-yellow-400' }] 
  },
];

const Kb = 0.52;
const Kf = 1.86;

export default function ColligativeModule() {
  const { addScore } = useUser();
  const [activeSolute, setActiveSolute] = useState<Solute>(SOLUTES[0]);
  const [mode, setMode] = useState<'idle' | 'heating' | 'cooling'>('idle');
  const [currentTemp, setCurrentTemp] = useState(25);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set(['water']));
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const getTargetTemp = (solute: Solute, targetMode: 'heating' | 'cooling') => {
    const isWater = solute.id === 'water';
    const m = isWater ? 0 : 1; // 1 molal for our solutes
    if (targetMode === 'heating') {
      return 100 + (Kb * m * solute.i);
    } else {
      return 0 - (Kf * m * solute.i);
    }
  };

  const handleTest = (sol: Solute) => {
    setActiveSolute(sol);
    setMode('idle');
    setCurrentTemp(25);

    setTested(prev => {
      const next = new Set(prev).add(sol.id);
      if (next.size === SOLUTES.length && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1000);
      }
      return next;
    });
  };

  const startAction = (action: 'heating' | 'cooling') => {
    setMode(action);
    setCurrentTemp(getTargetTemp(activeSolute, action));
  };

  const reset = () => {
    setActiveSolute(SOLUTES[0]);
    setMode('idle');
    setCurrentTemp(25);
  };

  // Generate random particles for visualizer
  const renderParticles = () => {
    if (activeSolute.particles.length === 0) return null;
    
    // We want to show how 'i' affects particle count. 
    // i=1 -> 6 particles
    // i=2 -> 12 particles
    // i=3 -> 18 particles
    const baseCount = 6;
    const items: React.ReactNode[] = [];
    
    for (let j = 0; j < baseCount; j++) {
      activeSolute.particles.forEach((p, idx) => {
        const top = 20 + Math.random() * 60; // 20% to 80%
        const left = 10 + Math.random() * 80; // 10% to 90%
        const animDelay = Math.random() * 2;
        items.push(
          <div 
            key={`${j}-${idx}`} 
            className={`absolute w-4 h-4 rounded-full ${p.color} flex items-center justify-center shadow-sm text-[8px] font-bold text-white shadow-inner animate-pulse`}
            style={{ 
              top: `${top}%`, 
              left: `${left}%`,
              animationDuration: `${2 + Math.random()}s`,
              animationDelay: `${animDelay}s`
            }}
          >
            {p.type.replace(/[^a-zA-Z]/g, '').substring(0, 2)}
          </div>
        );
      });
    }
    return items;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Sifat Koligatif
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Kenaikan Titik Didih & Penurunan Titik Beku
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Tambahkan zat terlarut ke dalam air dan amati bagaimana jumlah partikel (faktor Van 't Hoff) memengaruhi suhu saat larutan mendidih dan membeku. Uji semua larutan untuk poin!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
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
            {showExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Examples Section */}
      {showExamples && (
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 text-left">
            <BookOpen className="h-6 w-6 text-emerald-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Sebanyak 1 molal larutan NaCl dan 1 molal larutan Urea (CO(NH₂)₂) dipanaskan. Larutan manakah yang akan mendidih pada suhu lebih tinggi?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Urea adalah non-elektrolit (i = 1), sedangkan NaCl adalah elektrolit kuat yang terurai menjadi 2 ion (i = 2). Karena konsentrasi molalnya sama, NaCl memiliki jumlah partikel 2 kali lebih banyak daripada urea, sehingga kenaikan titik didih (∆Tb) NaCl lebih besar. <strong>NaCl mendidih pada suhu lebih tinggi.</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Hitunglah titik beku larutan 1 molal MgCl₂ dalam air! (Kf air = 1,86 °C/m)
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  MgCl₂ terurai menjadi Mg²⁺ + 2Cl⁻, sehingga n = 3. Karena kuat, i = 3.<br/>
                  ∆Tf = Kf × m × i<br/>
                  ∆Tf = 1,86 × 1 × 3 = 5,58 °C<br/>
                  Titik Beku (Tf) = 0 - ∆Tf = <strong>-5,58 °C</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lab Area */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[550px] flex flex-col">
          
          {showSuccess && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Simulasi Selesai!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Memahami Faktor Van 't Hoff</p>
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah mengamati bahwa larutan elektrolit (seperti MgCl₂) memiliki perubahan titik didih dan titik beku yang lebih ekstrem dibandingkan larutan non-elektrolit (seperti Glukosa) pada konsentrasi yang sama.
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set(['water'])); reset(); }}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{activeSolute.name}</h3>
            
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300`}>
                Faktor (i) = {activeSolute.i}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-sm font-bold">
                Molaritas: {activeSolute.id === 'water' ? '0' : '1'} molal
              </span>
            </div>

            <div className="flex items-end justify-center gap-8 mb-6">
              {/* Thermometer */}
              <div className="flex flex-col items-center gap-2">
                <div className="font-mono text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {currentTemp.toFixed(2)} °C
                </div>
                <div className="relative w-6 h-48 bg-gray-200 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 flex flex-col justify-end p-0.5">
                  <div className="absolute inset-y-0 w-full flex flex-col justify-between py-2 items-center opacity-30 z-10">
                     <div className="w-3 h-px bg-black dark:bg-white"></div>
                     <div className="w-3 h-px bg-black dark:bg-white"></div>
                     <div className="w-3 h-px bg-black dark:bg-white"></div>
                     <div className="w-3 h-px bg-black dark:bg-white"></div>
                     <div className="w-3 h-px bg-black dark:bg-white"></div>
                  </div>
                  {/* Mercury */}
                  <div 
                    className="w-full bg-red-500 rounded-full transition-all duration-1000 ease-in-out z-0"
                    style={{ 
                      // Map -10 to 110 Celsius to 10% to 90% height
                      height: `${Math.max(5, Math.min(100, ((currentTemp + 10) / 120) * 100))}%` 
                    }}
                  ></div>
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-gray-300 dark:border-gray-700 -mt-4 shadow-sm z-10 flex items-center justify-center">
                   <Thermometer className="w-5 h-5 text-white/50" />
                </div>
              </div>

              {/* Beaker Representation */}
              <div className="relative w-48 h-56 mt-4">
                <div className="absolute inset-0 border-4 border-b-[12px] border-slate-400 dark:border-slate-600 rounded-b-3xl rounded-t-lg z-20 pointer-events-none drop-shadow-sm"></div>
                <div className="absolute top-0 inset-x-4 h-2 bg-white/50 dark:bg-white/10 rounded-full z-20 pointer-events-none"></div>
                
                {/* Visual state effects */}
                {mode === 'heating' && (
                  <div className="absolute bottom-0 w-full flex justify-center -mb-8 z-30 animate-pulse">
                     <Flame className="w-16 h-16 text-orange-500 fill-orange-500/50" />
                  </div>
                )}
                
                {mode === 'cooling' && (
                  <div className="absolute inset-0 border-8 border-cyan-200/50 dark:border-cyan-500/30 rounded-b-3xl z-20 pointer-events-none animate-in fade-in duration-1000"></div>
                )}

                {/* Liquid */}
                <div className={`absolute bottom-3 inset-x-2 h-40 rounded-b-2xl ${
                  mode === 'cooling' ? 'bg-cyan-100 dark:bg-cyan-950/80' : activeSolute.color
                } transition-colors duration-1000 overflow-hidden z-10`}>
                  
                  {/* Boiling bubbles */}
                  {mode === 'heating' && (
                    <div className="absolute inset-0 flex items-end justify-around pb-2 opacity-60">
                      <div className="w-3 h-3 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.8s' }}></div>
                      <div className="w-4 h-4 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.6s', animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '1s', animationDelay: '0.1s' }}></div>
                      <div className="w-3 h-3 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.7s', animationDelay: '0.3s' }}></div>
                      <div className="w-5 h-5 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.9s', animationDelay: '0.5s' }}></div>
                    </div>
                  )}

                  {/* Freezing ice */}
                  {mode === 'cooling' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                      <Snowflake className="w-24 h-24 text-cyan-700 dark:text-cyan-200 animate-pulse" />
                    </div>
                  )}

                  {renderParticles()}
                </div>
              </div>
            </div>

            {/* Calculations Box */}
            <div className="w-full max-w-sm bg-gray-50 dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-inner">
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-2 text-center">Perhitungan Terkini (i = {activeSolute.i})</span>
               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Mendidih (Tb)</p>
                    <div className="font-mono text-sm font-bold text-red-600 dark:text-red-400">
                       Tb = 100 + (Kb × m × i)<br/>
                       {activeSolute.id === 'water' ? 'Tb = 100.00 °C' : `Tb = 100 + (0.52 × 1 × ${activeSolute.i})`}<br/>
                       Tb = {getTargetTemp(activeSolute, 'heating').toFixed(2)} °C
                    </div>
                 </div>
                 <div>
                    <p className="text-xs font-semibold text-gray-500 mb-1">Membeku (Tf)</p>
                    <div className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
                       Tf = 0 - (Kf × m × i)<br/>
                       {activeSolute.id === 'water' ? 'Tf = 0.00 °C' : `Tf = 0 - (1.86 × 1 × ${activeSolute.i})`}<br/>
                       Tf = {getTargetTemp(activeSolute, 'cooling').toFixed(2)} °C
                    </div>
                 </div>
               </div>
            </div>
            
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-emerald-500" />
              Kontrol Suhu
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => startAction('heating')}
                disabled={mode === 'heating'}
                className="py-3 bg-red-100 hover:bg-red-200 text-red-800 font-bold rounded-xl transition-colors disabled:opacity-50 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900/60 flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" /> Panaskan
              </button>
              <button
                onClick={() => startAction('cooling')}
                disabled={mode === 'cooling'}
                className="py-3 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold rounded-xl transition-colors disabled:opacity-50 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60 flex items-center justify-center gap-2"
              >
                <Snowflake className="w-5 h-5" /> Dinginkan
              </button>
            </div>
            
            <button 
              onClick={() => { setMode('idle'); setCurrentTemp(25); }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-colors w-full"
            >
              <RefreshCw className="w-4 h-4" /> Kembalikan ke Suhu Ruang (25°C)
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-emerald-500" />
              Pilih Zat Terlarut
            </h3>
            
            <div className="grid gap-3">
              {SOLUTES.map(sol => {
                const isTested = tested.has(sol.id);
                const isActive = activeSolute.id === sol.id;
                
                return (
                  <button
                    key={sol.id}
                    onClick={() => handleTest(sol)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50' 
                        : isTested
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div>
                      <h4 className={`font-semibold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {sol.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-[200px]">{sol.type} (i = {sol.i})</p>
                      {isTested && !isActive && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          ✓ Telah diuji
                        </span>
                      )}
                    </div>
                    <Beaker className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Sifat Koligatif Larutan
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian</h4>
                <p>Sifat koligatif larutan adalah sifat fisik larutan yang hanya bergantung pada <strong>jumlah partikel zat terlarut</strong>, dan tidak bergantung pada jenis zat terlarutnya. Termasuk di dalamnya Kenaikan Titik Didih (∆Tb), Penurunan Titik Beku (∆Tf), Penurunan Tekanan Uap, dan Tekanan Osmotik.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Faktor Van 't Hoff (i)</h4>
                <p>Zat elektrolit (seperti garam) akan terurai menjadi ion-ion ketika dilarutkan dalam air, sehingga menghasilkan partikel yang lebih banyak dibandingkan molekul awalnya.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Non-Elektrolit:</strong> Tidak terurai, i = 1. (contoh: Gula, Urea)</li>
                  <li><strong>Elektrolit:</strong> Terurai, i &gt; 1. (contoh: NaCl terurai menjadi Na⁺ dan Cl⁻, i = 2)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Rumus Utama</h4>
                <div className="bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 p-3 rounded-lg font-mono font-bold space-y-2">
                  <p>Kenaikan Titik Didih: ∆Tb = Kb × m × i</p>
                  <p>Penurunan Titik Beku: ∆Tf = Kf × m × i</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">*m = molalitas larutan, Kb/Kf = tetapan air</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
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
