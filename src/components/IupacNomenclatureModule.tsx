'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Level = {
  id: string;
  name: string;
  moleculeDisplay: React.ReactNode;
  step1Options: string[];
  step1Answer: string; // Longest chain
  step2Options: string[];
  step2Answer: string; // Branch
  step3Options: string[];
  step3Answer: string; // Final Name
  explanation: string;
};

const LEVELS: Level[] = [
  {
    id: 'lvl1',
    name: 'Senyawa 1',
    moleculeDisplay: (
      <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-center text-slate-800 dark:text-slate-200 leading-10">
         CH₃ - CH - CH₂ - CH₃<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CH₃
      </div>
    ),
    step1Options: ['Propana (3 C)', 'Butana (4 C)', 'Pentana (5 C)'],
    step1Answer: 'Butana (4 C)',
    step2Options: ['Satu gugus Metil (-CH₃)', 'Satu gugus Etil (-C₂H₅)', 'Dua gugus Metil'],
    step2Answer: 'Satu gugus Metil (-CH₃)',
    step3Options: ['2-metilbutana', '3-metilbutana', '2-etilpropana'],
    step3Answer: '2-metilbutana',
    explanation: 'Rantai terpanjang terdiri dari 4 atom C (butana). Penomoran dimulai dari kiri agar cabang mendapat nomor terkecil (nomor 2). Cabangnya adalah metil (-CH₃). Jadi namanya 2-metilbutana.'
  },
  {
    id: 'lvl2',
    name: 'Senyawa 2',
    moleculeDisplay: (
      <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-center text-slate-800 dark:text-slate-200 leading-10">
         CH₃ - CH₂ - CH - CH₂ - CH₃<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CH₂<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CH₃
      </div>
    ),
    step1Options: ['Butana (4 C)', 'Pentana (5 C)', 'Heksana (6 C)'],
    step1Answer: 'Pentana (5 C)',
    step2Options: ['Metil (-CH₃)', 'Etil (-C₂H₅)', 'Propil (-C₃H₇)'],
    step2Answer: 'Etil (-C₂H₅)',
    step3Options: ['3-metilheksana', '3-etilpentana', '2-etilpentana'],
    step3Answer: '3-etilpentana',
    explanation: 'Rantai terpanjang berjumlah 5 atom C (pentana) secara horizontal. Cabangnya adalah etil (-CH₂-CH₃) yang terikat pada karbon nomor 3.'
  }
];

