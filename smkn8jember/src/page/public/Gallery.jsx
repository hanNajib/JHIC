import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { GALLERY_CATEGORIES, SAMPLE_GALLERY } from "../../constants/schoolData";
import { GalleryCard } from "../../components/ui";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";

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
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
  }

  const handleClosePopup = () => {
    setSelectedImage(null);
  }
  return (
    <>
      <Navbar />

      {/* Header */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-gallery.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-orange-500 opacity-40"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Galeri Sekolah
          </h1>
          <p className="font-poppins text-white text-lg leading-relaxed hidden md:block">
            Jejak Langkah dan Warna Kehidupan SMK Negeri 8 Jember
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-[#e6ecf2] flex flex-col items-center justify-center py-8 px-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Kategori Galeri</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-20 bg-white text-gray-700"
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

      {/* Gallery Grid */}
      <section className="bg-white py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
          {SAMPLE_GALLERY.map((image, index) => (
            <GalleryCard
              key={image.id}
              image={image}
              onClick={() => handleOpenPopup(image)} // buka popup
            />
          ))}
        </div>
      </section>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* isi popup */}
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-3xl w-full sm:w-[90%] p-4"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="text-end">
                <button
                  onClick={handleClosePopup}
                  className="text-gray-700 transition-all text-end hover:text-red-500 text-2xl font-bold"
                >
                  <RiCloseLargeLine />
                </button>
              </div>

              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-[420px] object-cover rounded-sm mb-4"
              />

              <div className="flex flex-col justify-center gap-1">
                <h3 className="bg-orange-500 text-white font-medium text-sm px-3 py-0.5 w-fit rounded-4xl">Prestasi</h3>
                <h2 className="text-2xl font-bold text-gray-800 text-start">
                  {selectedImage.title}
                </h2>
                <p className="font-medium text-lg text-gray-700">Kompetisi Kelas Bersih, Lomba Antar Sekolah tingkat kabupaten</p>
                <div className="flex items-center text-sm gap-2 text-gray-700">
                  <IoCalendarClearOutline className="font-bold"/>
                  <p> 5 Juli 2024</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Gallery;
