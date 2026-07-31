'use client';

import React, { useState } from 'react';
import { Target, BookOpen, X, Lightbulb, PlayCircle, RotateCcw } from 'lucide-react';

type Mode = 'basic' | 'compound';

export default function ProbabilityModule({ mode = 'basic' }: { mode?: Mode }) {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [red, setRed] = useState(3);
  const [blue, setBlue] = useState(2);
  const [green, setGreen] = useState(1);
  const [withReplacement, setWithReplacement] = useState(true);
  
  // Animation states
  const [drawn, setDrawn] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const total = red + blue + green;
  
  // Simulated drawing based on current probabilities
  const drawMarble = () => {
    if (total === 0) return;
    if (mode === 'basic' && drawn.length >= 1) return;
    if (mode === 'compound' && drawn.length >= 2) return;
    
    setIsDrawing(true);
    
    setTimeout(() => {
      const rand = Math.random() * total;
      let selected = '';
      if (rand < red) {
        selected = 'red';
        if (!withReplacement && mode === 'compound') setRed(r => r - 1);
      } else if (rand < red + blue) {
        selected = 'blue';
        if (!withReplacement && mode === 'compound') setBlue(b => b - 1);
      } else {
        selected = 'green';
        if (!withReplacement && mode === 'compound') setGreen(g => g - 1);
      }
      
      setDrawn(prev => [...prev, selected]);
      setIsDrawing(false);
    }, 800);
  };
  
  const resetDraw = () => {
    setDrawn([]);
    // Restore original counts if it was without replacement
    if (!withReplacement && mode === 'compound') {
      // In a real app we'd save the initial state before drawing, 
      // but for this simple sim we'll just add back what was drawn.
      drawn.forEach(color => {
        if (color === 'red') setRed(r => r + 1);
        if (color === 'blue') setBlue(b => b + 1);
        if (color === 'green') setGreen(g => g + 1);
      });
    }
  };

  const colors: Record<string, string> = {
    red: 'bg-red-500 shadow-red-500/50',
    blue: 'bg-blue-500 shadow-blue-500/50',
    green: 'bg-green-500 shadow-green-500/50'
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="h-3.5 w-3.5" /> Bab 3: Peluang
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'basic' ? 'Peluang Suatu Kejadian' : 'Peluang Kejadian Majemuk'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Bereksperimenlah dengan mengambil kelereng dari dalam toples. 
            {mode === 'compound' && ' Perhatikan bagaimana peluang berubah jika kelereng tidak dikembalikan!'}
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
                📝 Contoh Penerapan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                {mode === 'basic' ? (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal Dadu (Kejadian Tunggal):</p>
                    <p className="mb-3">Sebuah dadu bersisi 6 dilempar satu kali. Berapa peluang munculnya mata dadu genap?</p>
                    <p className="font-semibold text-rose-700 dark:text-rose-400 mb-1">Penyelesaian:</p>
                    <p>Ruang sampel (S) = {`{1, 2, 3, 4, 5, 6}`} ➔ n(S) = 6<br/>Kejadian genap (A) = {`{2, 4, 6}`} ➔ n(A) = 3<br/>Peluang P(A) = 3 / 6 = <strong>1/2</strong>.</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal Kartu (Kejadian Bersyarat):</p>
                    <p className="mb-3">Dari 1 set kartu bridge (52 kartu), diambil 2 kartu berurutan <strong>tanpa dikembalikan</strong>. Berapa peluang mendapat 2 kartu As?</p>
                    <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                    <p>P(As Pertama) = 4 / 52<br/>Karena tidak dikembalikan, sisa kartu 51 dan sisa As 3.<br/>P(As Kedua) = 3 / 51<br/>Total Peluang = (4/52) × (3/51) = <strong>1/221</strong>.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-rose-500 mb-2" />
          <span className="text-xs text-rose-700 dark:text-rose-400 font-bold uppercase text-center">Total<br/>Kelereng</span>
          <span className="text-4xl font-black text-rose-600 dark:text-rose-500">{total}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[400px] p-8 flex flex-col items-center justify-center relative">
            
            {/* The Jar */}
            <div className="w-64 h-64 border-4 border-t-0 border-blue-200/50 dark:border-blue-900/30 rounded-b-3xl relative overflow-hidden flex flex-wrap-reverse content-start justify-center p-4 gap-2 bg-gradient-to-b from-transparent to-blue-50/30 dark:to-blue-950/10">
              {Array.from({length: red}).map((_, i) => <div key={`r-${i}`} className="w-8 h-8 rounded-full bg-red-500 shadow-inner"></div>)}
              {Array.from({length: blue}).map((_, i) => <div key={`b-${i}`} className="w-8 h-8 rounded-full bg-blue-500 shadow-inner"></div>)}
              {Array.from({length: green}).map((_, i) => <div key={`g-${i}`} className="w-8 h-8 rounded-full bg-green-500 shadow-inner"></div>)}
            </div>
            
            <div className="h-4 w-64 border-x-4 border-blue-200/50 dark:border-blue-900/30"></div>
            
            {/* Drawn area */}
            <div className="mt-8 flex gap-4 h-16 items-center">
              <span className="font-bold text-gray-500 uppercase tracking-widest text-xs">Hasil:</span>
              {drawn.map((color, i) => (
                <div key={i} className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center animate-in zoom-in duration-300 ${colors[color]}`}>
                  <span className="text-white font-bold">{i+1}</span>
                </div>
              ))}
              {isDrawing && (
                <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-rose-500 animate-spin"></div>
              )}
            </div>

          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Visual:</strong> Peluang mendapat kelereng Merah saat ini adalah <strong>{red}/{total} ({(red/total * 100 || 0).toFixed(1)}%)</strong>. Jika kamu mengambil kelereng {withReplacement ? 'LALU MENGEMBALIKANNYA (Saling Bebas)' : 'TANPA DIKEMBALIKAN (Bersyarat)'}, {withReplacement ? 'peluang pengambilan berikutnya akan tetap sama persis' : 'peluang pengambilan berikutnya akan berubah karena total kelereng di toples berkurang'}.
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          
          <div className="flex gap-2">
            <button 
              onClick={drawMarble}
              disabled={isDrawing || total === 0 || (mode === 'basic' && drawn.length >= 1) || (mode === 'compound' && drawn.length >= 2)}
              className="flex-1 py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <PlayCircle className="h-5 w-5" /> Ambil!
            </button>
            <button 
              onClick={resetDraw}
              disabled={isDrawing || drawn.length === 0}
              className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-700 dark:text-gray-300 font-bold rounded-xl flex items-center justify-center transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
          
          {mode === 'compound' && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/50 flex justify-between items-center">
              <span className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Pengembalian</span>
              <button 
                onClick={() => { setWithReplacement(!withReplacement); resetDraw(); }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${withReplacement ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${withReplacement ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          )}
          
          <div className="space-y-6 flex-1">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-red-800 dark:text-red-300">Merah</label>
                <span className="text-sm font-mono font-bold text-red-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{red}</span>
              </div>
              <input type="range" min="0" max="10" step="1" value={red} onChange={e => {setRed(parseInt(e.target.value)); resetDraw();}} className="w-full accent-red-500" disabled={drawn.length > 0} />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Biru</label>
                <span className="text-sm font-mono font-bold text-blue-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{blue}</span>
              </div>
              <input type="range" min="0" max="10" step="1" value={blue} onChange={e => {setBlue(parseInt(e.target.value)); resetDraw();}} className="w-full accent-blue-500" disabled={drawn.length > 0} />
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-2xl border border-green-100 dark:border-green-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-green-800 dark:text-green-300">Hijau</label>
                <span className="text-sm font-mono font-bold text-green-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{green}</span>
              </div>
              <input type="range" min="0" max="10" step="1" value={green} onChange={e => {setGreen(parseInt(e.target.value)); resetDraw();}} className="w-full accent-green-500" disabled={drawn.length > 0} />
            </div>
          </div>
          
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rose-500" /> Rumus Dasar Peluang
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Peluang Suatu Kejadian</h4>
                <p className="mb-2">Adalah perbandingan antara jumlah kejadian yang diinginkan n(A) dengan total seluruh kemungkinan n(S).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-gray-200 dark:border-gray-700 text-rose-600 font-bold">P(A) = n(A) / n(S)</p>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                <h4 className="font-bold text-indigo-800 dark:text-indigo-400 mb-1">Kejadian Saling Bebas (Dengan Pengembalian)</h4>
                <p className="mb-2">Kejadian pertama <strong>tidak mempengaruhi</strong> kejadian kedua (penyebutnya tetap).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-indigo-200 dark:border-indigo-700 text-indigo-600 font-bold">P(A ∩ B) = P(A) × P(B)</p>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800/30">
                <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">Kejadian Bersyarat (Tanpa Pengembalian)</h4>
                <p className="mb-2">Kejadian pertama <strong>mempengaruhi</strong> kejadian kedua (penyebut berkurang 1).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-amber-200 dark:border-amber-700 text-amber-600 font-bold">P(A ∩ B) = P(A) × P(B|A)</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-rose-200 dark:shadow-none"
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
