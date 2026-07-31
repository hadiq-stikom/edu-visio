'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Zap } from 'lucide-react';

export default function EMEnergyRadiationModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [sliderVal, setSliderVal] = useState(30); // 0 to 100
  
  // Constants
  const h = 6.626e-34; // Planck's constant J.s
  const eV_J = 1.6e-19; // 1 eV in Joules
  
  // Calculations
  // log(f) goes from 10 to 22 (1e10 Hz to 1e22 Hz)
  const logF = 10 + (sliderVal / 100) * 12;
  const frequency = Math.pow(10, logF);
  const energyJ = h * frequency;
  const energyEV = energyJ / eV_J;
  
  const isIonizing = energyEV >= 12.4; // Rough threshold for ionizing radiation (UV and above)

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetEv, setTargetEv] = useState(100);

  const generateNewTarget = () => {
    // Generate targets like 1, 10, 100, 1000, 10000 eV
    const targets = [1, 5, 20, 100, 500, 1000, 50000, 1000000];
    const filtered = targets.filter(t => Math.abs(t - targetEv) > 1);
    const next = filtered[Math.floor(Math.random() * filtered.length)];
    setTargetEv(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    
    // Check if current energy is close to target (within a log margin)
    // E.g. log10(energyEV) roughly equals log10(targetEv)
    const logE = Math.log10(energyEV);
    const logT = Math.log10(targetEv);
    
    if (Math.abs(logE - logT) < 0.1) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [energyEV, targetEv, showSuccess]);

  // Formatter for scientific notation
  const formatSci = (num: number) => {
    if (num === 0) return '0';
    if (num >= 0.01 && num <= 1000) return num.toFixed(2);
    const exponent = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exponent);
    return (
      <span>
        {mantissa.toFixed(2)} &times; 10<sup>{exponent}</sup>
      </span>
    );
  };

  // Animation for Photon and Atom
  const atomRef = useRef<SVGGElement>(null);
  const electronRef = useRef<SVGCircleElement>(null);
  const photonRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();
    let hitTime = 0;
    let isHit = false;

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      
      // Photon travels from left (x=50) to right (x=250 where atom is)
      // Cycle every 2 seconds
      const cycleTime = time % 2;
      const photonX = 50 + cycleTime * 250;
      
      if (photonRef.current) {
        // If it passes 250, hide it briefly
        if (photonX > 250) {
          photonRef.current.style.opacity = '0';
          if (!isHit) {
            isHit = true;
            hitTime = time;
          }
        } else {
          photonRef.current.style.opacity = '1';
          photonRef.current.setAttribute('transform', `translate(${photonX}, 100)`);
          isHit = false;
        }
      }
      
      if (atomRef.current && electronRef.current) {
        if (isHit && (time - hitTime) < 1) {
          // Atom was just hit
          if (isIonizing) {
            // Ionizing: electron flies away to the top right
            const progress = time - hitTime;
            const ex = 270 + progress * 200;
            const ey = 80 - progress * 150;
            electronRef.current.setAttribute('cx', ex.toString());
            electronRef.current.setAttribute('cy', ey.toString());
            electronRef.current.style.opacity = (1 - progress).toString();
            
            // Atom doesn't jiggle much
            atomRef.current.setAttribute('transform', `translate(250, 100)`);
          } else {
            // Non-ionizing: electron stays, atom jiggles
            const jiggle = Math.sin((time - hitTime) * 30) * 5 * Math.max(0, 1 - (time - hitTime));
            atomRef.current.setAttribute('transform', `translate(${250 + jiggle}, 100)`);
            
            // Reset electron
            electronRef.current.setAttribute('cx', '270');
            electronRef.current.setAttribute('cy', '80');
            electronRef.current.style.opacity = '1';
          }
        } else {
          // Normal state
          atomRef.current.setAttribute('transform', `translate(250, 100)`);
          electronRef.current.setAttribute('cx', '270');
          electronRef.current.setAttribute('cy', '80');
          electronRef.current.style.opacity = '1';
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isIonizing]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="h-3.5 w-3.5" /> Bab 5: Gelombang Elektromagnetik (Sub 2)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Energi GEM &amp; Bahaya Radiasi</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Gelombang Elektromagnetik membawa energi dalam bentuk paket-paket diskrit yang disebut Foton. Semakin tinggi frekuensinya, semakin besar energi fotonnya, yang dapat menyebabkan efek ionisasi pada atom (berbahaya bagi sel hidup).
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Energi Foton Sinar Biru</p>
                  <p className="mb-2">Sinar biru memiliki frekuensi sekitar 6.6 &times; 10&sup1;&sup4; Hz. Berapakah energi fotonnya dalam elektron-volt (eV) jika h = 6.6 &times; 10&supmin;&sup3;&sup4; J.s dan 1 eV = 1.6 &times; 10&supmin;&sup1;&sup9; J?</p>
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p>1. Hitung energi dalam Joule: E = h &times; f<br/>
                  E = (6.6 &times; 10&supmin;&sup3;&sup4;) &times; (6.6 &times; 10&sup1;&sup4;) &asymp; 4.35 &times; 10&supmin;&sup1;&sup9; J<br/>
                  2. Konversi ke eV: (4.35 &times; 10&supmin;&sup1;&sup9;) / (1.6 &times; 10&supmin;&sup1;&sup9;) &asymp; <strong>2.7 eV</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-1 shadow-lg shadow-indigo-500/20 text-white shrink-0">
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
                Sesuaikan frekuensi hingga foton memiliki energi sekitar <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{formatSci(targetEv)} eV</strong>!
              </p>
              
              <div className="mt-4 p-3 bg-black/20 rounded-xl">
                <div className="text-xs text-indigo-200 mb-1">Energi Saat Ini:</div>
                <div className={`font-mono text-xl font-bold flex items-center gap-2 ${Math.abs(Math.log10(energyEV) - Math.log10(targetEv)) < 0.1 ? 'text-green-300' : 'text-white'}`}>
                  {formatSci(energyEV)} eV
                  {Math.abs(Math.log10(energyEV) - Math.log10(targetEv)) < 0.1 && (
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full animate-pulse">
                      Tepat!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-indigo-500" />
              Simulasi Tumbukan Foton pada Atom
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex items-center justify-center">
              <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
                {/* Background grid */}
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* The Atom */}
                <g ref={atomRef} transform="translate(250, 100)">
                  {/* Electron Orbit */}
                  <circle cx="0" cy="0" r="30" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="0" cy="0" r="45" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Nucleus */}
                  <circle cx="0" cy="0" r="12" fill="#ef4444" />
                  <circle cx="-3" cy="-3" r="4" fill="#f87171" opacity="0.6" />
                  
                  {/* Stable Inner Electrons */}
                  <circle cx="-25" cy="-16" r="4" fill="#3b82f6" />
                  <circle cx="16" cy="25" r="4" fill="#3b82f6" />
                  <circle cx="-45" cy="0" r="4" fill="#3b82f6" />
                </g>
                
                {/* Outer Electron (the one that might get ionized) */}
                <circle ref={electronRef} cx="270" cy="80" r="4" fill="#3b82f6" />
                <text ref={(el) => { if(el && isIonizing) { el.style.opacity='1'; el.setAttribute('x', (parseFloat(electronRef.current?.getAttribute('cx') || '270') + 10).toString()); el.setAttribute('y', (parseFloat(electronRef.current?.getAttribute('cy') || '80')).toString()); } else if (el) el.style.opacity='0'; }} fontSize="12" fill="#60a5fa" fontWeight="bold">e- terlepas!</text>

                {/* The Photon */}
                <g ref={photonRef} transform="translate(50, 100)">
                  {/* A wiggly line for photon */}
                  <path d="M -20 0 Q -15 -10, -10 0 T 0 0 T 10 0 T 20 0" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  <circle cx="20" cy="0" r="2" fill="#fbbf24" />
                  <text x="-25" y="-15" fill="#fcd34d" fontSize="12" fontWeight="bold">Foton (&gamma;)</text>
                </g>
              </svg>
              
              <div className="absolute bottom-4 inset-x-0 flex justify-center">
                <div className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md border ${isIonizing ? 'bg-red-500/20 text-red-300 border-red-500/50' : 'bg-green-500/20 text-green-300 border-green-500/50'}`}>
                  Status Radiasi: {isIonizing ? 'MENGIONISASI (Berbahaya)' : 'TIDAK MENGIONISASI (Aman)'}
                </div>
              </div>

              {/* Success Overlay directly in the chart container */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-indigo-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Energi Tepat!</h4>
                    <p className="text-indigo-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-indigo-500" />
              Kontrol Spektrum
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Frekuensi (f)
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                <div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Frekuensi Fototon</div>
                  <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {formatSci(frequency)} Hz
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Energi (Joule)</div>
                  <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {formatSci(energyJ)} J
                  </div>
                </div>

                <div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1">Energi (Elektron-Volt)</div>
                  <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {formatSci(energyEV)} eV
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Batas energi ionisasi biasanya berada di sekitar <strong>10 eV hingga 12.4 eV</strong> (Spektrum Ultraviolet ke atas). 
                Radiasi di atas batas ini (seperti Sinar-X &amp; Gamma) mampu merusak ikatan DNA pada sel makhluk hidup!
              </p>
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
                Teori Foton &amp; Bahaya Radiasi
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hipotesis Kuantum Planck</h4>
                <p className="mb-3">
                  Cahaya dan Gelombang Elektromagnetik memancarkan energi secara diskrit dalam bentuk paket-paket energi yang disebut <strong>Foton</strong>. 
                  Besar energi setiap foton sebanding dengan frekuensinya.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-lg font-bold">
                  E = h &middot; f
                </div>
                <p className="text-sm">
                  Di mana <strong>h</strong> adalah Konstanta Planck (6.626 &times; 10<sup>-34</sup> J&middot;s) dan <strong>f</strong> adalah frekuensi (Hz).
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Satuan Elektron-Volt (eV)</h4>
                <p className="mb-3">
                  Karena energi pada skala atomik sangat kecil jika diukur menggunakan Joule, fisikawan menggunakan satuan <strong>Elektron-Volt (eV)</strong>.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl font-mono text-center mb-3 text-sm">
                  1 eV = 1.6 &times; 10<sup>-19</sup> Joule
                </div>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Radiasi Pengion vs Non-Pengion</h4>
                <p className="mb-3">
                  Berdasarkan kemampuannya mengionisasi atom (melepas elektron), GEM dibagi dua:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>Non-Pengion (Aman):</strong> Energi rendah (&lt; 10 eV). Contoh: Gel. Radio, Mikro, Inframerah, Cahaya Tampak. Efek utamanya hanya pemanasan (atom bergetar).
                  </li>
                  <li>
                    <strong>Pengion (Berbahaya):</strong> Energi tinggi (&gt; 12.4 eV). Contoh: Ultraviolet B/C, Sinar-X, Sinar Gamma. Mampu melepaskan elektron dari orbitnya (ionisasi) yang bisa merusak sel dan ikatan DNA, memicu mutasi atau kanker.
                  </li>
                </ul>
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
