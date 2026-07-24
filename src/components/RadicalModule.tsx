'use client';

import React from 'react';

const ANGKA_PRASET = [
  { value: 4, label: '4', prime: '2²' },
  { value: 8, label: '8', prime: '2³' },
  { value: 9, label: '9', prime: '3²' },
  { value: 16, label: '16', prime: '2⁴' },
  { value: 27, label: '27', prime: '3³' },
  { value: 32, label: '32', prime: '2⁵' },
  { value: 36, label: '36', prime: '6²' },
  { value: 64, label: '64', prime: '2⁶ / 4³' },
];

export default function RadicalModule() {
  const [angkaDasar, setAngkaDasar] = React.useState(16);
  const [jenisAkar, setJenisAkar] = React.useState(2);

  const numInfo = ANGKA_PRASET.find((n) => n.value === angkaDasar)!;
  const n = jenisAkar;

  const hasilAkar = n === 2 ? Math.sqrt(angkaDasar) : Math.cbrt(angkaDasar);
  const isExact = Number.isInteger(hasilAkar);
  const gridSide = n === 2 && isExact ? hasilAkar : null;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-2">
          Bentuk Akar &amp; Pangkat Pecahan
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Eksplorasi Bentuk Akar
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Memahami hubungan antara bentuk akar dan eksponen pecahan secara visual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Pilih Angka Dasar:
          </label>
          <div className="flex flex-wrap gap-2">
            {ANGKA_PRASET.map((item) => (
              <button
                key={item.value}
                onClick={() => setAngkaDasar(item.value)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  angkaDasar === item.value
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-3">
            Jenis Akar:
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setJenisAkar(2)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                jenisAkar === 2
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              √ &mdash; Akar Kuadrat
            </button>
            <button
              onClick={() => setJenisAkar(3)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                jenisAkar === 3
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
              }`}
            >
              ∛ &mdash; Akar Pangkat Tiga
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-600 text-white text-sm font-bold shadow-sm mb-5">
            {n === 2 ? <>√{angkaDasar}</> : <>∛{angkaDasar}</>} &mdash; Visualisasi
          </div>

          <div className="bg-white rounded-xl p-5 border border-amber-100">
            {gridSide ? (
              <div className="flex flex-col items-center">
                <p className="text-xs text-slate-400 mb-3">
                  Grid {gridSide}×{gridSide} = {angkaDasar} kotak
                </p>
                <div className="inline-grid gap-1" style={{ gridTemplateColumns: `repeat(${gridSide}, 1fr)` }}>
                  {Array.from({ length: angkaDasar }, (_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 sm:w-7 sm:h-7 rounded-md bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-amber-500 inline-block" /> Sisi = {gridSide}
                  </span>
                  <span className="text-slate-300">|</span>
                  <span>
                    Luas = {gridSide} × {gridSide} = {angkaDasar}
                  </span>
                </div>
              </div>
            ) : n === 3 && isExact ? (
              <div className="flex flex-col items-center">
                <p className="text-xs text-slate-400 mb-3">
                  {hasilAkar} × {hasilAkar} × {hasilAkar} = {angkaDasar}
                </p>
                <div className="space-y-2">
                  {Array.from({ length: hasilAkar }, (_, layer) => (
                    <div key={layer} className="flex justify-center gap-1">
                      {Array.from({ length: hasilAkar * hasilAkar }, (_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-sm ${
                            layer === 0
                              ? 'bg-amber-500'
                              : layer === 1
                                ? 'bg-amber-400'
                                : 'bg-amber-300'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  {hasilAkar} lapis, masing-masing {hasilAkar}×{hasilAkar} = {angkaDasar} kubus satuan
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-slate-500 mb-3">
                  {angkaDasar} bukan kuadrat/kubik sempurna untuk akar pangkat {n}.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm text-slate-600 space-y-1">
                  <p>Faktorisasi prima: {numInfo.prime}</p>
                  <p>
                    {n === 2 ? '√' : '∛'}{angkaDasar} = {n === 2 ? '√' : '∛'}{numInfo.prime.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, '')}
                  </p>
                  <p className="text-base font-bold text-amber-700">
                    ≈ {hasilAkar.toFixed(4)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-600 text-white text-sm font-bold shadow-sm mb-5">
            <sup>{n}</sup>√{angkaDasar} = {angkaDasar}<sup>1/{n}</sup> &mdash; Konversi
          </div>

          <div className="bg-white rounded-xl p-5 border border-amber-100 space-y-4">
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-amber-700">
                <sup>{n}</sup>√{angkaDasar}{' '}
                <span className="text-slate-400 mx-2">=</span>{' '}
                {angkaDasar}<sup className="text-base">1/{n}</sup>
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-4 font-mono text-sm text-slate-600 space-y-1.5">
              <p className="text-xs text-slate-400 font-medium">Penjabaran Langkah</p>
              <p>
                Bentuk akar: <sup>{n}</sup>√{angkaDasar}
              </p>
              <p>
                Konversi ke pangkat pecahan: {angkaDasar}<sup>1/{n}</sup>
              </p>
              <p className="text-xs text-slate-400">
                {n === 2
                  ? 'Akar kuadrat = pangkat 1/2'
                  : 'Akar pangkat tiga = pangkat 1/3'}
              </p>
              <div className="border-t border-amber-200 pt-2 mt-2">
                <p className="text-base font-bold text-amber-700">
                  = {isExact ? hasilAkar : hasilAkar.toFixed(4)}
                </p>
                {isExact && (
                  <p className="text-xs text-slate-400 mt-1">
                    {n === 2
                      ? `Karena ${hasilAkar} × ${hasilAkar} = ${angkaDasar}`
                      : `Karena ${hasilAkar} × ${hasilAkar} × ${hasilAkar} = ${angkaDasar}`
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Rumus Umum</p>
              <p className="text-lg font-mono font-bold text-indigo-700">
                <sup>n</sup>√a = a<sup className="text-sm">1/n</sup>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Akar pangkat n dari a sama dengan a pangkat 1 per n.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-amber-600">📖</span> Bentuk Akar
          </h4>
          <div className="bg-amber-50 rounded-xl p-4 space-y-2 text-sm">
            <p>
              <strong className="text-amber-700"><sup>{n}</sup>√{angkaDasar}</strong> dibaca
              &ldquo;akar pangkat {n} dari {angkaDasar}&rdquo;.
            </p>
            <p>
              {n === 2 ? (
                <span>
                  {angkaDasar} = {gridSide ? `${gridSide} × ${gridSide}` : `...`}, maka
                  √{angkaDasar} = {isExact ? hasilAkar : `...`}
                </span>
              ) : (
                <span>
                  {angkaDasar} = {isExact ? `${hasilAkar} × ${hasilAkar} × ${hasilAkar}` : `...`}, maka
                  ∛{angkaDasar} = {isExact ? hasilAkar : `...`}
                </span>
              )}
            </p>
            <div className="border-t border-amber-200 pt-2 mt-2">
              <p className="font-bold text-amber-700">
                <sup>{n}</sup>√{angkaDasar} = {isExact ? hasilAkar : hasilAkar.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-amber-600">🔄</span> Konversi ke Pangkat Pecahan
          </h4>
          <div className="bg-amber-50 rounded-xl p-4 space-y-2 text-sm">
            <p>Setiap bentuk akar dapat diubah ke bentuk eksponen pecahan:</p>
            <p className="text-lg font-mono font-bold text-amber-700 text-center py-2">
              <sup>{n}</sup>√{angkaDasar} = {angkaDasar}<sup className="text-sm">1/{n}</sup>
            </p>
            <div className="border-t border-amber-200 pt-2 mt-2 space-y-1">
              <p className="text-xs text-slate-500">
                {n === 2
                  ? '√a = a^(1/2) — akar kuadrat setara dengan pangkat setengah'
                  : '∛a = a^(1/3) — akar pangkat tiga setara dengan pangkat sepertiga'}
              </p>
              <p className="text-xs text-slate-500">
                {angkaDasar}<sup>1/{n}</sup> = {isExact ? hasilAkar : hasilAkar.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
