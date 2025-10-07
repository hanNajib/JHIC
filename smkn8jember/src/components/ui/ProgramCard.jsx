import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

const ProgramCard = ({ program, className = '' }) => {
  return (
    <Card 
      className={`flex-none w-full lg:w-1/3 ${className}`}
      background="gray"
      padding="none"
    >
      <img 
        className='h-52 md:h-56 w-full object-cover' 
        src={program.image} 
        alt={program.title}
        loading="lazy"
      />
      
      <div className="flex flex-col px-5 py-6 gap-2 relative">
        <div className="flex items-center gap-3">
          <span className='p-2 bg-[#f78000] text-[#fff] text-2xl rounded-full'>
            <Icon name={program.icon} size={24} />
          </span>
          <h1 className='text-[#242424] font-poppins font-semibold'>{program.title}</h1>
        </div>
        
        <p className="text-[#495057] leading-snug py-2">
          {program.description}
        </p>
        
        <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
        
        <div className="flex flex-wrap w-full gap-2 relative">
          {program.subjects.map((subject, index) => (
            <Badge 
              key={index} 
              variant="primary"
              size="xs"
            >
              {subject}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProgramCard;