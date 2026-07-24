'use client';

import React from 'react';

type D = 'positif' | 'nol' | 'negatif';

const LABELS: Record<D, string> = {
  positif: 'D > 0 (Positif)',
  nol: 'D = 0 (Nol)',
  negatif: 'D < 0 (Negatif)',
};

const DESCRIPTIONS: Record<D, string> = {
  positif: 'Grafik memotong Sumbu X di DUA titik berbeda. Ini berarti persamaan kuadrat memiliki DUA akar real yang berbeda.',
  nol: 'Grafik menyinggung Sumbu X di SATU titik. Ini berarti persamaan kuadrat memiliki DUA akar real yang kembar (sama).',
  negatif: 'Grafik tidak menyentuh Sumbu X. Ini berarti persamaan kuadrat TIDAK memiliki akar real (akar imajiner/khayal).',
};

const FORMULAS: Record<D, { func: string; Dval: string; roots: string }> = {
  positif: { func: 'f(x) = 0,5x\u00B2 \u2212 3', Dval: 'D = 0\u00B2 \u2212 4(0,5)(\u22123) = 6', roots: 'x = \u00B1\u221A6 \u2248 \u00B12,45' },
  nol: { func: 'f(x) = 0,5x\u00B2', Dval: 'D = 0\u00B2 \u2212 4(0,5)(0) = 0', roots: 'x = 0 (kembar)' },
  negatif: { func: 'f(x) = 0,5x\u00B2 + 3', Dval: 'D = 0\u00B2 \u2212 4(0,5)(3) = \u22126', roots: 'Tidak ada akar real' },
};

const ORDER: D[] = ['positif', 'nol', 'negatif'];

const W = 520, H = 480;
const OX = 260, OY = 360;
const SCALE = 30;
const A = 0.5;
const TRANSLATION: Record<D, number> = { positif: 3 * SCALE, nol: 0, negatif: -3 * SCALE };

function mathToSVG(mx: number, my: number): [number, number] {
  return [OX + mx * SCALE, OY - my * SCALE];
}

function buildPath(translateY: number): string {
  const pts: string[] = [];
  for (let mx = -3.5; mx <= 3.5; mx += 0.1) {
    const my = A * mx * mx;
    const [sx, sy] = mathToSVG(mx, my);
    pts.push(`${mx === -3.5 ? 'M' : 'L'}${sx.toFixed(1)},${(sy + translateY).toFixed(1)}`);
  }
  return pts.join('');
}

