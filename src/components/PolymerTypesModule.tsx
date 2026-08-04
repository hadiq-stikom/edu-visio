'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Thermometer, Flame } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function PolymerTypesModule() {
  const { addScore } = useUser();
  const [temperature, setTemperature] = useState(25); // Celsius
  const [type, setType] = useState<'termoplastik' | 'termoseting'>('termoplastik');
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set());
  
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    // Check achievements
    if (temperature > 150 && type === 'termoplastik') {
      setTested(prev => new Set(prev).add('termoplastik_melt'));
    }
    if (temperature > 300 && type === 'termoseting') {
      setTested(prev => new Set(prev).add('termoseting_burn'));
    }
    
    if (tested.has('termoplastik_melt') && tested.has('termoseting_burn') && !showSuccess) {
      setTimeout(() => {
        setShowSuccess(true);
        addScore(100);
      }, 1000);
    }
  }, [temperature, type, showSuccess, tested, addScore]);

  const reset = () => {
    setTemperature(25);
  };

  const getStatusText = () => {
    if (type === 'termoplastik') {
      if (temperature < 100) return 'Wujud Padat Kaku (Gaya antarmolekul kuat)';
      if (temperature < 200) return 'Melunak (Gaya antarmolekul mulai melemah)';
      return 'Meleleh (Rantai polimer bebas bergerak)';
    } else {
      if (temperature < 250) return 'Wujud Padat Sangat Kaku (Ikatan silang / cross-link kuat)';
      if (temperature < 350) return 'Tetap Padat Kaku (Tidak meleleh)';
      return 'Hangus/Terdekomposisi (Ikatan kovalen terputus karena panas berlebih)';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
          Laboratorium Termal
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Jenis Polimer Berdasarkan Sifat Termal
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Pernahkah Anda bertanya mengapa botol plastik meleleh jika dibakar, tapi gagang panci tidak? Mari uji sifat termal polimer Termoplastik dan Termoseting dengan memanaskannya!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400 text-sm font-semibold rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-pink-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa bahan pembuat colokan listrik (stopkontak) menggunakan plastik jenis termoseting (seperti Bakelit), bukan termoplastik?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-pink-600 dark:text-pink-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karena colokan listrik sering menghantarkan arus listrik yang dapat menimbulkan panas. <strong>Termoseting tahan panas dan tidak akan meleleh</strong>, melainkan hanya akan hangus jika suhu ekstrem, sehingga mencegah terjadinya korsleting akibat lelehan plastik.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Bagaimana perbedaan struktur mikroskopis antara termoplastik dan termoseting memengaruhi sifat daur ulangnya?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-pink-600 dark:text-pink-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Termoplastik memiliki rantai lurus yang hanya diikat oleh gaya antarmolekul lemah, sehingga dapat dilelehkan dan dicetak ulang (mudah didaur ulang). Sebaliknya, termoseting memiliki <strong>ikatan silang kovalen (cross-link)</strong> antar rantainya, yang membuatnya menjadi satu struktur jaring 3D raksasa yang tidak bisa dilelehkan ulang.
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
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Pilih Jenis Polimer</h3>
              <div className="w-full flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-6">
                <button 
                  onClick={() => { setType('termoplastik'); setTemperature(25); }}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${
                     type === 'termoplastik' ? 'bg-white dark:bg-gray-900 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Termoplastik
                </button>
                <button 
                  onClick={() => { setType('termoseting'); setTemperature(25); }}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${
                     type === 'termoseting' ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Termoseting
                </button>
              </div>

              <div className="w-full bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 mb-6">
                 {type === 'termoplastik' ? (
                   <>Contoh: <strong>Polietilena (PE), PVC</strong>.<br/>Digunakan untuk kantong plastik, pipa, botol minuman.</>
                 ) : (
                   <>Contoh: <strong>Bakelit, Melamin</strong>.<br/>Digunakan untuk piring tahan pecah, gagang panci, saklar listrik.</>
                 )}
              </div>

              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <Thermometer className="w-5 h-5 text-red-500" /> Panaskan (Suhu)
              </h3>
              
              <div className="w-full px-2">
                 <input 
                   type="range" 
                   min="25" 
                   max="400" 
                   step="5"
                   value={temperature}
                   onChange={(e) => setTemperature(parseInt(e.target.value))}
                   className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                 />
                 <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
                    <span>25°C</span>
                    <span>400°C</span>
                 </div>
              </div>

              <div className="text-4xl font-black text-gray-900 dark:text-white mt-6 font-mono flex items-center gap-2">
                 {temperature}°C
                 {temperature > 200 && <Flame className="w-8 h-8 text-orange-500 animate-pulse" />}
              </div>

              <button 
                onClick={reset}
                className="mt-6 w-full py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors font-bold flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Suhu
              </button>
           </div>
        </div>

        {/* Visualizer Area */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[450px] flex flex-col items-center">
           
           {showSuccess && (
             <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-pink-600/95 dark:bg-pink-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
               <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
               <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Eksperimen Panas!</h3>
               <div className="bg-pink-800/50 dark:bg-pink-900/80 border border-pink-400/50 p-4 rounded-xl text-pink-50 max-w-md">
                 <p className="text-sm leading-relaxed mb-2">
                   Luar biasa! Anda mengamati bahwa Termoplastik meleleh dan dapat dicetak ulang karena tidak ada ikatan kovalen antar rantainya. Sementara Termoseting bertahan kuat karena ikatan silang (cross-link) hingga akhirnya hangus pada suhu sangat tinggi!
                 </p>
                 <span className="text-pink-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
               </div>
               <button 
                 onClick={() => { setShowSuccess(false); reset(); }}
                 className="mt-6 px-6 py-2.5 bg-white text-pink-700 rounded-xl font-bold hover:bg-pink-50 transition-colors"
               >
                 Tutup
               </button>
             </div>
           )}

           <div className="w-full text-center z-20 mb-8">
              <span className={`inline-block px-4 py-2 rounded-xl border shadow-sm font-medium text-sm transition-colors ${
                 temperature >= 350 && type === 'termoseting' ? 'bg-black text-white border-gray-800' :
                 temperature >= 200 && type === 'termoplastik' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200'
              }`}>
                 Status Makroskopis: <strong>{getStatusText()}</strong>
              </span>
           </div>

           {/* Microscopic View Canvas */}
           <div className="relative w-full h-[300px] bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 overflow-hidden flex items-center justify-center">
              <span className="absolute top-3 left-3 text-xs font-bold text-gray-400 z-10">Tampilan Mikroskopis</span>
              
              <div className="relative w-[300px] h-[200px]">
                 
                 {/* THERMOPLASTIC */}
                 {type === 'termoplastik' && (
                    <div className="absolute inset-0">
                       {/* Line 1 */}
                       <div className="absolute top-[40px] left-0 right-0 h-4 bg-pink-500 rounded-full transition-all duration-300"
                            style={{ 
                               transform: `translateY(${temperature > 150 ? Math.sin(temperature) * 20 : 0}px) 
                                           rotate(${temperature > 200 ? 5 : 0}deg) 
                                           scaleY(${temperature > 200 ? 0.8 : 1})`,
                               opacity: temperature > 250 ? 0.6 : 1,
                               filter: temperature > 200 ? 'blur(2px)' : 'none'
                            }}>
                       </div>
                       
                       {/* Line 2 */}
                       <div className="absolute top-[100px] left-0 right-0 h-4 bg-pink-500 rounded-full transition-all duration-300"
                            style={{ 
                               transform: `translateY(${temperature > 150 ? Math.cos(temperature) * 20 : 0}px) 
                                           rotate(${temperature > 200 ? -8 : 0}deg)
                                           scaleY(${temperature > 200 ? 0.8 : 1})`,
                               opacity: temperature > 250 ? 0.6 : 1,
                               filter: temperature > 200 ? 'blur(2px)' : 'none'
                            }}>
                       </div>
                       
                       {/* Line 3 */}
                       <div className="absolute top-[160px] left-0 right-0 h-4 bg-pink-500 rounded-full transition-all duration-300"
                            style={{ 
                               transform: `translateY(${temperature > 150 ? Math.sin(temperature + 45) * 20 : 0}px) 
                                           rotate(${temperature > 200 ? 10 : 0}deg)
                                           scaleY(${temperature > 200 ? 0.8 : 1})`,
                               opacity: temperature > 250 ? 0.6 : 1,
                               filter: temperature > 200 ? 'blur(2px)' : 'none'
                            }}>
                       </div>

                       {/* Intermolecular forces (dashed lines) */}
                       <div className={`absolute inset-0 transition-opacity duration-300 ${temperature > 150 ? 'opacity-0' : 'opacity-100'}`}>
                          <div className="absolute top-[56px] left-[50px] w-0.5 h-[44px] border-l-2 border-dashed border-gray-400"></div>
                          <div className="absolute top-[56px] left-[150px] w-0.5 h-[44px] border-l-2 border-dashed border-gray-400"></div>
                          <div className="absolute top-[56px] left-[250px] w-0.5 h-[44px] border-l-2 border-dashed border-gray-400"></div>

                          <div className="absolute top-[116px] left-[100px] w-0.5 h-[44px] border-l-2 border-dashed border-gray-400"></div>
                          <div className="absolute top-[116px] left-[200px] w-0.5 h-[44px] border-l-2 border-dashed border-gray-400"></div>
                       </div>
                    </div>
                 )}

                 {/* THERMOSETTING */}
                 {type === 'termoseting' && (
                    <div className="absolute inset-0">
                       {/* Strong Cross-Linked Structure */}
                       <div className="absolute inset-0 transition-all duration-300"
                            style={{
                               transform: temperature > 350 ? 'scale(0.95)' : 'none',
                               filter: temperature > 350 ? 'contrast(2) brightness(0.2)' : 'none'
                            }}
                       >
                          {/* Horizontal Lines */}
                          <div className="absolute top-[40px] left-0 right-0 h-4 bg-purple-600 rounded-full"></div>
                          <div className="absolute top-[100px] left-0 right-0 h-4 bg-purple-600 rounded-full"></div>
                          <div className="absolute top-[160px] left-0 right-0 h-4 bg-purple-600 rounded-full"></div>

                          {/* Cross Links (Solid Covalent Bonds) */}
                          {/* Row 1 to 2 */}
                          <div className="absolute top-[56px] left-[50px] w-4 h-[44px] bg-purple-800"></div>
                          <div className="absolute top-[56px] left-[150px] w-4 h-[44px] bg-purple-800"></div>
                          <div className="absolute top-[56px] left-[250px] w-4 h-[44px] bg-purple-800"></div>

                          {/* Row 2 to 3 */}
                          <div className="absolute top-[116px] left-[100px] w-4 h-[44px] bg-purple-800"></div>
                          <div className="absolute top-[116px] left-[200px] w-4 h-[44px] bg-purple-800"></div>
                          
                          {/* Charring effect */}
                          {temperature > 350 && (
                             <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center text-white font-black text-2xl rotate-[-15deg] opacity-80">
                                TERDEKOMPOSISI
                             </div>
                          )}
                       </div>
                       
                       {/* Subtle vibration when hot before charring */}
                       {temperature > 250 && temperature <= 350 && (
                          <div className="absolute inset-0 animate-ping opacity-10">
                             <div className="w-full h-full bg-orange-500 rounded-lg"></div>
                          </div>
                       )}
                    </div>
                 )}
                 
                 {/* Heat effect overlay */}
                 <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl" 
                      style={{ 
                        opacity: temperature > 100 ? (temperature - 100) / 400 : 0,
                        background: 'linear-gradient(to top, rgba(239, 68, 68, 0.4), transparent)'
                      }}>
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
                <BookOpen className="h-5 w-5 text-pink-500" /> Sifat Termal Polimer
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Termoplastik</h4>
                <p>Termoplastik adalah polimer yang melunak saat dipanaskan dan mengeras saat didinginkan. Hal ini bisa dilakukan berulang kali (sangat ideal untuk daur ulang).</p>
                <p className="mt-2 text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <strong>Struktur:</strong> Rantai-rantai lurus panjang yang saling berdekatan. Antar rantai hanya ada gaya Van der Waals atau ikatan hidrogen (ikatan fisik) yang mudah diputuskan oleh panas.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Termoseting</h4>
                <p>Termoseting adalah polimer yang tidak dapat melunak atau dilelehkan setelah dibentuk/mengeras. Jika dipanaskan pada suhu tinggi, ia tidak meleleh melainkan hangus/rusak secara kimiawi (terdekomposisi).</p>
                <p className="mt-2 text-xs bg-gray-50 dark:bg-gray-800 p-3 rounded">
                  <strong>Struktur:</strong> Selain rantai utama, terdapat ikatan silang kovalen (<em>cross-linking</em>) yang kuat antar rantai. Hal ini membuatnya membentuk satu jaringan tiga dimensi raksasa yang kaku dan permanen.
                </p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors"
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
