'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, Info, Star, Droplets, RefreshCw, BookOpen, X, ChevronDown, ChevronUp, Activity } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Ion = { type: string, count: number, color: string };

type Solution = {
  id: string;
  name: string;
  type: 'strong-acid' | 'weak-acid' | 'neutral' | 'weak-base' | 'strong-base';
  concentration: string;
  ph: number;
  color: string;
  desc: string;
  ions: Ion[];
};

const SOLUTIONS: Solution[] = [
  { 
    id: 'hcl', name: 'Asam Klorida (HCl)', type: 'strong-acid', concentration: '0.1 M', ph: 1.0, color: 'bg-red-500/20', 
    desc: 'Asam kuat, terionisasi sempurna (α = 1) menghasilkan banyak ion H⁺.',
    ions: [ { type: 'H⁺', count: 12, color: 'bg-red-500 text-white' }, { type: 'Cl⁻', count: 12, color: 'bg-slate-400 text-white' } ]
  },
  { 
    id: 'ch3cooh', name: 'Asam Cuka (CH₃COOH)', type: 'weak-acid', concentration: '0.1 M', ph: 2.9, color: 'bg-orange-500/20', 
    desc: 'Asam lemah, terionisasi sebagian (α < 1) menghasilkan sedikit ion H⁺.',
    ions: [ { type: 'H⁺', count: 3, color: 'bg-red-500 text-white' }, { type: 'CH₃COO⁻', count: 3, color: 'bg-orange-400 text-white' }, { type: 'CH₃COOH', count: 9, color: 'bg-slate-200 text-slate-700' } ]
  },
  { 
    id: 'water', name: 'Air Murni (H₂O)', type: 'neutral', concentration: '-', ph: 7.0, color: 'bg-blue-300/20', 
    desc: 'Netral, konsentrasi H⁺ dan OH⁻ sangat kecil dan seimbang.',
    ions: [ { type: 'H⁺', count: 1, color: 'bg-red-500 text-white' }, { type: 'OH⁻', count: 1, color: 'bg-blue-500 text-white' }, { type: 'H₂O', count: 12, color: 'bg-slate-200 text-slate-700' } ]
  },
  { 
    id: 'nh3', name: 'Amonia (NH₃)', type: 'weak-base', concentration: '0.1 M', ph: 11.1, color: 'bg-indigo-500/20', 
    desc: 'Basa lemah, terionisasi sebagian menghasilkan sedikit ion OH⁻.',
    ions: [ { type: 'OH⁻', count: 3, color: 'bg-blue-500 text-white' }, { type: 'NH₄⁺', count: 3, color: 'bg-indigo-400 text-white' }, { type: 'NH₃', count: 9, color: 'bg-slate-200 text-slate-700' } ]
  },
  { 
    id: 'naoh', name: 'Natrium Hidroksida (NaOH)', type: 'strong-base', concentration: '0.1 M', ph: 13.0, color: 'bg-purple-500/20', 
    desc: 'Basa kuat, terionisasi sempurna (α = 1) menghasilkan banyak ion OH⁻.',
    ions: [ { type: 'OH⁻', count: 12, color: 'bg-blue-500 text-white' }, { type: 'Na⁺', count: 12, color: 'bg-purple-400 text-white' } ]
  },
];

