'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { SUBJECTS } from '@/lib/data';
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
import LinearEquationsModule from '@/components/LinearEquationsModule';
import InequalitiesModule from '@/components/InequalitiesModule';
import EliminationModule from '@/components/EliminationModule';
import QuadraticFactoringModule from '@/components/QuadraticFactoringModule';
import ParabolaModule from '@/components/ParabolaModule';
import BallTrajectoryModule from '@/components/BallTrajectoryModule';
import FactoringAnimationModule from '@/components/FactoringAnimationModule';
import CompleteSquareModule from '@/components/CompleteSquareModule';
import DiscriminantModule from '@/components/DiscriminantModule';
import AlgebraTileSimulator from '@/components/AlgebraTileSimulator';
import ParabolaCharacteristicsModule from '@/components/ParabolaCharacteristicsModule';

function findSubjectBySimType(type: string): { slug: string; name: string } | null {
  for (const subject of SUBJECTS) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        if (topic.simulationType === type) {
          return { slug: subject.slug, name: subject.name };
        }
      }
    }
  }
  return null;
}

export default function SimulationPage() {
  const { type } = useParams();
  const subject = findSubjectBySimType(type as string);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        {subject ? (
          <Link
            href={`/subject/${subject.slug}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke {subject.name}
          </Link>
        ) : (
          <button onClick={() => window.history.back()} className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Modul
          </button>
        )}

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
        ) : type === 'linear-equations' ? (
          <LinearEquationsModule />
        ) : type === 'inequalities' ? (
          <InequalitiesModule />
        ) : type === 'elimination' ? (
          <EliminationModule />
        ) : type === 'quadratic-factoring' ? (
          <QuadraticFactoringModule />
        ) : type === 'parabola' ? (
          <ParabolaModule />
        ) : type === 'ball-trajectory' ? (
          <BallTrajectoryModule />
        ) : type === 'factoring-animation' ? (
          <FactoringAnimationModule />
        ) : type === 'complete-square' ? (
          <CompleteSquareModule />
        ) : type === 'discriminant' ? (
          <DiscriminantModule />
        ) : type === 'algebra-tile-simulator' ? (
          <AlgebraTileSimulator />
        ) : type === 'parabola-characteristics' ? (
          <ParabolaCharacteristicsModule />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <h2 className="text-2xl font-bold">Simulasi &ldquo;{type}&rdquo; dalam pengembangan.</h2>
          </div>
        )}
      </main>
    </div>
  );
}
