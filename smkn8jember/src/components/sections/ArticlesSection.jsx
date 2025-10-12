import React from 'react';
import { Section, Button, ArticleCard } from '../ui';

// Data sampel artikel
const sampleArticles = [
  {
    id: 1,
    title: "Juara 1 Lomba Kompetensi Siswa Tingkat Provinsi",
    description: "Siswa SMKN 8 Jember meraih prestasi gemilang dengan menjadi juara 1 dalam lomba kompetensi siswa tingkat provinsi.",
    image: "/assets/images/artikel-1.jpg",
    date: "2024-03-15",
    category: "Prestasi",
    tags: ["Prestasi", "LKS"]
  },
  {
    id: 2,
    title: "Workshop Teknologi Industri 4.0",
    description: "SMKN 8 Jember mengadakan workshop teknologi industri 4.0 untuk meningkatkan kompetensi siswa.",
    image: "/assets/images/artikel-2.jpg",
    date: "2024-03-10",
    category: "Kegiatan",
    tags: ["Workshop", "Teknologi"]
  },
  {
    id: 3,
    title: "Kunjungan Industri ke PT. Astra",
    description: "Siswa melakukan kunjungan industri ke PT. Astra untuk melihat langsung praktik kerja di dunia industri.",
    image: "/assets/images/artikel-3.jpg",
    date: "2024-03-05",
    category: "Kunjungan",
    tags: ["Kunjungan", "Industri"]
  },
  {
    id: 4,
    title: "Pelantikan OSIS Periode 2024",
    description: "Pelantikan pengurus OSIS baru periode 2024 dilaksanakan dengan khidmat di aula sekolah.",
    image: "/assets/images/artikel-4.jpg",
    date: "2024-02-28",
    category: "Kegiatan",
    tags: ["OSIS", "Kegiatan"]
  },
  {
    id: 5,
    title: "Pelatihan Digital Marketing",
    description: "Workshop digital marketing untuk siswa jurusan bisnis dan manajemen.",
    image: "/assets/images/artikel-5.jpg",
    date: "2024-02-20",
    category: "Workshop",
    tags: ["Workshop", "Digital"]
  },
  {
    id: 6,
    title: "Expo Karya Siswa 2024",
    description: "Pameran karya siswa dari berbagai jurusan menampilkan inovasi dan kreativitas.",
    image: "/assets/images/artikel-6.jpg",
    date: "2024-02-15",
    category: "Event",
    tags: ["Event", "Karya"]
  }
];

const ArticlesSection = ({ className = '' }) => {
  const visibleArticles = sampleArticles;

  return (
    <Section 
      title={<>Artikel <span className='text-[#ff6000]'>Terbaru</span></>}
      subtitle="Ikuti berita dan informasi terkini seputar kegiatan dan prestasi SMK Negeri 8 Jember"
      className={className}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
        {visibleArticles.map((article, index) => (
          <ArticleCard 
            key={article.id} 
            article={article}
            className={index >= 3 ? 'hidden md:flex md:flex-col md:flex-none' : ''}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button>
          Lihat Semua Artikel
        </Button>
      </div>
    </Section>
  );
};

export default ArticlesSection;