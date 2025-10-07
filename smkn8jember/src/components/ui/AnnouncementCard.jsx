import React from 'react';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

const AnnouncementCard = ({ announcement, className = '' }) => {
  const getVariantByType = (type) => {
    switch (type.toLowerCase()) {
      case 'penting':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <div className={`min-w-full flex flex-col px-7 py-5 bg-white border-2 border-[#49505730] rounded-xl ${className}`}>
      <div className="flex flex-col items-start gap-3 md:gap-0 md:flex md:flex-row md:items-center">
        <h1 className='text-[#212529] font-semibold font-poppins text-lg flex-100'>
          {announcement.title}
        </h1>
        <Badge variant={getVariantByType(announcement.type)}>
          {announcement.type}
        </Badge>
      </div>
      
      <p className='font-poppins text-[#495057] text-md py-3'>
        {announcement.content}
      </p>
      
      <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2">
        <Icon name="IoCalendarClearOutline" size={16} />
        {announcement.date}
      </p>
    </div>
  );
};

export default AnnouncementCard;