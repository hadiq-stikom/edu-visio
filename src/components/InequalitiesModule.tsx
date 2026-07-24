'use client';

import React from 'react';

const PADDING = 40;
const SIZE = 500;
const PLOT_SIZE = SIZE - 2 * PADDING;
const DOMAIN = 15;

function toSvgX(x: number): number {
  return PADDING + (x / DOMAIN) * PLOT_SIZE;
}

function toSvgY(y: number): number {
  return SIZE - PADDING - (y / DOMAIN) * PLOT_SIZE;
}

function checkInside(x: number, y: number, tanda1: string, tanda2: string): boolean {
  const c1 = tanda1 === '<=' ? x + y <= 10 : x + y >= 10;
  const c2 = tanda2 === '<=' ? 2 * x + y <= 15 : 2 * x + y >= 15;
  return c1 && c2 && x >= 0 && y >= 0 && x <= DOMAIN && y <= DOMAIN;
}

function GridLines() {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i <= DOMAIN; i++) {
    const gx = toSvgX(i);
    const gy = toSvgY(i);
    lines.push(
      <line
        key={`vg${i}`}
        x1={gx} y1={toSvgY(0)}
        x2={gx} y2={toSvgY(DOMAIN)}
        stroke="#e2e8f0" strokeWidth={i % 5 === 0 ? 1 : 0.5}
      />,
      <line
        key={`hg${i}`}
        x1={toSvgX(0)} y1={gy}
        x2={toSvgX(DOMAIN)} y2={gy}
        stroke="#e2e8f0" strokeWidth={i % 5 === 0 ? 1 : 0.5}
      />,
    );
  }
  return <>{lines}</>;
}

function AxisLabels() {
  const labels: React.ReactNode[] = [];
  for (let i = 0; i <= DOMAIN; i += 5) {
    labels.push(
      <text key={`xl${i}`} x={toSvgX(i)} y={SIZE - PADDING + 16}
        textAnchor="middle" className="fill-slate-400 text-[10px] font-mono">
        {i}
      </text>,
      <text key={`yl${i}`} x={PADDING - 14} y={toSvgY(i) + 3.5}
        textAnchor="end" className="fill-slate-400 text-[10px] font-mono">
        {i}
      </text>,
    );
  }
  return <>{labels}</>;
}

