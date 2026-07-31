'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal } from 'lucide-react';

export default function CoulombLawModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [q1, setQ1] = useState(1); // -3 to 3
  const [q2, setQ2] = useState(-1); // -3 to 3
  const [r, setR] = useState(2); // 1 to 5 (distance)
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Game Target (Relative Force)
  // Target: -1 (Tarik menarik 1 satuan) -> e.g. q1=2, q2=-2, r=2 => (2*-2)/4 = -1
  const [targetForce, setTargetForce] = useState(-1);
  const [targetDesc, setTargetDesc] = useState("Tarik Menarik 1 Satuan");
  
  // Calculate relative force (F = q1*q2 / r^2)
  const force = (q1 * q2) / (r * r);
  const isAttractive = force < 0;
  const isRepulsive = force > 0;
  
  const generateNewTarget = () => {
    const targets = [
      { f: -1, desc: "Tarik Menarik 1 Satuan" },
      { f: 1, desc: "Tolak Menolak 1 Satuan" },
      { f: -2, desc: "Tarik Menarik 2 Satuan" },
      { f: -0.25, desc: "Tarik Menarik 0.25 Satuan" },
    ];
    const available = targets.filter(t => t.f !== targetForce);
    const next = available[Math.floor(Math.random() * available.length)];
    setTargetForce(next.f);
    setTargetDesc(next.desc);
  };
  
  useEffect(() => {
    if (showSuccess) return;
    
    // Check if current force matches target
    if (Math.abs(force - targetForce) < 0.01) {
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
        setQ1(1);
        setQ2(-1);
        setR(2);
      }, 4000);
    }
  }, [force, targetForce, showSuccess]);

  // Visual calculations for SVG
  const width = 600;
  const cx = width / 2;
  const pixelsPerUnit = 40;
  const x1 = cx - (r * pixelsPerUnit) / 2;
  const x2 = cx + (r * pixelsPerUnit) / 2;
  const forceVectorLength = Math.min(Math.abs(force) * 60, 150); // limit visual length

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Magnet className="h-3.5 w-3.5" /> Bab 1: Listrik Statis
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Hukum Coulomb & Medan Listrik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Bereksperimenlah dengan dua buah partikel bermuatan. Amati bagaimana jarak (r) dan besar muatan (q) memengaruhi gaya (F) interaksi di antara keduanya!
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Mengubah Jarak (r)</p>
                  <p className="mb-2">Jika awalnya dua muatan berjarak 2 meter memiliki gaya F. Apa yang terjadi jika jaraknya dijauhkan menjadi 4 meter (2x lipat)?</p>
                  <p className="font-semibold text-violet-700 dark:text-violet-400 mb-1">Penyelesaian:</p>
                  <p>Karena F berbanding terbalik dengan kuadrat jarak (1/r²), maka jika jarak 2x lipat, Gaya akan menjadi 1/2² = 1/4 dari gaya semula. Gaya melemah secara drastis!</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-violet-500 mb-2" />
          <span className="text-xs text-violet-700 dark:text-violet-400 font-bold uppercase text-center mb-1">Target Gaya</span>
          <span className="text-sm font-black text-violet-600 dark:text-violet-500 text-center leading-tight">{targetDesc}</span>
          <span className="text-xs text-violet-500/70 mt-2 font-mono">Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Gaya Tepat!</h3>
                <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">Gaya F = {force} Satuan</p>
                  <p className="text-sm leading-relaxed">
                    Kerja bagus! Dengan q₁ = {q1} dan q₂ = {q2} pada jarak r = {r}, interaksi listrik yang terjadi adalah <strong>{isAttractive ? 'Tarik Menarik' : force === 0 ? 'Netral' : 'Tolak Menolak'}</strong>.
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            <div className="z-10 w-full relative h-48 flex items-center justify-center">
               <svg width={width} height="200" className="overflow-visible">
                 {/* Distance indicator */}
                 <line x1={x1} y1="160" x2={x2} y2="160" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                 <text x={cx} y="180" fill="#9ca3af" fontSize="14" textAnchor="middle" fontWeight="bold">r = {r} satuan</text>
                 <line x1={x1} y1="155" x2={x1} y2="165" stroke="#9ca3af" strokeWidth="2" />
                 <line x1={x2} y1="155" x2={x2} y2="165" stroke="#9ca3af" strokeWidth="2" />

                 {/* Force Vectors */}
                 {force !== 0 && (
                   <>
                     {/* Vector on Q1 */}
                     <g transform={`translate(${x1}, 100)`}>
                       <line 
                         x1={0} y1={0} 
                         x2={isAttractive ? forceVectorLength : -forceVectorLength} y2={0} 
                         stroke="#f43f5e" strokeWidth="4" 
                       />
                       <polygon 
                         points={isAttractive ? `${forceVectorLength},0 ${forceVectorLength-10},-5 ${forceVectorLength-10},5` : `${-forceVectorLength},0 ${-forceVectorLength+10},-5 ${-forceVectorLength+10},5`} 
                         fill="#f43f5e" 
                       />
                       <text x={isAttractive ? forceVectorLength/2 : -forceVectorLength/2} y="-15" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">F</text>
                     </g>
                     
                     {/* Vector on Q2 */}
                     <g transform={`translate(${x2}, 100)`}>
                       <line 
                         x1={0} y1={0} 
                         x2={isAttractive ? -forceVectorLength : forceVectorLength} y2={0} 
                         stroke="#f43f5e" strokeWidth="4" 
                       />
                       <polygon 
                         points={isAttractive ? `${-forceVectorLength},0 ${-forceVectorLength+10},-5 ${-forceVectorLength+10},5` : `${forceVectorLength},0 ${forceVectorLength-10},-5 ${forceVectorLength-10},5`} 
                         fill="#f43f5e" 
                       />
                       <text x={isAttractive ? -forceVectorLength/2 : forceVectorLength/2} y="-15" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">F</text>
                     </g>
                   </>
                 )}

                 {/* Particles */}
                 <circle cx={x1} cy="100" r={Math.max(20, 15 + Math.abs(q1)*5)} fill={q1 > 0 ? '#ef4444' : q1 < 0 ? '#3b82f6' : '#9ca3af'} stroke="#ffffff" strokeWidth="3" className="transition-all duration-300" />
                 <text x={x1} y="105" fill="#fff" fontSize="16" textAnchor="middle" fontWeight="bold">
                   {q1 > 0 ? `+${q1}` : q1 < 0 ? q1 : '0'}
                 </text>

                 <circle cx={x2} cy="100" r={Math.max(20, 15 + Math.abs(q2)*5)} fill={q2 > 0 ? '#ef4444' : q2 < 0 ? '#3b82f6' : '#9ca3af'} stroke="#ffffff" strokeWidth="3" className="transition-all duration-300" />
                 <text x={x2} y="105" fill="#fff" fontSize="16" textAnchor="middle" fontWeight="bold">
                   {q2 > 0 ? `+${q2}` : q2 < 0 ? q2 : '0'}
                 </text>
               </svg>
            </div>
            
            <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-700">
               <span className="text-xs text-gray-400 font-bold uppercase">Interaksi</span>
               <div className={`font-black ${isAttractive ? 'text-rose-400' : force === 0 ? 'text-gray-400' : 'text-amber-400'}`}>
                 {isAttractive ? 'Tarik Menarik' : force === 0 ? 'Netral' : 'Tolak Menolak'}
               </div>
            </div>
            
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              {q1 === 0 || q2 === 0 ? (
                <span> Karena ada muatan netral (0), maka gaya yang terjadi adalah 0 (Tidak ada gaya coulomb).</span>
              ) : (
                <span> 
                  Muatan q₁ ({q1 > 0 ? 'Positif' : 'Negatif'}) dan q₂ ({q2 > 0 ? 'Positif' : 'Negatif'}) adalah {q1 * q2 > 0 ? 'sejenis, sehingga mereka saling menolak' : 'berbeda jenis, sehingga mereka saling menarik'}.
                  Jika kamu mengubah jarak r dari {r} ke angka lain, panjang panah gaya akan berubah secara eksponensial kuadrat!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <MoveHorizontal className="h-4 w-4 text-violet-500" />
             <h3 className="font-bold text-gray-900 dark:text-white">Panel Kendali</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Jarak antar partikel (r)</label>
                <span className="text-sm font-mono font-bold text-gray-600 dark:text-gray-400">{r}</span>
              </div>
              <input type="range" min="1" max="5" step="1" value={r} onChange={e => setR(parseInt(e.target.value))} className="w-full accent-gray-500" />
            </div>

            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-red-800 dark:text-red-300">Muatan Partikel 1 (q₁)</label>
                <span className="text-sm font-mono font-bold text-red-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{q1 > 0 ? `+${q1}` : q1}</span>
              </div>
              <input type="range" min="-3" max="3" step="1" value={q1} onChange={e => setQ1(parseInt(e.target.value))} className="w-full accent-red-500" />
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Muatan Partikel 2 (q₂)</label>
                <span className="text-sm font-mono font-bold text-blue-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{q2 > 0 ? `+${q2}` : q2}</span>
              </div>
              <input type="range" min="-3" max="3" step="1" value={q2} onChange={e => setQ2(parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
          </div>
          
          <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-2xl border border-violet-100 dark:border-violet-800/30 text-center">
             <p className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider mb-2">Gaya Relatif (F)</p>
             <div className="font-mono text-3xl font-black text-violet-700 dark:text-violet-300">
                {force.toFixed(2)}
             </div>
             <p className="text-[10px] text-violet-500/70 mt-2 font-mono">F ∝ (q1 × q2) / r²</p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-500" /> Hukum Coulomb
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Rumus Gaya Coulomb (F)</h4>
                <p className="mb-2">Gaya interaksi antara dua muatan listrik berbanding lurus dengan besar kedua muatan, dan berbanding terbalik dengan kuadrat jaraknya.</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-3 py-2 rounded-lg inline-block border border-gray-200 dark:border-gray-700 text-violet-600 font-bold text-lg">
                  F = k · (q₁ · q₂) / r²
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800/30">
                  <h4 className="font-bold text-rose-800 dark:text-rose-400 mb-1">Tolak Menolak</h4>
                  <p className="text-xs">Terjadi jika kedua muatan <strong>Sejenis</strong> (+ dan +) atau (- dan -).</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Tarik Menarik</h4>
                  <p className="text-xs">Terjadi jika kedua muatan <strong>Berbeda Jenis</strong> (+ dan -).</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-violet-200 dark:shadow-none"
              >
                Paham!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
