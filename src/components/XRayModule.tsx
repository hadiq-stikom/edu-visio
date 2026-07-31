'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Radiation } from 'lucide-react';

export default function XRayModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for Voltage (kiloVolts)
  const [voltageKv, setVoltageKv] = useState(50); // 50 kV
  
  // Physics calculations
  const voltageV = voltageKv * 1000;
  // hc = 1240 eV.nm
  const hc_eV_nm = 1240;
  const lambdaMinNm = hc_eV_nm / voltageV;
  const lambdaMinAngstrom = lambdaMinNm * 10;
  
  // Energy of max photon is exactly the electron voltage in eV
  const maxEnergyEv = voltageV;

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Produce hard X-rays with wavelength <= 0.01 nm (requires V >= 124 kV)
    if (lambdaMinNm <= 0.01) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lambdaMinNm, showSuccess, hasWon]);

  // Animation for electrons and X-rays
  const [electrons, setElectrons] = useState<{ id: number, x: number }[]>([]);
  const [xrays, setXrays] = useState<{ id: number, r: number, opacity: number }[]>([]);
  const particleIdRef = React.useRef(0);
  
  useEffect(() => {
    
    const interval = setInterval(() => {
      // Add new electron
      setElectrons(prev => {
        let updated = prev.map(e => ({ ...e, x: e.x + (voltageKv / 5) })); // Speed based on voltage
        // Check collision at anode (x = 250)
        updated.forEach(e => {
          if (e.x >= 250 && e.x < 250 + (voltageKv / 5)) {
            // Spawn X-ray pulse
            setXrays(xr => [...xr, { id: particleIdRef.current++, r: 10, opacity: 1 }]);
          }
        });
        
        // Remove electrons past anode
        updated = updated.filter(e => e.x < 250);
        
        // Spawn new
        if (Math.random() > 0.5) {
          updated.push({ id: particleIdRef.current++, x: 50 }); // Start at cathode
        }
        return updated;
      });
      
      // Update X-rays
      setXrays(prev => {
        return prev
          .map(x => ({ ...x, r: x.r + 5, opacity: x.opacity - 0.05 }))
          .filter(x => x.opacity > 0);
      });
      
    }, 50);
    
    return () => clearInterval(interval);
  }, [voltageKv]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Radiation className="h-3.5 w-3.5" /> Bab 8: Gejala Kuantum (Sub 4)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Sinar-X (Bremsstrahlung)</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Sinar-X dihasilkan saat elektron berkecepatan tinggi ditabrakkan ke target logam padat (anoda). Elektron tersebut direm secara mendadak (Bremsstrahlung), dan energi kinetiknya diubah menjadi foton Sinar-X berenergi tinggi!
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
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Panjang Gelombang Minimum</p>
                  <p className="mb-2">Sebuah tabung sinar-X dioperasikan pada tegangan 50 kV (50,000 Volt). Jika konstanta hc = 1240 eV&middot;nm, berapakah panjang gelombang minimum (&lambda;<sub>min</sub>) Sinar-X yang dihasilkan?</p>
                  <p className="font-semibold text-cyan-700 dark:text-cyan-400 mb-1">Penyelesaian:</p>
                  <p>Energi kinetik elektron E = e &times; V = 50,000 eV.<br/>
                  Seluruh energi ini diubah menjadi 1 foton maksimum:<br/>
                  &lambda;<sub>min</sub> = hc / E = 1240 / 50,000 = <strong>0.0248 nm</strong> (atau 0.248 &Aring;).</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-1 shadow-lg shadow-cyan-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-cyan-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-cyan-100 text-sm mb-4 leading-relaxed">
                Tingkatkan tegangan untuk menembus jaringan lebih dalam! Hasilkan <i>Hard X-Ray</i> dengan panjang gelombang minimum <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">&le; 0.01 nm</strong>!
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
              <Activity className="h-5 w-5 text-cyan-500" />
              Tabung Sinar-X (Tabung Coolidge)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 p-0 flex">
              
              <svg viewBox="0 0 400 150" className="w-full h-full">
                
                {/* Background Grid */}
                <pattern id="gridx" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#gridx)" />

                {/* Cathode (Left) */}
                <path d="M 30 20 L 50 40 L 50 110 L 30 130 Z" fill="#94a3b8" />
                <rect x="0" y="70" width="30" height="10" fill="#cbd5e1" />
                <text x="35" y="15" fill="#cbd5e1" fontSize="10" fontWeight="bold">Katoda (-)</text>
                
                {/* Filament glow */}
                <circle cx="50" cy="75" r="15" fill="#ef4444" opacity="0.5" className="animate-pulse" />

                {/* Anode Target (Right) */}
                <path d="M 250 20 L 270 20 L 270 130 L 250 130 L 250 20 Z" fill="#fb923c" />
                <path d="M 250 50 L 240 60 L 240 90 L 250 100 Z" fill="#64748b" /> {/* Tungsten Target angle */}
                <rect x="270" y="70" width="130" height="10" fill="#cbd5e1" />
                <text x="260" y="15" fill="#cbd5e1" fontSize="10" fontWeight="bold">Anoda (+)</text>
                
                {/* Electric Field Indicator */}
                <line x1="80" y1="130" x2="220" y2="130" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="5 5" />
                <path d="M 215 125 L 225 130 L 215 135 Z" fill="#0ea5e9" />
                <text x="150" y="145" fill="#0ea5e9" fontSize="10" textAnchor="middle">Medan Listrik Percepatan</text>

                {/* Electrons */}
                {electrons.map(e => (
                  <circle key={e.id} cx={e.x} cy={75 + (Math.random() * 20 - 10)} r="2" fill="#38bdf8" />
                ))}

                {/* X-Ray Emissions from Anode */}
                {xrays.map(xr => (
                  <circle key={xr.id} cx="245" cy="75" r={xr.r} fill="none" stroke="#a855f7" strokeWidth="2" opacity={xr.opacity} />
                ))}

              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-cyan-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Energi Penembus Ekstrem!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Anda telah mencapai tegangan &ge; 124 kV! Tabung sekarang memancarkan "Hard X-Rays" (Sinar-X Keras) dengan panjang gelombang di bawah 0.01 nm yang biasa dipakai pada industri baja atau terapi radiasi kanker!</p>
                    <p className="text-cyan-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-1">Energi Maksimum Foton</div>
                <div className="text-xl font-mono font-bold text-gray-800 dark:text-gray-100">{(maxEnergyEv / 1000).toFixed(0)} keV</div>
              </div>
              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <div className="text-xs text-cyan-600 dark:text-cyan-400 font-bold mb-1">Panjang Gelombang Min (&lambda;&#8320;)</div>
                <div className="text-xl font-mono font-bold text-cyan-700 dark:text-cyan-300">{lambdaMinNm.toFixed(4)} nm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-cyan-500" />
              Generator Tegangan Tinggi
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tegangan Anoda (V)</span>
                  <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400 font-mono bg-cyan-50 dark:bg-cyan-900/30 px-2 py-0.5 rounded">
                    {voltageKv} kV
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="150" 
                  step="1"
                  value={voltageKv} 
                  onChange={(e) => setVoltageKv(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-cyan-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Batas Panjang Gelombang (Angstrom)</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-white dark:bg-black px-4 py-1.5 rounded shadow-inner border border-slate-200 dark:border-slate-800 text-cyan-600 dark:text-cyan-400">
                      &lambda; = {lambdaMinAngstrom.toFixed(3)} &Aring;
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">1 &Aring; = 0.1 nm = 10&#8315;&#185;&#8304; m</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Anda?</strong> Semakin tinggi tegangan (kV) yang diberikan, elektron akan menabrak anoda semakin keras. Foton Sinar-X yang dihasilkan pun makin berenergi tinggi (panjang gelombang makin pendek), menjadikannya mampu menembus benda tebal seperti tulang atau logam!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-cyan-50 dark:bg-cyan-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-500" />
                Teori Sinar-X (Bremsstrahlung)
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Penemuan Röntgen</h4>
                <p className="mb-3">
                  Sinar-X ditemukan tanpa sengaja oleh Wilhelm Röntgen pada 1895 saat ia melakukan eksperimen sinar katoda. Sinar tak kasat mata ini mampu menembus buku, kayu, bahkan daging manusia untuk mencetak gambar tulang di pelat fotografi.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Radiasi Pengereman (Bremsstrahlung)</h4>
                <p className="mb-3">
                  Sebagian besar Sinar-X di rumah sakit dihasilkan melalui proses Bremsstrahlung ("Radiasi Pengereman" dalam bahasa Jerman). Elektron dipercepat dengan tegangan tinggi, lalu menabrak inti atom target (Tungsten). Perlambatan mendadak ini mengubah energi kinetik elektron menjadi pancaran gelombang elektromagnetik (Foton Sinar-X).
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Batas Panjang Gelombang Minimum</h4>
                <p className="mb-3">
                  Menurut teori Planck, foton paling berenergi dihasilkan saat 100% energi kinetik elektron diubah menjadi 1 buah foton sinar-X.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  &lambda;&#8320; = hc / eV
                </div>
                <p className="text-sm">
                  Di mana <strong>e</strong> adalah muatan elektron (1.6 &times; 10&#8315;&#185;&#8313; C) dan <strong>V</strong> adalah tegangan pemercepat (Volt).
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
