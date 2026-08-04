'use client';

import React, { useState } from 'react';
import { Beaker, Info, Star, Lightbulb, Zap, BookOpen, X, ChevronDown, ChevronUp, Droplets, Battery } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Solution = {
  id: string;
  name: string;
  type: 'Non-Elektrolit' | 'Elektrolit Lemah' | 'Elektrolit Kuat';
  formula: string;
  desc: string;
  color: string;
  brightness: number; // 0 = mati, 1 = redup, 3 = terang
  bubbles: number; // jumlah gelembung
};

const SOLUTIONS: Solution[] = [
  { 
    id: 'pure-water', name: 'Air Murni', type: 'Non-Elektrolit', formula: 'H₂O', 
    desc: 'Air murni (aquades) hampir tidak memiliki ion bebas. Tidak dapat menghantarkan arus listrik.', 
    color: 'bg-blue-300/20', brightness: 0, bubbles: 0
  },
  { 
    id: 'sugar', name: 'Larutan Gula', type: 'Non-Elektrolit', formula: 'C₆H₁₂O₆ (aq)', 
    desc: 'Gula terlarut dalam bentuk molekul, bukan ion. Tidak ada partikel bermuatan bebas, sehingga tidak menghantarkan listrik.', 
    color: 'bg-amber-100/30', brightness: 0, bubbles: 0
  },
  { 
    id: 'vinegar', name: 'Asam Cuka', type: 'Elektrolit Lemah', formula: 'CH₃COOH (aq)', 
    desc: 'Asam lemah yang terionisasi sebagian di dalam air (derajat ionisasi kecil). Menghasilkan sedikit ion penyalur listrik.', 
    color: 'bg-slate-200/40', brightness: 1, bubbles: 8
  },
  { 
    id: 'salt', name: 'Larutan Garam', type: 'Elektrolit Kuat', formula: 'NaCl (aq)', 
    desc: 'Garam dapur terionisasi sempurna menjadi ion Na⁺ dan Cl⁻ di dalam air. Sangat baik menghantarkan listrik.', 
    color: 'bg-blue-300/40', brightness: 3, bubbles: 30
  },
];

