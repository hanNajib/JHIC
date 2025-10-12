import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";

const ImageModal = ({ image, onClose, alt = "Preview" }) => {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/40  z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white/90 rounded-lg shadow-xl p-3 w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-end">
              <button
                onClick={onClose}
                className="top-2 right-3 text-gray-700 text-xl font-bold hover:text-red-500 transition-colors"
              >
                <RiCloseLargeLine />
              </button>
            </div>
            <img
              src={image}
              alt={alt}
              className="w-full object-contain rounded-md"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;
