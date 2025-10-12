import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { GALLERY_CATEGORIES, SAMPLE_GALLERY } from "../../constants/schoolData";
import { GalleryCard } from "../../components/ui";

// Data sampel galeri jika tidak ada di constants
const sampleGalleryData = [
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
  },
  {
    id: 7,
    title: "Praktikum Lab",
    image: "/assets/images/gallery-7.jpg",
    category: "fasilitas",
    date: "2024-02-15"
  },
  {
    id: 8,
    title: "Event Sekolah",
    image: "/assets/images/gallery-8.jpg",
    category: "kegiatan",
    date: "2024-02-10"
  }
];

const Gallery = () => {
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("all");

  const galleryData = SAMPLE_GALLERY || sampleGalleryData;

  const filteredGallery = useMemo(() => {
    let filtered = galleryData;

    if (category && category !== "" && category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    // Sort by date
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === "terbaru" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [galleryData, category, sort]);

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-gallery.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Galeri Sekolah
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Jejak Langkah dan Warna Kehidupan SMK Negeri 8 Jember
          </p>
        </div>
      </section>

      <section className="bg-[#e6ecf2] flex flex-col items-center justify-center py-8 px-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Kategori Galeri</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <select
            aria-label="Pilih kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-20 focus:outline-none bg-white text-gray-700"
          >
            <option value="all">Semua Kategori</option>
            {GALLERY_CATEGORIES && GALLERY_CATEGORIES.filter(c => c.id !== 'all').map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setSort(sort === "terbaru" ? "terlama" : "terbaru")}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md transition"
          >
            {sort === "terbaru" ? (
              <>
                Terbaru <FaChevronUp className="text-sm" />
              </>
            ) : (
              <>
                Teralama <FaChevronDown className="text-sm" />
              </>
            )}
          </button>
        </div>
      </section>

      <section className="bg-white py-4 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4 px-6 md:px-16">
          {filteredGallery.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              className={
                index >= 3 ? "hidden md:flex md:flex-col md:flex-none" : ""
              }
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
