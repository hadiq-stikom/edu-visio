'use client';

import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Trophy, Dices, Info, Star, BookOpen, X, Lightbulb } from 'lucide-react';

// Factorial helper
function fact(num: number): number {
  if (num <= 1) return 1;
  return num * fact(num - 1);
}

// Format numbers
function fmt(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

interface CaseStudy {
  question: string;
  type: 'P' | 'C';
  n: number;
  r: number;
}

const CASES: CaseStudy[] = [
  { question: "Berapa banyak password 3 digit berbeda yang bisa dibuat dari angka 1-5 tanpa pengulangan?", type: 'P', n: 5, r: 3 },
  { question: "Dari 8 anggota paskibra, akan dipilih 3 orang untuk mengibarkan bendera. Berapa banyak susunan yang mungkin terbentuk?", type: 'C', n: 8, r: 3 },
  { question: "Dalam perlombaan lari diikuti 6 peserta. Berapa banyak kemungkinan susunan juara 1, 2, dan 3?", type: 'P', n: 6, r: 3 },
  { question: "Sebuah restoran menawarkan 10 topping pizza. Pelanggan boleh memilih 4 topping. Ada berapa kombinasi topping?", type: 'C', n: 10, r: 4 },
  { question: "Dari 7 siswa, akan dibentuk tim cerdas cermat beranggotakan 4 orang. Berapa banyak cara pemilihan tim tersebut?", type: 'C', n: 7, r: 4 },
];

export default function CombinatoricsModule() {
  const [mode, setMode] = useState<'P' | 'C'>('P');
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const activeCase = CASES[currentCaseIndex];

  // Calculations
  const resultP = Math.round(fact(n) / fact(n - r));
  const resultC = Math.round(fact(n) / (fact(n - r) * fact(r)));
  const currentResult = mode === 'P' ? resultP : resultC;

  // Validation
  useEffect(() => {
    if (showSuccess) return;
    
    if (mode === activeCase.type && n === activeCase.n && r === activeCase.r) {
      setIsUnlocked(true);
      setShowSuccess(true);
      setScore(s => s + 100);
      
      setTimeout(() => {
        setIsUnlocked(false);
        setShowSuccess(false);
        setCurrentCaseIndex((prev) => (prev + 1) % CASES.length);
        // Reset inputs
        setMode('P');
        setN(3);
        setR(2);
      }, 4000); // Wait 4 seconds for reading reflection
    } else {
      setIsUnlocked(false);
    }
  }, [mode, n, r, activeCase, showSuccess]);

  // Generate visual balls
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500', 'bg-indigo-500', 'bg-lime-500'];
  
  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Dices className="h-3.5 w-3.5" /> Bab 3: Kombinatorik
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Brankas Kombinatorik</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Pecahkan masalah pencacahan di bawah ini. Tentukan apakah kasus tersebut menggunakan <strong>Permutasi</strong> (memperhatikan urutan) atau <strong>Kombinasi</strong> (tidak memperhatikan urutan), lalu tentukan nilai n dan r.
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
                📝 Contoh Perbandingan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/30">
                  <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">Kasus Permutasi (Urutan Penting!)</p>
                  <p className="mb-2"><em>"Memilih Ketua dan Wakil Ketua dari 5 kandidat."</em></p>
                  <p>Si A jadi Ketua beda maknanya dengan si A jadi Wakil. Karena jabatannya berbeda, urutan menjadi penting. <strong>Gunakan P.</strong></p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800/30">
                  <p className="font-bold text-purple-800 dark:text-purple-300 mb-1">Kasus Kombinasi (Urutan BEBAS!)</p>
                  <p className="mb-2"><em>"Memilih 2 orang perwakilan lomba dari 5 kandidat."</em></p>
                  <p>Si A dan B terpilih sama saja dengan si B dan A terpilih. Karena status mereka setara, urutan tidak penting. <strong>Gunakan C.</strong></p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Trophy className="h-8 w-8 text-amber-500 mb-2" />
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase">Skor Anda</span>
          <span className="text-3xl font-black text-amber-600 dark:text-amber-500">{score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Safe / Brankas Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-gray-900 rounded-3xl border-4 border-gray-700 shadow-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
            
            {/* Safe Background Detail */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                <Star className="h-20 w-20 text-yellow-300 fill-yellow-300 mb-3 animate-bounce" />
                <h3 className="text-4xl font-black text-white drop-shadow-md mb-2">Brankas Terbuka!</h3>
                <div className="bg-emerald-800/50 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                  <p className="font-bold text-lg mb-2">Jawaban Benar: {fmt(currentResult)} Cara</p>
                  <p className="text-sm leading-relaxed">
                    Tepat sekali! Kasus ini menggunakan <strong>{activeCase.type === 'P' ? 'Permutasi' : 'Kombinasi'}</strong> karena urutan <strong>{activeCase.type === 'P' ? 'diperhatikan' : 'TIDAK diperhatikan'}</strong>. Anda memilih r={activeCase.r} dari total n={activeCase.n}.
                  </p>
                </div>
                <p className="text-emerald-100 font-bold mt-4 text-xl">+100 Poin</p>
              </div>
            )}

            <div className="z-10 bg-gray-800 p-6 rounded-2xl border-2 border-gray-600 w-full max-w-lg mb-8 shadow-inner">
               <p className="text-emerald-400 font-mono text-lg font-bold text-center">"{activeCase.question}"</p>
            </div>

            <div className={`z-10 w-48 h-48 rounded-full border-8 flex items-center justify-center transition-all duration-700 ${isUnlocked ? 'border-emerald-500 bg-emerald-900/30' : 'border-gray-600 bg-gray-800'}`}>
               {isUnlocked ? (
                 <Unlock className="h-20 w-20 text-emerald-500 animate-pulse" />
               ) : (
                 <Lock className="h-20 w-20 text-gray-500" />
               )}
            </div>
            
            {/* Display balls (visualize n and r) */}
            <div className="z-10 mt-8 flex flex-col items-center">
               <div className="flex gap-2 flex-wrap justify-center mb-2">
                 <span className="text-xs font-bold text-gray-400 w-full text-center mb-1">Total Objek (n = {n})</span>
                 {Array.from({length: n}).map((_, i) => (
                   <div key={i} className={`w-6 h-6 rounded-full ${colors[i % colors.length]} shadow-md`}></div>
                 ))}
               </div>
               <div className="flex gap-2 flex-wrap justify-center mt-2">
                 <span className="text-xs font-bold text-gray-400 w-full text-center mb-1">Slot Dipilih (r = {r})</span>
                 {Array.from({length: r}).map((_, i) => (
                   <div key={i} className={`w-8 h-8 rounded-lg border-2 border-gray-600 border-dashed flex items-center justify-center`}>
                      <div className={`w-5 h-5 rounded-full ${colors[i % colors.length]} opacity-50`}></div>
                   </div>
                 ))}
               </div>
            </div>

          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <Info className="h-4 w-4 text-indigo-500" />
             <h3 className="font-bold text-gray-900 dark:text-white">Kode Brankas</h3>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            <button 
              onClick={() => setMode('P')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'P' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
            >
              Permutasi (P)
            </button>
            <button 
              onClick={() => setMode('C')}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${mode === 'C' ? 'bg-white dark:bg-gray-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
            >
              Kombinasi (C)
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Total Objek (n)</label>
                <span className="text-sm font-mono font-bold text-blue-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{n}</span>
              </div>
              <input 
                type="range" min="1" max="10" step="1" 
                value={n} 
                onChange={e => {
                  const val = parseInt(e.target.value);
                  setN(val);
                  if (r > val) setR(val); // r cannot be greater than n
                }} 
                className="w-full accent-blue-500" 
              />
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-purple-800 dark:text-purple-300">Objek Dipilih (r)</label>
                <span className="text-sm font-mono font-bold text-purple-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{r}</span>
              </div>
              <input 
                type="range" min="1" max={n} step="1" 
                value={r} 
                onChange={e => setR(parseInt(e.target.value))} 
                className="w-full accent-purple-500" 
              />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rumus Saat Ini</p>
            {mode === 'P' ? (
               <div className="font-mono text-xl text-gray-800 dark:text-gray-200">
                  <span className="text-blue-600 font-black">{n}</span>P<span className="text-purple-600 font-black">{r}</span> = <span className="font-black">{fmt(currentResult)}</span>
               </div>
            ) : (
               <div className="font-mono text-xl text-gray-800 dark:text-gray-200">
                  <span className="text-blue-600 font-black">{n}</span>C<span className="text-purple-600 font-black">{r}</span> = <span className="font-black">{fmt(currentResult)}</span>
               </div>
            )}
            <p className="text-[10px] text-gray-400 mt-2 font-mono">
              {mode === 'P' ? 'n! / (n-r)!' : 'n! / ((n-r)! * r!)'}
            </p>
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm mt-2">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              {mode === 'P' ? (
                <span><strong>Insight Permutasi:</strong> Karena susunan "AB" dianggap berbeda dengan "BA", maka jumlah kemungkinannya selalu lebih banyak dari Kombinasi.</span>
              ) : (
                <span><strong>Insight Kombinasi:</strong> Karena susunan "AB" dan "BA" dianggap sama saja (1 kelompok), maka kemungkinannya akan lebih sedikit karena ada pembagian dengan r!</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" /> Rumus Dasar Kombinatorik
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Faktorial (!)</h4>
                <p className="mb-2">Perkalian menurun dari bilangan itu sendiri hingga 1.</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-gray-200 dark:border-gray-700">n! = n × (n-1) × ... × 1</p>
                <p className="text-xs text-gray-500 mt-1">Contoh: 4! = 4 × 3 × 2 × 1 = 24</p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <h4 className="font-bold text-blue-800 dark:text-blue-400 mb-1">Permutasi (P)</h4>
                <p className="mb-2">Memilih r objek dari total n objek <strong>DENGAN</strong> memperhatikan urutan (jabatan/posisi berbeda).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-blue-200 dark:border-blue-700">nPr = n! / (n-r)!</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800/30">
                <h4 className="font-bold text-purple-800 dark:text-purple-400 mb-1">Kombinasi (C)</h4>
                <p className="mb-2">Memilih r objek dari total n objek <strong>TANPA</strong> memperhatikan urutan (kelompok/tim acak).</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-purple-200 dark:border-purple-700">nCr = n! / ((n-r)! × r!)</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-indigo-200 dark:shadow-none"
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
