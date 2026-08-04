'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, Info, Star, Droplet, RefreshCw, BookOpen, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function BufferTitrationModule() {
  const { addScore } = useUser();
  
  // Titration states
  const [baseVolume, setBaseVolume] = useState(0); // in mL
  const [ph, setPh] = useState(1);
  const [color, setColor] = useState('bg-slate-100 dark:bg-slate-800'); // Phenolphthalein color
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOverTiturated, setIsOverTiturated] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Constants
  const acidVolume = 25; // mL of 0.1M HCl
  const baseConc = 0.1; // 0.1M NaOH
  const equivalenceVolume = 25; // mL

  const addDrop = () => {
    if (showSuccess || isOverTiturated) return;
    setBaseVolume(prev => prev + 1);
  };

  const addTenDrops = () => {
    if (showSuccess || isOverTiturated) return;
    setBaseVolume(prev => prev + 5);
  };

  useEffect(() => {
    // Calculate pH for Strong Acid (HCl) vs Strong Base (NaOH)
    let currentPh = 1;
    let currentColor = 'bg-slate-100 dark:bg-slate-800';
    
    if (baseVolume === 0) {
      currentPh = 1;
    } else if (baseVolume < equivalenceVolume) {
      // Still acidic
      const molesAcid = acidVolume * 0.1;
      const molesBase = baseVolume * baseConc;
      const remainingAcid = molesAcid - molesBase;
      const totalVolume = acidVolume + baseVolume;
      const hConcentration = remainingAcid / totalVolume;
      currentPh = -Math.log10(hConcentration);
    } else if (baseVolume === equivalenceVolume) {
      // Equivalence point
      currentPh = 7.0;
      currentColor = 'bg-pink-200 dark:bg-pink-900/80'; // Pale pink for endpoint
    } else {
      // Excess base
      const molesAcid = acidVolume * 0.1;
      const molesBase = baseVolume * baseConc;
      const excessBase = molesBase - molesAcid;
      const totalVolume = acidVolume + baseVolume;
      const ohConcentration = excessBase / totalVolume;
      const pOh = -Math.log10(ohConcentration);
      currentPh = 14 - pOh;
      currentColor = 'bg-pink-500'; // Magenta
    }

    setPh(Number(currentPh.toFixed(2)));
    setColor(currentColor);

    // Check win condition
    if (baseVolume === equivalenceVolume && !showSuccess) {
      setTimeout(() => {
        setShowSuccess(true);
        addScore(100);
      }, 1000);
    } else if (baseVolume > equivalenceVolume && !showSuccess) {
      setIsOverTiturated(true);
    }

  }, [baseVolume, showSuccess, addScore]);

  const reset = () => {
    setBaseVolume(0);
    setPh(1);
    setColor('bg-white');
    setShowSuccess(false);
    setIsOverTiturated(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Titrasi Asam Basa
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Titrasi HCl dengan NaOH
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Teteskan larutan basa (NaOH) perlahan-lahan ke dalam erlenmeyer berisi HCl 25 mL dan indikator Fenolftalein. Berhenti tepat saat warna berubah merah muda pucat (Titik Ekivalen)!
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
                Sebanyak 25 mL larutan HCl dititrasi dengan NaOH 0,1 M. Jika titik ekivalen tercapai saat volume NaOH yang ditambahkan adalah 25 mL, berapakah konsentrasi larutan HCl tersebut?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rumus Titrasi: <strong>V₁ × M₁ = V₂ × M₂</strong><br/>
                  25 mL × M₁ = 25 mL × 0,1 M<br/>
                  M₁ = (25 × 0,1) / 25<br/>
                  M₁ = <strong>0,1 M</strong>
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa indikator fenolftalein (PP) cocok digunakan untuk titrasi asam kuat dengan basa kuat?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Titrasi asam kuat (seperti HCl) dengan basa kuat (seperti NaOH) memiliki titik ekivalen pada pH = 7. Indikator PP memiliki trayek perubahan warna pada pH 8,3 - 10,0. Walaupun sedikit di atas 7, kurva titrasi asam kuat-basa kuat naik sangat tajam di sekitar titik ekivalen, sehingga penambahan setetes basa (0,05 mL) saja sudah mengubah pH dari ~4 langsung ke ~10, memicu perubahan warna indikator PP yang tajam (tak berwarna → merah muda pucat).
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
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Titrasi Sempurna!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Titik Ekivalen Tercapai (pH 7.0)</p>
                <p className="text-sm leading-relaxed mb-2">
                  Luar biasa! Anda berhenti tepat di mana mol asam sama dengan mol basa. Warna merah muda pucat menandakan indikator Fenolftalein mulai berubah warna.
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={reset}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Titrasi
              </button>
            </div>
          )}

          {isOverTiturated && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-red-600/95 dark:bg-red-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-white">X</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Kelebihan Basa!</h3>
              <div className="bg-red-800/50 dark:bg-red-900/80 border border-red-400/50 p-4 rounded-xl text-red-50 max-w-md">
                <p className="font-bold text-lg mb-2">pH = {ph}</p>
                <p className="text-sm leading-relaxed mb-2">
                  Warna menjadi merah muda pekat/magenta. Anda meneteskan terlalu banyak basa sehingga melewati titik ekivalen. Ulangi dan lakukan perlahan!
                </p>
              </div>
              <button 
                onClick={reset}
                className="mt-6 px-6 py-2.5 bg-white text-red-700 rounded-xl font-bold hover:bg-red-50 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          <div className="flex-1 flex flex-col items-center justify-center relative">
            
            {/* Reaction Visualizer */}
            {baseVolume > 0 && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 shadow-lg animate-in fade-in slide-in-from-top-4 flex items-center justify-center gap-6 z-10 w-[90%] max-w-sm">
                 <div className="text-center">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-1.5">Reaksi Netralisasi Terkini</span>
                    <div className="font-mono text-xl font-black flex items-center justify-center gap-2">
                       <span className="text-red-500">H⁺</span>
                       <span className="text-gray-400">+</span>
                       <span className="text-blue-500">OH⁻</span>
                       <span className="text-gray-400">→</span>
                       <span className="text-emerald-500 relative">
                         H₂O
                         <span key={baseVolume} className="absolute -top-4 -right-8 text-xs text-emerald-500 font-bold animate-out fade-out slide-out-to-top-4 duration-1000">+1</span>
                       </span>
                    </div>
                 </div>
                 <div className="w-px h-12 bg-gray-200 dark:bg-gray-700"></div>
                 <div className="text-left text-xs font-mono space-y-1">
                    <div className="text-red-600 dark:text-red-400 font-semibold"><span className="inline-block w-12">Asam:</span> {(acidVolume * baseConc).toFixed(1)} mmol</div>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold"><span className="inline-block w-12">Basa:</span> {(baseVolume * baseConc).toFixed(1)} mmol</div>
                 </div>
              </div>
            )}

            {/* Burette Setup */}
            <div className="relative flex flex-col items-center h-80 mt-28">
              
              {/* Burette */}
              <div className="w-6 h-40 border-2 border-slate-400 dark:border-slate-600 rounded-sm relative bg-white dark:bg-gray-900/50 shadow-inner">
                {/* NaOH Level */}
                <div 
                  className="absolute bottom-0 w-full bg-cyan-200/80 dark:bg-cyan-600/60 transition-all duration-300"
                  style={{ height: `${100 - (baseVolume / 50) * 100}%` }}
                ></div>
                {/* Markings */}
                <div className="absolute inset-y-0 right-0 w-1.5 flex flex-col justify-between py-2 z-10">
                  <div className="w-full h-[2px] bg-slate-500"></div>
                  <div className="w-full h-[2px] bg-slate-500"></div>
                  <div className="w-full h-[2px] bg-slate-500"></div>
                </div>
              </div>
              
              {/* Stopcock */}
              <div className="w-8 h-4 bg-slate-500 dark:bg-slate-600 rounded-sm mt-1 z-10 flex items-center justify-center shadow-md">
                <div className="w-10 h-2.5 bg-slate-800 dark:bg-slate-950 rounded-full cursor-pointer hover:bg-emerald-500 transition-colors"></div>
              </div>
              
              {/* Drop animation */}
              <div className="h-8 w-1 flex flex-col items-center justify-start overflow-hidden">
                <div className="w-2 h-2 bg-cyan-300 dark:bg-cyan-500 rounded-full animate-bounce shadow-sm"></div>
              </div>

              {/* Erlenmeyer Flask */}
              <div className="relative w-24 h-24 mt-2 filter drop-shadow-sm">
                {/* Flask Body */}
                <div className="absolute bottom-0 w-24 h-16 border-b-4 border-x-4 border-slate-400 dark:border-slate-600 rounded-b-xl rounded-t-lg z-10 clip-triangle" style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }}></div>
                {/* Flask Neck */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-10 border-x-4 border-slate-400 dark:border-slate-600 z-10"></div>
                
                {/* Liquid in Flask */}
                <div className="absolute bottom-0 w-full h-12 flex justify-center z-0 overflow-hidden rounded-b-lg">
                  <div 
                    className={`absolute bottom-0 w-[120%] h-14 ${color} transition-colors duration-700 ease-in-out`}
                    style={{ clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* pH Display */}
            <div className="mt-8 bg-gray-100 dark:bg-gray-800 px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center gap-4">
              <span className="font-bold text-gray-500 dark:text-gray-400 uppercase text-xs tracking-wider">METERAN pH</span>
              <span className="text-4xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                {ph.toFixed(2)}
              </span>
            </div>
            
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-emerald-500" />
              Kontrol Buret (NaOH 0.1M)
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl flex justify-between items-center border border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Volume Tertetes:</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{baseVolume} mL</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addDrop}
                  className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-sm transition-colors dark:bg-emerald-500/20 dark:text-emerald-400 dark:border dark:border-emerald-500/30 dark:hover:bg-emerald-500/30"
                >
                  +1 mL
                </button>
                <button
                  onClick={addTenDrops}
                  className="py-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-xl shadow-sm transition-colors dark:bg-emerald-900/40 dark:text-emerald-300 dark:hover:bg-emerald-900/60"
                >
                  +5 mL
                </button>
              </div>

              <button 
                onClick={reset}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold transition-colors w-full mt-2"
              >
                <RefreshCw className="w-4 h-4" /> Ulangi dari Awal
              </button>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Teori Titrasi
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              Titrasi adalah metode menentukan konsentrasi larutan dengan mereaksikannya bersama larutan baku yang sudah diketahui konsentrasinya.
            </p>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold block mb-1">Reaksi Netralisasi:</span>
              <span className="font-mono text-slate-700 dark:text-slate-300">HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)</span>
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
                <BookOpen className="h-5 w-5 text-emerald-500" /> Teori Titrasi Asam Basa
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Pengertian Titrasi</h4>
                <p>Titrasi adalah analisis kuantitatif untuk menentukan konsentrasi (molaritas) suatu larutan asam atau basa dengan menggunakan larutan standar yang sudah diketahui konsentrasinya secara pasti.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Titik Ekivalen vs Titik Akhir Titrasi</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Titik Ekivalen:</strong> Keadaan di mana mol asam tepat habis bereaksi dengan mol basa (secara stoikiometri). Secara teori terjadi pada pH tertentu (pH=7 untuk kuat-kuat).</li>
                  <li><strong>Titik Akhir Titrasi:</strong> Keadaan saat titrasi dihentikan karena indikator baru saja berubah warna. Idealnya sedekat mungkin dengan Titik Ekivalen.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Rumus Praktis Titrasi</h4>
                <div className="bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 p-3 rounded-lg font-mono font-bold text-center">
                  V(asam) × M(asam) × Valensi(asam) = V(basa) × M(basa) × Valensi(basa)
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">4. Alat Utama Titrasi</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Buret:</strong> Tabung kaca berskala untuk meneteskan larutan standar (titran) secara perlahan.</li>
                  <li><strong>Erlenmeyer:</strong> Wadah untuk larutan yang dicari konsentrasinya (titrat) dan dicampur dengan tetesan indikator.</li>
                  <li><strong>Indikator:</strong> Zat yang berubah warna pada rentang pH tertentu untuk mendeteksi batas akhir reaksi.</li>
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
