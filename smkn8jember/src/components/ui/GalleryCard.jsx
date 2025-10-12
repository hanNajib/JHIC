import React from "react";
import Card from "../ui/Card";

const GalleryCard = ({ image, className = "", onClick }) => {
  return (
    <Card
      className={`flex-none cursor-pointer ${className}`}
      background="gray"
      padding="none"
      onClick={onClick}
    >
      <img
        className="h-60 w-full object-cover rounded-md hover:opacity-90 transition"
        src={image.image}
        alt={image.title}
        loading="lazy"
      />
    </Card>
  );
};

export default GalleryCard;
