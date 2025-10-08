import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Section, Button, StatCard } from '../ui';
import { useAbout } from '../../hooks/useSchool';

const AboutSection = ({ className = '' }) => {
  const { stats, isExpanded, toggleExpanded } = useAbout();

  return (
    <Section 
      background="gray" 
    //   title={<>Tentang <span className='text-[#ff6000]'>Kami</span></>}
      className={className}
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
        <div className="flex flex-col items-center justify-center gap-3 pb-5">
            <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem]'>Tentang <span className='text-[#ff6000]'>Kami</span></h1>
            <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          </div>
          <p className={`font-poppins text-[#272727] font-medium text-[14px] text-start ${isExpanded ? 'line-clamp-0' : 'line-clamp-10'}`}>
            SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik.
          </p>
          
          <div className="flex md:hidden py-4 justify-center text-center">
            <Button 
              onClick={toggleExpanded}
              className="flex items-center gap-2"
            >
              {isExpanded ? (
                <>
                  Tampilkan Lebih Sedikit <FaChevronUp />
                </>
              ) : (
                <>
                  Lihat Selengkapnya <FaChevronDown />
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-2 w-full gap-3 py-4 lg:pr-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} position={index >= 2 ? 'right' : 'left'}/>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center lg:w-1/2">
          <img src="assets/images/about-img.png" alt="Tentang SMK Negeri 8 Jember" />
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;