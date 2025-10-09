import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { AnnouncementCard, Button, Icon, Section } from "../../components/ui";
import { useAnnouncements } from "../../hooks/useSchool";

const Announcement = ({ className = "" }) => {
  const { announcements, isLoading } = useAnnouncements();
  return (
    <>
      <Navbar />
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/lobby-dalam.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Pengumuman Sekolah
          </h1>
          <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
            Informasi resmi terbaru dari SMK Negeri 8 Jember untuk siswa, guru,
            dan masyarakat.
          </p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-16">
          <div className="flex overflow-x-auto  flex-col gap-4 md:gap-6 w-full">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="w-full py-6">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-16 flex justify-center">
          <Button>Tampilkan Lebih Banyak Pengumuman</Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Announcement;
