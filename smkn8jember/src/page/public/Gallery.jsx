import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { GALLERY_CATEGORIES } from "../../constants/schoolData";
import { GalleryCard } from "../../components/ui";
import GalleryPopUp from "../../components/ui/GalleryPopUp";
import { useGalleries } from "../../hooks/api/useGallery";

const Gallery = () => {
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: galleryData = [], isLoading, isError } = useGalleries();

  const filteredGallery = useMemo(() => {
    let filtered = galleryData;

    if (category && category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === "terbaru" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [galleryData, category, sort]);

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return <p className="text-center py-20">Memuat galeri...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-20 text-red-500">
        Gagal memuat galeri. Silakan coba lagi.
      </p>
    );
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
            {GALLERY_CATEGORIES &&
              GALLERY_CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
          </select>

          <button
            onClick={() =>
              setSort(sort === "terbaru" ? "terlama" : "terbaru")
            }
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
        {filteredGallery.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada galeri ditemukan.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
            {filteredGallery.map((image) => (
              <GalleryCard
                key={image.id}
                image={image}
                onClick={() => handleOpenPopup(image)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Popup */}
      <GalleryPopUp image={selectedImage} onClose={handleClosePopup} />

      <Footer />
    </>
  );
};

export default Gallery;
