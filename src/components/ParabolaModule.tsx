'use client';

import React from 'react';

const PAD = 40;
const W = 500;
const H = 500;
const RANGE = 10;

function toSvgX(x: number): number {
  return PAD + ((x + RANGE) / (2 * RANGE)) * (W - 2 * PAD);
}

function toSvgY(y: number): number {
  return H - PAD - ((y + RANGE) / (2 * RANGE)) * (H - 2 * PAD);
}

function formatNum(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(1);
}

export default function ParabolaModule() {
  const [a, setA] = React.useState(1);
  const [b, setB] = React.useState(0);
  const [c, setC] = React.useState(-4);

  const safeA = a === 0 ? 0.1 : a;

  const xSym = -b / (2 * safeA);
  const yPeak = safeA * xSym * xSym + b * xSym + c;
  const diskriminan = b * b - 4 * safeA * c;
  const terbukaKeAtas = safeA > 0;

  const points: [number, number][] = [];
  for (let x = -RANGE; x <= RANGE; x += 0.2) {
    const y = safeA * x * x + b * x + c;
    if (Math.abs(y) <= RANGE + 2) {
      points.push([x, y]);
    }
  }
  const curvePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`).join(' ');

  const gridLines: React.ReactNode[] = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    if (i === 0) continue;
    const gx = toSvgX(i);
    const gy = toSvgY(i);
    gridLines.push(
      <line key={`vg${i}`} x1={gx} y1={toSvgY(-RANGE)} x2={gx} y2={toSvgY(RANGE)} stroke="#e2e8f0" strokeWidth={0.5} />,
      <line key={`hg${i}`} x1={toSvgX(-RANGE)} y1={gy} x2={toSvgX(RANGE)} y2={gy} stroke="#e2e8f0" strokeWidth={0.5} />,
    );
  }

  const axisLabels: React.ReactNode[] = [];
  for (let i = -RANGE; i <= RANGE; i += 2) {
    if (i !== 0) {
      axisLabels.push(
        <text key={`xl${i}`} x={toSvgX(i)} y={H - PAD + 14} textAnchor="middle" className="fill-slate-400 text-[9px] font-mono">{i}</text>,
        <text key={`yl${i}`} x={PAD - 10} y={toSvgY(i) + 3} textAnchor="end" className="fill-slate-400 text-[9px] font-mono">{i}</text>,
      );
    }
  }

  const diskDesc =
    diskriminan > 0
      ? 'memotong sumbu X di 2 titik'
      : diskriminan === 0
        ? 'menyinggung sumbu X'
        : 'tidak memotong sumbu X';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">Fungsi Kuadrat</span>
        <h2 className="text-2xl font-bold text-slate-800">Karakteristik Grafik Parabola</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Ubah koefisien a, b, dan c untuk melihat bagaimana grafik <strong>f(x) = ax² + bx + c</strong> berubah.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="text-center font-mono text-lg font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">
              f(x) = {formatNum(safeA)}x<sup>2</sup>{' '}
              {b > 0 ? `+ ${b}` : b < 0 ? `- ${Math.abs(b)}` : ''}x{' '}
              {c > 0 ? `+ ${c}` : c < 0 ? `- ${Math.abs(c)}` : ''}
            </div>

            <div className="space-y-4">
              <Slide label="a" value={a} min={-5} max={5} step={0.1} onChange={setA} color="blue" />
              <Slide label="b" value={b} min={-10} max={10} step={1} onChange={setB} color="indigo" />
              <Slide label="c" value={c} min={-10} max={10} step={1} onChange={setC} color="purple" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2 text-xs font-mono">
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Hasil Perhitungan</p>
            <p className="flex justify-between"><span className="text-slate-500">Sumbu Simetri:</span><span className="font-bold text-slate-700">x = {formatNum(xSym)}</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Titik Puncak:</span><span className="font-bold text-slate-700">({formatNum(xSym)}, {formatNum(yPeak)})</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Diskriminan (D):</span><span className="font-bold text-slate-700">{formatNum(diskriminan)}</span></p>
            <p className="flex justify-between"><span className="text-slate-500">Potong Sumbu Y:</span><span className="font-bold text-slate-700">(0, {formatNum(c)})</span></p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-w-[550px] mx-auto">
            <rect x={0} y={0} width={W} height={H} fill="#f8fafc" rx={8} />

            {gridLines}

            <line x1={toSvgX(-RANGE)} y1={toSvgY(0)} x2={toSvgX(RANGE)} y2={toSvgY(0)} stroke="#475569" strokeWidth={1.5} />
            <line x1={toSvgX(0)} y1={toSvgY(-RANGE)} x2={toSvgX(0)} y2={toSvgY(RANGE)} stroke="#475569" strokeWidth={1.5} />

            <text x={toSvgX(RANGE) + 10} y={toSvgY(0) + 4} className="fill-slate-500 text-[10px] font-bold font-mono">x</text>
            <text x={toSvgX(0) - 12} y={toSvgY(RANGE) + 10} className="fill-slate-500 text-[10px] font-bold font-mono">y</text>

            {axisLabels}

            <path d={curvePath} fill="none" stroke="#2563eb" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

            <line x1={toSvgX(xSym)} y1={toSvgY(-RANGE)} x2={toSvgX(xSym)} y2={toSvgY(RANGE)}
              stroke="#f97316" strokeWidth={1.5} strokeDasharray="6,4" />

            <circle cx={toSvgX(xSym)} cy={toSvgY(yPeak)} r={6} fill="#ef4444" stroke="white" strokeWidth={2} className="drop-shadow-sm" />
            <text x={toSvgX(xSym) + 10} y={toSvgY(yPeak) - 6} className="fill-red-600 text-[9px] font-bold font-mono">
              ({formatNum(xSym)},{formatNum(yPeak)})
            </text>

            <circle cx={toSvgX(0)} cy={toSvgY(c)} r={5} fill="#22c55e" stroke="white" strokeWidth={2} className="drop-shadow-sm" />
            <text x={toSvgX(0) + 10} y={toSvgY(c) - 6} className="fill-green-600 text-[9px] font-bold font-mono">
              (0,{formatNum(c)})
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Analisis Grafik</h4>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">&bull; Bentuk Parabola:</span>{' '}
            Karena a = {formatNum(safeA)} {'>'} 0, parabola terbuka ke{' '}
            <strong className="text-blue-700">atas</strong> (nilai minimum).
          </p>
          {!terbukaKeAtas && (
            <p>
              <span className="font-semibold">&bull; Bentuk Parabola:</span>{' '}
              Karena a = {formatNum(safeA)} {'<'} 0, parabola terbuka ke{' '}
              <strong className="text-orange-700">bawah</strong> (nilai maksimum).
            </p>
          )}
          <p>
            <span className="font-semibold">&bull; Diskriminan:</span>{' '}
            D = {formatNum(diskriminan)}. Karena D {diskriminan > 0 ? '>' : diskriminan === 0 ? '=' : '<'} 0,
            grafik <strong>{diskDesc}</strong>.
          </p>
          <p>
            <span className="font-semibold">&bull; Titik Puncak:</span>{' '}
            Berada di koordinat <strong>({formatNum(xSym)}, {formatNum(yPeak)})</strong> dan merupakan titik{' '}
            <strong>{terbukaKeAtas ? 'minimum' : 'maksimum'}</strong>.
          </p>
          <p>
            <span className="font-semibold">&bull; Sumbu Simetri:</span>{' '}
            Garis vertikal x = {formatNum(xSym)} (garis oranye putus-putus).
          </p>
        </div>
      </div>
    </div>
  );
}

function Slide({ label, value, min, max, step, onChange, color }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; color: string;
}) {
  const colors: Record<string, string> = { blue: 'accent-blue-600', indigo: 'accent-indigo-600', purple: 'accent-purple-600' };
  const textColors: Record<string, string> = { blue: 'text-blue-600', indigo: 'text-indigo-600', purple: 'text-purple-600' };
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="font-semibold text-slate-600">{label}</span>
        <span className={`font-bold font-mono ${textColors[color] || 'text-slate-600'}`}>{formatNum(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer ${colors[color] || ''}`} />
    </div>
  );
}