import React from "react";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";

const AnnouncementCard = ({ announcement, className = "", onClick }) => {
  const getVariantByType = (type) => {
    if (!type) return 'info';
    switch (type.toLowerCase()) {
      case 'penting':
      case 'high':
        return 'warning';
      case 'info':
      case 'medium':
      case 'low':
        return 'info';
      default:
        return "info";
    }
  };

  // Ambil nama kategori jika ada
  const type = announcement.category?.name || announcement.type || announcement.priority;
  const typeLabel = type;

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
          <Badge variant={getVariantByType(type)} className="text-sm md:text-xs py-1 px-2">
            {typeLabel}
          </Badge>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-3">
        {announcement.content}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mt-2">
        <Icon name="IoCalendarClearOutline" size={16} />
        <span>{announcement.created_at || '-'}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;
