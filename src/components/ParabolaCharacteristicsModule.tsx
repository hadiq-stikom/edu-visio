'use client';

import React from 'react';

const W = 600, H = 500;
const OX = 300, OY = 370;
const S = 30;

function fmt(n: number): string {
  const r = Math.round(n * 100) / 100;
  return r === Math.floor(r) ? r.toString() : r.toFixed(2);
}

function svgX(mx: number): number { return OX + mx * S; }
function svgY(my: number): number { return OY - my * S; }

function computeVertex(a: number, b: number, c: number) {
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;
  return { h, k };
}

function computeRoots(a: number, b: number, c: number) {
  const D = b * b - 4 * a * c;
  if (D < 0) return { D, roots: [] as number[] };
  const sqrtD = Math.sqrt(D);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);
  return { D, roots: [x1, x2].sort((a_, b_) => a_ - b_) };
}

function buildPath(a: number, b: number, c: number, xMin: number, xMax: number, step: number): string {
  let pts: string[] = [];
  for (let mx = xMin; mx <= xMax; mx += step) {
    const my = a * mx * mx + b * mx + c;
    pts.push(`${pts.length === 0 ? 'M' : 'L'}${svgX(mx).toFixed(1)},${svgY(my).toFixed(1)}`);
  }
  return pts.join('');
}

