'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Thermometer } from 'lucide-react';

export default function BlackbodyRadiationModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for Temperature (Kelvin)
  const [temperature, setTemperature] = useState(3000); // Start at minimum, user must slide to find the answer
  
  // Calculations
  const b = 2.898e-3; // Wien's displacement constant in m.K
  const b_nm = 2.898e6; // in nm.K
  const lambdaMax = b_nm / temperature; // Peak wavelength in nm

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Target visible green spectrum (~500 nm)
    if (Math.abs(lambdaMax - 500) < 5) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [lambdaMax, showSuccess, hasWon]);

  // Map Temperature to an RGB color for the glowing body
  const getStarColor = (temp: number) => {
    // Very simplified approximation
    if (temp < 4000) return 'rgb(255, 100, 50)'; // Reddish
    if (temp < 5500) return 'rgb(255, 200, 100)'; // Orange-Yellow
    if (temp < 6500) return 'rgb(255, 255, 200)'; // Yellow-White
    if (temp < 8000) return 'rgb(220, 240, 255)'; // White-Blue
    return 'rgb(150, 200, 255)'; // Blue
  };

  // Generate SVG path for the blackbody radiation curve
  const generateCurvePath = () => {
    const width = 400;
    const height = 150;
    let path = `M 0 ${height}`;
    
    // Intensity formula approx: I(λ) ~ (1/λ^5) / (exp(hc/λkT) - 1)
    // We will just draw a bell-like curve centered at lambdaMax for visual intuition
    // x axis goes from 0 nm to 2000 nm
    const maxInt = temperature * temperature * temperature * temperature / 1e14; // Stefan-Boltzmann approx scale for height
    
    for (let x = 10; x <= width; x += 5) {
      const lambda = (x / width) * 2000; // Map x to 0-2000 nm
      // Simplified Planck's Law approximation for shape
      const hc_k = 1.439e7; // hc/k in nm.K
      const exponent = hc_k / (lambda * temperature);
      
      let intensity = 0;
      if (exponent < 50) { // prevent overflow
        intensity = (1e25 / Math.pow(lambda, 5)) / (Math.exp(exponent) - 1);
      }
      
      // Scale intensity for SVG (heuristic)
      const scaledY = height - Math.min(height, intensity * 2e-6); 
      path += ` L ${x} ${scaledY}`;
    }
    
    // Complete the path
    path += ` L ${width} ${height} Z`;
    return path;
  };

  // Convert lambdaMax (nm) to spectral color description
  const getSpectrumName = (lambda: number) => {
    if (lambda < 400) return "Ultraviolet (Tak Terlihat)";
    if (lambda < 450) return "Ungu";
    if (lambda < 500) return "Biru";
    if (lambda < 550) return "Hijau";
    if (lambda < 600) return "Kuning";
    if (lambda < 650) return "Jingga";
    if (lambda < 750) return "Merah";
    return "Inframerah (Tak Terlihat)";
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Thermometer className="h-3.5 w-3.5" /> Bab 8: Gejala Kuantum (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Radiasi Benda Hitam (Hukum Wien)</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Benda yang dipanaskan akan memancarkan radiasi elektromagnetik. Semakin panas benda tersebut, panjang gelombang radiasi yang paling intens (&lambda;&#8320;) akan bergeser ke arah yang lebih pendek (warna kebiruan). Inilah yang disebut Hukum Pergeseran Wien.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 text-sm font-semibold rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Mengukur Suhu Bintang</p>
                  <p className="mb-2">Sebuah bintang diamati oleh astronom dan didapati memancarkan intensitas maksimum pada panjang gelombang &lambda; = 500 nm (0.5 &mu;m). Jika tetapan Wien b = 2.9 &times; 10&#8315;&#179; m.K, berapakah suhu permukaan bintang tersebut?</p>
                  <p className="font-semibold text-orange-700 dark:text-orange-400 mb-1">Penyelesaian:</p>
                  <p>Gunakan rumus Hukum Pergeseran Wien: &lambda; &times; T = b<br/>
                  (500 &times; 10&#8315;&#8313;) &times; T = 2.9 &times; 10&#8315;&#179;<br/>
                  T = (2.9 &times; 10&#8315;&#179;) / (5 &times; 10&#8315;&#8311;)<br/>
                  T = 0.58 &times; 10&#8308; = <strong>5,800 Kelvin</strong>. (Suhu ini kira-kira sama dengan suhu permukaan Matahari kita!)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-1 shadow-lg shadow-orange-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-orange-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-orange-100 text-sm mb-4 leading-relaxed">
                Temukan suhu persis (T) agar bintang memancarkan puncak spektrum cahaya di panjang gelombang warna <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">Hijau (500 nm)</strong>!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Interactive Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" />
              Kurva Intensitas Radiasi (Planck)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-end p-4 pt-10">
              
              <svg viewBox="0 0 400 150" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1="0" y1="150" x2="400" y2="150" stroke="#475569" strokeWidth="2" />
                <line x1="0" y1="150" x2="0" y2="0" stroke="#475569" strokeWidth="2" />
                
                {/* Visible Light Spectrum Background Ribbon */}
                {/* 400nm to 700nm maps to x=80 to x=140 roughly on 0-2000nm scale */}
                <defs>
                  <linearGradient id="rainbow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="indigo" />
                    <stop offset="25%" stopColor="blue" />
                    <stop offset="50%" stopColor="green" />
                    <stop offset="75%" stopColor="yellow" />
                    <stop offset="100%" stopColor="red" />
                  </linearGradient>
                </defs>
                <rect x="80" y="0" width="60" height="150" fill="url(#rainbow)" opacity="0.3" />
                <text x="110" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">Spektrum Tampak</text>
                
                {/* Curve */}
                <path d={generateCurvePath()} fill="url(#glowGradient)" stroke={getStarColor(temperature)} strokeWidth="3" />
                <defs>
                  <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={getStarColor(temperature)} stopOpacity="0.5" />
                    <stop offset="100%" stopColor={getStarColor(temperature)} stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Peak Indicator */}
                <line x1={(lambdaMax / 2000) * 400} y1="0" x2={(lambdaMax / 2000) * 400} y2="150" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
                <circle cx={(lambdaMax / 2000) * 400} cy={150 - Math.min(150, (temperature*temperature*temperature*temperature/1e14) * 2e-6)} r="4" fill="white" />
                
                {/* Axis Labels */}
                <text x="400" y="165" fill="#94a3b8" fontSize="12" textAnchor="end">Panjang Gelombang &lambda; (nm)</text>
                <text x="-10" y="10" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 -10 10)">Intensitas</text>
              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-orange-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Tebakan Brilian!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Pada suhu sekitar ~5796 K, radiasi bintang akan mencapai puncaknya di sekitar 500 nm (warna hijau pada spektrum tampak). Itulah suhu Matahari kita!</p>
                    <p className="text-orange-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-4">
                <div 
                  className="w-16 h-16 rounded-full shadow-lg transition-colors duration-500 flex-shrink-0"
                  style={{ 
                    backgroundColor: getStarColor(temperature),
                    boxShadow: `0 0 20px ${getStarColor(temperature)}`
                  }}
                ></div>
                <div className="text-left">
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">Warna Bintang</div>
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{getSpectrumName(lambdaMax)}</div>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800 flex flex-col items-center justify-center text-center">
                <div className="text-sm text-orange-600 dark:text-orange-400 font-bold mb-1">Puncak &lambda;&#8320;</div>
                <div className="text-2xl font-mono font-bold text-orange-700 dark:text-orange-300">{lambdaMax.toFixed(1)} nm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-orange-500" />
              Suhu Benda Hitam (T)
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Temperatur Absolut</span>
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400 font-mono bg-orange-50 dark:bg-orange-900/30 px-2 py-0.5 rounded">
                    {temperature} K
                  </span>
                </div>
                <input 
                  type="range" 
                  min="3000" 
                  max="10000" 
                  step="10"
                  value={temperature} 
                  onChange={(e) => setTemperature(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-orange-500"
                />
                <div className="flex justify-between mt-1 text-xs text-gray-500 font-mono">
                  <span>3000 K</span>
                  <span>10000 K</span>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Hukum Pergeseran Wien</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <span className="text-xs text-gray-500 mb-1">&lambda;&#8320; = 2.898 &times; 10&#8315;&#179; / T</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Anda?</strong> Bintang yang berwarna kebiruan (seperti Sirius) memiliki suhu permukaan yang <strong>jauh lebih panas</strong> dibandingkan bintang berwarna kemerahan (seperti Betelgeuse)!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-orange-50 dark:bg-orange-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" />
                Radiasi Benda Hitam
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Benda Hitam Sempurna</h4>
                <p className="mb-3">
                  Dalam fisika, benda hitam sempurna didefinisikan sebagai benda yang menyerap seluruh radiasi elektromagnetik yang jatuh padanya. Saat benda ini dipanaskan, ia memancarkan radiasi dengan spektrum yang hanya bergantung pada suhunya, bukan bahan atau komposisinya.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hukum Pergeseran Wien</h4>
                <p className="mb-3">
                  Wilhelm Wien menemukan bahwa panjang gelombang radiasi pada intensitas maksimum (&lambda;&#8320;) bergeser ke arah panjang gelombang yang lebih pendek saat suhu (T) meningkat.
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  &lambda;&#8320; &times; T = C
                </div>
                <p className="text-sm">
                  Di mana <strong>C</strong> adalah tetapan Wien yang bernilai <code>2.898 &times; 10&#8315;&#179; m.K</code>.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Gagasan Kuantum Max Planck</h4>
                <p className="mb-3">
                  Teori klasik (Rayleigh-Jeans) gagal memprediksi kurva intensitas pada gelombang pendek (Bencana Ultraviolet). Max Planck kemudian menyelesaikan masalah ini pada tahun 1900 dengan hipotesis revolusionernya: <strong>Energi cahaya tidak kontinu, melainkan berupa paket-paket (kuanta/foton) sebesar E = h&middot;f</strong>.
                </p>
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
