'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Plus, Minus, Info } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const ALKANES = [
  { n: 1, name: 'Metana', formula: 'CH₄', state: 'Gas', bp: -164, uses: 'Bahan bakar gas (LNG)' },
  { n: 2, name: 'Etana', formula: 'C₂H₆', state: 'Gas', bp: -89, uses: 'Bahan baku industri petrokimia' },
  { n: 3, name: 'Propana', formula: 'C₃H₈', state: 'Gas', bp: -42, uses: 'LPG (Liquid Petroleum Gas)' },
  { n: 4, name: 'Butana', formula: 'C₄H₁₀', state: 'Gas', bp: -0.5, uses: 'Korek api gas, LPG' },
  { n: 5, name: 'Pentana', formula: 'C₅H₁₂', state: 'Cair', bp: 36, uses: 'Pelarut non-polar' },
  { n: 6, name: 'Heksana', formula: 'C₆H₁₄', state: 'Cair', bp: 69, uses: 'Pelarut ekstraksi minyak' },
  { n: 7, name: 'Heptana', formula: 'C₇H₁₆', state: 'Cair', bp: 98, uses: 'Komponen bensin' },
  { n: 8, name: 'Oktana', formula: 'C₈H₁₈', state: 'Cair', bp: 125, uses: 'Standar oktan bensin' },
  { n: 9, name: 'Nonana', formula: 'C₉H₂₀', state: 'Cair', bp: 151, uses: 'Bahan bakar diesel' },
  { n: 10, name: 'Dekana', formula: 'C₁₀H₂₂', state: 'Cair', bp: 174, uses: 'Pelarut industri' },
];