export default function PhStrengthModule() {
  const { addScore } = useUser();
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const [phReading, setPhReading] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [probeDipped, setProbeDipped] = useState(false);

  const handleTest = (sol: Solution) => {
    setActiveSolution(sol);
    setProbeDipped(false);
    setPhReading(null);
    
    // Simulate dipping the pH meter probe
    setTimeout(() => {
      setProbeDipped(true);
      setTimeout(() => {
        setPhReading(sol.ph);
        
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
      }, 800);
    }, 100);
  };

  const reset = () => {
    setActiveSolution(null);
    setProbeDipped(false);
    setPhReading(null);
  };

  // Generate particles for the beaker
  const getParticles = () => {
    if (!activeSolution) return [];
    let particles: React.JSX.Element[] = [];
    activeSolution.ions.forEach((ion, index) => {
      for (let i = 0; i < ion.count; i++) {
        // Random positions within the liquid
        const left = 10 + Math.random() * 80; // 10% to 90%
        const top = 10 + Math.random() * 80;
        // Small random animation delay
        const delay = Math.random() * 2;
        particles.push(
          <div 
            key={`${ion.type}-${i}`}
            className={`absolute rounded-full flex items-center justify-center font-bold text-[8px] shadow-sm animate-bounce ${ion.color}`}
            style={{ 
              left: `${left}%`, top: `${top}%`, 
              width: '1.25rem', height: '1.25rem',
              animationDuration: `${2 + Math.random()}s`,
              animationDelay: `${delay}s`
            }}
          >
            {ion.type.replace('⁺', '').replace('⁻', '')}
            {ion.type.includes('⁺') && <span className="absolute -top-1 -right-1 text-[6px]">⁺</span>}
            {ion.type.includes('⁻') && <span className="absolute -top-1 -right-1 text-[6px]">⁻</span>}
          </div>
        );
      }
    });
    return particles;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi pH & Ionisasi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Kekuatan Asam Basa & Derajat pH
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Ukur pH berbagai larutan dan amati perbedaan jumlah ion yang dihasilkan antara asam/basa kuat dan lemah. Uji semua larutan untuk menyelesaikan praktikum!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-blue-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Berapakah pH larutan HCl 0,01 M? (Diketahui HCl adalah asam kuat)
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  HCl adalah asam kuat valensi 1. <br/>
                  [H⁺] = M × valensi = 0,01 × 1 = 10⁻² M <br/>
                  pH = -log[H⁺] = -log(10⁻²) = <strong>2</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Tentukan pH larutan CH₃COOH 0,1 M jika diketahui tetapan ionisasi asam (Ka) = 10⁻⁵!
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  CH₃COOH adalah asam lemah. <br/>
                  [H⁺] = √(Ka × M) = √(10⁻⁵ × 10⁻¹) = √(10⁻⁶) = 10⁻³ M <br/>
                  pH = -log[H⁺] = -log(10⁻³) = <strong>3</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lab Area */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col">
          
          {showSuccess && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-blue-600/95 dark:bg-blue-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Praktikum Selesai!</h3>
              <div className="bg-blue-800/50 dark:bg-blue-900/80 border border-blue-400/50 p-4 rounded-xl text-blue-50 max-w-md">
                <p className="font-bold text-lg mb-2">Konsep Kekuatan Ionisasi Terpahami</p>
                <p className="text-sm leading-relaxed mb-2">
                  Kamu telah membandingkan kekuatan asam/basa kuat yang terionisasi sempurna dengan asam/basa lemah yang terionisasi sebagian!
                </p>
                <span className="text-blue-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set()); reset(); }}
                className="mt-6 px-6 py-2.5 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center mt-8">
            {activeSolution ? (
              <div className="animate-in fade-in zoom-in duration-500 w-full flex flex-col items-center">
                
                {/* pH Meter Display (Digital) */}
                <div className="bg-gray-800 dark:bg-black rounded-xl p-4 border-4 border-gray-700 shadow-xl mb-4 w-48 relative z-20 flex flex-col items-center">
                   <div className="text-xs text-gray-400 font-mono mb-1 uppercase tracking-widest">pH Meter Pro</div>
                   <div className="bg-emerald-100 dark:bg-emerald-900/30 inset-shadow-sm rounded border border-emerald-300 dark:border-emerald-700/50 w-full p-2 text-center font-mono text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                     {phReading !== null ? phReading.toFixed(2) : '-.--'}
                   </div>
                   
                   {/* Probe Wire going down */}
                   <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-2 h-16 bg-gray-600 rounded-t z-0"></div>
                </div>

                {/* Beaker with Probe & Ions */}
                <div className="relative w-48 h-56 mb-8 mt-6">
                  {/* The Beaker Glass */}
                  <div className="absolute inset-0 border-4 border-b-[14px] border-white/40 dark:border-white/10 rounded-b-3xl rounded-t-lg z-10 pointer-events-none"></div>
                  <div className="absolute top-0 inset-x-4 h-2 bg-white/30 dark:bg-white/5 rounded-full z-10"></div>
                  
                  {/* The Probe tip dipped into liquid */}
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-6 transition-all duration-700 ease-in-out z-10 flex justify-center ${probeDipped ? 'h-48' : 'h-16'}`}>
                     <div className="w-3 bg-gray-700 h-full rounded-b-full"></div>
                     <div className="absolute bottom-1 w-1.5 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Liquid */}
                  <div className={`absolute bottom-2 inset-x-2 h-40 rounded-b-2xl ${activeSolution.color} transition-colors duration-1000 overflow-hidden`}>
                    <div className="w-full h-3 bg-white/20 animate-pulse"></div>
                    
                    {/* Floating Ions inside liquid */}
                    {probeDipped && (
                       <div className="absolute inset-0 z-0 animate-in fade-in duration-1000">
                         {getParticles()}
                       </div>
                    )}
                  </div>
                </div>

                <div className="text-center w-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{activeSolution.name}</h3>
                  <div className="flex items-center justify-center gap-3 mt-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      activeSolution.type.includes('acid') ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400' :
                      activeSolution.type.includes('base') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {activeSolution.type === 'strong-acid' ? 'ASAM KUAT' : 
                       activeSolution.type === 'weak-acid' ? 'ASAM LEMAH' : 
                       activeSolution.type === 'strong-base' ? 'BASA KUAT' :
                       activeSolution.type === 'weak-base' ? 'BASA LEMAH' : 'NETRAL'}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 text-sm font-bold">
                      [{activeSolution.concentration}]
                    </span>
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl text-sm text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
                    <p><strong>Analisis Mikroskopis:</strong> {activeSolution.desc}</p>
                    <div className="mt-2 flex flex-wrap justify-center gap-2">
                       {activeSolution.ions.map(ion => (
                         <span key={ion.type} className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 px-2.5 py-1 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 font-mono text-gray-800 dark:text-gray-200">
                           <span className={`w-3 h-3 rounded-full ${ion.color.split(' ')[0]}`}></span>
                           {ion.type}: {Math.round((ion.count / activeSolution.ions.reduce((a,b)=>a+b.count,0)) * 100)}%
                         </span>
                       ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-400 dark:text-gray-600 flex flex-col items-center mt-12">
                <Activity className="w-24 h-24 mb-6 opacity-30" />
                <p className="text-lg">Siapkan pH meter dan pilih larutan<br/>di rak zat kimia untuk diuji.</p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button 
              onClick={reset}
              disabled={!activeSolution}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" /> Cuci Gelas & Probe
            </button>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              Rak Zat Kimia (0.1 M)
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
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:border-blue-500/50' 
                        : isTested
                          ? 'border-blue-200 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-blue-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-700'
                    }`}
                  >
                    <div>
                      <h4 className={`font-semibold ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
                        {sol.name}
                      </h4>
                      {isTested && !isActive && (
                        <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-1 mt-1">
                          ✓ Telah diuji (pH {sol.ph.toFixed(1)})
                        </span>
                      )}
                    </div>
                    <Beaker className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Derajat Ionisasi (α)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Kekuatan asam dan basa ditentukan oleh kemampuannya terionisasi (terurai menjadi ion-ion) di dalam air.
            </p>
            <div className="space-y-2 text-xs font-medium">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">Asam/Basa Kuat</span>
                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded font-bold">α = 1 (100%)</span>
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-xl flex items-center justify-between">
                <span className="text-gray-800 dark:text-gray-200">Asam/Basa Lemah</span>
                <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded font-bold">0 &lt; α &lt; 1</span>
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
                <BookOpen className="h-5 w-5 text-blue-500" /> Teori Kekuatan & pH
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Skala pH</h4>
                <p>
                  pH adalah ukuran keasaman suatu larutan, yang didefinisikan sebagai logaritma negatif dari konsentrasi ion hidrogen:
                  <br/><br/>
                  <code className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded font-bold text-blue-600 dark:text-blue-400">pH = -log [H⁺]</code>
                  <br/><br/>
                  Skala pH berkisar dari 0 (sangat asam) hingga 14 (sangat basa), dengan pH 7 sebagai titik netral.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Asam dan Basa Kuat</h4>
                <p>
                  Zat yang terionisasi sempurna (100%) dalam air. Karena terurai seluruhnya, konsentrasi ion (H⁺ atau OH⁻) sama dengan konsentrasi awal zat dikali valensinya.
                  <br/>Contoh Asam Kuat: HCl, H₂SO₄, HNO₃.
                  <br/>Contoh Basa Kuat: NaOH, KOH, Ba(OH)₂.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Asam dan Basa Lemah</h4>
                <p>
                  Zat yang hanya terionisasi sebagian dalam air (membentuk reaksi kesetimbangan). Konsentrasi ionnya jauh lebih kecil dari konsentrasi awal zat, dan dihitung menggunakan tetapan ionisasi (Ka atau Kb).
                  <br/><br/>
                  <code className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded font-bold text-blue-600 dark:text-blue-400">[H⁺] = √(Ka × M)</code>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">4. Derajat Ionisasi (α)</h4>
                <p>
                  Rasio jumlah molekul yang terionisasi terhadap jumlah molekul mula-mula.
                  <br/>
                  α = 1 (Kuat), α &lt; 1 (Lemah).
                </p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
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
