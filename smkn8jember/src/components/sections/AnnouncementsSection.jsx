import React from 'react';
import { Section, Button, AnnouncementCard, Icon } from '../ui';
import { useAnnouncements } from '../../hooks/useSchool';

const AnnouncementsSection = ({ className = '' }) => {
  const { announcements, isLoading } = useAnnouncements();

  return (
    <Section 
      background="gradient" 
      title={<>Pengumuman <span className='text-[#ff6000]'>Terbaru</span></>}
      subtitle="Informasi penting dan terkini untuk seluruh siswa, orang tua, dan civitas akademika SMK Negeri 8 Jember"
      className={className}
    >
      <div className="flex flex-col gap-5 w-full mx-20 bg-[#F8F9FA] rounded-xl shadow-md p-5 md:p-10 mt-5">
        <div className="flex items-center gap-3 md:pb-3">
          <span className='p-3 md:p-4 bg-[#f78000] text-[#fff] text-2xl rounded-full'>
            <Icon name="RiMegaphoneFill" size={24}  />
          </span>
          <h1 className='text-[#212529] text-xl md:text-3xl font-poppins font-bold'>
            Papan Pengumuman
          </h1>
        </div>

        <div className="flex overflow-x-auto flex-row md:flex-col gap-2 md:gap-5 w-full">
          {announcements.map((announcement) => (
            <AnnouncementCard 
              key={announcement.id} 
              announcement={announcement} 
            />
          ))}
        </div>

        <div className="flex justify-center items-center w-full py-3 md:py-0 md:pt-5">
          <Button onClick={() => window.location.href = '/announcement'}>
            Lihat Semua Pengumuman
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default AnnouncementsSection;