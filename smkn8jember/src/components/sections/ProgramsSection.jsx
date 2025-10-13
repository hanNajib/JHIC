import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Section, Button, ProgramCard } from '../ui';
import { useMajors } from '../../hooks/api/useMajor';

const ProgramsSection = ({ className = '' }) => {
  const { data: majorsData } = useMajors();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const programs = majorsData || [];
  const visiblePrograms = isExpanded ? programs : programs.slice(0, 3);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <Section 
      background="gradient" 
      title={<>Program <span className='text-[#ff6000]'>Keahlian</span></>}
      subtitle="SMKN 8 Jember menyediakan 7 program keahlian"
      className={className}
    >
      <div className="flex flex-col md:flex-row overflow-x-auto w-full pt-8 md:pt-10 gap-6 md:gap-4 items-stretch pb-4">
        {visiblePrograms.map((program, index) => (
          <ProgramCard 
            key={program.id} 
            program={program}
            className={`${isExpanded ? 'md:flex' : ''} ${index >= 3 && !isExpanded ? 'hidden md:flex' : ''}`}
          />
        ))}
      </div>

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
    </Section>
  );
};

export default ProgramsSection;