export default function DiscriminantModule() {
  const [kondisiD, setKondisiD] = React.useState<D>('positif');
  const translateY = TRANSLATION[kondisiD];
  const pathD = buildPath(translateY);

  const rootPoints: [number, number][] = [];
  if (kondisiD === 'positif') {
    const rx = Math.sqrt(3 / A);
    rootPoints.push(mathToSVG(rx, 0));
    rootPoints.push(mathToSVG(-rx, 0));
  } else if (kondisiD === 'nol') {
    rootPoints.push(mathToSVG(0, 0));
  }

  const vertexMy = 0;
  const [vx, vy] = mathToSVG(0, vertexMy);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Animasi Materi
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Diskriminan dan Jenis Akar</h2>
        <p className="text-sm text-slate-500 mt-1">
            Nilai D = b&sup2; &minus; 4ac menentukan jumlah akar persamaan kuadrat.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2 justify-center">
          {ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setKondisiD(k)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                kondisiD === k
                  ? 'bg-indigo-600 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {LABELS[k]}
            </button>
          ))}
        </div>

        <div className="flex justify-center py-4 px-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[520px] h-auto">
            <line x1={20} y1={OY} x2={W - 20} y2={OY} stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
            <polygon points={`${W - 20},${OY} ${W - 28},${OY - 5} ${W - 28},${OY + 5}`} fill="#94a3b8" />
            <text x={W - 24} y={OY - 10} textAnchor="middle" fontSize={13} fill="#64748b" fontFamily="monospace" fontWeight={700}>x</text>

            <line x1={OX} y1={30} x2={OX} y2={H - 20} stroke="#94a3b8" strokeWidth={2} strokeLinecap="round" />
            <polygon points={`${OX},30 ${OX - 5},38 ${OX + 5},38`} fill="#94a3b8" />
            <text x={OX + 12} y={36} textAnchor="middle" fontSize={13} fill="#64748b" fontFamily="monospace" fontWeight={700}>y</text>

            {[-3, -2, -1, 1, 2, 3].map((v) => {
              const [sx] = mathToSVG(v, 0);
              return (
                <g key={v}>
                  <line x1={sx} y1={OY - 4} x2={sx} y2={OY + 4} stroke="#94a3b8" strokeWidth={1.5} />
                  <text x={sx} y={OY + 18} textAnchor="middle" fontSize={11} fill="#94a3b8" fontFamily="monospace">{v}</text>
                </g>
              );
            })}
            {[1, 2, 3, 4, 5].map((v) => {
              const [, sy] = mathToSVG(0, v);
              return (
                <g key={v}>
                  <line x1={OX - 4} y1={sy} x2={OX + 4} y2={sy} stroke="#94a3b8" strokeWidth={1.5} />
                  <text x={OX - 10} y={sy + 4} textAnchor="end" fontSize={11} fill="#94a3b8" fontFamily="monospace">{v}</text>
                </g>
              );
            })}

            <text x={OX + 10} y={OY - 8} textAnchor="start" fontSize={11} fill="#94a3b8" fontFamily="monospace">0</text>

            <path
              d={pathD}
              fill="none"
              stroke="#6366f1"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'd 0.6s ease' }}
            />

            {kondisiD !== 'negatif' && (
              <>
                <circle cx={vx} cy={vy + translateY} r={5} fill="#6366f1" stroke="#fff" strokeWidth={2} />
                <text x={vx + 10} y={vy + translateY - 2} fontSize={11} fill="#6366f1" fontFamily="monospace" fontWeight={700}>
                  ({kondisiD === 'positif' ? '0, -3' : kondisiD === 'nol' ? '0, 0' : ''})
                </text>
              </>
            )}

            {rootPoints.map(([rx, ry], i) => (
              <g key={i}>
                <circle cx={rx} cy={ry} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                {kondisiD === 'positif' && (
                  <text x={rx + (i === 0 ? -30 : 10)} y={ry + 18} fontSize={11} fill="#ef4444" fontFamily="monospace" fontWeight={700}>
                    ({i === 0 ? `\u2212\u221A6, 0` : `\u221A6, 0`})
                  </text>
                )}
                {kondisiD === 'nol' && (
                  <text x={rx + 10} y={ry + 18} fontSize={11} fill="#ef4444" fontFamily="monospace" fontWeight={700}>
                    (0, 0) Kembar
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="mx-4 mb-4 rounded-xl border-2 border-indigo-200 bg-indigo-50 p-5 transition-all duration-500">
          <div className="text-center">
            <p className="font-mono text-sm font-bold text-indigo-700 mb-1">{FORMULAS[kondisiD].func}</p>
            <p className="font-mono text-sm text-indigo-600 mb-3">{FORMULAS[kondisiD].Dval}</p>
            <div className="h-px bg-indigo-200 mx-8 mb-3" />
            <p className="text-sm text-slate-700 leading-relaxed">{DESCRIPTIONS[kondisiD]}</p>
            <p className="font-mono text-sm font-semibold text-slate-800 mt-2">{FORMULAS[kondisiD].roots}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2 pb-4">
          {ORDER.map((k, i) => (
            <button
              key={k}
              onClick={() => setKondisiD(k)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                k === kondisiD ? 'bg-indigo-600 scale-125' : 'bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}