'use client';

import React, { useState, useMemo } from 'react';

function formatRupiah(val: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val);
}

function fmtShort(val: number) {
  const jt = val / 1_000_000;
  return jt >= 1 ? `${jt.toFixed(1)}JT` : `${(val / 1000).toFixed(0)}RB`;
}

export default function WakafModule() {
  const [modalAwal, setModalAwal] = useState(5_000_000);
  const [tingkatPertumbuhan, setTingkatPertumbuhan] = useState(10);
  const [waktu, setWaktu] = useState(5);

  const r = tingkatPertumbuhan / 100;
  const b = 1 + r;

  const nilaiAkhir = modalAwal * Math.pow(b, waktu);
  const totalSurplus = nilaiAkhir - modalAwal;

  const yMax = useMemo(() => {
    const maxVal = modalAwal * Math.pow(b, 10);
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxVal)));
    return Math.ceil(maxVal / magnitude) * magnitude;
  }, [modalAwal, b]);

  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 10;
      pts.push({ x: t, y: modalAwal * Math.pow(b, t) });
    }
    return pts;
  }, [modalAwal, b]);

  const P = { top: 30, right: 30, bottom: 50, left: 70 };
  const W = 640;
  const H = 350;
  const cw = W - P.left - P.right;
  const ch = H - P.top - P.bottom;

  const xS = (x: number) => P.left + (x / 10) * cw;
  const yS = (y: number) => P.top + ch - (y / yMax) * ch;

  const pathD = curvePoints
    .map((p, i) => {
      const px = xS(p.x);
      const py = yS(p.y);
      return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
    })
    .join(' ');

  const cx = xS(waktu);
  const cy = yS(nilaiAkhir);

  const yTicks: number[] = [];
  const numYTicks = 5;
  for (let i = 0; i <= numYTicks; i++) {
    yTicks.push((yMax / numYTicks) * i);
  }

  const nilaiPerTahun = useMemo(() => {
    return Array.from({ length: waktu }, (_, i) => ({
      tahun: i + 1,
      nilai: modalAwal * Math.pow(b, i + 1),
    }));
  }, [modalAwal, b, waktu]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
          Wakaf Produktif & Pertumbuhan Aset Syariah
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Aplikasi Kontekstual Eksponen
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Mensimulasikan pertumbuhan dana wakaf produktif menggunakan fungsi eksponen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Modal Awal (P₀):{' '}
            <span className="text-emerald-600">{formatRupiah(modalAwal)}</span>
          </label>
          <input
            type="range"
            min={1_000_000}
            max={10_000_000}
            step={500_000}
            value={modalAwal}
            onChange={(e) => setModalAwal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Rp1JT</span>
            <span>Rp10JT</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Tingkat Pertumbuhan (r):{' '}
            <span className="text-emerald-600">{tingkatPertumbuhan}%</span>
          </label>
          <input
            type="range"
            min={5}
            max={15}
            step={1}
            value={tingkatPertumbuhan}
            onChange={(e) => setTingkatPertumbuhan(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>5%</span>
            <span>15%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Jangka Waktu (t):{' '}
            <span className="text-emerald-600">{waktu} tahun</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={waktu}
            onChange={(e) => setWaktu(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1 thn</span>
            <span>10 thn</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
          <p className="text-xs text-emerald-600 font-medium mb-1">Modal Awal</p>
          <p className="text-xl font-bold text-emerald-700">{formatRupiah(modalAwal)}</p>
        </div>
        <div className="p-4 bg-teal-50 rounded-xl border border-teal-100 text-center">
          <p className="text-xs text-teal-600 font-medium mb-1">
            Nilai Akhir ({waktu} tahun)
          </p>
          <p className="text-xl font-bold text-teal-700">{formatRupiah(nilaiAkhir)}</p>
        </div>
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 text-center">
          <p className="text-xs text-amber-600 font-medium mb-1">
            Surplus Manfaat untuk Umat
          </p>
          <p className="text-xl font-bold text-amber-700">+{formatRupiah(totalSurplus)}</p>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 overflow-x-auto">
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} className="bg-white rounded-xl">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {yTicks.map((val) => {
            const y = yS(val);
            if (y < P.top - 2 || y > H - P.bottom + 2) return null;
            return (
              <g key={`yg-${val}`}>
                <line x1={P.left} y1={y} x2={W - P.right} y2={y} stroke="#f1f5f9" strokeWidth="1" />
                <text x={P.left - 8} y={y + 4} className="text-[10px] fill-slate-400" textAnchor="end">
                  {val === 0 ? 'Rp0' : fmtShort(val)}
                </text>
              </g>
            );
          })}

          {Array.from({ length: 11 }, (_, i) => {
            const x = P.left + (i / 10) * cw;
            return (
              <g key={`xg-${i}`}>
                <line x1={x} y1={P.top} x2={x} y2={H - P.bottom} stroke="#f1f5f9" strokeWidth="1" />
                <text x={x} y={H - P.bottom + 18} className="text-[10px] fill-slate-400" textAnchor="middle">
                  {i}
                </text>
              </g>
            );
          })}

          <line x1={P.left} y1={P.top} x2={P.left} y2={H - P.bottom} stroke="#94a3b8" strokeWidth="2" />
          <line x1={P.left} y1={H - P.bottom} x2={W - P.right} y2={H - P.bottom} stroke="#94a3b8" strokeWidth="2" />

          <text x={W / 2} y={H - 5} className="text-xs fill-slate-500" textAnchor="middle">
            Tahun ke-
          </text>
          <text x={14} y={H / 2 + 6} className="text-xs fill-slate-500" textAnchor="middle" transform={`rotate(-90, 14, ${H / 2 + 6})`}>
            Nilai Aset
          </text>

          <path
            d={pathD}
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={`${pathD} L ${xS(10)} ${yS(0)} L ${xS(0)} ${yS(0)} Z`}
            fill="url(#areaGrad)"
          />

          <circle cx={cx} cy={cy} r="7" fill="#059669" stroke="white" strokeWidth="2.5" />

          <line x1={cx} y1={cy} x2={cx} y2={H - P.bottom} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
          <line x1={P.left} y1={cy} x2={cx} y2={cy} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />

          {cy >= P.top && cy <= H - P.bottom && (
            <g>
              <rect x={Math.min(cx + 10, W - P.right - 150)} y={Math.max(cy - 30, P.top + 2)} width="150" height="24" rx="4" fill="#059669" opacity="0.9" />
              <text x={Math.min(cx + 16, W - P.right - 144)} y={Math.max(cy - 14, P.top + 15)} className="text-[11px] font-bold fill-white">
                Rp{fmtShort(nilaiAkhir)}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-emerald-600">📐</span> Rumus Eksponen
          </h4>
          <div className="bg-white rounded-xl p-4 border border-emerald-100 space-y-3">
            <p className="text-center text-lg font-mono font-bold text-emerald-700">
              A(t) = P₀ × (1 + r)<sup className="text-sm">t</sup>
            </p>
            <div className="text-xs text-slate-500 space-y-1 font-mono">
              <p>A(t) = Nilai aset setelah t tahun</p>
              <p>P₀ = Modal awal ({formatRupiah(modalAwal)})</p>
              <p>r = Tingkat pertumbuhan ({tingkatPertumbuhan}%)</p>
              <p>t = Jangka waktu ({waktu} tahun)</p>
            </div>
            <div className="border-t border-emerald-200 pt-3 mt-2">
              <p className="text-sm font-mono text-slate-600 text-center">
                A({waktu}) = {formatRupiah(modalAwal)} × (1 + {r})<sup>{waktu}</sup>
              </p>
              <p className="text-sm font-mono text-slate-600 text-center">
                A({waktu}) = {formatRupiah(modalAwal)} × {b.toFixed(3)}<sup>{waktu}</sup>
              </p>
              <p className="text-base font-bold text-emerald-700 text-center mt-1">
                A({waktu}) = {formatRupiah(nilaiAkhir)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-emerald-600">📊</span> Rincian per Tahun
          </h4>
          <div className="bg-white rounded-xl border border-emerald-100 max-h-56 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="bg-emerald-50 text-emerald-700 sticky top-0">
                <tr>
                  <th className="py-2 px-3 text-left font-semibold">Tahun</th>
                  <th className="py-2 px-3 text-right font-semibold">Nilai Aset</th>
                  <th className="py-2 px-3 text-right font-semibold">Pertumbuhan</th>
                </tr>
              </thead>
              <tbody>
                {nilaiPerTahun.map((item) => {
                  const prev = item.tahun === 1 ? modalAwal : modalAwal * Math.pow(b, item.tahun - 1);
                  const growth = item.nilai - prev;
                  return (
                    <tr key={item.tahun} className="border-t border-emerald-100">
                      <td className="py-1.5 px-3 font-medium text-slate-600">{item.tahun}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-700">{formatRupiah(item.nilai)}</td>
                      <td className="py-1.5 px-3 text-right font-mono text-emerald-600">+{formatRupiah(growth)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <span className="text-emerald-600">💡</span> Refleksi & Motivasi Islami
        </h4>
        <div className="bg-white/80 rounded-xl p-5 border border-emerald-100 space-y-3">
          <p className="text-sm text-slate-700 leading-relaxed">
            <strong className="text-emerald-700">Perumpamaan dalam QS. Al-Baqarah (2:261):</strong>{' '}
            &ldquo;Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji
            yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji. Allah melipatgandakan
            bagi siapa yang Dia kehendaki.&rdquo;
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Dalam modul ini, <strong className="text-emerald-700">{formatRupiah(modalAwal)}</strong> yang
            diwakafkan dan dikelola secara produktif dengan tingkat pertumbuhan{' '}
            <strong className="text-emerald-700">{tingkatPertumbuhan}%</strong> per tahun akan menjadi{' '}
            <strong className="text-emerald-700">{formatRupiah(nilaiAkhir)}</strong> setelah{' '}
            <strong className="text-emerald-700">{waktu} tahun</strong> —{' '}
            menghasilkan surplus <strong className="text-amber-700">{formatRupiah(totalSurplus)}</strong>.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Hal ini mencerminkan bagaimana pengelolaan aset secara produktif, konsisten, dan sesuai
            syariah (tanpa riba) dapat menghasilkan kebaikan yang berlipat ganda bagi umat.
            Pertumbuhan eksponensial ini mengingatkan bahwa <em>konsistensi</em> dalam kebaikan,{' '}
            <em>waktu</em>, dan <em>pengelolaan yang amanah</em> adalah kunci keberkahan.
          </p>
        </div>
      </div>
    </div>
  );
}
