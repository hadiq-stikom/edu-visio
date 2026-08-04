'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Droplet, Wind, Sparkles, ShieldAlert } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type Item = {
  id: string;
  name: string;
  icon: React.ReactNode;
  compoundName: string;
  formula: string;
  group: string;
  positive: string;
  negative: string;
  color: string;
};

const ITEMS: Item[] = [
  {
    id: 'sanitizer',
    name: 'Hand Sanitizer',
    icon: <Droplet className="w-12 h-12 text-blue-500" />,
    compoundName: 'Etanol (Alkohol)',
    formula: 'C₂H₅OH',
    group: 'Alkohol (-OH)',
    positive: 'Membunuh bakteri dan virus dengan mendenaturasi protein mereka (antiseptik).',
    negative: 'Sangat mudah terbakar. Jika terminum dapat menyebabkan keracunan alkohol, kerusakan hati, hingga kematian.',
    color: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20'
  },
  {
    id: 'remover',
    name: 'Pembersih Cat Kuku',
    icon: <Sparkles className="w-12 h-12 text-pink-500" />,
    compoundName: 'Aseton (Propanon)',
    formula: 'CH₃COCH₃',
    group: 'Keton (-CO-)',
    positive: 'Pelarut polar organik yang sangat baik untuk melarutkan cat kuku, lem, dan bahan sintetis.',
    negative: 'Uapnya dapat menyebabkan iritasi saluran pernapasan. Sangat mudah menguap dan terbakar.',
    color: 'border-pink-200 bg-pink-50 dark:border-pink-900/50 dark:bg-pink-900/20'
  },
  {
    id: 'formalin',
    name: 'Pengawet Preparat',
    icon: <Wind className="w-12 h-12 text-purple-500" />,
    compoundName: 'Formaldehid (Metanal)',
    formula: 'HCHO',
    group: 'Aldehid (-CHO)',
    positive: 'Sangat efektif mengawetkan spesimen biologi dan mencegah pembusukan (Formalin).',
    negative: 'Karsinogenik (penyebab kanker). Dilarang keras digunakan sebagai pengawet makanan.',
    color: 'border-purple-200 bg-purple-50 dark:border-purple-900/50 dark:bg-purple-900/20'
  }
];

export default function OrganicImpactModule() {
  const { addScore } = useUser();
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [exploredItems, setExploredItems] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setExploredItems(prev => {
      const next = new Set(prev).add(item.id);
      if (next.size === ITEMS.length && !showSuccess) {
        setTimeout(() => {
          setShowSuccess(true);
          addScore(100);
        }, 1000);
      }
      return next;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 mb-20">
      
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-3">
          Eksplorasi Kehidupan
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Manfaat & Dampak Senyawa
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Senyawa karbon organik ada di sekeliling kita. Pilih benda-benda di bawah ini untuk melihat senyawa aktif yang terkandung di dalamnya, manfaat positifnya, serta potensi bahayanya!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 text-sm font-semibold rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
          >
            <BookOpen className="h-4 w-4" /> Baca Teori Singkat
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
            <BookOpen className="h-6 w-6 text-teal-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Senyawa turunan alkana manakah yang sering digunakan sebagai obat bius medis, namun penggunaannya kini dibatasi karena berisiko merusak hati?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Senyawa tersebut adalah <strong>Kloroform (CHCl₃)</strong>. Kloroform pernah populer sebagai anestesi, tetapi uapnya sangat beracun dan dapat menyebabkan kerusakan organ jika dosisnya tidak tepat.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Mengapa penambahan etanol pada bensin (membuat gasohol) dianggap memiliki dampak lingkungan yang lebih baik?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-teal-600 dark:text-teal-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Etanol dapat diproduksi dari sumber terbarukan (fermentasi tanaman seperti tebu/jagung) dan pembakarannya lebih bersih, sehingga <strong>mengurangi emisi gas karbon monoksida</strong> serta polutan lainnya dibandingkan bensin murni.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-teal-600/95 dark:bg-teal-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
           <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
           <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Wawasan Luas!</h3>
           <div className="bg-teal-800/50 dark:bg-teal-900/80 border border-teal-400/50 p-4 rounded-xl text-teal-50 max-w-md">
             <p className="text-sm leading-relaxed mb-2">
               Anda telah mempelajari manfaat sekaligus bahaya dari berbagai senyawa organik dalam kehidupan sehari-hari. Ingatlah untuk selalu menggunakan bahan kimia rumah tangga dengan bijak!
             </p>
             <span className="text-teal-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
           </div>
           <button 
             onClick={() => setShowSuccess(false)}
             className="mt-6 px-6 py-2.5 bg-white text-teal-700 rounded-xl font-bold hover:bg-teal-50 transition-colors"
           >
             Kembali
           </button>
         </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
           {ITEMS.map((item) => (
             <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center gap-6 text-left ${
                   selectedItem?.id === item.id 
                     ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-md transform scale-[1.02]' 
                     : 'border-gray-200 dark:border-gray-700 hover:border-teal-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
             >
                <div className={`p-4 rounded-full border ${item.color}`}>
                   {item.icon}
                </div>
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white text-xl">{item.name}</h3>
                   <div className="flex gap-2 mt-2">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/40 px-2 py-1 rounded">
                         {item.compoundName}
                      </span>
                      {exploredItems.has(item.id) && (
                         <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded">
                            Sudah Dibaca
                         </span>
                      )}
                   </div>
                </div>
             </button>
           ))}
        </div>

        {/* Details Panel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-xl min-h-[400px]">
           {selectedItem ? (
             <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                   <div className={`p-4 rounded-full border ${selectedItem.color}`}>
                      {selectedItem.icon}
                   </div>
                   <div>
                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white">{selectedItem.compoundName}</h3>
                      <p className="text-gray-500 dark:text-gray-400 font-mono font-bold mt-1">
                         {selectedItem.formula} | {selectedItem.group}
                      </p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-2">
                         <Star className="w-5 h-5" /> Manfaat Positif
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                         {selectedItem.positive}
                      </p>
                   </div>
                   
                   <div>
                      <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-2">
                         <ShieldAlert className="w-5 h-5" /> Dampak Negatif / Bahaya
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                         {selectedItem.negative}
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <Sparkles className="w-16 h-16 text-gray-400 mb-4" />
                <p className="font-bold text-gray-500">Pilih salah satu benda di samping untuk melihat detail senyawa organik di dalamnya.</p>
             </div>
           )}
        </div>

      </div>

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-teal-500" /> Senyawa Organik dalam Kehidupan
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <p>Senyawa karbon memiliki peranan yang tak terhitung jumlahnya dalam kehidupan manusia, baik dari segi industri, medis, maupun teknologi.</p>
              
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Senyawa Bermanfaat vs Beracun</h4>
                <p>Meski sangat bermanfaat, banyak senyawa organik yang bersifat toksik. Contohnya, <strong>Etanol</strong> dapat diminum pada kadar tertentu, tetapi <strong>Metanol</strong> (yang hanya berbeda 1 atom C) sangat beracun dan dapat menyebabkan kebutaan permanen hingga kematian bila tertelan.</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Polimer dan Lingkungan</h4>
                <p>Senyawa organik makromolekul, seperti plastik sintetik (polietilena, PVC), sangat kuat, murah, dan ringan. Namun, kestabilannya membuat plastik sangat sulit diuraikan oleh alam (non-biodegradable), menyebabkan krisis limbah global.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors"
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
