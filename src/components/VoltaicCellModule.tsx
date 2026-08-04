'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Zap, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Electrode = {
  id: string;
  name: string;
  symbol: string;
  ion: string;
  color: string;
  solutionColor: string;
  e0: number; // Standard reduction potential in Volts
};

const ELECTRODES: Electrode[] = [
  { id: 'zn', name: 'Seng', symbol: 'Zn', ion: 'Zn²⁺', color: 'bg-slate-400', solutionColor: 'bg-slate-200/40', e0: -0.76 },
  { id: 'cu', name: 'Tembaga', symbol: 'Cu', ion: 'Cu²⁺', color: 'bg-orange-600', solutionColor: 'bg-blue-400/30', e0: 0.34 },
  { id: 'ag', name: 'Perak', symbol: 'Ag', ion: 'Ag⁺', color: 'bg-slate-300', solutionColor: 'bg-slate-100/30', e0: 0.80 },
];

export default function VoltaicCellModule() {
  const { addScore } = useUser();
  const [leftElectrode, setLeftElectrode] = useState<Electrode>(ELECTRODES[0]);
  const [rightElectrode, setRightElectrode] = useState<Electrode>(ELECTRODES[1]);
  const [isRunning, setIsRunning] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [testedCombs, setTestedCombs] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Calculate Cell Potential (E_cell = E_right - E_left)
  // Standard convention: Right is Cathode, Left is Anode
  const eCell = rightElectrode.e0 - leftElectrode.e0;
  const isSpontaneous = eCell > 0;
  const isSame = leftElectrode.id === rightElectrode.id;

  const handleStart = () => {
    if (!isSpontaneous || isSame) return;
    setIsRunning(true);
    
    // Register combination
    const combId = `${leftElectrode.id}-${rightElectrode.id}`;
    setTestedCombs(prev => {
      const next = new Set(prev).add(combId);
      // We have 3 electrodes. Valid spontaneous combinations are Zn-Cu, Zn-Ag, Cu-Ag (3 combinations)
      if (next.size === 3 && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1500);
      }
      return next;
    });
  };

  const handleReset = () => {
    setIsRunning(false);
  };

  const swapElectrodes = () => {
    setLeftElectrode(rightElectrode);
    setRightElectrode(leftElectrode);
    setIsRunning(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Elektrokimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Merakit Sel Volta (Galvani)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Rakit sel volta dengan memilih logam untuk elektroda kiri dan kanan. Pastikan reaksi berjalan spontan (Tegangan positif) dengan menempatkan logam yang tepat di Anoda dan Katoda.
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
                Diketahui:<br/>
                Zn²⁺ + 2e⁻ → Zn   E° = -0.76 V<br/>
                Cu²⁺ + 2e⁻ → Cu   E° = +0.34 V<br/>
                Berapa potensial sel (E°sel) yang dihasilkan dari kedua elektroda tersebut?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Untuk reaksi spontan, E°sel harus positif. Logam dengan E° lebih besar (Cu) menjadi Katoda (mengalami reduksi). Logam dengan E° lebih kecil (Zn) menjadi Anoda (mengalami oksidasi).<br/>
                  E°sel = E°katoda - E°anoda<br/>
                  E°sel = (+0.34 V) - (-0.76 V) = <strong>+1.10 V</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Pada sel Volta yang terdiri dari elektroda Seng (Zn) dan Tembaga (Cu), ke arah manakah elektron mengalir melalui kawat penghantar?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Elektron selalu mengalir dari elektroda yang melepaskan elektron (Anoda, tempat oksidasi) menuju elektroda yang menangkap elektron (Katoda, tempat reduksi). Karena Zn mengalami oksidasi, elektron mengalir <strong>dari elektroda Seng (Zn) ke elektroda Tembaga (Cu)</strong>.
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
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Elektroda Kiri (Anoda)</h3>
            <select 
              value={leftElectrode.id}
              onChange={(e) => { setLeftElectrode(ELECTRODES.find(el => el.id === e.target.value)!); setIsRunning(false); }}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium mb-2 outline-none focus:border-emerald-500"
            >
              {ELECTRODES.map(el => <option key={el.id} value={el.id}>{el.name} ({el.symbol})</option>)}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Larutan: {leftElectrode.symbol}SO₄</p>
            
            <div className="flex justify-center my-2">
               <button onClick={swapElectrodes} className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-600 dark:text-gray-400">
                  <ArrowRightLeft className="w-5 h-5" />
               </button>
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white mb-4 mt-2">Elektroda Kanan (Katoda)</h3>
            <select 
              value={rightElectrode.id}
              onChange={(e) => { setRightElectrode(ELECTRODES.find(el => el.id === e.target.value)!); setIsRunning(false); }}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium mb-2 outline-none focus:border-emerald-500"
            >
              {ELECTRODES.map(el => <option key={el.id} value={el.id}>{el.name} ({el.symbol})</option>)}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400">Larutan: {rightElectrode.symbol}SO₄</p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 text-center">Perhitungan E°<sub>sel</sub></h4>
            <div className="font-mono text-sm text-slate-700 dark:text-slate-300 space-y-2">
               <p>E°<sub>sel</sub> = E°<sub>katoda</sub> - E°<sub>anoda</sub></p>
               <p>E°<sub>sel</sub> = {rightElectrode.e0.toFixed(2)} - ({leftElectrode.e0.toFixed(2)})</p>
               <div className={`p-3 rounded-xl font-bold text-lg text-center mt-2 ${
                  isSpontaneous && !isSame ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
               }`}>
                  E°<sub>sel</sub> = {eCell > 0 ? '+' : ''}{eCell.toFixed(2)} V
               </div>
            </div>
            {!isSpontaneous && !isSame && (
               <div className="mt-4 flex items-start gap-2 text-red-600 dark:text-red-400 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <p>Reaksi tidak spontan. Balikkan posisi anoda dan katoda agar dapat menghasilkan listrik.</p>
               </div>
            )}
            {isSame && (
               <div className="mt-4 flex items-start gap-2 text-yellow-600 dark:text-yellow-400 text-xs font-semibold">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                  <p>Anoda dan Katoda tidak boleh dari logam yang sama.</p>
               </div>
            )}
          </div>
        </div>

        {/* Visualizer Area (Right) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col">
          
          {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Eksperimen Sel Volta Selesai!</h3>
               <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                 <p className="font-bold text-lg mb-2">Paham Spontanitas Reaksi</p>
                 <p className="text-sm leading-relaxed mb-2">
                   Anda telah berhasil merangkai kombinasi sel volta secara spontan. Logam dengan potensial reduksi lebih kecil berfungsi sebagai sumber elektron (Anoda).
                 </p>
                 <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => setShowSuccess(false)}
                 className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
          )}

          <div className="flex justify-between items-center mb-10 z-10">
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-[10px] text-white dark:text-black font-bold">-</div>
                <span className="font-bold text-sm text-gray-600 dark:text-gray-400">Anoda (Oksidasi)</span>
             </div>
             
             {/* Voltmeter */}
             <div className="relative">
                <div className="w-32 h-16 bg-gray-800 dark:bg-gray-950 rounded-t-full border-4 border-b-0 border-gray-700 dark:border-gray-800 flex items-end justify-center pb-2 relative overflow-hidden shadow-lg">
                   {/* Needle */}
                   <div 
                      className="w-1 h-14 bg-red-500 absolute bottom-0 origin-bottom rounded-full transition-transform duration-1000 ease-in-out z-10"
                      style={{ transform: `rotate(${isRunning ? Math.min(60, Math.max(-60, (eCell / 2) * 60)) : -60}deg)` }}
                   ></div>
                   <div className="w-3 h-3 bg-white rounded-full absolute bottom-[-6px] z-20"></div>
                   
                   {/* Digital Display */}
                   <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black text-green-400 font-mono text-[10px] px-2 py-0.5 rounded z-20 shadow-inner">
                      {isRunning ? (eCell > 0 ? '+' : '') + eCell.toFixed(2) + ' V' : '0.00 V'}
                   </div>
                </div>
                <div className="w-36 h-2 bg-gray-900 absolute bottom-0 -left-2 rounded-full"></div>
             </div>

             <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-gray-600 dark:text-gray-400">Katoda (Reduksi)</span>
                <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white font-bold">+</div>
             </div>
          </div>

          <div className="flex-1 flex justify-between items-end relative px-4 z-10 mt-16">
             
             {/* Wires */}
             <svg className="absolute top-[-60px] left-0 w-full h-40 pointer-events-none z-0" preserveAspectRatio="none">
                <path d={`M 60,60 Q 150,0 250,20`} fill="none" stroke="black" strokeWidth="3" className="dark:stroke-gray-500" />
                <path d={`M 250,20 Q 350,0 440,60`} fill="none" stroke="red" strokeWidth="3" className="dark:stroke-red-800" />
                
                {/* Moving Electrons on wire */}
                {isRunning && (
                  <>
                     <circle r="4" fill="yellow" className="animate-[moveRight_2s_linear_infinite]">
                        <animateMotion path="M 60,60 Q 150,0 250,20" dur="1s" repeatCount="indefinite" />
                     </circle>
                     <circle r="4" fill="yellow" className="animate-[moveRight_2s_linear_infinite]">
                        <animateMotion path="M 250,20 Q 350,0 440,60" dur="1s" repeatCount="indefinite" />
                     </circle>
                  </>
                )}
             </svg>

             {/* Salt Bridge */}
             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-32 border-[12px] border-b-0 border-white/80 dark:border-white/20 rounded-t-3xl z-10 backdrop-blur-sm flex overflow-hidden">
                <div className="w-full h-full bg-blue-100/30 dark:bg-blue-900/30"></div>
                {/* Flowing ions in salt bridge */}
                {isRunning && (
                  <div className="absolute inset-0 flex items-center justify-between px-4">
                     <span className="text-red-500 font-bold text-xs animate-[moveLeft_2s_linear_infinite]">NO₃⁻</span>
                     <span className="text-blue-500 font-bold text-xs animate-[moveRight_2s_linear_infinite]">K⁺</span>
                  </div>
                )}
             </div>

             {/* Left Beaker (Anode) */}
             <div className="relative w-32 h-40">
                <div className="absolute inset-0 border-4 border-b-[8px] border-white/40 dark:border-white/10 rounded-b-2xl rounded-t-md z-30 pointer-events-none"></div>
                <div className={`absolute bottom-2 inset-x-2 h-28 rounded-b-xl ${leftElectrode.solutionColor} transition-colors duration-1000 z-20`}></div>
                
                {/* Left Electrode Metal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-44 z-20">
                   <div className={`w-full h-full ${leftElectrode.color} border-x border-t border-black/20 rounded-t-sm shadow-inner transition-all duration-1000 flex flex-col items-center pt-2 ${isRunning ? 'animate-pulse' : ''}`}>
                      <span className="text-white font-bold text-xs drop-shadow-md">{leftElectrode.symbol}</span>
                      {/* Decreasing mass effect */}
                      {isRunning && (
                         <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-transparent to-white/50 opacity-80 mix-blend-overlay animate-[dissolve_2s_infinite]"></div>
                      )}
                   </div>
                </div>

                {/* Ions leaving electrode */}
                {isRunning && (
                   <div className="absolute top-1/2 right-4 text-xs font-bold text-slate-700 dark:text-slate-300 z-30 animate-[flyOutRight_1s_infinite]">
                      {leftElectrode.ion}
                   </div>
                )}
             </div>

             {/* Right Beaker (Cathode) */}
             <div className="relative w-32 h-40">
                <div className="absolute inset-0 border-4 border-b-[8px] border-white/40 dark:border-white/10 rounded-b-2xl rounded-t-md z-30 pointer-events-none"></div>
                <div className={`absolute bottom-2 inset-x-2 h-28 rounded-b-xl ${rightElectrode.solutionColor} transition-colors duration-1000 z-20`}></div>
                
                {/* Right Electrode Metal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-44 z-20">
                   <div className={`w-full h-full ${rightElectrode.color} border-x border-t border-black/20 rounded-t-sm shadow-inner transition-all duration-1000 flex flex-col items-center pt-2 ${isRunning ? 'scale-105' : ''}`}>
                      <span className="text-white font-bold text-xs drop-shadow-md">{rightElectrode.symbol}</span>
                      {/* Increasing mass effect */}
                      {isRunning && (
                         <div className="absolute bottom-[-10px] -inset-x-2 h-24 bg-gradient-to-t from-white/30 to-transparent rounded-lg animate-[grow_2s_infinite]"></div>
                      )}
                   </div>
                </div>

                {/* Ions entering electrode */}
                {isRunning && (
                   <div className="absolute top-1/2 left-4 text-xs font-bold text-slate-700 dark:text-slate-300 z-30 animate-[flyInRight_1s_infinite]">
                      {rightElectrode.ion}
                   </div>
                )}
             </div>
          </div>
          
          <div className="mt-8 flex justify-center z-20 relative">
             <button
               onClick={isRunning ? handleReset : handleStart}
               disabled={!isSpontaneous || isSame}
               className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                 !isSpontaneous || isSame ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800' :
                 isRunning ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
                 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg'
               }`}
             >
               <Zap className="w-5 h-5" />
               {isRunning ? 'Matikan Sel' : 'Nyalakan Sel Volta'}
             </button>
          </div>

        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Prinsip Sel Volta
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian</h4>
                <p>Sel Volta (Sel Galvani) adalah sel elektrokimia yang dapat menghasilkan energi listrik dari reaksi redoks yang berlangsung secara spontan.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Anoda dan Katoda</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Anoda (Kutub Negatif):</strong> Elektoda tempat terjadinya reaksi <strong>Oksidasi</strong> (Pelepasan elektron). Logam anoda akan larut (massa berkurang).</li>
                  <li><strong>Katoda (Kutub Positif):</strong> Elektoda tempat terjadinya reaksi <strong>Reduksi</strong> (Penerimaan elektron). Logam katoda akan mengendap (massa bertambah).</li>
                </ul>
                <p className="mt-2 text-xs font-mono bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 p-2 rounded">Ingat jembatan keledai: KRAO (Katoda Reduksi, Anoda Oksidasi)</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Potensial Sel (E°sel)</h4>
                <p>Syarat reaksi spontan (bisa menghasilkan listrik) adalah E°sel harus bernilai positif (+).</p>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2">E°sel = E°(Katoda) - E°(Anoda)</p>
                <p className="mt-2 text-xs text-gray-500">Agar E°sel positif, logam dengan E° lebih besar harus ditempatkan sebagai Katoda.</p>
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
      
      {/* Missing Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flyOutRight {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(20px, -20px) scale(0.5); opacity: 0; }
        }
        @keyframes flyInRight {
          0% { transform: translate(-20px, -20px) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes grow {
          0% { opacity: 0; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.05); }
          100% { opacity: 0; transform: scaleY(1.1); }
        }
        @keyframes dissolve {
          0% { opacity: 0; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(0.95); }
          100% { opacity: 0; transform: scaleY(0.9); }
        }
        @keyframes moveRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(20px); opacity: 0; }
        }
        @keyframes moveLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-20px); opacity: 0; }
        }
      `}} />
    </div>
  );
}
