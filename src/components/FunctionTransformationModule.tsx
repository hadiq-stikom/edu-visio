'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Target, Trophy, RefreshCw, Star, Info, BookOpen, X, Lightbulb } from 'lucide-react';

const W = 600, H = 500;
const OX = 300, OY = 250;
const S = 30; // 1 unit = 30px

function svgX(mx: number): number { return OX + mx * S; }
function svgY(my: number): number { return OY - my * S; }

function buildPath(a: number, b: number, h: number, k: number, funcType: 'quad' | 'sin', xMin: number, xMax: number, step: number): string {
  let pts: string[] = [];
  for (let mx = xMin; mx <= xMax; mx += step) {
    const internalX = b * (mx - h);
    const baseVal = funcType === 'quad' ? internalX * internalX : Math.sin(internalX);
    const my = a * baseVal + k;
    
    const sx = svgX(mx);
    const sy = svgY(my);
    
    if (sy > H + 500 || sy < -500) {
      if (pts.length > 0) {
        pts.push(`L${sx.toFixed(1)},${sy.toFixed(1)}`);
      } else {
        pts.push(`M${sx.toFixed(1)},${sy.toFixed(1)}`);
      }
      continue;
    }
    
    pts.push(`${pts.length === 0 || pts[pts.length - 1].startsWith('M') && pts.length === 1 ? 'M' : 'L'}${sx.toFixed(1)},${sy.toFixed(1)}`);
  }
  return pts.join('');
}

interface TargetConfig {
  a: number;
  b: number;
  h: number;
  k: number;
  funcType: 'quad' | 'sin';
}

interface FunctionTransformationModuleProps {
  mode?: 'translation-reflection' | 'dilation-rotation' | 'combined-transformation';
}

function generateRandomTarget(mode: string): TargetConfig {
  const isQuad = Math.random() > 0.5;
  let a = 1, b = 1, h = 0, k = 0;
  
  if (mode === 'translation-reflection' || mode === 'combined-transformation') {
    h = Math.floor(Math.random() * 9) - 4; // -4 to 4
    k = Math.floor(Math.random() * 9) - 4; // -4 to 4
    if (mode === 'translation-reflection') {
      a = Math.random() > 0.5 ? 1 : -1;
    }
  }
  if (mode === 'dilation-rotation' || mode === 'combined-transformation') {
    a = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 2) + 1); // 1, -1, 2, -2
    b = isQuad ? 1 : (Math.random() > 0.5 ? 1 : 2); // for sine, frequency 1 or 2
  }
  
  return { a, b, h, k, funcType: isQuad ? 'quad' : 'sin' };
}

