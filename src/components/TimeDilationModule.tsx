'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Clock } from 'lucide-react';

export default function TimeDilationModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for velocity v as a fraction of c (0 to 0.99)
  const [vFraction, setVFraction] = useState(0);
  
  // Lorentz Factor Gamma calculation
  const gamma = 1 / Math.sqrt(1 - (vFraction * vFraction));

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Gamma is roughly 2.0 (which is v=0.866c)
    if (Math.abs(gamma - 2.0) < 0.05) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gamma, showSuccess, hasWon]);

  // Animation for the clocks
  const earthHandRef = useRef<SVGGElement>(null);
  const shipHandRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsedEarthMs = now - startTime;
      
      // Calculate elapsed time on spaceship (Time Dilation: Delta_t0 = Delta_t / Gamma)
      const elapsedShipMs = elapsedEarthMs / gamma;

      // Rotation angles (say, 360 degrees every 2 seconds for Earth clock)
      const earthAngle = (elapsedEarthMs / 2000) * 360;
      const shipAngle = (elapsedShipMs / 2000) * 360;

      if (earthHandRef.current) {
        earthHandRef.current.setAttribute('transform', `rotate(${earthAngle})`);
      }
      if (shipHandRef.current) {
        shipHandRef.current.setAttribute('transform', `rotate(${shipAngle})`);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [gamma]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Clock className="h-3.5 w-3.5" /> Bab 7: Relativitas (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Dilatasi Waktu (Time Dilation)</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Berdasarkan teori Relativitas Khusus Einstein, waktu tidaklah mutlak. Semakin cepat sebuah objek bergerak mendekati kecepatan cahaya, maka waktu bagi objek tersebut akan berjalan lebih lambat dibandingkan pengamat yang diam.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 text-sm font-semibold rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Perjalanan Astronaut</p>
                  <p className="mb-2">Seorang astronaut melaju di ruang angkasa dengan kecepatan v = 0.6c. Jika menurut jam di Bumi sudah berlalu 10 tahun, berapa lama waktu yang dicatat oleh astronaut di dalam pesawatnya?</p>
                  <p className="font-semibold text-rose-700 dark:text-rose-400 mb-1">Penyelesaian:</p>
                  <p>1. Hitung faktor Lorentz (&gamma;):<br/>
                  &gamma; = 1 / &radic;(1 - (0.6c/c)&sup2;) = 1 / &radic;(1 - 0.36) = 1 / &radic;0.64 = 1 / 0.8 = <strong>1.25</strong><br/>
                  2. Hitung waktu pesawat (&Delta;t&#8320;) berdasarkan waktu Bumi (&Delta;t):<br/>
                  &Delta;t = &gamma; &times; &Delta;t&#8320; &rarr; 10 = 1.25 &times; &Delta;t&#8320; &rarr; &Delta;t&#8320; = 10 / 1.25 = <strong>8 tahun</strong>. (Waktu melambat bagi astronaut!)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-1 shadow-lg shadow-rose-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-rose-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-rose-100 text-sm mb-4 leading-relaxed">
                Carilah kecepatan pesawat <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">v</strong> agar waktu berjalan <strong>setengah kali lipat lebih lambat</strong> dibanding Bumi (&gamma; &asymp; 2)!
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
              <Activity className="h-5 w-5 text-rose-500" />
              Perbandingan Jam (Pengamat Diam vs Pengamat Bergerak)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-center p-4">
              
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Background Stars */}
                <pattern id="stars" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#fff" opacity="0.3"/>
                  <circle cx="30" cy="40" r="1.5" fill="#fff" opacity="0.5"/>
                  <circle cx="45" cy="20" r="0.5" fill="#fff" opacity="0.2"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#stars)" />

                {/* Earth (Left) */}
                <g transform="translate(125, 100)">
                  <circle cx="0" cy="80" r="100" fill="#1e3a8a" />
                  <path d="M -50 20 Q 0 -20, 50 10 Q 80 50, 20 80 Q -30 60, -50 20 Z" fill="#166534" opacity="0.8" />
                  <text x="0" y="-70" fill="white" fontWeight="bold" fontSize="16" textAnchor="middle">Di Bumi (Diam)</text>
                  
                  {/* Earth Clock */}
                  <circle cx="0" cy="0" r="40" fill="#cbd5e1" stroke="#475569" strokeWidth="4" />
                  <circle cx="0" cy="0" r="3" fill="#1e293b" />
                  {/* Ticks */}
                  <line x1="0" y1="-35" x2="0" y2="-25" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="25" x2="0" y2="35" stroke="#1e293b" strokeWidth="2" />
                  <line x1="-35" y1="0" x2="-25" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="25" y1="0" x2="35" y2="0" stroke="#1e293b" strokeWidth="2" />
                  
                  {/* Animated Hand */}
                  <g ref={earthHandRef}>
                    <line x1="0" y1="0" x2="0" y2="-25" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </g>

                {/* Spaceship (Right) */}
                <g transform="translate(375, 100)">
                  {/* Spaceship Body */}
                  <path d="M -40 -15 L -60 -30 L -50 0 L -60 30 L -40 15 L 60 0 Z" fill="#64748b" />
                  <path d="M 10 -15 Q 40 -15, 50 0 Q 40 15, 10 15 Z" fill="#38bdf8" />
                  {/* Thrust Fire depending on velocity */}
                  {vFraction > 0 && (
                    <path d={`M -50 0 L -80 -10 L -60 0 L -80 10 Z`} fill="#f97316" className="animate-pulse" />
                  )}
                  {vFraction > 0.5 && (
                    <path d={`M -50 0 L -100 -5 L -70 0 L -100 5 Z`} fill="#fef08a" className="animate-pulse" style={{ animationDuration: '0.2s'}} />
                  )}
                  
                  <text x="0" y="-70" fill="white" fontWeight="bold" fontSize="16" textAnchor="middle">Di Pesawat (v = {vFraction.toFixed(3)}c)</text>
                  
                  {/* Ship Clock */}
                  <circle cx="0" cy="0" r="40" fill="#cbd5e1" stroke="#f43f5e" strokeWidth="4" />
                  <circle cx="0" cy="0" r="3" fill="#1e293b" />
                  {/* Ticks */}
                  <line x1="0" y1="-35" x2="0" y2="-25" stroke="#1e293b" strokeWidth="2" />
                  <line x1="0" y1="25" x2="0" y2="35" stroke="#1e293b" strokeWidth="2" />
                  <line x1="-35" y1="0" x2="-25" y2="0" stroke="#1e293b" strokeWidth="2" />
                  <line x1="25" y1="0" x2="35" y2="0" stroke="#1e293b" strokeWidth="2" />
                  
                  {/* Animated Hand */}
                  <g ref={shipHandRef}>
                    <line x1="0" y1="0" x2="0" y2="-25" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                  </g>
                </g>
              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-rose-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Tepat Sekali!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Pada kecepatan v &asymp; 0.866c, faktor &gamma; = 2.0. Waktu astronot berjalan dua kali lebih lambat!</p>
                    <p className="text-rose-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 text-center">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-bold mb-1">Waktu Bumi (&Delta;t)</div>
                <div className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-100">100% Kecepatan Normal</div>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-200 dark:border-rose-800 text-center">
                <div className="text-sm text-rose-600 dark:text-rose-400 font-bold mb-1">Waktu Pesawat (&Delta;t&#8320;)</div>
                <div className="text-2xl font-mono font-bold text-gray-800 dark:text-gray-100">{( (1/gamma)*100 ).toFixed(1)}% Kecepatan Normal</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-rose-500" />
              Kecepatan Pesawat (v)
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Fraksi Kecepatan Cahaya</span>
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded">
                    {vFraction.toFixed(3)} c
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="0.99" 
                  step="0.001"
                  value={vFraction} 
                  onChange={(e) => setVFraction(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-rose-600"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2">Kalkulasi Faktor Lorentz (&gamma;)</div>
                <div className="text-center font-mono py-2">
                  <span className="text-lg">&gamma; = </span>
                  <span className="text-xl font-bold bg-white dark:bg-black px-3 py-1 rounded shadow-inner border border-slate-200 dark:border-slate-800 text-rose-600 dark:text-rose-400">
                    {gamma.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Paradoks Kembar:</strong> Jika sepasang kembar dipisah, satu diam di bumi dan satu terbang mendekati kecepatan cahaya, maka saat kembali si penerbang akan terlihat <strong>jauh lebih muda</strong> dibandingkan kembarannya di Bumi!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-rose-50 dark:bg-rose-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" />
                Teori Dilatasi Waktu
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Postulat Einstein</h4>
                <p className="mb-3">
                  Teori Relativitas Khusus didasarkan pada dua postulat:
                </p>
                <ul className="list-decimal list-inside space-y-2 ml-2">
                  <li>Hukum-hukum fisika memiliki bentuk yang sama pada semua kerangka acuan inersia (yang bergerak dengan kecepatan konstan).</li>
                  <li><strong>Kecepatan cahaya di ruang hampa adalah konstan (c)</strong> untuk semua pengamat, terlepas dari pergerakan sumber cahaya maupun pengamatnya.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Dilatasi Waktu (Pemekaran Waktu)</h4>
                <p className="mb-3">
                  Akibat dari kecepatan cahaya yang konstan, waktu menjadi relatif. Jika Anda bergerak mendekati kecepatan cahaya, waktu akan berlalu lebih lambat bagi Anda (&Delta;t&#8320;) dibandingkan pengamat yang diam di Bumi (&Delta;t).
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  &Delta;t = &gamma; &times; &Delta;t&#8320;
                </div>
                <p className="text-sm">
                  Di mana <strong>&gamma; (Faktor Lorentz)</strong> dirumuskan sebagai: <code>1 / &radic;(1 - v&sup2;/c&sup2;)</code>
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Apakah Waktu Benar-Benar Berhenti?</h4>
                <p className="mb-3">
                  Secara matematis, jika kecepatan pesawat mencapai v = c, maka (1 - v&sup2;/c&sup2;) akan menjadi 0, sehingga nilai &gamma; menjadi <strong>Tak Terhingga (Infinite)</strong>. Pada kondisi tersebut, dilatasi waktu menjadi tak terbatas (waktu seakan membeku). Namun, tidak ada benda bermassa yang bisa mencapai kecepatan c.
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
