'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, Info, Star, Droplets, RefreshCw, BookOpen, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Solution = {
  id: string;
  name: string;
  type: 'acid' | 'base' | 'neutral';
  ph: number;
  color: string;
  desc: string;
};

const SOLUTIONS: Solution[] = [
  { id: 'hcl', name: 'Asam Klorida (HCl)', type: 'acid', ph: 1, color: 'bg-red-500/20', desc: 'Asam kuat yang terdapat dalam lambung.' },
  { id: 'ch3cooh', name: 'Asam Cuka (CH₃COOH)', type: 'acid', ph: 3, color: 'bg-orange-500/20', desc: 'Asam lemah yang biasa digunakan untuk memasak.' },
  { id: 'water', name: 'Air Murni (H₂O)', type: 'neutral', ph: 7, color: 'bg-blue-300/20', desc: 'Pelarut universal yang bersifat netral.' },
  { id: 'nh3', name: 'Amonia (NH₃)', type: 'base', ph: 11, color: 'bg-indigo-500/20', desc: 'Basa lemah, sering digunakan sebagai pembersih kaca.' },
  { id: 'naoh', name: 'Natrium Hidroksida (NaOH)', type: 'base', ph: 14, color: 'bg-purple-500/20', desc: 'Basa kuat yang digunakan dalam pembuatan sabun.' },
];

