'use client';

import React, { useState, useEffect } from 'react';
import { Magnet, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

export default function ElectricFieldModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [q, setQ] = useState(2); // Source charge -5 to 5
  const [r, setR] = useState(2); // distance 1 to 5
  
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Target Electric Field (E = Q / r^2)
  const [targetE, setTargetE] = useState(0.5); 
  const [targetDesc, setTargetDesc] = useState("Medan Listrik 0.5 Satuan (Menjauhi)");
  
  // Calculate relative electric field (E = q / r^2)
  // Positive means pointing away (q > 0), negative means pointing towards (q < 0)
  const field = q / (r * r);
  const isAway = q > 0;
  const isTowards = q < 0;
  
  const generateNewTarget = () => {
    const targets = [
      { e: 0.5, desc: "0.5 Satuan (Menjauhi Muatan)" },
      { e: -0.5, desc: "0.5 Satuan (Menuju Muatan)" },
      { e: 1.25, desc: "1.25 Satuan (Menjauhi Muatan)" },
      { e: -0.2, desc: "0.2 Satuan (Menuju Muatan)" },
    ];
    const available = targets.filter(t => t.e !== targetE);
    const next = available[Math.floor(Math.random() * available.length)];
    setTargetE(next.e);
    setTargetDesc(next.desc);
  };
  
  useEffect(() => {
    if (showSuccess) return;
    
    // Check if current field matches target
    if (Math.abs(field - targetE) < 0.01) {
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
        setQ(1);
        setR(2);
      }, 4000);
    }
  }, [field, targetE, showSuccess]);

  // Visual calculations for SVG
  const width = 600;
  const cx = width / 2;
  const pixelsPerUnit = 40;
  
  // Source charge is on the left
  const qx = cx - (r * pixelsPerUnit) / 2;
  // Test point is on the right
  const px = cx + (r * pixelsPerUnit) / 2;
  
  // Vector length at point P
  const fieldVectorLength = Math.min(Math.abs(field) * 80, 150); // limit visual length

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 1: Listrik Statis
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Kuat Medan Listrik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Amati sebuah Titik Uji (P) yang berada di sekitar Muatan Sumber (Q). Medan listrik (E) adalah gaya yang akan dirasakan oleh partikel uji di titik tersebut!
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Arah Medan Listrik</p>
                  <p className="mb-2">Jika Anda memiliki muatan sumber negatif (-), ke mana arah panah medan listrik pada titik di sekitarnya?</p>
                  <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Penyelesaian:</p>
                  <p>Titik uji selalu diasumsikan bermuatan positif (+). Oleh karena itu, jika sumbernya negatif (-), titik uji akan tertarik. Artinya, garis medan listrik selalu <strong>menuju</strong> ke arah muatan negatif!</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-blue-500 mb-2" />
          <span className="text-xs text-blue-700 dark:text-blue-400 font-bold uppercase text-center mb-1">Target Kuat Medan</span>
          <span className="text-sm font-black text-blue-600 dark:text-blue-500 text-center leading-tight">{targetDesc}</span>
          <span className="text-xs text-blue-500/70 mt-2 font-mono">Skor: {score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900 rounded-3xl border-4 border-slate-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Medan Tepat!</h3>
                <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">Medan E = {Math.abs(field)} Satuan</p>
                  <p className="text-sm leading-relaxed">
                    Tepat! Dengan Muatan Sumber Q = {q} pada jarak r = {r}, arah medan listrik <strong>{isAway ? 'Menjauhi' : 'Menuju'}</strong> Muatan Sumber.
                  </p>
                </div>
              </div>
            )}

            <div className="z-10 w-full relative h-48 flex items-center justify-center">
               <svg width={width} height="200" className="overflow-visible">
                 
                 {/* Field lines radiating from Q (visual flair) */}
                 {q !== 0 && Array.from({length: 8}).map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180;
                    const len = Math.abs(q) * 15;
                    const ex1 = qx + Math.cos(angle) * 30;
                    const ey1 = 100 + Math.sin(angle) * 30;
                    const ex2 = qx + Math.cos(angle) * (30 + len);
                    const ey2 = 100 + Math.sin(angle) * (30 + len);
                    
                    // Arrow heads for field lines
                    const arrowLen = 5;
                    const p1x = isAway ? ex2 - arrowLen * Math.cos(angle - Math.PI/6) : ex1 + arrowLen * Math.cos(angle - Math.PI/6);
                    const p1y = isAway ? ey2 - arrowLen * Math.sin(angle - Math.PI/6) : ey1 + arrowLen * Math.sin(angle - Math.PI/6);
                    const p2x = isAway ? ex2 - arrowLen * Math.cos(angle + Math.PI/6) : ex1 + arrowLen * Math.cos(angle + Math.PI/6);
                    const p2y = isAway ? ey2 - arrowLen * Math.sin(angle + Math.PI/6) : ey1 + arrowLen * Math.sin(angle + Math.PI/6);

                    return (
                      <g key={i} opacity="0.3">
                        <line x1={ex1} y1={ey1} x2={ex2} y2={ey2} stroke="#60a5fa" strokeWidth="2" strokeDasharray="4,2" />
                        {isAway ? (
                          <polygon points={`${ex2},${ey2} ${p1x},${p1y} ${p2x},${p2y}`} fill="#60a5fa" />
                        ) : (
                          <polygon points={`${ex1},${ey1} ${p1x},${p1y} ${p2x},${p2y}`} fill="#60a5fa" />
                        )}
                      </g>
                    );
                 })}

                 {/* Distance indicator */}
                 <line x1={qx} y1="160" x2={px} y2="160" stroke="#9ca3af" strokeWidth="2" strokeDasharray="5,5" />
                 <text x={cx} y="180" fill="#9ca3af" fontSize="14" textAnchor="middle" fontWeight="bold">r = {r} satuan</text>
                 <line x1={qx} y1="155" x2={qx} y2="165" stroke="#9ca3af" strokeWidth="2" />
                 <line x1={px} y1="155" x2={px} y2="165" stroke="#9ca3af" strokeWidth="2" />

                 {/* Electric Field Vector at Point P */}
                 {field !== 0 && (
                   <g transform={`translate(${px}, 100)`}>
                     <line 
                       x1={0} y1={0} 
                       x2={isAway ? fieldVectorLength : -fieldVectorLength} y2={0} 
                       stroke="#fbbf24" strokeWidth="4" 
                     />
                     <polygon 
                       points={isAway ? `${fieldVectorLength},0 ${fieldVectorLength-10},-5 ${fieldVectorLength-10},5` : `${-fieldVectorLength},0 ${-fieldVectorLength+10},-5 ${-fieldVectorLength+10},5`} 
                       fill="#fbbf24" 
                     />
                     <text x={isAway ? fieldVectorLength/2 : -fieldVectorLength/2} y="-15" fill="#fbbf24" fontSize="14" textAnchor="middle" fontWeight="bold">E</text>
                   </g>
                 )}

                 {/* Source Particle (Q) */}
                 <circle cx={qx} cy="100" r={Math.max(25, 15 + Math.abs(q)*5)} fill={q > 0 ? '#ef4444' : q < 0 ? '#3b82f6' : '#9ca3af'} stroke="#ffffff" strokeWidth="3" className="transition-all duration-300" />
                 <text x={qx} y="105" fill="#fff" fontSize="16" textAnchor="middle" fontWeight="bold">
                   {q > 0 ? `+${q}` : q < 0 ? q : '0'}
                 </text>

                 {/* Test Point (P) */}
                 <circle cx={px} cy="100" r="6" fill="#fbbf24" />
                 <text x={px} y="125" fill="#fbbf24" fontSize="14" textAnchor="middle" fontWeight="bold">Titik Uji P</text>
               </svg>
            </div>
            
            <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700">
               <span className="text-xs text-slate-400 font-bold uppercase">Arah Vektor E</span>
               <div className={`font-black ${isAway ? 'text-rose-400' : field === 0 ? 'text-slate-400' : 'text-blue-400'}`}>
                 {isAway ? 'Menjauhi Muatan Sumber' : field === 0 ? 'Nol (Tidak Ada)' : 'Menuju Muatan Sumber'}
               </div>
            </div>
            
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Real-Time:</strong> 
              {q === 0 ? (
                <span> Sumber tidak memiliki muatan (netral), sehingga titik P tidak merasakan medan listrik sama sekali.</span>
              ) : (
                <span> 
                  Karena Muatan Sumber (Q) bersifat <strong>{q > 0 ? 'Positif' : 'Negatif'}</strong>, panah medan listrik (E) di titik P <strong>{q > 0 ? 'mendorong menjauh' : 'menarik ke arah dalam'}</strong>. Seperti Hukum Coulomb, jika Anda mengubah r, panjang panah kuning E akan berubah drastis!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <MoveHorizontal className="h-4 w-4 text-blue-500" />
             <h3 className="font-bold text-slate-900 dark:text-white">Panel Kendali</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Jarak Titik Uji (r)</label>
                <span className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400">{r}</span>
              </div>
              <input type="range" min="1" max="5" step="1" value={r} onChange={e => setR(parseInt(e.target.value))} className="w-full accent-slate-500" />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-amber-800 dark:text-amber-300">Muatan Sumber (Q)</label>
                <span className="text-sm font-mono font-bold text-amber-600 bg-white dark:bg-slate-900 px-2 py-0.5 rounded shadow-sm">{q > 0 ? `+${q}` : q}</span>
              </div>
              <input type="range" min="-5" max="5" step="1" value={q} onChange={e => setQ(parseInt(e.target.value))} className="w-full accent-amber-500" />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-center">
             <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Kuat Medan Listrik (E)</p>
             <div className="font-mono text-3xl font-black text-blue-700 dark:text-blue-300">
                {Math.abs(field).toFixed(2)}
             </div>
             <p className="text-[10px] text-blue-500/70 mt-2 font-mono">E ∝ Q / r²</p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" /> Medan Listrik (E)
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Rumus Kuat Medan Listrik</h4>
                <p className="mb-2">Medan listrik adalah daerah di sekitar partikel bermuatan listrik yang masih dipengaruhi gaya listrik. Besarnya dirumuskan sebagai:</p>
                <p className="font-mono bg-white dark:bg-slate-900 px-3 py-2 rounded-lg inline-block border border-slate-200 dark:border-slate-700 text-blue-600 font-bold text-lg">
                  E = k · Q / r²
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800/30">
                  <h4 className="font-bold text-rose-800 dark:text-rose-400 mb-1">Menjauhi (+)</h4>
                  <p className="text-xs">Garis gaya medan listrik selalu memancar keluar dari muatan positif.</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                  <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Menuju (-)</h4>
                  <p className="text-xs">Garis gaya medan listrik selalu ditarik masuk menuju muatan negatif.</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 dark:shadow-none"
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