export default function ElectrolyteModule() {
  const { addScore } = useUser();
  const [activeSolution, setActiveSolution] = useState<Solution>(SOLUTIONS[0]);
  const [switchOn, setSwitchOn] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleTest = (sol: Solution) => {
    setActiveSolution(sol);
    setSwitchOn(false);
    
    // Automatically register as tested once selected
    setTested(prev => {
      const next = new Set(prev).add(sol.id);
      if (next.size === SOLUTIONS.length && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1500);
      }
      return next;
    });
  };

  const renderBubbles = (side: 'left' | 'right') => {
    if (!switchOn || activeSolution.bubbles === 0) return null;
    
    const items = [];
    const count = Math.floor(activeSolution.bubbles / 2); // Half on each electrode
    
    for (let i = 0; i < count; i++) {
      const leftOffset = side === 'left' ? 25 + Math.random() * 10 : 65 + Math.random() * 10;
      const animDuration = 0.5 + Math.random() * 1;
      const animDelay = Math.random() * 2;
      
      items.push(
        <div 
          key={`${side}-${i}`} 
          className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-80 shadow-sm animate-[rise_linear_infinite]"
          style={{
            bottom: `${10 + Math.random() * 20}%`, // Start somewhere on the submerged electrode
            left: `${leftOffset}%`,
            animationDuration: `${animDuration}s`,
            animationDelay: `${animDelay}s`,
            animationName: 'rise'
          }}
        />
      );
    }
    return items;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes rise {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
      `}} />
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Elektrokimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Uji Daya Hantar Listrik Larutan
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Uji berbagai cairan dengan alat uji elektrolit. Nyalakan saklar dan amati terangnya lampu serta gelembung gas pada elektroda. Uji semua larutan untuk poin!
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
                Sebuah larutan diuji dengan alat uji elektrolit. Hasilnya lampu tidak menyala, tetapi terdapat sedikit gelembung gas pada elektroda. Kesimpulan yang paling tepat adalah larutan tersebut bersifat...
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Adanya sedikit gelembung gas menunjukkan bahwa masih ada sedikit daya hantar listrik, meskipun tidak cukup kuat untuk menyalakan lampu (atau menyala sangat redup). Ini adalah ciri khas dari <strong>Elektrolit Lemah</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Di antara larutan berikut yang dapat menyalakan lampu paling terang adalah... <br/>a. Glukosa (C₆H₁₂O₆) <br/>b. Asam Cuka (CH₃COOH) <br/>c. Asam Klorida (HCl)
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Lampu akan menyala paling terang jika larutan tersebut merupakan <strong>Elektrolit Kuat</strong> yang terionisasi sempurna. Glukosa adalah non-elektrolit, asam cuka elektrolit lemah. Asam Klorida (HCl) adalah asam kuat dan elektrolit kuat, sehingga jawabannya adalah <strong>c. Asam Klorida (HCl)</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lab Area */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[550px] flex flex-col">
          
          {showSuccess && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Simulasi Selesai!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Paham Elektrolit & Non-Elektrolit</p>
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah menguji berbagai sampel cair. Terangnya lampu dan banyaknya gelembung membuktikan sejauh mana zat-zat tersebut dapat terurai menjadi ion bebas pengantar listrik.
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set([SOLUTIONS[0].id])); setActiveSolution(SOLUTIONS[0]); setSwitchOn(false); }}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10 pt-4">
            
            {/* Electrical Circuit */}
            <div className="relative w-full max-w-[300px] h-[350px] flex flex-col items-center">
               
               {/* Lamp & Battery */}
               <div className="flex items-center justify-between w-[80%] border-t-4 border-l-4 border-r-4 border-gray-800 dark:border-gray-500 rounded-t-xl h-24 absolute top-0 z-10">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-900 p-2">
                     <Lightbulb 
                        className={`w-16 h-16 transition-all duration-300 ${
                          switchOn && activeSolution.brightness === 3 ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-pulse' :
                          switchOn && activeSolution.brightness === 1 ? 'text-yellow-600 fill-yellow-600/30 drop-shadow-[0_0_5px_rgba(202,138,4,0.5)]' :
                          'text-gray-400'
                        }`} 
                     />
                  </div>
                  
                  {/* Switch Mechanism */}
                  <button 
                    onClick={() => setSwitchOn(!switchOn)}
                    className={`absolute -right-[2px] top-8 w-12 h-6 flex items-center justify-center transition-all ${switchOn ? '-rotate-90 origin-left translate-y-3' : 'rotate-0'}`}
                  >
                     <div className="w-10 h-1.5 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors shadow-sm"></div>
                  </button>

                  <div className="absolute top-1/2 -translate-y-1/2 -left-8 bg-white dark:bg-gray-900 rotate-90 px-2 text-gray-500">
                     <Battery className="w-8 h-8 rotate-90" />
                  </div>
               </div>
               
               {/* Electrodes pointing down */}
               <div className="absolute top-24 left-[10%] w-[80%] h-32 flex justify-between px-[5px]">
                  <div className="w-4 h-full bg-slate-600 dark:bg-slate-400 border-l border-r border-slate-700 dark:border-slate-500 rounded-b-md z-20"></div>
                  <div className="w-4 h-full bg-slate-600 dark:bg-slate-400 border-l border-r border-slate-700 dark:border-slate-500 rounded-b-md z-20"></div>
               </div>

               {/* Beaker */}
               <div className="absolute bottom-0 w-48 h-48 z-10 mx-auto filter drop-shadow-lg">
                 <div className="absolute inset-0 border-4 border-b-[12px] border-white/40 dark:border-white/10 rounded-b-3xl rounded-t-lg z-30 pointer-events-none"></div>
                 <div className="absolute top-0 inset-x-4 h-2 bg-white/30 dark:bg-white/5 rounded-full z-30 pointer-events-none"></div>
                 
                 {/* Liquid */}
                 <div className={`absolute bottom-3 inset-x-2 h-36 rounded-b-2xl ${activeSolution.color} transition-colors duration-1000 overflow-hidden z-20`}>
                   
                   {/* Electrode tips submerged */}
                   <div className="absolute top-0 w-full h-full">
                      {/* Bubbles on Left Electrode */}
                      {renderBubbles('left')}
                      {/* Bubbles on Right Electrode */}
                      {renderBubbles('right')}
                   </div>

                 </div>
               </div>
               
            </div>
            
            <div className="mt-8 text-center bg-gray-50 dark:bg-gray-800/80 px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700">
               <div className="flex items-center gap-4 text-sm font-bold justify-center">
                  <span className={`px-3 py-1 rounded-md ${
                     switchOn && activeSolution.brightness === 3 ? 'bg-green-100 text-green-700' :
                     switchOn && activeSolution.brightness === 1 ? 'bg-yellow-100 text-yellow-700' :
                     'bg-gray-200 text-gray-500'
                  }`}>Lampu: {switchOn ? (activeSolution.brightness === 3 ? 'Terang' : activeSolution.brightness === 1 ? 'Redup' : 'Mati') : 'Off'}</span>
                  
                  <span className={`px-3 py-1 rounded-md ${
                     switchOn && activeSolution.bubbles > 0 ? 'bg-blue-100 text-blue-700' :
                     'bg-gray-200 text-gray-500'
                  }`}>Gelembung: {switchOn ? (activeSolution.bubbles > 10 ? 'Banyak' : activeSolution.bubbles > 0 ? 'Sedikit' : 'Tidak Ada') : 'Off'}</span>
               </div>
            </div>

          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center">
            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Saklar Listrik
            </h3>
            <p className="text-xs text-gray-500 mb-4">Hidupkan saklar untuk mengalirkan arus listrik DC dari baterai ke elektroda.</p>
            <button
               onClick={() => setSwitchOn(!switchOn)}
               className={`w-24 h-12 rounded-full relative transition-colors border-2 shadow-inner ${switchOn ? 'bg-green-500 border-green-600' : 'bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600'}`}
            >
               <div className={`absolute top-1 left-1 w-9 h-9 bg-white rounded-full shadow-md transition-transform flex items-center justify-center font-bold text-xs ${switchOn ? 'translate-x-12 text-green-600' : 'text-gray-500'}`}>
                  {switchOn ? 'ON' : 'OFF'}
               </div>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-emerald-500" />
              Pilih Cairan Uji
            </h3>
            
            <div className="grid gap-3">
              {SOLUTIONS.map(sol => {
                const isTested = tested.has(sol.id);
                const isActive = activeSolution.id === sol.id;
                
                return (
                  <button
                    key={sol.id}
                    onClick={() => handleTest(sol)}
                    className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50' 
                        : isTested
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div className="flex justify-between w-full mb-1">
                       <h4 className={`font-bold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}>
                         {sol.name} <span className="font-normal text-xs ml-1 opacity-70">({sol.formula})</span>
                       </h4>
                       <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                         {sol.type}
                       </span>
                    </div>
                    
                    {isActive && (
                      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 border-t border-emerald-200 dark:border-emerald-800/50 pt-3">
                        {sol.desc}
                      </div>
                    )}
                  </button>
                );
              })}
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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Elektrolit & Non-Elektrolit
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian Elektrolit</h4>
                <p>Larutan elektrolit adalah larutan yang dapat menghantarkan arus listrik karena zat terlarutnya terionisasi (membentuk ion-ion positif dan negatif) bebas bergerak di dalam air.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Hasil Uji Alat Elektrolit</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Elektrolit Kuat:</strong> Lampu menyala terang, gelembung gas banyak. (Contoh: Garam Dapur, Asam Kuat, Basa Kuat). Terionisasi sempurna (α ≈ 1).</li>
                  <li><strong>Elektrolit Lemah:</strong> Lampu menyala redup atau mati, gelembung gas sedikit. (Contoh: Asam Cuka, Air Seni). Terionisasi sebagian (0 &lt; α &lt; 1).</li>
                  <li><strong>Non-Elektrolit:</strong> Lampu mati, tidak ada gelembung gas. (Contoh: Gula, Urea, Alkohol). Tidak terionisasi (α = 0).</li>
                </ul>
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
