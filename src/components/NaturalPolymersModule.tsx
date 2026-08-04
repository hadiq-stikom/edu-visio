'use client';

import React, { useState } from 'react';
import { BookOpen, Star, RefreshCw, X, ChevronDown, ChevronUp, Leaf, Trees, Shell, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

type NaturalPolymer = {
  id: string;
  name: string;
  icon: React.ReactNode;
  polymerName: string;
  monomerName: string;
  source: string;
  description: string;
  color: string;
};

const ITEMS: NaturalPolymer[] = [
  {
    id: 'karet',
    name: 'Getah Karet (Lateks)',
    icon: <Trees className="w-12 h-12 text-amber-600" />,
    polymerName: 'Poliisoprena',
    monomerName: 'Isoprena',
    source: 'Pohon Karet (Hevea brasiliensis)',
    description: 'Karet alam memiliki sifat sangat elastis karena rantai polimernya berstruktur ikatan rangkap cis yang terlipat (amorf). Biasanya divulkanisasi (ditambah belerang) agar menjadi karet ban yang kuat.',
    color: 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/20'
  },
  {
    id: 'kapas',
    name: 'Kapas & Kayu',
    icon: <Leaf className="w-12 h-12 text-emerald-600" />,
    polymerName: 'Selulosa',
    monomerName: 'Beta-Glukosa',
    source: 'Dinding sel tumbuhan',
    description: 'Selulosa adalah polimer alam yang paling melimpah di bumi. Rantainya sangat lurus dan kaku karena ikatan beta-glukosida. Manusia tidak bisa mencerna selulosa (sebagai serat pangan).',
    color: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20'
  },
  {
    id: 'pati',
    name: 'Singkong & Kentang',
    icon: <Shell className="w-12 h-12 text-yellow-600" />,
    polymerName: 'Amilum (Pati)',
    monomerName: 'Alfa-Glukosa',
    source: 'Umbi-umbian dan biji-bijian',
    description: 'Amilum berfungsi sebagai cadangan makanan pada tumbuhan. Rantainya cenderung melingkar (heliks) atau bercabang. Manusia dapat mencerna amilum menjadi glukosa sebagai sumber energi utama.',
    color: 'border-yellow-200 bg-yellow-50 dark:border-yellow-900/50 dark:bg-yellow-900/20'
  }
];

export default function NaturalPolymersModule() {
  const { addScore } = useUser();
  const [selectedItem, setSelectedItem] = useState<NaturalPolymer | null>(null);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [exploredItems, setExploredItems] = useState<Set<string>>(new Set());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const handleSelect = (item: NaturalPolymer) => {
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
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-lime-100 text-lime-700 dark:bg-lime-900/40 dark:text-lime-400 text-xs font-bold uppercase tracking-wider mb-3">
          Jelajah Alam
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Polimer Alam
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Jauh sebelum manusia menciptakan plastik, alam telah menciptakan makromolekul luar biasa yang menopang kehidupan. Mari eksplorasi polimer yang disediakan oleh alam sekitar kita!
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={() => setShowTheoryModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-lime-50 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400 text-sm font-semibold rounded-lg hover:bg-lime-100 dark:hover:bg-lime-900/50 transition-colors"
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
            <BookOpen className="h-6 w-6 text-lime-500" /> Contoh Soal & Pembahasan
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full mb-3">SOAL 1</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa perbedaan utama antara amilum (pati) dan selulosa, padahal keduanya berasal dari monomer yang sama (glukosa)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-lime-600 dark:text-lime-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Perbedaannya terletak pada jenis ikatan antar monomernya. Amilum terbentuk dari <strong>$\alpha$-glukosa</strong> yang bentuknya lebih bercabang/melingkar, sehingga mudah dicerna. Selulosa terbentuk dari ikatan <strong>$\beta$-glukosa</strong> yang rantainya lurus sejajar membentuk serat kuat (kayu/kapas) dan tidak bisa dicerna enzim amilase manusia.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 text-xs font-bold rounded-full mb-3">SOAL 2</span>
              <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">
                Apa tujuan utama proses Vulkanisasi pada karet alam (poliisoprena)?
              </p>
              <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-bold text-lime-600 dark:text-lime-400 mb-2">Pembahasan:</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Karet alam mentah terlalu lembek dan lengket saat panas. Vulkanisasi adalah penambahan <strong>belerang (sulfur)</strong> yang akan membentuk ikatan silang (cross-link) antar rantai poliisoprena, sehingga karet menjadi kuat, elastis, tahan panas, dan cocok untuk ban kendaraan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
         <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-lime-600/95 dark:bg-lime-950/95 backdrop-blur-sm animate-in zoom-in duration-300 p-6 text-center">
           <Star className="w-20 h-20 text-yellow-300 fill-yellow-300 mb-4 drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]" />
           <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">Ahli Biopolimer!</h3>
           <div className="bg-lime-800/50 dark:bg-lime-900/80 border border-lime-400/50 p-4 rounded-xl text-lime-50 max-w-md">
             <p className="text-sm leading-relaxed mb-2">
               Alam sangat luar biasa! Dari monomer glukosa saja, alam bisa membuat cadangan makanan lembut (Pati) hingga batang pohon yang kokoh berdiri ratusan tahun (Selulosa). Semua tergantung pada cara penyusunannya.
             </p>
             <span className="text-lime-200 font-black text-xl drop-shadow-sm">+100 Poin</span>
           </div>
           <button 
             onClick={() => setShowSuccess(false)}
             className="mt-6 px-6 py-2.5 bg-white text-lime-700 rounded-xl font-bold hover:bg-lime-50 transition-colors"
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
                     ? 'border-lime-500 bg-lime-50 dark:bg-lime-900/20 shadow-md transform scale-[1.02]' 
                     : 'border-gray-200 dark:border-gray-700 hover:border-lime-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
             >
                <div className={`p-4 rounded-full border ${item.color}`}>
                   {item.icon}
                </div>
                <div>
                   <h3 className="font-bold text-gray-900 dark:text-white text-xl">{item.name}</h3>
                   <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs font-bold text-lime-600 dark:text-lime-400 bg-lime-100 dark:bg-lime-900/40 px-2 py-1 rounded border border-lime-200 dark:border-lime-800">
                         {item.polymerName}
                      </span>
                      {exploredItems.has(item.id) && (
                         <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-1 rounded">
                            Telah Dieksplorasi
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
                      <h3 className="font-bold text-2xl text-gray-900 dark:text-white">{selectedItem.polymerName}</h3>
                      <p className="text-gray-500 dark:text-gray-400 font-mono font-bold mt-1">
                         Dari: {selectedItem.source}
                      </p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                      <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-2">
                         <Sparkles className="w-5 h-5" /> Monomer Penyusun
                      </h4>
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-lg">
                         n ({selectedItem.monomerName})
                      </div>
                   </div>
                   
                   <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-2">
                         <BookOpen className="w-5 h-5" /> Karakteristik & Sifat
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                         {selectedItem.description}
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <Leaf className="w-16 h-16 text-gray-400 mb-4" />
                <p className="font-bold text-gray-500 max-w-xs">Pilih salah satu sumber daya alam di samping untuk mempelajari struktur polimernya.</p>
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
                <BookOpen className="h-5 w-5 text-lime-500" /> Polimer Alam
              </h3>
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-5 text-sm text-gray-600 dark:text-gray-300 max-h-[70vh] overflow-y-auto">
              <p>Polimer alam adalah polimer yang telah tersedia secara alami di alam tanpa perlu disintesis di laboratorium oleh manusia.</p>
              
              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Polisakarida (Karbohidrat Kompleks)</h4>
                <p>Polisakarida terbentuk dari polimerisasi kondensasi molekul-molekul monosakarida (gula sederhana seperti glukosa).</p>
                <ul className="list-disc pl-5 mt-1 text-xs">
                  <li><strong>Amilum/Pati:</strong> Sumber energi manusia (beras, gandum).</li>
                  <li><strong>Selulosa:</strong> Pembentuk struktur kayu dan kapas (kertas, baju).</li>
                  <li><strong>Glikogen:</strong> Cara tubuh manusia dan hewan menyimpan cadangan gula di otot dan hati.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2 text-base">Karet Alam</h4>
                <p>Dihasilkan dari sadapan getah pohon karet. Monomer penyusunnya adalah isoprena (2-metil-1,3-butadiena). Karet alam bersifat termoplastik pada suhu tertentu, dan menjadi lengket jika kepanasan. Proses <strong>Vulkanisasi</strong> sangat diperlukan untuk mengeraskannya menjadi ban kendaraan.</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex justify-end">
              <button 
                onClick={() => setShowTheoryModal(false)}
                className="px-5 py-2 bg-lime-600 hover:bg-lime-700 text-white font-semibold rounded-lg transition-colors"
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