export default function IupacNomenclatureModule() {
  const { addScore } = useUser();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const level = LEVELS[currentLevelIndex];
  
  // Game state
  const [step, setStep] = useState(1); // 1, 2, 3, or 4 (finished)
  const [feedback, setFeedback] = useState<{msg: string, isError: boolean} | null>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleSelectOption = (option: string) => {
    setFeedback(null);
    if (step === 1) {
      if (option === level.step1Answer) setStep(2);
      else setFeedback({ msg: 'Salah. Cari rantai C terpanjang yang bersambung tak terputus.', isError: true });
    } else if (step === 2) {
      if (option === level.step2Answer) setStep(3);
      else setFeedback({ msg: 'Salah. Perhatikan jenis gugus alkil yang menjadi cabang.', isError: true });
    } else if (step === 3) {
      if (option === level.step3Answer) {
        setStep(4); // Finished level
      }
      else setFeedback({ msg: 'Salah. Ingat aturan penomoran cabang harus sekecil mungkin.', isError: true });
    }
  };

  const nextLevel = () => {
    if (currentLevelIndex < LEVELS.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
      setStep(1);
      setFeedback(null);
    } else {
      // Completed all
      if (!showSuccess) {
        setShowSuccess(true);
        addScore(100);
      }
    }
  };

  const resetAll = () => {
    setCurrentLevelIndex(0);
    setStep(1);
    setFeedback(null);
    setShowSuccess(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          Teka-Teki Kimia
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Tata Nama IUPAC
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Selesaikan puzzle untuk memberi nama yang benar pada senyawa karbon bercabang. Ikuti tahapan standarnya: temukan rantai utama, identifikasi cabang, lalu satukan menjadi nama lengkap!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 text-sm font-semibold rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
          >
            <BookOpen className="h-4 w-4" /> Aturan IUPAC
          </button>
          <button 
            onClick={() => setShowExamples(!showExamples)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {showExamples ? 'Sembunyikan Contoh Soal' : 'Tampilkan Contoh Soal'}
            {showExamples ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Examples Section */}
      {showExamples && (
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 text-left">
            <BookOpen className="h-6 w-6 text-indigo-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Nama IUPAC untuk CH₃-CH(CH₃)-CH(CH₃)-CH₃ adalah...
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Rantai terpanjangnya ada 4 atom C (butana). Terdapat dua cabang metil pada posisi nomor 2 dan 3. Karena cabangnya sama, digunakan awalan "di". Jadi namanya <strong>2,3-dimetilbutana</strong>.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Jika ada cabang etil dan metil terikat pada rantai yang sama, manakah yang disebutkan lebih dahulu?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Berdasarkan aturan IUPAC, jika ada lebih dari satu jenis cabang/substituen, penyebutannya harus diurutkan secara <strong>alfabetis</strong>. Huruf "e" pada etil lebih dulu dari "m" pada metil. Jadi, etil disebutkan terlebih dahulu.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Molecule Display */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          
          {showSuccess && (
            <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-indigo-600/95 dark:bg-indigo-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
              <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
              <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Ahli Nomenklatur!</h3>
              <div className="bg-indigo-800/50 dark:bg-indigo-900/80 border border-indigo-400/50 p-4 rounded-xl text-indigo-50 max-w-md">
                <p className="text-sm leading-relaxed mb-2">
                  Anda telah berhasil menamai semua senyawa karbon dengan tepat mengikuti langkah-langkah standar IUPAC.
                </p>
                <span className="text-indigo-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
              </div>
              <button 
                onClick={resetAll}
                className="mt-6 px-6 py-2.5 bg-white text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          <div className="text-center w-full relative z-10">
             <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded-full font-bold text-xs mb-8">
               Tantangan {currentLevelIndex + 1} dari {LEVELS.length}
             </div>
             
             <div className="bg-slate-50 dark:bg-slate-950 p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner overflow-x-auto">
                {level.moleculeDisplay}
             </div>
          </div>
        </div>

        {/* Puzzle Controls */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl flex flex-col justify-center">
          
          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Penyelesaian</h3>

          {/* Timeline / Progress */}
          <div className="flex justify-between mb-8 relative">
             <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0"></div>
             
             <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>1</div>
                <span className="text-[10px] uppercase font-bold text-gray-500">Rantai Utama</span>
             </div>
             <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>2</div>
                <span className="text-[10px] uppercase font-bold text-gray-500">Cabang</span>
             </div>
             <div className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>3</div>
                <span className="text-[10px] uppercase font-bold text-gray-500">Penamaan</span>
             </div>
          </div>

          {/* Active Question */}
          <div className="min-h-[160px]">
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4">
                 <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">Langkah 1: Identifikasi rantai karbon terpanjang.</p>
                 <div className="space-y-2">
                   {level.step1Options.map((opt, i) => (
                     <button key={i} onClick={() => handleSelectOption(opt)} className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-gray-800 dark:text-gray-200">
                       {opt}
                     </button>
                   ))}
                 </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-4">
                 <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">Langkah 2: Identifikasi gugus cabang (alkil).</p>
                 <div className="space-y-2">
                   {level.step2Options.map((opt, i) => (
                     <button key={i} onClick={() => handleSelectOption(opt)} className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-gray-800 dark:text-gray-200">
                       {opt}
                     </button>
                   ))}
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-4">
                 <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">Langkah 3: Satukan dengan penomoran cabang terkecil.</p>
                 <div className="space-y-2">
                   {level.step3Options.map((opt, i) => (
                     <button key={i} onClick={() => handleSelectOption(opt)} className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-medium text-gray-800 dark:text-gray-200 font-bold">
                       {opt}
                     </button>
                   ))}
                 </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in duration-300">
                 <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col items-center text-center">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mb-2" />
                    <h4 className="font-bold text-emerald-700 dark:text-emerald-400 text-lg mb-2">Benar: {level.step3Answer}</h4>
                    <p className="text-sm text-emerald-600 dark:text-emerald-500">{level.explanation}</p>
                 </div>
                 
                 <button 
                   onClick={nextLevel}
                   className="mt-6 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
                 >
                   {currentLevelIndex < LEVELS.length - 1 ? 'Soal Berikutnya' : 'Selesaikan'} <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            )}
            
            {feedback && (
               <div className={`mt-4 p-3 rounded-xl text-sm font-medium animate-in fade-in ${feedback.isError ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'}`}>
                 {feedback.msg}
               </div>
            )}
          </div>

        </div>
      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" /> Aturan IUPAC
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Langkah-Langkah Penamaan</h4>
                <ol className="list-decimal pl-5 mt-2 space-y-2">
                  <li><strong>Tentukan Rantai Utama:</strong> Cari rantai atom karbon terpanjang yang bersambung tak terputus. Namanya menjadi nama dasar alkana.</li>
                  <li><strong>Identifikasi Cabang (Alkil):</strong> Gugus karbon yang tidak termasuk rantai utama disebut cabang (contoh: Metil -CH₃, Etil -C₂H₅).</li>
                  <li><strong>Penomoran Rantai Utama:</strong> Beri nomor rantai utama dari ujung sedemikian rupa sehingga cabang mendapat nomor sekecil mungkin.</li>
                  <li><strong>Urutan Penulisan:</strong> Tulis nomor letak cabang, nama cabang, lalu nama rantai utama. <br/><em>Contoh: 2-metilbutana.</em></li>
                  <li><strong>Aturan Tambahan:</strong> Jika ada lebih dari satu cabang yang sama, gunakan awalan di-, tri-, tetra-, dst. Jika cabangnya berbeda jenis, urutkan sesuai abjad (Etil sebelum Metil).</li>
                </ol>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
