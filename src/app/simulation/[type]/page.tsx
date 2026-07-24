'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';
import TrigModule from '@/components/TrigModule';
import HeightMeasurementModule from '@/components/HeightMeasurementModule';
import ExponentialModule from '@/components/ExponentialModule';
import PropertiesModule from '@/components/PropertiesModule';
import SequenceModule from '@/components/SequenceModule';
import SeriesModule from '@/components/SeriesModule';
import InvestmentModule from '@/components/InvestmentModule';
import CharityModule from '@/components/CharityModule';
import SeriesIntroModule from '@/components/SeriesIntroModule';
import ExponentDefinitionModule from '@/components/ExponentDefinitionModule';
import RadicalModule from '@/components/RadicalModule';
import WakafModule from '@/components/WakafModule';

export default function SimulationPage() {
  const { type } = useParams();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Modul
        </button>

        {type === 'trigonometry' ? (
          <TrigModule />
        ) : type === 'building-height' ? (
          <HeightMeasurementModule />
        ) : type === 'exponential' ? (
          <ExponentialModule />
        ) : type === 'exponent-properties' ? (
          <PropertiesModule />
        ) : type === 'sequence' ? (
          <SequenceModule />
        ) : type === 'series' ? (
          <SeriesModule />
        ) : type === 'investment' ? (
          <InvestmentModule />
        ) : type === 'charity' ? (
          <CharityModule />
        ) : type === 'series-intro' ? (
          <SeriesIntroModule />
        ) : type === 'exponent-definition' ? (
          <ExponentDefinitionModule />
        ) : type === 'radical' ? (
          <RadicalModule />
        ) : type === 'wakaf' ? (
          <WakafModule />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <h2 className="text-2xl font-bold">Simulasi "{type}" dalam pengembangan.</h2>
          </div>
        )}
      </main>
    </div>
  );
}
