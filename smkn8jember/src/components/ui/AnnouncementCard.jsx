import React from "react";
import { FaShareAlt, FaRegBookmark, FaPrint } from "react-icons/fa";
import { IoCalendarClearOutline, IoTimeOutline, IoPersonOutline } from "react-icons/io5";
import Badge from "../ui/Badge";
import parse from "html-react-parser";

const AnnouncementCard = ({ announcement, className = "", onClick }) => {
  const type = announcement.category || null;
  
  const typeLabel = type?.name || "Tanpa Kategori";
  const typeColor = type?.color || "#6B7280";

  return (
    <div
      onClick={onClick}
      className={`flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Gambar */}
      {announcement.image && (
        <div className="md:w-1/4 w-full h-48 md:h-auto">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      {/* Konten */}
      <div className="flex flex-col justify-between w-full md:w-3/4 p-5">
        {/* Bagian atas */}
        <div>
          <h1 className="text-gray-800 font-semibold font-poppins text-lg md:text-xl mb-2">
            {announcement.title}
          </h1>

          {/* Informasi tanggal, waktu, penulis */}
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs md:text-sm mb-3">
            <span className="flex items-center gap-1">
              <IoCalendarClearOutline />
              {announcement.created_at || "-"}
            </span>
            <span className="flex items-center gap-1">
              <IoTimeOutline />
              {announcement.time || "-"}
            </span>
            <span className="flex items-center gap-1">
              <IoPersonOutline />
              {announcement.author || "-"}
            </span>
          </div>

          {/* Konten singkat */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mb-4">
            {parse(announcement.content)}
          </p>

          {/* Tag kategori */}
          <div className="flex flex-wrap gap-2 mb-4">
            {announcement.tags?.map((tag, index) => (
              <Badge
                key={index}
                style={{ backgroundColor: tag.color, color: "white" }}
                className="text-xs font-medium py-1 px-3 rounded-full"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bagian bawah */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5 text-gray-500 text-sm">
            <button className="flex items-center gap-1 hover:text-orange-600 transition">
              <FaShareAlt /> Bagikan
            </button>
            <button className="flex items-center gap-1 hover:text-orange-600 transition">
              <FaRegBookmark /> Simpan
            </button>
            <button className="flex items-center gap-1 hover:text-orange-600 transition">
              <FaPrint /> Cetak
            </button>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm md:text-base font-semibold py-2 px-4 rounded-lg transition">
            Baca Selengkapnya
          </button>
        </div>

      </div>
    </div>
  );
};

export default AnnouncementCard;
