'use client';

import React from 'react';

const STEPS = [
  {
    label: 'Persamaan Awal',
    text: 'Persamaan awal: x\u00B2 + 4x = 5. Mari kita visualisasikan ruas kiri sebagai bangun datar.',
    formula: 'x\u00B2 + 4x = 5',
  },
  {
    label: 'Membagi Dua Koefisien x',
    text: 'Bagi dua ubin x. Pindahkan separuh (2x) ke bagian bawah ubin x\u00B2. Luasnya tetap sama: x\u00B2 + 4x.',
    formula: 'x\u00B2 + 4x = 5',
  },
  {
    label: 'Menemukan Ruang Kosong',
    text: 'Bangun ini belum menjadi persegi sempurna. Ada ruang kosong di sudut dengan ukuran 2 \u00D7 2.',
    formula: 'x\u00B2 + 4x + \u25A1 = 5 + \u25A1',
  },
  {
    label: 'Melengkapi Kuadrat',
    text: 'Tambahkan 4 ubin kecil (2\u00B2) untuk melengkapi kuadrat ini. Ruas kanan juga ditambah 4: 5 + 4 = 9.',
    formula: 'x\u00B2 + 4x + 4 = 9',
  },
  {
    label: 'Kesimpulan',
    text: 'Sekarang kita memiliki persegi sempurna! Bentuk aljabarnya menjadi (x + 2)\u00B2 = 9.',
    formula: '(x + 2)\u00B2 = 9',
  },
];

const U = 64;

const POS = {
  x2: { top: 20, left: 20, w: U * 2, h: U * 2 },
  xRight: [
    { top: 20, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U, left: 20 + U * 2, w: U, h: U },
  ],
  xBottom: [
    { top: 20 + U * 2, left: 20, w: U, h: U },
    { top: 20 + U * 2, left: 20 + U, w: U, h: U },
  ],
  units: [
    { top: 20 + U * 2, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U * 2, left: 20 + U * 3, w: U, h: U },
    { top: 20 + U * 3, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U * 3, left: 20 + U * 3, w: U, h: U },
  ],
};

const CANVAS_SIZE = 20 + U * 4 + 20;

export default function CompleteSquareModule() {
  const [step, setStep] = React.useState(0);

  const isRowLayout = step === 0;

  const rowXRight = [
    { top: 20, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U * 2, left: 20 + U * 2, w: U, h: U },
    { top: 20 + U * 3, left: 20 + U * 2, w: U, h: U },
  ];

  const containerW = isRowLayout ? 20 + U * 3 + 20 : CANVAS_SIZE;
  const containerH = isRowLayout ? 20 + U * 4 + 20 : CANVAS_SIZE;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Animasi Materi
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Melengkapi Kuadrat Sempurna</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Visualisasikan mengapa kita perlu menambahkan (b/2)&sup2; ke kedua ruas.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block" /> x&sup2;</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500 inline-block" /> x</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-400 inline-block" /> 1</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border-2 border-dashed border-slate-300 bg-transparent inline-block" /> Kosong</span>
          </div>
          <div className="text-xs font-semibold text-slate-400">
            Langkah {step + 1} / {STEPS.length}
          </div>
        </div>

        <div className="flex justify-center py-6">
          <div
            className="relative transition-all duration-700"
            style={{ width: containerW, height: containerH }}
          >
            <div
              className="absolute bg-blue-500 text-white font-mono font-bold rounded-lg flex items-center justify-center shadow-md transition-all duration-700"
              style={{ top: POS.x2.top, left: POS.x2.left, width: POS.x2.w, height: POS.x2.h }}
            >
              x&sup2;
            </div>

            {(isRowLayout ? rowXRight : POS.xRight).map((pos, i) => (
              <div
                key={`xr${i}`}
                className="absolute bg-green-500 text-white font-mono font-bold rounded-lg flex items-center justify-center shadow-md transition-all duration-700"
                style={{ top: pos.top, left: pos.left, width: pos.w, height: pos.h }}
              >
                x
              </div>
            ))}

            {!isRowLayout && POS.xBottom.map((pos, i) => (
              <div
                key={`xb${i}`}
                className="absolute bg-green-500 text-white font-mono font-bold rounded-lg flex items-center justify-center shadow-md transition-all duration-700"
                style={{ top: pos.top, left: pos.left, width: pos.w, height: pos.h }}
              >
                x
              </div>
            ))}

            {step >= 2 && (
              <div
                className="absolute border-2 border-dashed border-slate-300 rounded-lg transition-all duration-700"
                style={{ top: 20 + U * 2, left: 20 + U * 2, width: U * 2, height: U * 2 }}
              />
            )}

            {step >= 2 && (
              <div className="absolute font-mono text-[10px] text-slate-400 font-bold transition-all duration-500"
                style={{ top: 20 + U * 2 - 18, left: 20 + U * 2 + U - 12 }}>
                2
              </div>
            )}
            {step >= 2 && (
              <div className="absolute font-mono text-[10px] text-slate-400 font-bold transition-all duration-500"
                style={{ top: 20 + U * 2 + U - 8, left: 20 + U * 2 - 16 }}>
                2
              </div>
            )}

            {step >= 3 && POS.units.map((pos, i) => (
              <div
                key={`u${i}`}
                className="absolute bg-yellow-400 text-yellow-800 font-mono text-xs font-bold rounded-lg flex items-center justify-center shadow-sm transition-all duration-500"
                style={{ top: pos.top, left: pos.left, width: pos.w, height: pos.h, opacity: step >= 3 ? 1 : 0 }}
              >
                1
              </div>
            ))}

            {step === 4 && (
              <div className="absolute font-mono text-sm font-bold text-slate-700 transition-all duration-500"
                style={{ top: -8, left: 20 + U + 6 }}>
                x + 2
              </div>
            )}
            {step === 4 && (
              <div className="absolute font-mono text-sm font-bold text-slate-700 transition-all duration-500"
                style={{ top: 20 + U + 4, left: -6, transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                x + 2
              </div>
            )}
          </div>
        </div>

        <div className="text-center transition-all duration-500 min-h-[160px] bg-indigo-50 border-2 border-indigo-200 rounded-xl p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {STEPS[step].label}
          </p>
          <p className="text-sm text-slate-700 mb-3">
            {STEPS[step].text}
          </p>
          <div className="font-mono text-lg font-bold text-slate-800 bg-white rounded-lg px-4 py-2 inline-block shadow-sm border border-slate-100">
            {STEPS[step].formula}
          </div>

          {step === 4 && (
            <div className="mt-4 space-y-1 text-sm font-mono text-green-700">
              <p className="font-bold bg-green-100 rounded-lg px-4 py-2 inline-block">
                (x + 2)&sup2; = 9 &rArr; x + 2 = &plusmn;3 &rArr; x = 1 atau x = -5
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              step === 0 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
            }`}
          >
            Langkah Sebelumnya
          </button>

          <div className="flex gap-1.5">
            {STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === step ? 'bg-indigo-600 scale-125' : i < step ? 'bg-emerald-400' : 'bg-slate-200 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
            disabled={step === STEPS.length - 1}
            className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
              step === STEPS.length - 1 ? 'bg-slate-100 text-slate-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            Langkah Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}