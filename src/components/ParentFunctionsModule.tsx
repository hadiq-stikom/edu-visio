'use client';

import React, { useState, useEffect } from 'react';
import { Target, BookOpen, Activity, Info } from 'lucide-react';

const W = 600, H = 500;
const OX = 300, OY = 250;
const S = 30; // 1 unit = 30px

function svgX(mx: number): number { return OX + mx * S; }
function svgY(my: number): number { return OY - my * S; }

type ParentFunc = 'linear' | 'quad' | 'abs' | 'cubic' | 'sin';

const functionDefs = {
  linear: {
    id: 'linear',
    name: 'Fungsi Linear',
    equation: 'y = x',
    description: 'Berbentuk garis lurus. Setiap kenaikan 1 pada sumbu x, y juga naik 1. Ini adalah bentuk paling dasar dari sebuah fungsi berderajat satu.',
    calc: (x: number) => x,
    color: '#3b82f6' // blue
  },
  quad: {
    id: 'quad',
    name: 'Fungsi Kuadrat',
    equation: 'y = x²',
    description: 'Berbentuk parabola U. Nilai y selalu positif (karena bilangan dikuadratkan selalu positif) dan naiknya sangat cepat secara eksponensial.',
    calc: (x: number) => x * x,
    color: '#10b981' // emerald
  },
  abs: {
    id: 'abs',
    name: 'Fungsi Nilai Mutlak',
    equation: 'y = |x|',
    description: 'Berbentuk huruf V. Nilai mutlak mengubah semua nilai x negatif menjadi positif secara tegak lurus, membuat garis memantul tajam di titik 0.',
    calc: (x: number) => Math.abs(x),
    color: '#8b5cf6' // violet
  },
  cubic: {
    id: 'cubic',
    name: 'Fungsi Kubik',
    equation: 'y = x³',
    description: 'Berbentuk seperti kursi atau gelombang s. Berbeda dengan x², nilai pangkat ganjil tetap mempertahankan tanda negatif (jika x negatif, y negatif).',
    calc: (x: number) => x * x * x,
    color: '#f59e0b' // amber
  },
  sin: {
    id: 'sin',
    name: 'Fungsi Trigonometri (Sinus)',
    equation: 'y = sin(x)',
    description: 'Berbentuk gelombang periodik yang berulang. Digunakan untuk memodelkan getaran, suara, atau cahaya. Berulang setiap 2π.',
    calc: (x: number) => Math.sin(x),
    color: '#ec4899' // pink
  }
};

export default function ParentFunctionsModule() {
  const [activeFunc, setActiveFunc] = useState<ParentFunc>('quad');
  const [pathD, setPathD] = useState('');
  
  const def = functionDefs[activeFunc];

  // Draw the path with a simple animation effect by resetting the SVG dash offset (done via CSS typically, but we just draw the string here)
  useEffect(() => {
    let pts: string[] = [];
    for (let mx = -12; mx <= 12; mx += 0.1) {
      const my = def.calc(mx);
      const sx = svgX(mx);
      const sy = svgY(my);
      
      // limit SVG path to avoid huge numbers
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
    setPathD(pts.join(''));
  }, [activeFunc]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="h-3.5 w-3.5" /> Apersepsi (Materi Pengantar)
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Mengenal Fungsi Dasar</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed">
            Sebelum kita belajar menggeser dan meregangkan grafik (Transformasi), mari kita kenali dulu bentuk asli (keluarga dasar) dari grafik-grafik tersebut.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Selection Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-4">
           <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Pilih Keluarga Fungsi
           </h3>
           
           <div className="flex flex-col gap-3">
             {(Object.keys(functionDefs) as ParentFunc[]).map(key => {
               const isActive = activeFunc === key;
               const item = functionDefs[key];
               return (
                 <button
                   key={key}
                   onClick={() => setActiveFunc(key)}
                   className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${isActive ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-blue-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                 >
                   <div className="text-left">
                     <div className={`font-bold ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.name}</div>
                     <div className="font-mono text-sm text-gray-500 dark:text-gray-400 mt-1">{item.equation}</div>
                   </div>
                   <div className={`w-4 h-4 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                 </button>
               );
             })}
           </div>
        </div>

        {/* Canvas & Info */}
        <div className="lg:col-span-2 relative flex flex-col gap-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[400px]">
            
            <div className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm font-mono text-lg font-bold text-gray-800 dark:text-gray-200" style={{ color: def.color }}>
              {def.equation}
            </div>

            <div className="flex justify-center items-center w-full h-full">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] h-auto">
                {/* Grid */}
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

                {/* Axes */}
                <line x1={0} y1={OY} x2={W} y2={OY} stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth={2} />
                <line x1={OX} y1={0} x2={OX} y2={H} stroke="currentColor" className="text-gray-300 dark:text-gray-700" strokeWidth={2} />

                {/* Ticks */}
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

                {/* Animated Path */}
                <path
                  key={def.id} // force re-render for animation trigger
                  d={pathD}
                  fill="none"
                  stroke={def.color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-[draw_1s_ease-in-out_forwards]"
                  strokeDasharray="2000"
                  strokeDashoffset="2000"
                />
              </svg>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes draw {
                to { stroke-dashoffset: 0; }
              }
            `}} />
          </div>
          
          {/* Info Panel */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-5 flex gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
               <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-1 flex items-center gap-2">
                 {def.name} 
                 <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400 text-[10px] uppercase rounded-full font-mono">
                   {def.equation}
                 </span>
               </h4>
               <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                 {def.description}
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
