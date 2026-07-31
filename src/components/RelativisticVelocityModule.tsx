'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Rocket } from 'lucide-react';

export default function RelativisticVelocityModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for velocities as fractions of c (0 to 1.0)
  const [v1, setV1] = useState(0.5); // Spaceship velocity relative to Earth
  const [v2, setV2] = useState(0.5); // Missile velocity relative to Spaceship
  
  // Calculations
  const galileanV = v1 + v2;
  const relativisticV = (v1 + v2) / (1 + (v1 * v2));

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Push both to 1.0, proving that total is exactly 1.0
    if (v1 === 1.0 && v2 === 1.0 && Math.abs(relativisticV - 1.0) < 0.01) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [v1, v2, relativisticV, showSuccess, hasWon]);

  // Animation Refs
  const shipRef = useRef<SVGGElement>(null);
  const missileRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsedMs = now - startTime;
      const elapsedSec = (elapsedMs % 4000) / 1000; // 4 second loop

      // Position based on velocity (just for visual representation)
      // Visual scale: 1.0c = 100px / sec
      const shipX = 50 + (v1 * 50 * elapsedSec);
      
      // Missile position relative to Earth is relativisticV
      const missileX = shipX + 20 + (v2 * 50 * elapsedSec);

      if (shipRef.current) {
        shipRef.current.setAttribute('transform', `translate(${shipX % 450}, 80)`);
      }
      if (missileRef.current) {
        missileRef.current.setAttribute('transform', `translate(${missileX % 500}, 80)`);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [v1, v2, relativisticV]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/50 dark:text-fuchsia-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Rocket className="h-3.5 w-3.5" /> Bab 7: Relativitas (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Penambahan Kecepatan Relativistik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Dalam Fisika Klasik (Galileo), kecepatan bertambah secara linier. Namun, saat mendekati kecepatan cahaya, rumus klasik akan menghasilkan kecepatan lebih besar dari cahaya (C), yang dilarang oleh alam semesta! Einstein mengoreksinya dengan rumus penambahan relativistik.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/30 dark:text-fuchsia-400 text-sm font-semibold rounded-lg hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Rudal Antariksa</p>
                  <p className="mb-2">Sebuah pesawat alien bergerak mendekati Bumi dengan kecepatan v&#8321; = 0.5c. Pesawat tersebut menembakkan rudal laser searah geraknya dengan kecepatan v&#8322; = 0.5c relatif terhadap pesawat. Berapakah kecepatan rudal tersebut menurut pengamat di Bumi?</p>
                  <p className="font-semibold text-fuchsia-700 dark:text-fuchsia-400 mb-1">Penyelesaian:</p>
                  <p>Secara klasik: v = 0.5c + 0.5c = 1.0c (SALAH, karena foton bermassa nol tidak bisa diperlakukan klasik)<br/>
                  Secara Relativistik: v = (v&#8321; + v&#8322;) / (1 + (v&#8321;&times;v&#8322;))<br/>
                  v = (0.5 + 0.5) / (1 + (0.5 &times; 0.5))<br/>
                  v = 1.0 / (1 + 0.25) = 1.0 / 1.25 = <strong>0.8c</strong>. (Ternyata rudal belum mencapai kecepatan cahaya dari kacamata Bumi!)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl p-1 shadow-lg shadow-fuchsia-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-fuchsia-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-fuchsia-100 text-sm mb-4 leading-relaxed">
                Buktekan bahwa alam semesta melarang kita melebihi kecepatan cahaya. Atur kedua kecepatan menjadi <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">1.0c</strong> (maksimal) dan lihat hasilnya!
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
              <Activity className="h-5 w-5 text-fuchsia-500" />
              Perbandingan Kecepatan (Menurut Pengamat di Bumi)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-center p-4">
              
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Background Grid */}
                <pattern id="grid7" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="1" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid7)" />

                {/* Observer on Earth */}
                <g transform="translate(30, 160)">
                  <circle cx="0" cy="0" r="10" fill="#1e40af" />
                  <path d="M -10 0 L -15 20 L 15 20 L 10 0 Z" fill="#1e3a8a" />
                  <circle cx="0" cy="-12" r="5" fill="#fbcfe8" />
                  <text x="0" y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">Bumi (Diam)</text>
                </g>

                {/* Spaceship */}
                <g ref={shipRef}>
                  <path d="M -20 -10 L 20 -10 L 30 0 L 20 10 L -20 10 Z" fill="#38bdf8" />
                  <rect x="-10" y="-5" width="20" height="10" fill="#1e293b" />
                  <text x="0" y="25" fill="#94a3b8" fontSize="10" textAnchor="middle">v&#8321;={v1.toFixed(2)}c</text>
                  {/* Fire */}
                  {v1 > 0 && <path d="M -20 0 L -35 -5 L -25 0 L -35 5 Z" fill="#f97316" className="animate-pulse" />}
                </g>

                {/* Missile */}
                <g ref={missileRef}>
                  <ellipse cx="0" cy="0" rx="8" ry="3" fill="#ef4444" />
                  <path d="M -8 0 L -12 -3 L -10 0 L -12 3 Z" fill="#fef08a" />
                  <text x="0" y="-10" fill="#94a3b8" fontSize="10" textAnchor="middle">v&#8322;={v2.toFixed(2)}c</text>
                </g>

              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-fuchsia-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Eksperimen Berhasil!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Bahkan jika cahaya (1.0c) ditembakkan dari pesawat berkecepatan cahaya (1.0c), total kecepatan dari Bumi <strong>tetap 1.0c</strong>. Inilah keajaiban alam semesta!</p>
                    <p className="text-fuchsia-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            {/* Velocity Chart */}
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Total Klasik (Galileo - Salah)</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400">{galileanV.toFixed(2)} c</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${galileanV > 1.0 ? 'bg-red-500' : 'bg-gray-500'}`} 
                    style={{ width: `${Math.min(100, (galileanV / 2) * 100)}%` }}
                  ></div>
                </div>
                {galileanV > 1.0 && <p className="text-xs text-red-500 mt-1 font-semibold">MELANGGAR BATAS KECEPATAN CAHAYA!</p>}
              </div>

              <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-xl p-4 border border-fuchsia-200 dark:border-fuchsia-900/50">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-300">Total Relativistik (Einstein - Benar)</span>
                  <span className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400 font-mono text-lg">{relativisticV.toFixed(3)} c</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-fuchsia-500 to-purple-600 h-4 rounded-full transition-all duration-300" 
                    style={{ width: `${(relativisticV) * 100}%` }}
                  ></div>
                </div>
                {relativisticV >= 0.999 && <p className="text-xs text-fuchsia-600 dark:text-fuchsia-400 mt-1 font-semibold flex items-center gap-1"><Lightbulb className="w-3 h-3"/> Maksimum Tercapai</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-fuchsia-500" />
              Pengaturan Variabel
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Kecepatan Pesawat (v&#8321;)</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                    {v1.toFixed(2)} c
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1.0" 
                  step="0.05"
                  value={v1} 
                  onChange={(e) => setV1(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Kecepatan Misil (v&#8322;)</span>
                  <span className="text-sm font-bold text-red-600 dark:text-red-400 font-mono bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded">
                    {v2.toFixed(2)} c
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1.0" 
                  step="0.05"
                  value={v2} 
                  onChange={(e) => setV2(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-red-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">*Diukur relatif terhadap pesawat</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Kecepatan Misil (Menurut Bumi)</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <span className="text-xs text-gray-500 mb-1">Rumus: (v&#8321; + v&#8322;) / (1 + v&#8321;&middot;v&#8322;)</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">v = </span>
                    <span className="text-2xl font-bold bg-white dark:bg-black px-4 py-1.5 rounded shadow-inner border border-slate-200 dark:border-slate-800 text-fuchsia-600 dark:text-fuchsia-400">
                      {relativisticV.toFixed(3)} c
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-fuchsia-50 dark:bg-fuchsia-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-fuchsia-500" />
                Penambahan Kecepatan Relativistik
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kegagalan Fisika Klasik</h4>
                <p className="mb-3">
                  Menurut transformasi Galileo (Fisika Klasik), jika Anda berada di kereta berkecepatan 10 m/s dan melempar bola ke depan berkecepatan 5 m/s, maka orang di peron akan melihat bola itu melesat 15 m/s (10 + 5 = 15).
                </p>
                <p className="mb-3 font-semibold text-red-500">
                  NAMUN: Jika Anda di roket berkecepatan 0.8c dan menembakkan laser cahaya berkecepatan 1.0c, apakah orang di Bumi melihat laser itu melesat 1.8c? TIDAK!
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Rumus Relativistik Einstein</h4>
                <p className="mb-3">
                  Einstein mengoreksi rumus penjumlahan kecepatan ini agar tidak pernah melanggar batas kecepatan tertinggi di alam semesta (kecepatan cahaya, c).
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg overflow-x-auto">
                  v = (v&#8321; + v&#8322;) / (1 + (v&#8321;&times;v&#8322;)/c&sup2;)
                </div>
                <p className="text-sm">
                  Jika v&#8321; dan v&#8322; ditulis dalam satuan 'c' (fraksi cahaya), maka rumusnya disederhanakan menjadi: <code>(v&#8321; + v&#8322;) / (1 + v&#8321;&middot;v&#8322;)</code>.
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
