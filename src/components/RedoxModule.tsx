'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Beaker, Play, Atom, Info } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Reaction = {
  id: string;
  name: string;
  desc: string;
  equation: React.ReactNode;
  speciesLeft1: { name: string, biloks: number, color: string, isMetal: boolean };
  speciesLeft2: { name: string, biloks: number, color: string, isMetal: boolean };
  speciesRight1: { name: string, biloks: number, color: string, isMetal: boolean };
  speciesRight2: { name: string, biloks: number, color: string, isMetal: boolean };
  electronTransfer: number;
  oxidator: string;
  reduktor: string;
};

const REACTIONS: Reaction[] = [
  {
    id: 'zn-cu',
    name: 'Logam Seng dan Ion Tembaga',
    desc: 'Logam Seng (Zn) dimasukkan ke dalam larutan Tembaga(II) Sulfat (Cu²⁺). Seng akan melarut sementara Tembaga akan mengendap.',
    equation: <span>Zn<sub className="text-[10px]">(s)</sub> + Cu²⁺<sub className="text-[10px]">(aq)</sub> → Zn²⁺<sub className="text-[10px]">(aq)</sub> + Cu<sub className="text-[10px]">(s)</sub></span>,
    speciesLeft1: { name: 'Zn', biloks: 0, color: 'bg-slate-400', isMetal: true },
    speciesLeft2: { name: 'Cu²⁺', biloks: 2, color: 'bg-blue-500', isMetal: false },
    speciesRight1: { name: 'Zn²⁺', biloks: 2, color: 'bg-slate-300', isMetal: false },
    speciesRight2: { name: 'Cu', biloks: 0, color: 'bg-orange-600', isMetal: true },
    electronTransfer: 2,
    oxidator: 'Cu²⁺',
    reduktor: 'Zn'
  },
  {
    id: 'cu-ag',
    name: 'Logam Tembaga dan Ion Perak',
    desc: 'Kawat Tembaga (Cu) dicelupkan ke dalam larutan Perak Nitrat (Ag⁺). Kristal perak akan tumbuh di kawat tembaga.',
    equation: <span>Cu<sub className="text-[10px]">(s)</sub> + 2Ag⁺<sub className="text-[10px]">(aq)</sub> → Cu²⁺<sub className="text-[10px]">(aq)</sub> + 2Ag<sub className="text-[10px]">(s)</sub></span>,
    speciesLeft1: { name: 'Cu', biloks: 0, color: 'bg-orange-600', isMetal: true },
    speciesLeft2: { name: '2Ag⁺', biloks: 1, color: 'bg-slate-200', isMetal: false },
    speciesRight1: { name: 'Cu²⁺', biloks: 2, color: 'bg-blue-500', isMetal: false },
    speciesRight2: { name: '2Ag', biloks: 0, color: 'bg-slate-300', isMetal: true },
    electronTransfer: 2, // 1 Cu gives 2e total to 2 Ag+
    oxidator: 'Ag⁺',
    reduktor: 'Cu'
  },
];

