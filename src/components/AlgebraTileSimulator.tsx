'use client';

import React from 'react';

type TileType = 'x2' | 'x' | 'unit';

const TILE_STYLES: Record<TileType, string> = {
  x2: 'bg-blue-500 text-white',
  x: 'bg-green-500 text-white',
  unit: 'bg-yellow-400 text-yellow-800',
};

const TILE_LABELS: Record<TileType, string> = {
  x2: 'x\u00B2',
  x: 'x',
  unit: '1',
};

const EXPRESSIONS = [
  { p: 2, q: 3, label: 'x\u00B2 + 5x + 6' },
  { p: 1, q: 4, label: 'x\u00B2 + 5x + 4' },
  { p: 2, q: 2, label: 'x\u00B2 + 4x + 4' },
  { p: 3, q: 4, label: 'x\u00B2 + 7x + 12' },
  { p: 1, q: 2, label: 'x\u00B2 + 3x + 2' },
  { p: 3, q: 5, label: 'x\u00B2 + 8x + 15' },
  { p: 4, q: 4, label: 'x\u00B2 + 8x + 16' },
  { p: 1, q: 5, label: 'x\u00B2 + 6x + 5' },
  { p: 2, q: 5, label: 'x\u00B2 + 7x + 10' },
  { p: 3, q: 2, label: 'x\u00B2 + 5x + 6' },
];

export default function AlgebraTileSimulator() {
  const [exprIdx, setExprIdx] = React.useState(0);
  const expr = EXPRESSIONS[exprIdx];
  const [p, setP] = React.useState(expr.p);
  const [q, setQ] = React.useState(expr.q);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setP(expr.p);
    setQ(expr.q);
    setChecked(false);
  }, [exprIdx]);

  const rows = p + 1;
  const cols = q + 1;

  const correct = p === expr.p && q === expr.q;
  const swapped = p === expr.q && q === expr.p;

  function getTile(r: number, c: number): TileType | null {
    if (r === 0 && c === 0) return 'x2';
    if (r === 0 && c > 0 && c <= q) return 'x';
    if (c === 0 && r > 0 && r <= p) return 'x';
    if (r > 0 && c > 0 && r <= p && c <= q) return 'unit';
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Simulator Interaktif
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Simulator Ubin Aljabar</h2>
        <p className="text-sm text-slate-500 mt-1">
          Susun ubin aljabar untuk membentuk persegi panjang dan temukan pemfaktoran persamaan kuadrat.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block" /> x&sup2;</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> x</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> 1</span>
          </div>
          <div className="text-xs text-slate-400">
            Soal {exprIdx + 1} / {EXPRESSIONS.length}
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Bentuk persamaan kuadrat:</p>
          <div className="text-xl font-bold font-mono text-indigo-700">{expr.label}</div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-6">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Ubin x vertikal</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setP(Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors"
              >
                &minus;
              </button>
              <span className="text-lg font-bold font-mono text-slate-700 min-w-[1.5ch] text-center">{p}</span>
              <button
                onClick={() => setP(Math.min(5, p + 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">(x + {p})</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Ubin x horizontal</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQ(Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors"
              >
                &minus;
              </button>
              <span className="text-lg font-bold font-mono text-slate-700 min-w-[1.5ch] text-center">{q}</span>
              <button
                onClick={() => setQ(Math.min(5, q + 1))}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">(x + {q})</p>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div
              className="grid gap-px bg-slate-200 rounded-lg overflow-hidden"
              style={{ gridTemplateColumns: `repeat(${cols}, 64px)`, gridTemplateRows: `repeat(${rows}, 64px)` }}
            >
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((_, c) => {
                  const tile = getTile(r, c);
                  if (!tile) return <div key={`${r}-${c}`} className="bg-slate-50" />;
                  return (
                    <div
                      key={`${r}-${c}`}
                      className={`${TILE_STYLES[tile]} flex items-center justify-center font-mono font-bold text-sm shadow-sm transition-all duration-300`}
                    >
                      {TILE_LABELS[tile]}
                    </div>
                  );
                })
              )}
            </div>

            <div className="absolute -left-12 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-slate-600">
              x + {p}
            </div>
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-sm font-bold text-slate-600">
              x + {q}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Kamu susun:</p>
          <div className="font-mono text-lg font-bold text-indigo-600">
            (x + {p})(x + {q}) = x&sup2; + {p + q}x + {p * q}
          </div>
        </div>

        {!checked ? (
          <div className="flex justify-center">
            <button
              onClick={() => setChecked(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-md"
            >
              Cek Jawaban
            </button>
          </div>
        ) : (
          <div className={`text-center p-4 rounded-xl border-2 transition-all ${
            correct
              ? 'bg-emerald-50 border-emerald-300'
              : swapped
                ? 'bg-amber-50 border-amber-300'
                : 'bg-red-50 border-red-300'
          }`}>
            <p className={`font-bold text-lg mb-1 ${
              correct ? 'text-emerald-700' : swapped ? 'text-amber-700' : 'text-red-700'
            }`}>
              {correct ? '\u2714\uFE0F Benar!' : swapped ? '\uD83D\uDD04 Terbalik! Coba (x + ' + q + ')(x + ' + p + ')' : '\u274C Belum tepat'}
            </p>
            {!correct && !swapped && (
              <p className="text-xs text-slate-500 mt-1">
                Susunan ubin harus membentuk persegi panjang {expr.p + 1} &times; {expr.q + 1}.
                Coba atur jumlah ubin x vertikal dan horizontal.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setExprIdx(Math.max(0, exprIdx - 1))}
            disabled={exprIdx === 0}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>
          <button
            onClick={() => setExprIdx((exprIdx + 1) % EXPRESSIONS.length)}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
          >
            Soal Berikutnya
          </button>
        </div>
      </div>
    </div>
  );
}