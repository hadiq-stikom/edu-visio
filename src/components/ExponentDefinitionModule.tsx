'use client';

import React from 'react';

function generateTree(basis: number, depth: number): any {
  if (depth <= 0) return [];
  if (depth === 1) {
    return Array.from({ length: basis }, (_, i) => i);
  }
  const inner = generateTree(basis, depth - 1);
  return Array.from({ length: basis }, () => JSON.parse(JSON.stringify(inner)));
}

const BORDER_COLORS = [
  'border-emerald-300/60 bg-emerald-50/20',
  'border-teal-300/50 bg-teal-50/20',
  'border-cyan-300/50 bg-cyan-50/20',
];

function renderNode(
  node: any[],
  currentDepth: number,
  targetDepth: number,
  boxSize: string,
): React.ReactNode {
  if (currentDepth >= targetDepth) {
    return (
      <div className="flex flex-wrap gap-1 justify-center">
        {node.map((_, i) => (
          <div
            key={i}
            className={`${boxSize} rounded-md bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-sm`}
          />
        ))}
      </div>
    );
  }

  const borderIdx = Math.min(currentDepth - 1, BORDER_COLORS.length - 1);

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {node.map((child: any, i: number) => (
        <div
          key={i}
          className={`border rounded-lg p-1.5 sm:p-2 ${BORDER_COLORS[borderIdx]}`}
        >
          {renderNode(child, currentDepth + 1, targetDepth, boxSize)}
        </div>
      ))}
    </div>
  );
}