export default function CarbonChainModule() {
  const { addScore } = useUser();
  const [chainLength, setChainLength] = useState(1);
  const alkane = ALKANES[chainLength - 1];
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<number>>(new Set([1]));
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleChange = (delta: number) => {
    const newLen = Math.max(1, Math.min(10, chainLength + delta));
    setChainLength(newLen);
    
    setTested(prev => {
      const next = new Set(prev).add(newLen);
      // Give reward if they reached Decane (n=10)
      if (next.has(10) && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 800);
      }
      return next;
    });
  };

  const renderMolecule = () => {
    // Generate C atoms
    const carbons = Array.from({ length: chainLength });
    
    return (
      <div className="relative flex items-center justify-center p-8 max-w-full overflow-x-auto min-h-[250px]">
         <div className="flex items-center">
            {carbons.map((_, i) => (
              <div key={`c-${i}`} className="relative flex items-center">
                 {/* Left Bond (if not first) */}
                 {i > 0 && <div className="w-8 h-1.5 bg-gray-400 dark:bg-gray-600 rounded-full z-0 -mx-1"></div>}
                 
                 {/* Carbon Atom */}
                 <div className="w-14 h-14 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10 relative">
                    <span className="text-white font-bold text-xl drop-shadow-md">C</span>
                    
                    {/* Top H */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                       <div className="w-1 h-5 bg-gray-400 dark:bg-gray-600 mb-1 z-0"></div>
                       <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-600 flex items-center justify-center border-2 border-cyan-700 shadow-md z-10">
                          <span className="text-white font-bold text-xs">H</span>
                       </div>
                    </div>

                    {/* Bottom H */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                       <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-600 flex items-center justify-center border-2 border-cyan-700 shadow-md z-10">
                          <span className="text-white font-bold text-xs">H</span>
                       </div>
                       <div className="w-1 h-5 bg-gray-400 dark:bg-gray-600 mt-1 z-0"></div>
                    </div>

                    {/* Left H (only for first C) */}
                    {i === 0 && (
                      <div className="absolute top-1/2 -left-12 -translate-y-1/2 flex items-center">
                         <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-600 flex items-center justify-center border-2 border-cyan-700 shadow-md z-10">
                            <span className="text-white font-bold text-xs">H</span>
                         </div>
                         <div className="w-5 h-1 bg-gray-400 dark:bg-gray-600 ml-1 z-0"></div>
                      </div>
                    )}

                    {/* Right H (only for last C) */}
                    {i === chainLength - 1 && (
                      <div className="absolute top-1/2 -right-12 -translate-y-1/2 flex items-center">
                         <div className="w-5 h-1 bg-gray-400 dark:bg-gray-600 mr-1 z-0"></div>
                         <div className="w-8 h-8 rounded-full bg-cyan-500 dark:bg-cyan-600 flex items-center justify-center border-2 border-cyan-700 shadow-md z-10">
                            <span className="text-white font-bold text-xs">H</span>
                         </div>
                      </div>
                    )}
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Gugus Fungsi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Rantai Karbon (Alkana)
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Senyawa organik dibangun oleh atom Karbon (C) yang dapat berikatan membentuk rantai panjang. Mari lihat bagaimana penambahan atom Karbon memengaruhi sifat fisik (wujud dan titik didih) senyawa Alkana.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-sm font-semibold rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-amber-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa titik didih heksana (C₆H₁₄) lebih tinggi dibandingkan metana (CH₄)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Semakin panjang rantai karbon (semakin besar massa molekul relatif/Mr), semakin kuat gaya dispersi London antar molekulnya. Gaya antarmolekul yang kuat membutuhkan energi (panas) lebih besar untuk diputuskan, sehingga titik didihnya meningkat.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa wujud propana pada suhu ruang (25°C)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Propana memiliki rantai C sebanyak 3. Alkana dengan jumlah C₁ - C₄ pada suhu ruang berwujud <strong>gas</strong>. Titik didih propana adalah -42°C, yang jauh di bawah suhu ruang, sehingga ia mendidih dan menjadi gas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        
        {/* Controls (Left) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-center">Atur Panjang Rantai</h3>
            
            <div className="flex items-center gap-4">
               <button 
                 onClick={() => handleChange(-1)}
                 disabled={chainLength === 1}
                 className="w-12 h-12 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/40 dark:text-red-400 dark:hover:bg-red-900/60 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
               >
                 <Minus className="w-6 h-6" />
               </button>
               <div className="text-3xl font-black text-gray-900 dark:text-white w-12 text-center">
                 {chainLength}
               </div>
               <button 
                 onClick={() => handleChange(1)}
                 disabled={chainLength === 10}
                 className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
               >
                 <Plus className="w-6 h-6" />
               </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4 font-mono">Atom Karbon (C)</p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2 text-sm">
              <Info className="w-4 h-4" /> Pola Rumus Alkana
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 text-center font-bold font-mono py-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
               C<sub>n</sub>H<sub>2n+2</sub>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 text-center">
               Jumlah atom Hidrogen selalu sama dengan dua kali jumlah atom Karbon ditambah dua.
            </p>
          </div>
        </div>

        {/* Visualizer (Right) */}
        <div className="lg:col-span-3 space-y-4">
           {/* Info Cards */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col justify-center shadow-sm">
                 <span className="text-xs text-gray-500 mb-1">Nama IUPAC</span>
                 <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{alkane.name}</span>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col justify-center shadow-sm">
                 <span className="text-xs text-gray-500 mb-1">Rumus Molekul</span>
                 <span className="font-bold text-lg text-gray-800 dark:text-gray-200 font-mono">
                    C<sub>{chainLength > 1 ? chainLength : ''}</sub>H<sub>{chainLength * 2 + 2}</sub>
                 </span>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col justify-center shadow-sm">
                 <span className="text-xs text-gray-500 mb-1">Wujud (25°C)</span>
                 <span className={`font-bold text-lg ${alkane.state === 'Gas' ? 'text-cyan-500' : 'text-blue-500'}`}>
                    {alkane.state}
                 </span>
              </div>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col justify-center shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 opacity-10">
                    <svg className="w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.5,14C12,14 12,12.5 12,12.5C12,12.5 12,14 9.5,14C7,14 7,12.5 7,12.5C7,12.5 7,14 4.5,14C2,14 2,12.5 2,12.5V11.5L5,6.5H19L22,11.5V12.5C22,12.5 22,14 19.5,14C17,14 17,12.5 17,12.5C17,12.5 17,14 14.5,14M6.8,7.5L4.8,11.5H19.2L17.2,7.5H6.8Z" /></svg>
                 </div>
                 <span className="text-xs text-gray-500 mb-1 relative z-10">Titik Didih</span>
                 <span className="font-bold text-lg text-red-500 relative z-10">{alkane.bp} °C</span>
              </div>
           </div>

           {/* Canvas */}
           <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden flex flex-col min-h-[400px]">
              
              {showSuccess && (
                <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
                  <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Rantai Terpanjang!</h3>
                  <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                    <p className="font-bold text-lg mb-2">Penjelajah Karbon</p>
                    <p className="text-sm leading-relaxed mb-2">
                      Anda telah menambahkan karbon hingga menjadi Dekana (C₁₀). Anda juga mengamati bahwa wujud alkana berubah dari gas menjadi cair seiring bertambah panjangnya rantai.
                    </p>
                    <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
                  </div>
                  <button 
                    onClick={() => setShowSuccess(false)}
                    className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
                  >
                    Lanjutkan Eksplorasi
                  </button>
                </div>
              )}

              <div className="flex-1 flex flex-col justify-center items-center relative z-10 w-full overflow-hidden">
                 
                 {/* Visualizer Background */}
                 <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 -z-10"></div>
                 
                 {/* Draggable/Scrollable area for long chains */}
                 <div className="w-full h-full flex items-center justify-center overflow-x-auto pb-4 custom-scrollbar">
                    {renderMolecule()}
                 </div>

              </div>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm">
                 <div>
                    <span className="text-gray-500 dark:text-gray-400 block mb-1">Kegunaan Umum:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{alkane.uses}</span>
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
                <BookOpen className="h-5 w-5 text-amber-500" /> Sifat Fisik Senyawa Karbon
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Keistimewaan Atom Karbon</h4>
                <p>Atom karbon (C) memiliki 4 elektron valensi. Keempat elektron ini memungkinkannya membentuk ikatan kovalen tunggal, rangkap dua, maupun rangkap tiga dengan atom karbon lain membentuk **rantai karbon** yang sangat panjang.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Alkana (C<sub>n</sub>H<sub>2n+2</sub>)</h4>
                <p>Alkana adalah hidrokarbon alifatik jenuh (semua ikatan rantai C-C adalah tunggal). Setiap atom karbon mengikat atom hidrogen secara maksimal.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Sifat Fisik dan Panjang Rantai</h4>
                <p>Sifat fisik alkana sangat bergantung pada panjang rantainya (jumlah atom C):</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Titik Didih:</strong> Semakin panjang rantai C, massa molekul relatif (Mr) semakin besar. Akibatnya, gaya tarik Van der Waals antarmolekul semakin kuat sehingga titik didih dan titik lelehnya **meningkat**.</li>
                  <li><strong>Wujud Zat (Suhu Ruang):</strong><br/>C₁ - C₄ berwujud **Gas** (misal: gas LPG)<br/>C₅ - C₁₇ berwujud **Cair** (misal: bensin, solar)<br/>C₁₈ ke atas berwujud **Padat** (misal: aspal, lilin).</li>
                </ul>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
           height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
           background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
           background-color: #cbd5e1;
           border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
           background-color: #334155;
        }
      `}} />
    </div>
  );
}
