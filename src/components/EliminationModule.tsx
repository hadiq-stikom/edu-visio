'use client';

import React from 'react';

function det(a1: number, b1: number, a2: number, b2: number) {
  return a1 * b2 - a2 * b1;
}

interface StepProps {
  num: number;
  label: string;
  active: boolean;
  done: boolean;
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function Step({ num, label, active, done, collapsed, onToggle, children }: StepProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (active && ref.current) {
      setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
    }
  }, [active]);

  const isOpen = active || !collapsed;

  return (
    <div ref={ref} className={`${!active && !done ? 'hidden' : ''}`}>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300 shrink-0 ${
              done
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : active
                  ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                  : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {done ? '\u2713' : num}
          </div>
          {num < 6 && <div className="w-0.5 flex-1 bg-slate-200 my-1" />}
        </div>
        <div className="flex-1 pb-8 min-w-0">
          <button onClick={done ? onToggle : undefined}
            className={`flex items-center gap-2 w-full text-left mb-2 ${done ? 'cursor-pointer' : ''}`}>
            <h3
              className={`text-sm font-bold ${
                done
                  ? 'text-emerald-700'
                  : active
                    ? 'text-slate-800'
                    : 'text-slate-400'
              }`}
            >
              {label}
            </h3>
            {done && (
              <svg className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>
          <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className={`rounded-xl p-4 transition-colors duration-300 ${done ? 'bg-slate-50 pointer-events-none opacity-80' : 'bg-transparent'}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatNum(n: number | null): string {
  if (n === null) return '?';
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(2);
}

export default function EliminationModule() {
  const [a1, setA1] = React.useState(2);
  const [b1, setB1] = React.useState(1);
  const [c1, setC1] = React.useState(10);
  const [a2, setA2] = React.useState(1);
  const [b2, setB2] = React.useState(2);
  const [c2, setC2] = React.useState(11);
  const [step, setStep] = React.useState(0);
  const [elimVar, setElimVar] = React.useState<'x' | 'y' | null>(null);
  const [foundVal, setFoundVal] = React.useState<number | null>(null);
  const [substVal, setSubstVal] = React.useState<number | null>(null);
  const [collapsed, setCollapsed] = React.useState<Record<number, boolean>>({});

  function toggleCollapse(num: number) {
    setCollapsed(prev => ({ ...prev, [num]: !prev[num] }));
  }

  const determinant = det(a1, b1, a2, b2);
  const isParallel = determinant === 0;
  const isCoincident = isParallel && a1 * c2 === a2 * c1;

  const errorMsg = isParallel
    ? isCoincident
      ? 'Kedua garis berimpit (solusi tak hingga).'
      : 'Kedua garis sejajar (tidak ada solusi).'
    : null;

  function reset() {
    setStep(0);
    setElimVar(null);
    setFoundVal(null);
    setSubstVal(null);
  }

  function handleEliminationPick(v: 'x' | 'y') {
    setElimVar(v);
    setStep(2);
  }

  function proceedToEliminate() {
    setStep(3);
    if (elimVar === 'x') {
      setFoundVal((a2 * c1 - a1 * c2) / determinant);
    } else {
      setFoundVal((b2 * c1 - b1 * c2) / determinant);
    }
  }

  function proceedToSubstitute() {
    setStep(4);
    if (elimVar === 'x' && foundVal !== null) {
      setSubstVal((c1 - b1 * foundVal) / a1);
    } else if (elimVar === 'y' && foundVal !== null) {
      setSubstVal((c1 - a1 * foundVal) / b1);
    }
  }

  function proceedToResult() {
    setStep(5);
  }

  function restart() {
    setStep(0);
    setElimVar(null);
    setFoundVal(null);
    setSubstVal(null);
  }

  const first = elimVar === 'x' ? 'y' : 'x';

  const mult1 =
    elimVar === 'x'
      ? { by: a2, newA: a2 * a1, newB: a2 * b1, newC: a2 * c1 }
      : { by: b2, newA: b2 * a1, newB: b2 * b1, newC: b2 * c1 };

  const mult2 =
    elimVar === 'x'
      ? { by: a1, newA: a1 * a2, newB: a1 * b2, newC: a1 * c2 }
      : { by: b1, newA: b1 * a2, newB: b1 * b2, newC: b1 * c2 };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
          Asisten SPLDV
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Metode Eliminasi &amp; Substitusi
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Selesaikan SPLDV langkah demi langkah menggunakan metode eliminasi dan substitusi.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <Step num={1} label="Masukkan Persamaan" active={step === 0} done={step > 0} collapsed={collapsed[1] ?? true} onToggle={() => toggleCollapse(1)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-3">Persamaan 1</p>
              <div className="flex items-center gap-2 flex-wrap">
                <input type="number" value={a1} onChange={e => { setA1(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                <span className="font-mono text-sm text-slate-600">x +</span>
                <input type="number" value={b1} onChange={e => { setB1(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                <span className="font-mono text-sm text-slate-600">y =</span>
                <input type="number" value={c1} onChange={e => { setC1(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-500 mb-3">Persamaan 2</p>
              <div className="flex items-center gap-2 flex-wrap">
                <input type="number" value={a2} onChange={e => { setA2(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                <span className="font-mono text-sm text-slate-600">x +</span>
                <input type="number" value={b2} onChange={e => { setB2(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
                <span className="font-mono text-sm text-slate-600">y =</span>
                <input type="number" value={c2} onChange={e => { setC2(Number(e.target.value)); reset(); }}
                  className="w-16 border border-slate-300 rounded-lg px-2 py-1.5 text-sm font-mono text-center focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-4 font-mono text-sm text-center mb-4">
            {a1}x + {b1}y = {c1}
            <span className="mx-3 text-slate-300">|</span>
            {a2}x + {b2}y = {c2}
          </div>

          {errorMsg && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 mb-4">
              {errorMsg}
            </div>
          )}

          {!errorMsg && step === 0 && (
            <button onClick={() => setStep(1)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Lanjut ke Tahap Berikutnya
            </button>
          )}
        </Step>

        <Step num={2} label="Pilih Variabel yang Akan Dieliminasi" active={step === 1} done={step > 1} collapsed={collapsed[2] ?? true} onToggle={() => toggleCollapse(2)}>
          <p className="text-sm text-slate-600 mb-4">
            Pilih variabel mana yang ingin kamu hilangkan (eliminasi) terlebih dahulu:
          </p>
          <div className="flex gap-3">
            <button onClick={() => handleEliminationPick('x')}
              className="flex-1 bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Eliminasi Variabel x
            </button>
            <button onClick={() => handleEliminationPick('y')}
              className="flex-1 bg-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Eliminasi Variabel y
            </button>
          </div>
        </Step>

        <Step num={3} label="Samakan Koefisien" active={step === 2} done={step > 2} collapsed={collapsed[3] ?? true} onToggle={() => toggleCollapse(3)}>
          <p className="text-sm text-slate-600 mb-3">
            Samakan koefisien <strong>{elimVar}</strong> dengan mengalikan kedua persamaan:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100">
              <p className="text-[10px] text-blue-600 font-semibold mb-1">Persamaan 1 &times; {mult1.by}</p>
              <p className="font-mono text-sm">{mult1.newA}x + {mult1.newB}y = {mult1.newC}</p>
            </div>
            <div className="bg-red-50/60 rounded-xl p-4 border border-red-100">
              <p className="text-[10px] text-red-600 font-semibold mb-1">Persamaan 2 &times; {mult2.by}</p>
              <p className="font-mono text-sm">{mult2.newA}x + {mult2.newB}y = {mult2.newC}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 font-mono text-xs text-slate-500 space-y-1 mb-4">
            <p>{a1}x + {b1}y = {c1} &nbsp; (dikali {mult1.by})</p>
            <p className="pl-4">&rarr; {mult1.newA}x + {mult1.newB}y = {mult1.newC}</p>
            <div className="border-t border-slate-200 my-1" />
            <p>{a2}x + {b2}y = {c2} &nbsp; (dikali {mult2.by})</p>
            <p className="pl-4">&rarr; {mult2.newA}x + {mult2.newB}y = {mult2.newC}</p>
          </div>

          {step === 2 && (
            <button onClick={proceedToEliminate}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Lanjut ke Eliminasi
            </button>
          )}
        </Step>

        <Step num={4} label={`Eliminasi ${elimVar ? elimVar.toUpperCase() : ''} — Temukan ${first}`} active={step === 3} done={step > 3} collapsed={collapsed[4] ?? true} onToggle={() => toggleCollapse(4)}>
          <p className="text-sm text-slate-600 mb-3">
            Kurangkan kedua persamaan untuk mengeliminasi <strong>{elimVar}</strong>:
          </p>

          <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm space-y-1 mb-4">
            <p>({mult1.newA}x + {mult1.newB}y = {mult1.newC})</p>
            <p className="text-slate-300">- ({mult2.newA}x + {mult2.newB}y = {mult2.newC})</p>
            <div className="border-t border-slate-300 my-1" />
            <p>({mult1.newB} - {mult2.newB}){first} = {mult1.newC} - {mult2.newC}</p>
            <p className="font-bold text-indigo-700">{determinant} &middot; {first} = {mult1.newC - mult2.newC}</p>
            {foundVal !== null && (
              <p className="font-bold text-green-700 text-base pt-1">
                {first} = {(mult1.newC - mult2.newC) / determinant} &rarr; {first} = {formatNum(foundVal)}
              </p>
            )}
          </div>

          {step === 3 && foundVal === null && (
            <button onClick={proceedToEliminate}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Hitung Nilai {first.toUpperCase()}
            </button>
          )}
          {step === 3 && foundVal !== null && (
            <button onClick={proceedToSubstitute}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Lanjut ke Substitusi
            </button>
          )}
        </Step>

        <Step num={5} label={`Substitusi — Temukan ${elimVar ? elimVar.toUpperCase() : ''}`} active={step === 4} done={step > 4} collapsed={collapsed[5] ?? true} onToggle={() => toggleCollapse(5)}>
          <p className="text-sm text-slate-600 mb-3">
            Substitusikan nilai <strong>{first} = {formatNum(foundVal)}</strong> ke dalam Persamaan 1:
          </p>

          <div className="bg-slate-50 rounded-xl p-4 font-mono text-sm space-y-1 mb-4">
            <p>{a1}x + {b1}y = {c1}</p>
            <p>{a1}x + {b1}({formatNum(foundVal)}) = {c1}</p>
            <p>{a1}x + {formatNum(b1 * foundVal!)} = {c1}</p>
            <p>{a1}x = {c1} - {formatNum(b1 * foundVal!)}</p>
            <p>{a1}x = {formatNum(c1 - b1 * foundVal!)}</p>
            {substVal !== null && (
              <p className="font-bold text-green-700 text-base pt-1">x = {formatNum(substVal)}</p>
            )}
          </div>

          {step === 4 && substVal === null && (
            <button onClick={proceedToSubstitute}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Hitung Nilai {elimVar?.toUpperCase()}
            </button>
          )}
          {step === 4 && substVal !== null && (
            <button onClick={proceedToResult}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors">
              Lihat Hasil Akhir
            </button>
          )}
        </Step>

        <Step num={6} label="Kesimpulan" active={step === 5} done={false} collapsed={false} onToggle={() => {}}>
          <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 text-center">
            <div className="text-lg font-bold text-green-800 mb-2">Himpunan Penyelesaian</div>
            <div className="bg-white rounded-xl p-4 inline-block font-mono text-lg shadow-sm border border-green-200">
              HP = {'{'} ({formatNum(elimVar === 'x' ? substVal : foundVal)}, {formatNum(elimVar === 'x' ? foundVal : substVal)}) {'}'}
            </div>
            <p className="text-sm text-green-700 mt-3">
              x = {formatNum(elimVar === 'x' ? substVal : foundVal)}, y = {formatNum(elimVar === 'x' ? foundVal : substVal)}
            </p>
          </div>

          <button onClick={restart}
            className="mt-4 bg-slate-200 text-slate-700 px-5 py-2 rounded-xl text-sm font-semibold hover:bg-slate-300 transition-colors">
            Kerjakan Soal Lain
          </button>
        </Step>
      </div>
    </div>
  );
}