import React, { useState, useMemo } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { GALLERY_CATEGORIES } from "../../constants/schoolData";
import { GalleryCard } from "../../components/ui";
import GalleryPopUp from "../../components/ui/GalleryPopUp";
import { useGalleries } from "../../hooks/api/useGallery";
import { all } from "axios";
import { useCategories } from "../../hooks/api/useCategory";
import { useDebounce } from "../../hooks/useDebounce";
import DefaultLayout from "../../components/layout/DefaultLayout";

const Gallery = () => {
  const [sort, setSort] = useState("terbaru");
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchTerm = useDebounce(searchText, 500);

  const { data: galleryResponse, isLoading, isError } = useGalleries({
    category: category === "all" ? undefined : category,
    sortDir: sort === "terbaru" ? "asc" : "desc",
    s: debouncedSearchTerm,
  });
  const galleryData = galleryResponse?.data || [];

  

  const { data: categoriesResponse } = useCategories({ type: "gallery", all: true });
  const categories = categoriesResponse?.data || [];



  const handleOpenPopup = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  if (isError) {
    return (
      <p className="text-center py-20 text-red-500">
        Gagal memuat galeri. Silakan coba lagi.
      </p>
    );
  }

  return (
    <DefaultLayout>
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
          <div className="border-b border-gray-200 pb-10 px-10">
            <label
              htmlFor="search"
              className="block font-semibold text-2xl text-gray-600 mb-2"
              >
              Cari Gambar
            </label>
            <div className="flex items-center rounded-full border border-gray-300 overflow-hidden transition focus-within:ring-1 focus-within:ring-orange-400 focus-within:border-orange-400">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Telusuri artikel..."
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  className="flex-1 px-4 py-2.5 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-wrap gap-4 md:gap-8 text-gray-700 font-medium overflow-x-auto">
                  {[{ name: "All" }, ...categories].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setCategory(tab.name === "All" ? "" : tab.name)}
                    className={`px-3 py-1 whitespace-nowrap border-b-2 transition duration-200 ${
                    (tab.name === "All" && category === "") || tab.name === category
                      ? "border-orange-500 text-orange-500"
                      : "border-transparent hover:border-gray-600"
                    }`}
                  >
                    {tab.name}
                  </button>
                  ))}
                </div>

                {/* Terbaru/lama */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-orange-500 rounded-md py-2 px-10 focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value="terbaru">Newest</option>
                <option value="terlama">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-16">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-60 bg-gray-200 animate-pulse rounded-md"
                  />
                ))
            : galleryData.length > 0 ? (
              galleryData.map((image) => (
                <GalleryCard
                  key={image.id}
                  image={image}
                  onClick={() => handleOpenPopup(image)}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500 text-lg">
                Tidak ada galeri ditemukan
              </p>
            )}
        </div>
      </section>

      {/* Popup */}
      <GalleryPopUp image={selectedImage} onClose={handleClosePopup} />

    </DefaultLayout>
  );
};

export default Gallery;
