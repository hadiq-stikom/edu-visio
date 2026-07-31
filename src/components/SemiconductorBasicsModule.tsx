'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Cpu } from 'lucide-react';

export default function SemiconductorBasicsModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // States
  const [bias, setBias] = useState<'forward' | 'reverse'>('reverse');
  
  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (showSuccess || hasWon) return;
    
    if (bias === 'forward') {
      setShowSuccess(true);
      setHasWon(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bias, showSuccess, hasWon]);

  // Animation for PN Junction
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      
      if (svgRef.current) {
        // Find electrons and holes
        const electrons = svgRef.current.querySelectorAll('.electron');
        const holes = svgRef.current.querySelectorAll('.hole');
        const photons = svgRef.current.querySelectorAll('.photon');
        
        // Speed of movement
        const speed = bias === 'forward' ? 30 : -10; 

        // Update Electrons (N-type, right side)
        electrons.forEach((el, index) => {
          const basePath = index * 20; // arbitrary offset
          let x = 350 - ((time * speed + basePath) % 150);
          
          if (bias === 'reverse') {
            // Move right (away from junction)
            x = 300 + ((time * Math.abs(speed) + basePath) % 150);
            if (x > 450) x = 450; 
          } else {
            // Move left (towards junction)
            if (x < 250) x = 250 + (Math.random() * 200); // Reset to right
          }
          el.setAttribute('cx', x.toString());
        });

        // Update Holes (P-type, left side)
        holes.forEach((el, index) => {
          const basePath = index * 20;
          let x = 150 + ((time * speed + basePath) % 150);
          
          if (bias === 'reverse') {
            // Move left (away from junction)
            x = 200 - ((time * Math.abs(speed) + basePath) % 150);
            if (x < 50) x = 50;
          } else {
            // Move right (towards junction)
            if (x > 250) x = 50 + (Math.random() * 200); // Reset to left
          }
          el.setAttribute('cx', x.toString());
        });

        // Update Photons (Only visible in forward bias at the junction)
        photons.forEach((el, index) => {
          if (bias === 'forward') {
            const cycle = (time * 2 + index * 0.3) % 1;
            el.setAttribute('opacity', (1 - cycle).toString());
            el.setAttribute('r', (cycle * 20).toString());
          } else {
            el.setAttribute('opacity', '0');
          }
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [bias]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="h-3.5 w-3.5" /> Bab 6: Sistem Elektronika (Sub 1)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Semikonduktor &amp; Dioda</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Semikonduktor adalah bahan dengan konduktivitas di antara isolator dan konduktor. Gabungan bahan semikonduktor tipe-P dan tipe-N membentuk <strong>Dioda</strong>, komponen ajaib yang hanya mengalirkan arus satu arah!
          </p>

          <div className="flex flex-wrap gap-3">
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
            </button>
          </div>
          
          {showExamples && (
            <div className="mt-4 p-5 bg-white dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in fade-in slide-in-from-top-2">
              <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                📝 Contoh Kasus
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Arah Arus Dioda</p>
                  <p className="mb-2">Perhatikan sebuah rangkaian listrik dengan sumber tegangan DC dan sebuah LED. Agar LED dapat memancarkan cahaya, bagaimana kaki-kaki LED tersebut harus dihubungkan ke sumber tegangan?</p>
                  <p className="font-semibold text-blue-700 dark:text-blue-400 mb-1">Penyelesaian:</p>
                  <p>Kaki anoda (tipe-P) dari LED harus dihubungkan ke kutub <strong>Positif (+)</strong> baterai, dan kaki katoda (tipe-N) harus dihubungkan ke kutub <strong>Negatif (-)</strong> baterai. Konfigurasi ini disebut <strong>Bias Maju (Forward Bias)</strong>, yang memungkinkan arus listrik mengalir melintasi *junction* dan menghasilkan cahaya.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-1 shadow-lg shadow-blue-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                Sambungan baterai saat ini mencegah arus mengalir. Ubah posisi polaritas agar menjadi <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">Bias Maju</strong> untuk menyalakan LED!
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
              <Activity className="h-5 w-5 text-blue-500" />
              Simulasi P-N Junction
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex flex-col items-center justify-center">
              
              <svg ref={svgRef} viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
                {/* Background Grid */}
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Circuit Wires */}
                <path d="M 50 100 L 0 100 L 0 180 L 500 180 L 500 100 L 450 100" fill="none" stroke="#64748b" strokeWidth="4" />
                
                {/* Battery Source */}
                <g transform="translate(250, 180)">
                  <rect x="-40" y="-15" width="80" height="30" rx="5" fill="#1e293b" />
                  
                  {bias === 'forward' ? (
                    <>
                      {/* Forward: Left is +, Right is - */}
                      <rect x="-40" y="-15" width="20" height="30" fill="#ef4444" rx="5" />
                      <rect x="20" y="-15" width="20" height="30" fill="#3b82f6" rx="5" />
                      <text x="-35" y="5" fill="white" fontWeight="bold" fontSize="18">+</text>
                      <text x="25" y="3" fill="white" fontWeight="bold" fontSize="18">-</text>
                    </>
                  ) : (
                    <>
                      {/* Reverse: Left is -, Right is + */}
                      <rect x="-40" y="-15" width="20" height="30" fill="#3b82f6" rx="5" />
                      <rect x="20" y="-15" width="20" height="30" fill="#ef4444" rx="5" />
                      <text x="-35" y="3" fill="white" fontWeight="bold" fontSize="18">-</text>
                      <text x="25" y="5" fill="white" fontWeight="bold" fontSize="18">+</text>
                    </>
                  )}
                </g>

                {/* The Diode (P-N Junction) */}
                <rect x="50" y="40" width="400" height="120" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                
                {/* P-Type Semiconductor (Left) */}
                <rect x="52" y="42" width={bias === 'forward' ? 180 : 160} height="116" fill="#fca5a5" opacity="0.2" className="transition-all duration-500" />
                <text x="140" y="35" fill="#ef4444" fontWeight="bold">Tipe-P (Hole +)</text>

                {/* N-Type Semiconductor (Right) */}
                <rect x={bias === 'forward' ? 268 : 288} y="42" width={bias === 'forward' ? 180 : 160} height="116" fill="#93c5fd" opacity="0.2" className="transition-all duration-500" />
                <text x="280" y="35" fill="#3b82f6" fontWeight="bold">Tipe-N (Elektron -)</text>

                {/* Depletion Region (Middle) */}
                <rect 
                  x={bias === 'forward' ? 232 : 212} 
                  y="42" 
                  width={bias === 'forward' ? 36 : 76} 
                  height="116" 
                  fill="#fef08a" 
                  opacity="0.1" 
                  className="transition-all duration-500" 
                />
                <text x="250" y="150" fill="#fcd34d" fontSize="10" textAnchor="middle" className="transition-all duration-500">
                  Area Deplesi {bias === 'forward' ? '(Menyempit)' : '(Melebar)'}
                </text>

                {/* Charge Carriers (Holes +) */}
                {[...Array(15)].map((_, i) => (
                  <circle 
                    key={`hole-${i}`} 
                    className="hole"
                    cx="150" 
                    cy={55 + (i % 5) * 22} 
                    r="6" 
                    fill="#ef4444" 
                    stroke="#b91c1c" 
                    strokeWidth="1"
                  />
                ))}

                {/* Charge Carriers (Electrons -) */}
                {[...Array(15)].map((_, i) => (
                  <circle 
                    key={`elec-${i}`} 
                    className="electron"
                    cx="350" 
                    cy={55 + (i % 5) * 22} 
                    r="4" 
                    fill="#3b82f6" 
                  />
                ))}

                {/* Photons (Light Emission during recombination) */}
                {[...Array(5)].map((_, i) => (
                  <circle 
                    key={`photon-${i}`} 
                    className="photon"
                    cx="250" 
                    cy={55 + i * 22} 
                    r="0" 
                    fill="none" 
                    stroke="#fde047"
                    strokeWidth="3"
                  />
                ))}
              </svg>
              
              <div className="absolute top-4 left-4">
                <div className={`px-4 py-2 rounded-full font-bold text-sm backdrop-blur-md border ${
                  bias === 'forward' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
                    : 'bg-red-500/20 text-red-300 border-red-500/50'
                }`}>
                  Status: {bias === 'forward' ? 'BIAS MAJU (Arus Mengalir, LED Menyala)' : 'BIAS MUNDUR (Arus Terblokir)'}
                </div>
              </div>

              {/* Success Overlay with Transparent Background */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-blue-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Menyala Abangku!</h4>
                    <p className="text-blue-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-sm text-gray-700 dark:text-gray-300 text-center">
              Dalam <strong>{bias === 'forward' ? 'Bias Maju' : 'Bias Mundur'}</strong>, terminal positif baterai dihubungkan ke bahan tipe-{bias === 'forward' ? 'P' : 'N'}. 
              Hal ini menyebabkan area deplesi {bias === 'forward' ? 'menyempit, memungkinkan elektron dan hole melompat dan bergabung' : 'melebar, mencegah elektron berpindah'}.
            </div>
          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-blue-500" />
              Kontrol Baterai
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setBias('forward')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                    bias === 'forward'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  Bias Maju
                  <div className="text-xs font-normal opacity-80 mt-1">(+ ke P, - ke N)</div>
                </button>
                <button
                  onClick={() => setBias('reverse')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all ${
                    bias === 'reverse'
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                  }`}
                >
                  Bias Mundur
                  <div className="text-xs font-normal opacity-80 mt-1">(- ke P, + ke N)</div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> <em>Light Emitting Diode</em> (LED) adalah Dioda yang dirancang khusus. Ketika diberi bias maju, elektron dan hole akan bertabrakan (rekombinasi). Sisa energinya dilepaskan dalam bentuk cahaya (foton)!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Teori Semikonduktor &amp; Dioda
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Bahan Semikonduktor</h4>
                <p className="mb-3">
                  Semikonduktor murni (seperti Silikon) bisa di-"doping" (dicampur atom lain) untuk mengubah sifatnya:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Tipe-P:</strong> Kekurangan elektron, menciptakan ruang kosong bermuatan positif yang disebut <em>Hole</em>.</li>
                  <li><strong>Tipe-N:</strong> Kelebihan elektron, memiliki muatan negatif bebas (<em>Electron</em>).</li>
                </ul>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">P-N Junction (Sambungan P-N)</h4>
                <p className="mb-3">
                  Ketika bahan tipe-P dan tipe-N disatukan, elektron dari N akan menyeberang dan mengisi hole di P. Ini menciptakan sebuah "tembok pembatas" di tengah yang disebut <strong>Area Deplesi</strong>. Tembok ini mencegah elektron lain menyeberang secara bebas.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cara Kerja Dioda (LED)</h4>
                <p className="mb-3">
                  Dioda adalah katup listrik satu arah:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong>Bias Maju (Forward Bias):</strong> Kutub (+) baterai ke P, kutub (-) ke N. Baterai mendorong hole dan elektron saling mendekat, menghancurkan area deplesi. Arus mengalir, dan pada LED, rekombinasi ini memancarkan <strong>Cahaya</strong>.
                  </li>
                  <li>
                    <strong>Bias Mundur (Reverse Bias):</strong> Kutub (-) baterai ke P, kutub (+) ke N. Baterai justru menarik hole dan elektron menjauhi tengah. Area deplesi membesar, tembok makin tebal, sehingga <strong>Arus Terblokir</strong>.
                  </li>
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
