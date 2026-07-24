'use client';

import React, { useMemo } from 'react';

const BARISAN_TETAP = [2, 4, 6, 8, 10, 12, 14, 16];

export default function SeriesIntroModule() {
  const [jumlahSuku, setJumlahSuku] = React.useState(5);

  const suku = useMemo(() => BARISAN_TETAP.slice(0, jumlahSuku), [jumlahSuku]);
  const total = useMemo(() => suku.reduce((a, b) => a + b, 0), [suku]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold mb-2">
          Konsep Dasar
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Pengantar Barisan &amp; Deret
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-lg mx-auto">
          Memahami perbedaan mendasar antara Barisan (suku terpisah) dan Deret (akumulasi penjumlahan).
        </p>
      </div>

      <div className="max-w-sm mx-auto mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <label className="block text-sm font-semibold text-slate-700 text-center mb-2">
          Jumlah Suku (n): <span className="text-sky-600 font-bold">{jumlahSuku}</span>
        </label>
        <input
          type="range"
          min="2"
          max="8"
          value={jumlahSuku}
          onChange={(e) => setJumlahSuku(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span>
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">
          Barisan: a=2, b=2 &rarr; 2, 4, 6, 8, ...
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm mb-5">
            Barisan (U<sub>n</sub>) &mdash; Suku Berdiri Sendiri
          </div>

          <div className="bg-white rounded-xl p-5 border border-blue-100 mb-5">
            <p className="text-xs text-slate-400 font-medium mb-3">Pola Barisan Aritmetika</p>
            <p className="text-xl font-mono font-bold text-slate-700">
              {suku.map((val, i) => (
                <React.Fragment key={i}>
                  <span className="text-blue-600">{val}</span>
                  {i < suku.length - 1 && (
                    <span className="text-slate-300 mx-1.5">,</span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-blue-100">
            <p className="text-xs text-slate-400 font-medium mb-4">Visualisasi Setiap Suku</p>
            <div className="flex items-end justify-center gap-3 sm:gap-5 h-40">
              {suku.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 max-w-14">
                  <span className="text-xs text-slate-500 font-medium mb-1">{val}</span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300"
                    style={{ height: Math.max(val * 4, 4), minHeight: 4 }}
                  />
                  <span className="text-[10px] text-slate-400 mt-1.5">U<sub>{i + 1}</sub></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-bold shadow-sm mb-5">
            Deret (S<sub>{jumlahSuku}</sub>) &mdash; Akumulasi Penjumlahan
          </div>

          <div className="bg-white rounded-xl p-5 border border-emerald-100 mb-5">
            <p className="text-xs text-slate-400 font-medium mb-3">Penjumlahan Beruntun</p>
            <p className="text-xl font-mono font-bold text-slate-700">
              {suku.map((val, i) => (
                <React.Fragment key={i}>
                  <span className="text-blue-600">{val}</span>
                  {i < suku.length - 1 ? (
                    <span className="text-rose-500 mx-1.5 font-bold">+</span>
                  ) : (
                    <span className="text-slate-400 mx-2">=</span>
                  )}
                </React.Fragment>
              ))}
              <span className="text-emerald-600 font-bold">{total}</span>
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-emerald-100">
            <p className="text-xs text-slate-400 font-medium mb-4">Visualisasi Stacked Bar (Akumulasi)</p>
            <div className="flex h-10 sm:h-12 w-full rounded-lg overflow-hidden shadow-sm">
              {suku.map((val, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-center text-white text-xs font-bold transition-all duration-300 ${
                    i % 2 === 0 ? 'bg-blue-500' : 'bg-blue-400'
                  }`}
                  style={{ width: `${(val / total) * 100}%` }}
                >
                  <span className="hidden sm:inline">{val}</span>
                  <span className="sm:hidden">{val}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-400">
              <span>{suku[0]}</span>
              <span>{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
