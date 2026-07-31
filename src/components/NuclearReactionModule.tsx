'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Flame } from 'lucide-react';

export default function NuclearReactionModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for user's guess on Helium properties (from D-T fusion)
  // Equation: 2_1 H + 3_1 H -> A_Z He + 1_0 n
  // Target: A = 4, Z = 2
  const [guessA, setGuessA] = useState(1);
  const [guessZ, setGuessZ] = useState(1);
  
  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: A = 4, Z = 2
    if (guessA === 4 && guessZ === 2) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [guessA, guessZ, showSuccess, hasWon]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="h-3.5 w-3.5" /> Bab 9: Fisika Inti (Sub 3)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reaksi Inti (Fisi & Fusi)</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Reaksi inti melibatkan perubahan pada inti atom, yang bisa berupa pembelahan inti berat menjadi inti yang lebih ringan (Fisi) atau penggabungan inti-inti ringan menjadi inti yang lebih berat (Fusi). Keduanya melepaskan energi yang sangat masif!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus: Kesetaraan Reaksi Fisi</p>
                  <p className="mb-2 font-mono text-xs overflow-x-auto whitespace-nowrap pb-2"><sup>235</sup><sub>92</sub>U + <sup>1</sup><sub>0</sub>n &rarr; <sup>141</sup><sub>56</sub>Ba + <sup>A</sup><sub>Z</sub>Kr + 3 <sup>1</sup><sub>0</sub>n</p>
                  <p className="mb-2">Tentukan Nomor Massa (A) dan Nomor Atom (Z) dari Krypton (Kr)!</p>
                  <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Penyelesaian:</p>
                  <p>Hukum kekekalan nomor massa (atas):<br/>235 + 1 = 141 + A + 3(1)<br/>236 = 144 + A &rArr; <strong>A = 92</strong>.</p>
                  <p className="mt-2">Hukum kekekalan nomor atom (bawah):<br/>92 + 0 = 56 + Z + 3(0)<br/>92 = 56 + Z &rArr; <strong>Z = 36</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-orange-600 to-rose-600 rounded-2xl p-1 shadow-lg shadow-orange-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-orange-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-orange-100 text-sm mb-4 leading-relaxed">
                Ayo coba seimbangkan persamaan reaksi Fusi matahari di bawah ini! Atur <i>slider</i> untuk menemukan Nomor Massa (A) dan Nomor Atom (Z) unsur yang dihasilkan!
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
              <Activity className="h-5 w-5 text-orange-500" />
              Persamaan Reaksi Fusi (Deuterium + Tritium)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex items-center justify-center p-4">
              
              <div className="flex items-center justify-center gap-4 text-3xl font-mono text-white flex-wrap">
                {/* Deuterium */}
                <div className="flex items-center text-blue-400">
                  <div className="flex flex-col text-sm text-right mr-1 leading-tight">
                    <span>2</span>
                    <span>1</span>
                  </div>
                  <span>H</span>
                </div>
                
                <span className="text-gray-500">+</span>
                
                {/* Tritium */}
                <div className="flex items-center text-blue-400">
                  <div className="flex flex-col text-sm text-right mr-1 leading-tight">
                    <span>3</span>
                    <span>1</span>
                  </div>
                  <span>H</span>
                </div>
                
                <span className="text-orange-500 mx-2">&rarr;</span>
                
                {/* Unknown Element (Target) */}
                <div className="flex items-center text-rose-400 bg-rose-900/30 px-4 py-2 rounded-xl border border-rose-800 transition-colors">
                  <div className="flex flex-col text-sm text-right mr-1 leading-tight font-bold">
                    <span>{guessA}</span>
                    <span>{guessZ}</span>
                  </div>
                  <span>He</span>
                </div>
                
                <span className="text-gray-500">+</span>
                
                {/* Neutron */}
                <div className="flex items-center text-gray-300">
                  <div className="flex flex-col text-sm text-right mr-1 leading-tight">
                    <span>1</span>
                    <span>0</span>
                  </div>
                  <span>n</span>
                </div>
                
                <span className="text-gray-500">+</span>
                
                {/* Energy */}
                <div className="text-yellow-400 text-2xl font-bold animate-pulse flex items-center gap-1">
                  <Flame className="w-6 h-6" /> Energi
                </div>
              </div>

              {/* Success Overlay */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-orange-600 to-rose-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-orange-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Keren Banget! Tepat Sasaran!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Luar biasa! 2+3 = 4+1 (Massa) dan 1+1 = 2+0 (Atom). Reaksi Fusi menghasilkan inti Helium (Alfa) yang stabil dan energi raksasa!</p>
                    <p className="text-orange-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border ${2+3 === guessA+1 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'}`}>
                <div className="text-xs font-bold mb-1 text-slate-500">Cek Nomor Massa (A)</div>
                <div className="text-lg font-mono font-bold flex justify-between">
                  <span>2 + 3 = 5</span>
                  <span>{guessA} + 1 = {guessA + 1}</span>
                </div>
              </div>
              <div className={`p-4 rounded-xl border ${1+1 === guessZ+0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'}`}>
                <div className="text-xs font-bold mb-1 text-slate-500">Cek Nomor Atom (Z)</div>
                <div className="text-lg font-mono font-bold flex justify-between">
                  <span>1 + 1 = 2</span>
                  <span>{guessZ} + 0 = {guessZ + 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-orange-500" />
              Kendali Kesetaraan
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Nomor Massa (A)</span>
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded">
                    {guessA}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={guessA} 
                  onChange={(e) => setGuessA(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-rose-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Nomor Atom (Z)</span>
                  <span className="text-sm font-bold text-rose-600 dark:text-rose-400 font-mono bg-rose-50 dark:bg-rose-900/30 px-2 py-0.5 rounded">
                    {guessZ}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  step="1"
                  value={guessZ} 
                  onChange={(e) => setGuessZ(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-rose-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Hukum Kekekalan</div>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 list-disc pl-4">
                  <li>Jumlah nomor massa Kiri = Kanan</li>
                  <li>Jumlah nomor atom Kiri = Kanan</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Reaksi Fusi seperti ini persis yang terjadi di inti Matahari kita lho! Menggabungkan atom hidrogen menjadi helium melepaskan energi yang jauh lebih besar dan bersih daripada Reaksi Fisi (PLTN saat ini).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-orange-50 dark:bg-orange-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Reaksi Inti
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hukum Kekekalan Reaksi Inti</h4>
                <p className="mb-3">
                  Dalam setiap reaksi inti, berlaku dua hukum kekekalan utama (selain kekekalan energi):
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  <li><strong>Kekekalan Nomor Massa (A):</strong> Jumlah total angka di atas (massa) pada ruas kiri harus sama dengan ruas kanan.</li>
                  <li><strong>Kekekalan Nomor Atom (Z):</strong> Jumlah total angka di bawah (muatan/proton) pada ruas kiri harus sama dengan ruas kanan.</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Jenis Reaksi Inti</h4>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-3 border border-gray-200 dark:border-gray-700">
                  <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">1. Reaksi Fisi (Pembelahan)</h5>
                  <p className="text-sm">Reaksi di mana inti berat (misal Uranium-235) ditumbuk oleh neutron lambat, membelah menjadi dua inti sedang yang lebih stabil, memancarkan 2-3 neutron baru, dan melepaskan energi besar. Ini adalah prinsip kerja PLTN dan bom atom.</p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-1">2. Reaksi Fusi (Penggabungan)</h5>
                  <p className="text-sm">Reaksi di mana inti-inti ringan (seperti isotop Hidrogen: Deuterium dan Tritium) bergabung membentuk inti yang lebih berat (Helium) pada suhu dan tekanan sangat ekstrim. Ini adalah sumber energi Matahari dan bintang-bintang.</p>
                </div>
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