export default function RedoxModule() {
  const { addScore } = useUser();
  const [activeRx, setActiveRx] = useState<Reaction>(REACTIONS[0]);
  
  // Animation states
  const [animState, setAnimState] = useState<'idle' | 'step1' | 'step2' | 'finished'>('idle');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleTest = (rx: Reaction) => {
    setActiveRx(rx);
    setAnimState('idle');
    
    // Automatically register as tested
    setTested(prev => {
      const next = new Set(prev).add(rx.id);
      if (next.size === REACTIONS.length && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1500);
      }
      return next;
    });
  };

  const playAnimation = () => {
    if (animState !== 'idle') return;
    
    setAnimState('step1'); // Show electrons leaving reduktor
    setTimeout(() => {
      setAnimState('step2'); // Electrons traveling to oxidator
      setTimeout(() => {
        setAnimState('finished'); // Products formed
      }, 1500);
    }, 1500);
  };

  const reset = () => {
    setAnimState('idle');
  };

  // Helper to render an atom/ion visually
  const renderSpecies = (sp: { name: string, biloks: number, color: string, isMetal: boolean }, position: string, opacity: number = 100) => {
    return (
      <div className={`absolute flex flex-col items-center justify-center transition-opacity duration-500 ${position}`} style={{ opacity: opacity / 100 }}>
         <div className={`w-20 h-20 rounded-full ${sp.color} shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center relative`}>
            <span className="font-bold text-white text-xl drop-shadow-md">{sp.name}</span>
            {sp.isMetal && (
               <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
            )}
         </div>
         <div className="mt-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            Biloks: {sp.biloks > 0 ? '+' : ''}{sp.biloks}
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Elektrokimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Penyetaraan & Transfer Elektron (Redoks)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Amati proses mikroskopis transfer elektron pada reaksi redoks (Reduksi-Oksidasi). Perhatikan bagaimana bilangan oksidasi (biloks) berubah seiring berpindahnya elektron.
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
                Tentukan zat yang bertindak sebagai Oksidator dan Reduktor pada reaksi: <br/>Fe + Cu²⁺ → Fe²⁺ + Cu
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  • Fe (biloks 0) menjadi Fe²⁺ (biloks +2). Fe mengalami Oksidasi (kenaikan biloks), sehingga Fe adalah <strong>Reduktor</strong>.<br/>
                  • Cu²⁺ (biloks +2) menjadi Cu (biloks 0). Cu²⁺ mengalami Reduksi (penurunan biloks), sehingga Cu²⁺ adalah <strong>Oksidator</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Berapa mol elektron yang ditransfer jika 1 mol logam Zn bereaksi sempurna menghasilkan Zn²⁺?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reaksi setengah sel untuk Zn adalah: Zn → Zn²⁺ + 2e⁻.<br/>
                  Dari persamaan tersebut, setiap 1 atom Zn akan melepaskan 2 elektron. Oleh karena itu, untuk 1 mol Zn, mol elektron yang ditransfer adalah <strong>2 mol elektron</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Reaction Selection Panel (Left) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-emerald-500" />
              Pilih Reaksi
            </h3>
            
            <div className="grid gap-3">
              {REACTIONS.map(rx => {
                const isTested = tested.has(rx.id);
                const isActive = activeRx.id === rx.id;
                
                return (
                  <button
                    key={rx.id}
                    onClick={() => handleTest(rx)}
                    className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50' 
                        : isTested
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div className="flex justify-between w-full mb-2">
                       <h4 className={`font-bold text-sm ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}>
                         {rx.name}
                       </h4>
                    </div>
                    <div className="font-mono text-xs p-2 bg-white dark:bg-gray-950 rounded border border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200 w-full overflow-x-auto whitespace-nowrap">
                       {rx.equation}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Analisis Reaksi
            </h4>
            <div className="space-y-3 text-sm">
               <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Oksidator (Mengalami Reduksi)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeRx.oxidator}</span>
               </div>
               <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Reduktor (Mengalami Oksidasi)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{activeRx.reduktor}</span>
               </div>
               <div className="flex justify-between pb-1">
                  <span className="text-slate-500 dark:text-slate-400">Transfer Elektron</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{activeRx.electronTransfer} e⁻</span>
               </div>
            </div>
          </div>
        </div>

        {/* Visualizer Area (Right) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col">
          
          {showSuccess && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Simulasi Selesai!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Memahami Transfer Elektron</p>
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah mengamati bahwa reaksi redoks selalu melibatkan serah terima elektron. Zat yang melepas elektron (Oksidasi) biloksnya naik, dan zat penangkap elektron (Reduksi) biloksnya turun.
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set([REACTIONS[0].id])); setActiveRx(REACTIONS[0]); setAnimState('idle'); }}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-gray-800 dark:text-gray-200">Reaksi Mikroskopis</h3>
             <div className="flex gap-2">
                <button 
                  onClick={playAnimation}
                  disabled={animState !== 'idle'}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" /> Mulai Reaksi
                </button>
                <button 
                  onClick={reset}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
             </div>
          </div>

          <div className="flex-1 relative bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
             
             {/* Descriptive text */}
             <div className="absolute top-4 inset-x-0 text-center z-10">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {animState === 'idle' && 'Klik "Mulai Reaksi" untuk melihat transfer elektron.'}
                  {animState === 'step1' && `${activeRx.reduktor} melepaskan elektron (Oksidasi).`}
                  {animState === 'step2' && `Elektron berpindah menuju ${activeRx.oxidator}...`}
                  {animState === 'finished' && `${activeRx.oxidator} menangkap elektron (Reduksi). Reaksi selesai.`}
                </p>
             </div>

             {/* Main Canvas */}
             <div className="absolute inset-0 flex items-center justify-center">
                
                {/* Left Side (Reduktor -> Oxidized Product) */}
                <div className="absolute left-1/4 -translate-x-1/2 flex items-center justify-center w-40 h-40">
                   {renderSpecies(activeRx.speciesLeft1, 'top-1/2 -translate-y-1/2', (animState === 'idle' || animState === 'step1') ? 100 : 0)}
                   {renderSpecies(activeRx.speciesRight1, 'top-1/2 -translate-y-1/2', (animState === 'step2' || animState === 'finished') ? 100 : 0)}
                </div>

                {/* Right Side (Oxidator -> Reduced Product) */}
                <div className="absolute right-1/4 translate-x-1/2 flex items-center justify-center w-40 h-40">
                   {renderSpecies(activeRx.speciesLeft2, 'top-1/2 -translate-y-1/2', (animState === 'idle' || animState === 'step1' || animState === 'step2') ? 100 : 0)}
                   {renderSpecies(activeRx.speciesRight2, 'top-1/2 -translate-y-1/2', animState === 'finished' ? 100 : 0)}
                </div>

                {/* Electron Animation */}
                <div className="absolute inset-0 pointer-events-none">
                   {(animState === 'step1' || animState === 'step2') && (
                     Array.from({ length: activeRx.electronTransfer }).map((_, i) => (
                       <div 
                         key={i}
                         className={`absolute w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 font-bold text-[10px] shadow-[0_0_15px_rgba(250,204,21,0.8)] transition-all duration-1000 ease-in-out`}
                         style={{
                           // Start position (at reduktor)
                           top: animState === 'step1' ? '40%' : '50%',
                           left: animState === 'step1' ? '25%' : '75%',
                           // Stagger slightly
                           transform: `translate(${(i - 0.5) * 20}px, ${(i - 0.5) * 20}px)`,
                           opacity: animState === 'step2' ? 0 : 1, 
                           transitionDelay: animState === 'step2' ? '500ms' : '0ms'
                         }}
                       >
                         e⁻
                       </div>
                     ))
                   )}
                </div>

                {/* Process Labels */}
                <div className="absolute bottom-10 inset-x-0 flex justify-between px-20">
                   <div className={`text-center transition-all duration-500 ${animState === 'idle' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                      <span className="block text-red-500 font-black tracking-widest uppercase text-sm">Oksidasi</span>
                      <span className="text-xs text-slate-500">Pelepasan e⁻ / Kenaikan Biloks</span>
                   </div>
                   <div className={`text-center transition-all duration-500 ${animState === 'finished' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <span className="block text-blue-500 font-black tracking-widest uppercase text-sm">Reduksi</span>
                      <span className="text-xs text-slate-500">Penerimaan e⁻ / Penurunan Biloks</span>
                   </div>
                </div>

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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Konsep Reaksi Redoks
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Oksidasi dan Reduksi</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Oksidasi:</strong> Reaksi pelepasan elektron. Ditandai dengan <strong>kenaikan bilangan oksidasi (biloks)</strong>.</li>
                  <li><strong>Reduksi:</strong> Reaksi pengikatan elektron. Ditandai dengan <strong>penurunan bilangan oksidasi (biloks)</strong>.</li>
                </ul>
                <p className="mt-2">Kedua reaksi ini selalu terjadi secara bersamaan (simultan) dalam sebuah reaksi redoks, karena elektron yang dilepaskan suatu zat harus ditangkap oleh zat lain.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Oksidator dan Reduktor</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Oksidator (Zat Pengoksidasi):</strong> Zat yang menyebabkan zat lain mengalami oksidasi. Oksidator sendiri mengalami reduksi (menangkap elektron).</li>
                  <li><strong>Reduktor (Zat Pereduksi):</strong> Zat yang menyebabkan zat lain mengalami reduksi. Reduktor sendiri mengalami oksidasi (melepas elektron).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Contoh Sederhana</h4>
                <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">Zn + Cu²⁺ → Zn²⁺ + Cu</p>
                <p className="mt-2">Zn berubah dari biloks 0 menjadi +2 (Oksidasi). Maka Zn adalah Reduktor. <br/> Cu²⁺ berubah dari biloks +2 menjadi 0 (Reduksi). Maka Cu²⁺ adalah Oksidator.</p>
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
