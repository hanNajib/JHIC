import React from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Section, Button, StatCard } from '../ui';
import { useAbout } from '../../hooks/useSchool';

const SambutanSection = ({ className = '' }) => {
  const { stats, isExpanded, toggleExpanded } = useAbout();

  return (
    <Section 
      background="gray" 
    //   title={<>Tentang <span className='text-[#ff6000]'>Kami</span></>}
      className={className}
    >
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 w-full">
        <div className="flex justify-center items-center">
          <img src="assets/images/KEPSEK.jpg" alt="Tentang SMK Negeri 8 Jember" className='h-full w-full object-cover'/>
        </div>
        <div className="flex flex-col items-center lg:items-start">
            <div className="flex flex-col items-center justify-center gap-3 pb-5">
                <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem]'>Tentang <span className='text-[#ff6000]'>Kami</span></h1>
                <div className="w-1/2 h-1 bg-[#ff6000]"></div>
            </div>
            <p className={`font-poppins text-[#272727] font-medium text-[14px] text-start leading-relaxed ${isExpanded ? 'line-clamp-0' : 'line-clamp-10'}`}>
                Web Site merupakan salah satu wujud dari kemajuan teknologi di
                dunia yang tentunya memberikan keuntungan bagi pengguna teknologi
                sehingga bisa dengan mudah mendapatkan informasi yang diinginkan
                melalui Web Site. SMKN 8 Jember telah memiliki Web site yang
                berisi tentang segala informasi SMKN 8 Jember diantaranya mengenai
                sejarah awal mula berdirinya sekolah ini, berisi tentang data-data
                guru/ siswa, dan tentunya juga berisi tentang berita
                kegiatan-kegiatan sekolah.Dengan adanya Web Site ini diharapkan
                dapat memudahkan para pengguna teknologi untuk mendapatkan
                informasi tentang SMKN 8 Jember. Selain itu, saya selaku Kepala
                SMKN 8 Jember berharap isi dan berita didalamnya dapat diketahui
                oleh masyarakat luas dan bisa diambil manfaat darinya.
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

        </div>

      </div>
    </Section>
  );
};

export default SambutanSection;