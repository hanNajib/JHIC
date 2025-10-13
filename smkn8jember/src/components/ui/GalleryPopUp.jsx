import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";

const GalleryPopUp = ({ image, onClose }) => {
    if (!image) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-[90%] lg:w-[55%] p-4"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* close */}
          <div className="text-end">
            <button
              onClick={onClose}
              className="text-gray-700 transition-all hover:text-red-500 text-2xl font-bold"
            >
              <RiCloseLargeLine />
            </button>
          </div>

          {/* Gambar */}
          <img
            src={image.image}
            alt={image.title}
            className="w-full h-full object-cover rounded-sm mb-4"
          />

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h3 className="bg-orange-500 text-white font-medium text-xs lg:text-sm px-3 py-0.5 w-fit rounded-4xl">
              {image.category}
            </h3>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-start">
              {image.title}
            </h2>
            <p className="font-medium text-sm lg:text-base text-gray-700">
              {image.desc ||
                "Kompetisi Kelas Bersih, Lomba Antar Sekolah tingkat kabupaten"}
            </p>
            <div className="flex items-center text-xs lg:text-sm gap-2 text-gray-700">
              <IoCalendarClearOutline className="font-bold" />
              <p>{image.date || "5 Juli 2024"}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryPopUp;
