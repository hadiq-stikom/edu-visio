'use client';

import React from 'react';

function generateTargets() {
  const pairs = [
    [2, 3], [3, 4], [2, 5], [4, 3], [1, 6],
    [-2, 3], [2, -3], [-2, -3], [-3, -4], [3, -5],
    [4, 2], [5, 2], [3, 3], [2, 4], [1, 5],
  ];
  const [p, q] = pairs[Math.floor(Math.random() * pairs.length)];
  return { targetB: p + q, targetC: p * q, targetP: p, targetQ: q };
}

function signClass(val: number, posClass: string, negClass: string): string {
  return val > 0 ? posClass : val < 0 ? negClass : 'bg-slate-200';
}

function signLabel(val: number): string {
  return val > 0 ? '+' : val < 0 ? '-' : '';
}

export default function QuadraticFactoringModule() {
  const [{ targetB, targetC, targetP, targetQ }, setTargets] = React.useState(() => generateTargets());
  const [tebakanP, setTebakanP] = React.useState(0);
  const [tebakanQ, setTebakanQ] = React.useState(0);

  const currentB = tebakanP + tebakanQ;
  const currentC = tebakanP * tebakanQ;
  const sukses = currentB === targetB && currentC === targetC;

  const cols = 1 + Math.abs(tebakanP);
  const rows = 1 + Math.abs(tebakanQ);

  const unitSign = tebakanP * tebakanQ;

  function newProblem() {
    const t = generateTargets();
    setTargets(t);
    setTebakanP(0);
    setTebakanQ(0);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold mb-2">
          Discovery Learning
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Simulator Ubin Aljabar
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Susun ubin aljabar untuk membentuk persegi panjang dan temukan pemfaktoran persamaan kuadrat.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-6 text-center">
        <p className="text-sm text-slate-600">
          Bentuklah persegi panjang untuk persamaan:
        </p>
        <p className="font-mono text-lg font-bold text-slate-800 mt-1">
          x<sup>2</sup> + {targetB}x + {targetC} = 0
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
          Atur Nilai p dan q
            </h3>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                p (lebar tambahan)
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => setTebakanP(v => v - 1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors">
                  &minus;
                </button>
                <div className={`flex-1 text-center font-mono text-lg font-bold py-1.5 rounded-lg border-2 ${
                  tebakanP === targetP ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}>
                  {tebakanP}
                </div>
                <button onClick={() => setTebakanP(v => v + 1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors">
                  +
                </button>
              </div>
              {tebakanP === targetP && <p className="text-[10px] text-green-600 mt-1 font-medium">p tepat!</p>}
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-2">
                q (panjang tambahan)
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => setTebakanQ(v => v - 1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors">
                  &minus;
                </button>
                <div className={`flex-1 text-center font-mono text-lg font-bold py-1.5 rounded-lg border-2 ${
                  tebakanQ === targetQ ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}>
                  {tebakanQ}
                </div>
                <button onClick={() => setTebakanQ(v => v + 1)}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-lg flex items-center justify-center transition-colors">
                  +
                </button>
              </div>
              {tebakanQ === targetQ && <p className="text-[10px] text-green-600 mt-1 font-medium">q tepat!</p>}
            </div>

            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-500 mb-1">Ubin di kanvas:</p>
              <p className="font-mono text-sm text-slate-700">
                x<sup>2</sup> + {currentB}x + {currentC}
              </p>
              <div className="flex gap-1 mt-2 text-[10px] font-mono text-slate-400">
                <span>b = p + q = {tebakanP} + {tebakanQ} = {currentB}</span>
                <span className="text-slate-300">|</span>
                <span>c = p &times; q = {tebakanP} &times; {tebakanQ} = {currentC}</span>
              </div>
            </div>

            <button onClick={newProblem}
              className="mt-4 w-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              Soal Baru
            </button>
          </div>
        </div>

        <div className="flex-1">
          <div className={`bg-white rounded-2xl p-6 border-2 shadow-sm transition-all duration-700 ${
            sukses ? 'border-green-400 shadow-lg shadow-green-200/50' : 'border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-700">Kanvas Ubin Aljabar</h3>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block" /> x<sup>2</sup></span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> x (+)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-400 inline-block" /> x (&minus;)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> 1 (+)</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500 inline-block" /> 1 (&minus;)</span>
              </div>
            </div>

            <div className="flex justify-center overflow-x-auto py-4">
              {tebakanP === 0 && tebakanQ === 0 ? (
                <div className="text-sm text-slate-400 py-10 text-center">
                  Atur nilai p dan q untuk mulai menyusun ubin
                </div>
              ) : (
                <div
                  key={`${tebakanP}-${tebakanQ}`}
                  className="grid gap-px bg-slate-200 border border-slate-300 rounded-lg overflow-hidden animate-[fadeIn_0.3s_ease-out]"
                  style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
                    width: `${cols * 72}px`,
                  }}
                >
                  {Array.from({ length: rows }, (_, row) =>
                    Array.from({ length: cols }, (_, col) => {
                      const isX2 = row === 0 && col === 0;
                      const isHorizontalX = row === 0 && col > 0;
                      const isVerticalX = row > 0 && col === 0;
                      const isUnit = row > 0 && col > 0;

                      let tileClass = '';
                      let tileLabel = '';

                      if (isX2) {
                        tileClass = 'bg-blue-500 text-white';
                        tileLabel = 'x\u00B2';
                      } else if (isHorizontalX) {
                        tileClass = signClass(tebakanP, 'bg-green-500 text-white', 'bg-red-400 text-white');
                        tileLabel = `${signLabel(tebakanP)}x`;
                      } else if (isVerticalX) {
                        tileClass = signClass(tebakanQ, 'bg-green-500 text-white', 'bg-red-400 text-white');
                        tileLabel = `${signLabel(tebakanQ)}x`;
                      } else if (isUnit) {
                        tileClass = signClass(unitSign, 'bg-yellow-400 text-yellow-800', 'bg-orange-500 text-white');
                        tileLabel = `${signLabel(unitSign)}1`;
                      }

                      return (
                        <div
                          key={`${row}-${col}`}
                          className={`w-[70px] h-[70px] flex items-center justify-center font-mono text-sm font-bold transition-all duration-200 ${tileClass}`}
                          style={{
                            gridRow: row + 1,
                            gridColumn: col + 1,
                          }}
                        >
                          {tileLabel}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {sukses && (
              <div className="bg-green-50 border-2 border-green-400 rounded-xl p-5 text-center transition-all duration-700 animate-[fadeIn_0.5s_ease-out] mt-4">
                <div className="text-lg font-bold text-green-800 mb-2">
                  Selamat! Persegi panjang berhasil terbentuk!
                </div>
                <div className="font-mono text-sm text-green-700 space-y-1">
                  <p>
                    Panjang sisi: (x + {tebakanP}) dan (x + {tebakanQ})
                  </p>
                  <p className="font-bold text-base pt-1">
                    (x + {tebakanP})(x + {tebakanQ}) = 0
                  </p>
                  <p className="pt-1">
                    Akar-akarnya: x<span className="text-[10px] align-sub">1</span> = {tebakanP >= 0 ? '-' : ''}{Math.abs(tebakanP)} dan x<span className="text-[10px] align-sub">2</span> = {tebakanQ >= 0 ? '-' : ''}{Math.abs(tebakanQ)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Target</p>
              <p className="font-mono text-sm font-bold text-slate-700 mt-1">
                x<sup>2</sup> + {targetB}x + {targetC}
              </p>
            </div>
            <div className={`rounded-xl p-4 border-2 transition-colors ${
              sukses ? 'bg-green-50 border-green-400' : 'bg-white border-slate-200'
            }`}>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Kanvas</p>
              <p className="font-mono text-sm font-bold text-slate-700 mt-1">
                x<sup>2</sup> + {currentB}x + {currentC}
              </p>
              {sukses && <p className="text-[10px] text-green-600 font-semibold mt-1">Cocok!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}