export default function InequalitiesModule() {
  const [tanda1, setTanda1] = React.useState('<=');
  const [tanda2, setTanda2] = React.useState('<=');
  const [testX, setTestX] = React.useState(5);
  const [testY, setTestY] = React.useState(4);

  const tanda = (v: string) => v as '<=' | '>=';

  const ptsShade1 = tanda(tanda1) === '<=' ? [[0, 0], [10, 0], [0, 10]] : [[10, 0], [15, 0], [15, 15], [0, 15], [0, 10]];
  const ptsShade2 = tanda(tanda2) === '<=' ? [[0, 0], [7.5, 0], [0, 15]] : [[7.5, 0], [15, 0], [15, 15], [0, 15]];

  const inDHP = checkInside(testX, testY, tanda(tanda1), tanda(tanda2));

  const conclusion = () => {
    const d1 = tanda(tanda1) === '<=' ? 'di dekat (0,0)' : 'menjauhi (0,0)';
    const d2 = tanda(tanda2) === '<=' ? 'di dekat (0,0)' : 'menjauhi (0,0)';
    return `Karena tanda pertidaksamaan pertama adalah "${tanda(tanda1)}" (arsir ${d1}) dan tanda kedua adalah "${tanda(tanda2)}" (arsir ${d2}), maka DHP adalah irisan dari kedua daerah tersebut.`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Eksplorasi 4.3
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Daerah Himpunan Penyelesaian (DHP)
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Visualisasikan bagaimana tanda pertidaksamaan memengaruhi arsiran dan temukan irisan daerah penyelesaian.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Garis 1: <span className="text-blue-600">x + y = 10</span>
            </label>
            <select
              value={tanda1}
              onChange={(e) => setTanda1(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
            >
              <option value="<=">{'<='}</option>
              <option value=">=">{'>='}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Garis 2: <span className="text-red-600">2x + y = 15</span>
            </label>
            <select
              value={tanda2}
              onChange={(e) => setTanda2(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500"
            >
              <option value="<=">{'<='}</option>
              <option value=">=">{'>='}</option>
            </select>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Titik Uji
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-slate-400">x</label>
                <input
                  type="number"
                  min={0}
                  max={DOMAIN}
                  step={0.5}
                  value={testX}
                  onChange={(e) => setTestX(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
              <div className="flex-1">
                <label className="text-[10px] text-slate-400">y</label>
                <input
                  type="number"
                  min={0}
                  max={DOMAIN}
                  step={0.5}
                  value={testY}
                  onChange={(e) => setTestY(Number(e.target.value))}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                />
              </div>
            </div>
            <div
              className={`mt-2 text-xs font-semibold text-center py-1.5 rounded-lg ${
                inDHP
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              ({testX}, {testY}) — {inDHP ? 'Termasuk DHP' : 'Di luar DHP'}
            </div>
          </div>
        </div>

        <div className="flex-1 w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-auto max-w-[550px] mx-auto">
            <rect x={0} y={0} width={SIZE} height={SIZE} fill="#f8fafc" rx={8} />

            <GridLines />

            <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(DOMAIN)} y2={toSvgY(0)}
              stroke="#475569" strokeWidth={1.5} />
            <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(0)} y2={toSvgY(DOMAIN)}
              stroke="#475569" strokeWidth={1.5} />

            <text x={toSvgX(DOMAIN) + 8} y={toSvgY(0) + 4}
              className="fill-slate-500 text-[11px] font-bold font-mono">x</text>
            <text x={toSvgX(0) - 10} y={toSvgY(DOMAIN) - 6}
              className="fill-slate-500 text-[11px] font-bold font-mono">y</text>

            <AxisLabels />

            <polygon points={ptsShade1.map(p => `${toSvgX(p[0])},${toSvgY(p[1])}`).join(' ')}
              className="fill-blue-500/20" />

            <polygon points={ptsShade2.map(p => `${toSvgX(p[0])},${toSvgY(p[1])}`).join(' ')}
              className="fill-red-500/20" />

            <line x1={toSvgX(0)} y1={toSvgY(10)} x2={toSvgX(10)} y2={toSvgY(0)}
              stroke="#3b82f6" strokeWidth={2.5} strokeLinecap="round" />

            <line x1={toSvgX(0)} y1={toSvgY(15)} x2={toSvgX(7.5)} y2={toSvgY(0)}
              stroke="#ef4444" strokeWidth={2.5} strokeLinecap="round" />

            <circle cx={toSvgX(testX)} cy={toSvgY(testY)} r={6}
              fill={inDHP ? '#10b981' : '#ef4444'}
              stroke="white" strokeWidth={2}
              className="drop-shadow-sm" />

            <text x={toSvgX(testX) + 10} y={toSvgY(testY) + 4}
              className={`text-[10px] font-bold font-mono ${inDHP ? 'fill-emerald-600' : 'fill-red-500'}`}>
              ({testX},{testY})
            </text>

            <text x={toSvgX(3)} y={toSvgY(12)}
              className="fill-blue-600 text-[11px] font-semibold font-mono"
              transform={`rotate(-45, ${toSvgX(3)}, ${toSvgY(12)})`}>
              x + y = 10
            </text>

            <text x={toSvgX(1)} y={toSvgY(17)}
              className="fill-red-600 text-[11px] font-semibold font-mono"
              transform={`rotate(-63.4, ${toSvgX(1)}, ${toSvgY(17)})`}>
              2x + y = 15
            </text>
          </svg>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50/60 rounded-xl p-4 space-y-1">
            <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider">
              Garis 1
            </h4>
            <p className="font-mono text-sm">
              x + y <span className="text-blue-600 font-bold">{tanda(tanda1)}</span> 10
            </p>
            <p className="text-xs text-slate-500">
              Titik potong sumbu: (0, 10) dan (10, 0)
            </p>
          </div>
          <div className="bg-red-50/60 rounded-xl p-4 space-y-1">
            <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">
              Garis 2
            </h4>
            <p className="font-mono text-sm">
              2x + y <span className="text-red-600 font-bold">{tanda(tanda2)}</span> 15
            </p>
            <p className="text-xs text-slate-500">
              Titik potong sumbu: (0, 15) dan (7.5, 0)
            </p>
          </div>
        </div>

        <div className="bg-indigo-50/60 rounded-xl p-4 mt-4">
          <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-1">
            Kesimpulan
          </h4>
          <p className="text-sm text-slate-700">{conclusion()}</p>
          <p className="text-sm text-slate-600 mt-2 font-mono">
            DHP: {'{'}(x,y) | x + y {tanda(tanda1)} 10, 2x + y {tanda(tanda2)} 15, x {'>='} 0, y {'>='} 0{'}'}
          </p>
        </div>
      </div>
    </div>
  );
}