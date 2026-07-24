'use client';

import React from 'react';

export default function ExponentDefinitionModule() {
  const [basis, setBasis] = React.useState(2);
  const [pangkat, setPangkat] = React.useState(3);

  const hasilEksponen = Math.pow(basis, pangkat);
  const hasilPerkalian = basis * pangkat;

  const eksponenGroups = Array.from({ length: pangkat }, () =>
    Array.from({ length: basis }, (_, j) => j),
  );

  const perkalianItems = Array.from({ length: basis * pangkat }, (_, i) => i);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
          Konsep Dasar
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Definisi Eksponen &mdash; Perkalian Berulang
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Memahami arti a<sup>n</sup> sebagai perkalian berulang dan membedakannya dengan perkalian biasa a &times; n.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Basis (a): <span className="text-emerald-600 font-bold">{basis}</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={basis}
            onChange={(e) => setBasis(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pangkat (n): <span className="text-emerald-600 font-bold">{pangkat}</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={pangkat}
            onChange={(e) => setPangkat(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-bold shadow-sm mb-5">
            Eksponen: {basis}<sup>{pangkat}</sup>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            {basis} diulang perkalian sebanyak {pangkat} kali &rarr; {pangkat} kelompok, masing-masing berisi {basis}
          </p>

          <div className="bg-white rounded-xl p-5 border border-emerald-100">
            <div className="space-y-4">
              {eksponenGroups.map((group, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-slate-400 font-medium w-16">Kelompok {i + 1}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {group.map((_, j) => (
                        <div
                          key={j}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-emerald-100 pt-3 mt-4 text-center">
              <p className="text-sm text-slate-500 font-mono">
                {basis}<sup>{pangkat}</sup> ={' '}
                {Array.from({ length: pangkat }, (_, i) => (
                  <span key={i}>
                    <span className="text-emerald-600 font-bold">{basis}</span>
                    {i < pangkat - 1 && <span className="text-slate-400 mx-1">×</span>}
                  </span>
                ))}{' '}
                = <strong className="text-emerald-700 text-lg">{hasilEksponen}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-bold shadow-sm mb-5">
            Perkalian Biasa: {basis} &times; {pangkat}
          </div>

          <p className="text-xs text-slate-500 mb-4">
            {basis} dijumlahkan sebanyak {pangkat} kali &rarr; 1 kelompok berisi {basis} &times; {pangkat} = {hasilPerkalian}
          </p>

          <div className="bg-white rounded-xl p-5 border border-amber-100">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {perkalianItems.map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm"
                />
              ))}
            </div>
            <div className="border-t border-amber-100 pt-3 mt-4 text-center">
              <p className="text-sm text-slate-500 font-mono">
                {basis} &times; {pangkat} ={' '}
                {Array.from({ length: pangkat }, (_, i) => (
                  <span key={i}>
                    <span className="text-amber-600 font-bold">{basis}</span>
                    {i < pangkat - 1 && <span className="text-slate-400 mx-1">+</span>}
                  </span>
                ))}{' '}
                = <strong className="text-amber-700 text-lg">{hasilPerkalian}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-emerald-600">📐</span> Bentuk Eksponen
          </h4>
          <div className="bg-emerald-50 rounded-xl p-4 space-y-1.5 font-mono text-sm">
            <p>
              {basis}<sup>{pangkat}</sup> = {basis} &times; {basis} &times; ... &times; {basis}
            </p>
            <p className="text-xs text-slate-400">
              ({pangkat} kali perkalian)
            </p>
            <p>
              {basis}<sup>{pangkat}</sup> = {Array.from({ length: pangkat }, () => basis).join(' × ')}
            </p>
            <p className="text-base font-bold text-emerald-700 border-t border-emerald-200 pt-2">
              {basis}<sup>{pangkat}</sup> = {hasilEksponen}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-amber-600">⚠️</span> Perbandingan &amp; Catatan
          </h4>
          <div className="bg-amber-50 rounded-xl p-4 space-y-2">
            <p className="font-mono text-sm">
              {basis} &times; {pangkat} = {hasilPerkalian}
            </p>
            <div className="border-t border-amber-200 pt-2 text-sm text-slate-600 space-y-1">
              <p>
                <strong className="text-emerald-700">{basis}<sup>{pangkat}</sup></strong> = {basis} × {basis} × ... ({pangkat} kali) ={' '}
                <strong className="text-emerald-700">{hasilEksponen}</strong>
              </p>
              <p>
                <strong className="text-amber-600">{basis} × {pangkat}</strong> = {basis} + {basis} + ... ({pangkat} kali) ={' '}
                <strong className="text-amber-600">{hasilPerkalian}</strong>
              </p>
            </div>
            <div className="bg-amber-100/60 rounded-lg p-3 text-sm text-slate-700 mt-2">
              <strong>Catatan penting:</strong> {basis}<sup>{pangkat}</sup> <strong>bukan</strong> {basis} &times; {pangkat}.
              Eksponen berarti perkalian berulang (angka-angkanya dikalikan), sedangkan perkalian biasa berarti
              penjumlahan berulang (angka-angkanya ditambahkan).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