export default function AcidBaseModule() {
  const { addScore } = useUser();
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [litmusRed, setLitmusRed] = useState<'red' | 'blue' | null>(null);
  const [litmusBlue, setLitmusBlue] = useState<'red' | 'blue' | null>(null);
  const [dippingState, setDippingState] = useState<'idle' | 'dipping' | 'reacting'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleTest = (sol: Solution) => {
    setActiveSolution(sol);
    setLitmusRed(null);
    setLitmusBlue(null);
    setDippingState('idle');
    
    setTimeout(() => {
      setDippingState('dipping');
      
      setTimeout(() => {
        setDippingState('reacting');
        
        // Simulate litmus paper reaction
        if (sol.type === 'acid') {
          setLitmusRed('red');
          setLitmusBlue('red');
        } else if (sol.type === 'base') {
          setLitmusRed('blue');
          setLitmusBlue('blue');
        } else {
          setLitmusRed('red');
          setLitmusBlue('blue');
        }

        setTested(prev => {
          const next = new Set(prev).add(sol.id);
          if (next.size === SOLUTIONS.length && !showSuccess) {
            setTimeout(() => {
              setShowSuccess(true);
              addScore(100);
            }, 1000);
          }
          return next;
        });
      }, 700); // 700ms for dipping animation to finish
    }, 50); // Small delay to allow react to render idle state
  };

  const reset = () => {
    setActiveSolution(null);
    setLitmusRed(null);
    setLitmusBlue(null);
    setDippingState('idle');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Sifat Asam Basa
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Identifikasi Larutan dengan Indikator
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Uji berbagai larutan menggunakan Kertas Lakmus Merah dan Biru untuk mengidentifikasi sifat asam, basa, atau netral. Uji semua larutan untuk mendapatkan poin!
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
                Suatu larutan tidak diketahui dicelupkan kertas lakmus merah dan biru. Ternyata, lakmus merah tetap berwarna merah, sedangkan lakmus biru berubah menjadi merah. Apakah sifat larutan tersebut?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karena lakmus biru berubah menjadi merah, dan lakmus merah tetap merah, maka larutan tersebut bersifat <strong>Asam</strong>. Sifat asam selalu mengubah lakmus biru menjadi merah.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Menurut teori Brønsted-Lowry, apa yang membedakan asam dan basa dalam suatu reaksi kimia?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Menurut Brønsted-Lowry, <strong>Asam</strong> adalah zat yang mendonorkan proton (H⁺), sedangkan <strong>Basa</strong> adalah zat yang menerima proton (H⁺) dalam suatu reaksi.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lab Area */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[450px] flex flex-col">
          
          {showSuccess && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Praktikum Selesai!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Semua Larutan Teridentifikasi</p>
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah memahami bahwa Asam memerahkan lakmus, Basa membirukan lakmus, dan Netral tidak mengubah warna.
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set()); reset(); }}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center">
            {activeSolution ? (
              <div className="animate-in fade-in zoom-in duration-500 w-full flex flex-col items-center">
                
                {/* Beaker Representation */}
                <div className="relative w-40 h-48 mb-8 mt-4">
                  <div className="absolute inset-0 border-4 border-b-[12px] border-white/40 dark:border-white/10 rounded-b-3xl rounded-t-lg z-20 pointer-events-none"></div>
                  <div className="absolute top-0 inset-x-4 h-2 bg-white/30 dark:bg-white/5 rounded-full z-20 pointer-events-none"></div>
                  
                  {/* Litmus Papers (Outside liquid overflow to animate from top) */}
                  <div className="absolute inset-x-0 bottom-2 top-[-100px] flex justify-center z-10 pointer-events-none overflow-hidden">
                     <div className={`flex gap-4 pt-4 transition-transform duration-700 ease-in-out ${dippingState === 'idle' ? '-translate-y-[150px]' : 'translate-y-12'}`}>
                        {/* Red Litmus */}
                        <div className="w-4 h-40 rounded bg-red-400 shadow-sm relative overflow-hidden">
                           <div className={`absolute bottom-0 w-full transition-all duration-1000 ${dippingState === 'reacting' ? 'h-24' : 'h-0'} ${litmusRed === 'blue' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                        </div>
                        {/* Blue Litmus */}
                        <div className="w-4 h-40 rounded bg-blue-400 shadow-sm relative overflow-hidden">
                           <div className={`absolute bottom-0 w-full transition-all duration-1000 ${dippingState === 'reacting' ? 'h-24' : 'h-0'} ${litmusBlue === 'red' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                        </div>
                     </div>
                  </div>

                  {/* Liquid */}
                  <div className={`absolute bottom-2 inset-x-2 h-32 rounded-b-2xl ${activeSolution.color} transition-colors duration-1000 flex flex-col justify-end overflow-hidden z-0`}>
                    <div className="w-full h-2 bg-white/20 animate-pulse"></div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeSolution.name}</h3>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      activeSolution.type === 'acid' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                      activeSolution.type === 'base' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {activeSolution.type === 'acid' ? 'ASAM' : activeSolution.type === 'base' ? 'BASA' : 'NETRAL'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-sm font-bold">
                      pH: {activeSolution.ph}
                    </span>
                  </div>
                  
                  {/* Reaction Equation */}
                  <div className="mt-5 mb-2 bg-gray-50 dark:bg-gray-800/80 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-inner max-w-sm mx-auto">
                     <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1.5">Reaksi Ionisasi dalam Pelarut</span>
                     <div className="font-mono text-[13px] md:text-sm font-bold text-center text-gray-700 dark:text-gray-300">
                        {activeSolution.id === 'hcl' && <span><span className="text-gray-500 dark:text-gray-400">HCl(aq) → </span><span className="text-red-500">H⁺(aq)</span> + Cl⁻(aq)</span>}
                        {activeSolution.id === 'naoh' && <span><span className="text-gray-500 dark:text-gray-400">NaOH(aq) → </span>Na⁺(aq) + <span className="text-blue-500">OH⁻(aq)</span></span>}
                        {activeSolution.id === 'ch3cooh' && <span><span className="text-gray-500 dark:text-gray-400">CH₃COOH(aq) ⇌ </span><span className="text-red-500">H⁺(aq)</span> + CH₃COO⁻(aq)</span>}
                        {activeSolution.id === 'nh3' && <span><span className="text-gray-500 dark:text-gray-400">NH₃(aq) + H₂O(l) ⇌ </span>NH₄⁺(aq) + <span className="text-blue-500">OH⁻(aq)</span></span>}
                        {activeSolution.id === 'water' && <span><span className="text-gray-500 dark:text-gray-400">H₂O(l) ⇌ </span><span className="text-red-500">H⁺(aq)</span> + <span className="text-blue-500">OH⁻(aq)</span></span>}
                     </div>
                  </div>

                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm max-w-sm">
                    {activeSolution.desc}
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-600 flex flex-col items-center">
                <Beaker className="w-20 h-20 mb-4 opacity-50" />
                <p>Pilih larutan di panel samping untuk memulai uji lakmus.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={reset}
              disabled={!activeSolution}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" /> Cuci Gelas & Kertas Lakmus
            </button>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-emerald-500" />
              Rak Zat Kimia (Pilih Larutan)
            </h3>
            
            <div className="grid gap-3">
              {SOLUTIONS.map(sol => {
                const isTested = tested.has(sol.id);
                const isActive = activeSolution?.id === sol.id;
                
                return (
                  <button
                    key={sol.id}
                    onClick={() => handleTest(sol)}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50' 
                        : isTested
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div>
                      <h4 className={`font-semibold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {sol.name}
                      </h4>
                      {isTested && !isActive && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
                          ✓ Telah diuji
                        </span>
                      )}
                    </div>
                    <Beaker className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Konsep Arrhenius
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Menurut Svante Arrhenius (1884):
              <br/>• <strong>Asam</strong> melepaskan ion H⁺ dalam air.
              <br/>• <strong>Basa</strong> melepaskan ion OH⁻ dalam air.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-center">
              <div className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 p-2 rounded-lg">
                Asam → Lakmus Merah
              </div>
              <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 p-2 rounded-lg">
                Basa → Lakmus Biru
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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Teori Sifat Asam Basa
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Sifat Umum</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Asam:</strong> Terasa asam, korosif, pH &lt; 7, mengubah lakmus biru menjadi merah.</li>
                  <li><strong>Basa:</strong> Terasa pahit, licin, kaustik, pH &gt; 7, mengubah lakmus merah menjadi biru.</li>
                  <li><strong>Netral:</strong> pH = 7, tidak mengubah warna lakmus.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Teori Arrhenius</h4>
                <p>Asam melepaskan ion H⁺ di dalam air, sedangkan Basa melepaskan ion OH⁻ di dalam air.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Teori Brønsted-Lowry</h4>
                <p>Asam adalah donor (pemberi) proton (H⁺), dan Basa adalah akseptor (penerima) proton. Teori ini tidak terbatas pada pelarut air.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">4. Teori Lewis</h4>
                <p>Asam adalah akseptor (penerima) pasangan elektron, sedangkan Basa adalah donor (pemberi) pasangan elektron. Mencakup reaksi yang tidak melibatkan H⁺.</p>
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
