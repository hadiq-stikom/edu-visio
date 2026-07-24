'use client';

import React, { useMemo } from 'react';

export default function CharityModule() {
  const [faktorPenyebaran, setFaktorPenyebaran] = React.useState(3);
  const [tingkatPenyebaran, setTingkatPenyebaran] = React.useState(4);

  const orangPertama = 1;
  const r = faktorPenyebaran;
  const n = tingkatPenyebaran;

  const barisan = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= n; i++) {
      arr.push(orangPertama * Math.pow(r, i - 1));
    }
    return arr;
  }, [r, n]);

  const totalDeret = useMemo(() => {
    if (r === 1) return orangPertama * n;
    return (orangPertama * (Math.pow(r, n) - 1)) / (r - 1);
  }, [r, n]);

  const uTerakhir = barisan[n - 1];

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold mb-2">
          Simulasi Amal Jariyah
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Efek Bola Salju &mdash; Barisan Geometri
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Satu orang mengajarkan ilmu kepada &rarr; r orang, lalu setiap dari mereka mengajarkan ke r orang
          lainnya &mdash; sebagaimana sabda Nabi: &ldquo;Sebaik-baik manusia adalah yang bermanfaat bagi orang lain.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Faktor Penyebaran (r): <span className="text-violet-600 font-bold">{r}</span>
          </label>
          <input
            type="range"
            min="2"
            max="5"
            value={r}
            onChange={(e) => setFaktorPenyebaran(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
          <p className="text-xs text-violet-500 mt-1">
            1 orang mengajar ke {r} orang baru
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tingkat Penyebaran (n): <span className="text-violet-600 font-bold">{n}</span>
          </label>
          <input
            type="range"
            min="2"
            max="6"
            value={n}
            onChange={(e) => setTingkatPenyebaran(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-slate-200 mb-6 overflow-x-auto">
        <p className="text-xs text-slate-400 font-medium mb-4">
          Jaringan Penyebaran Ilmu
        </p>
        <div className="space-y-3">
          {barisan.map((jumlah, idx) => {
            const tingkat = idx + 1;
            const maxDots = 900;
            const showDots = Math.min(jumlah, maxDots);
            const sisa = jumlah - maxDots;
            return (
              <div key={tingkat} className="flex items-start gap-3">
                <div className="w-24 shrink-0 text-right pt-1">
                  <span className="text-sm font-bold text-violet-700">
                    Tk. {tingkat}
                  </span>
                  <span className="text-xs text-slate-400 block">
                    = {jumlah.toLocaleString()} org
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-[3px]">
                    {Array.from({ length: showDots }, (_, j) => (
                      <div
                        key={j}
                        className="w-2.5 h-2.5 rounded-full bg-violet-500 shrink-0"
                      />
                    ))}
                    {sisa > 0 && (
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        +{sisa.toLocaleString()} lagi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-violet-500" /> 1 orang = 1 dot
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-5 border border-violet-200 mb-6 text-center">
        <p className="text-sm text-slate-600">
          <strong className="text-violet-700">Kesimpulan:</strong> Jika 1 orang mengajarkan ilmu kepada{' '}
          <strong className="text-violet-700">{r}</strong> orang, dan setiap orang melanjutkan ke{' '}
          <strong className="text-violet-700">{r}</strong> orang lainnya hingga{' '}
          <strong className="text-violet-700">tingkat ke-{n}</strong>, maka total orang yang
          terkena manfaat ilmu adalah <strong className="text-violet-700">{totalDeret.toLocaleString()}</strong> orang.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-violet-600 font-bold text-lg">U</span>
            <h4 className="text-sm font-bold text-slate-800">
              Barisan &mdash; Dampak Tingkat ke-{n}
            </h4>
          </div>
          <div className="bg-white rounded-xl p-4 border border-violet-100 space-y-2">
            <div className="font-mono text-sm text-slate-600 space-y-1.5">
              <p>
                U<sub>{n}</sub> = a &times; r<sup>{n}&minus;1</sup>
              </p>
              <p>
                U<sub>{n}</sub> = {orangPertama} &times; {r}<sup>{n - 1}</sup>
              </p>
              <p>
                U<sub>{n}</sub> = {orangPertama} &times; {Math.pow(r, n - 1).toLocaleString()}
              </p>
            </div>
            <div className="border-t border-violet-100 pt-2">
              <p className="text-lg font-bold text-violet-700">
                U<sub>{n}</sub> = {uTerakhir.toLocaleString()} orang baru
              </p>
            </div>
          </div>
        </div>

        <div className="bg-fuchsia-50 rounded-2xl p-5 border border-fuchsia-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-fuchsia-600 font-bold text-lg">S</span>
            <h4 className="text-sm font-bold text-slate-800">
              Deret &mdash; Total Akumulasi Amal Jariyah
            </h4>
          </div>
          <div className="bg-white rounded-xl p-4 border border-fuchsia-100 space-y-2">
            <div className="font-mono text-sm text-slate-600 space-y-1.5">
              <p>
                S<sub>{n}</sub> = a(r<sup>{n}</sup> &minus; 1) / (r &minus; 1)
              </p>
              <p>
                S<sub>{n}</sub> = {orangPertama} &times; ({r}<sup>{n}</sup> &minus; 1) / ({r} &minus; 1)
              </p>
              <p>
                S<sub>{n}</sub> = {orangPertama} &times; {Math.pow(r, n).toLocaleString()} &minus; 1 / {r - 1}
              </p>
              <p>
                S<sub>{n}</sub> = {totalDeret.toLocaleString()}
              </p>
            </div>
            <div className="border-t border-fuchsia-100 pt-2">
              <p className="text-lg font-bold text-fuchsia-700">
                Total = {totalDeret.toLocaleString()} orang
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
