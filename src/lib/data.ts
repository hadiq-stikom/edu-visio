export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  hasSimulation: boolean;
  simulationType?: string;
}

export interface Chapter {
  id: string;
  title: string;
  iconName?: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  slug: string;
  name: string;
  category: 'MIPA' | 'IPS' | 'AGAMA' | 'Umum';
  description: string;
  iconName: string;
  colorTheme: {
    bg: string;
    text: string;
    badge: string;
    border: string;
  };
  chapters: Chapter[];
}

const colorThemes = {
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    border: 'hover:border-blue-500',
  },
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    border: 'hover:border-purple-500',
  },
  amber: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
    border: 'hover:border-amber-500',
  },
  teal: {
    bg: 'bg-teal-500/10 dark:bg-teal-500/20',
    text: 'text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
    border: 'hover:border-teal-500',
  },
  orange: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    text: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    border: 'hover:border-orange-500',
  },
  rose: {
    bg: 'bg-rose-500/10 dark:bg-rose-500/20',
    text: 'text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    border: 'hover:border-rose-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    text: 'text-cyan-600 dark:text-cyan-400',
    badge: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300',
    border: 'hover:border-cyan-500',
  },
};

export const SUBJECTS: Subject[] = [
  // ==========================================
  // MATEMATIKA
  // ==========================================
  {
    id: 'mtk-10', slug: 'matematika-10', name: 'Matematika', category: 'MIPA',
    description: 'Eksponen, barisan & deret, trigonometri, sistem persamaan, fungsi kuadrat, dan peluang.',
    iconName: 'Calculator', colorTheme: colorThemes.blue,
    chapters: [
      { id: 'mtk10-bab1', title: 'Bab 1: Eksponen', topics: [
        { id: 'mat-1-1', title: 'Definisi Eksponen', description: 'Visualisasi a^n sebagai perkalian berulang.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'exponent-definition' },
        { id: 'mat-1-2', title: 'Sifat-Sifat Eksponen', description: 'Hukum perkalian, pembagian, dan perpangkatan eksponen.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'exponent-properties' },
        { id: 'mat-1-3', title: 'Fungsi Eksponensial', description: 'Grafik dan sifat f(x) = a^x.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'exponential' },
        { id: 'mat-1-4', title: 'Bentuk Akar', description: 'Hubungan bentuk akar dengan eksponen.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'radical' },
        { id: 'mat-1-5', title: 'Aplikasi Kontekstual & Refleksi', description: 'Penerapan eksponen dalam kehidupan sehari-hari.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'mtk10-bab2', title: 'Bab 2: Barisan dan Deret', topics: [
        { id: 'mat-2-1', title: 'Barisan', description: 'Perbandingan barisan aritmetika dan geometri.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'sequence' },
        { id: 'mat-2-2', title: 'Deret', description: 'Pengantar konsep deret dan perbedaannya dengan barisan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'series-intro' },
        { id: 'mat-2-3', title: 'Deret Aritmetika', description: 'Simulasi akumulasi target hafalan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'series' },
        { id: 'mat-2-4', title: 'Deret Geometri', description: 'Efek bola salju penyebaran ilmu.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'charity' },
        { id: 'mat-2-5', title: 'Bunga', description: 'Investasi dan komparasi pertumbuhan bagi hasil.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'investment' },
      ]},
      { id: 'mtk10-bab3', title: 'Bab 3: Perbandingan Trigonometri', topics: [
        { id: 'mat-3-1', title: 'Perbandingan Trigonometri', description: 'Sinus, Cosinus, Tangen pada segitiga siku-siku.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'trigonometry' },
        { id: 'mat-3-2', title: 'Pemanfaatan Perbandingan Trigonometri', description: 'Mengukur tinggi gedung dari jarak jauh.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'building-height' },
      ]},
      { id: 'mtk10-bab4', title: 'Bab 4: Sistem Persamaan & Pertidaksamaan Linear', topics: [
        { id: 'mat-4-1', title: 'Sistem Persamaan Linear', description: 'Metode substitusi, eliminasi, dan determinan.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'linear-equations' },
        { id: 'mat-4-1b', title: 'Asisten Eliminasi SPL', description: 'Panduan langkah demi langkah.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'elimination' },
        { id: 'mat-4-2', title: 'Sistem Pertidaksamaan Linear', description: 'Daerah penyelesaian dan LP sederhana.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'inequalities' },
      ]},
      { id: 'mtk10-bab5', title: 'Bab 5: Persamaan dan Fungsi Kuadrat', topics: [
        { id: 'mat-5-1', title: 'Simulator Ubin Aljabar', description: 'Pemfaktoran persamaan kuadrat secara visual.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'algebra-tile-simulator' },
        { id: 'mat-5-2', title: 'Pemfaktoran Kuadrat', description: 'Animasi langkah pemfaktoran.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'factoring-animation' },
        { id: 'mat-5-3', title: 'Melengkapi Kuadrat', description: 'Visualisasi geometri melengkapi kuadrat.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'complete-square' },
        { id: 'mat-5-4', title: 'Diskriminan', description: 'Menentukan jumlah akar dari nilai D.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'discriminant' },
        { id: 'mat-5-5', title: 'Fungsi Kuadrat', description: 'Karakteristik parabola dan pengaruh koefisien.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'parabola-characteristics' },
        { id: 'mat-5-6', title: 'Lintasan Bola', description: 'Simulasi lintasan parabola dalam kehidupan nyata.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ball-trajectory' },
      ]},
      { id: 'mtk10-bab6', title: 'Bab 6: Representasi dan Interpretasi Data', topics: [
        { id: 'mat-6-1', title: 'Representasi Data', description: 'Tabel, diagram batang, garis, lingkaran.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'mat-6-2', title: 'Statistik Deskriptif', description: 'Mean, median, modus, standar deviasi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'mat-6-3', title: 'Representasi Data Lanjutan', description: 'Penyajian data kelompok dan ogive.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'mat-6-4', title: 'Proyek Analisis Data & Refleksi', description: 'Aplikasi analisis data pada kasus nyata.', duration: '30 Menit', difficulty: 'Sulit', hasSimulation: false },
      ]},
      { id: 'mtk10-bab7', title: 'Bab 7: Peluang', topics: [
        { id: 'mat-7-1', title: 'Distribusi Peluang', description: 'Ruang sampel dan distribusi frekuensi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'mat-7-2', title: 'Aturan Penjumlahan', description: 'Peluang kejadian saling lepas.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'mat-7-3', title: 'Aturan Perkalian', description: 'Peluang kejadian saling bebas.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'mat-7-4', title: 'Aplikasi Kontekstual & Refleksi', description: 'Penerapan peluang dalam kehidupan sehari-hari.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'mtk-11', slug: 'matematika-11', name: 'Matematika', category: 'MIPA',
    description: 'Fungsi komposisi, fungsi invers, dan matriks.',
    iconName: 'Calculator', colorTheme: colorThemes.blue,
    chapters: [
      { id: 'mtk11-bab1', title: 'Bab 1: Komposisi Fungsi dan Fungsi Invers', topics: [
        { id: 'mtk11-1-1', title: 'Fungsi Komposisi', description: 'Operasi dan sifat fungsi komposisi.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'mtk11-1-2', title: 'Fungsi Invers', description: 'Menentukan invers suatu fungsi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'mtk11-bab2', title: 'Bab 2: Matriks', topics: [
        { id: 'mtk11-2-1', title: 'Operasi Matriks', description: 'Penjumlahan, pengurangan, dan perkalian matriks.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'mtk11-2-2', title: 'Determinan & Invers', description: 'Matriks ordo 2x2 dan 3x3.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'mtk-12', slug: 'matematika-12', name: 'Matematika', category: 'MIPA',
    description: 'Transformasi fungsi, lingkaran, dan kombinatorik.',
    iconName: 'Calculator', colorTheme: colorThemes.blue,
    chapters: [
      { id: 'mtk12-bab1', title: 'Bab 1: Transformasi Fungsi', topics: [
        { id: 'mtk12-1-0', title: 'Apersepsi: Keluarga Fungsi Dasar', description: 'Mengenal bentuk-bentuk grafik fungsi sebelum diubah.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'parent-functions' },
        { id: 'mtk12-1-1', title: 'Translasi & Refleksi', description: 'Pergeseran dan pencerminan grafik fungsi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'translation-reflection' },
        { id: 'mtk12-1-2', title: 'Dilatasi & Rotasi', description: 'Perkalian dan perputaran grafik fungsi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'dilation-rotation' },
        { id: 'mtk12-1-3', title: 'Kombinasi Transformasi Fungsi', description: 'Gabungan beberapa transformasi pada fungsi.', duration: '30 Menit', difficulty: 'Sulit', hasSimulation: true, simulationType: 'combined-transformation' },
        { id: 'mtk12-1-4', title: 'Proyek Aplikasi', description: 'Penerapan transformasi fungsi dalam kehidupan nyata.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ball-trajectory' },
      ]},
      { id: 'mtk12-bab2', title: 'Bab 2: Busur dan Juring Lingkaran', topics: [
        { id: 'mtk12-2-1', title: 'Busur Lingkaran', description: 'Konsep dan perhitungan panjang busur.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'circle-arc' },
        { id: 'mtk12-2-2', title: 'Juring Lingkaran', description: 'Konsep dan perhitungan luas juring.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'circle-sector' },
        { id: 'mtk12-2-3', title: 'Hubungan Panjang Busur dan Luas Juring', description: 'Keterkaitan antara busur dan juring lingkaran.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'circle-combined' },
      ]},
      { id: 'mtk12-bab3', title: 'Bab 3: Kombinatorik', topics: [
        { id: 'mtk12-3-1', title: 'Aturan Pengisian Tempat', description: 'Aturan perkalian dasar dalam pencacahan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'multiplication-rule' },
        { id: 'mtk12-3-2', title: 'Permutasi', description: 'Penyusunan objek dengan memperhatikan urutan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'combinatorics' },
        { id: 'mtk12-3-3', title: 'Kombinasi', description: 'Pemilihan objek tanpa memperhatikan urutan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'combinatorics' },
        { id: 'mtk12-3-4', title: 'Peluang Suatu Kejadian & Majemuk', description: 'Konsep dasar peluang kejadian majemuk.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'probability-basic' },
        { id: 'mtk12-3-5', title: 'Peluang Kejadian Majemuk (Bebas & Bersyarat)', description: 'Peluang kejadian saling bebas dan bersyarat.', duration: '30 Menit', difficulty: 'Sulit', hasSimulation: true, simulationType: 'probability-compound' },
      ]},
    ],
  },

  // ==========================================
  // FISIKA
  // ==========================================
  {
    id: 'fis-10', slug: 'fisika-10', name: 'Fisika', category: 'MIPA',
    description: 'Kinematika gerak lurus, dinamika Newton, usaha & energi, dan gerak parabola.',
    iconName: 'Atom', colorTheme: colorThemes.purple,
    chapters: [
      { id: 'fis10-bab1', title: 'Bab 1: Kinematika', topics: [
        { id: 'fis10-1-1', title: 'Gerak Lurus Beraturan', description: 'Konsep kecepatan, perpindahan, dan grafik posisi-waktu.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'fis10-1-2', title: 'Gerak Lurus Berubah Beraturan', description: 'Konsep percepatan dan persamaan gerak GLBB.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis10-bab2', title: 'Bab 2: Dinamika & Newton', topics: [
        { id: 'fis10-2-1', title: 'Hukum Newton I', description: 'Kelembaman dan contoh aplikasi.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'fis10-2-2', title: 'Hukum Newton II', description: 'F = ma dan aplikasi pada benda di bidang miring.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis10-bab3', title: 'Bab 3: Usaha & Energi', topics: [
        { id: 'fis10-3-1', title: 'Usaha dan Daya', description: 'Konsep usaha, daya, dan efisiensi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'fis10-3-2', title: 'Energi Kinetik & Potensial', description: 'Konversi energi dan prinsip kekekalan energi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis10-bab4', title: 'Bab 4: Gerak Parabola', topics: [
        { id: 'fis10-4-1', title: 'Gerak Proyektil', description: 'Simulasi lemparan benda dengan variasi sudut dan kecepatan awal.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'projectile' },
      ]},
    ],
  },
  {
    id: 'fis-11', slug: 'fisika-11', name: 'Fisika', category: 'MIPA',
    description: 'Impuls & momentum, gerak melingkar, gravitasi, gelombang, dan harmonik sederhana.',
    iconName: 'Atom', colorTheme: colorThemes.purple,
    chapters: [
      { id: 'fis11-bab1', title: 'Bab 1: Impuls & Momentum', topics: [
        { id: 'fis11-1-1', title: 'Impuls dan Momentum', description: 'Konsep momentum, impuls, dan kekekalan momentum.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'fis11-1-2', title: 'Tumbukan', description: 'Tumbukan lenting sempurna, tidak lenting, dan sebagian lenting.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis11-bab2', title: 'Bab 2: Gerak Melingkar', topics: [
        { id: 'fis11-2-1', title: 'Kecepatan Sudut & Percepatan Sentripetal', description: 'Konsep sudut, perioda, dan frekuensi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis11-bab3', title: 'Bab 3: Gravitasi', topics: [
        { id: 'fis11-3-1', title: 'Hukum Newton Gravitasi', description: 'Gaya gravitasi antara dua benda massa.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'fis11-bab4', title: 'Bab 4: Gelombang & Harmonik', topics: [
        { id: 'fis11-4-1', title: 'Ayunan Bandul', description: 'Pengaruh panjang tali terhadap periode bandul.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'pendulum' },
        { id: 'fis11-4-2', title: 'Gelombang Berdiri', description: 'Pola simpul dan perut pada tali bergetar.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'fis-12', slug: 'fisika-12', name: 'Fisika', category: 'MIPA',
    description: 'Listrik, Kemagnetan, Relativitas, Fisika Kuantum, dan Fisika Inti (Kurikulum Merdeka).',
    iconName: 'Atom', colorTheme: colorThemes.purple,
    chapters: [
      { id: 'fis12-bab1', title: 'Bab 1: Listrik Statis', topics: [
        { id: 'fis12-1-1', title: 'Gaya Listrik & Hukum Coulomb', description: 'Hukum Coulomb dan gaya listrik sebagai besaran vektor.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'coulomb-law' },
        { id: 'fis12-1-2', title: 'Medan Listrik & Kapasitor', description: 'Medan listrik, garis gaya, dan kapasitor keping sejajar.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'electric-field' },
        { id: 'fis12-1-3', title: 'Rangkaian Kapasitor', description: 'Kapasitas ekivalen pada rangkaian seri dan paralel.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'capacitor-circuit' },
        { id: 'fis12-1-4', title: 'Energi Kapasitor', description: 'Energi tersimpan dalam kapasitor dan aplikasinya.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'capacitor-energy' },
      ]},
      { id: 'fis12-bab2', title: 'Bab 2: Listrik Arus Searah', topics: [
        { id: 'fis12-2-1', title: 'Arus, Hambatan & Hukum Ohm', description: 'Konsep arus, hambatan jenis, dan aplikasi Hukum Ohm.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'ohm-law' },
        { id: 'fis12-2-2', title: 'Rangkaian Listrik & Daya', description: 'Hambatan ekivalen seri-paralel dan daya listrik.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'resistor-circuit' },
        { id: 'fis12-2-3', title: 'Hukum Kirchhoff I dan II', description: 'Analisis loop tegangan dan arus percabangan.', duration: '3 JP', difficulty: 'Sulit', hasSimulation: true, simulationType: 'kirchhoff-basic' },
        { id: 'fis12-2-4', title: 'Rangkaian Majemuk', description: 'Penyelesaian rangkaian yang melibatkan banyak loop.', duration: '3 JP', difficulty: 'Sulit', hasSimulation: true, simulationType: 'kirchhoff-complex' },
      ]},
      { id: 'fis12-bab3', title: 'Bab 3: Kemagnetan', topics: [
        { id: 'fis12-3-1', title: 'Medan Magnet & Gaya Lorentz', description: 'Konsep medan magnet dan aturan tangan kanan gaya Lorentz.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'lorentz-force' },
        { id: 'fis12-3-2', title: 'Medan Magnet Induksi', description: 'Kawat lurus/melingkar, solenoida, dan motor listrik.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'magnetic-induction' },
        { id: 'fis12-3-3', title: 'GGL Induksi', description: 'Fluks magnet, Hukum Faraday, dan Hukum Lenz.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ggl-induksi' },
        { id: 'fis12-3-4', title: 'Generator & Transformator', description: 'Prinsip kerja generator dan efisiensi transformator.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'generator-transformer' },
      ]},
      { id: 'fis12-bab4', title: 'Bab 4: Arus Bolak-Balik', topics: [
        { id: 'fis12-4-1', title: 'Persamaan AC & Rangkaian R', description: 'Arus/tegangan AC, nilai efektif (RMS), dan puncak.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ac-equation-r' },
        { id: 'fis12-4-2', title: 'Rangkaian RLC Seri', description: 'Reaktansi indiktor, kapasitor, impedansi, dan diagram phasor.', duration: '3 JP', difficulty: 'Sulit', hasSimulation: true, simulationType: 'rlc-series' },
        { id: 'fis12-4-3', title: 'Resonansi & Daya AC', description: 'Frekuensi resonansi dan daya disipasi AC.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ac-resonance-power' },
      ]},
      { id: 'fis12-bab5', title: 'Bab 5: Gelombang Elektromagnetik', topics: [
        { id: 'fis12-5-1', title: 'Perambatan & Spektrum GEM', description: 'Sifat perambatan dan spektrum berdasarkan panjang gelombang.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'em-spectrum' },
        { id: 'fis12-5-2', title: 'Energi GEM & Bahaya Radiasi', description: 'Energi foton dan bahaya radiasi ionisasi.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'em-energy-radiation' },
        { id: 'fis12-5-3', title: 'Pemanfaatan Teknologi', description: 'Aplikasi jenis GEM di kehidupan dan industri.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'em-applications' },
      ]},
      { id: 'fis12-bab6', title: 'Bab 6: Sistem Elektronika', topics: [
        { id: 'fis12-6-1', title: 'Semikonduktor Dasar', description: 'Sifat semikonduktor, LED, Transistor, dan IC.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'semiconductor-basics' },
        { id: 'fis12-6-2', title: 'Prinsip Gerbang Logika', description: 'Tabel kebenaran untuk gerbang dasar (AND, OR, NOT).', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'logic-gates' },
      ]},
      { id: 'fis12-bab7', title: 'Bab 7: Relativitas', topics: [
        { id: 'fis12-7-1', title: 'Postulat Einstein & Dilatasi Waktu', description: 'Postulat relativitas dan efek dilatasi waktu.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'time-dilation' },
        { id: 'fis12-7-2', title: 'Penambahan Kecepatan', description: 'Penambahan kecepatan relativistik dan batas kecepatan cahaya.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'relativistic-velocity' },
      ]},
      { id: 'fis12-bab8', title: 'Bab 8: Gejala Kuantum', topics: [
        { id: 'fis12-8-1', title: 'Radiasi Benda Hitam & Konsep Foton', description: 'Kegagalan fisika klasik dan teori kuantum Planck.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'blackbody-radiation' },
        { id: 'fis12-8-2', title: 'Efek Fotolistrik', description: 'Pelepasan elektron, energi kinetik, dan fungsi kerja logam.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'photoelectric-effect' },
        { id: 'fis12-8-3', title: 'Efek Compton', description: 'Bukti dualisme gelombang-partikel cahaya.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'compton-effect' },
        { id: 'fis12-8-4', title: 'Sinar-X', description: 'Mekanisme dan aplikasi Sinar-X dalam kesehatan.', duration: '3 JP', difficulty: 'Mudah', hasSimulation: true, simulationType: 'x-ray-tube' },
      ]},
      { id: 'fis12-bab9', title: 'Bab 9: Fisika Inti & Radioaktivitas', topics: [
        { id: 'fis12-9-1', title: 'Defek Massa & Energi Ikat', description: 'Karakteristik inti atom dan aplikasi E=mc².', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'mass-defect' },
        { id: 'fis12-9-2', title: 'Radioaktivitas & Peluruhan', description: 'Peluruhan sinar radioaktif dan waktu paruh.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'radioactivity' },
        { id: 'fis12-9-3', title: 'Reaksi Inti', description: 'Reaksi fisi, fusi, dan pengelolaan energi nuklir.', duration: '3 JP', difficulty: 'Sedang', hasSimulation: true, simulationType: 'nuclear-reaction' },
      ]},
    ],
  },

  // ==========================================
  // KIMIA
  // ==========================================
  {
    id: 'kim-10', slug: 'kimia-10', name: 'Kimia', category: 'MIPA',
    description: 'Struktur atom, tabel periodika, ikatan kimia, dan stoikiometri reaksi.',
    iconName: 'FlaskConical', colorTheme: colorThemes.amber,
    chapters: [
      { id: 'kim10-bab1', title: 'Bab 1: Struktur Atom', topics: [
        { id: 'kim10-1-1', title: 'Model Atom', description: 'Perkembangan model atom dari Dalton hingga Bohr.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'kim10-1-2', title: 'Konfigurasi Elektron', description: 'Isian kulit elektron dan diagram orbital.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'kim10-bab2', title: 'Bab 2: Tabel Periodika', topics: [
        { id: 'kim10-2-1', title: 'Sikl periodik', description: 'Pola sifat unsur dalam tabel periodik.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'kim10-bab3', title: 'Bab 3: Ikatan Kimia', topics: [
        { id: 'kim10-3-1', title: 'Ikatan Ion & Kovalen', description: 'Pembentukan senyawa ionik dan kovalen.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'kim10-3-2', title: 'Ikatan Logam', description: 'Struktur kisi dan sifat logam.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'kim10-bab4', title: 'Bab 4: Stoikiometri', topics: [
        { id: 'kim10-4-1', title: 'Persamaan Reaksi', description: 'Menyeimbangkan persamaan reaksi kimia.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'kim10-4-2', title: 'Perhitungan Mol', description: 'Hubungan mol, massa, dan volume gas.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'kim-11', slug: 'kimia-11', name: 'Kimia', category: 'MIPA',
    description: 'Termokimia, laju reaksi, kesetimbangan kimia, dan asam-basa.',
    iconName: 'FlaskConical', colorTheme: colorThemes.amber,
    chapters: [
      { id: 'kim11-bab1', title: 'Bab 1: Termokimia', topics: [
        { id: 'kim11-1-1', title: 'Entalpi Reaksi', description: 'Kalor reaksi, hukum Hess, dan energi ikatan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'kim11-bab2', title: 'Bab 2: Laju Reaksi', topics: [
        { id: 'kim11-2-1', title: 'Faktor Laju Reaksi', description: 'Pengaruh suhu, katalis, dan konsentrasi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'kim11-bab3', title: 'Bab 3: Kesetimbangan', topics: [
        { id: 'kim11-3-1', title: 'Kesetimbangan Kimia', description: 'Konstanta kesetimbangan dan prinsip Le Chatelier.', duration: '30 Menit', difficulty: 'Sulit', hasSimulation: false },
      ]},
      { id: 'kim11-bab4', title: 'Bab 4: Asam-Basa', topics: [
        { id: 'kim11-4-1', title: 'Asam dan Basa', description: 'Teori asam-basa dan pH larutan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'ph-scale' },
      ]},
    ],
  },
  {
    id: 'kim-12', slug: 'kimia-12', name: 'Kimia', category: 'MIPA',
    description: 'Hidrokarbon, senyawa organik, polimer, elektrokimia, dan nuklir.',
    iconName: 'FlaskConical', colorTheme: colorThemes.amber,
    chapters: [
      { id: 'kim12-bab1', title: 'Bab 1: Hidrokarbon', topics: [
        { id: 'kim12-1-1', title: 'Alkana, Alkena, Alkuna', description: 'Klasifikasi hidrokarbon berdasarkan ikatan.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'kim12-1-2', title: 'Isomer', description: 'Isomer struktur dan posisi senyawa organik.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'kim12-bab2', title: 'Bab 2: Senyawa Derivat', topics: [
        { id: 'kim12-2-1', title: 'Alkohol, Aldehid, Keton', description: 'Gugus fungsi dan penamaan senyawa organik.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'kim12-bab3', title: 'Bab 3: Elektrokimia', topics: [
        { id: 'kim12-3-1', title: 'Sel Galvani', description: 'Potensial sel dan energi reaksi.', duration: '30 Menit', difficulty: 'Sulit', hasSimulation: false },
        { id: 'kim12-3-2', title: 'Elektrolisis', description: 'Pelepasan muatan pada larutan elektrolit.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },

  // ==========================================
  // BIOLOGI
  // ==========================================
  {
    id: 'bio-10', slug: 'biologi-10', name: 'Biologi', category: 'MIPA',
    description: 'Sel, jaringan, organ, sistem organ, dan ekosistem dasar.',
    iconName: 'Leaf', colorTheme: colorThemes.teal,
    chapters: [
      { id: 'bio10-bab1', title: 'Bab 1: Sel & Jaringan', topics: [
        { id: 'bio10-1-1', title: 'Struktur Sel', description: 'Organel sel hewan dan tumbuhan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'bio10-1-2', title: 'Jaringan Hewan', description: 'Epitel, otot, saraf, dan jaringan ikat.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'bio10-bab2', title: 'Bab 2: Sistem Organ Manusia', topics: [
        { id: 'bio10-2-1', title: 'Sistem Pencernaan', description: 'Organ dan fungsi pencernaan makanan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'bio10-2-2', title: 'Sistem Peredaran Darah', description: 'Jantung, pembuluh darah, dan sel darah.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'bio10-bab3', title: 'Bab 3: Ekosistem', topics: [
        { id: 'bio10-3-1', title: 'Ekosistem Darat & Air', description: 'Komponen biotik dan abiotik.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'bio10-3-2', title: 'Rantai Makanan', description: 'Jaring-jaring makanan dan aliran energi.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'bio-11', slug: 'biologi-11', name: 'Biologi', category: 'MIPA',
    description: 'Genetika, evolusi, bioteknologi, dan interaksi makhluk hidup.',
    iconName: 'Leaf', colorTheme: colorThemes.teal,
    chapters: [
      { id: 'bio11-bab1', title: 'Bab 1: Genetika', topics: [
        { id: 'bio11-1-1', title: 'Hukum Mendel', description: 'Persilangan monohibrid dan dihibrid.', duration: '30 Menit', difficulty: 'Sedang', hasSimulation: true, simulationType: 'mendel' },
        { id: 'bio11-1-2', title: 'Pewarisan Sifat', description: 'Pewarisan kodominan, incomplite dominance, dan linked genes.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'bio11-bab2', title: 'Bab 2: Evolusi', topics: [
        { id: 'bio11-2-1', title: 'Teori Evolusi', description: 'Bukti evolusi dan seleksi alam.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'bio11-bab3', title: 'Bab 3: Bioteknologi', topics: [
        { id: 'bio11-3-1', title: 'Rekayasa Genetika', description: 'DNA rekombinan dan kloning.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'bio11-3-2', title: 'Bioteknologi Konvensional', description: 'Fermentasi dan produksi pangan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'bio-12', slug: 'biologi-12', name: 'Biologi', category: 'MIPA',
    description: 'Ekologi lanjutan, keanekaragaman hayati, pemanfaatan, dan kelestarian lingkungan.',
    iconName: 'Leaf', colorTheme: colorThemes.teal,
    chapters: [
      { id: 'bio12-bab1', title: 'Bab 1: Ekologi Lanjutan', topics: [
        { id: 'bio12-1-1', title: 'Populasi & Komunitas', description: 'Pertumbuhan populasi dan interaksi antar spesies.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'bio12-1-2', title: 'Suksesi Ekologis', description: 'Perubahan komunitas dari waktu ke waktu.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'bio12-bab2', title: 'Bab 2: Keanekaragaman Hayati', topics: [
        { id: 'bio12-2-1', title: 'Keanekaragaman Gen & Spesies', description: 'Faktor pembentuk keanekaragaman hayati.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'bio12-bab3', title: 'Bab 3: Pemanfaatan & Pelestarian', topics: [
        { id: 'bio12-3-1', title: 'Pemanfaatan Hayati', description: 'Biotanaman, bioternak, dan bioremediasi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'bio12-3-2', title: 'Pelestarian Lingkungan', description: 'Konservasi, polusi, dan dampak aktivitas manusia.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },

  // ==========================================
  // EKONOMI
  // ==========================================
  {
    id: 'eko-10', slug: 'ekonomi-10', name: 'Ekonomi', category: 'IPS',
    description: 'Kegiatan ekonomi, permintaan & penawaran, sistem keuangan, dan perbankan dasar.',
    iconName: 'TrendingUp', colorTheme: colorThemes.orange,
    chapters: [
      { id: 'eko10-bab1', title: 'Bab 1: Dasar-Dasar Ekonomi', topics: [
        { id: 'eko10-1-1', title: 'Masalah Ekonomi', description: 'Kelangkaan, sistem ekonomi, dan kebutuhan manusia.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'eko10-1-2', title: 'Permintaan & Penawaran', description: 'Faktor yang mempengaruhi permintaan dan penawaran.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: true, simulationType: 'supply-demand' },
      ]},
      { id: 'eko10-bab2', title: 'Bab 2: Sistem Keuangan', topics: [
        { id: 'eko10-2-1', title: 'Lembaga Keuangan', description: 'Bank umum, bank syariah, dan lembaga keuangan lainnya.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'eko10-2-2', title: 'Alat Pembayaran', description: 'Uang, kartu kredit, dan pembayaran digital.', duration: '15 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'eko-11', slug: 'ekonomi-11', name: 'Ekonomi', category: 'IPS',
    description: 'Pembangunan ekonomi, kebijakan fiskal & moneter, dan perdagangan internasional.',
    iconName: 'TrendingUp', colorTheme: colorThemes.orange,
    chapters: [
      { id: 'eko11-bab1', title: 'Bab 1: Pembangunan Ekonomi', topics: [
        { id: 'eko11-1-1', title: 'Pertumbuhan & Pembangunan', description: 'Indikator pembangunan ekonomi dan PDB.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'eko11-1-2', title: 'Pembangunan Ekonomi Hijau', description: 'Pembangunan berkelanjutan dan ekonomi sirkular.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'eko11-bab2', title: 'Bab 2: Kebijakan Ekonomi', topics: [
        { id: 'eko11-2-1', title: 'Kebijakan Fiskal', description: 'Anggaran pemerintah, pajak, dan belanja negara.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'eko11-2-2', title: 'Kebijakan Moneter', description: 'Peran Bank Indonesia dan suku bunga.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'eko11-bab3', title: 'Bab 3: Perdagangan Internasional', topics: [
        { id: 'eko11-3-1', title: 'Ekspor & Impor', description: 'Keunggulan mutlak dan komparatif.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'eko-12', slug: 'ekonomi-12', name: 'Ekonomi', category: 'IPS',
    description: 'Pertumbuhan & pembangunan ekonomi, APBN, kebijakan fiskal, dan peran pemerintah.',
    iconName: 'TrendingUp', colorTheme: colorThemes.orange,
    chapters: [
      { id: 'eko12-bab1', title: 'Bab 1: APBN & Kebijakan Fiskal', topics: [
        { id: 'eko12-1-1', title: 'Struktur APBN', description: 'Pendapatan, belanja, dan pembiayaan negara.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'eko12-1-2', title: 'Dampak APBN', description: 'Peran APBN terhadap perekonomian nasional.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'eko12-bab2', title: 'Bab 2: Inflasi & Stabilitas', topics: [
        { id: 'eko12-2-1', title: 'Inflasi & Deflasi', description: 'Penyebab, dampak, dan pengendalian inflasi.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'eko12-2-2', title: 'Stabilitas Ekonomi', description: 'Kebijakan makroekonomi untuk stabilitas.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },

  // ==========================================
  // SOSIOLOGI
  // ==========================================
  {
    id: 'sos-10', slug: 'sosiologi-10', name: 'Sosiologi', category: 'IPS',
    description: 'Interaksi sosial, kelompok sosial, dan dinamika kehidupan bermasyarakat.',
    iconName: 'Users', colorTheme: colorThemes.rose,
    chapters: [
      { id: 'sos10-bab1', title: 'Bab 1: Ilmu Sosiologi', topics: [
        { id: 'sos10-1-1', title: 'Pengantar Sosiologi', description: 'Objek, metode, dan manfaat ilmu sosiologi.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'sos10-bab2', title: 'Bab 2: Interaksi Sosial', topics: [
        { id: 'sos10-2-1', title: 'Bentuk Interaksi Sosial', description: 'Asosiatif dan disosiatif, kontak dan komunikasi.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'sos10-2-2', title: 'Kelompok Sosial', description: 'Jenis kelompok, keluarga, dan kelompok kekerabatan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'sos10-bab3', title: 'Bab 3: Sosiologi Keluarga', topics: [
        { id: 'sos10-3-1', title: 'Struktur Keluarga', description: 'Peran anggota keluarga dan socialisasi.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'sos-11', slug: 'sosiologi-11', name: 'Sosiologi', category: 'IPS',
    description: 'Stratifikasi sosial, mobilitas sosial, perubahan sosial, dan deviasi sosial.',
    iconName: 'Users', colorTheme: colorThemes.rose,
    chapters: [
      { id: 'sos11-bab1', title: 'Bab 1: Stratifikasi Sosial', topics: [
        { id: 'sos11-1-1', title: 'Stratifikasi & Status Sosial', description: 'Hierarki sosial dan faktor penentu status.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'sos11-bab2', title: 'Bab 2: Mobilitas Sosial', topics: [
        { id: 'sos11-2-1', title: 'Mobilitas Vertikal & Horisontal', description: 'Pergerakan sosial dalam masyarakat.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'sos11-2-2', title: 'Faktor Mobilitas', description: 'Pendidikan, ekonomi, dan politik.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'sos11-bab3', title: 'Bab 3: Perubahan Sosial', topics: [
        { id: 'sos11-3-1', title: 'Perubahan & Perkembangan Masyarakat', description: 'Faktor pendorong dan penghambat perubahan sosial.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'sos-12', slug: 'sosiologi-12', name: 'Sosiologi', category: 'IPS',
    description: 'Globalisasi, masyarakat multikultural, konflik sosial, dan solusi problematika.',
    iconName: 'Users', colorTheme: colorThemes.rose,
    chapters: [
      { id: 'sos12-bab1', title: 'Bab 1: Globalisasi', topics: [
        { id: 'sos12-1-1', title: 'Dampak Globalisasi', description: 'Globalisasi terhadap budaya, ekonomi, dan sosial.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'sos12-1-2', title: 'Masyarakat Multikultural', description: 'Bhinneka Tunggal Ika dan keberagaman Indonesia.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'sos12-bab2', title: 'Bab 2: Problematika Sosial', topics: [
        { id: 'sos12-2-1', title: 'Konflik Sosial', description: 'Penyebab, bentuk, dan penyelesaian konflik.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'sos12-2-2', title: 'Solusi Problematika', description: 'Pendekatan sosiologis dalam penyelesaian masalah sosial.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },

  // ==========================================
  // GEOGRAFI
  // ==========================================
  {
    id: 'geo-10', slug: 'geografi-10', name: 'Geografi', category: 'IPS',
    description: 'Pemetaan, atmosfer, hidrosfer, litosfer, dan biosfer.',
    iconName: 'Globe', colorTheme: colorThemes.cyan,
    chapters: [
      { id: 'geo10-bab1', title: 'Bab 1: Ilmu Geografi', topics: [
        { id: 'geo10-1-1', title: 'Pengantar Geografi', description: 'Objek, metode, dan manfaat geografi.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'geo10-1-2', title: 'Pemetaan & GIS', description: 'Membaca peta, koordinat, dan penginderaan jauh.', duration: '25 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
      { id: 'geo10-bab2', title: 'Bab 2: Sistem Bumi', topics: [
        { id: 'geo10-2-1', title: 'Atmosfer', description: 'Lapisan atmosfer dan pengaruhnya terhadap kehidupan.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
        { id: 'geo10-2-2', title: 'Hidrosfer', description: 'Perairan permukaan dan siklus air.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'geo-11', slug: 'geografi-11', name: 'Geografi', category: 'IPS',
    description: 'Tektonik lempeng, cuaca & iklim, regional Indonesia, dan aplikasi SIG.',
    iconName: 'Globe', colorTheme: colorThemes.cyan,
    chapters: [
      { id: 'geo11-bab1', title: 'Bab 1: Tektonisme', topics: [
        { id: 'geo11-1-1', title: 'Lempeng Tektonik', description: 'Pergerakan lempeng dan dampaknya (gempa, vulkanisme).', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'geo11-bab2', title: 'Bab 2: Cuaca & Iklim', topics: [
        { id: 'geo11-2-1', title: 'Pembentukan Cuaca', description: 'Suhu, tekanan, angin, dan curah hujan.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'geo11-2-2', title: 'Zona Iklim', description: 'Klasifikasi iklim Köppen dan distribusi di Indonesia.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'geo11-bab3', title: 'Bab 3: Regional Indonesia', topics: [
        { id: 'geo11-3-1', title: 'Wilayah Indonesia', description: 'Fisik, sumber daya, dan kegiatan ekonomi regional.', duration: '20 Menit', difficulty: 'Mudah', hasSimulation: false },
      ]},
    ],
  },
  {
    id: 'geo-12', slug: 'geografi-12', name: 'Geografi', category: 'IPS',
    description: 'Analisis spasial, dinamika kependudukan, mitigasi bencana, dan pemanfaatan.',
    iconName: 'Globe', colorTheme: colorThemes.cyan,
    chapters: [
      { id: 'geo12-bab1', title: 'Bab 1: Analisis Spasial', topics: [
        { id: 'geo12-1-1', title: 'SIG & Remote Sensing', description: 'Penginderaan jauh dan Sistem Informasi Geografis.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'geo12-bab2', title: 'Bab 2: Kependudukan', topics: [
        { id: 'geo12-2-1', title: 'Dinamika Kependudukan', description: 'Pertumbuhan, distribusi, dan struktur penduduk.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'geo12-2-2', title: 'Migrasi', description: 'Urbanisasi dan dampaknya terhadap wilayah.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
      { id: 'geo12-bab3', title: 'Bab 3: Mitigasi & Pemanfaatan', topics: [
        { id: 'geo12-3-1', title: 'Mitigasi Bencana', description: 'Kesiapsiagaan dan pengurangan risiko bencana.', duration: '25 Menit', difficulty: 'Sedang', hasSimulation: false },
        { id: 'geo12-3-2', title: 'Pemanfaatan SDA', description: 'Pengelolaan sumber daya alam yang berkelanjutan.', duration: '20 Menit', difficulty: 'Sedang', hasSimulation: false },
      ]},
    ],
  },

  // ==========================================
  // AGAMA (KELAS 10)
  // ==========================================
  {
    id: 'alquran-10', slug: 'alquran-hadits-10', name: 'Alquran & Hadits', category: 'AGAMA',
    description: 'Ilmu tafsir, ilmu hadits, dan pemahaman teks keagamaan.',
    iconName: 'BookOpen', colorTheme: colorThemes.teal,
    chapters: [],
  },
  {
    id: 'arab-10', slug: 'bahasa-arab-10', name: 'Bahasa Arab', category: 'AGAMA',
    description: 'Nahwu, sharaf, muhadatsah, dan pemahaman tata bahasa Arab.',
    iconName: 'BookOpen', colorTheme: colorThemes.rose,
    chapters: [],
  },
  {
    id: 'aqidah-10', slug: 'aqidah-akhlak-10', name: 'Aqidah Akhlak', category: 'AGAMA',
    description: 'Tauhid, akhlak terpuji, dan menjauhi akhlak tercela.',
    iconName: 'BookOpen', colorTheme: colorThemes.amber,
    chapters: [],
  },
  {
    id: 'ski-10', slug: 'ski-10', name: 'Sejarah Islam', category: 'AGAMA',
    description: 'Sejarah kebudayaan Islam dari masa Nabi hingga peradaban modern.',
    iconName: 'BookOpen', colorTheme: colorThemes.blue,
    chapters: [],
  },

  // ==========================================
  // AGAMA (KELAS 11)
  // ==========================================
  {
    id: 'alquran-11', slug: 'alquran-hadits-11', name: 'Alquran & Hadits', category: 'AGAMA',
    description: 'Kajian ayat dan hadits tingkat lanjut.',
    iconName: 'BookOpen', colorTheme: colorThemes.teal,
    chapters: [],
  },
  {
    id: 'arab-11', slug: 'bahasa-arab-11', name: 'Bahasa Arab', category: 'AGAMA',
    description: 'Pendalaman tata bahasa dan sastra Arab.',
    iconName: 'BookOpen', colorTheme: colorThemes.rose,
    chapters: [],
  },
  {
    id: 'aqidah-11', slug: 'aqidah-akhlak-11', name: 'Aqidah Akhlak', category: 'AGAMA',
    description: 'Kajian teologi Islam dan tasawuf dasar.',
    iconName: 'BookOpen', colorTheme: colorThemes.amber,
    chapters: [],
  },
  {
    id: 'ski-11', slug: 'ski-11', name: 'Sejarah Islam', category: 'AGAMA',
    description: 'Dinasti Islam dan penyebaran Islam di berbagai wilayah.',
    iconName: 'BookOpen', colorTheme: colorThemes.blue,
    chapters: [],
  },

  // ==========================================
  // AGAMA (KELAS 12)
  // ==========================================
  {
    id: 'alquran-12', slug: 'alquran-hadits-12', name: 'Alquran & Hadits', category: 'AGAMA',
    description: 'Analisis kontemporer ayat dan hadits.',
    iconName: 'BookOpen', colorTheme: colorThemes.teal,
    chapters: [],
  },
  {
    id: 'arab-12', slug: 'bahasa-arab-12', name: 'Bahasa Arab', category: 'AGAMA',
    description: 'Komunikasi lanjut dan penulisan karya ilmiah Arab.',
    iconName: 'BookOpen', colorTheme: colorThemes.rose,
    chapters: [],
  },
  {
    id: 'aqidah-12', slug: 'aqidah-akhlak-12', name: 'Aqidah Akhlak', category: 'AGAMA',
    description: 'Penerapan akhlak dalam kehidupan modern.',
    iconName: 'BookOpen', colorTheme: colorThemes.amber,
    chapters: [],
  },
  {
    id: 'ski-12', slug: 'ski-12', name: 'Sejarah Islam', category: 'AGAMA',
    description: 'Sejarah penyebaran Islam di Indonesia dan peradaban dunia.',
    iconName: 'BookOpen', colorTheme: colorThemes.blue,
    chapters: [],
  },
];
