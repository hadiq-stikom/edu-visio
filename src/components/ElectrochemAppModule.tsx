'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Droplets, Battery, Zap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type PlatingMetal = {
  id: string;
  name: string;
  symbol: string;
  ion: string;
  color: string;
  platingColor: string;
};

type PlatingObject = {
  id: string;
  name: string;
  color: string;
  shape: 'spoon' | 'ring';
};

const METALS: PlatingMetal[] = [
  { id: 'au', name: 'Emas', symbol: 'Au', ion: 'Au³⁺', color: 'bg-yellow-400', platingColor: 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]' },
  { id: 'ag', name: 'Perak', symbol: 'Ag', ion: 'Ag⁺', color: 'bg-slate-200', platingColor: 'bg-slate-200 shadow-[0_0_15px_rgba(226,232,240,0.8)]' },
];

const OBJECTS: PlatingObject[] = [
  { id: 'spoon', name: 'Sendok Besi', color: 'bg-stone-600', shape: 'spoon' },
  { id: 'ring', name: 'Cincin Tembaga', color: 'bg-orange-700', shape: 'ring' },
];

export default function ElectrochemAppModule() {
  const { addScore } = useUser();
  const [metal, setMetal] = useState<PlatingMetal>(METALS[0]);
  const [targetObj, setTargetObj] = useState<PlatingObject>(OBJECTS[0]);
  const [isPlating, setIsPlating] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Animation effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlating && progress < 100) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            handleFinish();
            return 100;
          }
          return p + 2; // increments of 2%
        });
      }, 50);
    } else if (!isPlating && progress < 100) {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isPlating, progress]);

  const handleFinish = () => {
    const combId = `${targetObj.id}-${metal.id}`;
    setTested(prev => {
      const next = new Set(prev).add(combId);
      // Reward if they tried all 4 combinations (2 metals x 2 objects)
      if (next.size === 4 && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1000);
      }
      return next;
    });
  };

  const handleStart = () => {
    setIsPlating(true);
    setProgress(0);
  };

  const handleReset = () => {
    setIsPlating(false);
    setProgress(0);
  };

  const renderTargetShape = () => {
    // We blend the original color with the plating color based on progress (0 to 100)
    // We can just overlay a div with the plating color and vary its opacity
    
    if (targetObj.shape === 'spoon') {
       return (
          <div className="relative w-12 h-32 flex flex-col items-center justify-start mt-6 z-20">
             {/* Handle */}
             <div className={`w-4 h-20 ${targetObj.color} rounded-t-sm z-10 relative`}>
                <div className={`absolute inset-0 ${metal.platingColor} transition-opacity duration-200 z-20`} style={{ opacity: progress / 100 }}></div>
             </div>
             {/* Scoop */}
             <div className={`w-10 h-14 ${targetObj.color} rounded-[40%_40%_50%_50%] -mt-2 z-10 relative shadow-inner`}>
                <div className={`absolute inset-0 ${metal.platingColor} rounded-[40%_40%_50%_50%] transition-opacity duration-200 z-20`} style={{ opacity: progress / 100 }}></div>
             </div>
          </div>
       );
    }
    
    if (targetObj.shape === 'ring') {
       return (
          <div className="relative w-16 h-16 flex items-center justify-center mt-12 z-20">
             <div className={`w-16 h-16 rounded-full border-[6px] ${targetObj.color.replace('bg-', 'border-')} relative z-10`}>
                <div className={`absolute -inset-[6px] rounded-full border-[6px] ${metal.platingColor.replace('bg-', 'border-')} transition-opacity duration-200 z-20`} style={{ opacity: progress / 100 }}></div>
             </div>
          </div>
       );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Aplikasi Elektrokimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Penyepuhan Logam (Elektroplating)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Lindungi atau percantik benda logam dengan melapisinya menggunakan logam mulia (Emas/Perak). Proses ini menggunakan arus listrik searah (DC) dalam sel elektrolisis.
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
                Pada proses penyepuhan sendok besi dengan perak, posisi sendok besi dan logam perak yang benar adalah...
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dalam sel elektrolisis (penyepuhan), benda yang akan dilapisi selalu diletakkan di <strong>Katoda (kutub negatif)</strong> agar ion positif dapat menempel (tereduksi) padanya. Logam pelapis (Perak) diletakkan di <strong>Anoda (kutub positif)</strong>. Jadi, sendok besi di Katoda dan logam perak di Anoda.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Reaksi apa yang terjadi pada benda (sendok besi) yang diletakkan di Katoda selama penyepuhan perak?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Di Katoda selalu terjadi reaksi reduksi (penangkapan elektron). Ion perak (Ag⁺) dari larutan akan menangkap elektron dari Katoda dan mengendap menjadi logam perak (Ag) pada permukaan sendok.<br/>
                  Reaksinya: <strong>Ag⁺(aq) + e⁻ → Ag(s)</strong>.
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
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">1. Benda di Katoda (-)</h3>
            <p className="text-xs text-gray-500 mb-2">Benda yang akan dilapisi (menangkap elektron).</p>
            <select 
              value={targetObj.id}
              onChange={(e) => { setTargetObj(OBJECTS.find(o => o.id === e.target.value)!); handleReset(); }}
              disabled={isPlating}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium outline-none focus:border-emerald-500 disabled:opacity-50"
            >
              {OBJECTS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
            </select>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">2. Logam di Anoda (+)</h3>
            <p className="text-xs text-gray-500 mb-2">Logam pelapis (melepas elektron & larut).</p>
            <select 
              value={metal.id}
              onChange={(e) => { setMetal(METALS.find(m => m.id === e.target.value)!); handleReset(); }}
              disabled={isPlating}
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white font-medium outline-none focus:border-emerald-500 disabled:opacity-50"
            >
              {METALS.map(m => <option key={m.id} value={m.id}>{m.name} ({m.symbol})</option>)}
            </select>
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded text-xs">
               Larutan Elektrolit otomatis disesuaikan menjadi larutan yang mengandung <strong>{metal.ion}</strong>.
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
             <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2 text-sm">
               <Zap className="w-4 h-4 text-yellow-500" />
               Reaksi Elektrolisis
             </h4>
             <div className="space-y-3 text-xs font-mono">
                <div>
                   <span className="font-bold text-gray-500">Katoda (-) :</span><br/>
                   <span className="text-emerald-600 dark:text-emerald-400">{metal.ion}(aq) + e⁻ → {metal.symbol}(s)</span>
                </div>
                <div>
                   <span className="font-bold text-gray-500">Anoda (+) :</span><br/>
                   <span className="text-red-500">{metal.symbol}(s) → {metal.ion}(aq) + e⁻</span>
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
                 <p className="font-bold text-lg mb-2">Penyepuhan Berhasil</p>
                 <p className="text-sm leading-relaxed mb-2">
                   Anda telah berhasil menguji aplikasi sel elektrolisis. Dengan bantuan energi listrik dari luar, ion logam pelapis (Anoda) dapat diendapkan ke benda (Katoda).
                 </p>
                 <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); handleReset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
          )}

          {/* Circuit Top Area */}
          <div className="w-full flex justify-center items-end relative z-10 pt-4">
             {/* Battery (DC Power) */}
             <div className="relative z-20">
                <div className="bg-black dark:bg-gray-800 w-32 h-16 rounded flex flex-col justify-between p-2 shadow-lg relative">
                   <div className="flex justify-between font-bold text-white text-lg px-2">
                      <span className="text-blue-400">-</span>
                      <span className="text-red-500">+</span>
                   </div>
                   <div className="text-center font-bold text-green-400 text-xs">SUMBER ARUS DC</div>
                   <div className="absolute top-[-8px] left-4 w-4 h-2 bg-gray-500"></div>
                   <div className="absolute top-[-8px] right-4 w-4 h-2 bg-gray-500"></div>
                </div>
             </div>

             {/* Wires */}
             <svg className="absolute top-6 left-0 w-full h-24 pointer-events-none z-0" preserveAspectRatio="none">
                <path d={`M 250,0 Q 150,20 150,96`} fill="none" stroke="black" strokeWidth="4" className="dark:stroke-gray-400" />
                <path d={`M 350,0 Q 450,20 450,96`} fill="none" stroke="red" strokeWidth="4" className="dark:stroke-red-600" />
                
                {/* Flowing electrons from Battery(-) to Cathode */}
                {isPlating && progress < 100 && (
                   <circle r="4" fill="yellow" className="animate-[moveElectronL_1.5s_linear_infinite]">
                      <animateMotion path="M 250,0 Q 150,20 150,96" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                )}
                {/* Flowing electrons from Anode to Battery(+) */}
                {isPlating && progress < 100 && (
                   <circle r="4" fill="yellow" className="animate-[moveElectronR_1.5s_linear_infinite]">
                      <animateMotion path="M 450,96 Q 450,20 350,0" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                )}
             </svg>
          </div>
          
          <div className="w-full flex justify-between px-24 font-bold text-sm text-gray-500 mb-2 z-10">
             <div className="text-blue-600 dark:text-blue-400 text-center">
                Katoda (-)<br/><span className="text-xs font-normal">Tempat Benda</span>
             </div>
             <div className="text-red-500 text-center">
                Anoda (+)<br/><span className="text-xs font-normal">Logam Pelapis</span>
             </div>
          </div>

          <div className="flex-1 flex justify-center items-end relative z-10 w-full pb-10 mt-6">
             
             {/* Bath (Beaker) */}
             <div className="relative w-80 h-64">
                <div className="absolute inset-0 border-4 border-b-[16px] border-white/40 dark:border-white/10 rounded-b-3xl rounded-t-lg z-30 pointer-events-none drop-shadow-md"></div>
                <div className="absolute top-0 inset-x-4 h-2 bg-white/30 dark:bg-white/5 rounded-full z-30 pointer-events-none"></div>
                
                {/* Liquid Solution */}
                <div className={`absolute bottom-4 inset-x-2 h-48 rounded-b-2xl bg-cyan-100/40 dark:bg-cyan-900/30 transition-colors duration-1000 overflow-hidden z-10`}>
                   
                   {/* Left Electrode (Cathode) */}
                   <div className="absolute left-1/4 -translate-x-1/2 bottom-4 w-24 h-full flex justify-center">
                      {renderTargetShape()}
                      {/* Incoming ions */}
                      {isPlating && progress < 100 && (
                         <div className="absolute top-1/2 -right-12 text-[10px] font-bold text-blue-700 dark:text-blue-300 z-30 animate-[flyInRight_1.5s_infinite]">
                            {metal.ion}
                         </div>
                      )}
                   </div>

                   {/* Right Electrode (Anode) */}
                   <div className="absolute right-1/4 translate-x-1/2 bottom-0 w-16 h-56 flex justify-center">
                      <div className={`w-12 h-full ${metal.color} border-x border-b border-black/20 rounded-b-sm shadow-inner transition-all z-20 flex flex-col items-center`}>
                         <span className="text-white font-bold mt-12 drop-shadow-md text-xs">{metal.symbol}</span>
                         {/* Dissolving effect */}
                         {isPlating && progress < 100 && (
                            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-transparent to-white/50 opacity-80 mix-blend-overlay animate-[dissolve_2s_infinite]"></div>
                         )}
                      </div>
                      
                      {/* Outgoing ions */}
                      {isPlating && progress < 100 && (
                         <div className="absolute top-1/2 -left-8 text-[10px] font-bold text-red-700 dark:text-red-300 z-30 animate-[flyOutLeft_1.5s_infinite]">
                            {metal.ion}
                         </div>
                      )}
                   </div>

                </div>
             </div>
          </div>
          
          {/* Progress Bar & Controls */}
          <div className="mt-4 w-full max-w-md flex flex-col items-center gap-4 z-20">
             
             <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 mb-2 shadow-inner overflow-hidden relative">
               <div 
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-300 ease-linear shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  style={{ width: `${progress}%` }}
               ></div>
             </div>

             <div className="flex gap-3">
               {!isPlating && progress === 0 ? (
                  <button
                    onClick={handleStart}
                    className="px-8 py-3 rounded-xl font-bold flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    Mulai Penyesepuhan
                  </button>
               ) : (
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reset
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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Elektroplating
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian Sel Elektrolisis</h4>
                <p>Sel Elektrolisis adalah kebalikan dari Sel Volta. Di sini, <strong>energi listrik</strong> (dari luar, misalnya baterai DC) digunakan untuk memaksa terjadinya <strong>reaksi kimia (redoks) yang tidak spontan</strong>.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Elektroplating (Penyepuhan)</h4>
                <p>Salah satu aplikasi utama sel elektrolisis adalah penyepuhan logam (melapisi suatu logam dengan logam lain agar tahan karat atau lebih indah). Aturan penempatannya adalah:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Katoda (Kutub -):</strong> Dihubungkan ke benda yang akan dilapisi (misal: sendok besi, bumper mobil). Di sini ion pelapis akan <strong>tereduksi dan mengendap</strong> menempel pada benda.</li>
                  <li><strong>Anoda (Kutub +):</strong> Dihubungkan ke logam murni pelapis (misal: batangan emas/perak). Di sini logam akan <strong>teroksidasi dan larut</strong> menjadi ion untuk menggantikan ion di larutan.</li>
                  <li><strong>Larutan:</strong> Harus mengandung ion dari logam pelapis (Anoda).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Contoh Kegunaan</h4>
                <p>Penyepuhan perhiasan, perlindungan korosi (seperti pelapisan krom pada velg mobil, pelapisan seng / galvanisasi pada atap besi baja).</p>
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
        @keyframes flyOutLeft {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(-30px, 0) scale(0.5); opacity: 0; }
        }
        @keyframes flyInRight {
          0% { transform: translate(30px, 0) scale(0.5); opacity: 0; }
          100% { transform: translate(0, 0) scale(1); opacity: 1; }
        }
        @keyframes dissolve {
          0% { opacity: 0; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(0.95); }
          100% { opacity: 0; transform: scaleY(0.9); }
        }
      `}} />
    </div>
  );
}
