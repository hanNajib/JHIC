import React from "react";
import { FaRegHeart, FaShareAlt, FaRegBookmark } from "react-icons/fa";
import { IoCalendarClearOutline, IoTimeOutline } from "react-icons/io5";
import Badge from "../ui/Badge";
import parse from "html-react-parser";

const AnnouncementCard = ({
  announcement,
  className = "",
  onClick,
  variant = "small",
}) => {
  const type = announcement.category || {};
  const typeLabel = type?.name || "Tanpa Kategori";
  const typeColor = type?.color || "#6B7280";

  const isLarge = variant === "large";

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer ${className}`}
    >
      {/* Gambar */}
      {announcement.image && (
        <div className="relative">
          <img
            src={announcement.image}
            alt={announcement.title}
            className={`${
              isLarge ? "h-64 md:h-80" : "h-48"
            } w-full object-cover`}
          />
          <div className="absolute top-4 left-4">
            <Badge
              style={{ backgroundColor: typeColor, color: "white" }}
              className="text-xs font-semibold py-1 px-3 rounded-full"
            >
              {typeLabel}
            </Badge>
          </div>
          {announcement.created_at && (
            <div className="absolute top-4 right-4 bg-white text-gray-800 text-xs font-medium py-1 px-3 rounded-full shadow">
              {announcement.created_at}
            </div>
          )}
        </div>
      )}

      {/* Konten */}
      <div className="p-5">
        <div className="flex items-center gap-4 text-gray-500 text-xs md:text-sm mb-2">
          <span className="flex items-center gap-1">
            <IoCalendarClearOutline /> {announcement.date || "-"}
          </span>
          <span className="flex items-center gap-1">
            <IoTimeOutline /> {announcement.time || "-"}
          </span>
        </div>

        <h2 className="text-gray-900 font-semibold text-lg md:text-xl mb-2 line-clamp-2">
          {announcement.title}
        </h2>

        <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-4">
          {parse(announcement.content)}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
