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
  category: 'MIPA' | 'IPS' | 'Keagamaan' | 'Umum';
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

export const SUBJECTS: Subject[] = [
  {
    id: '1',
    slug: 'matematika',
    name: 'Matematika',
    category: 'MIPA',
    description: 'Konsep eksponen, barisan dan deret, trigonometri, sistem persamaan, fungsi kuadrat, statistik, dan peluang.',
    iconName: 'Calculator',
    colorTheme: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      badge: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
      border: 'hover:border-blue-500',
    },
    chapters: [
      {
        id: 'bab-1',
        title: 'Bab 1: Eksponen',
        topics: [
          {
            id: 'mat-1-1',
            title: 'Definisi Eksponen',
            description: 'Visualisasi a^n sebagai perkalian berulang dan perbandingan dengan perkalian biasa a × n.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'exponent-definition',
          },
          {
            id: 'mat-1-2',
            title: 'Sifat-Sifat Eksponen',
            description: 'Hukum perkalian, pembagian, dan perpangkatan eksponen.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'exponent-properties',
          },
          {
            id: 'mat-1-3',
            title: 'Fungsi Eksponensial',
            description: 'Grafik dan sifat f(x) = a^x untuk nilai a > 0.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'exponential',
          },
          {
            id: 'mat-1-4',
            title: 'Bentuk Akar',
            description: 'Hubungan bentuk akar dengan bentuk eksponen fractional.',
            duration: '15 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'radical',
          },
          {
            id: 'mat-1-5',
            title: 'Aplikasi Kontekstual & Refleksi',
            description: 'Soal cerita eksponen dan refleksi pembelajaran.',
            duration: '20 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'wakaf',
          },
        ],
      },
      {
        id: 'bab-2',
        title: 'Bab 2: Barisan dan Deret',
        topics: [
          {
            id: 'mat-2-1',
            title: 'Komparasi Barisan',
            description: 'Perbandingan visual pola pertumbuhan barisan aritmetika (linear) dan geometri (eksponensial).',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'sequence',
          },
          {
            id: 'mat-2-2',
            title: 'Pengantar Konsep Deret',
            description: 'Memahami perbedaan barisan (suku terpisah) dan deret (akumulasi penjumlahan) secara visual.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'series-intro',
          },
          {
            id: 'mat-2-3',
            title: 'Deret Aritmetika: Target Hafalan',
            description: 'Simulasi akumulasi target hafalan Al-Qur\'an harian menggunakan konsep deret (Sn).',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'series',
          },
          {
            id: 'mat-2-4',
            title: 'Barisan Geometri: Amal Jariyah',
            description: 'Efek bola salju penyebaran ilmu menggunakan barisan dan deret geometri.',
            duration: '20 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'charity',
          },
          {
            id: 'mat-2-5',
            title: 'Investasi Syariah (Mudharabah)',
            description: 'Komparasi pertumbuhan bagi hasil secara linear (ditarik rutin) vs eksponensial (diputar kembali).',
            duration: '20 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'investment',
          },
        ],
      },
      {
        id: 'bab-3',
        title: 'Bab 3: Perbandingan Trigonometri',
        topics: [
          {
            id: 'mat-3-1',
            title: 'Perbandingan Trigonometri',
            description: 'Sinus, Cosinus, Tangen pada segitiga siku-siku dan kalkulasi nilai.',
            duration: '25 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'trigonometry',
          },
          {
            id: 'mat-3-2',
            title: 'Pemanfaatan Perbandingan Trigonometri',
            description: 'Menerapkan trigonometri untuk mengukur tinggi gedung dari jarak jauh.',
            duration: '30 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'building-height',
          },
        ],
      },
      {
        id: 'bab-4',
        title: 'Bab 4: Sistem Persamaan dan Pertidaksamaan Linear',
        topics: [
          {
            id: 'mat-4-1',
            title: 'Sistem Persamaan Linear',
            description: 'Metode substitusi, eliminasi, dan determinan (Cramer).',
            duration: '30 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'linear-equations',
          },
          {
            id: 'mat-4-1b',
            title: 'Asisten Eliminasi & Substitusi SPLDV',
            description: 'Panduan langkah demi langkah menyelesaikan SPLDV.',
            duration: '25 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'elimination',
          },
          {
            id: 'mat-4-2',
            title: 'Sistem Pertidaksamaan Linear',
            description: 'Koordinat Cartesius, daerah penyelesaian, dan model linear programing sederhana.',
            duration: '30 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'inequalities',
          },
        ],
      },
      {
        id: 'bab-5',
        title: 'Bab 5: Persamaan dan Fungsi Kuadrat',
        topics: [
          {
            id: 'mat-5-1',
            title: 'Simulator Ubin Aljabar',
            description: 'Susun ubin aljabar untuk membentuk persegi panjang dan temukan pemfaktoran persamaan kuadrat.',
            duration: '25 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'algebra-tile-simulator',
          },
          {
            id: 'mat-5-2',
            title: 'Karakteristik Grafik Parabola',
            description: 'Ubah koefisien a, b, dan c untuk melihat bagaimana grafik f(x) = ax\u00B2 + bx + c berubah.',
            duration: '25 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'parabola-characteristics',
          },
          {
            id: 'mat-5-3',
            title: 'Aplikasi Fungsi Kuadrat',
            description: 'Simulasi lintasan bola menggunakan fungsi kuadrat.',
            duration: '20 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'ball-trajectory',
          },
          {
            id: 'mat-5-4',
            title: 'Animasi Pemfaktoran Kuadrat',
            description: 'Visualisasi langkah demi langkah konsep pemfaktoran (x+p)(x+q).',
            duration: '15 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'factoring-animation',
          },
          {
            id: 'mat-5-5',
            title: 'Animasi Melengkapi Kuadrat Sempurna',
            description: 'Visualisasi geometri di balik metode melengkapi kuadrat sempurna (x\u00B2 + 4x = 5).',
            duration: '15 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'complete-square',
          },
          {
            id: 'mat-5-6',
            title: 'Diskriminan dan Jenis Akar',
            description: 'Visualisasi bagaimana nilai D = b\u00B2 \u2212 4ac menentukan jumlah akar pada fungsi kuadrat.',
            duration: '15 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'discriminant',
          },
        ],
      },
      {
        id: 'bab-6',
        title: 'Bab 6: Representasi dan Interpretasi Data',
        topics: [
          {
            id: 'mat-6-1',
            title: 'Representasi Data',
            description: 'Tabel, diagram batang, garis, lingkaran, dan histogram.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: false,
          },
          {
            id: 'mat-6-2',
            title: 'Statistik Deskriptif',
            description: 'Mean, median, modus, kuartil, range, standar deviasi, dan koefisien variasi.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
          {
            id: 'mat-6-3',
            title: 'Representasi Data Lanjutan',
            description: 'Diagram pencar (scatter plot), garis tren, dan interpretasi korelasi.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
          {
            id: 'mat-6-4',
            title: 'Proyek Analisis Data dan Refleksi',
            description: 'Proyek pengumpulan, visualisasi, dan interpretasi data nyata beserta refleksi.',
            duration: '45 Menit',
            difficulty: 'Sulit',
            hasSimulation: false,
          },
        ],
      },
      {
        id: 'bab-7',
        title: 'Bab 7: Peluang',
        topics: [
          {
            id: 'mat-7-1',
            title: 'Distribusi Peluang',
            description: 'Eksperimen acak, ruang sampel, dan distribusi tabel frekuensi.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
          {
            id: 'mat-7-2',
            title: 'Aturan Penjumlahan',
            description: 'Peluang A ∪ B (gabungan) untuk kejadian majemuk.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
          {
            id: 'mat-7-3',
            title: 'Aturan Perkalian',
            description: 'Peluang A ∩ B (irisan) untuk kejadian bersamaan.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
          {
            id: 'mat-7-4',
            title: 'Aplikasi Kontekstual & Refleksi',
            description: 'Soal kontekstual peluang dan refleksi pembelajaran akhir bab.',
            duration: '20 Menit',
            difficulty: 'Sedang',
            hasSimulation: false,
          },
        ],
      },
    ],
  },
  {
    id: '2',
    slug: 'fisika',
    name: 'Fisika',
    category: 'MIPA',
    description: 'Gerak parabola, hukum Ohm, gelombang, dan gerak harmonik sederhana.',
    iconName: 'Atom',
    colorTheme: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
      border: 'hover:border-purple-500',
    },
    chapters: [
      {
        id: 'fis-1',
        title: 'Bab 1: Gerak Parabola',
        topics: [
          {
            id: 'fis-1',
            title: 'Gerak Parabola (Projectile Motion)',
            description: 'Simulasi lemparan benda dengan variasi sudut elevasi dan kecepatan awal v₀.',
            duration: '30 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'projectile',
          },
        ],
      },
      {
        id: 'fis-2',
        title: 'Bab 2: Listrik & Gelombang',
        topics: [
          {
            id: 'fis-2',
            title: 'Hukum Ohm & Rangkaian Listrik Seri/Paralel',
            description: 'Hitung tegangan (V), arus (I), dan hambatan (R) secara realtime.',
            duration: '25 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'ohm-law',
          },
          {
            id: 'fis-3',
            title: 'Ayunan Bandul Sederhana (Harmonik)',
            description: 'Pengaruh panjang tali dan percepatan gravitasi terhadap periode ayunan.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: true,
            simulationType: 'pendulum',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    slug: 'kimia',
    name: 'Kimia',
    category: 'MIPA',
    description: 'Struktur atom, sistem periodik unsur, laju reaksi, dan kesetimbangan kimia.',
    iconName: 'FlaskConical',
    colorTheme: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
      border: 'hover:border-emerald-500',
    },
    chapters: [
      {
        id: 'kim-1',
        title: 'Bab 1: Struktur Atom & Sistem Periodik',
        topics: [
          {
            id: 'kim-1',
            title: 'Titran & Skala pH Larutan',
            description: 'Visualisasi perubahan pH larutan asam-basa dan indikator warna.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'ph-scale',
          },
          {
            id: 'kim-2',
            title: 'Model Atom Bohr Interaktif',
            description: 'Visualisasi kulit elektron, tingkat energi, dan konfigurasi elektron unsur MA.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: false,
          },
        ],
      },
    ],
  },
  {
    id: '4',
    slug: 'biologi',
    name: 'Biologi',
    category: 'MIPA',
    description: 'Struktur sel, sistem organ manusia, genetika persilangan Mendel, dan ekosistem.',
    iconName: 'Dna',
    colorTheme: {
      bg: 'bg-teal-500/10 dark:bg-teal-500/20',
      text: 'text-teal-600 dark:text-teal-400',
      badge: 'bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300',
      border: 'hover:border-teal-500',
    },
    chapters: [
      {
        id: 'bio-1',
        title: 'Bab 1: Sel & Genetika',
        topics: [
          {
            id: 'bio-1',
            title: 'Hukum Persilangan Mendel (Monohibrid & Dihibrid)',
            description: 'Simulasi genotipe dan fenotipe hasil persilangan keturunan F1 dan F2.',
            duration: '30 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'mendel',
          },
          {
            id: 'bio-2',
            title: 'Mikroskop Sel Hewan & Tumbuhan',
            description: 'Eksplorasi organel sel: mitokondria, nukleus, kloroplas, dan membran sel.',
            duration: '20 Menit',
            difficulty: 'Mudah',
            hasSimulation: false,
          },
        ],
      },
    ],
  },
  {
    id: '5',
    slug: 'ekonomi',
    name: 'Ekonomi',
    category: 'IPS',
    description: 'Kurva permintaan dan penawaran, titik keseimbangan pasar (Equilibrium).',
    iconName: 'TrendingUp',
    colorTheme: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300',
      border: 'hover:border-amber-500',
    },
    chapters: [
      {
        id: 'eko-1',
        title: 'Bab 1: Permintaan & Penawaran',
        topics: [
          {
            id: 'eko-1',
            title: 'Kurva Permintaan & Penawaran Pasar',
            description: 'Ubah parameter harga (P) dan kuantitas (Q) untuk menemukan Keseimbangan Pasar.',
            duration: '25 Menit',
            difficulty: 'Sedang',
            hasSimulation: true,
            simulationType: 'supply-demand',
          },
        ],
      },
    ],
  },
];
