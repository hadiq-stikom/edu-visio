'use client';

import React from 'react';

const KUNCI_APEL = 100;
const KUNCI_JERUK = 150;

function Fruit({ type, weight }: { type: 'apel' | 'jeruk'; weight: number }) {
  const isApple = type === 'apel';
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-white shadow-sm ${
        isApple ? 'bg-red-500' : 'bg-amber-500'
      }`}
    >
      <span className="text-[10px] opacity-90">{weight}g</span>
      <span>{isApple ? 'A' : 'J'}</span>
    </div>
  );
}

function BalanceScale({
  fruits,
  target,
  leftWeight,
  tiltAngle,
  balanced,
}: {
  fruits: React.ReactNode;
  target: number;
  leftWeight: number;
  tiltAngle: number;
  balanced: boolean;
}) {
  return (
    <div className="flex flex-col items-center py-4 select-none">
      <div className="relative h-5 w-full max-w-[180px]">
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-in-out origin-center"
          style={{ transform: `rotate(${tiltAngle}deg)` }}
        >
          <div
            className={`relative w-full h-1.5 rounded-full ${
              balanced ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]' : 'bg-amber-600'
            }`}
          >
            <div
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 ${
                balanced
                  ? 'bg-green-700 border-green-300'
                  : 'bg-amber-800 border-amber-300'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full max-w-[180px] -mt-1">
        <div className="flex flex-col items-center">
          <div className={`w-0.5 h-4 ${balanced ? 'bg-green-400' : 'bg-amber-400'}`} />
          <div
            className={`border-2 rounded-xl p-2 transition-colors duration-300 ${
              balanced
                ? 'bg-green-50 border-green-400'
                : 'bg-amber-50/80 border-amber-300'
            }`}
          >
            <div className="flex flex-wrap gap-1 justify-center">{fruits}</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-0.5 h-4 ${balanced ? 'bg-green-400' : 'bg-amber-400'}`} />
          <div
            className={`border-2 rounded-xl px-3 py-2 transition-colors duration-300 ${
              balanced
                ? 'bg-green-50 border-green-400'
                : 'bg-amber-50/80 border-amber-300'
            }`}
          >
            <div className="text-xs font-bold text-center font-mono text-slate-700">
              {target}
            </div>
            <div className="text-[9px] text-slate-400 font-medium text-center">
              gram
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1.5">
        <div
          className={`w-0 h-0 border-l-[10px] border-r-[10px] border-b-[14px] border-l-transparent border-r-transparent transition-colors duration-300 ${
            balanced ? 'border-b-green-600' : 'border-b-amber-700'
          }`}
        />
      </div>

      <div
        className={`flex items-center gap-2 mt-2 text-xs font-medium transition-colors duration-300 ${
          balanced ? 'text-green-700' : 'text-slate-400'
        }`}
      >
        <span>{leftWeight}g</span>
        <span className={`text-base ${balanced ? 'text-green-500' : 'text-slate-300'}`}>
          {balanced ? '=' : leftWeight < target ? '<' : '>'}
        </span>
        <span>{target}g</span>
      </div>
    </div>
  );
}

