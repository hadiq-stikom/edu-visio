'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Droplets, Target, ZapOff, Zap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Element = {
  id: string;
  symbol: string;
  name: string;
  ion: string;
  e0: number; // Volts
  color: string;
  solutionColor: string;
};

const ELEMENTS: Element[] = [
  { id: 'mg', symbol: 'Mg', name: 'Magnesium', ion: 'Mg²⁺', e0: -2.37, color: 'bg-slate-300', solutionColor: 'bg-transparent' },
  { id: 'zn', symbol: 'Zn', name: 'Seng', ion: 'Zn²⁺', e0: -0.76, color: 'bg-slate-400', solutionColor: 'bg-slate-100/30' },
  { id: 'fe', symbol: 'Fe', name: 'Besi', ion: 'Fe²⁺', e0: -0.44, color: 'bg-stone-500', solutionColor: 'bg-amber-500/20' },
  { id: 'cu', symbol: 'Cu', name: 'Tembaga', ion: 'Cu²⁺', e0: 0.34, color: 'bg-orange-600', solutionColor: 'bg-blue-500/40' },
  { id: 'ag', symbol: 'Ag', name: 'Perak', ion: 'Ag⁺', e0: 0.80, color: 'bg-gray-300', solutionColor: 'bg-slate-200/20' },
];

