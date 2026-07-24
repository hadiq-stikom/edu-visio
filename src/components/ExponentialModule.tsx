'use client';

import React, { useState, useMemo } from 'react';

export default function ExponentialModule() {
  const [mode, setMode] = useState<'growth' | 'decay'>('growth');
  const [initialValue, setInitialValue] = useState(10);
  const [rawRate, setRawRate] = useState(20);
  const [time, setTime] = useState(2);

  const effectiveA = mode === 'growth'
    ? Math.max(1.1, rawRate / 10)
    : 10 / Math.max(rawRate, 10);

  const powResult = Math.pow(effectiveA, time);
  const currentValue = initialValue * powResult;

  const finalValue = initialValue * Math.pow(effectiveA, 10);
  const maxDataValue = Math.max(initialValue, finalValue);

  const yMax = maxDataValue * 1.15;

  const rawStep = yMax / 5;
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(rawStep, 1e-10))));
  const residual = rawStep / magnitude;
  let niceStep: number;
  if (residual <= 1.5) niceStep = magnitude;
  else if (residual <= 3.5) niceStep = 2 * magnitude;
  else if (residual <= 7.5) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const yMaxRounded = Math.ceil(yMax / niceStep) * niceStep;

  const curvePoints = useMemo(() => {
    const points: { x: number; y: number }[] = [];
    const steps = 200;
    const maxX = 10;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxX;
      points.push({ x: t, y: initialValue * Math.pow(effectiveA, t) });
    }
    return points;
  }, [initialValue, effectiveA]);

  const P = { top: 30, right: 30, bottom: 50, left: 60 };
  const W = 640;
  const H = 400;
  const cw = W - P.left - P.right;
  const ch = H - P.top - P.bottom;

  const xS = (x: number) => P.left + (x / 10) * cw;
  const yS = (y: number) => P.top + ch - (y / yMaxRounded) * ch;

  const pathD = curvePoints
    .map((p, i) => {
      const px = xS(p.x);
      const py = yS(p.y);
      return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
    })
    .join(' ');

  const cx = xS(time);
  const cy = yS(currentValue);

  const yTicks = [];
  const numYTicks = Math.round(yMaxRounded / niceStep);
  for (let i = 0; i <= numYTicks; i++) {
    yTicks.push(i * niceStep);
  }

  const xTicks = 5;

  const fmtNum = (val: number) => {
    if (Math.abs(val) >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
    if (Math.abs(val) >= 1000) return `${(val / 1000).toFixed(1)}k`;
    if (Number.isInteger(val)) return val.toString();
    if (Math.abs(val) < 0.01) return val.toExponential(1);
    if (Math.abs(val) < 1) return val.toFixed(2);
    return val.toFixed(1);
  };

  const fmtExact = (v: number) =>
    String(parseFloat(v.toFixed(2)));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Simulasi Fungsi Eksponensial
      </h2>

      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setMode('growth')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'growth'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Pertumbuhan
          </button>
          <button
            onClick={() => setMode('decay')}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === 'decay'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            Peluruhan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-slate-50 p-5 rounded-2xl">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Nilai Awal (n₀): <span className="text-indigo-600">{initialValue}</span>
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={initialValue}
            onChange={(e) => setInitialValue(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {mode === 'growth' ? 'Basis Pertumbuhan' : 'Faktor Peluruhan'} (a):{' '}
            <span className={mode === 'growth' ? 'text-emerald-600' : 'text-rose-600'}>{effectiveA.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="10"
            max="30"
            value={rawRate}
            onChange={(e) => setRawRate(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Waktu (x): <span className="text-indigo-600">{time.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={time * 10}
            onChange={(e) => setTime(Number(e.target.value) / 10)}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
          <span className="text-sm font-medium opacity-80">Rumus:</span>
          <span className="text-lg font-bold tracking-wide">
            f(x) = n₀ {'×'} a<sup className="text-sm">x</sup>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center flex flex-col justify-center">
          <p className="text-xs text-emerald-600 font-medium mb-1">Nilai Awal (n₀)</p>
          <p className="text-2xl font-bold text-emerald-700">{initialValue}</p>
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
          <p className="text-xs text-indigo-600 font-medium mb-2">
            Langkah Perhitungan f({time.toFixed(1)})
          </p>
          <div className="space-y-0.5">
            <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
              f({time.toFixed(1)}) = {initialValue} {'×'} ({effectiveA.toFixed(2)})<sup>{time.toFixed(1)}</sup>
            </p>
            <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
              f({time.toFixed(1)}) = {initialValue} {'×'} {fmtExact(powResult)}
            </p>
          </div>
          <p className="text-xl font-bold text-indigo-700 mt-1">= {fmtExact(currentValue)}</p>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-center flex flex-col justify-center">
          <p className="text-xs text-amber-600 font-medium mb-1">
            {mode === 'growth' ? 'Total Pertumbuhan' : 'Total Peluruhan'}
          </p>
          <p className="text-2xl font-bold text-amber-700">
            {mode === 'growth'
              ? `+${fmtExact(currentValue - initialValue)}`
              : `-${fmtExact(initialValue - currentValue)}`
            }
          </p>
        </div>
      </div>

      <div className="flex justify-center bg-slate-50 p-4 rounded-2xl border border-slate-200 overflow-x-auto">
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} className="bg-white rounded-xl">
          <defs>
            <clipPath id="chartArea">
              <rect x={P.left} y={P.top} width={cw} height={ch} />
            </clipPath>
          </defs>

          {yTicks.map((val) => {
            const y = yS(val);
            if (y < P.top - 2 || y > H - P.bottom + 2) return null;
            return (
              <g key={`yg-${val}`}>
                <line x1={P.left} y1={y} x2={W - P.right} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={P.left - 8} y={y + 4} className="text-[10px] fill-slate-400" textAnchor="end">
                  {fmtNum(val)}
                </text>
              </g>
            );
          })}

          {Array.from({ length: xTicks + 1 }, (_, i) => {
            const x = P.left + (i / xTicks) * cw;
            const val = (i / xTicks) * 10;
            return (
              <g key={`xg-${i}`}>
                <line x1={x} y1={P.top} x2={x} y2={H - P.bottom} stroke="#f1f5f9" strokeWidth="1" />
                <text x={x} y={H - P.bottom + 18} className="text-[10px] fill-slate-400" textAnchor="middle">
                  {fmtNum(val)}
                </text>
              </g>
            );
          })}

          <line x1={P.left} y1={P.top} x2={P.left} y2={H - P.bottom} stroke="#94a3b8" strokeWidth="2" />
          <line x1={P.left} y1={H - P.bottom} x2={W - P.right} y2={H - P.bottom} stroke="#94a3b8" strokeWidth="2" />

          <text x={W / 2} y={H - 5} className="text-xs fill-slate-500" textAnchor="middle">
            Waktu (x)
          </text>
          <text
            x={12}
            y={H / 2 + 6}
            className="text-xs fill-slate-500"
            textAnchor="middle"
            transform={`rotate(-90, 12, ${H / 2 + 6})`}
          >
            f(x)
          </text>

          <g clipPath="url(#chartArea)">
            <path
              d={pathD}
              fill="none"
              stroke={mode === 'growth' ? '#059669' : '#e11d48'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-200"
            />

            <circle
              cx={cx}
              cy={cy}
              r="6"
              fill={mode === 'growth' ? '#059669' : '#e11d48'}
              stroke="white"
              strokeWidth="2.5"
              className="transition-all duration-200"
            />

            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={H - P.bottom}
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4"
            />
            <line
              x1={P.left}
              y1={cy}
              x2={cx}
              y2={cy}
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeDasharray="4"
            />
          </g>

          {cy >= P.top && cy <= H - P.bottom && (
            <>
              <rect
                x={Math.min(cx + 10, W - P.right - 120)}
                y={Math.max(cy - 28, P.top + 2)}
                width="120"
                height="22"
                rx="4"
                fill={mode === 'growth' ? '#059669' : '#e11d48'}
                opacity="0.9"
              />
              <text
                x={Math.min(cx + 16, W - P.right - 114)}
                y={Math.max(cy - 13, P.top + 15)}
                className="text-[11px] font-bold fill-white"
              >
                f({time.toFixed(1)}) = {fmtNum(currentValue)}
              </text>
            </>
          )}
        </svg>
      </div>

      <div
        className={`mt-8 p-5 rounded-xl border ${
          mode === 'growth'
            ? 'bg-emerald-50 border-emerald-100'
            : 'bg-rose-50 border-rose-100'
        }`}
      >
        <h4 className="text-sm font-bold text-slate-900 mb-2">
          {mode === 'growth' ? 'Catatan: Pertumbuhan Eksponensial' : 'Catatan: Peluruhan Eksponensial'}
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed">
          {mode === 'growth'
            ? `Fungsi f(x) = ${initialValue} \u00D7 ${effectiveA.toFixed(2)}^x menunjukkan pertumbuhan eksponensial. Nilai fungsi meningkat secara signifikan seiring bertambahnya waktu (x). Contoh nyata dalam konteks MA: pembelahan bakteri E. coli setiap 20 menit, penyebaran hoaks atau virus secara geometris, dan pertumbuhan investasi dengan bunga majemuk.`
            : `Fungsi f(x) = ${initialValue} \u00D7 (${effectiveA.toFixed(2)})^x menunjukkan peluruhan eksponensial. Nilai fungsi menurun secara konsisten seiring bertambahnya waktu (x). Contoh nyata dalam konteks MA: peluruhan dosis obat dalam tubuh pasien, peluruhan zat radioaktif (misalnya Carbon-14), dan penurunan suhu benda yang mendingin.`
          }
        </p>
      </div>
    </div>
  );
}
