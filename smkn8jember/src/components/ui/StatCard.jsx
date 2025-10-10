import React from 'react';
import Card from '../ui/Card';
import Icon from '../ui/Icon';

const StatCard = ({ stat, className = '', position = 'left' }) => {
  return (
    <div
      className={`relative w-full shadow-lg md:rounded-xl flex items-center justify-center md:px-5 px-2 py-6 rounded-full md:py-4 md:gap-5 cursor-pointer group ${className}`}
      background="white"
      padding="none"
    >
      <div className='text-3xl text-[#3C4A78]'>
        <Icon name={stat.icon} size={32} />
      </div>
      
      <div className='hidden md:flex flex-col justify-center items-center'>
        <h1 className='text-[#ff6000] font-poppins font-bold text-3xl'>{stat.value}</h1>
        <h1 className='text-[#272727] font-poppins font-medium text-sm'>{stat.label}</h1>
      </div>

      {/* Mobile hover tooltip */}
      <div className={`absolute hidden group-hover:flex group-hover:md:hidden group-active:flex group-active:md:hidden justify-center items-center flex-col bg-white shadow-lg p-4 rounded-xl top-full mt-2 z-10  w-56 ${position === 'left' ? 'left-0' : 'right-0'}`}>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-[#ff6000] font-poppins font-bold text-2xl'>{stat.value}</h1>
          <h1 className='text-[#272727] font-poppins font-medium text-sm'>{stat.label}</h1>
        </div>  
      </div>
    </div>
  );
};

export default StatCard;