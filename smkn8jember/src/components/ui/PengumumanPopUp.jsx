import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLargeLine } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";

const PengumumanPopUp = ({ pengumuman, onClose }) => {
  return (
    <AnimatePresence>
      {pengumuman && (
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
            <div className="text-end">
              <button
                onClick={onClose}
                className="text-gray-700 transition-all hover:text-red-500 text-2xl font-bold"
              >
                <RiCloseLargeLine />
              </button>
            </div>

            <div className="h-72 overflow-y-scroll mb-4">
              {pengumuman.image && (
                <div className="w-full mb-4">
                  <img
                    src={pengumuman.image}
                    alt={pengumuman.title}
                    className="w-full h-64 object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="bg-gray-200 h-full rounded-sm p-3">
                <p className="tracking-wide text-justify whitespace-pre-wrap">
                  {pengumuman.content}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="bg-orange-500 text-white font-medium text-xs lg:text-sm px-3 py-0.5 w-fit rounded-4xl">
                {pengumuman.type}
              </h3>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800 text-start">
                {pengumuman.title}
              </h2>
              <div className="flex items-center text-xs lg:text-sm gap-2 text-gray-700">
                <IoCalendarClearOutline className="font-bold" />
                <p>{pengumuman.date || "5 Juli 2024"}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PengumumanPopUp;