function computeViewRange(a: number, b: number, c: number): { xMin: number; xMax: number } {
  const { h } = computeVertex(a, b, c);
  // show a window around the vertex that captures the key features
  const spread = Math.max(6, Math.abs(h) + 4);
  return { xMin: h - spread, xMax: h + spread };
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export default function ParabolaCharacteristicsModule() {
  const [a, setA] = React.useState(1);
  const [b, setB] = React.useState(0);
  const [c, setC] = React.useState(-4);
  const isQuad = Math.abs(a) > 0.01;

  const { h, k } = isQuad ? computeVertex(a, b, c) : { h: 0, k: 0 };
  const { D, roots } = isQuad ? computeRoots(a, b, c) : { D: 0, roots: [] };

  const range = isQuad ? computeViewRange(a, b, c) : { xMin: -8, xMax: 8 };
  const xMin = clamp(range.xMin, -12, -2);
  const xMax = clamp(range.xMax, 2, 12);
  const pathD = isQuad ? buildPath(a, b, c, xMin, xMax, 0.15) : '';
  const yIntercept = c;

  const dirText = a > 0 ? 'Terbuka ke atas' : 'Terbuka ke bawah';
  const widthText = Math.abs(a) > 1.5 ? 'Sempit' : Math.abs(a) < 0.5 ? 'Lebar' : 'Sedang';
  const rootText = D < 0 ? 'Tidak ada akar real' : D === 0 ? `Satu akar kembar: x = ${fmt(roots[0])}` : `Dua akar real: x₁ = ${fmt(roots[0])}, x₂ = ${fmt(roots[1])}`;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Simulator Interaktif
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Karakteristik Grafik Parabola</h2>
        <p className="text-sm text-slate-500 mt-1">
          Ubah koefisien a, b, dan c untuk melihat bagaimana grafik f(x) = ax&sup2; + bx + c berubah.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex justify-center pt-4 px-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[600px] h-auto">
            {/* grid */}
            {Array.from({ length: 21 }, (_, i) => i - 10).filter(v => v !== 0).map(v => {
              const sx = svgX(v), sy = svgY(v);
              if (sx > 0 && sx < W) return <line key={`gx${v}`} x1={sx} y1={20} x2={sx} y2={H - 20} stroke="#f1f5f9" strokeWidth={1} />;
              if (sy > 0 && sy < H) return <line key={`gy${v}`} x1={20} y1={sy} x2={W - 20} y2={sy} stroke="#f1f5f9" strokeWidth={1} />;
              return null;
            })}

            {/* axes */}
            <line x1={20} y1={OY} x2={W - 20} y2={OY} stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
            <polygon points={`${W - 20},${OY} ${W - 28},${OY - 5} ${W - 28},${OY + 5}`} fill="#94a3b8" />
            <text x={W - 16} y={OY - 10} textAnchor="middle" fontSize={13} fill="#64748b" fontFamily="monospace" fontWeight={700}>x</text>

            <line x1={20} y1={OY} x2={20} y2={OY} stroke="#94a3b8" strokeWidth={2} />
            <line x1={OX} y1={30} x2={OX} y2={H - 20} stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
            <polygon points={`${OX},30 ${OX - 5},38 ${OX + 5},38`} fill="#94a3b8" />
            <text x={OX + 12} y={36} textAnchor="middle" fontSize={13} fill="#64748b" fontFamily="monospace" fontWeight={700}>y</text>

            {/* tick marks */}
            {[-10, -8, -6, -4, -2, 2, 4, 6, 8, 10].map(v => {
              const sx = svgX(v);
              if (sx > 20 && sx < W - 20) return (
                <g key={`tx${v}`}>
                  <line x1={sx} y1={OY - 4} x2={sx} y2={OY + 4} stroke="#94a3b8" strokeWidth={1.5} />
                  <text x={sx} y={OY + 18} textAnchor="middle" fontSize={10} fill="#94a3b8" fontFamily="monospace">{v}</text>
                </g>
              );
              return null;
            })}
            {[-4, 4, 8, 12].map(v => {
              const sy = svgY(v);
              if (sy > 20 && sy < H - 20) return (
                <g key={`ty${v}`}>
                  <line x1={OX - 4} y1={sy} x2={OX + 4} y2={sy} stroke="#94a3b8" strokeWidth={1.5} />
                  <text x={OX - 10} y={sy + 4} textAnchor="end" fontSize={10} fill="#94a3b8" fontFamily="monospace">{v}</text>
                </g>
              );
              return null;
            })}

            <text x={OX + 10} y={OY - 6} textAnchor="start" fontSize={10} fill="#94a3b8" fontFamily="monospace">0</text>

            {/* axis of symmetry */}
            {isQuad && (
              <line
                x1={svgX(h)} y1={30} x2={svgX(h)} y2={H - 20}
                stroke="#a5b4fc" strokeWidth={2} strokeDasharray="6,4" strokeLinecap="round"
                opacity={0.7}
              />
            )}

            {/* parabola */}
            {isQuad && (
              <path
                d={pathD}
                fill="none"
                stroke="#6366f1"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'd 0.35s ease' }}
              />
            )}

            {!isQuad && (
              <text x={OX} y={OY - 60} textAnchor="middle" fontSize={14} fill="#ef4444" fontFamily="monospace" fontWeight={700}>
                a tidak boleh 0
              </text>
            )}

            {/* vertex */}
            {isQuad && (
              <>
                <circle cx={svgX(h)} cy={svgY(k)} r={6} fill="#8b5cf6" stroke="#fff" strokeWidth={2} />
                <text x={svgX(h) + (h > 0 ? 10 : -60)} y={svgY(k) - 8} fontSize={11} fill="#8b5cf6" fontFamily="monospace" fontWeight={700}>
                  ({fmt(h)}, {fmt(k)})
                </text>
              </>
            )}

            {/* y-intercept */}
            <circle cx={svgX(0)} cy={svgY(yIntercept)} r={5} fill="#10b981" stroke="#fff" strokeWidth={2} />
            <text x={svgX(0) + 10} y={svgY(yIntercept) - 6} fontSize={11} fill="#10b981" fontFamily="monospace" fontWeight={700}>
              (0, {fmt(yIntercept)})
            </text>

            {/* roots */}
            {isQuad && roots.map((rx, i) => {
              if (Math.abs(rx) > 15) return null;
              return (
                <g key={i}>
                  <circle cx={svgX(rx)} cy={svgY(0)} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                  <text x={svgX(rx) + (rx > 0 ? 8 : -60)} y={svgY(0) - 8} fontSize={11} fill="#ef4444" fontFamily="monospace" fontWeight={700}>
                    ({fmt(rx)}, 0)
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* sliders */}
        <div className="px-6 py-4 bg-slate-50 border-y border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
            {(['a', 'b', 'c'] as const).map((coef) => {
              const val = coef === 'a' ? a : coef === 'b' ? b : c;
              const setVal = coef === 'a' ? setA : coef === 'b' ? setB : setC;
              const min = coef === 'a' ? -3 : -10;
              const max = coef === 'a' ? 3 : 10;
              const step = coef === 'a' ? 0.1 : 0.5;
              const color = coef === 'a' ? '#6366f1' : coef === 'b' ? '#059669' : '#d97706';
              return (
                <div key={coef} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="font-mono font-bold text-sm" style={{ color }}>{coef}</span>
                    <span className="font-mono text-lg font-bold text-slate-700">{fmt(val)}</span>
                  </div>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={val}
                    onChange={(e) => setVal(parseFloat(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    style={{ accentColor: color }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* characteristics */}
        {isQuad && (
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 text-center">
              Analisis Grafik
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                <p className="text-[10px] font-semibold uppercase text-indigo-400 mb-0.5">Bentuk Grafik</p>
                <p className="text-sm font-semibold text-slate-700">
                  a = {fmt(a)} &rarr; {dirText} ({widthText})
                </p>
              </div>
              <div className="bg-violet-50 rounded-xl p-3 border border-violet-100">
                <p className="text-[10px] font-semibold uppercase text-violet-400 mb-0.5">Titik Puncak</p>
                <p className="text-sm font-semibold text-slate-700">
                  x<sub>p</sub> = {fmt(h)}, y<sub>p</sub> = {fmt(k)}
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                <p className="text-[10px] font-semibold uppercase text-blue-400 mb-0.5">Sumbu Simetri</p>
                <p className="text-sm font-semibold text-slate-700">x = {fmt(h)}</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                <p className="text-[10px] font-semibold uppercase text-emerald-400 mb-0.5">Titik Potong Y</p>
                <p className="text-sm font-semibold text-slate-700">(0, {fmt(yIntercept)})</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3 border border-red-100">
                <p className="text-[10px] font-semibold uppercase text-red-400 mb-0.5">Diskriminan</p>
                <p className="text-sm font-semibold text-slate-700">D = {fmt(D)}</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-100">
                <p className="text-[10px] font-semibold uppercase text-amber-400 mb-0.5">Akar-akar</p>
                <p className="text-sm font-semibold text-slate-700">{rootText}</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-xs text-slate-400 font-mono">
                f(x) = {fmt(a)}x&sup2; {b >= 0 ? '+' : ''}{fmt(b)}x {c >= 0 ? '+' : ''}{fmt(c)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}