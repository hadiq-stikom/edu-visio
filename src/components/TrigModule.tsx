'use client';

import React, { useState } from 'react';

export default function TrigModule() {
  const [theta, setTheta] = useState(30);

  const radian = (theta * Math.PI) / 180;
  const hypotenuse = 200;
  const height = Math.round(hypotenuse * Math.sin(radian));
  const base = Math.round(hypotenuse * Math.cos(radian));

  const sinValue = Math.sin(radian).toFixed(2);
  const cosValue = Math.cos(radian).toFixed(2);
  const tanValue = Math.tan(radian).toFixed(2);

  const originX = 50;
  const originY = 220;
  const peakX = originX + base;
  const peakY = originY - height;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Eksplorasi Perbandingan Trigonometri</h2>

      {/* Kontrol */}
      <div className="flex flex-col items-center mb-8 bg-slate-50 p-5 rounded-2xl">
        <label className="text-slate-600 font-semibold mb-3">Besar Sudut: {theta}°</label>
        <input
          type="range"
          min="10"
          max="80"
          value={theta}
          onChange={(e) => setTheta(parseInt(e.target.value))}
          className="w-full max-w-md h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      {/* Kartu Nilai */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Sin (Depan/Miring)', numerator: height, denominator: hypotenuse, value: sinValue, color: 'text-emerald-600' },
          { label: 'Cos (Samping/Miring)', numerator: base, denominator: hypotenuse, value: cosValue, color: 'text-indigo-600' },
          { label: 'Tan (Depan/Samping)', numerator: height, denominator: base, value: tanValue, color: 'text-rose-600' },
        ].map((item, idx) => (
          <div key={idx} className="p-5 bg-slate-50 rounded-xl border border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium mb-2">{item.label}</p>
            <p className="text-sm text-slate-400 font-mono mb-1">{item.numerator} / {item.denominator}</p>
            <p className={`text-3xl font-bold ${item.color}`}>= {item.value}</p>
          </div>
        ))}
      </div>

      {/* Visualisasi SVG */}
      <div className="flex justify-center mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 overflow-x-auto">
        <svg width="400" height="280" viewBox="0 0 400 280">
          {/* Sisi Miring / Hypotenuse */}
          <line x1={originX} y1={originY} x2={peakX} y2={peakY} stroke="#e11d48" strokeWidth="4" />
          {/* Sisi Samping / Base */}
          <line x1={originX} y1={originY} x2={peakX} y2={originY} stroke="#4f46e5" strokeWidth="4" />
          {/* Sisi Depan / Height */}
          <line x1={peakX} y1={originY} x2={peakX} y2={peakY} stroke="#059669" strokeWidth="4" />

          {/* Tanda Siku-Siku (di pertemuan sisi samping & depan) */}
          <polyline points={`${peakX - 10},${originY} ${peakX},${originY} ${peakX},${originY - 10}`} fill="none" stroke="#475569" strokeWidth="2" />

          {/* Lengkungan Sudut (Arc) */}
          <path
            d={`M ${originX + 20} ${originY} A 20 20 0 0 0 ${originX + 20 * Math.cos(-radian)} ${originY + 20 * Math.sin(-radian)}`}
            fill="none"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Label Panjang Sisi */}
          <text x={originX + base / 2} y={originY + 24} className="text-sm font-semibold fill-indigo-600" textAnchor="middle">
            Samping = {base}
          </text>
          <text x={peakX + 14} y={originY - height / 2} className="text-sm font-semibold fill-emerald-600">
            Depan = {height}
          </text>
          <text
            x={originX + base / 2}
            y={originY - height / 2 - 10}
            className="text-sm font-semibold fill-rose-600"
            textAnchor="middle"
            transform={`rotate(${-theta}, ${originX + base / 2}, ${originY - height / 2 - 10})`}
          >
            Miring = {hypotenuse}
          </text>

          {/* Label Sudut */}
          <text x={originX - 10} y={originY - 10} className="text-lg font-bold fill-slate-700">
            θ = {theta}°
          </text>
        </svg>
      </div>

      {/* Catatan Konsep */}
      <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-xl">
        <h4 className="text-sm font-bold text-indigo-900 mb-2">Catatan Konsep</h4>
        <p className="text-sm text-indigo-700 leading-relaxed">
          Perbandingan trigonometri (sinus, cosinus, tangen) adalah rasio perbandingan panjang sisi-sisi pada segitiga siku-siku.
          Ketika besar sudut (θ) berubah, nilai rasio sisi-sisinya pun akan ikut berubah secara proporsional.
        </p>
      </div>
    </div>
  );
}
