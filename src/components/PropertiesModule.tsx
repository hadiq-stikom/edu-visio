'use client';

import React, { useState } from 'react';

export default function PropertiesModule() {
  const [activeTab, setActiveTab] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [basisA, setBasisA] = useState(2);
  const [pangkatM, setPangkatM] = useState(3);
  const [pangkatN, setPangkatN] = useState(2);

  const showN = activeTab !== 4;
  const valA = basisA;
  const valM = pangkatM;
  const valN = pangkatN;

  const B = 'text-blue-600';
  const G = 'text-emerald-600';
  const R = 'text-rose-600';

  const tabs = [
    { id: 1, label: 'Perkalian', formula: 'a\u1D50 \u00D7 a\u207F = a\u1D50\u207A\u207F' },
    { id: 2, label: 'Pembagian', formula: 'a\u1D50 \u00F7 a\u207F = a\u1D50\u207B\u207F' },
    { id: 3, label: 'Pangkat Bertingkat', formula: '(a\u1D50)\u207F = a\u1D50\u00D7\u207F' },
    { id: 4, label: 'Negatif', formula: 'a\u207B\u1D50 = 1/a\u1D50' },
    { id: 5, label: 'Pecahan / Akar', formula: 'a\u1D50\u1D56\u207F = \u207F\u221A(a\u1D50)' },
  ];

  const fmt = (v: number) => {
    if (!isFinite(v)) return 'Tak terdefinisi';
    if (Number.isInteger(v)) return v.toLocaleString();
    return parseFloat(v.toFixed(4)).toString();
  };

  const ColoredBase = () => <span className={`${B} font-bold text-3xl`}>{valA}</span>;

  const renderStep = (label: string, children: React.ReactNode, highlight?: boolean) => (
    <div className={`rounded-2xl p-6 border ${highlight ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
      <p className="text-xs text-slate-400 font-medium mb-3 uppercase tracking-wide">{label}</p>
      <div className="font-mono">{children}</div>
    </div>
  );

  const renderPerkalian = () => {
    const hasilPangkat = valM + valN;
    const hasilAkhir = Math.pow(valA, hasilPangkat);
    return (
      <div className="space-y-5">
        {renderStep('Soal', (
          <p className="text-4xl">
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>{valM}</sup>
            <span className="text-slate-500 text-2xl mx-2">×</span>
            <ColoredBase /><sup className={`${R} font-bold text-2xl`}>{valN}</sup>
          </p>
        ))}
        {renderStep('Langkah 1 — Terapkan Sifat a\u1D50 × a\u207F = a\u1D50⁺⁺', (
          <p className="text-4xl">
            <ColoredBase />
            <sup className="text-2xl">
              <span className={`${G} font-bold`}>{valM}</span>
              <span className="text-slate-500">+</span>
              <span className={`${R} font-bold`}>{valN}</span>
            </sup>
          </p>
        ))}
        {renderStep('Langkah 2 — Hitung Pangkat', (
          <p className="text-4xl">
            <ColoredBase /><sup className="text-indigo-600 font-bold text-2xl">{hasilPangkat}</sup>
          </p>
        ))}
        {renderStep('Hasil Akhir', (
          <p className="text-4xl font-bold text-emerald-700">= {fmt(hasilAkhir)}</p>
        ), true)}
      </div>
    );
  };

  const renderPembagian = () => {
    const hasilPangkat = valM - valN;
    const hasilAkhir = Math.pow(valA, hasilPangkat);
    return (
      <div className="space-y-5">
        {renderStep('Soal', (
          <p className="text-4xl">
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>{valM}</sup>
            <span className="text-slate-500 text-2xl mx-2">÷</span>
            <ColoredBase /><sup className={`${R} font-bold text-2xl`}>{valN}</sup>
          </p>
        ))}
        {renderStep('Langkah 1 — Terapkan Sifat a\u1D50 ÷ a\u207F = a\u1D50⁻⁺', (
          <p className="text-4xl">
            <ColoredBase />
            <sup className="text-2xl">
              <span className={`${G} font-bold`}>{valM}</span>
              <span className="text-slate-500">−</span>
              <span className={`${R} font-bold`}>{valN}</span>
            </sup>
          </p>
        ))}
        {renderStep('Langkah 2 — Hitung Pangkat', (
          <p className="text-4xl">
            <ColoredBase /><sup className="text-indigo-600 font-bold text-2xl">{hasilPangkat}</sup>
          </p>
        ))}
        {renderStep('Hasil Akhir', (
          <p className="text-4xl font-bold text-emerald-700">
            = {fmt(hasilAkhir)}
            {hasilPangkat < 0 && (
              <span className="text-base font-normal text-slate-500 ml-2">
                (bentuk pecahan: 1/{fmt(Math.pow(valA, -hasilPangkat))})
              </span>
            )}
          </p>
        ), true)}
      </div>
    );
  };

  const renderPangkatDariPangkat = () => {
    const hasilPangkat = valM * valN;
    const hasilAkhir = Math.pow(valA, hasilPangkat);
    return (
      <div className="space-y-5">
        {renderStep('Soal', (
          <p className="text-4xl">
            <span className="text-slate-500">(</span>
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>{valM}</sup>
            <span className="text-slate-500">)</span>
            <sup className={`${R} font-bold text-2xl`}>{valN}</sup>
          </p>
        ))}
        {renderStep('Langkah 1 — Terapkan Sifat (a\u1D50)\u207F = a\u1D50×⁺', (
          <p className="text-4xl">
            <ColoredBase />
            <sup className="text-2xl">
              <span className={`${G} font-bold`}>{valM}</span>
              <span className="text-slate-500">×</span>
              <span className={`${R} font-bold`}>{valN}</span>
            </sup>
          </p>
        ))}
        {renderStep('Langkah 2 — Hitung Pangkat', (
          <p className="text-4xl">
            <ColoredBase /><sup className="text-indigo-600 font-bold text-2xl">{hasilPangkat}</sup>
          </p>
        ))}
        {renderStep('Hasil Akhir', (
          <p className="text-4xl font-bold text-emerald-700">= {fmt(hasilAkhir)}</p>
        ), true)}
      </div>
    );
  };

  const renderPangkatNegatif = () => {
    const penyebut = Math.pow(valA, valM);
    const hasilAkhir = 1 / penyebut;
    return (
      <div className="space-y-5">
        {renderStep('Soal', (
          <p className="text-4xl">
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>−{valM}</sup>
          </p>
        ))}
        {renderStep('Langkah 1 — Terapkan Sifat a⁻ᵐ = 1/aᵐ', (
          <p className="text-4xl">
            <span className="text-slate-500">1/</span>
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>{valM}</sup>
          </p>
        ))}
        {renderStep('Langkah 2 — Hitung Penyebut', (
          <p className="text-4xl">
            <span className="text-slate-500">1/</span>
            <span className="text-indigo-600 font-bold">{fmt(penyebut)}</span>
          </p>
        ))}
        {renderStep('Hasil Akhir', (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-700">
              = 1/{fmt(penyebut)}
            </p>
            <p className="text-xl font-bold text-emerald-600">
              = {fmt(hasilAkhir)}
            </p>
          </div>
        ), true)}
      </div>
    );
  };

  const renderPangkatPecahan = () => {
    const nilaiDalamAkar = Math.pow(valA, valM);
    const hasilAkhir = Math.pow(valA, valM / valN);
    return (
      <div className="space-y-5">
        {renderStep('Soal', (
          <p className="text-4xl">
            <ColoredBase />
            <sup className="text-2xl">
              <span className={`${G} font-bold`}>{valM}</span>
              <span className="text-slate-500">/</span>
              <span className={`${R} font-bold`}>{valN}</span>
            </sup>
          </p>
        ))}
        {renderStep('Langkah 1 — Ubah ke Bentuk Akar', (
          <p className="text-4xl">
            <sup className={`${R} font-bold text-xl align-super`}>{valN}</sup>
            <span className="text-4xl">√</span>
            <span className="text-slate-500">(</span>
            <ColoredBase /><sup className={`${G} font-bold text-2xl`}>{valM}</sup>
            <span className="text-slate-500">)</span>
          </p>
        ))}
        {renderStep('Langkah 2 — Hitung Nilai dalam Akar', (
          <p className="text-4xl">
            <sup className={`${R} font-bold text-xl align-super`}>{valN}</sup>
            <span className="text-4xl">√</span>
            <span className="text-indigo-600 font-bold">{fmt(nilaiDalamAkar)}</span>
          </p>
        ))}
        {renderStep('Hasil Akhir', (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-700">
              = <sup className={`${R} font-bold text-lg align-super`}>{valN}</sup>√{fmt(nilaiDalamAkar)}
            </p>
            <p className="text-xl font-bold text-emerald-600">
              ≈ {fmt(hasilAkhir)}
            </p>
          </div>
        ), true)}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Eksplorasi Sifat-Sifat Eksponen
      </h2>

      <p className="text-sm text-slate-500 text-center mb-6 max-w-2xl mx-auto">
        Pelajari 5 sifat dasar eksponen secara visual dengan <span className="font-semibold text-blue-600">basis (a)</span>{' '}
        berwarna biru, <span className="font-semibold text-emerald-600">pangkat pertama (m)</span> hijau, dan{' '}
        <span className="font-semibold text-rose-600">pangkat kedua (n)</span> merah.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Basis <span className="text-blue-600 font-bold">(a)</span>: {basisA}
          </label>
          <input
            type="range"
            min="2"
            max="5"
            value={basisA}
            onChange={(e) => setBasisA(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pangkat <span className="text-emerald-600 font-bold">(m)</span>: {pangkatM}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={pangkatM}
            onChange={(e) => setPangkatM(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
        <div className={!showN ? 'opacity-40 pointer-events-none' : ''}>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pangkat <span className="text-rose-600 font-bold">(n)</span>: {showN ? pangkatN : '—'}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={showN ? pangkatN : 1}
            onChange={(e) => setPangkatN(Number(e.target.value))}
            disabled={!showN}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {activeTab === 1 && renderPerkalian()}
        {activeTab === 2 && renderPembagian()}
        {activeTab === 3 && renderPangkatDariPangkat()}
        {activeTab === 4 && renderPangkatNegatif()}
        {activeTab === 5 && renderPangkatPecahan()}
      </div>

      <div className="p-5 rounded-xl border bg-indigo-50 border-indigo-100">
        <h4 className="text-sm font-bold text-slate-900 mb-2">
          Catatan Sifat — Rumus Aljabar
        </h4>
        <p className="text-xl font-mono font-bold text-indigo-800">
          {activeTab === 1 && <>a<sup className="text-base">m</sup> × a<sup className="text-base">n</sup> = a<sup className="text-base">m+n</sup></>}
          {activeTab === 2 && <>a<sup className="text-base">m</sup> ÷ a<sup className="text-base">n</sup> = a<sup className="text-base">m−n</sup></>}
          {activeTab === 3 && <>(a<sup className="text-base">m</sup>)<sup className="text-base">n</sup> = a<sup className="text-base">m×n</sup></>}
          {activeTab === 4 && <>a<sup className="text-base">−m</sup> = 1 / a<sup className="text-base">m</sup></>}
          {activeTab === 5 && <>a<sup className="text-base">m/n</sup> = <sup className="text-base">n</sup>√(a<sup className="text-base">m</sup>)</>}
        </p>
        <p className="text-sm text-slate-600 mt-2">
          {activeTab === 1 && 'Ketika dua bilangan eksponen dengan basis sama dikalikan, pangkatnya dijumlahkan.'}
          {activeTab === 2 && 'Ketika dua bilangan eksponen dengan basis sama dibagi, pangkatnya dikurangkan.'}
          {activeTab === 3 && 'Ketika suatu eksponen dipangkatkan lagi, pangkatnya dikalikan.'}
          {activeTab === 4 && 'Eksponen negatif dapat diubah menjadi bentuk pecahan positif (resiprokal).'}
          {activeTab === 5 && 'Eksponen pecahan dapat diubah ke bentuk akar dengan indeks penyebut dan pangkat pembilang.'}
        </p>
      </div>
    </div>
  );
}
