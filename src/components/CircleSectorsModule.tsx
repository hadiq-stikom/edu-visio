'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Pizza, Trophy, RefreshCw, Star, Info, Target, BookOpen, X, Lightbulb } from 'lucide-react';

type Mode = 'arc' | 'area' | 'combined';

export default function CircleSectorsModule({ mode = 'combined' }: { mode?: Mode }) {
  const [radius, setRadius] = useState(10); // cm
  const [angle, setAngle] = useState(90); // degrees
  
  const [targetType, setTargetType] = useState<'area' | 'arc' | 'combined'>('area');
  const [targetValue, setTargetValue] = useState(0);
  const [targetArea, setTargetArea] = useState(0);
  const [targetArc, setTargetArc] = useState(0);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{val: string, r: number, angle: number, type: string} | null>(null);
  
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  // Generate a random valid target based on integer r and angle multiple of 15
  const generateTarget = () => {
    let isArea = Math.random() > 0.5;
    if (mode === 'arc') isArea = false;
    if (mode === 'area') isArea = true;
    
    const r = Math.floor(Math.random() * 10) + 5; // 5 to 14
    const a = (Math.floor(Math.random() * 23) + 1) * 15; // 15, 30, ..., 345
    
    if (mode === 'combined') {
      setTargetType('combined');
      setTargetArea((a / 360) * Math.PI * r * r);
      setTargetArc((a / 360) * 2 * Math.PI * r);
      setTargetValue(0);
    } else {
      setTargetType(isArea ? 'area' : 'arc');
      if (isArea) {
        setTargetValue((a / 360) * Math.PI * r * r);
      } else {
        setTargetValue((a / 360) * 2 * Math.PI * r);
      }
    }
  };

  useEffect(() => {
    generateTarget();
  }, []);

  const currentArea = (angle / 360) * Math.PI * radius * radius;
  const currentArc = (angle / 360) * 2 * Math.PI * radius;

  useEffect(() => {
    if (targetType === 'combined' && (targetArea === 0 || targetArc === 0)) return;
    if (targetType !== 'combined' && targetValue === 0) return;
    
    let isSuccess = false;
    if (targetType === 'combined') {
      if (Math.abs(currentArea - targetArea) < 0.1 && Math.abs(currentArc - targetArc) < 0.1) {
        isSuccess = true;
      }
    } else {
      const current = targetType === 'area' ? currentArea : currentArc;
      if (Math.abs(current - targetValue) < 0.1) {
        isSuccess = true;
      }
    }
    
    // allow a small floating point margin
    if (isSuccess) {
      setShowSuccess(true);
      setSuccessData({
        val: targetType === 'combined' ? 'Sempurna!' : (targetType === 'area' ? currentArea.toFixed(1) : currentArc.toFixed(1)),
        r: radius,
        angle: angle,
        type: targetType === 'combined' ? 'Kombinasi Area & Busur' : (targetType === 'area' ? 'Luas Juring' : 'Panjang Busur')
      });
      setScore(s => s + (targetType === 'combined' ? 100 : 50));
      setTimeout(() => {
        setShowSuccess(false);
        generateTarget();
      }, 4000); // 4 seconds so they can read the reflection
    }
  }, [radius, angle, targetValue, targetArea, targetArc, targetType, currentArea, currentArc]);

  // SVG Drawing calculations
  const cx = 200;
  const cy = 200;
  const maxR = 20; // cm
  const maxPx = 150; // px
  const scale = maxPx / maxR;
  
  const pxRadius = radius * scale;
  
  // Angle for SVG (start at top, clockwise)
  // -90 degrees is top in SVG standard (0 is right)
  const startAngle = -90;
  const endAngle = startAngle + angle;
  
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  
  const x1 = cx + pxRadius * Math.cos(startRad);
  const y1 = cy + pxRadius * Math.sin(startRad);
  
  const x2 = cx + pxRadius * Math.cos(endRad);
  const y2 = cy + pxRadius * Math.sin(endRad);
  
  const largeArcFlag = angle > 180 ? 1 : 0;
  
  // To avoid drawing nothing when 360
  const pathData = angle === 360 
    ? `M ${cx} ${cy - pxRadius} A ${pxRadius} ${pxRadius} 0 1 1 ${cx - 0.1} ${cy - pxRadius} Z` 
    : `M ${cx} ${cy} L ${x1} ${y1} A ${pxRadius} ${pxRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

  const arcPathData = angle === 360
    ? `M ${cx} ${cy - pxRadius} A ${pxRadius} ${pxRadius} 0 1 1 ${cx - 0.1} ${cy - pxRadius}`
    : `M ${x1} ${y1} A ${pxRadius} ${pxRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Pizza className="h-3.5 w-3.5" /> Bab 2: Busur & Juring
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {mode === 'arc' ? 'Potong Pizza: Panjang Busur' : mode === 'area' ? 'Potong Pizza: Luas Juring' : 'Potong Pizza Target'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Sesuaikan jari-jari (<span className="italic">r</span>) dan sudut pusat (<span className="italic">θ</span>) untuk mendapatkan Luas Juring atau Panjang Busur yang diminta oleh pembeli.
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
                📝 Contoh Soal & Pembahasan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Luas Juring):</p>
                  <p className="mb-3">Sebuah loyang pizza memiliki jari-jari 14 cm. Jika dipotong dengan sudut 90°, berapakah luas potongan (juring) tersebut?</p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p>• Porsi lingkaran = 90° / 360° = 1/4<br/>• Luas total = π × r² = 22/7 × 14 × 14 = 616 cm²<br/>• Luas potongan = 1/4 × 616 = <strong>154 cm²</strong>.</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 2 (Panjang Busur):</p>
                  <p className="mb-3">Sebuah roda memiliki jari-jari 10 cm. Jika roda berputar sebesar 60°, berapa panjang jejak (busur) yang terbentuk?</p>
                  <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                  <p>• Porsi lingkaran = 60° / 360° = 1/6<br/>• Keliling total = 2 × π × r ≈ 2 × 3.14 × 10 = 62.8 cm<br/>• Panjang jejak = 1/6 × 62.8 ≈ <strong>10.47 cm</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Trophy className="h-8 w-8 text-amber-500 mb-2" />
          <span className="text-xs text-amber-700 dark:text-amber-400 font-bold uppercase">Skor Anda</span>
          <span className="text-3xl font-black text-amber-600 dark:text-amber-500">{score}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas & Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[450px] flex items-center justify-center">
            
            {showSuccess && successData && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-orange-500/95 backdrop-blur-sm animate-in fade-in duration-300 p-6 text-center">
                <Star className="h-16 w-16 text-yellow-300 fill-yellow-300 mb-3 animate-bounce" />
                <h3 className="text-3xl font-black text-white drop-shadow-md mb-2">Pesanan Sesuai!</h3>
                <div className="bg-orange-600/50 border border-orange-400/50 p-4 rounded-xl text-orange-50 max-w-sm">
                  <p className="font-bold text-lg mb-1">{successData.type} {successData.val !== 'Sempurna!' && `= ${successData.val}`}</p>
                  <p className="text-sm">Didapat dari radius <strong>{successData.r} cm</strong> dan sudut <strong>{successData.angle}°</strong>.</p>
                </div>
                <p className="text-orange-200 font-bold mt-4 text-xl">+{targetType === 'combined' ? 100 : 50} Poin</p>
              </div>
            )}

            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm min-w-[180px]">
              <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-400 font-bold">
                 <Target className="h-5 w-5" /> Target Pesanan
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Buat potongan dengan:</p>
              
              {targetType === 'combined' ? (
                <div className="space-y-2 mt-2">
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded border border-orange-100 dark:border-orange-800/50">
                    <div className="text-[10px] uppercase text-orange-600 dark:text-orange-400 font-bold">Luas Juring</div>
                    <div className="text-base font-black text-gray-900 dark:text-white leading-none mt-0.5">{targetArea.toFixed(1)} <span className="text-xs font-normal">cm²</span></div>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded border border-indigo-100 dark:border-indigo-800/50">
                    <div className="text-[10px] uppercase text-indigo-600 dark:text-indigo-400 font-bold">Panjang Busur</div>
                    <div className="text-base font-black text-gray-900 dark:text-white leading-none mt-0.5">{targetArc.toFixed(1)} <span className="text-xs font-normal">cm</span></div>
                  </div>
                </div>
              ) : (
                <div className="text-lg font-black text-gray-900 dark:text-white leading-tight mt-1">
                  {targetType === 'area' ? 'Luas Juring' : 'Panj. Busur'}<br/>
                  <span className="text-orange-500 text-2xl">{targetValue.toFixed(1)}</span> <span className="text-sm">{targetType === 'area' ? 'cm²' : 'cm'}</span>
                </div>
              )}
            </div>

            <svg width={400} height={400} viewBox="0 0 400 400" className="drop-shadow-xl">
              {/* Grid or background circle */}
              <circle cx={cx} cy={cy} r={maxPx} fill="transparent" stroke="currentColor" strokeWidth={1} strokeDasharray="4 4" className="text-gray-200 dark:text-gray-800" />
              
              {/* Full pizza base */}
              <circle cx={cx} cy={cy} r={pxRadius} className="fill-orange-50 dark:fill-orange-950/20 stroke-orange-200 dark:stroke-orange-900" strokeWidth={2} style={{ transition: 'r 0.3s ease' }} />
              
              {/* Sector Area (Juring) */}
              {angle > 0 && (
                <path 
                  d={pathData} 
                  className={`stroke-none transition-all duration-300 ${targetType === 'area' || targetType === 'combined' ? 'fill-orange-400/80 dark:fill-orange-500/80' : 'fill-orange-400/10 dark:fill-orange-500/10'}`} 
                />
              )}

              {/* Arc length highlight (Busur) */}
              {angle > 0 && (
                <path 
                  d={arcPathData} 
                  fill="none"
                  className={`transition-all duration-300 ${targetType === 'arc' || targetType === 'combined' ? 'stroke-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'stroke-orange-500/50'}`}
                  strokeWidth={targetType === 'arc' || targetType === 'combined' ? 10 : 3}
                  strokeLinecap="round"
                />
              )}

              {/* Radius lines */}
              <line x1={cx} y1={cy} x2={cx} y2={cy - pxRadius} stroke="#f97316" strokeWidth={2} style={{ transition: 'y2 0.3s ease' }} />
              <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#f97316" strokeWidth={2} style={{ transition: 'x2 0.1s ease, y2 0.1s ease' }} />
              
              {/* Center point */}
              <circle cx={cx} cy={cy} r={5} className="fill-orange-600" />
            </svg>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
             <div className={`rounded-2xl border p-4 shadow-sm text-center transition-all duration-300 ${targetType === 'area' || targetType === 'combined' ? 'bg-orange-50 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700 ring-2 ring-orange-500' : 'bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Luas Juring (Area)</p>
                <p className="text-2xl font-mono font-black text-orange-600">{currentArea.toFixed(1)} <span className="text-sm font-sans text-gray-400">cm²</span></p>
                <p className="text-[10px] text-gray-400 mt-2 font-mono">(θ/360) × π × r²</p>
             </div>
             <div className={`rounded-2xl border p-4 shadow-sm text-center transition-all duration-300 ${targetType === 'arc' || targetType === 'combined' ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-900/30 dark:border-indigo-700 ring-2 ring-indigo-500' : 'bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-800'}`}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Panjang Busur (Arc)</p>
                <p className="text-2xl font-mono font-black text-indigo-600">{currentArc.toFixed(1)} <span className="text-sm font-sans text-gray-400">cm</span></p>
                <p className="text-[10px] text-gray-400 mt-2 font-mono">(θ/360) × 2π × r</p>
             </div>
          </div>
          
          {mode === 'combined' && (
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm mt-2">
              <Info className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                <strong>Rahasia Kombinasi:</strong> Karena kamu diminta mencari 2 target sekaligus, menemukan sudut (θ) yang tepat tidaklah cukup. Kamu juga harus menggeser <strong>Jari-jari (r)</strong> hingga angkanya sama persis dengan pesanan!
              </div>
            </div>
          )}
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm mt-2">
            <Lightbulb className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong>Insight:</strong> Dengan sudut {angle}°, potongan ini mencakup <strong>{angle}/360</strong> dari total luas lingkaran dan total keliling lingkaran penuh.
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="h-4 w-4 text-orange-500" />
                Panel Kendali
             </h3>
             <button 
                onClick={generateTarget}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
                title="Ganti Target Pesanan"
             >
               <RefreshCw className="h-4 w-4" />
             </button>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-orange-800 dark:text-orange-300">Jari-jari (r)</label>
                <span className="text-sm font-mono font-bold text-orange-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{radius} cm</span>
              </div>
              <input type="range" min="1" max="20" step="1" value={radius} onChange={e => setRadius(parseFloat(e.target.value))} className="w-full accent-orange-500" />
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-indigo-800 dark:text-indigo-300">Sudut Pusat (θ)</label>
                <span className="text-sm font-mono font-bold text-indigo-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{angle}°</span>
              </div>
              <input type="range" min="0" max="360" step="5" value={angle} onChange={e => setAngle(parseFloat(e.target.value))} className="w-full accent-indigo-500" />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <strong>Tips:</strong> Luas Juring sebanding dengan luasan area arsir. Panjang Busur sebanding dengan panjang garis tepi lengkung berwarna tebal. Atur jari-jari dan sudut hingga perhitungan cocok dengan target!
          </div>
        </div>
      </div>
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-orange-500" /> Rumus Dasar
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">1. Lingkaran Penuh (360°)</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Luas (L)</strong> = π × r²</li>
                  <li><strong>Keliling (K)</strong> = 2 × π × r</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-2">2. Potongan / Sebagian Lingkaran (θ)</h4>
                <p className="mb-2">Semuanya ditentukan dari proporsi sudut (θ / 360°):</p>
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    <strong>Luas Juring (Luas area):</strong><br/>
                    <span className="font-mono bg-white dark:bg-gray-800 px-2 py-0.5 rounded ml-1">= (θ / 360) × Luas Lingkaran</span>
                  </li>
                  <li>
                    <strong>Panjang Busur (Panjang lengkung):</strong><br/>
                    <span className="font-mono bg-white dark:bg-gray-800 px-2 py-0.5 rounded ml-1">= (θ / 360) × Keliling Lingkaran</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-orange-200 dark:shadow-none"
              >
                Paham!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
