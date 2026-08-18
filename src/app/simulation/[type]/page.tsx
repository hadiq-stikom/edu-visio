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
import FunctionTransformationModule from '@/components/FunctionTransformationModule';
import ParentFunctionsModule from '@/components/ParentFunctionsModule';
import CircleSectorsModule from '@/components/CircleSectorsModule';
import CombinatoricsModule from '@/components/CombinatoricsModule';
import MultiplicationRuleModule from '@/components/MultiplicationRuleModule';
import ProbabilityModule from '@/components/ProbabilityModule';
import CoulombLawModule from '@/components/CoulombLawModule';
import CapacitorModule from '@/components/CapacitorModule';
import ElectricFieldModule from '@/components/ElectricFieldModule';
import OhmLawModule from '@/components/OhmLawModule';
import ResistorCircuitModule from '@/components/ResistorCircuitModule';
import KirchhoffModule from '@/components/KirchhoffModule';
import LorentzForceModule from '@/components/LorentzForceModule';
import MagneticInductionModule from '@/components/MagneticInductionModule';
import GGLInductionModule from '@/components/GGLInductionModule';
import GeneratorTransformerModule from '@/components/GeneratorTransformerModule';
import ACEquationRModule from '@/components/ACEquationRModule';
import RLCSeriesModule from '@/components/RLCSeriesModule';
import ACResonancePowerModule from '@/components/ACResonancePowerModule';
import EMWaveSpectrumModule from '@/components/EMWaveSpectrumModule';
import EMEnergyRadiationModule from '@/components/EMEnergyRadiationModule';
import EMApplicationsModule from '@/components/EMApplicationsModule';
import SemiconductorBasicsModule from '@/components/SemiconductorBasicsModule';
import LogicGatesModule from '@/components/LogicGatesModule';
import TimeDilationModule from '@/components/TimeDilationModule';
import RelativisticVelocityModule from '@/components/RelativisticVelocityModule';
import BlackbodyRadiationModule from '@/components/BlackbodyRadiationModule';
import PhotoelectricEffectModule from '@/components/PhotoelectricEffectModule';
import ComptonEffectModule from '@/components/ComptonEffectModule';
import AcidBaseModule from '@/components/AcidBaseModule';
import PhStrengthModule from '@/components/PhStrengthModule';
import BufferTitrationModule from '@/components/BufferTitrationModule';
import ColligativeModule from '@/components/ColligativeModule';
import ColloidModule from '@/components/ColloidModule';
import ElectrolyteModule from '@/components/ElectrolyteModule';
import RedoxModule from '@/components/RedoxModule';
import VoltaicCellModule from '@/components/VoltaicCellModule';
import StandardPotentialModule from '@/components/StandardPotentialModule';
import ElectrochemAppModule from '@/components/ElectrochemAppModule';
import FunctionalGroupsModule from '@/components/FunctionalGroupsModule';
import OrganicReactionsModule from '@/components/OrganicReactionsModule';
import CarbonChainModule from '@/components/CarbonChainModule';
import IupacNomenclatureModule from '@/components/IupacNomenclatureModule';
import OrganicImpactModule from '@/components/OrganicImpactModule';
import PolymerizationModule from '@/components/PolymerizationModule';
import PolymerStructureModule from '@/components/PolymerStructureModule';
import PolymerTypesModule from '@/components/PolymerTypesModule';
import PolymerPropertiesModule from '@/components/PolymerPropertiesModule';
import PlasticDegradationModule from '@/components/PlasticDegradationModule';
import NaturalPolymersModule from '@/components/NaturalPolymersModule';
import BiopolymersModule from '@/components/BiopolymersModule';
import XRayModule from '@/components/XRayModule';
import MassDefectModule from '@/components/MassDefectModule';
import RadioactivityModule from '@/components/RadioactivityModule';
import NuclearReactionModule from '@/components/NuclearReactionModule';
import ArabicSportsModule from '@/components/ArabicSportsModule';
import ArabicYouthModule from '@/components/ArabicYouthModule';
import ArabicPoetryModule from '@/components/ArabicPoetryModule';
import IslamicCivModule from '@/components/IslamicCivModule';
import UniversityStudyModule from '@/components/UniversityStudyModule';

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
        ) : type === 'parent-functions' ? (
          <ParentFunctionsModule />
        ) : type === 'translation-reflection' ? (
          <FunctionTransformationModule mode="translation-reflection" />
        ) : type === 'dilation-rotation' ? (
          <FunctionTransformationModule mode="dilation-rotation" />
        ) : type === 'combined-transformation' ? (
          <FunctionTransformationModule mode="combined-transformation" />
        ) : type === 'circle-arc' ? (
          <CircleSectorsModule mode="arc" />
        ) : type === 'circle-sector' ? (
          <CircleSectorsModule mode="area" />
        ) : type === 'circle-combined' ? (
          <CircleSectorsModule mode="combined" />
        ) : type === 'multiplication-rule' ? (
          <MultiplicationRuleModule />
        ) : type === 'combinatorics' ? (
          <CombinatoricsModule />
        ) : type === 'probability-basic' ? (
          <ProbabilityModule mode="basic" />
        ) : type === 'probability-compound' ? (
          <ProbabilityModule mode="compound" />
        ) : type === 'coulomb-law' ? (
          <CoulombLawModule />
        ) : type === 'electric-field' ? (
          <ElectricFieldModule />
        ) : type === 'capacitor-circuit' ? (
          <CapacitorModule mode="circuit" />
        ) : type === 'capacitor-energy' ? (
          <CapacitorModule mode="energy" />
        ) : type === 'ohm-law' ? (
          <OhmLawModule />
        ) : type === 'resistor-circuit' ? (
          <ResistorCircuitModule />
        ) : type === 'kirchhoff-basic' ? (
          <KirchhoffModule mode="basic" />
        ) : type === 'kirchhoff-complex' ? (
          <KirchhoffModule mode="complex" />
        ) : type === 'lorentz-force' ? (
          <LorentzForceModule />
        ) : type === 'magnetic-induction' ? (
          <MagneticInductionModule />
        ) : type === 'ggl-induksi' ? (
          <GGLInductionModule />
        ) : type === 'generator-transformer' ? (
          <GeneratorTransformerModule />
        ) : type === 'ac-equation-r' ? (
          <ACEquationRModule />
        ) : type === 'rlc-series' ? (
          <RLCSeriesModule />
        ) : type === 'ac-resonance-power' ? (
          <ACResonancePowerModule />
        ) : type === 'em-spectrum' ? (
          <EMWaveSpectrumModule />
        ) : type === 'em-energy-radiation' ? (
          <EMEnergyRadiationModule />
        ) : type === 'em-applications' ? (
          <EMApplicationsModule />
        ) : type === 'semiconductor-basics' ? (
          <SemiconductorBasicsModule />
        ) : type === 'logic-gates' ? (
          <LogicGatesModule />
        ) : type === 'time-dilation' ? (
          <TimeDilationModule />
        ) : type === 'relativistic-velocity' ? (
          <RelativisticVelocityModule />
        ) : type === 'blackbody-radiation' ? (
          <BlackbodyRadiationModule />
        ) : type === 'photoelectric-effect' ? (
          <PhotoelectricEffectModule />
        ) : type === 'compton-effect' ? (
          <ComptonEffectModule />
        ) : type === 'x-ray-tube' ? (
          <XRayModule />
        ) : type === 'mass-defect' ? (
          <MassDefectModule />
        ) : type === 'radioactivity' ? (
          <RadioactivityModule />
        ) : type === 'nuclear-reaction' ? (
          <NuclearReactionModule />
        ) : type === 'acid-base' ? (
          <AcidBaseModule />
        ) : type === 'ph-strength' ? (
          <PhStrengthModule />
        ) : type === 'buffer-titration' ? (
          <BufferTitrationModule />
        ) : type === 'colligative' ? (
          <ColligativeModule />
        ) : type === 'colloid' ? (
          <ColloidModule />
        ) : type === 'electrolyte' ? (
          <ElectrolyteModule />
        ) : type === 'redox' ? (
          <RedoxModule />
        ) : type === 'voltaic-cell' ? (
          <VoltaicCellModule />
        ) : type === 'standard-potential' ? (
          <StandardPotentialModule />
        ) : type === 'electrochem-app' ? (
          <ElectrochemAppModule />
        ) : type === 'functional-groups' ? (
          <FunctionalGroupsModule />
        ) : type === 'organic-reactions' ? (
          <OrganicReactionsModule />
        ) : type === 'carbon-chain' ? (
          <CarbonChainModule />
        ) : type === 'iupac-nomenclature' ? (
          <IupacNomenclatureModule />
        ) : type === 'organic-impact' ? (
          <OrganicImpactModule />
        ) : type === 'polymerization' ? (
          <PolymerizationModule />
        ) : type === 'polymer-structure' ? (
          <PolymerStructureModule />
        ) : type === 'polymer-types' ? (
          <PolymerTypesModule />
        ) : type === 'polymer-properties' ? (
          <PolymerPropertiesModule />
        ) : type === 'plastic-degradation' ? (
          <PlasticDegradationModule />
        ) : type === 'natural-polymers' ? (
          <NaturalPolymersModule />
        ) : type === 'biopolymers' ? (
          <BiopolymersModule />
        ) : type === 'arabic-sports' ? (
          <ArabicSportsModule />
        ) : type === 'arabic-youth' ? (
          <ArabicYouthModule />
        ) : type === 'arabic-poetry' ? (
          <ArabicPoetryModule />
        ) : type === 'islamic-civ' ? (
          <IslamicCivModule />
        ) : type === 'university-study' ? (
          <UniversityStudyModule />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
            <h2 className="text-2xl font-bold">Simulasi &ldquo;{type}&rdquo; dalam pengembangan.</h2>
          </div>
        )}
      </main>
    </div>
  );
}
