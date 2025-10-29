import React, { useState } from "react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Icon from "../ui/Icon";
import { useNavigate } from "react-router-dom";
import parse from 'html-react-parser';

const ArticleCard = ({ article = {}, className = "" }) => {
  const categories = article.categories || [];
  const tags = article.tags || [];
  const [imageLoaded, setImageLoaded] = useState(false);

  const navigate = useNavigate();
  const handleClick = () => {
    if (article.slug) navigate(`/artikel/${article.slug}`) 
  };

  return (
    <Card onClick={handleClick} className={`flex-none ${className} cursor-pointer`} background="gray" padding="none">
      <div className="relative h-52 md:h-56 bg-gray-200 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-300" />
        )}
        <img
          className={`h-52 md:h-56 w-full object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          src={article.image || "https://placehold.co/600x400/EEE/31343C?text=NOT+FOUND"}
          alt={article.title || "Artikel"}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/EEE/31343C?text=NOT+FOUND";
            setImageLoaded(true);
          }}
        />
      </div>

      <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <Badge key={index} variant="orange" size="xs">
              {tag}
            </Badge>
          ))
        ) : categories.length > 0 ? (
          categories.map((cat, index) => (
            <Badge
              key={index}
              variant="orange"
              size="xs"
              style={{ backgroundColor: cat.color || "#FF6000" }}
            >
              {cat.name}
            </Badge>
          ))
        ) : (
          <Badge variant="gray" size="xs">
            Tanpa Kategori
          </Badge>
        )}
      </div>

      <div className="flex flex-col px-5 gap-2 relative">
        <h1 className="text-[#1a1a1a] text-lg font-poppins font-bold">
          {article.title || "Tanpa Judul"}
        </h1>
        <div className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
          {parse(article.content || "-")}
        </div>
      </div>

      <div className="flex flex-col pb-7 pt-3 px-5 gap-2 relative">
        <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
          <Icon name="IoCalendarClearOutline" size={16} />
          {new Date(article.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
          <Icon name="LuEye" size={16} />
          Telah Dilihat Sebanyak {article.views || 0}
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
