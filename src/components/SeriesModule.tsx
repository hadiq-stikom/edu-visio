'use client';

import React, { useState, useMemo } from 'react';

export default function SeriesModule() {
  const [awalHafalan, setAwalHafalan] = useState(3);
  const [tambahanHarian, setTambahanHarian] = useState(2);
  const [jumlahHari, setJumlahHari] = useState(7);

  const barisan = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= jumlahHari; i++) {
      arr.push(awalHafalan + (i - 1) * tambahanHarian);
    }
    return arr;
  }, [awalHafalan, tambahanHarian, jumlahHari]);

  const deret = useMemo(() => {
    const arr: number[] = [];
    let total = 0;
    for (let i = 1; i <= jumlahHari; i++) {
      total += awalHafalan + (i - 1) * tambahanHarian;
      arr.push(total);
    }
    return arr;
  }, [awalHafalan, tambahanHarian, jumlahHari]);

  const totalAkhir = deret[jumlahHari - 1];
  const maxS = Math.max(...deret, 1);
  const hariTerakhir = jumlahHari;
  const uTerakhir = barisan[jumlahHari - 1];

  const BAR_PX = 180;
  const fmt = (v: number) => v.toLocaleString();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
          Simulasi Target Hafalan
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Deret Aritmetika &mdash; Tahfidz Al-Qur&rsquo;an
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Visualisasikan target hafalan harian dan akumulasi total ayat yang telah dihafal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Hafalan Hari Pertama (a): <span className="text-emerald-600 font-bold">{awalHafalan}</span> ayat
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={awalHafalan}
            onChange={(e) => setAwalHafalan(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>3</span><span>5</span><span>7</span><span>10</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tambahan per Hari (b): <span className="text-emerald-600 font-bold">{tambahanHarian}</span> ayat
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={tambahanHarian}
            onChange={(e) => setTambahanHarian(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Jumlah Hari (n): <span className="text-emerald-600 font-bold">{jumlahHari}</span>
          </label>
          <input
            type="range"
            min="3"
            max="30"
            value={jumlahHari}
            onChange={(e) => setJumlahHari(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3</span><span>10</span><span>20</span><span>30</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6">
        <p className="text-xs text-slate-400 font-medium mb-3">
          Grafik Perbandingan Hafalan
        </p>
        <div className="flex items-end justify-around gap-1.5 h-64 px-2">
          {barisan.map((u, i) => {
            const s = deret[i];
            const barH = Math.max((s / maxS) * BAR_PX, 4);
            const dailyH = Math.max((u / maxS) * BAR_PX, 2);
            const prevH = barH - dailyH;
            return (
              <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                <span className="text-[10px] text-emerald-700 font-semibold mb-1 leading-tight">
                  {fmt(s)}
                </span>
                <div className="w-full rounded-t-md overflow-hidden transition-all duration-300" style={{ height: barH }}>
                  <div className="w-full bg-emerald-600 transition-all duration-300" style={{ height: Math.max(prevH, 0) }} />
                  <div className="w-full bg-emerald-300 transition-all duration-300" style={{ height: dailyH }} />
                </div>
                <div className="w-full flex justify-center mt-1">
                  <div className="h-2.5 w-full max-w-6 rounded-sm bg-emerald-200 transition-all duration-300" style={{ opacity: 0.5 + (u / (awalHafalan + (jumlahHari - 1) * tambahanHarian)) * 0.5 }} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-medium">
                  H-{i + 1}
                </span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-600" /> Total Akumulasi (S<sub>n</sub>)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-300" /> Hafalan Hari Ini (U<sub>n</sub>)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm bg-emerald-200" /> Proporsi Setoran
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📖</span>
            <h4 className="text-sm font-bold text-slate-800">Rincian Hari Terakhir</h4>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-100 space-y-2">
            <p className="text-sm text-slate-500">
              Hafalan di <strong className="text-emerald-700">Hari ke-{hariTerakhir}</strong>
            </p>
            <div className="font-mono text-sm text-slate-600 space-y-1">
              <p>
                U<sub>{hariTerakhir}</sub> = {awalHafalan} + ({hariTerakhir} &minus; 1) &times; {tambahanHarian}
              </p>
              <p>
                U<sub>{hariTerakhir}</sub> = {awalHafalan} + {(hariTerakhir - 1) * tambahanHarian}
              </p>
            </div>
            <p className="text-lg font-bold text-emerald-700">
              U<sub>{hariTerakhir}</sub> = {fmt(uTerakhir)} Ayat
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🧮</span>
            <h4 className="text-sm font-bold text-slate-800">
              Total Hafalan S<sub>{jumlahHari}</sub> (Deret)
            </h4>
          </div>
          <div className="bg-white rounded-xl p-4 border border-emerald-100 space-y-2">
            <div className="font-mono text-sm text-slate-600 space-y-1.5">
              <p>
                S<sub>{jumlahHari}</sub> = {jumlahHari}/2 &times; (2({awalHafalan}) + ({jumlahHari} &minus; 1){tambahanHarian})
              </p>
              <p>
                S<sub>{jumlahHari}</sub> = {jumlahHari / 2 === Math.floor(jumlahHari / 2) ? jumlahHari / 2 : `${jumlahHari}/2`} &times; ({2 * awalHafalan} + {(jumlahHari - 1) * tambahanHarian})
              </p>
              <p>
                S<sub>{jumlahHari}</sub> = {jumlahHari / 2 === Math.floor(jumlahHari / 2) ? jumlahHari / 2 : `${jumlahHari}/2`} &times; {2 * awalHafalan + (jumlahHari - 1) * tambahanHarian}
              </p>
            </div>
            <div className="border-t border-emerald-100 pt-2">
              <p className="text-lg font-bold text-emerald-700">
                Total = {fmt(totalAkhir)} Ayat
              </p>
              <p className="text-xs text-emerald-500 mt-0.5">
                S<sub>{jumlahHari}</sub> = {fmt(totalAkhir)} ayat dalam {jumlahHari} hari
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
