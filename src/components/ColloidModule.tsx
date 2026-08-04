'use client';

import React, { useState, useEffect } from 'react';
import { Beaker, Info, Star, Flashlight, RefreshCw, BookOpen, X, ChevronDown, ChevronUp, Droplets, FlaskConical } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Mixture = {
  id: string;
  name: string;
  type: string;
  particleSize: string;
  desc: string;
  color: string;
  particles: { color: string, size: string, count: number }[];
  beamVisible: boolean;
  beamBlocked: boolean;
  settles: boolean;
};

const MIXTURES: Mixture[] = [
  { 
    id: 'solution', name: 'Air Garam', type: 'Larutan Sejati', particleSize: '< 1 nm', 
    desc: 'Campuran homogen. Partikel sangat kecil sehingga tidak dapat menghamburkan cahaya (Tidak ada Efek Tyndall).', 
    color: 'bg-blue-300/10', 
    particles: [{ color: 'bg-blue-400', size: 'w-1 h-1', count: 10 }],
    beamVisible: false, beamBlocked: false, settles: false
  },
  { 
    id: 'colloid', name: 'Susu Cair', type: 'Sistem Koloid', particleSize: '1 nm - 100 nm', 
    desc: 'Tampak homogen secara makroskopis tapi heterogen secara mikroskopis. Partikel cukup besar untuk menghamburkan cahaya (Efek Tyndall).', 
    color: 'bg-amber-100/70', 
    particles: [{ color: 'bg-white', size: 'w-2 h-2', count: 15 }],
    beamVisible: true, beamBlocked: false, settles: false
  },
  { 
    id: 'suspension', name: 'Air Kopi / Pasir', type: 'Suspensi', particleSize: '> 100 nm', 
    desc: 'Campuran heterogen. Partikel sangat besar, menghalangi cahaya secara signifikan dan akan mengendap jika didiamkan.', 
    color: 'bg-amber-800/60', 
    particles: [
      { color: 'bg-stone-900', size: 'w-2.5 h-2.5', count: 20 },
      { color: 'bg-amber-950', size: 'w-3 h-2', count: 15 }
    ],
    beamVisible: true, beamBlocked: true, settles: true
  },
];

