'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Compass } from 'lucide-react';

export default function ComptonEffectModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // State for Scattering Angle (degrees)
  const [angleDeg, setAngleDeg] = useState(90);
  
  // Physics constants
  const comptonWavelengthNm = 0.00243; // h/(m_e * c) in nm
  const lambda0 = 0.1; // Initial X-ray wavelength in nm
  
  // Calculations
  const angleRad = (angleDeg * Math.PI) / 180;
  const deltaLambda = comptonWavelengthNm * (1 - Math.cos(angleRad));
  const lambdaFinal = lambda0 + deltaLambda;
  
  // Recoil electron angle (approximation for visualization)
  // tan(phi) = (sin theta) / ( (lambda'/lambda) - cos theta )
  const ratio = lambdaFinal / lambda0;
  const denominator = ratio - Math.cos(angleRad);
  // Prevent division by zero
  let electronAngleRad = 0;
  if (Math.abs(denominator) > 0.0001) {
    electronAngleRad = Math.atan(Math.sin(angleRad) / denominator);
  }
  const electronAngleDeg = (electronAngleRad * 180) / Math.PI;

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    // Win condition: Maximize wavelength shift (Angle = 180)
    if (angleDeg === 180) {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [angleDeg, showSuccess, hasWon]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="h-3.5 w-3.5" /> Bab 8: Gejala Kuantum (Sub 3)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Efek Compton</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Bukti paling telak bahwa gelombang cahaya bisa bertindak seperti "bola biliar" (partikel foton). Saat foton Sinar-X menabrak elektron diam, foton tersebut terpental, kehilangan sebagian energi, dan panjang gelombangnya bertambah!
          </p>

          <div className="flex flex-wrap gap-3">
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
            </button>
          </div>
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Perubahan Panjang Gelombang</p>
                  <p className="mb-2">Sebuah foton Sinar-X dihamburkan oleh elektron dengan sudut hamburan &theta; = 90&deg;. Jika panjang gelombang Compton (h/m&#8320;c) = 0.00243 nm, berapakah pertambahan panjang gelombang foton tersebut?</p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p>Rumus Compton: &Delta;&lambda; = (h/m&#8320;c)(1 - cos &theta;)<br/>
                  cos(90&deg;) = 0.<br/>
                  &Delta;&lambda; = 0.00243 &times; (1 - 0) = <strong>0.00243 nm</strong>.<br/>
                  Foton kehilangan sebagian energinya yang diserap oleh elektron untuk bergerak.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-1 shadow-lg shadow-emerald-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-emerald-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-emerald-100 text-sm mb-4 leading-relaxed">
                Carilah sudut hamburan &theta; yang akan menghasilkan <strong>Pergeseran Panjang Gelombang (&Delta;&lambda;) MAKSIMAL</strong>! Foton harus terpental sekuat mungkin!
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
              <Activity className="h-5 w-5 text-emerald-500" />
              Visualisasi Tumbukan (Diagram Vektor)
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex items-center justify-center p-4">
              
              <svg viewBox="-200 -100 400 200" className="w-full h-full">
                
                {/* Axes */}
                <line x1="-200" y1="0" x2="200" y2="0" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="-100" x2="0" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                
                {/* Incident Photon */}
                <path d="M -150 0 Q -140 -10, -130 0 T -110 0 T -90 0 T -70 0 T -50 0 T -30 0 T -10 0" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.6" />
                <path d="M -15 5 L -5 0 L -15 -5 Z" fill="#38bdf8" />
                <text x="-150" y="-15" fill="#38bdf8" fontSize="12" fontWeight="bold">Foton Awal (&lambda;&#8320;)</text>

                {/* The Collision Point (Electron initial pos) */}
                <circle cx="0" cy="0" r="5" fill="#ef4444" />

                {/* Scattered Photon */}
                <g transform={`rotate(${-angleDeg})`}>
                  {/* Drawing the wave - wavelength is slightly longer visually */}
                  <path d="M 10 0 Q 25 -15, 40 0 T 70 0 T 100 0 T 130 0" fill="none" stroke="#fbbf24" strokeWidth="3" />
                  <path d="M 125 5 L 135 0 L 125 -5 Z" fill="#fbbf24" />
                  <text x="70" y="-15" fill="#fbbf24" fontSize="12" fontWeight="bold" transform={`rotate(${angleDeg > 90 ? 180 : 0} 70 -15)`}>Foton Hambur (&lambda;')</text>
                </g>

                {/* Recoil Electron */}
                {angleDeg > 0 && (
                  <g transform={`rotate(${electronAngleDeg})`}>
                    <line x1="10" y1="0" x2="80" y2="0" stroke="#ef4444" strokeWidth="2" strokeDasharray="2 2" />
                    <circle cx="85" cy="0" r="5" fill="#ef4444" />
                    <text x="40" y="15" fill="#ef4444" fontSize="10">Elektron Terpental</text>
                  </g>
                )}
                
                {/* Angle Arcs */}
                {angleDeg > 0 && (
                  <path d={`M 30 0 A 30 30 0 0 0 ${30 * Math.cos(-angleRad)} ${30 * Math.sin(-angleRad)}`} fill="none" stroke="#fbbf24" strokeWidth="2" />
                )}
                {angleDeg > 0 && (
                  <text x="40" y="-10" fill="#fbbf24" fontSize="12">&theta;</text>
                )}

              </svg>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-emerald-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Luar Biasa!</h4>
                    <p className="text-white text-center mt-2 max-w-sm font-medium">Pada sudut 180&deg;, foton terpental balik ke arah asalnya (cos 180&deg; = -1). Ini menyebabkan nilai (1 - cos&theta;) bernilai 2, sehingga memberikan pergeseran &Delta;&lambda; yang maksimum!</p>
                    <p className="text-emerald-50 font-bold mt-4 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">&lambda; Awal (Foton)</div>
                <div className="text-xl font-mono font-bold text-gray-800 dark:text-gray-100">{lambda0.toFixed(5)} nm</div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-bold mb-1">&lambda;' Akhir (Foton)</div>
                <div className="text-xl font-mono font-bold text-emerald-700 dark:text-emerald-300">{lambdaFinal.toFixed(5)} nm</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-emerald-500" />
              Pengaturan Sudut
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Sudut Hamburan (&theta;)</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                    {angleDeg}&deg;
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="180" 
                  step="1"
                  value={angleDeg} 
                  onChange={(e) => setAngleDeg(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-emerald-500"
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-2 border-b border-slate-200 dark:border-slate-700 pb-2 text-center">Pergeseran (&Delta;&lambda;)</div>
                <div className="text-center font-mono py-2 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-white dark:bg-black px-4 py-1.5 rounded shadow-inner border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400">
                      +{deltaLambda.toFixed(5)} nm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Hukum Kekekalan Momentum:</strong> Layaknya bola biliar, Foton Sinar-X memiliki momentum (p = h/&lambda;). Saat menabrak elektron, foton kehilangan sebagian momentumnya, sehingga panjang gelombangnya bertambah!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                Teori Efek Compton
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Penemuan Arthur Compton</h4>
                <p className="mb-3">
                  Pada tahun 1923, Arthur H. Compton mengamati bahwa ketika sinar-X (gelombang elektromagnetik berenergi tinggi) ditembakkan ke sebuah target elektron diam, sinar-X yang terhambur memiliki panjang gelombang yang <strong>lebih besar</strong> (energi lebih rendah) dibandingkan sinar-X asalnya.
                </p>
                <p className="mb-3 font-semibold text-emerald-600 dark:text-emerald-400">
                  Ini tidak bisa dijelaskan dengan teori gelombang klasik! Cahaya haruslah berupa partikel (foton).
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Persamaan Pergeseran Compton</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-center mb-3 font-mono border border-gray-200 dark:border-gray-700 text-lg">
                  &Delta;&lambda; = (h / m&#8320;c) &times; (1 - cos &theta;)
                </div>
                <ul className="list-disc list-inside space-y-2 ml-2 text-sm">
                  <li><strong>h:</strong> Konstanta Planck</li>
                  <li><strong>m&#8320;:</strong> Massa diam elektron</li>
                  <li><strong>c:</strong> Kecepatan cahaya</li>
                  <li><strong>(h / m&#8320;c):</strong> Panjang gelombang Compton (&approx; 0.00243 nm)</li>
                </ul>
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
