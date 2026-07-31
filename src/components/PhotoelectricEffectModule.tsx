'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

const METALS = [
  { id: 'na', name: 'Natrium (Na)', w0_ev: 2.28, color: '#fef08a' }, // threshold ~5.5e14 Hz
  { id: 'zn', name: 'Seng (Zn)', w0_ev: 4.3, color: '#94a3b8' },    // threshold ~10.4e14 Hz
  { id: 'cu', name: 'Tembaga (Cu)', w0_ev: 4.7, color: '#fb923c' }, // threshold ~11.3e14 Hz
];

export default function PhotoelectricEffectModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [selectedMetalId, setSelectedMetalId] = useState('na');
  const [freq14, setFreq14] = useState(6.0); // Frequency in 10^14 Hz (from 4.0 to 12.0)
  const [intensity, setIntensity] = useState(5); // 1 to 10
  
  const metal = METALS.find(m => m.id === selectedMetalId) || METALS[0];
  
  // Physics constants
  const h_ev = 4.136e-15; // Planck constant in eV.s
  
  // Calculations
  const frequency = freq14 * 1e14;
  const energyEv = h_ev * frequency; // Photon energy in eV
  const ekEv = energyEv - metal.w0_ev; // Kinetic energy
  const isEjecting = ekEv > 0;
  
  // Wavelength for color
  const c = 3e8;
  const lambdaNm = (c / frequency) * 1e9;

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Target Seng (Zn) and frequency just above threshold (e.g. 10.4 to 10.6)
    if (selectedMetalId === 'zn' && freq14 >= 10.3 && freq14 <= 10.6) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [selectedMetalId, freq14, showSuccess, hasWon]);

  // Convert lambdaNm to a rough hex color for the laser
  const getLaserColor = (nm: number) => {
    if (nm < 400) return '#a855f7'; // UV / Purple
    if (nm < 450) return '#3b82f6'; // Blue
    if (nm < 500) return '#0ea5e9'; // Cyan
    if (nm < 550) return '#22c55e'; // Green
    if (nm < 600) return '#eab308'; // Yellow
    if (nm < 650) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  // Animation for photons and electrons
  const [particles, setParticles] = useState<{ id: number, type: 'photon'|'electron', x: number, y: number }[]>([]);
  
  useEffect(() => {
    let particleId = 0;
    
    const interval = setInterval(() => {
      // Spawn new photons based on intensity
      const numPhotonsToSpawn = Math.floor(intensity / 3) + 1;
      
      const newParticles: { id: number, type: 'photon'|'electron', x: number, y: number }[] = [];
      for (let i = 0; i < numPhotonsToSpawn; i++) {
        newParticles.push({
          id: particleId++,
          type: 'photon' as const,
          x: 0,
          y: Math.random() * 80 + 10,
        });
      }
      
      setParticles(prev => {
        // Move existing
        let updated = prev.map(p => {
          if (p.type === 'photon') {
            return { ...p, x: p.x + 20 }; // Photon speed
          } else {
            // Electron speed depends on kinetic energy (visual mapping)
            const speed = Math.max(2, ekEv * 5);
            return { ...p, x: p.x + speed, y: p.y + (Math.random() - 0.5) * 5 };
          }
        });
        
        // Check collisions (photons hitting metal at x=200)
        updated.forEach(p => {
          if (p.type === 'photon' && p.x >= 200 && p.x < 220) {
            // Convert to electron if energy is high enough
            if (isEjecting && Math.random() > 0.3) {
              p.type = 'electron';
              p.x = 220; // Start at metal surface
            } else {
              // Absorbed without ejection
              p.x = 1000; // Move offscreen
            }
          }
        });
        
        // Remove offscreen
        updated = updated.filter(p => p.x < 400);
        
        return [...updated, ...newParticles];
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [intensity, isEjecting, ekEv]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 8: Gejala Kuantum (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Efek Fotolistrik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Cahaya (foton) yang ditembakkan ke permukaan logam dapat melepaskan elektron dari logam tersebut. Namun, hal ini hanya terjadi jika foton memiliki energi (E = hf) yang lebih besar dari energi ikat logam (Fungsi Kerja, W&#8320;). Intensitas cahaya hanya menambah <i>jumlah</i> elektron, bukan <i>energi</i> elektron!
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
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Energi Kinetik Maksimum</p>
                  <p className="mb-2">Sebuah logam memiliki fungsi kerja W&#8320; = 2.0 eV. Disinari oleh cahaya dengan foton berenergi 3.5 eV. Berapakah energi kinetik maksimum elektron yang terlepas?</p>
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p>Gunakan rumus Efek Fotolistrik Einstein: E&#8347; = E - W&#8320;<br/>
                  E&#8347; = 3.5 eV - 2.0 eV = <strong>1.5 eV</strong>. <br/>
                  Elektron terlepas dan melesat dengan energi kinetik 1.5 eV.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-1 shadow-lg shadow-indigo-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-indigo-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-indigo-100 text-sm mb-4 leading-relaxed">
                Pilih logam <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">Seng (Zn)</strong> lalu cari frekuensi ambang f&#8320; di mana elektron <i>baru saja</i> mulai terlepas!
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
              <Activity className="h-5 w-5 text-indigo-500" />
              Simulasi Tumbukan Foton & Logam
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 p-0 flex">
              
              {/* Flashlight Icon */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-20 bg-slate-600 rounded-r-lg border-y-2 border-r-2 border-slate-400 z-10 flex items-center justify-end pr-2">
                <div className="w-2 h-10 rounded-full" style={{ backgroundColor: getLaserColor(lambdaNm) }}></div>
              </div>
              
              <svg viewBox="0 0 400 150" className="w-full h-full">
                
                {/* Photons and Electrons */}
                {particles.map(p => {
                  if (p.type === 'photon') {
                    return (
                      <g key={p.id} transform={`translate(${p.x}, ${p.y + 25})`}>
                        <path d="M 0 0 Q 5 -5, 10 0 T 20 0" fill="none" stroke={getLaserColor(lambdaNm)} strokeWidth="2" />
                        <circle cx="20" cy="0" r="2" fill={getLaserColor(lambdaNm)} />
                      </g>
                    );
                  } else {
                    return (
                      <g key={p.id} transform={`translate(${p.x}, ${p.y + 25})`}>
                        <circle cx="0" cy="0" r="4" fill="#38bdf8" />
                        <text x="0" y="1" fill="#0f172a" fontSize="5" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">-</text>
                      </g>
                    );
                  }
                })}

                {/* Metal Plate */}
                <rect x="200" y="0" width="40" height="150" fill={metal.color} opacity="0.8" />
                <rect x="200" y="0" width="5" height="150" fill="white" opacity="0.3" />
                
              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-indigo-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Eksperimen Berhasil!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Frekuensi ambang Seng (Zn) berada di sekitar 10.4 &times; 10&#185;&#8308; Hz. Di bawah frekuensi ini, berapapun intensitas cahayanya, tidak ada elektron yang akan terlepas!</p>
                    <p className="text-indigo-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Panjang Gelombang</div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-100" style={{ color: getLaserColor(lambdaNm) }}>{lambdaNm.toFixed(0)} nm</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Energi Foton (E)</div>
                <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{energyEv.toFixed(2)} eV</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Fungsi Kerja (W&#8320;)</div>
                <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{metal.w0_ev.toFixed(2)} eV</div>
              </div>
              <div className={`p-4 rounded-xl border ${isEjecting ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
                <div className={`text-xs font-bold mb-1 ${isEjecting ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>E. Kinetik (E&#8347;)</div>
                <div className={`text-lg font-bold ${isEjecting ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>{isEjecting ? ekEv.toFixed(2) : '0.00'} eV</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-indigo-500" />
              Instrumen Eksperimen
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Pilih Logam Sasaran</label>
                <div className="grid grid-cols-1 gap-2">
                  {METALS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMetalId(m.id)}
                      className={`px-3 py-2 text-sm font-semibold rounded-lg text-left transition-colors border ${selectedMetalId === m.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:border-indigo-800 dark:text-indigo-300' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                    >
                      {m.name} (W&#8320; = {m.w0_ev} eV)
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Frekuensi Foton (f)</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 font-mono bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded">
                    {freq14.toFixed(1)} &times; 10&#185;&#8308; Hz
                  </span>
                </div>
                <input 
                  type="range" 
                  min="4.0" 
                  max="12.0" 
                  step="0.1"
                  value={freq14} 
                  onChange={(e) => setFreq14(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Intensitas Cahaya</span>
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded">
                    {intensity}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  step="1"
                  value={intensity} 
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-amber-500"
                />
                <p className="text-xs text-gray-500 mt-2">*Intensitas hanya menambah jumlah foton, bukan energinya!</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-indigo-50 dark:bg-indigo-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                Teori Efek Fotolistrik
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Penemuan yang Membuahkan Nobel bagi Einstein</h4>
                <p className="mb-3">
                  Efek Fotolistrik adalah gejala terlepasnya elektron dari permukaan logam ketika disinari oleh gelombang elektromagnetik (cahaya) pada frekuensi tertentu. Fenomena ini membuktikan bahwa cahaya memiliki sifat partikel (Foton).
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Syarat Terjadinya Efek Fotolistrik</h4>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Energi Foton (E)</strong> harus lebih besar dari <strong>Fungsi Kerja (W&#8320;)</strong> logam sasaran. (E &gt; W&#8320;)</li>
                  <li><strong>Frekuensi cahaya (f)</strong> harus lebih besar dari frekuensi ambang logam (f&#8320;).</li>
                  <li>Meningkatkan intensitas cahaya <strong>tidak akan</strong> melepaskan elektron jika frekuensinya di bawah ambang f&#8320;. Intensitas hanya memperbanyak jumlah foton yang datang (memperbanyak jumlah elektron lepas JIKA syarat E &gt; W&#8320; terpenuhi).</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Persamaan Energi</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  E&#8347; = hf - W&#8320;
                </div>
                <p className="text-sm">
                  Di mana <strong>E&#8347;</strong> adalah Energi Kinetik Maksimum elektron yang terlepas.
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