export default function FunctionTransformationModule({ mode = 'combined-transformation' }: FunctionTransformationModuleProps) {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);
  const [funcType, setFuncType] = useState<'quad' | 'sin'>('quad');
  
  const [target, setTarget] = useState<TargetConfig | null>(null);
  const [score, setScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  useEffect(() => {
    setTarget(generateRandomTarget(mode));
  }, [mode]);

  const pathD = useMemo(() => buildPath(a, b, h, k, funcType, -12, 12, 0.1), [a, b, h, k, funcType]);
  const targetPathD = useMemo(() => target ? buildPath(target.a, target.b, target.h, target.k, target.funcType, -12, 12, 0.1) : '', [target]);

  const checkMatch = () => {
    if (!target) return;
    let isMatch = false;
    if (funcType === target.funcType) {
      if (funcType === 'quad') {
        isMatch = a === target.a && h === target.h && k === target.k && Math.abs(b) === Math.abs(target.b);
      } else {
        isMatch = a === target.a && b === target.b && h === target.h && k === target.k;
      }
    }
    
    if (isMatch) {
      setShowSuccess(true);
      setScore(s => s + 100);
      // Wait for user to read reflection, don't auto-dismiss immediately
    }
  };

  const nextTarget = () => {
    setShowSuccess(false);
    setTarget(generateRandomTarget(mode));
    setA(1); setB(1); setH(0); setK(0);
  };

  useEffect(() => {
    if (!showSuccess) {
      checkMatch();
    }
  }, [a, b, h, k, funcType]);

  const equation = funcType === 'quad' 
    ? `y = ${a === 1 ? '' : a === -1 ? '-' : a}(${b === 1 ? '' : b === -1 ? '-' : b}(x ${h > 0 ? '- '+h : h < 0 ? '+ '+Math.abs(h) : ''}))² ${k > 0 ? '+ '+k : k < 0 ? '- '+Math.abs(k) : ''}`
    : `y = ${a === 1 ? '' : a === -1 ? '-' : a}sin(${b === 1 ? '' : b === -1 ? '-' : b}(x ${h > 0 ? '- '+h : h < 0 ? '+ '+Math.abs(h) : ''})) ${k > 0 ? '+ '+k : k < 0 ? '- '+Math.abs(k) : ''}`;
    
  // Real-time Insights generator
  const getInsights = () => {
    let insights = [];
    if (h !== 0) {
      insights.push(`Menggeser sejauh ${Math.abs(h)} satuan ke ${h > 0 ? 'kanan' : 'kiri'} (-${Math.abs(h)} disubstitusikan ke x).`);
    }
    if (k !== 0) {
      insights.push(`Menggeser sejauh ${Math.abs(k)} satuan ke ${k > 0 ? 'atas' : 'bawah'} (+${Math.abs(k)} pada akhir fungsi).`);
    }
    if (a !== 1) {
      if (a < 0) insights.push(`Fungsi direfleksikan (dicerminkan) terhadap sumbu X karena nilai pengali negatif.`);
      if (Math.abs(a) > 1) insights.push(`Grafik diregangkan secara vertikal (skala ${Math.abs(a)}).`);
      if (Math.abs(a) < 1) insights.push(`Grafik dimampatkan secara vertikal.`);
    }
    if (b !== 1) {
      if (b < 0 && funcType === 'sin') insights.push(`Fungsi direfleksikan terhadap sumbu Y karena x dikalikan negatif.`);
      if (Math.abs(b) > 1) insights.push(`Grafik dimampatkan secara horizontal (skala ${Math.abs(b)}).`);
    }
    if (h === 0 && k === 0 && a === 1 && b === 1) {
      insights.push(`Ini adalah posisi fungsi dasar atau fungsi normal.`);
    }
    return insights;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      
      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative border border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => setShowTheoryModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-500" /> Mode Belajar: Teori Transformasi
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {(mode === 'translation-reflection' || mode === 'combined-transformation') && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">1. Translasi (Pergeseran) & Refleksi</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Jika y = f(x) + k, grafik bergeser k satuan ke <strong>atas</strong>.</li>
                    <li>Jika y = f(x - h), grafik bergeser h satuan ke <strong>kanan</strong> (ingat, tandanya berlawanan!).</li>
                    <li>Jika y = -f(x), grafik dicerminkan terhadap <strong>sumbu X</strong> (terbalik).</li>
                  </ul>
                </div>
              )}
              {(mode === 'dilation-rotation' || mode === 'combined-transformation') && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                  <h4 className="font-bold text-indigo-800 dark:text-indigo-400 mb-2">2. Dilatasi (Peregangan/Pemampatan)</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Jika y = a · f(x) dengan |a| &gt; 1, grafik diregangkan secara <strong>vertikal</strong> (makin kurus/tinggi).</li>
                    <li>Jika y = f(b · x) dengan |b| &gt; 1, grafik dimampatkan secara <strong>horizontal</strong> (makin padat).</li>
                  </ul>
                </div>
              )}
            </div>
            <button 
              onClick={() => setShowTheoryModal(false)}
              className="mt-6 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Mengerti, Kembali ke Simulasi
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Target className="h-3.5 w-3.5" /> Bab 1: Transformasi Fungsi
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tantangan Transformasi</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Sesuaikan parameter di panel kendali agar grafik fungsi utamamu bertumpuk sempurna dengan target (garis putus-putus).
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
                📝 Contoh Soal & Pembahasan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                {mode === 'translation-reflection' && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Pertanyaan:</p>
                    <p className="mb-3">Jika fungsi dasar adalah y = x², bagaimana persamaan grafiknya jika digeser 3 satuan ke kiri dan 2 satuan ke bawah?</p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                    <p>• Geser ke kiri 3 satuan berarti x diganti (x + 3).<br/>• Geser ke bawah 2 satuan berarti ditambah -2 di akhir fungsi.<br/>• Persamaan barunya adalah <strong>y = (x + 3)² - 2</strong>.</p>
                  </div>
                )}
                {mode === 'dilation-rotation' && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Pertanyaan:</p>
                    <p className="mb-3">Diberikan fungsi y = sin(x). Jika grafik diregangkan secara vertikal dengan faktor 2, bagaimana persamaannya?</p>
                    <p className="font-semibold text-indigo-700 dark:text-indigo-400 mb-1">Penyelesaian:</p>
                    <p>• Peregangan vertikal sebesar faktor 2 berarti seluruh nilai fungsi y dikalikan 2.<br/>• Persamaannya menjadi <strong>y = 2·sin(x)</strong>.</p>
                  </div>
                )}
                {mode === 'combined-transformation' && (
                  <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Pertanyaan:</p>
                    <p className="mb-3">Sebuah fungsi y = x² direfleksikan terhadap sumbu X, lalu digeser 1 satuan ke kanan dan 4 satuan ke atas. Tentukan persamaan akhirnya!</p>
                    <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                    <p>1. Refleksi sumbu X: y = -x²<br/>2. Geser ke kanan 1 satuan: y = -(x - 1)²<br/>3. Geser ke atas 4 satuan: <strong>y = -(x - 1)² + 4</strong>.</p>
                  </div>
                )}
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
        {/* Canvas & Pedagogical Overlay */}
        <div className="lg:col-span-2 relative flex flex-col gap-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[400px]">
            
            {showSuccess && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-emerald-600/95 backdrop-blur-sm animate-in fade-in duration-300 p-6 text-center">
                <Star className="h-20 w-20 text-yellow-300 fill-yellow-300 mb-2 animate-bounce" />
                <h3 className="text-3xl font-black text-white drop-shadow-md mb-2">Tepat Sekali!</h3>
                <p className="text-emerald-100 font-medium text-lg mb-6">+100 Poin</p>
                
                <div className="bg-emerald-800/50 p-4 rounded-xl border border-emerald-500/30 w-full max-w-md">
                  <p className="text-sm text-emerald-50 mb-2">Anda berhasil menyusun fungsi:</p>
                  <p className="text-xl font-mono font-bold text-white mb-2 bg-emerald-900/50 p-2 rounded-lg">{equation.replace(/\(\)/g, 'x').replace(/\(x \)/g, '(x)')}</p>
                  <ul className="text-sm text-emerald-200 text-left list-disc pl-5 space-y-1">
                    {getInsights().map((insight, idx) => (
                      <li key={idx}>{insight}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={nextTarget}
                  className="mt-6 px-8 py-3 bg-white text-emerald-700 font-bold rounded-xl hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  Lanjut ke Target Berikutnya
                </button>
              </div>
            )}
            
            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm font-mono text-lg font-bold text-gray-800 dark:text-gray-200">
              {equation.replace(/\(\)/g, 'x').replace(/\(x \)/g, '(x)')}
            </div>
            
            <div className="absolute top-4 right-4 z-10">
               <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <button 
                    onClick={() => setFuncType('quad')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${funcType === 'quad' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                  >
                    Kuadrat (x²)
                  </button>
                  <button 
                    onClick={() => setFuncType('sin')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${funcType === 'sin' ? 'bg-white dark:bg-gray-700 shadow-sm text-emerald-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
                  >
                    Trigono (sin)
                  </button>
               </div>
            </div>

            <div className="flex justify-center items-center w-full h-full">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] h-auto">
                {Array.from({ length: 21 }, (_, i) => i - 10).map(v => {
                  if (v === 0) return null;
                  const sx = svgX(v), sy = svgY(v);
                  return (
                    <g key={`g${v}`}>
                      {sx > 0 && sx < W && <line x1={sx} y1={0} x2={sx} y2={H} stroke="currentColor" className="text-gray-100 dark:text-gray-800/60" strokeWidth={1} />}
                      {sy > 0 && sy < H && <line x1={0} y1={sy} x2={W} y2={sy} stroke="currentColor" className="text-gray-100 dark:text-gray-800/60" strokeWidth={1} />}
                    </g>
                  );
                })}

                <line x1={0} y1={OY} x2={W} y2={OY} stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth={2} />
                <line x1={OX} y1={0} x2={OX} y2={H} stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth={2} />

                {[-8, -6, -4, -2, 2, 4, 6, 8].map(v => {
                  const sx = svgX(v), sy = svgY(v);
                  return (
                    <g key={`t${v}`}>
                      <line x1={sx} y1={OY - 3} x2={sx} y2={OY + 3} stroke="currentColor" className="text-gray-400" strokeWidth={2} />
                      <text x={sx} y={OY + 16} textAnchor="middle" fontSize={10} className="fill-gray-400 font-mono">{v}</text>
                      
                      <line x1={OX - 3} y1={sy} x2={OX + 3} y2={sy} stroke="currentColor" className="text-gray-400" strokeWidth={2} />
                      <text x={OX - 8} y={sy + 3} textAnchor="end" fontSize={10} className="fill-gray-400 font-mono">{v}</text>
                    </g>
                  );
                })}

                <path
                  d={targetPathD}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth={4}
                  strokeDasharray="8,6"
                  opacity={0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'd 0.5s ease' }}
                />

                <path
                  d={pathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transition: 'd 0.15s ease' }}
                />
              </svg>
            </div>
          </div>
          
          {/* Pedagogical Real-time Insight Panel */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-4 flex gap-3 shadow-sm">
            <Lightbulb className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
               <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">Insight Translasi</h4>
               <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc pl-4 space-y-1">
                 {getInsights().map((insight, i) => (
                   <li key={i}>{insight}</li>
                 ))}
               </ul>
            </div>
          </div>

        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
             <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="h-4 w-4 text-emerald-500" />
                Panel Kendali
             </h3>
             <button 
                onClick={nextTarget}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
                title="Ganti Target"
             >
               <RefreshCw className="h-4 w-4" />
             </button>
          </div>
          
          {funcType === 'sin' && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
              <p className="text-xs text-amber-700 dark:text-amber-400">
                <strong>Tips Trigonometri:</strong> Sinyal sinus berulang setiap 2π (sekitar 6.28). Jika pergeseran (h) tidak pernah bisa bertumpuk pas, kemungkinan target adalah fungsi yang <strong>terbalik (direfleksikan)</strong>. Coba ubah nilai Refleksi (a)!
              </p>
            </div>
          )}

          <div className="space-y-5">
            {(mode === 'translation-reflection' || mode === 'combined-transformation') && (
              <>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Translasi Horizontal (h)</label>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{h}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="range" min="-8" max="8" step="0.5" value={h} onChange={e => setH(parseFloat(e.target.value))} className="flex-1 accent-emerald-500" />
                    <input type="number" min="-8" max="8" step="0.5" value={h} onChange={e => setH(parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center font-mono font-bold text-emerald-700 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Menggeser grafik ke kiri atau ke kanan.</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Translasi Vertikal (k)</label>
                    <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{k}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="range" min="-8" max="8" step="0.5" value={k} onChange={e => setK(parseFloat(e.target.value))} className="flex-1 accent-emerald-500" />
                    <input type="number" min="-8" max="8" step="0.5" value={k} onChange={e => setK(parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center font-mono font-bold text-emerald-700 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Menggeser grafik ke atas atau ke bawah.</p>
                </div>
              </>
            )}

            {(mode === 'dilation-rotation' || mode === 'combined-transformation') && (
              <>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dilatasi Vertikal (a)</label>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{a}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="range" min="-3" max="3" step="0.5" value={a} onChange={e => setA(parseFloat(e.target.value))} className="flex-1 accent-indigo-500" />
                    <input type="number" min="-3" max="3" step="0.5" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-mono font-bold text-indigo-700 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Mengubah kelebaran. Jika negatif (-), grafik terbalik (refleksi sumbu X).</p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Dilatasi Horizontal (b)</label>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{b}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="range" min="-3" max="3" step="0.5" value={b} onChange={e => setB(parseFloat(e.target.value))} className="flex-1 accent-indigo-500" />
                    <input type="number" min="-3" max="3" step="0.5" value={b} onChange={e => setB(parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-mono font-bold text-indigo-700 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Peregangan horizontal. Jika negatif (-), refleksi sumbu Y.</p>
                </div>
              </>
            )}
            
            {mode === 'translation-reflection' && (
               <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Refleksi Sumbu X (a)</label>
                    <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{a}</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input type="range" min="-1" max="1" step="2" value={a} onChange={e => setA(parseFloat(e.target.value))} className="flex-1 accent-indigo-500" />
                    <input type="number" min="-1" max="1" step="2" value={a} onChange={e => setA(parseFloat(e.target.value) || 0)} className="w-16 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded-lg text-center font-mono font-bold text-indigo-700 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Hanya 1 (normal) atau -1 (terbalik).</p>
               </div>
            )}
          </div>
          
          {target && target.funcType !== funcType && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl">
               <p className="text-xs text-red-600 dark:text-red-400 font-medium">⚠️ Target menggunakan fungsi {target.funcType === 'quad' ? 'Kuadrat (x²)' : 'Trigono (sin)'}. Silakan ganti tipe fungsi di pojok kanan atas grafik.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
