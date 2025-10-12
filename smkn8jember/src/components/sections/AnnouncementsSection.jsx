import React from 'react';
import { Section, Button, AnnouncementCard, Icon } from '../ui';

// Data sampel pengumuman
const sampleAnnouncements = [
  {
    id: 1,
    title: "Libur Semester Genap 2024",
    date: "20 Maret 2024",
    description: "Libur semester genap akan dimulai tanggal 25 Maret 2024. Kegiatan belajar mengajar akan kembali aktif pada tanggal 8 April 2024.",
    type: "penting",
    content: "Libur semester genap akan dimulai tanggal 25 Maret 2024. Kegiatan belajar mengajar akan kembali aktif pada tanggal 8 April 2024."
  },
  {
    id: 2,
    title: "Pendaftaran Ekstrakulikuler",
    date: "18 Maret 2024",
    description: "Pendaftaran ekstrakulikuler dibuka hingga 30 Maret 2024. Tersedia berbagai pilihan ekskul menarik.",
    type: "info",
    content: "Pendaftaran ekstrakulikuler dibuka hingga 30 Maret 2024. Tersedia berbagai pilihan ekskul menarik."
  },
  {
    id: 3,
    title: "Ujian Tengah Semester",
    date: "15 Maret 2024",
    description: "UTS akan dilaksanakan mulai tanggal 1 April 2024. Harap mempersiapkan diri dengan baik.",
    type: "penting",
    content: "UTS akan dilaksanakan mulai tanggal 1 April 2024. Harap mempersiapkan diri dengan baik."
  },
  {
    id: 4,
    title: "Workshop Industri",
    date: "10 Maret 2024",
    description: "Workshop kerjasama dengan industri pada 5 April 2024 di aula sekolah.",
    type: "info",
    content: "Workshop kerjasama dengan industri pada 5 April 2024 di aula sekolah."
  },
  {
    id: 5,
    title: "Pembayaran SPP",
    date: "5 Maret 2024",
    description: "Batas akhir pembayaran SPP tanggal 10 setiap bulan. Mohon dibayarkan tepat waktu.",
    type: "penting",
    content: "Batas akhir pembayaran SPP tanggal 10 setiap bulan. Mohon dibayarkan tepat waktu."
  }
];

const AnnouncementsSection = ({ className = '' }) => {
  const announcements = sampleAnnouncements;

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
          <Button>
            Lihat Semua Pengumuman
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default AnnouncementsSection;