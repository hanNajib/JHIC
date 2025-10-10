import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

const ArticleCard = ({ article, className = '' }) => {
    return (
        <Card
            className={`flex-none ${className}`}
            background="gray"
            padding="none"
        >
            <img
                className='h-52 md:h-56 w-full object-cover'
                src={article.image}
                alt={article.title}
                loading="lazy"
            />

            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
                {article.tags.map((tag, index) => (
                    <Badge
                        key={index}
                        variant="orange"
                        size="xs"
                    >
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex flex-col px-5 gap-2 relative">
                <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold'>
                    {article.title}
                </h1>
                <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                    {article.description}
                </p>
            </div>

            <div className="flex flex-col pb-7 pt-3 px-5 gap-2 relative">
                <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
                    <Icon name="IoCalendarClearOutline" size={16} />
                    {article.date}
                </div>
                <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
                    <Icon name="LuEye" size={16} />
                    Telah Dilihat Sebanyak {article.views}
                </div>
            </div>
        </Card>
    );
};

export default ArticleCard;