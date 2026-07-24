'use client';

import React from 'react';

const TILE = 72;
const GAP = 2;

const STEPS = [
  {
    label: 'Bangun Utuh',
    text: 'Luas Persegi Panjang = Panjang × Lebar',
    formula: '(x + 3)(x + 2)',
    focus: null,
  },
  {
    label: 'Membedah x\u00B2',
    text: 'Pertama, kalikan x dengan x menghasilkan x\u00B2.',
    formula: 'x\u00B2 + \u2026',
    focus: 'x2',
  },
  {
    label: 'Membedah Suku x',
    text: 'Kalikan x dengan 2, dan x dengan 3. Jumlahkan keduanya.',
    formula: 'x\u00B2 + 2x + 3x + \u2026',
    focus: 'x',
  },
  {
    label: 'Menyederhanakan Suku x',
    text: 'Gabungkan suku yang sejenis (2x + 3x).',
    formula: 'x\u00B2 + 5x + \u2026',
    focus: 'x',
  },
  {
    label: 'Konstanta & Hasil Akhir',
    text: 'Terakhir, kalikan 3 dengan 2 menghasilkan 6.',
    formula: 'x\u00B2 + 5x + 6',
    focus: 'unit',
  },
];

type TileType = 'x2' | 'x' | 'unit';
interface Tile {
  type: TileType;
  row: number;
  col: number;
}

function buildTiles(p: number, q: number): Tile[] {
  const tiles: Tile[] = [];
  const cols = 1 + p;
  const rows = 1 + q;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 && c === 0) tiles.push({ type: 'x2', row: r, col: c });
      else if (r === 0) tiles.push({ type: 'x', row: r, col: c });
      else if (c === 0) tiles.push({ type: 'x', row: r, col: c });
      else tiles.push({ type: 'unit', row: r, col: c });
    }
  }
  return tiles;
}

const p = 2;
const q = 3;
const tiles = buildTiles(p, q);
const cols = 1 + p;
const rows = 1 + q;

export default function FactoringAnimationModule() {
  const [step, setStep] = React.useState(0);

  const current = STEPS[step];
  const total = STEPS.length;

  const tileColors: Record<TileType, string> = {
    x2: 'bg-blue-500',
    x: 'bg-green-500',
    unit: 'bg-yellow-400',
  };

  const tileLabels: Record<TileType, string> = {
    x2: 'x\u00B2',
    x: 'x',
    unit: '1',
  };

  function isFocused(type: TileType): boolean {
    if (current.focus === null) return true;
    if (current.focus === 'x2') return type === 'x2';
    if (current.focus === 'x') return type === 'x';
    if (current.focus === 'unit') return type === 'unit';
    return true;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-2">
          Animasi Materi
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Konsep Pemfaktoran Kuadrat</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Bedah bangun ubin aljabar langkah demi langkah untuk memahami (x+p)(x+q).
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            {tiles.map(t => t.type).filter((v,i,a) => a.indexOf(v)===i).map(type => (
              <span key={type} className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded ${tileColors[type]}`} />
                {tileLabels[type]}
              </span>
            ))}
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Langkah {step + 1} / {total}
          </div>
        </div>

        <div className="flex justify-center py-6 overflow-x-auto">
          <div
            className="grid gap-[2px] transition-all duration-500"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${TILE}px)`,
              gridTemplateRows: `repeat(${rows}, ${TILE}px)`,
            }}
          >
            {tiles.map((tile, i) => {
              const focused = isFocused(tile.type);
              return (
                <div
                  key={i}
                  className={`flex items-center justify-center font-mono text-sm font-bold text-white rounded-md transition-all duration-500 ${
                    tileColors[tile.type]
                  } ${focused ? 'scale-100 opacity-100 shadow-md' : 'scale-[0.85] opacity-30'}`}
                  style={{
                    gridRow: tile.row + 1,
                    gridColumn: tile.col + 1,
                    width: TILE,
                    height: TILE,
                  }}
                >
                  {tileLabels[tile.type]}
                </div>
              );
            })}
          </div>
        </div>

        <div className={`text-center transition-all duration-500 min-h-[160px] ${
          step === 0 ? 'bg-purple-50 border-purple-200' :
          step === total - 1 ? 'bg-green-50 border-green-300' :
          'bg-indigo-50 border-indigo-200'
        } rounded-xl border-2 p-5`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {current.label}
          </p>
          <p className="text-sm text-slate-700 mb-3">
            {current.text}
          </p>
          <div className="font-mono text-lg font-bold text-slate-800 bg-white rounded-lg px-4 py-2 inline-block shadow-sm border border-slate-100">
            {current.formula}
          </div>

          {step === total - 1 && (
            <div className="mt-4 text-sm font-mono text-green-700 font-bold bg-green-100 rounded-lg px-4 py-2 inline-block">
              (x + 3)(x + 2) = x&sup2; + 5x + 6
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              step === 0
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            Langkah Sebelumnya
          </button>

          <div className="flex gap-1.5">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? 'bg-indigo-600 scale-125'
                    : i < step
                      ? 'bg-emerald-400'
                      : 'bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep(Math.min(total - 1, step + 1))}
            disabled={step === total - 1}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              step === total - 1
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Langkah Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}