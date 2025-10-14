import React, { useState } from "react";
import { Section, Button, GalleryCard } from "../ui";
import { useGalleries, useGallery } from "../../hooks/api/useGallery";
import { GALLERY_CATEGORIES } from "../../constants/schoolData";
import GalleryPopUp from "../ui/GalleryPopUp";
import { useCategories } from "../../hooks/api/useCategory";
import { all } from "axios";

const GallerySection = ({ className = "" }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setFilter] = useState('all');
  const { data: galleryResponse = [], isLoading } = useGalleries({
    limit: 6,
    category_name: activeFilter !== 'all' ? activeFilter : undefined,
  });
  const { data: categoriesResponse = [] } = useCategories({ type: 'gallery' });
  const galleries = galleryResponse.data || [];
  const categories = [{ id: 'all', name: 'all' }, ...((categoriesResponse?.data || []).filter((cat) => cat.type !== 'all'))];

  const handleOpenPopup = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <Section
      title={
        <>
          Galeri <span className="text-[#ff6000]">Sekolah</span>
        </>
      }
      subtitle="Dokumentasi kegiatan, prestasi, Event, dan fasilitas SMK Negeri 8 Jember yang membanggakan"
      className={className}
    >
      <div className="flex flex-wrap w-full justify-center items-center gap-3 py-5">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.name)}
            className={`flex  cursor-pointer justify-center items-center font-poppins font-bold rounded-3xl text-sm md:text-md py-1 px-6 border-2 border-[#ff6000] transition-colors ${
              activeFilter === category.name
                ? "text-white bg-[#ff6000]"
                : "text-[#ff6000] bg-transparent hover:bg-[#ff6000] hover:text-white"
            }`}
          >
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">
        {isLoading ? (
          [...Array(6)].map((_, index) => (
            <GalleryCard key={index} skeleton={true} />
          ))
        ) : (
          galleries.map((gallery) => (
          <GalleryCard
            key={gallery.id}
            image={gallery}
            onClick={() => handleOpenPopup(gallery)}
          />
        ))
        )}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button className=" cursor-pointer">Lihat Semua Galeri</Button>
      </div>

      <GalleryPopUp image={selectedImage} onClose={handleClosePopup} />
    </Section>
  );
};

export default GallerySection;
