'use client';

import React from 'react';

function formatNum(n: number): string {
  if (Number.isInteger(n)) return n.toString();
  return n.toFixed(2);
}

export default function BallTrajectoryModule() {
  const [v0, setV0] = React.useState(20);
  const [h0, setH0] = React.useState(2);
  const [t, setT] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);
  const animRef = React.useRef<number | null>(null);
  const startTimeRef = React.useRef<number>(0);

  const a = -5;
  const b = v0;
  const c = h0;

  const tMax = v0 / 10;
  const hMax = a * tMax * tMax + b * tMax + c;

  const diskriminan = b * b - 4 * a * c;
  const tGround = (-b - Math.sqrt(diskriminan)) / (2 * a);

  const pad = 45;
  const w = 500;
  const h = 500;
  const xMax = Math.ceil(tGround + 0.5);
  const yMax = Math.ceil(Math.max(hMax, h0) + 3);

  function toX(tVal: number): number {
    return pad + (tVal / xMax) * (w - 2 * pad);
  }
  function toY(hVal: number): number {
    return h - pad - (hVal / yMax) * (h - 2 * pad);
  }

  const trajPoints: string[] = [];
  for (let tt = 0; tt <= tGround; tt += 0.05) {
    const ht = a * tt * tt + b * tt + c;
    if (ht >= 0) trajPoints.push(`${toX(tt)},${toY(ht)}`);
  }
  const trajPath = trajPoints.join(' ');

  const currentH = t >= 0 && t <= tGround ? a * t * t + b * t + c : 0;

  function startAnimation() {
    setT(0);
    setIsAnimating(true);
    startTimeRef.current = performance.now();
    const duration = tGround * 1000;

    function animate(now: number) {
      const elapsed = (now - startTimeRef.current) / 1000;
      if (elapsed >= tGround) {
        setT(tGround);
        setIsAnimating(false);
        return;
      }
      setT(elapsed);
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
  }

  function reset() {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setT(0);
    setIsAnimating(false);
  }

  React.useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold mb-2">
          Aplikasi Fungsi Kuadrat
        </span>
        <h2 className="text-2xl font-bold text-slate-800">Simulator Lintasan Bola</h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Lihat bagaimana fungsi kuadrat memodelkan gerak parabola bola yang dilempar vertikal ke atas.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-64 shrink-0 space-y-5">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">v₀ (Kecepatan Awal)</span>
                <span className="font-bold font-mono text-orange-600">{v0} m/s</span>
              </div>
              <input type="range" min={10} max={30} step={1} value={v0}
                onChange={e => { reset(); setV0(Number(e.target.value)); }}
                disabled={isAnimating}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>10</span><span>30</span></div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">h₀ (Tinggi Awal)</span>
                <span className="font-bold font-mono text-orange-600">{h0} m</span>
              </div>
              <input type="range" min={0} max={5} step={1} value={h0}
                onChange={e => { reset(); setH0(Number(e.target.value)); }}
                disabled={isAnimating}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-orange-500" />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5"><span>0</span><span>5</span></div>
            </div>

            <button onClick={isAnimating ? reset : startAnimation}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                isAnimating
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : t > 0
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200'
              }`}>
              {isAnimating ? 'Reset' : t > 0 ? 'Lempar Lagi' : 'Lempar Bola!'}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1.5 text-xs font-mono">
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-2">Informasi Waktu</p>
            <p className="flex justify-between">
              <span className="text-slate-500">Waktu Saat Ini:</span>
              <span className="font-bold text-slate-700">{formatNum(t)} dtk</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Ketinggian:</span>
              <span className="font-bold text-orange-600">{formatNum(Math.max(0, currentH))} m</span>
            </p>
            <div className="border-t border-slate-100 my-1.5" />
            <p className="flex justify-between">
              <span className="text-slate-500">Waktu ke Puncak:</span>
              <span className="font-bold text-emerald-600">{formatNum(tMax)} dtk</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Ketinggian Max:</span>
              <span className="font-bold text-red-500">{formatNum(hMax)} m</span>
            </p>
            <p className="flex justify-between">
              <span className="text-slate-500">Lama di Udara:</span>
              <span className="font-bold text-slate-700">{formatNum(tGround)} dtk</span>
            </p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto max-w-[550px] mx-auto">
            <rect x={0} y={0} width={w} height={h} fill="#f8fafc" rx={8} />

            {Array.from({ length: Math.ceil(yMax) + 1 }, (_, i) => (
              <line key={`g${i}`} x1={toX(0)} y1={toY(i)} x2={toX(xMax)} y2={toY(i)} stroke="#e2e8f0" strokeWidth={0.5} />
            ))}
            {Array.from({ length: xMax + 1 }, (_, i) => (
              <line key={`v${i}`} x1={toX(i)} y1={toY(0)} x2={toX(i)} y2={toY(yMax)} stroke="#e2e8f0" strokeWidth={0.5} />
            ))}

            <line x1={toX(0)} y1={toY(0)} x2={toX(xMax)} y2={toY(0)} stroke="#475569" strokeWidth={1.5} />
            <line x1={toX(0)} y1={toY(0)} x2={toX(0)} y2={toY(yMax)} stroke="#475569" strokeWidth={1.5} />

            <text x={toX(xMax) + 8} y={toY(0) + 4} className="fill-slate-500 text-[10px] font-bold font-mono">t (dtk)</text>
            <text x={toX(0) - 8} y={toY(yMax) - 4} className="fill-slate-500 text-[10px] font-bold font-mono">h (m)</text>

            {[0, ...Array.from({ length: Math.ceil(xMax) }, (_, i) => i + 1)].map(i => (
              <text key={`xl${i}`} x={toX(i)} y={h - pad + 14} textAnchor="middle" className="fill-slate-400 text-[8px] font-mono">{i}</text>
            ))}
            {Array.from({ length: Math.ceil(yMax) + 1 }, (_, i) => (
              i % 5 === 0 && <text key={`yl${i}`} x={pad - 8} y={toY(i) + 3} textAnchor="end" className="fill-slate-400 text-[8px] font-mono">{i}</text>
            ))}

            <polyline points={trajPath} fill="none" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="5,4" strokeLinecap="round" strokeLinejoin="round" />

            <line x1={toX(0)} y1={toY(hMax)} x2={toX(tMax)} y2={toY(hMax)} stroke="#ef4444" strokeWidth={1} strokeDasharray="4,3" />
            <text x={toX(tMax) + 6} y={toY(hMax) - 4} className="fill-red-500 text-[8px] font-bold font-mono">
              Ketinggian Max: {formatNum(hMax)} m
            </text>
            <circle cx={toX(tMax)} cy={toY(hMax)} r={4} fill="#ef4444" stroke="white" strokeWidth={1.5} />

            <line x1={toX(tMax)} y1={toY(0)} x2={toX(tMax)} y2={toY(hMax)} stroke="#f97316" strokeWidth={1} strokeDasharray="4,3" />

            <circle cx={toX(t)} cy={toY(Math.max(0, currentH))} r={8}
              fill="#f97316" stroke="white" strokeWidth={2.5}
              className="drop-shadow-md transition-all duration-75" />
          </svg>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Analisis Matematis</h4>
        <div className="space-y-2 text-sm text-slate-700">
          <p>
            <span className="font-semibold">&bull; Persamaan Gerak:</span>{' '}
            h(t) = -5t<sup>2</sup> + {v0}t + {h0}
          </p>
          <p>
            <span className="font-semibold">&bull; Waktu mencapai puncak:</span>{' '}
            t = -b / 2a = -({v0}) / 2(-5) = <strong className="text-emerald-700">{formatNum(tMax)} detik</strong>
          </p>
          <p>
            <span className="font-semibold">&bull; Ketinggian maksimum:</span>{' '}
            h<sub>max</sub> = -5({formatNum(tMax)})<sup>2</sup> + {v0}({formatNum(tMax)}) + {h0} ={' '}
            <strong className="text-red-600">{formatNum(hMax)} meter</strong>
          </p>
          <p>
            <span className="font-semibold">&bull; Waktu menyentuh tanah:</span>{' '}
            selesaikan -5t<sup>2</sup> + {v0}t + {h0} = 0 &rarr; t ={' '}
            <strong className="text-slate-700">{formatNum(tGround)} detik</strong>
          </p>
        </div>
      </div>
    </div>
  );
}