export const SCHOOL_STATS = [
  {
    id: 'students',
    icon: 'LuBookText',
    value: '2,500+',
    label: 'Siswa - Siswi',
    color: '#3C4A78'
  },
  {
    id: 'teachers',
    icon: 'FaChalkboardTeacher',
    value: '90+',
    label: 'Guru',
    color: '#3C4A78'
  },
  {
    id: 'alumni',
    icon: 'PiStudentBold',
    value: '20,000+',
    label: 'Lulusan Potensial',
    color: '#3C4A78'
  },
  {
    id: 'years',
    icon: 'LuHousePlus',
    value: '17+',
    label: 'Tahun Berdiri',
    color: '#3C4A78'
  }
];

export const SCHOOL_PROGRAMS = [
  {
    id: 'tkr',
    title: 'Teknik Kendaraan Ringan',
    description: 'Program keahlian yang membekali siswa dengan kemampuan perawatan, perbaikan, dan pengelolaan sistem kendaraan ringan berbasis teknologi otomotif modern.',
    image: 'assets/images/tkr.jpg',
    icon: 'IoCarSport',
    subjects: ['Mesin Kendaraan', 'Sistem Chassis', 'Kelistrikan Mobil', 'Sistem Injeksi', 'Teknologi Otomotif']
  },
  {
    id: 'tsm',
    title: 'Teknik Sepeda Motor',
    description: 'Program keahlian yang berfokus pada pemeliharaan, perbaikan, dan penguasaan teknologi sepeda motor, baik konvensional maupun injeksi.',
    image: 'assets/images/tsm.jpg',
    icon: 'FaMotorcycle',
    subjects: ['Mesin Sepeda Motor', 'Sistem Chassis', 'Kelistrikan Motor', 'Perawatan Motor', 'Sistem Injeksi']
  },
  {
    id: 'rpl',
    title: 'Rekayasa Perangkat Lunak',
    description: 'Program keahlian yang mempersiapkan siswa menjadi programmer, web developer, dan software engineer yang handal.',
    image: 'assets/images/rpl.jpg',
    icon: 'FaCode',
    subjects: ['UI/UX', 'Dasar Premrograman', 'OOP', 'Database', 'Mobile App']
  },
  {
    id: 'tkj',
    title: 'Teknik Komputer dan Jaringan',
    description: 'Program keahlian yang mempersiapkan siswa menjadi teknisi jaringan, administrator sistem, dan ahli IT support yang kompeten di bidang jaringan komputer dan perangkat keras.',
    image: 'assets/images/hero.png',
    icon: 'FaWifi',
    subjects: ['Dasar Dasar Jaringan', 'Keamanan Jaringan', 'Routing & Switching', 'Sistem Operasi', 'Administrasi server']
  },
  {
    id: 'dkv',
    title: 'Desain Komunikasi Visual',
    description: 'Program keahlian yang membekali siswa dengan keterampilan di bidang desain grafis, ilustrasi, dan media visual untuk keperluan komunikasi dan industri kreatif.',
    image: 'assets/images/hero.png',
    icon: 'IoMdColorPalette',
    subjects: ['Desain Grafis', 'Tipografi', 'Fotografi', 'Video Editing / Animasi Dasar', 'Komunikasi Visual']
  },
  {
    id: 'atph',
    title: 'Agribisnis Tanaman Pangan dan Hortikultura',
    description: 'Program keahlian yang mempelajari teknik budidaya tanaman pangan dan hortikultura serta pengelolaan agribisnis pertanian yang berkelanjutan.',
    image: 'assets/images/hero.png',
    icon: 'RiPlantFill',
    subjects: ['Tanaman Pangan', 'Tanaman Hortikultura', 'Produksi Tanaman', 'Manajemen Agribisnis', 'Pemasaran Hasil']
  },
  {
    id: 'apt',
    title: 'Agribisnis Perbenihan Tanaman',
    description: 'Program keahlian yang membekali siswa dengan keterampilan dalam memproduksi, mengelola, dan memasarkan benih tanaman berkualitas tinggi sesuai standar agribisnis modern.',
    image: 'assets/images/hero.png',
    icon: 'PiPlantFill',
    subjects: ['Teknologi Perbenihan', 'Produksi Benih', 'Pengujian Mutu Benih', 'Penyimpanan Benih', 'Pemasaran Benih']
  }
];

export const ARTICLE_CATEGORIES = [
  { id: 'all', label: 'Semua Artikel' },
  { id: 'rpl', label: 'RPL' },
  { id: 'tkj', label: 'TKJ' },
  { id: 'dkv', label: 'DKV' },
  { id: 'tkr', label: 'TKR' },
  { id: 'tsm', label: 'TSM' },
  { id: 'atph', label: 'ATPH' },
  { id: 'apt', label: 'APT' },
  { id: 'prestasi', label: 'Prestasi' },
  { id: 'event', label: 'Event' },
  { id: 'karya-siswa', label: 'Karya Siswa' },
  { id: 'ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'kunjungan', label: 'Kunjungan' },
  { id: 'teaching-factory', label: 'Teaching Factory' },
  { id: 'keagamaan', label: 'Keagamaan' },
  { id: 'edukasi', label: 'Edukasi' },
];


export const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'Juara 1 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/rpl.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  },
  {
    id: 2,
    title: 'Juara 2 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/tkr.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  },
  {
    id: 3,
    title: 'Juara 3 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/tkr.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  },
  {
    id: 4,
    title: 'Juara 4 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/tkr.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  },
  {
    id: 5,
    title: 'Juara 5 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/tkr.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  },
  {
    id: 6,
    title: 'Juara 6 Lomba Kompetensi Siswa Tingkat Kabupaten Jember',
    description: 'Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    image: 'assets/images/tkr.jpg',
    tags: ['Prestasi', 'RPL'],
    date: '25 Februari 2025',
    views: 109
  }
];

export const SAMPLE_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Kegiatan MPLS 2025',
    content: 'Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).',
    type: 'Info',
    date: '25 Februari 2025',
    priority: 'normal'
  },
  {
    id: 2,
    title: 'Kegiatan MPLS 2025',
    content: 'Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).',
    type: 'Penting',
    date: '25 Februari 2025',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Kegiatan MPLS 2025',
    content: 'Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).',
    type: 'Info',
    date: '25 Februari 2025',
    priority: 'normal'
  }
];

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'activities', label: 'Kegiatan' },
  { id: 'events', label: 'Event' },
  { id: 'facilities', label: 'Fasilitas' },
  { id: 'achievements', label: 'Prestasi' }
];

export const SAMPLE_GALLERY = [
  {
    id: 1,
    image: 'assets/images/senam.png',
    category: 'activities',
    title: 'Senam Pagi'
  },
  {
    id: 2,
    image: 'assets/images/senam.png',
    category: 'events',
    title: 'Event Sekolah'
  },
  {
    id: 3,
    image: 'assets/images/senam.png',
    category: 'facilities',
    title: 'Fasilitas Sekolah'
  },
  {
    id: 4,
    image: 'assets/images/senam.png',
    category: 'activities',
    title: 'Kegiatan Siswa'
  },
  {
    id: 5,
    image: 'assets/images/senam.png',
    category: 'achievements',
    title: 'Prestasi Siswa'
  },
  {
    id: 6,
    image: 'assets/images/senam.png',
    category: 'events',
    title: 'Event Tahunan'
  }
];