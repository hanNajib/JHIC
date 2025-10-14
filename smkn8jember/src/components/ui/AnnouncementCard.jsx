import React from "react";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import { getCategoryStyle } from "../../utils/helpers";
import parse from 'html-react-parser';

const AnnouncementCard = ({ announcement, className = "", onClick }) => {

  const type = announcement.category || null;
  // const typeLabel = type.name || "Tanpa Kategori";
  // const typeColor = type.color || "#6B7280";

  return (
    <div
      onClick={onClick}
      className={`min-w-full flex flex-col px-6 py-5 gap-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <h1 className="text-gray-800 font-semibold font-poppins text-lg md:text-xl line-clamp-2">
          {announcement.title}
        </h1>
        {type && (
          <Badge style={getCategoryStyle(typeColor)} className="text-sm md:text-xs py-1 px-2">
            {typeLabel}
          </Badge>
        )}
      </div>

      <div className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
        {parse(announcement.content)}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mt-2">
        <Icon name="IoCalendarClearOutline" size={16} />
        <span>{announcement.date || '-'}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;
