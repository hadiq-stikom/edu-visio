'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, GripHorizontal, Play } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function PolymerPropertiesModule() {
  const { addScore } = useUser();
  const [type, setType] = useState<'kristalin' | 'amorf'>('kristalin');
  const [pullForce, setPullForce] = useState(0); // 0 to 100
  const [isBroken, setIsBroken] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [testedTypes, setTestedTypes] = useState<Set<string>>(new Set());
  
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    if (pullForce > 20) {
      setTestedTypes(prev => new Set(prev).add(type));
    }

    if (type === 'kristalin' && pullForce > 80) {
      setIsBroken(true);
    }

    if (testedTypes.has('kristalin') && testedTypes.has('amorf') && !showSuccess) {
      setTimeout(() => {
        setShowSuccess(true);
        addScore(100);
      }, 1000);
    }
  }, [pullForce, type, testedTypes, showSuccess, addScore]);

  const reset = () => {
    setPullForce(0);
    setIsBroken(false);
  };

  const handleTypeSwitch = (t: 'kristalin' | 'amorf') => {
    setType(t);
    reset();
  };

  // Calculate stretch and visuals based on type
  // Kristalin: hard to stretch (small deformation), breaks at 80
  // Amorf: easy to stretch (large deformation), doesn't break easily up to 100
  const stretchAmount = type === 'kristalin' ? pullForce * 0.5 : pullForce * 2;
  const maxWidth = 300; // Base width
  const currentWidth = isBroken ? maxWidth : maxWidth + stretchAmount;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
          Uji Tarik Material
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Hubungan Struktur & Sifat Polimer
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Sifat fisik plastik dan karet sangat bergantung pada kerapian rantai molekulnya. Tarik sampel di bawah ini untuk melihat perbedaan antara struktur <strong>Kristalin (teratur)</strong> dan <strong>Amorf (acak)</strong>.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-cyan-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa karet gelang sangat elastis dan bisa kembali ke bentuk semula?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karena karet (poliisoprena) didominasi oleh struktur <strong>amorf (acak)</strong>. Rantai-rantainya kusut seperti benang. Saat ditarik, ikatan tersebut "terurai" dan memanjang, namun karena ada ikatan silang yang longgar, ia bisa kembali melipat (mengkerut) saat dilepas.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Plastik botol PET biasanya bening/transparan, sedangkan plastik galon air berwarna agak buram (opaque). Apa hubungannya dengan struktur polimer?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Polimer yang sangat teratur/rapat (<strong>kristalin</strong>) cenderung menyebarkan cahaya sehingga tampak buram/putih (opaque). Sebaliknya, polimer yang acak (<strong>amorf</strong>) membiarkan cahaya lewat begitu saja sehingga tampak bening/transparan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-4">
           
           <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Struktur Mikroskopis</h3>
              <div className="w-full flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
                <button 
                  onClick={() => handleTypeSwitch('kristalin')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${
                     type === 'kristalin' ? 'bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Kristalin
                </button>
                <button 
                  onClick={() => handleTypeSwitch('amorf')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${
                     type === 'amorf' ? 'bg-white dark:bg-gray-900 text-teal-600 dark:text-teal-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Amorf
                </button>
              </div>

              <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 mb-6">
                 {type === 'kristalin' ? (
                   <><strong>Sifat:</strong> Kaku, kuat, tidak mudah mulur, cenderung berwarna buram (opaque).<br/><strong>Contoh:</strong> HDPE, Pipa Paralon.</>
                 ) : (
                   <><strong>Sifat:</strong> Lentur, elastis, mudah ditarik, cenderung transparan bening.<br/><strong>Contoh:</strong> Karet, Plastik Bening (LDPE).</>
                 )}
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <GripHorizontal className="w-5 h-5 text-cyan-500" /> Tarik Sampel (Gaya)
              </h3>
              
              <div className="w-full px-2 mb-4">
                 <input 
                   type="range" 
                   min="0" 
                   max="100" 
                   value={pullForce}
                   onChange={(e) => setPullForce(parseInt(e.target.value))}
                   disabled={isBroken}
                   className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${isBroken ? 'bg-red-200 dark:bg-red-900/50 accent-red-500 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-700 accent-cyan-500'}`}
                 />
                 <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>0 N</span>
                    <span>100 N</span>
                 </div>
              </div>

              {isBroken && (
                 <div className="text-red-500 font-bold mb-4 animate-pulse">Material Patah / Putus!</div>
              )}

              <button 
                onClick={reset}
                className="mt-2 w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Sampel
              </button>
           </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 md:p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden min-h-[450px] flex flex-col items-center justify-center">
           
           {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-cyan-600/95 dark:bg-cyan-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Inspektur Material!</h3>
               <div className="bg-cyan-800/50 dark:bg-cyan-900/80 border border-cyan-400/50 p-4 rounded-xl text-cyan-50 max-w-md">
                 <p className="text-sm leading-relaxed mb-2">
                   Anda membuktikan bahwa struktur bergaris rapi (Kristalin) memberikan kekuatan ekstra namun kaku dan mudah patah jika ditarik keras. Sedangkan struktur acak (Amorf) dapat diregangkan jauh tanpa putus!
                 </p>
                 <span className="text-cyan-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); reset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-cyan-700 rounded-xl font-bold hover:bg-cyan-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
           )}

           <div className="absolute top-4 inset-x-0 text-center z-20">
              <span className={`inline-block px-4 py-2 rounded-xl border shadow-sm font-medium text-sm transition-colors ${
                 isBroken ? 'bg-red-100 text-red-700 border-red-200' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200'
              }`}>
                 {isBroken 
                   ? 'Sampel gagal menahan beban (Tension Failure).' 
                   : `Gaya Tarik: ${pullForce} N — Meregang: +${stretchAmount.toFixed(0)} mm`
                 }
              </span>
           </div>

           {/* Material Sample Visualizer */}
           <div className="relative w-full flex items-center justify-center mt-8">
              
              {/* Left Grip */}
              <div className="w-10 h-32 bg-gray-400 dark:bg-gray-600 rounded-l-lg border-2 border-r-0 border-gray-500 z-20 relative flex flex-col justify-around py-2">
                 <div className="h-2 bg-gray-500 w-full"></div>
                 <div className="h-2 bg-gray-500 w-full"></div>
                 <div className="h-2 bg-gray-500 w-full"></div>
                 {pullForce > 0 && <div className="absolute -left-12 font-bold text-gray-500">←</div>}
              </div>

              {/* The Material itself */}
              <div className={`relative h-24 transition-all duration-300 ease-linear border-y-4 border-gray-800/10 dark:border-gray-200/10 overflow-hidden flex items-center justify-center ${
                 isBroken ? 'opacity-0' : 'opacity-100'
              } ${
                 type === 'kristalin' ? 'bg-indigo-200 dark:bg-indigo-900/60' : 'bg-teal-200 dark:bg-teal-900/60'
              }`}
              style={{ width: `${currentWidth}px` }}
              >
                 {/* Internal chains rendering */}
                 {type === 'kristalin' && (
                    <div className="absolute inset-0 flex flex-col justify-between py-2 px-1">
                       {/* Ordered straight lines */}
                       {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-1 bg-indigo-500/50 w-full rounded-full"></div>
                       ))}
                    </div>
                 )}

                 {type === 'amorf' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                       {/* Tangled mess / SVG curves */}
                       <svg width="100%" height="100%" preserveAspectRatio="none">
                         <path d={`M 0,${20 + Math.sin(pullForce/10)*10} Q 50,${80 - pullForce/2} 100,${40} T 200,${60 + pullForce/3} T 300,${30} T ${currentWidth},${50}`} fill="none" stroke="currentColor" className="text-teal-600" strokeWidth="3" />
                         <path d={`M 0,${60 - Math.cos(pullForce/10)*10} Q 60,${10 + pullForce/2} 120,${50} T 220,${20 - pullForce/4} T 320,${70} T ${currentWidth},${40}`} fill="none" stroke="currentColor" className="text-teal-600" strokeWidth="3" />
                         <path d={`M 0,${40} Q 80,${80} 150,${20} T 250,${70} T 350,${30} T ${currentWidth},${60}`} fill="none" stroke="currentColor" className="text-teal-600" strokeWidth="2" />
                       </svg>
                    </div>
                 )}
              </div>

              {/* Broken state visual */}
              {isBroken && (
                 <div className="absolute w-[300px] h-24 flex items-center justify-between z-10 opacity-100">
                    <div className="w-[140px] h-full bg-indigo-200 dark:bg-indigo-900/60 rounded-r-3xl clip-broken-left flex flex-col justify-between py-2 px-1">
                       {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-1 bg-indigo-500/50 w-full rounded-full"></div>
                       ))}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 text-2xl animate-ping">⚡</div>
                    <div className="w-[140px] h-full bg-indigo-200 dark:bg-indigo-900/60 rounded-l-3xl clip-broken-right flex flex-col justify-between py-2 px-1">
                       {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="h-1 bg-indigo-500/50 w-full rounded-full"></div>
                       ))}
                    </div>
                 </div>
              )}

              {/* Right Grip */}
              <div className="w-10 h-32 bg-gray-400 dark:bg-gray-600 rounded-r-lg border-2 border-l-0 border-gray-500 z-20 relative flex flex-col justify-around py-2">
                 <div className="h-2 bg-gray-500 w-full"></div>
                 <div className="h-2 bg-gray-500 w-full"></div>
                 <div className="h-2 bg-gray-500 w-full"></div>
                 {pullForce > 0 && <div className="absolute -right-12 font-bold text-gray-500">→</div>}
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
                <BookOpen className="h-5 w-5 text-cyan-500" /> Sifat Fisik & Struktur
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Polimer Kristalin</h4>
                <p>Bagian polimer di mana rantai-rantainya tersusun sangat rapi, lurus, dan sejajar. Kerapatan yang tinggi ini membuat gaya antarmolekulnya maksimal.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li><strong>Sifat Fisik:</strong> Kaku, kuat (tensile strength tinggi), namun rapuh (mudah patah jika ditekuk/ditarik paksa melebihi batas).</li>
                  <li>Cahaya sulit menembus susunan yang rapat, sehingga tampak <strong>buram (opaque)</strong> atau putih.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Polimer Amorf</h4>
                <p>Bagian polimer di mana rantai-rantainya tidak teratur, kusut, dan acak seperti mi instan di dalam mangkuk.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
                  <li><strong>Sifat Fisik:</strong> Sangat fleksibel, lunak, dan dapat diregangkan dengan gaya kecil.</li>
                  <li>Cahaya mudah melewati celah-celah acaknya, sehingga umumnya tampak <strong>transparan (bening)</strong>.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Di Dunia Nyata</h4>
                <p>Sebagian besar plastik komersial bersifat <em>semi-kristalin</em>. Artinya, dalam satu plastik botol terdapat wilayah yang rapi (kristalin) untuk memberi kekuatan berdiri tegak, dan wilayah acak (amorf) agar tidak mudah pecah saat jatuh.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .clip-broken-left {
          clip-path: polygon(0 0, 100% 0, 80% 20%, 100% 40%, 80% 60%, 100% 80%, 75% 100%, 0 100%);
        }
        .clip-broken-right {
          clip-path: polygon(25% 0, 100% 0, 100% 100%, 0 100%, 20% 80%, 0% 60%, 20% 40%, 0% 20%);
        }
      `}} />
    </div>
  );
}
