import React, { useState } from "react";
import { Section, Button, GalleryCard } from "../ui";
import { useGallery } from "../../hooks/useSchool";
import { GALLERY_CATEGORIES } from "../../constants/schoolData";
import GalleryPopUp from "../ui/GalleryPopUp";

const GallerySection = ({ className = "" }) => {
  const { filteredGallery, activeFilter, setFilter } = useGallery();
  const [selectedImage, setSelectedImage] = useState(null);

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
        {GALLERY_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`flex  cursor-pointer justify-center items-center font-poppins font-bold rounded-3xl text-sm md:text-md py-1 px-6 border-2 border-[#ff6000] transition-colors ${
              activeFilter === category.id
                ? "text-white bg-[#ff6000]"
                : "text-[#ff6000] bg-transparent hover:bg-[#ff6000] hover:text-white"
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
            // className={index >= 3 ? 'hidden md:flex md:flex-col md:flex-none' : ''}
            onClick={() => handleOpenPopup(image)}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full pt-5">
        <Button className=" cursor-pointer">Lihat Semua Galeri</Button>
      </div>

      <GalleryPopUp image={selectedImage} onClose={handleClosePopup} />
    </Section>
  );
};

export default GallerySection;
