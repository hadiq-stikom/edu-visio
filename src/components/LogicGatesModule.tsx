'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, ToggleLeft, ToggleRight, CircuitBoard } from 'lucide-react';

export default function LogicGatesModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States for inputs A, B, C
  const [valA, setValA] = useState(0);
  const [valB, setValB] = useState(0);
  const [valC, setValC] = useState(1); // Start with C=1 so initial state is off (if A=0, B=0)
  
  // Logic Calculations
  const valX = (valA === 1 && valB === 1) ? 1 : 0; // A AND B
  const valY = valC === 1 ? 0 : 1;                 // NOT C
  const valZ = (valX === 1 || valY === 1) ? 1 : 0; // X OR Y
  
  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Turn the light on!
    if (valZ === 1) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [valZ, showSuccess, hasWon]);

  // SVG paths for standard logic gates
  const AND_GATE = "M 0 0 L 20 0 Q 40 0 40 20 Q 40 40 20 40 L 0 40 Z";
  const OR_GATE = "M 0 0 Q 15 20 0 40 L 15 40 Q 45 20 15 0 Z";
  const NOT_GATE = "M 0 5 L 30 20 L 0 35 Z";
  
  const getWireColor = (val: number) => val === 1 ? "#22c55e" : "#475569";
  const getWireGlow = (val: number) => val === 1 ? "drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]" : "";

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <CircuitBoard className="h-3.5 w-3.5" /> Bab 6: Sistem Elektronika (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Gerbang Logika</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Gerbang Logika adalah blok bangunan dasar dari semua perangkat digital modern seperti komputer dan ponsel cerdas. Gerbang ini mengolah sinyal biner (0 dan 1) berdasarkan aturan Aljabar Boolean.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-sm font-semibold rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Mengevaluasi Output Gerbang AND</p>
                  <p className="mb-2">Jika input A = 1 dan B = 0, berapakah output dari gerbang AND?</p>
                  <p className="font-semibold text-teal-700 dark:text-teal-400 mb-1">Penyelesaian:</p>
                  <p>Gerbang AND membutuhkan semua inputnya bernilai 1 agar outputnya juga bernilai 1. Karena salah satu input (B) bernilai 0, maka output gerbang AND adalah <strong>0 (LOW)</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-1 shadow-lg shadow-teal-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-teal-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-teal-100 text-sm mb-4 leading-relaxed">
                Ubah sakelar input (A, B, C) sedemikian rupa sehingga <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">Lampu Menyala (1)</strong> di ujung rangkaian!
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
              <Activity className="h-5 w-5 text-teal-500" />
              Simulasi Rangkaian Logika
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-center p-4">
              
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Background Grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Input A Wire to AND */}
                <path d="M 50 40 L 150 40 L 150 50 L 180 50" fill="none" stroke={getWireColor(valA)} strokeWidth="4" className={getWireGlow(valA)} />
                <text x="30" y="45" fill="white" fontWeight="bold" fontSize="14">A</text>
                
                {/* Input B Wire to AND */}
                <path d="M 50 100 L 150 100 L 150 70 L 180 70" fill="none" stroke={getWireColor(valB)} strokeWidth="4" className={getWireGlow(valB)} />
                <text x="30" y="105" fill="white" fontWeight="bold" fontSize="14">B</text>
                
                {/* Input C Wire to NOT */}
                <path d="M 50 160 L 180 160" fill="none" stroke={getWireColor(valC)} strokeWidth="4" className={getWireGlow(valC)} />
                <text x="30" y="165" fill="white" fontWeight="bold" fontSize="14">C</text>

                {/* AND Gate (Top) */}
                <g transform="translate(180, 40)">
                  <path d={AND_GATE} fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="8" y="25" fill="white" fontSize="12" fontWeight="bold">AND</text>
                </g>

                {/* NOT Gate (Bottom) */}
                <g transform="translate(180, 140)">
                  <path d={NOT_GATE} fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="34" cy="20" r="4" fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="3" y="24" fill="white" fontSize="10" fontWeight="bold">NOT</text>
                </g>

                {/* Wire from AND to OR */}
                <path d="M 220 60 L 280 60 L 280 90 L 320 90" fill="none" stroke={getWireColor(valX)} strokeWidth="4" className={getWireGlow(valX)} />
                <text x="250" y="50" fill={getWireColor(valX)} fontWeight="bold" fontSize="12">X={valX}</text>

                {/* Wire from NOT to OR */}
                <path d="M 218 160 L 280 160 L 280 110 L 320 110" fill="none" stroke={getWireColor(valY)} strokeWidth="4" className={getWireGlow(valY)} />
                <text x="250" y="175" fill={getWireColor(valY)} fontWeight="bold" fontSize="12">Y={valY}</text>

                {/* OR Gate */}
                <g transform="translate(315, 80)">
                  <path d={OR_GATE} fill="#1e293b" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="12" y="25" fill="white" fontSize="12" fontWeight="bold">OR</text>
                </g>

                {/* Wire from OR to Output Bulb */}
                <path d="M 360 100 L 420 100" fill="none" stroke={getWireColor(valZ)} strokeWidth="4" className={getWireGlow(valZ)} />
                <text x="380" y="90" fill={getWireColor(valZ)} fontWeight="bold" fontSize="12">Z={valZ}</text>
                
                {/* Output Bulb */}
                <g transform="translate(435, 100)">
                  <circle cx="0" cy="0" r="15" fill={valZ === 1 ? "#fef08a" : "#334155"} stroke={valZ === 1 ? "#eab308" : "#475569"} strokeWidth="3" className={valZ === 1 ? "animate-pulse" : ""} />
                  {valZ === 1 && (
                    <g>
                      <line x1="0" y1="-20" x2="0" y2="-30" stroke="#fef08a" strokeWidth="2" />
                      <line x1="15" y1="-15" x2="22" y2="-22" stroke="#fef08a" strokeWidth="2" />
                      <line x1="-15" y1="-15" x2="-22" y2="-22" stroke="#fef08a" strokeWidth="2" />
                      <line x1="20" y1="0" x2="30" y2="0" stroke="#fef08a" strokeWidth="2" />
                      <line x1="-20" y1="0" x2="-30" y2="0" stroke="#fef08a" strokeWidth="2" />
                    </g>
                  )}
                </g>

              </svg>
              
              <div className="absolute top-4 left-4">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded text-xs font-mono text-gray-300">
                    <div className="w-3 h-3 rounded-full bg-slate-500"></div> LOW (0)
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded text-xs font-mono text-green-300">
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div> HIGH (1)
                  </div>
                </div>
              </div>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-teal-500 to-emerald-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-teal-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Rangkaian Hidup!</h4>
                    <p className="text-teal-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 flex justify-between items-center overflow-x-auto">
              <span className="font-mono font-bold whitespace-nowrap">Persamaan Boolean:</span>
              <span className="font-mono bg-white dark:bg-black px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-lg shadow-inner whitespace-nowrap ml-4">
                Z = (A &bull; B) + C&#39;
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-teal-500" />
              Sakelar Input
            </h3>
            
            <div className="space-y-4">
              {/* Toggle A */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="font-bold font-mono text-lg text-gray-700 dark:text-gray-300">Input A</div>
                <button 
                  onClick={() => setValA(valA === 0 ? 1 : 0)}
                  className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-colors ${valA === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                  {valA === 1 ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                  {valA}
                </button>
              </div>

              {/* Toggle B */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="font-bold font-mono text-lg text-gray-700 dark:text-gray-300">Input B</div>
                <button 
                  onClick={() => setValB(valB === 0 ? 1 : 0)}
                  className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-colors ${valB === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                  {valB === 1 ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                  {valB}
                </button>
              </div>

              {/* Toggle C */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="font-bold font-mono text-lg text-gray-700 dark:text-gray-300">Input C</div>
                <button 
                  onClick={() => setValC(valC === 0 ? 1 : 0)}
                  className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg transition-colors ${valC === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}
                >
                  {valC === 1 ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
                  {valC}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Rangkaian gerbang logika digunakan untuk membuat kalkulator, RAM komputer, dan prosesor! Jutaan gerbang logika berukuran mikro ditanam di dalam sebuah chip IC (Integrated Circuit).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-teal-50 dark:bg-teal-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-500" />
                Teori Gerbang Logika Dasar
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Sistem Biner</h4>
                <p className="mb-3">
                  Elektronika digital tidak memproses angka 1 sampai 10. Ia hanya memahami dua keadaan: 
                  <strong> 1 (Tegangan Tinggi/HIGH)</strong> dan <strong>0 (Tegangan Rendah/LOW)</strong>.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Gerbang AND (Konjungsi)</h4>
                <p className="mb-3">
                  Ibarat dua sakelar yang dipasang seri. Lampu hanya akan menyala JIKA <strong>KEDUA</strong> sakelar ditekan.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3">
                  <table className="mx-auto text-sm font-mono text-left">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="px-4 py-1">A</th><th className="px-4 py-1">B</th><th className="px-4 py-1 text-teal-600 dark:text-teal-400">A AND B</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-1">0</td><td className="px-4 py-1">0</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">0</td></tr>
                      <tr><td className="px-4 py-1">0</td><td className="px-4 py-1">1</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">0</td></tr>
                      <tr><td className="px-4 py-1">1</td><td className="px-4 py-1">0</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">0</td></tr>
                      <tr><td className="px-4 py-1">1</td><td className="px-4 py-1">1</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">1</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Gerbang OR (Disjungsi)</h4>
                <p className="mb-3">
                  Ibarat dua sakelar yang dipasang paralel. Lampu akan menyala JIKA <strong>SALAH SATU</strong> atau <strong>KEDUANYA</strong> ditekan.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3">
                  <table className="mx-auto text-sm font-mono text-left">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="px-4 py-1">A</th><th className="px-4 py-1">B</th><th className="px-4 py-1 text-teal-600 dark:text-teal-400">A OR B</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="px-4 py-1">0</td><td className="px-4 py-1">0</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">0</td></tr>
                      <tr><td className="px-4 py-1">0</td><td className="px-4 py-1">1</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">1</td></tr>
                      <tr><td className="px-4 py-1">1</td><td className="px-4 py-1">0</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">1</td></tr>
                      <tr><td className="px-4 py-1">1</td><td className="px-4 py-1">1</td><td className="px-4 py-1 font-bold text-teal-600 dark:text-teal-400">1</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Gerbang NOT (Inverter)</h4>
                <p className="mb-3">
                  Hanya memiliki satu input. Tugasnya membalik keadaan sinyal masukannya.
                  Jika input 1 (Nyala) maka output 0 (Mati), dan sebaliknya.
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
