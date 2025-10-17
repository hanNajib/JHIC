import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Section, Button, StatCard } from '../ui';
import parse from 'html-react-parser';
import { useWebSettingByTitle, useWebSettings } from '../../hooks/api/useWebSettings';
import { useStudentData } from '../../hooks/api/useStudentData';

const AboutSection = ({ className = '', deskripsi = "SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik." }) => {

  const { data: webSettings } = useWebSettings();
  const { data: schoolData } = useStudentData();
  const { major_count, teacher_count } = schoolData?.data || {};
  const student_count = schoolData?.data?.data.filter((data) => data.name === 'JumlahSiswa')[0]?.value || 0;
  const tahunBerdiri = webSettings?.data?.find(setting => setting.title === 'tahun_berdiri')?.value;
  const umurSekolah = tahunBerdiri ? new Date().getFullYear() - parseInt(tahunBerdiri) : '17';

  const stats = [
    {
      id: 'students',
      icon: 'LuBookText',
      value: `${student_count || 0}+`,
      label: 'Siswa - Siswi',
      color: '#3C4A78'
    },
    {
      id: 'teachers',
      icon: 'FaChalkboardTeacher',
      value: `${teacher_count || 0}+`,
      label: 'Guru',
      color: '#3C4A78'
    },
    {
      id: 'alumni',
      icon: 'PiStudentBold',
      value: `${major_count || 0}+`,
      label: 'Program Keahlian',
      color: '#3C4A78'
    },
    {
      id: 'years',
      icon: 'LuHousePlus',
      value: `${umurSekolah}+`,
      label: 'Tahun Berdiri',
      color: '#3C4A78'
    }
  ];

  const [isExpanded, setIsExpanded] = React.useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);
  return (
    <Section
      background="gray"
      className={className}
      id="about"
    >
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="flex flex-col items-center justify-center gap-3 pb-5">
            <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem]'>Tentang <span className='text-[#ff6000]'>Kami</span></h1>
            <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          </div>
          <div className={`font-poppins text-[#272727] font-medium text-[14px] text-start ${isExpanded ? 'line-clamp-0' : 'line-clamp-10'}`}>
            {parse(deskripsi)}
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

          <div className="grid grid-cols-4 md:grid-cols-2 w-full gap-3 py-4 lg:pr-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} position={index >= 2 ? 'right' : 'left'} />
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