export default function LinearEquationsModule() {
  const [tebakanApel, setTebakanApel] = React.useState(50);
  const [tebakanJeruk, setTebakanJeruk] = React.useState(50);

  const beratKiri1 = 2 * tebakanApel + 1 * tebakanJeruk;
  const target1 = 350;
  const selisih1 = beratKiri1 - target1;
  const sudut1 = Math.max(-12, Math.min(12, selisih1 * 0.08));
  const seimbang1 = selisih1 === 0;

  const beratKiri2 = 1 * tebakanApel + 2 * tebakanJeruk;
  const target2 = 400;
  const selisih2 = beratKiri2 - target2;
  const sudut2 = Math.max(-12, Math.min(12, selisih2 * 0.08));
  const seimbang2 = selisih2 === 0;

  const semuaSeimbang = seimbang1 && seimbang2;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold mb-2">
          Eksplorasi 4.2
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Simulator Timbangan SPLDV
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Geser slider untuk menebak berat Apel (x) dan Jeruk (y). Seimbangkan kedua
          timbangan untuk menemukan solusi SPLDV!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Berat 1 Apel (x):{' '}
            <span className="text-red-500 font-bold">{tebakanApel}g</span>
            {tebakanApel === KUNCI_APEL && (
              <span className="ml-2 text-green-600 text-xs font-normal">
                Tepat!
              </span>
            )}
          </label>
          <input
            type="range"
            min="0"
            max="300"
            value={tebakanApel}
            onChange={(e) => setTebakanApel(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0g</span>
            <span>150g</span>
            <span>300g</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Berat 1 Jeruk (y):{' '}
            <span className="text-amber-500 font-bold">{tebakanJeruk}g</span>
            {tebakanJeruk === KUNCI_JERUK && (
              <span className="ml-2 text-green-600 text-xs font-normal">
                Tepat!
              </span>
            )}
          </label>
          <input
            type="range"
            min="0"
            max="300"
            value={tebakanJeruk}
            onChange={(e) => setTebakanJeruk(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>0g</span>
            <span>150g</span>
            <span>300g</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div
          className={`rounded-2xl p-6 border-2 transition-all duration-500 ${
            seimbang1
              ? 'bg-green-50/70 border-green-400 shadow-lg shadow-green-200/40'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700">
              Timbangan 1
            </h3>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                seimbang1
                  ? 'bg-green-200 text-green-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {seimbang1 ? 'Seimbang' : 'Belum'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            2 Apel + 1 Jeruk vs {target1}g
          </p>

          <BalanceScale
            fruits={
              <>
                <Fruit type="apel" weight={tebakanApel} />
                <Fruit type="apel" weight={tebakanApel} />
                <Fruit type="jeruk" weight={tebakanJeruk} />
              </>
            }
            target={target1}
            leftWeight={beratKiri1}
            tiltAngle={sudut1}
            balanced={seimbang1}
          />

          <div className="bg-slate-50 rounded-xl p-3 mt-2 font-mono text-xs space-y-1">
            <p className="text-slate-500">
              <span className="font-semibold text-slate-700">Model:</span> 2x + y = {target1}
            </p>
            <p>
              2({tebakanApel}) + 1({tebakanJeruk}) ={' '}
              <span className={seimbang1 ? 'text-green-700 font-bold' : 'text-slate-700'}>
                {beratKiri1}
              </span>
              {seimbang1 ? ' = ' : beratKiri1 < target1 ? ' < ' : ' > '}
              <span className="text-slate-500">{target1}</span>
            </p>
            <div className="flex items-center gap-2 text-[10px]">
              <span>Kiri: {beratKiri1}g</span>
              <span className="text-slate-300">|</span>
              <span>Kanan: {target1}g</span>
              <span className="text-slate-300">|</span>
              <span className={seimbang1 ? 'text-green-700 font-bold' : 'text-amber-600'}>
                Selisih: {Math.abs(selisih1)}g
              </span>
            </div>
          </div>
        </div>

        <div
          className={`rounded-2xl p-6 border-2 transition-all duration-500 ${
            seimbang2
              ? 'bg-green-50/70 border-green-400 shadow-lg shadow-green-200/40'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700">
              Timbangan 2
            </h3>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                seimbang2
                  ? 'bg-green-200 text-green-800'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {seimbang2 ? 'Seimbang' : 'Belum'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            1 Apel + 2 Jeruk vs {target2}g
          </p>

          <BalanceScale
            fruits={
              <>
                <Fruit type="apel" weight={tebakanApel} />
                <Fruit type="jeruk" weight={tebakanJeruk} />
                <Fruit type="jeruk" weight={tebakanJeruk} />
              </>
            }
            target={target2}
            leftWeight={beratKiri2}
            tiltAngle={sudut2}
            balanced={seimbang2}
          />

          <div className="bg-slate-50 rounded-xl p-3 mt-2 font-mono text-xs space-y-1">
            <p className="text-slate-500">
              <span className="font-semibold text-slate-700">Model:</span> x + 2y = {target2}
            </p>
            <p>
              1({tebakanApel}) + 2({tebakanJeruk}) ={' '}
              <span className={seimbang2 ? 'text-green-700 font-bold' : 'text-slate-700'}>
                {beratKiri2}
              </span>
              {seimbang2 ? ' = ' : beratKiri2 < target2 ? ' < ' : ' > '}
              <span className="text-slate-500">{target2}</span>
            </p>
            <div className="flex items-center gap-2 text-[10px]">
              <span>Kiri: {beratKiri2}g</span>
              <span className="text-slate-300">|</span>
              <span>Kanan: {target2}g</span>
              <span className="text-slate-300">|</span>
              <span className={seimbang2 ? 'text-green-700 font-bold' : 'text-amber-600'}>
                Selisih: {Math.abs(selisih2)}g
              </span>
            </div>
          </div>
        </div>
      </div>

      {semuaSeimbang && (
        <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center transition-all duration-500 animate-[pulse_2s_ease-in-out_infinite]">
          <div className="text-2xl mb-1">Selamat!</div>
          <h3 className="text-lg font-bold text-green-800">
            Kedua Timbangan Seimbang!
          </h3>
          <p className="text-green-700 mt-1 text-sm">
            Kamu menemukan solusi SPLDV:{' '}
            <strong className="text-red-600">Apel (x) = {KUNCI_APEL}g</strong> dan{' '}
            <strong className="text-amber-600">Jeruk (y) = {KUNCI_JERUK}g</strong>.
          </p>
          <div className="bg-green-100 rounded-xl p-3 mt-3 font-mono text-xs text-green-800 inline-block">
            2({KUNCI_APEL}) + {KUNCI_JERUK} = {target1} &check;
            <span className="mx-2 text-green-400">|</span>
            {KUNCI_APEL} + 2({KUNCI_JERUK}) = {target2} &check;
          </div>
        </div>
      )}
    </div>
  );
}