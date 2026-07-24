'use client';

import React, { useState, useMemo } from 'react';

export default function SequenceModule() {
  const [sukuAwal, setSukuAwal] = useState(2);
  const [pola, setPola] = useState(3);
  const [jumlahSuku, setJumlahSuku] = useState(5);

  const aritmetika = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= jumlahSuku; i++) {
      arr.push(sukuAwal + (i - 1) * pola);
    }
    return arr;
  }, [sukuAwal, pola, jumlahSuku]);

  const geometri = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= jumlahSuku; i++) {
      arr.push(sukuAwal * Math.pow(pola, i - 1));
    }
    return arr;
  }, [sukuAwal, pola, jumlahSuku]);

  const maxAr = Math.max(...aritmetika, 1);
  const maxGe = Math.max(...geometri, 1);

  const fmt = (v: number) => v.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Komparasi Barisan Aritmetika &amp; Geometri
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Suku Awal (a): <span className="text-indigo-600 font-bold">{sukuAwal}</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={sukuAwal}
            onChange={(e) => setSukuAwal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Beda (b) / Rasio (r): <span className="text-indigo-600 font-bold">{pola}</span>
          </label>
          <input
            type="range"
            min="2"
            max="5"
            value={pola}
            onChange={(e) => setPola(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Jumlah Suku (n): <span className="text-indigo-600 font-bold">{jumlahSuku}</span>
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={jumlahSuku}
            onChange={(e) => setJumlahSuku(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200">
          <div className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold shadow-md shadow-blue-600/20 mb-5">
            Barisan Aritmetika
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-100 mb-5 text-center">
            <span className="text-xs text-slate-400 font-medium">Rumus Suku ke-n</span>
            <p className="text-lg font-bold font-mono text-blue-700 mt-1">
              U<sub className="text-sm">n</sub> = {sukuAwal} + (n−1) &times; {pola}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-100 mb-5">
            <p className="text-xs text-slate-400 font-medium mb-3">Grafik Balok</p>
            <div className="flex items-end justify-around gap-1.5 h-48">
              {aritmetika.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-[10px] text-slate-500 font-medium mb-1 truncate max-w-full">
                    {fmt(val)}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-300"
                    style={{ height: Math.max((val / maxAr) * 160, 4), minHeight: 4 }}
                  />
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium">
                    U<sub>{i + 1}</sub>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <p className="text-xs text-slate-400 font-medium mb-3">Deret Angka</p>
            <div className="flex flex-wrap items-center justify-center gap-0.5">
              {aritmetika.map((val, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-center min-w-[46px] h-[42px] px-2.5 rounded-full bg-blue-100 border-2 border-blue-300 text-sm font-bold text-blue-800 shadow-sm">
                    {fmt(val)}
                  </div>
                  {i < aritmetika.length - 1 && (
                    <span className="inline-flex items-center text-xs font-bold font-mono text-blue-400 mx-0.5 shrink-0">
                      +{pola}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-500/20 mb-5">
            Barisan Geometri
          </div>

          <div className="bg-white rounded-xl p-4 border border-amber-100 mb-5 text-center">
            <span className="text-xs text-slate-400 font-medium">Rumus Suku ke-n</span>
            <p className="text-lg font-bold font-mono text-amber-700 mt-1">
              U<sub className="text-sm">n</sub> = {sukuAwal} &times; {pola}<sup className="text-sm">n−1</sup>
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-amber-100 mb-5">
            <p className="text-xs text-slate-400 font-medium mb-3">Grafik Balok</p>
            <div className="flex items-end justify-around gap-1.5 h-48">
              {geometri.map((val, i) => (
                <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                  <span className="text-[10px] text-slate-500 font-medium mb-1 truncate max-w-full">
                    {fmt(val)}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-t-md transition-all duration-300"
                    style={{ height: Math.max((val / maxGe) * 160, 4), minHeight: 4 }}
                  />
                  <span className="text-[10px] text-slate-400 mt-1.5 font-medium">
                    U<sub>{i + 1}</sub>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-amber-100">
            <p className="text-xs text-slate-400 font-medium mb-3">Deret Angka</p>
            <div className="flex flex-wrap items-center justify-center gap-0.5">
              {geometri.map((val, i) => (
                <React.Fragment key={i}>
                  <div className="flex items-center justify-center min-w-[46px] h-[42px] px-2.5 rounded-full bg-amber-100 border-2 border-amber-300 text-sm font-bold text-amber-800 shadow-sm">
                    {fmt(val)}
                  </div>
                  {i < geometri.length - 1 && (
                    <span className="inline-flex items-center text-xs font-bold font-mono text-amber-500 mx-0.5 shrink-0">
                      &times;{pola}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
