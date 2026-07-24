'use client';

import React, { useState } from 'react';

export default function HeightMeasurementModule() {
  const [jarak, setJarak] = useState(20);
  const [sudut, setSudut] = useState(45);
  const tinggiPengamat = 1.6;

  // Kalkulasi
  const radian = (sudut * Math.PI) / 180;
  const tinggiBagianGedung = jarak * Math.tan(radian);
  const tinggiTotal = tinggiBagianGedung + tinggiPengamat;

  // Skala SVG: 1m = 4px
  const scale = 4;
  const svgWidth = 400;
  const svgHeight = 300;
  const groundY = 250;
  const gedungX = 320;
  const pengamatX = 40 + (50 - jarak) * 4; // Menyesuaikan posisi pengamat berdasarkan jarak

  return (
    <div className="max-w-6xl mx-auto p-8 bg-slate-50 rounded-3xl border border-slate-200 shadow-lg">
      <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Mengukur Tinggi Gedung</h2>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Visualisasi SVG */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-inner">
          <svg width="100%" height="300" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="bg-sky-50 rounded-xl">
            {/* Tanah */}
            <line x1="0" y1={groundY} x2={svgWidth} y2={groundY} stroke="#94a3b8" strokeWidth="2" />
            
            {/* Gedung */}
            <rect x={gedungX} y={groundY - tinggiTotal * scale} width="50" height={tinggiTotal * scale} fill="#94a3b8" />
            
            {/* Pengamat */}
            <circle cx={pengamatX} cy={groundY - tinggiPengamat * scale} r="8" fill="#334155" />
            <line x1={pengamatX} y1={groundY - tinggiPengamat * scale} x2={pengamatX} y2={groundY} stroke="#334155" strokeWidth="3" />
            
            {/* Garis Pandang */}
            <line x1={pengamatX} y1={groundY - tinggiPengamat * scale} x2={gedungX} y2={groundY - tinggiTotal * scale} stroke="#ef4444" strokeDasharray="4" strokeWidth="2" />
            <line x1={pengamatX} y1={groundY - tinggiPengamat * scale} x2={gedungX} y2={groundY - tinggiPengamat * scale} stroke="#64748b" strokeDasharray="4" strokeWidth="1" />
            
            {/* Label */}
            <text x={(pengamatX + gedungX) / 2} y={groundY - tinggiPengamat * scale - 10} className="text-[10px] fill-slate-600" textAnchor="middle">Jarak: {jarak}m</text>
            <text x={gedungX + 5} y={groundY - tinggiTotal * scale / 2} className="text-[10px] fill-red-600 font-bold" transform={`rotate(-90 ${gedungX + 5}, ${groundY - tinggiTotal * scale / 2})`}>Tinggi: {tinggiTotal.toFixed(1)}m</text>
          </svg>
        </div>

        {/* Kontrol & Perhitungan */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Jarak Pengamat: {jarak} meter</label>
            <input type="range" min="10" max="50" value={jarak} onChange={(e) => setJarak(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Sudut Elevasi: {sudut}°</label>
            <input type="range" min="15" max="75" value={sudut} onChange={(e) => setSudut(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>

          <div className="p-4 bg-slate-100 rounded-xl space-y-2">
            <p className="text-sm text-slate-600">Rumus: <span className="font-mono bg-white px-1 rounded">T = (Jarak × tan(θ)) + h</span></p>
            <p className="text-sm font-bold text-slate-800">
              T = ({jarak} × {Math.tan(radian).toFixed(2)}) + {tinggiPengamat}
            </p>
            <div className="text-2xl font-bold text-indigo-700">
              Hasil: {tinggiTotal.toFixed(2)} meter
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
