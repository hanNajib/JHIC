import React from "react";

const ImageModal = ({ image, onClose, alt = "Preview" }) => {
  if (!image) return null; // kalau belum ada gambar, jangan tampilkan modal

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={onClose} // klik di luar gambar juga bisa menutup
    >
      <div
        className="relative bg-white/90 rounded-lg shadow-xl p-5 max-w-3xl"
        onClick={(e) => e.stopPropagation()} // biar klik di gambar gak nutup modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-700 text-xl font-bold hover:text-red-500 transition-colors"
        >
          ×
        </button>
        <img
          src={image}
          alt={alt}
          className="max-h-[80vh] max-w-full object-contain rounded-md"
        />
      </div>
    </div>
  );
};

export default ImageModal;