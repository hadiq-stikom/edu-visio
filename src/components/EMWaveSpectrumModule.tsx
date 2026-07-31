'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Radio } from 'lucide-react';

const BANDS = [
  { name: 'Gelombang Radio', minF: 1e3, maxF: 3e9, color: 'bg-red-500', hex: '#ef4444' },
  { name: 'Gelombang Mikro', minF: 3e9, maxF: 3e11, color: 'bg-orange-500', hex: '#f97316' },
  { name: 'Inframerah (IR)', minF: 3e11, maxF: 4e14, color: 'bg-yellow-500', hex: '#eab308' },
  { name: 'Cahaya Tampak', minF: 4e14, maxF: 7.5e14, color: 'bg-green-500', hex: '#22c55e', special: true },
  { name: 'Ultraviolet (UV)', minF: 7.5e14, maxF: 3e16, color: 'bg-blue-500', hex: '#3b82f6' },
  { name: 'Sinar-X', minF: 3e16, maxF: 3e19, color: 'bg-indigo-500', hex: '#6366f1' },
  { name: 'Sinar Gamma', minF: 3e19, maxF: 1e24, color: 'bg-purple-500', hex: '#a855f7' },
];

export default function EMWaveSpectrumModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [sliderVal, setSliderVal] = useState(50); // 0 to 100
  
  // Calculations
  // log(f) goes from 4 to 22 (1e4 Hz to 1e22 Hz)
  const logF = 4 + (sliderVal / 100) * 18;
  const frequency = Math.pow(10, logF);
  const c = 3e8;
  const wavelength = c / frequency;
  
  const currentBand = BANDS.find(b => frequency >= b.minF && frequency < b.maxF) || BANDS[BANDS.length - 1];

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetBand, setTargetBand] = useState(BANDS[3]); // Start with Cahaya Tampak

  const generateNewTarget = () => {
    const available = BANDS.filter(b => b.name !== targetBand.name);
    const next = available[Math.floor(Math.random() * available.length)];
    setTargetBand(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    if (currentBand.name === targetBand.name) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentBand, targetBand, showSuccess]);

  // Formatter for scientific notation
  const formatSci = (num: number) => {
    if (num === 0) return '0';
    const exponent = Math.floor(Math.log10(num));
    const mantissa = num / Math.pow(10, exponent);
    return (
      <span>
        {mantissa.toFixed(2)} &times; 10<sup>{exponent}</sup>
      </span>
    );
  };

  // Animation for EM Wave
  const waveSvgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      if (waveSvgRef.current) {
        const speed = 2; // visual speed
        // Wavelength visual scale: smaller wavelength -> tighter waves
        // Slider goes 0 to 100. Let's make wave frequency scale visually with slider
        const visualFreq = 1 + (sliderVal / 100) * 15; 
        
        const ePath = waveSvgRef.current.querySelector('#e-field') as SVGPathElement;
        const bPath = waveSvgRef.current.querySelector('#b-field') as SVGPathElement;
        
        if (ePath && bPath) {
          let eD = '';
          let bD = '';
          const width = 500;
          const points = 100;
          
          for (let i = 0; i <= points; i++) {
            const x = (i / points) * width;
            // E field oscillates in Y
            const yE = Math.sin(x * 0.05 * visualFreq - time * speed * visualFreq) * 50;
            // B field oscillates in Z (visualized as diagonal Y)
            const yB = Math.sin(x * 0.05 * visualFreq - time * speed * visualFreq) * 30; // Z axis projection
            
            if (i === 0) {
              eD += `M ${x} ${100 - yE} `;
              bD += `M ${x} ${100 + yB} `; // Projecting B field down-right
            } else {
              eD += `L ${x} ${100 - yE} `;
              bD += `L ${x} ${100 + yB} `;
            }
          }
          ePath.setAttribute('d', eD);
          bPath.setAttribute('d', bD);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [sliderVal]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Radio className="h-3.5 w-3.5" /> Bab 5: Gelombang Elektromagnetik (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Perambatan &amp; Spektrum GEM</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Gelombang Elektromagnetik terdiri dari medan listrik (E) dan medan magnet (B) yang saling tegak lurus dan merambat tanpa memerlukan medium. Jelajahi berbagai jenis spektrum elektromagnetik berdasarkan frekuensi dan panjang gelombangnya!
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              <BookOpen className="h-4 w-4" /> Baca Teori Singkat
            </button>
            <button 
              onClick={() => setShowExamples(!showExamples)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {showExamples ? 'Sembunyikan Contoh Soal' : 'Tampilkan Contoh Soal'}
            </button>
          </div>
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Menghitung Panjang Gelombang Radio</p>
                  <p className="mb-2">Sebuah stasiun radio FM memancarkan gelombang pada frekuensi 100 MHz (100 &times; 10&sup6; Hz). Jika kecepatan cahaya c = 3 &times; 10&sup8; m/s, berapakah panjang gelombangnya?</p>
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p>Gunakan rumus <strong>&lambda; = c / f</strong><br/>
                  &lambda; = (3 &times; 10&sup8;) / (100 &times; 10&sup6;)<br/>
                  &lambda; = 300 / 100 = <strong>3 meter</strong>. Jadi, panjang gelombang radio FM tersebut adalah 3 meter.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-1 shadow-lg shadow-cyan-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-cyan-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-cyan-100 text-sm mb-4 leading-relaxed">
                Geser slider frekuensi untuk menemukan spektrum <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{targetBand.name}</strong>!
              </p>
              
              <div className="mt-4 p-3 bg-black/20 rounded-xl">
                <div className="text-xs text-cyan-200 mb-1">Status Spektrum Saat Ini:</div>
                <div className={`font-bold text-lg flex items-center gap-2 ${currentBand.name === targetBand.name ? 'text-green-300' : 'text-white'}`}>
                  {currentBand.name}
                  {currentBand.name === targetBand.name && (
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full animate-pulse">
                      Ketemu!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-500" />
              Visualisasi Gelombang Elektromagnetik
            </h3>

            {/* Simulated 3D Wave Animation */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex items-center justify-center">
              <svg ref={waveSvgRef} viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg" preserveAspectRatio="none">
                {/* Axes */}
                <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeWidth="2" />
                
                {/* Magnetic Field B (Blue) - drawn first so it's behind E if needed */}
                <path id="b-field" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.8" />
                
                {/* Electric Field E (Red) */}
                <path id="e-field" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.9" />
                
                {/* Axis Labels */}
                <text x="480" y="90" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
              </svg>
              
              <div className="absolute top-3 left-3 flex gap-4">
                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded backdrop-blur">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <span className="text-[10px] text-gray-300 font-mono">Medan Listrik (E)</span>
                </div>
                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded backdrop-blur">
                  <div className="w-3 h-0.5 bg-blue-500"></div>
                  <span className="text-[10px] text-gray-300 font-mono">Medan Magnet (B)</span>
                </div>
              </div>

              {/* Success Overlay directly in the chart container */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-cyan-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Ketemu!</h4>
                    <p className="text-cyan-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            {/* Spectrum Bar */}
            <div className="w-full mt-8">
              <div className="flex justify-between text-xs text-gray-500 font-mono mb-2">
                <span>10<sup>4</sup> Hz</span>
                <span>10<sup>14</sup> Hz (Cahaya)</span>
                <span>10<sup>22</sup> Hz</span>
              </div>
              
              <div className="relative h-8 rounded-full overflow-hidden w-full flex">
                <div className="h-full" style={{ width: '15%', backgroundColor: '#ef4444' }} title="Radio"></div>
                <div className="h-full" style={{ width: '15%', backgroundColor: '#f97316' }} title="Mikro"></div>
                <div className="h-full" style={{ width: '15%', backgroundColor: '#eab308' }} title="Inframerah"></div>
                <div className="h-full" style={{ width: '5%', background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' }} title="Cahaya Tampak"></div>
                <div className="h-full" style={{ width: '15%', backgroundColor: '#3b82f6' }} title="Ultraviolet"></div>
                <div className="h-full" style={{ width: '15%', backgroundColor: '#6366f1' }} title="Sinar-X"></div>
                <div className="h-full flex-1" style={{ backgroundColor: '#a855f7' }} title="Sinar Gamma"></div>
                
                {/* Marker Slider Indicator */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white border border-gray-900 shadow-[0_0_8px_rgba(255,255,255,0.8)] z-10 transition-all duration-100"
                  style={{ left: `${sliderVal}%` }}
                >
                  <div className="absolute -top-3 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900 dark:border-t-white"></div>
                </div>
              </div>
              <div className="text-center mt-3 font-bold text-lg" style={{ color: currentBand.hex }}>
                {currentBand.name}
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-cyan-500" />
              Kontrol Spektrum
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Frekuensi (f)
                  </label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={sliderVal}
                  onChange={(e) => setSliderVal(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-xl border border-cyan-100 dark:border-cyan-900/50 space-y-3">
                <div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-1">Frekuensi (f)</div>
                  <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {formatSci(frequency)} Hz
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider mb-1">Panjang Gelombang (&lambda;)</div>
                  <div className="font-mono text-xl font-bold text-gray-900 dark:text-white">
                    {formatSci(wavelength)} m
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Cepat rambat gelombang elektromagnetik di ruang hampa selalu konstan, yaitu <strong>c = 3 &times; 10<sup>8</sup> m/s</strong>. 
                Maka dari itu, semakin tinggi frekuensinya, semakin pendek panjang gelombangnya!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-cyan-50 dark:bg-cyan-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-cyan-500" />
                Teori Gelombang Elektromagnetik
              </h3>
              <button
                onClick={() => setShowTheoryModal(false)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-gray-600 dark:text-gray-300">
              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Apa itu Gelombang Elektromagnetik?</h4>
                <p className="mb-3">
                  Gelombang elektromagnetik (GEM) adalah gelombang yang terdiri dari getaran medan listrik (E) dan medan magnet (B) yang saling tegak lurus satu sama lain dan juga tegak lurus terhadap arah rambat gelombang. GEM dapat merambat melalui ruang hampa (vakum).
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kecepatan Merambat</h4>
                <p className="mb-3">
                  Persamaan dasar GEM menghubungkan kecepatan cahaya (c), panjang gelombang (&lambda;), dan frekuensi (f):
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-2 font-mono text-center mb-3 text-lg font-bold">
                  c = &lambda; &middot; f
                </div>
                <p className="text-sm">
                  Di mana <strong>c &approx; 3 &times; 10<sup>8</sup> m/s</strong>. Jika frekuensi membesar, panjang gelombang akan mengecil, begitu juga sebaliknya.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Spektrum Elektromagnetik</h4>
                <p className="mb-3">
                  Berdasarkan frekuensinya (dari yang terendah ke tertinggi), spektrum GEM dibagi menjadi:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-2">
                  <li><strong>Gelombang Radio:</strong> Untuk komunikasi jarak jauh.</li>
                  <li><strong>Gelombang Mikro:</strong> Radar, Wi-Fi, dan pemanas (microwave).</li>
                  <li><strong>Inframerah (IR):</strong> Remote TV, sensor panas.</li>
                  <li><strong>Cahaya Tampak:</strong> Warna yang bisa dilihat mata (Me-Ji-Ku-Hi-Bi-Ni-U).</li>
                  <li><strong>Ultraviolet (UV):</strong> Dari matahari, sterilisasi.</li>
                  <li><strong>Sinar-X:</strong> Pemindaian medis (Rontgen).</li>
                  <li><strong>Sinar Gamma:</strong> Sterilisasi peralatan medis, radioterapi kanker.</li>
                </ol>
              </section>
            </div>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
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
