import React from "react";
import Card from "../ui/Card";

const GalleryCard = ({ image, className = "", onClick, skeleton = false }) => {
  if (skeleton) {
    return (
      <Card
        className="flex-none cursor-pointer h-60 animate-pulse"
        background="gray"
      />
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative h-60 w-96 flex justify-center items-center bg-black rounded-md group cursor-pointer ${className}`}
    >
      <img
        src={image.image}
        alt={image.title}
        loading="lazy"
        className="w-full h-full rounded-md object-cover group-hover:opacity-50 transition-opacity duration-300"
      />

      <div className="absolute flex justify-start items-end w-full h-full rounded-md bg-opacity-50 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-white p-5 rounded-b-md transition-all duration-300">
        <p className="text-2xl font-semibold underline underline-offset-1 decoration-orange-500">
          {image.title}
        </p>
      </div>
    </div>
  );
};

export default GalleryCard;
