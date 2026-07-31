'use client';

import React, { useState, useEffect } from 'react';
import { Activity, BookOpen, X, Lightbulb, Target, Star, MoveHorizontal, Satellite } from 'lucide-react';

const TECHNOLOGIES = [
  { 
    id: 'radio', 
    name: 'Pemancar Radio FM', 
    band: 'Gelombang Radio', 
    desc: 'Digunakan untuk mentransmisikan sinyal suara jarak jauh. Gelombangnya bisa merambat melalui atmosfer dan dipantulkan oleh ionosfer.',
    icon: '📻',
    color: 'bg-red-50 text-red-700 border-red-200'
  },
  { 
    id: 'microwave', 
    name: 'Oven Microwave & Radar', 
    band: 'Gelombang Mikro', 
    desc: 'Dapat memanaskan molekul air dalam makanan (oven) dan memantulkan gelombang ke objek keras untuk mengukur jarak (Radar penerbangan).',
    icon: '📡',
    color: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  { 
    id: 'remote', 
    name: 'Remote TV & Sensor', 
    band: 'Inframerah (IR)', 
    desc: 'Remote TV menggunakan LED inframerah untuk mengirimkan sinyal digital ke sensor TV.',
    icon: '📺',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  },
  { 
    id: 'lamp', 
    name: 'Lampu Penerangan', 
    band: 'Cahaya Tampak', 
    desc: 'Cahaya yang dapat dideteksi oleh mata manusia. Berguna untuk penerangan, serat optik, dan fotosintesis tanaman.',
    icon: '💡',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  { 
    id: 'uv', 
    name: 'Sterilisasi Air / Alat', 
    band: 'Ultraviolet (UV)', 
    desc: 'Mampu membunuh bakteri dan virus (UV-C), mengecek keaslian uang kertas, serta membantu tubuh memproduksi Vitamin D.',
    icon: '🧪',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  { 
    id: 'xray', 
    name: 'Rontgen Tulang (Medis)', 
    band: 'Sinar-X', 
    desc: 'Daya tembusnya tinggi sehingga bisa menembus daging tapi terhalang tulang, menciptakan bayangan kerangka (foto Rontgen).',
    icon: '🦴',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  { 
    id: 'gamma', 
    name: 'Radioterapi Kanker', 
    band: 'Sinar Gamma', 
    desc: 'Memiliki daya tembus paling kuat dan energi paling tinggi. Digunakan untuk membunuh sel kanker dan mensterilkan alat medis.',
    icon: '☢️',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
];

const BANDS = [
  'Gelombang Radio',
  'Gelombang Mikro',
  'Inframerah (IR)',
  'Cahaya Tampak',
  'Ultraviolet (UV)',
  'Sinar-X',
  'Sinar Gamma'
];

export default function EMApplicationsModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  const [selectedTechId, setSelectedTechId] = useState(TECHNOLOGIES[0].id);
  const selectedTech = TECHNOLOGIES.find(t => t.id === selectedTechId) || TECHNOLOGIES[0];

  // Gamification target
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [targetBand, setTargetBand] = useState(BANDS[3]); // Start with Cahaya Tampak

  const generateNewTarget = () => {
    const available = BANDS.filter(b => b !== targetBand);
    const next = available[Math.floor(Math.random() * available.length)];
    setTargetBand(next);
  };

  useEffect(() => {
    if (showSuccess) return;
    
    if (selectedTech.band === targetBand) {
      setShowSuccess(true);
      setScore(s => s + 100);
      const timer = setTimeout(() => {
        setShowSuccess(false);
        generateNewTarget();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedTech, targetBand, showSuccess]);

  // Render animation based on selected tech
  const renderAnimation = () => {
    switch (selectedTechId) {
      case 'radio':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(100, 150)">
              {/* Antenna */}
              <line x1="0" y1="0" x2="0" y2="-80" stroke="#94a3b8" strokeWidth="4" />
              <circle cx="0" cy="-80" r="5" fill="#ef4444" />
              <path d="M -15 -60 L 0 -80 L 15 -60" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M -25 -40 L 0 -80 L 25 -40" fill="none" stroke="#94a3b8" strokeWidth="2" />
              
              {/* Waves (animated via CSS) */}
              <circle cx="0" cy="-80" r="20" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="0" cy="-80" r="40" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
              <circle cx="0" cy="-80" r="60" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }} />
            </g>
            <g transform="translate(400, 150)">
              {/* Receiver (Radio) */}
              <rect x="-20" y="-30" width="40" height="30" rx="4" fill="#334155" />
              <line x1="-15" y1="-30" x2="-25" y2="-60" stroke="#94a3b8" strokeWidth="2" />
              <circle cx="10" cy="-15" r="5" fill="#1e293b" />
            </g>
          </svg>
        );
      case 'microwave':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(100, 100)">
              {/* Radar Dish */}
              <path d="M 0 -40 A 40 40 0 0 0 0 40 L -10 0 Z" fill="#94a3b8" />
              <line x1="0" y1="0" x2="20" y2="0" stroke="#cbd5e1" strokeWidth="3" />
              <circle cx="20" cy="0" r="3" fill="#ef4444" />
              
              {/* Waves Out */}
              <path d="M 40 -20 A 30 30 0 0 1 40 20" fill="none" stroke="#f97316" strokeWidth="2" className="animate-ping" style={{ animationDuration: '2s' }} />
              <path d="M 60 -40 A 50 50 0 0 1 60 40" fill="none" stroke="#f97316" strokeWidth="2" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
            </g>
            
            <g transform="translate(350, 100)">
              {/* Airplane Target */}
              <path d="M 0 -10 L 40 0 L 0 10 L 10 0 Z" fill="#64748b" />
              
              {/* Waves Reflecting (Return) */}
              <path d="M -20 -15 A 20 20 0 0 0 -20 15" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1.2s' }} />
            </g>
          </svg>
        );
      case 'remote':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(150, 120)">
              {/* Remote Control */}
              <rect x="-15" y="-10" width="30" height="60" rx="4" fill="#334155" />
              <circle cx="0" cy="-10" r="4" fill="#ef4444" /> {/* IR LED */}
              <rect x="-8" y="0" width="16" height="10" rx="2" fill="#475569" />
              <circle cx="0" cy="20" r="6" fill="#ef4444" /> {/* Button */}
              
              {/* IR Signal pulses */}
              <circle cx="0" cy="-10" r="15" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" style={{ animationDuration: '1s' }} />
              <path d="M 15 -10 L 250 -10" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 10" className="animate-pulse" />
            </g>
            
            <g transform="translate(420, 110)">
              {/* TV Sensor */}
              <rect x="-30" y="-40" width="60" height="40" fill="#1e293b" />
              <circle cx="0" cy="-20" r="5" fill="#ef4444" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <rect x="-40" y="-50" width="80" height="60" rx="4" fill="none" stroke="#334155" strokeWidth="4" />
            </g>
          </svg>
        );
      case 'lamp':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(250, 100)">
              {/* Lightbulb */}
              <path d="M -15 20 L 15 20 L 10 40 L -10 40 Z" fill="#94a3b8" />
              <circle cx="0" cy="0" r="25" fill="#fef08a" className="animate-pulse" />
              
              {/* Visible Light Rays */}
              {[...Array(8)].map((_, i) => (
                <line 
                  key={i}
                  x1={Math.cos(i * Math.PI / 4) * 35} 
                  y1={Math.sin(i * Math.PI / 4) * 35} 
                  x2={Math.cos(i * Math.PI / 4) * 60} 
                  y2={Math.sin(i * Math.PI / 4) * 60} 
                  stroke="#eab308" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              ))}
            </g>
          </svg>
        );
      case 'uv':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(250, 60)">
              {/* UV Lamp Tube */}
              <rect x="-60" y="-10" width="120" height="20" rx="10" fill="#bae6fd" />
              <rect x="-60" y="-10" width="120" height="20" rx="10" fill="none" stroke="#38bdf8" strokeWidth="2" className="animate-pulse" />
              
              {/* UV Rays going down */}
              {[...Array(5)].map((_, i) => (
                <path 
                  key={i}
                  d={`M ${-40 + i*20} 20 Q ${-45 + i*20} 50, ${-40 + i*20} 80 T ${-40 + i*20} 120`}
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="2" 
                  strokeDasharray="5 5"
                  className="animate-pulse"
                />
              ))}
            </g>
            
            <g transform="translate(250, 160)">
              {/* Bacteria being destroyed */}
              <circle cx="-30" cy="0" r="8" fill="#22c55e" />
              <path d="M -35 -5 L -25 5 M -25 -5 L -35 5" stroke="#166534" strokeWidth="2" /> {/* Dead eyes */}
              
              <circle cx="30" cy="-10" r="6" fill="#22c55e" />
              <path d="M 27 -13 L 33 -7 M 33 -13 L 27 -7" stroke="#166534" strokeWidth="2" /> {/* Dead eyes */}
            </g>
          </svg>
        );
      case 'xray':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(150, 100)">
              {/* X-Ray Emitter */}
              <rect x="-20" y="-30" width="40" height="60" rx="5" fill="#334155" />
              <rect x="20" y="-10" width="10" height="20" fill="#64748b" />
              
              {/* X-Ray Beams */}
              <path d="M 30 -10 L 150 -50 L 150 50 Z" fill="#6366f1" opacity="0.2" className="animate-pulse" />
            </g>
            
            <g transform="translate(300, 100)">
              {/* Hand/Flesh Outline */}
              <path d="M 0 -40 Q 20 -40, 20 -10 Q 30 -10, 30 0 Q 30 10, 20 10 Q 20 40, 0 40 Z" fill="#fca5a5" opacity="0.5" />
              
              {/* Bones Inside */}
              <rect x="-10" y="-30" width="15" height="20" rx="5" fill="#f8fafc" />
              <rect x="-10" y="-5" width="20" height="15" rx="5" fill="#f8fafc" />
              <rect x="-10" y="15" width="15" height="20" rx="5" fill="#f8fafc" />
              
              {/* Film Plate */}
              <rect x="50" y="-60" width="10" height="120" fill="#1e293b" />
            </g>
          </svg>
        );
      case 'gamma':
        return (
          <svg viewBox="0 0 500 200" className="w-full h-full drop-shadow-lg">
            <g transform="translate(150, 100)">
              {/* Gamma source (Cobalt-60 machine) */}
              <circle cx="0" cy="0" r="30" fill="#334155" />
              <circle cx="0" cy="0" r="10" fill="#a855f7" className="animate-pulse" />
              <rect x="30" y="-5" width="20" height="10" fill="#475569" />
              
              {/* Gamma Ray Beams (highly concentrated) */}
              <line x1="50" y1="0" x2="250" y2="0" stroke="#a855f7" strokeWidth="4" className="animate-pulse" />
            </g>
            
            <g transform="translate(350, 100)">
              {/* Cancer Cells */}
              <circle cx="-10" cy="-10" r="15" fill="#ef4444" />
              <circle cx="10" cy="5" r="12" fill="#ef4444" />
              <circle cx="5" cy="-20" r="10" fill="#ef4444" />
              <circle cx="-5" cy="15" r="14" fill="#ef4444" />
              
              {/* Destruction effect */}
              <path d="M -20 -20 L 20 20 M -20 20 L 20 -20" stroke="#fcd34d" strokeWidth="3" opacity="0.7" className="animate-ping" style={{ animationDuration: '0.5s' }} />
            </g>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Satellite className="h-3.5 w-3.5" /> Bab 5: Gelombang Elektromagnetik (Sub 3)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Pemanfaatan Teknologi GEM</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Berbagai jenis spektrum gelombang elektromagnetik telah dimanfaatkan secara luar biasa dalam kehidupan sehari-hari, kedokteran, hingga industri berkat perbedaan sifat energi dan panjang gelombangnya.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowTheoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-sm font-semibold rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Kasus 1: Radar Cuaca</p>
                  <p className="mb-2">Sebuah stasiun pemancar radar mengirimkan pulsa gelombang mikro ke arah awan badai. Sinyal pantulan diterima kembali setelah 0,002 sekon. Berapakah jarak awan badai tersebut dari stasiun radar? (c = 3 &times; 10&sup8; m/s)</p>
                  <p className="font-semibold text-purple-700 dark:text-purple-400 mb-1">Penyelesaian:</p>
                  <p>1. Waktu tempuh total = 0,002 s (pulsa bolak-balik)<br/>
                  2. Waktu untuk mencapai awan = 0,002 / 2 = 0,001 s<br/>
                  3. Jarak (s) = v &times; t = (3 &times; 10&sup8;) &times; (1 &times; 10&supmin;&sup3;) = <strong>3 &times; 10&sup5; m</strong> atau <strong>300 km</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Gamification Target Panel */}
        <div className="w-full md:w-72 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-2xl p-1 shadow-lg shadow-purple-500/20 text-white shrink-0">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Target className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-purple-50 flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-300 fill-amber-300" /> Tantangan
                </h3>
                <span className="bg-white/20 px-2.5 py-1 rounded-full text-xs font-bold font-mono">
                  {score} PTS
                </span>
              </div>
              <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                Pilih teknologi yang menggunakan <strong className="text-white text-lg bg-white/20 px-2 py-0.5 rounded">{targetBand}</strong>!
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
              <Activity className="h-5 w-5 text-purple-500" />
              Simulasi Aplikasi Teknologi
            </h3>

            {/* Animation Area */}
            <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-slate-900 rounded-xl overflow-hidden mb-6 border border-slate-800 flex items-center justify-center">
              
              {renderAnimation()}
              
              <div className="absolute top-4 left-4">
                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <span className="text-white font-bold">{selectedTech.name}</span>
                </div>
              </div>

              {/* Success Overlay directly in the chart container */}
              {showSuccess && (
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20 transition-all duration-300 animate-in fade-in">
                  <div className="bg-gradient-to-br from-purple-500 to-fuchsia-600 p-6 rounded-3xl shadow-2xl flex flex-col items-center transform animate-in zoom-in-95 duration-500 border-2 border-purple-300/50">
                    <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-2 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)] animate-bounce" />
                    <h4 className="font-black text-2xl text-white drop-shadow-md tracking-tight">Benar Sekali!</h4>
                    <p className="text-purple-50 font-bold mt-2 bg-black/20 px-4 py-1.5 rounded-full text-sm shadow-inner">+100 Poin Tambahan</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className={`p-4 rounded-xl border ${selectedTech.color}`}>
              <div className="font-bold text-lg mb-1">{selectedTech.band}</div>
              <p className="text-sm opacity-90">{selectedTech.desc}</p>
            </div>

          </div>
        </div>

        {/* Right Col: Controls */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MoveHorizontal className="h-5 w-5 text-purple-500" />
              Pilih Teknologi
            </h3>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {TECHNOLOGIES.map((tech) => (
                <button
                  key={tech.id}
                  onClick={() => setSelectedTechId(tech.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-200 flex items-center gap-3 ${
                    selectedTechId === tech.id 
                      ? 'bg-purple-100 border-purple-300 shadow-sm dark:bg-purple-900/40 dark:border-purple-700' 
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-gray-800/50 dark:border-gray-700 dark:hover:bg-gray-800'
                  } border`}
                >
                  <div className="text-2xl">{tech.icon}</div>
                  <div>
                    <div className={`font-bold text-sm ${selectedTechId === tech.id ? 'text-purple-900 dark:text-purple-100' : 'text-gray-700 dark:text-gray-300'}`}>
                      {tech.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-900/50 flex gap-3 shadow-sm">
            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <p>
                <strong>Tahukah Kamu?</strong> Walaupun sinar UV, X, dan Gamma bisa berbahaya bagi manusia jika terpapar lama, dengan kendali yang tepat ketiganya justru sangat bermanfaat di bidang kesehatan (sterilisasi dan membunuh sel kanker).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-purple-50 dark:bg-purple-900/20">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                Teori Pemanfaatan Spektrum GEM
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
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Kenapa Spektrum Dibedakan?</h4>
                <p className="mb-3">
                  Perbedaan frekuensi dan panjang gelombang menyebabkan gelombang elektromagnetik memiliki sifat fisik yang berbeda (seperti daya tembus dan tingkat energi). Itulah sebabnya setiap pita spektrum memiliki aplikasi yang sangat spesifik.
                </p>
              </section>

              <section>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pemanfaatan Secara Umum:</h4>
                <ul className="list-disc list-inside space-y-3 ml-2">
                  <li>
                    <strong>Gelombang Radio:</strong> Komunikasi jarak jauh (TV, Radio, Seluler) karena bisa memantul di lapisan ionosfer.
                  </li>
                  <li>
                    <strong>Gelombang Mikro:</strong> Radar (mendeteksi pesawat terbang), komunikasi satelit, dan oven microwave (menggetarkan molekul air).
                  </li>
                  <li>
                    <strong>Inframerah:</strong> Remote TV, sensor pintu otomatis, night-vision goggle (kacamata malam), fotografi pemetaan panas.
                  </li>
                  <li>
                    <strong>Cahaya Tampak:</strong> Serat optik dalam telekomunikasi, penerangan, laser, fotosintesis, dan alat bantu optik.
                  </li>
                  <li>
                    <strong>Ultraviolet:</strong> Mendeteksi uang palsu, membunuh bakteri dalam air (sterilisasi), membantu pembentukan Vitamin D pada tulang.
                  </li>
                  <li>
                    <strong>Sinar-X:</strong> Pemotretan organ dalam (Rontgen) tulang dan paru-paru, CT scan, dan analisis struktur kristal (difraksi).
                  </li>
                  <li>
                    <strong>Sinar Gamma:</strong> Terapi pengobatan kanker (membidik sel ganas), sterilisasi alat bedah medis, pestisida iradiasi untuk pengawetan makanan.
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
