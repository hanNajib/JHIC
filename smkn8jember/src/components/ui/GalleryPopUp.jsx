import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const popup = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } },
};

const GalleryPopUp = ({ image, onClose }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-2"
          onClick={onClose} // klik area luar untuk close
        >
          <motion.div
            key="popup"
            variants={popup}
            onClick={(e) => e.stopPropagation()} // biar klik dalam popup nggak nutup
            className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-5 relative max-h-[85vh] overflow-y-auto"
          >
            {/* Tombol Close */}
            <div className="text-end">
              <button
              onClick={onClose}
              className=" top-3 right-3 text-gray-600 hover:text-red-500 transition text-2xl"
              aria-label="Close popup"
            >
              <RiCloseLargeLine />
            </button>
            </div>

            {/* Gambar */}
            <div className="w-full mb-4">
              <img
                src={image.image}
                alt={image.title}
                className="w-full rounded-lg object-contain max-h-[50vh] mx-auto"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <div className="space-y-2">
              {image.categories && image.categories.map((cat) => (
                <span className="bg-orange-500 text-white text-xs lg:text-sm font-medium px-3 py-1 rounded-full inline-block">
                  {cat.name}
                </span>
              ))}
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
                {image.title}
              </h2>
              <p className="text-sm lg:text-base text-gray-700">
                {image.description ||
                  "Kompetisi Kelas Bersih, Lomba Antar Sekolah tingkat kabupaten."}
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <IoCalendarClearOutline />
                <p>{image.date || "5 Juli 2024"}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryPopUp;