export default function ColloidModule() {
  const { addScore } = useUser();
  const [activeMixture, setActiveMixture] = useState<Mixture>(MIXTURES[0]);
  const [laserOn, setLaserOn] = useState(false);
  const [settlingTime, setSettlingTime] = useState(0); // 0 to 100
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [tested, setTested] = useState<Set<string>>(new Set(['solution']));
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Handle settling animation for suspension
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeMixture.settles) {
      interval = setInterval(() => {
        setSettlingTime(prev => (prev < 100 ? prev + 1 : 100));
      }, 50);
    } else {
      setSettlingTime(0);
    }
    return () => clearInterval(interval);
  }, [activeMixture]);

  const handleTest = (mix: Mixture) => {
    setActiveMixture(mix);
    setLaserOn(false);
    setSettlingTime(0);

    setTested(prev => {
      const next = new Set(prev).add(mix.id);
      if (next.size === MIXTURES.length && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1000);
      }
      return next;
    });
  };

  const reset = () => {
    setActiveMixture(MIXTURES[0]);
    setLaserOn(false);
    setSettlingTime(0);
  };

  const renderParticles = () => {
    const items = [];
    activeMixture.particles.forEach((pConf, idx) => {
      for (let j = 0; j < pConf.count; j++) {
        // If it settles, particles slowly fall to the bottom based on settlingTime
        // At settlingTime = 0, spread evenly. At 100, clustered at bottom.
        let targetTop = 10 + Math.random() * 80;
        if (activeMixture.settles && settlingTime > 0) {
           const fallProgress = settlingTime / 100;
           // Define a random settling spot at the bottom (between 82% and 94%)
           const finalBottomPosition = 82 + Math.random() * 12;
           targetTop = targetTop + (finalBottomPosition - targetTop) * fallProgress;
        }

        const left = 5 + Math.random() * 90; 
        items.push(
          <div 
            key={`${idx}-${j}`} 
            className={`absolute rounded-full ${pConf.color} opacity-80 ${pConf.size} transition-all duration-300`}
            style={{ 
              top: `${targetTop}%`, 
              left: `${left}%`,
            }}
          ></div>
        );
      }
    });
    return items;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          Simulasi Sistem Dispersi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Efek Tyndall pada Koloid
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Nyalakan senter laser untuk mengamati bagaimana cahaya berinteraksi dengan Larutan Sejati, Koloid, dan Suspensi. Efek penghamburan cahaya ini disebut Efek Tyndall. Uji ketiganya untuk mendapatkan poin!
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
                Sinar matahari yang masuk melalui celah sempit ke dalam ruangan gelap akan terlihat seperti tiang cahaya, dan debu berterbangan terlihat jelas. Peristiwa ini merupakan contoh dari...
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Peristiwa tersebut adalah contoh <strong>Efek Tyndall</strong> di kehidupan sehari-hari. Udara berdebu merupakan sistem koloid (aerosol padat). Partikel debu yang cukup besar menghamburkan cahaya matahari sehingga berkas cahaya menjadi terlihat.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa larutan gula tidak menunjukkan efek Tyndall, sedangkan campuran susu dalam air menunjukkannya?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Larutan gula adalah <strong>larutan sejati</strong> yang ukuran partikel zat terlarutnya sangat kecil (&lt; 1 nm), sehingga cahaya diteruskan lurus tanpa dihamburkan. Susu adalah <strong>koloid</strong> dengan ukuran partikel lebih besar (1-100 nm), yang cukup untuk menghamburkan berkas cahaya.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Lab Area */}
        <div className="bg-slate-900 dark:bg-gray-950 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center">
          
          {showSuccess && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-emerald-600/95 dark:bg-emerald-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Eksperimen Selesai!</h3>
              <div className="bg-emerald-800/50 dark:bg-emerald-900/80 border border-emerald-400/50 p-4 rounded-xl text-emerald-50 max-w-md">
                <p className="font-bold text-lg mb-2">Memahami Sistem Dispersi</p>
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah membuktikan secara visual perbedaan Larutan Sejati (cahaya diteruskan), Koloid (cahaya dihamburkan), dan Suspensi (cahaya dihalangi & mengendap).
                </p>
                <span className="text-emerald-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={() => { setShowSuccess(false); setTested(new Set(['solution'])); reset(); }}
                className="mt-6 px-6 py-2.5 bg-white text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-colors"
              >
                Ulangi Simulasi
              </button>
            </div>
          )}

          {/* Background grid for dark room effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none"></div>

          <div className="flex-1 flex flex-col items-center justify-center relative w-full z-10 pt-10">
            
            <div className="flex items-center w-full max-w-lg justify-start relative">
               {/* Senter Laser */}
               <div className="relative w-24 h-12 bg-gray-700 rounded-l-md rounded-r-3xl flex items-center shadow-lg border-2 border-gray-600 z-30 mr-8 flex-shrink-0">
                  <div className="absolute left-2 w-4 h-6 bg-gray-500 rounded-sm"></div>
                  <div className="absolute right-0 w-6 h-full bg-gray-800 rounded-r-3xl flex items-center justify-center border-l border-gray-900">
                     <div className={`w-3 h-8 rounded-r-full ${laserOn ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]' : 'bg-gray-900'}`}></div>
                  </div>
                  <button 
                    onClick={() => setLaserOn(!laserOn)}
                    className="absolute left-8 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 active:bg-red-600 transition-colors shadow-sm"
                  >
                     <Flashlight className="w-3 h-3 text-white" />
                  </button>
               </div>

               {/* Laser Beam (Before Beaker) */}
               {laserOn && (
                 <div className="absolute left-24 w-12 h-2 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20"></div>
               )}

               {/* Beaker Representation */}
               <div className="relative w-40 h-56 z-20 mx-auto filter drop-shadow-2xl">
                 {/* Beaker Glass (Front) */}
                 <div className="absolute inset-0 border-4 border-b-[12px] border-white/20 rounded-b-3xl rounded-t-lg z-30 pointer-events-none"></div>
                 <div className="absolute top-0 inset-x-4 h-2 bg-white/10 rounded-full z-30 pointer-events-none"></div>
                 
                 {/* Liquid */}
                 <div className={`absolute bottom-3 inset-x-2 h-44 rounded-b-2xl ${activeMixture.color} transition-colors duration-1000 overflow-hidden z-20`}>
                   
                   {/* Laser Beam inside liquid (Tyndall Effect) */}
                   {laserOn && (
                     <div className={`absolute top-1/2 -translate-y-1/2 left-0 h-4 bg-red-500 shadow-[0_0_20px_rgba(239,68,68,1)] transition-all duration-300 ${
                       activeMixture.beamVisible ? 'w-full opacity-100' : 'w-full opacity-0'
                     } ${
                       activeMixture.beamBlocked ? 'w-[40%] bg-gradient-to-r from-red-500 to-transparent' : ''
                     }`}></div>
                   )}

                   {/* Particles */}
                   {renderParticles()}
                 </div>
               </div>

               {/* Laser Beam (After Beaker) */}
               {laserOn && !activeMixture.beamBlocked && (
                 <div className="absolute left-[calc(6rem+2.5rem+10rem)] right-0 h-2 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] z-20 opacity-80"></div>
               )}
            </div>
            
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-500" />
              Pilih Sistem Dispersi
            </h3>
            
            <div className="grid gap-3">
              {MIXTURES.map(mix => {
                const isTested = tested.has(mix.id);
                const isActive = activeMixture.id === mix.id;
                
                return (
                  <button
                    key={mix.id}
                    onClick={() => handleTest(mix)}
                    className={`flex flex-col p-4 rounded-xl border text-left transition-all ${
                      isActive 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/50' 
                        : isTested
                          ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10'
                          : 'border-gray-200 bg-gray-50 hover:border-emerald-300 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-emerald-700'
                    }`}
                  >
                    <div className="flex justify-between w-full mb-1">
                       <h4 className={`font-bold ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-900 dark:text-gray-100'}`}>
                         {mix.name}
                       </h4>
                       <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                         {mix.type}
                       </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Ukuran: {mix.particleSize}</p>
                    
                    {isActive && (
                      <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 border-t border-emerald-200 dark:border-emerald-800/50 pt-3">
                        {mix.desc}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Petunjuk Eksperimen
            </h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed space-y-2 list-disc pl-4">
              <li>Pilih larutan dari menu di atas.</li>
              <li>Klik tombol merah pada <strong>senter</strong> untuk menyalakan laser.</li>
              <li>Amati jalur sinar laser di dalam gelas kimia. Jika terlihat menyala dan menyebar, itu adalah Efek Tyndall.</li>
              <li>Untuk suspensi (kopi/pasir), perhatikan bahwa partikelnya perlahan-lahan akan <strong>mengendap</strong> ke dasar gelas.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Sistem Koloid & Sifatnya
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
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">1. Sistem Dispersi</h4>
                <p>Campuran antara dua zat atau lebih dapat dibagi menjadi tiga berdasarkan ukuran partikelnya:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Larutan Sejati:</strong> &lt; 1 nm (Homogen, bening, tidak mengendap).</li>
                  <li><strong>Koloid:</strong> 1 - 100 nm (Tampak homogen, keruh, tidak mengendap).</li>
                  <li><strong>Suspensi:</strong> &gt; 100 nm (Heterogen, keruh, mengendap).</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">2. Efek Tyndall</h4>
                <p>Efek Tyndall adalah peristiwa penghamburan berkas cahaya oleh partikel-partikel koloid. Sifat ini sering digunakan untuk membedakan larutan sejati dengan sistem koloid.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">3. Sifat Koloid Lainnya</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Gerak Brown:</strong> Gerak zig-zag acak partikel koloid yang mencegahnya mengendap.</li>
                  <li><strong>Adsorpsi:</strong> Penyerapan ion pada permukaan partikel koloid (misal: penjernihan air dengan tawas).</li>
                  <li><strong>Koagulasi:</strong> Penggumpalan partikel koloid (misal: pembentukan delta di muara sungai).</li>
                  <li><strong>Elektroforesis:</strong> Pergerakan partikel koloid dalam medan listrik.</li>
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