export default function ExponentDefinitionModule() {
  const [basis, setBasis] = React.useState(2);
  const [pangkat, setPangkat] = React.useState(3);

  const hasilEksponen = Math.pow(basis, pangkat);
  const hasilPerkalian = basis * pangkat;

  const isLarge = hasilEksponen > 64;
  const boxSize = isLarge ? 'w-3 h-3 sm:w-4 sm:h-4' : 'w-5 h-5 sm:w-7 sm:h-7';

  const perkalianItems = Array.from({ length: hasilPerkalian }, (_, i) => i);

  const trees = Array.from({ length: pangkat }, (_, i) => generateTree(basis, i + 1));
  const flowSteps = Array.from({ length: pangkat }, (_, i) => Math.pow(basis, i + 1));

  const stepLabel = (step: number) => {
    if (step === 1) return `Mulai dengan ${basis} kotak.`;
    return `Setiap kotak digandakan ${basis}x. Total: ${Math.pow(basis, step)} kotak.`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-2">
          Konsep Dasar
        </span>
        <h2 className="text-2xl font-bold text-slate-800">
          Definisi Eksponen &mdash; Perkalian Berulang
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl mx-auto">
          Memahami arti a<sup>n</sup> sebagai perkalian berulang dan membedakannya dengan perkalian biasa a &times; n.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Basis (a): <span className="text-emerald-600 font-bold">{basis}</span>
          </label>
          <input
            type="range"
            min="2"
            max="4"
            value={basis}
            onChange={(e) => setBasis(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Pangkat (n): <span className="text-emerald-600 font-bold">{pangkat}</span>
          </label>
          <input
            type="range"
            min="2"
            max="4"
            value={pangkat}
            onChange={(e) => setPangkat(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2</span><span>3</span><span>4</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50/70 rounded-2xl p-6 border border-emerald-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-sm font-bold shadow-sm mb-5">
            Eksponen: {basis}<sup>{pangkat}</sup>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Alur pelipatgandaan:{' '}
            {flowSteps.map((step, i) => (
              <span key={i}>
                {i > 0 && <span className="text-slate-300 mx-1">&rarr;</span>}
                <span className="font-semibold text-emerald-700">{step}</span>
              </span>
            ))}{' '}
            kotak
          </p>

          <div className="bg-white rounded-xl p-5 border border-emerald-100 space-y-2">
            {trees.map((tree, stepIdx) => (
              <React.Fragment key={stepIdx}>
                {stepIdx > 0 && (
                  <div className="flex items-center justify-center gap-2 py-1 text-xs text-emerald-600 font-semibold">
                    <span className="h-px flex-1 bg-emerald-200" />
                    &times; {basis}
                    <span className="h-px flex-1 bg-emerald-200" />
                  </div>
                )}

                <div>
                  <div className="text-[10px] text-slate-400 font-medium mb-1.5">
                    Langkah {stepIdx + 1} (Pangkat {stepIdx + 1})
                  </div>
                  <div className="text-[11px] text-slate-500 mb-2 italic">
                    {stepLabel(stepIdx + 1)}
                  </div>
                  {renderNode(tree, 1, stepIdx + 1, boxSize)}
                  <div className="text-center text-[10px] text-slate-400 font-mono mt-1">
                    = {flowSteps[stepIdx]} kotak
                  </div>
                </div>
              </React.Fragment>
            ))}

            <div className="border-t border-emerald-100 pt-3 mt-2 text-center">
              <p className="text-sm text-slate-500 font-mono">
                {basis}<sup>{pangkat}</sup> ={' '}
                {Array.from({ length: pangkat }, (_, i) => (
                  <span key={i}>
                    <span className="text-emerald-600 font-bold">{basis}</span>
                    {i < pangkat - 1 && <span className="text-slate-400 mx-1">×</span>}
                  </span>
                ))}{' '}
                = <strong className="text-emerald-700 text-lg">{hasilEksponen}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200">
          <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-500 text-white text-sm font-bold shadow-sm mb-5">
            Perkalian Biasa: {basis} &times; {pangkat}
          </div>

          <p className="text-xs text-slate-500 mb-4">
            1 kelompok berisi {basis} kotak, diulang {pangkat} kali &rarr; total {hasilPerkalian} kotak
          </p>

          <div className="bg-white rounded-xl p-5 border border-amber-100">
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              {perkalianItems.map((_, i) => (
                <div
                  key={i}
                  className={`${boxSize} rounded-md bg-gradient-to-br from-amber-400 to-amber-500 shadow-sm`}
                />
              ))}
            </div>
            <div className="border-t border-amber-100 pt-3 mt-4 text-center">
              <p className="text-sm text-slate-500 font-mono">
                {basis} &times; {pangkat} ={' '}
                {Array.from({ length: pangkat }, (_, i) => (
                  <span key={i}>
                    <span className="text-amber-600 font-bold">{basis}</span>
                    {i < pangkat - 1 && <span className="text-slate-400 mx-1">+</span>}
                  </span>
                ))}{' '}
                = <strong className="text-amber-700 text-lg">{hasilPerkalian}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-emerald-600 text-base">&#x1F4D0;</span> Bentuk Eksponen
          </h4>
          <div className="bg-emerald-50 rounded-xl p-4 space-y-1.5 font-mono text-sm">
            <p>
              {basis}<sup>{pangkat}</sup> = {basis} &times; {basis} &times; ... &times; {basis}
            </p>
            <p className="text-xs text-slate-400">
              ({pangkat} kali perkalian)
            </p>
            <p>
              {basis}<sup>{pangkat}</sup> = {Array.from({ length: pangkat }, () => basis).join(' × ')}
            </p>
            <p className="text-base font-bold text-emerald-700 border-t border-emerald-200 pt-2">
              {basis}<sup>{pangkat}</sup> = {hasilEksponen}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <span className="text-amber-600 text-base">&#x26A0;&#xFE0F;</span> Perbandingan &amp; Catatan
          </h4>
          <div className="bg-amber-50 rounded-xl p-4 space-y-2">
            <p className="font-mono text-sm">
              {basis} &times; {pangkat} = {hasilPerkalian}
            </p>
            <div className="border-t border-amber-200 pt-2 text-sm text-slate-600 space-y-1">
              <p>
                <strong className="text-emerald-700">{basis}<sup>{pangkat}</sup></strong> = {basis} × {basis} × ... ({pangkat} kali) ={' '}
                <strong className="text-emerald-700">{hasilEksponen}</strong>
              </p>
              <p>
                <strong className="text-amber-600">{basis} × {pangkat}</strong> = {basis} + {basis} + ... ({pangkat} kali) ={' '}
                <strong className="text-amber-600">{hasilPerkalian}</strong>
              </p>
            </div>
            <div className="bg-amber-100/60 rounded-lg p-3 text-sm text-slate-700 mt-2 space-y-1">
              <p><strong>Hitung jumlah kotaknya!</strong></p>
              <p>
                <strong className="text-emerald-700">{basis}<sup>{pangkat}</sup></strong> menghasilkan{' '}
                <strong className="text-emerald-700">{hasilEksponen} kotak</strong> yang berlipat ganda,
                sedangkan <strong className="text-amber-600">{basis} × {pangkat}</strong> hanya menghasilkan{' '}
                <strong className="text-amber-600">{hasilPerkalian} kotak</strong>.
              </p>
              <p className="pt-1 text-xs text-slate-500 border-t border-amber-200">
                Eksponen = perkalian berulang (angka dikalikan). Perkalian biasa = penjumlahan berulang (angka ditambahkan).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}