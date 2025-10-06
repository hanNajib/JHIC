import React from 'react';
import Card from '../ui/Card';

const GalleryCard = ({ image, className = '' }) => {
  return (
    <Card 
      className={`flex-none ${className}`}
      background="gray"
      padding="none"
    >
      <img 
        className='h-60 w-full object-cover' 
        src={image.image} 
        alt={image.title}
        loading="lazy"
      />
    </Card>
  );
};

export default GalleryCard;