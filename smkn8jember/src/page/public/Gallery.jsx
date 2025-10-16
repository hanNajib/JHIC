import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { GalleryCard } from "../../components/ui";
import GalleryPopUp from "../../components/ui/GalleryPopUp";
import { useGalleries } from "../../hooks/api/useGallery";

const Gallery = () => {
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  // Ambil data dari backend
  const { data: galleryResponse = [], isLoading, isError } = useGalleries();

  // Normalisasi: pastikan datanya berbentuk array
  const galleries = Array.isArray(galleryResponse)
    ? galleryResponse
    : Array.isArray(galleryResponse?.data)
    ? galleryResponse.data
    : [];

  // Filter dan sort data
  const filteredGallery = useMemo(() => {
    let filtered = Array.isArray(galleries) ? [...galleries] : [];

    // Filter berdasarkan kategori
    if (category && category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sort === "terbaru" ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [galleries, category, sort]);

  // Popup handler
  const handleOpenPopup = (image) => setSelectedImage(image);
  const handleClosePopup = () => setSelectedImage(null);

  // Loading & error states
  if (isLoading) return <p className="text-center py-20">Memuat galeri...</p>;
  if (isError)
    return (
      <p className="text-center py-20 text-red-500">
        Gagal memuat galeri. Silakan coba lagi.
      </p>
    );

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

      {/* Filter Section */}
      <section className="bg-[#f9fafb] pt-10 pb-5 px-6 md:px-16 border-b border-gray-200">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-6">
          {/* Search */}
          <form
            action=""
            className="border-b border-gray-200 pb-10 px-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <label
              htmlFor="search"
              className="block font-semibold text-2xl text-gray-600 mb-2"
            >
              Cari Artikel
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
              <input
                type="text"
                id="search"
                placeholder="Telusuri artikel..."
                className="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-8 py-2.5 transition"
              >
                Cari
              </button>
            </div>
          </form>

          {/* Tabs & Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 text-gray-700 font-medium">
              {["All", "RPL", "TKJ", "DKV", "TKR", "TSM", "APTH", "APT"].map(
                (tab, i) => (
                  <button
                    key={i}
                    onClick={() => setCategory(tab)}
                    className={`w-16 border-b-2 transition duration-200 ${
                      category === tab
                        ? "border-orange-500 text-orange-500"
                        : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-gray-600"
              >
                Urutkan:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-orange-500 rounded-md py-2 px-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="bg-white py-10">
        {filteredGallery.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada galeri ditemukan.
          </p>
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
