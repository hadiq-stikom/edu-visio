'use client';

import React, { useState, useMemo } from 'react';

const fmtRupiah = (v: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(v);

const fmtCompact = (v: number) =>
  new Intl.NumberFormat('id-ID', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(v);

export default function InvestmentModule() {
  const [modalAwal, setModalAwal] = useState(1);
  const [rasioBagiHasil, setRasioBagiHasil] = useState(10);
  const [periode, setPeriode] = useState(10);

  const modal = modalAwal * 1_000_000;
  const rasio = rasioBagiHasil;
  const keuntunganKonstan = modal * (rasio / 100);

  const aritmetika = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= periode; i++) {
      arr.push(modal + i * keuntunganKonstan);
    }
    return arr;
  }, [modal, keuntunganKonstan, periode]);

  const geometri = useMemo(() => {
    const arr: number[] = [];
    for (let i = 1; i <= periode; i++) {
      arr.push(modal * Math.pow(1 + rasio / 100, i));
    }
    return arr;
  }, [modal, rasio, periode]);

  const semuaSaldo = [...aritmetika, ...geometri, modal];
  const maxBalance = Math.max(...semuaSaldo, 1);
  const BAR_PX = 180;

  const renderBarChart = (
    data: number[],
    color: { base: string; profit: string },
  ) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200 mb-5">
      <p className="text-xs text-slate-400 font-medium mb-3">Grafik Saldo per Periode</p>
      <div className="flex items-end justify-around gap-1 h-64">
        {data.map((saldo, i) => {
          const n = i + 1;
          const profit = saldo - modal;
          const totalH = Math.max((saldo / maxBalance) * BAR_PX, 4);
          const modalH = Math.max((modal / maxBalance) * BAR_PX, 2);
          const profitH = Math.max(totalH - modalH, 0);
          return (
            <div key={n} className="flex flex-col items-center flex-1 min-w-0">
              <span className="text-[9px] md:text-xs -rotate-45 origin-bottom-left -translate-y-2 translate-x-1 whitespace-nowrap text-slate-500 font-semibold mb-0.5 leading-tight">
                {fmtCompact(saldo)}
              </span>
              <div className="w-full rounded-t-md overflow-hidden transition-all duration-300 flex flex-col-reverse" style={{ height: totalH }}>
                {profit > 0 && (
                  <div className={`w-full transition-all duration-300 ${color.profit}`} style={{ height: profitH }} />
                )}
                <div className={`w-full transition-all duration-300 ${color.base}`} style={{ height: modalH }} />
              </div>
              <span className="text-[9px] text-slate-400 mt-1 font-medium">P-{n}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${color.base}`} /> Modal Awal
        </span>
        <span className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${color.profit}`} /> Bagi Hasil
        </span>
      </div>
    </div>
  );

  const renderFormulaCard = (
    title: string,
    data: number[],
    skenario: 'arithmetic' | 'geometric',
  ) => {
    const n = periode;
    const saldoAkhir = data[n - 1];
    const profitAkhir = saldoAkhir - modal;
    return (
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <p className="text-xs text-slate-400 font-medium mb-3">{title}</p>
        <div className="font-mono text-sm text-slate-600 space-y-1.5">
          {skenario === 'arithmetic' ? (
            <>
              <p>
                M<sub>{n}</sub> = {fmtRupiah(modal)} + ({n} &times; {fmtRupiah(keuntunganKonstan)})
              </p>
              <p>
                M<sub>{n}</sub> = {fmtRupiah(modal)} + {fmtRupiah(n * keuntunganKonstan)}
              </p>
            </>
          ) : (
            <>
              <p>
                M<sub>{n}</sub> = {fmtRupiah(modal)} &times; (1 + {rasio}/100)<sup>{n}</sup>
              </p>
              <p>
                M<sub>{n}</sub> = {fmtRupiah(modal)} &times; {(1 + rasio / 100).toFixed(4)}
                <sup>{n}</sup>
              </p>
            </>
          )}
        </div>
        <div className="border-t border-slate-100 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Modal Akhir</span>
            <span className="text-lg font-bold text-slate-800">{fmtRupiah(saldoAkhir)}</span>
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-sm text-slate-500">Total Bagi Hasil</span>
            <span className="text-base font-semibold text-emerald-600">+{fmtRupiah(profitAkhir)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-semibold mb-2">
          Simulasi Keuangan Syariah
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Mudharabah &mdash; Bagi Hasil Investasi
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Bandingkan pertumbuhan modal apabila Bagi Hasil ditarik (Linear) vs diputar kembali (Eksponensial).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Modal Awal: <span className="text-indigo-600 font-bold">{fmtRupiah(modal)}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={modalAwal}
            onChange={(e) => setModalAwal(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Rp1jt</span><span>Rp5jt</span><span>Rp10jt</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Rasio Bagi Hasil: <span className="text-indigo-600 font-bold">{rasio}%</span>
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={rasio}
            onChange={(e) => setRasioBagiHasil(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>5%</span><span>10%</span><span>15%</span><span>20%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Periode: <span className="text-indigo-600 font-bold">{periode}</span> bulan
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={periode}
            onChange={(e) => setPeriode(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200">
          <div className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-bold shadow-md shadow-blue-600/20 mb-5">
            Bagi Hasil Ditarik (Linear)
          </div>

          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Keuntungan {rasio}% &times; {fmtRupiah(modal)} ={' '}
            <strong className="text-blue-600">{fmtRupiah(keuntunganKonstan)}</strong> tetap setiap periode.
            Saldo bertambah secara linear.
          </p>

          {renderBarChart(aritmetika, { base: 'bg-blue-500', profit: 'bg-blue-300' })}

          {renderFormulaCard('Rincian Periode ke-' + periode, aritmetika, 'arithmetic')}
        </div>

        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold shadow-md shadow-amber-500/20 mb-5">
            Bagi Hasil Diputar (Eksponensial)
          </div>

          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Keuntungan periode sebelumnya digabung ke modal. Saldo tumbuh secara eksponensial
            dengan faktor (1 + {rasio}/100)<sup>n</sup>.
          </p>

          {renderBarChart(geometri, { base: 'bg-amber-500', profit: 'bg-amber-300' })}

          {renderFormulaCard('Rincian Periode ke-' + periode, geometri, 'geometric')}
        </div>
      </div>
    </div>
  );
}