export default function StandardPotentialModule() {
  const { addScore } = useUser();
  const [metal, setMetal] = useState<Element>(ELEMENTS[1]); // Default Zn
  const [solution, setSolution] = useState<Element>(ELEMENTS[3]); // Default Cu2+
  
  const [status, setStatus] = useState<'idle' | 'testing' | 'spontaneous' | 'non-spontaneous'>('idle');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // E_cell = E_reduction (solution/ion) - E_oxidation (metal solid)
  // Because metal solid undergoes oxidation, its E_ox is -E0.
  // So E_cell = E0_solution - E0_metal
  const eCell = solution.e0 - metal.e0;
  const isSpontaneous = eCell > 0;
  const isSame = metal.id === solution.id;

  const handleTest = () => {
    setStatus('testing');
    setTimeout(() => {
      if (isSame) {
        setStatus('non-spontaneous');
      } else if (isSpontaneous) {
        setStatus('spontaneous');
      } else {
        setStatus('non-spontaneous');
      }
      
      const combId = `${metal.id}-${solution.id}`;
      setTested(prev => {
        const next = new Set(prev).add(combId);
        // Reward if they tried 4 different combinations
        if (next.size === 4 && !showSuccess) {
          setTimeout(() => {
            setShowSuccess(true);
            addScore(100);
          }, 1500);
        }
        return next;
      });
    }, 1000); // 1s dropping animation
  };

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Elektrokimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Kespontanan Reaksi (Deret Volta)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Celupkan berbagai logam murni ke dalam larutan ion logam lain. Amati apakah terjadi reaksi secara spontan berdasarkan nilai Potensial Reduksi Standar (E°).
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-sm font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <BookOpen className="h-4 w-4" /> Baca Teori Singkat
          </button>
          <button 
            onClick={() => setShowExamples(!showExamples)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {showExamples ? 'Sembunyikan Contoh Soal' : 'Tampilkan Contoh Soal'}
            {showExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Examples Section */}
      {showExamples && (
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 text-left">
            <BookOpen className="h-6 w-6 text-emerald-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apakah reaksi berikut dapat berlangsung secara spontan?<br/>
                Mg(s) + Zn²⁺(aq) → Mg²⁺(aq) + Zn(s)<br/>
                (E° Mg = -2.37 V, E° Zn = -0.76 V)
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mg mengalami oksidasi (menjadi Anoda), Zn²⁺ mengalami reduksi (menjadi Katoda).<br/>
                  E°sel = E°(Katoda) - E°(Anoda) = (-0.76) - (-2.37) = +1.61 V.<br/>
                  Karena E°sel positif (+), maka reaksi tersebut <strong>berlangsung spontan</strong>. Mg (yang berada lebih kiri di Deret Volta) mampu mendesak Zn²⁺ dari larutannya.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Sebuah cincin tembaga (Cu) tak sengaja jatuh ke dalam larutan Perak Nitrat (Ag⁺). Apa yang akan terjadi? (E° Cu = +0.34 V, E° Ag = +0.80 V)
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reaksinya: Cu(s) + 2Ag⁺(aq) → Cu²⁺(aq) + 2Ag(s).<br/>
                  E°sel = E°(Ag) - E°(Cu) = (+0.80) - (+0.34) = +0.46 V.<br/>
                  Karena positif, <strong>reaksi akan terjadi secara spontan</strong>. Cincin tembaga akan larut secara perlahan dan kristal perak akan mengendap menutupi cincin tersebut.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Settings Panel (Left) */}
        <div className="lg:col-span-1 space-y-4">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">1. Pilih Logam Padat (Kepingan)</h3>
            <select 
              value={metal.id}
              onChange={(e) => { setMetal(ELEMENTS.find(el => el.id === e.target.value)!); setStatus('idle'); }}
              disabled={status !== 'idle'}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium outline-none focus:border-emerald-500 disabled:opacity-50"
            >
              {ELEMENTS.map(el => <option key={el.id} value={el.id}>{el.name} ({el.symbol})</option>)}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">E° = {metal.e0 > 0 ? '+' : ''}{metal.e0.toFixed(2)} V</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">2. Pilih Larutan (Ion)</h3>
            <select 
              value={solution.id}
              onChange={(e) => { setSolution(ELEMENTS.find(el => el.id === e.target.value)!); setStatus('idle'); }}
              disabled={status !== 'idle'}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium outline-none focus:border-emerald-500 disabled:opacity-50"
            >
              {ELEMENTS.map(el => <option key={el.id} value={el.id}>Ion {el.name} ({el.ion})</option>)}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">E° = {solution.e0 > 0 ? '+' : ''}{solution.e0.toFixed(2)} V</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-center">Perhitungan E°<sub>sel</sub></h4>
            <div className="font-mono text-sm text-slate-700 dark:text-slate-300 space-y-2">
               <p>E°<sub>sel</sub> = E°<sub>larutan</sub> - E°<sub>logam</sub></p>
               <p>E°<sub>sel</sub> = {solution.e0.toFixed(2)} - ({metal.e0.toFixed(2)})</p>
               <div className={`p-3 rounded-xl font-bold text-lg text-center mt-2 ${
                  isSame ? 'bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400' :
                  isSpontaneous ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
               }`}>
                  E°<sub>sel</sub> = {eCell > 0 ? '+' : ''}{eCell.toFixed(2)} V
               </div>
            </div>
          </div>
        </div>

        {/* Visualizer Area (Right) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col items-center">
          
          {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Eksplorasi Selesai!</h3>
               <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                 <p className="font-bold text-lg mb-2">Memahami Deret Volta</p>
                 <p className="text-sm leading-relaxed mb-2">
                   Logam yang memiliki potensial standar lebih negatif (berada di sebelah kiri Deret Volta) selalu mampu mendesak (mereduksi) ion logam yang berada di sebelah kanannya dari larutan.
                 </p>
                 <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); setStatus('idle'); }}
                 className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
               >
                 Lanjut Belajar
               </button>
             </div>
          )}

          <div className="w-full max-w-md flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl mb-10 z-10">
             <div className="text-center font-bold text-gray-800 dark:text-gray-200">
               {metal.symbol}<sub className="text-[10px]">(s)</sub> + {solution.ion}<sub className="text-[10px]">(aq)</sub>
             </div>
             <div>→</div>
             <div className="text-center font-bold text-gray-800 dark:text-gray-200">
               {status === 'spontaneous' ? (
                 <span>{metal.ion}<sub className="text-[10px]">(aq)</sub> + {solution.symbol}<sub className="text-[10px]">(s)</sub></span>
               ) : (
                 <span className="text-gray-400">?</span>
               )}
             </div>
          </div>

          <div className="flex-1 flex justify-center items-end relative z-10 w-full pb-8">
             
             {/* Beaker */}
             <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-4 border-b-[12px] border-white/40 dark:border-white/10 rounded-b-3xl rounded-t-lg z-30 pointer-events-none drop-shadow-md"></div>
                <div className="absolute top-0 inset-x-4 h-2 bg-white/30 dark:bg-white/5 rounded-full z-30 pointer-events-none"></div>
                
                {/* Liquid Solution */}
                <div className={`absolute bottom-3 inset-x-2 h-48 rounded-b-2xl ${solution.solutionColor} transition-colors duration-1000 overflow-hidden z-10`}>
                   <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply"></div>
                   
                   {/* Metal Plate */}
                   <div 
                      className={`absolute left-1/2 -translate-x-1/2 w-16 ${metal.color} border-x border-b border-black/20 rounded-b-md shadow-inner transition-all duration-[1000ms] z-20 flex flex-col items-center
                      ${status === 'idle' ? 'top-[-100px] h-32' : 'top-4 h-48'}
                      ${status === 'spontaneous' ? 'opacity-80 scale-x-95 animate-pulse' : ''}
                      `}
                   >
                      <span className="text-white font-bold mt-12 drop-shadow-md">{metal.symbol}</span>
                      
                      {/* Corroding / Coating effect */}
                      {status === 'spontaneous' && (
                         <div className={`absolute bottom-0 w-[110%] h-32 -mx-[5%] rounded-md opacity-80 ${solution.color} mix-blend-hard-light animate-pulse`}></div>
                      )}
                   </div>

                   {/* Dissolving bubbles (Spontaneous) */}
                   {status === 'spontaneous' && (
                     <div className="absolute inset-0 z-30 flex items-center justify-around opacity-60">
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.8s' }}></div>
                        <div className="w-3 h-3 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '1.2s', animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-white animate-bounce shadow-sm" style={{ animationDuration: '0.9s', animationDelay: '0.5s' }}></div>
                     </div>
                   )}
                </div>
             </div>
          </div>
          
          <div className="mt-4 flex flex-col items-center gap-4 z-20">
             
             {/* Status indicator after test */}
             {status === 'non-spontaneous' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold rounded-lg animate-in fade-in slide-in-from-bottom-2">
                   <ZapOff className="w-5 h-5 text-gray-500" />
                   Tidak Terjadi Reaksi Spontan
                </div>
             )}
             
             {status === 'spontaneous' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold rounded-lg animate-in fade-in slide-in-from-bottom-2">
                   <Zap className="w-5 h-5 text-emerald-500 animate-pulse" />
                   Reaksi Berlangsung Spontan!
                </div>
             )}

             <div className="flex gap-3">
               <button
                 onClick={handleTest}
                 disabled={status !== 'idle'}
                 className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                   status !== 'idle' ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-800' :
                   'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg'
                 }`}
               >
                 <Target className="w-5 h-5" />
                 Celupkan Logam
               </button>
               
               {status !== 'idle' && (
                 <button
                   onClick={handleReset}
                   className="px-6 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2"
                 >
                   <RefreshCw className="w-5 h-5" />
                   Ulangi
                 </button>
               )}
             </div>
          </div>

        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Deret Volta (Potensial Standar)
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian Deret Volta</h4>
                <p>Deret Volta adalah urutan unsur-unsur logam berdasarkan harga Potensial Reduksi Standar (E°)-nya dari yang paling kecil (negatif) ke yang paling besar (positif).</p>
                <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs overflow-x-auto text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                   Li K Ba Ca Na Mg Al Mn Zn Cr Fe Cd Co Ni Sn Pb (H) Cu Hg Ag Pt Au
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Sifat Deret Volta</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Semakin ke Kiri:</strong> E° semakin kecil/negatif. Logam semakin mudah mengalami oksidasi (reduktor kuat).</li>
                  <li><strong>Semakin ke Kanan:</strong> E° semakin besar/positif. Ion logam semakin mudah mengalami reduksi (oksidator kuat).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Reaksi Pendesakan (Kespontanan)</h4>
                <p>Suatu logam dapat mendesak (mereduksi) ion logam lain jika letaknya berada di <strong>sebelah kiri</strong> dari logam yang didesaknya di dalam Deret Volta.</p>
                <p className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded border border-emerald-100 dark:border-emerald-800 text-xs">
                   E°sel = E°(Larutan) - E°(Logam Padat) &gt; 0 <br/>
                   Hanya bereaksi spontan jika hasil perhitungan ini bernilai Positif (+).
                </p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
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
