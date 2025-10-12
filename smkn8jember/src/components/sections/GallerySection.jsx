import React, { useState, useMemo } from 'react';
import { Section, Button, GalleryCard } from '../ui';
import { GALLERY_CATEGORIES } from '../../constants/schoolData';

// Data sampel galeri
const sampleGalleries = [
  {
    id: 1,
    title: "Lomba Kompetensi Siswa 2024",
    image: "/assets/images/gallery-1.jpg",
    category: "prestasi",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Workshop Teknologi",
    image: "/assets/images/gallery-2.jpg",
    category: "kegiatan",
    date: "2024-03-10"
  },
  {
    id: 3,
    title: "Kunjungan Industri",
    image: "/assets/images/gallery-3.jpg",
    category: "kunjungan",
    date: "2024-03-05"
  },
  {
    id: 4,
    title: "Laboratorium Komputer",
    image: "/assets/images/gallery-4.jpg",
    category: "fasilitas",
    date: "2024-03-01"
  },
  {
    id: 5,
    title: "Upacara Bendera",
    image: "/assets/images/gallery-5.jpg",
    category: "kegiatan",
    date: "2024-02-26"
  },
  {
    id: 6,
    title: "Juara Olimpiade",
    image: "/assets/images/gallery-6.jpg",
    category: "prestasi",
    date: "2024-02-20"
  }
];

const GallerySection = ({ className = '' }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const galleries = sampleGalleries;
  
  const filteredGallery = useMemo(() => {
    if (activeFilter === 'all') return galleries;
    return galleries.filter(item => item.category === activeFilter);
  }, [galleries, activeFilter]);
  
  const setFilter = (filterId) => setActiveFilter(filterId);

  return (
    <Section 
      title={<>Galeri <span className='text-[#ff6000]'>Sekolah</span></>}
      subtitle="Dokumentasi kegiatan, prestasi, Event, dan fasilitas SMK Negeri 8 Jember yang membanggakan"
      className={className}
    >
      <div className="flex flex-wrap w-full justify-center items-center gap-3 py-5">
        {GALLERY_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`flex  cursor-pointer justify-center items-center font-poppins font-bold rounded-3xl text-sm md:text-md py-1 px-6 border-2 border-[#ff6000] transition-colors ${
              activeFilter === category.id
                ? 'text-white bg-[#ff6000]'
                : 'text-[#ff6000] bg-transparent hover:bg-[#ff6000] hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
        {filteredGallery.map((image, index) => (
          <GalleryCard 
            key={image.id} 
            image={image}
            className={index >= 3 ? 'hidden md:flex md:flex-col md:flex-none' : ''}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button onClick={ () => window.location.href = '/gallery'} className=' cursor-pointer'>
          Lihat Semua Galeri
        </Button>
      </div>
    </Section>
  );
};

export default GallerySection;