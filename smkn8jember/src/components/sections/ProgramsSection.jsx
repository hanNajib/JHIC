import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Section, Button, ProgramCard } from '../ui';
import { useMajors } from '../../hooks/api/useMajor';

const ProgramsSection = ({ className = '' }) => {
  const { data: majorsResponse } = useMajors({ all: true });
  const majorsData = majorsResponse?.data || [];
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Deteksi apakah user di mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // set awal
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // kalau di mobile tampilkan 3 dulu, kalau desktop tampilkan semua
  const itemsToShow = isMobile
    ? (isExpanded ? majorsData.length : 3)
    : majorsData.length;

  const displayedMajors = majorsData.slice(0, itemsToShow);
  const hasMoreItems = isMobile && majorsData.length > 3;

  return (
      <Section 
        background="gradient" 
        title={<>Program <span className='text-[#ff6000]'>Keahlian</span></>}
        subtitle={`SMKN 8 Jember menyediakan ${majorsData.length} program keahlian`}
        className={className}
      >
        <div className="flex flex-col md:flex-row overflow-x-auto w-full pt-8 md:pt-10 gap-6 md:gap-4 items-stretch pb-4">
          {displayedMajors.map((program) => (
            <ProgramCard 
              key={program.id} 
              program={program}
            />
          ))}
        </div>

        {hasMoreItems && (
          <div className="flex py-4 justify-center text-center">
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
        )}
      </Section>  
  );
};

export default ProgramsSection;
