import React from 'react';
import { Button } from '../ui';

const HeroSection = ({ className = '' }) => {
  return (
    <section 
      style={{ 
        backgroundImage: "url('/assets/images/hero.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }} 
      className={`h-screen flex lg:items-center ${className}`}
    >
      <div className="bg-gradient-to-r from-[#39302c9a] to-transparent w-full h-screen absolute"></div>
      
      <div className="px-6 md:px-16 w-full lg:w-5/6 z-10 pt-20 md:pt-36 lg:pt-0">
        <h1 className='font-poppins text-[#F8F9FA] text-left md:text-center lg:text-left font-bold text-5xl md:text-6xl lg:text-7xl'>
          <span className='underline decoration-[#ff6000]'>SMK NEGERI 8 JEMBER</span> 
          <br /> WES TOP 
        </h1>
        
        <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left hidden md:flex md:text-lg'>
          Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas, dengan menyiapkan lulusan yang siap kerja, siap berwirausaha, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi.
        </p>
        
        <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left md:hidden md:text-lg'>
          Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas.
        </p>
        
        <div className="flex flex-col md:flex-row gap-5 md:justify-center lg:justify-start">
          <Button variant="primary">
            Baca Selengkapnya
          </Button>
          <Button variant="secondary">
            Baca Selengkapnya
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;