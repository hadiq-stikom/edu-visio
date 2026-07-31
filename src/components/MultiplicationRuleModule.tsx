'use client';

import React, { useState, useMemo } from 'react';
import { Shirt, BookOpen, X, Lightbulb, Target } from 'lucide-react';

type TreeNode = {
  id: number;
  label: string;
  level: number;
  x: number;
  y: number;
  color?: string;
  isLeaf?: boolean;
};

export default function MultiplicationRuleModule() {
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  // Options
  const [tops, setTops] = useState(3); // 1-4
  const [bottoms, setBottoms] = useState(2); // 1-4
  const [shoes, setShoes] = useState(2); // 1-4
  
  const total = tops * bottoms * shoes;

  // Tree diagram generation
  const treeNodes = useMemo(() => {
    const nodes: TreeNode[] = [];
    let idCounter = 0;
    
    // Level 0 (Root)
    const root = { id: idCounter++, label: 'Start', level: 0, x: 50, y: 300 };
    nodes.push(root);
    
    const levelX = [50, 200, 400, 600]; // x positions for Root, Tops, Bottoms, Shoes
    
    const branches: {x1: number, y1: number, x2: number, y2: number, color: string}[] = [];
    
    // Level 1: Tops
    const topNodes: TreeNode[] = [];
    for(let i=0; i<tops; i++) {
      const y = 300 - (tops-1)*100 + i*200;
      const node = { id: idCounter++, label: `Baju ${i+1}`, level: 1, x: levelX[1], y, color: '#f87171' };
      nodes.push(node);
      topNodes.push(node);
      branches.push({ x1: root.x, y1: root.y, x2: node.x, y2: node.y, color: '#f87171' });
    }
    
    // Level 2: Bottoms
    const bottomNodes: TreeNode[] = [];
    topNodes.forEach(tNode => {
      for(let j=0; j<bottoms; j++) {
        // distribute y based on parent y
        const offset = (j - (bottoms-1)/2) * 60;
        const y = tNode.y + offset;
        const node = { id: idCounter++, label: `Celana ${j+1}`, level: 2, x: levelX[2], y, color: '#60a5fa' };
        nodes.push(node);
        bottomNodes.push(node);
        branches.push({ x1: tNode.x, y1: tNode.y, x2: node.x, y2: node.y, color: '#60a5fa' });
      }
    });
    
    // Level 3: Shoes
    bottomNodes.forEach(bNode => {
      for(let k=0; k<shoes; k++) {
        const offset = (k - (shoes-1)/2) * 20;
        const y = bNode.y + offset;
        const node = { id: idCounter++, label: `Spt ${k+1}`, level: 3, x: levelX[3], y, color: '#34d399', isLeaf: true };
        nodes.push(node);
        branches.push({ x1: bNode.x, y1: bNode.y, x2: node.x, y2: node.y, color: '#34d399' });
      }
    });

    return { nodes, branches };
  }, [tops, bottoms, shoes]);

  return (
    <div className="max-w-5xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Shirt className="h-3.5 w-3.5" /> Bab 3: Kombinatorik Dasar
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Aturan Pengisian Tempat (Pakaian)</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm leading-relaxed mb-4">
            Berapa banyak kombinasi gaya pakaian (OOTD) yang bisa dibuat jika kamu memiliki beberapa pilihan Baju, Celana, dan Sepatu? Konsep ini adalah dasar dari Aturan Perkalian.
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
                📝 Contoh Penerapan
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-4">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Soal 1 (Plat Nomor):</p>
                  <p className="mb-3">Sebuah plat nomor terdiri dari 2 huruf depan (A, B, C) dan 3 angka (1, 2). Ada berapa kombinasi plat yang bisa dibuat jika huruf dan angka boleh berulang?</p>
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">Penyelesaian:</p>
                  <p>Ada 5 slot (tempat) yang harus diisi: [Huruf1] [Huruf2] [Angka1] [Angka2] [Angka3]<br/>= 3 × 3 × 2 × 2 × 2 = <strong>72 Kombinasi</strong>.</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-4 min-w-[150px] shadow-sm shrink-0">
          <Target className="h-8 w-8 text-emerald-500 mb-2" />
          <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase text-center">Total Kombinasi</span>
          <span className="text-4xl font-black text-emerald-600 dark:text-emerald-500">{total}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree Visualization */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between font-bold text-sm text-gray-600 dark:text-gray-300">
               <span>Pilihan Baju (Tahap 1)</span>
               <span>Pilihan Celana (Tahap 2)</span>
               <span>Pilihan Sepatu (Tahap 3)</span>
            </div>
            
            <div className="flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-900/50 p-4">
              <svg width={700} height={Math.max(600, total * 30)} className="w-full">
                 {/* Draw branches */}
                 {treeNodes.branches.map((b, i) => (
                   <path 
                     key={`branch-${i}`} 
                     d={`M ${b.x1} ${b.y1} C ${(b.x1+b.x2)/2} ${b.y1}, ${(b.x1+b.x2)/2} ${b.y2}, ${b.x2} ${b.y2}`} 
                     fill="none" 
                     stroke={b.color} 
                     strokeWidth={2}
                     className="opacity-40 transition-all duration-300"
                   />
                 ))}
                 
                 {/* Draw nodes */}
                 {treeNodes.nodes.map(n => (
                   n.level > 0 && (
                     <g key={`node-${n.id}`} className="transition-all duration-300">
                       <circle cx={n.x} cy={n.y} r={n.isLeaf ? 4 : 6} fill={n.color} />
                       {!n.isLeaf && (
                         <text x={n.x - 10} y={n.y + 4} fontSize={10} fill={n.color} textAnchor="end" className="font-bold drop-shadow-sm">{n.label}</text>
                       )}
                     </g>
                   )
                 ))}
                 
                 <circle cx={treeNodes.nodes[0].x} cy={treeNodes.nodes[0].y} r={8} fill="#94a3b8" />
              </svg>
            </div>
          </div>
          
          <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-xl border border-sky-200 dark:border-sky-800/50 flex gap-3 animate-in fade-in duration-300 shadow-sm">
            <Lightbulb className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800 dark:text-sky-300 leading-relaxed">
              <strong>Insight Visual:</strong> Diagram Pohon di atas membuktikan aturan perkalian. Setiap pilihan Baju akan memiliki cabang untuk setiap pilihan Celana, yang lalu bercabang lagi untuk setiap Sepatu. Cukup kalikan <strong>{tops} × {bottoms} × {shoes}</strong> untuk mengetahui total seluruh ujung ranting!
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-6 flex flex-col gap-6">
          <div className="flex items-center gap-2">
             <Target className="h-4 w-4 text-emerald-500" />
             <h3 className="font-bold text-gray-900 dark:text-white">Isi Lemari Pakaian</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-2xl border border-red-100 dark:border-red-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-red-800 dark:text-red-300">Jumlah Baju ($n_1$)</label>
                <span className="text-sm font-mono font-bold text-red-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{tops}</span>
              </div>
              <input type="range" min="1" max="4" step="1" value={tops} onChange={e => setTops(parseInt(e.target.value))} className="w-full accent-red-500" />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-blue-800 dark:text-blue-300">Jumlah Celana ($n_2$)</label>
                <span className="text-sm font-mono font-bold text-blue-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{bottoms}</span>
              </div>
              <input type="range" min="1" max="4" step="1" value={bottoms} onChange={e => setBottoms(parseInt(e.target.value))} className="w-full accent-blue-500" />
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Jumlah Sepatu ($n_3$)</label>
                <span className="text-sm font-mono font-bold text-emerald-600 bg-white dark:bg-gray-900 px-2 py-0.5 rounded shadow-sm">{shoes}</span>
              </div>
              <input type="range" min="1" max="4" step="1" value={shoes} onChange={e => setShoes(parseInt(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
             <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Rumus Pengisian Tempat</p>
             <div className="font-mono text-xl text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                <span className="text-red-600 font-black">{tops}</span> × 
                <span className="text-blue-600 font-black">{bottoms}</span> × 
                <span className="text-emerald-600 font-black">{shoes}</span> = 
                <span className="font-black text-2xl ml-2">{total}</span>
             </div>
             <p className="text-[10px] text-gray-400 mt-2 font-mono">Total = n1 × n2 × n3</p>
          </div>
        </div>
      </div>
      
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-500" /> Aturan Pencacahan
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-1">Aturan Perkalian (Dan / Sekaligus)</h4>
                <p className="mb-2">Digunakan jika kejadian terjadi secara bersamaan (berurutan dalam satu waktu). <em>"Memakai Baju DAN Celana"</em>.</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-gray-200 dark:border-gray-700 text-emerald-600 font-bold">Total = n1 × n2 × n3 ...</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                <h4 className="font-bold text-orange-800 dark:text-orange-400 mb-1">Aturan Penjumlahan (Atau / Pilihan)</h4>
                <p className="mb-2">Digunakan jika kejadian terjadi saling lepas (hanya bisa memilih salah satu). <em>"Berangkat naik Motor ATAU Mobil"</em>.</p>
                <p className="font-mono bg-white dark:bg-gray-900 px-2 py-1 rounded inline-block border border-orange-200 dark:border-orange-700 text-orange-600 font-bold">Total = n1 + n2 + n3 ...</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-emerald-200 dark:shadow-none"
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
