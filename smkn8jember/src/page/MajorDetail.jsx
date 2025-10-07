import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  MdCode,
  MdDoubleArrow,
  MdOutlineLightbulb,
  MdWeb,
} from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import { useArticles } from "../hooks/useSchool";
import { ArticleCard } from "../components/ui";
const MajorDetail = () => {
  const [subjects, setSubjects] = useState([]);
  const { visibleArticles, isLoading } = useArticles();
  useEffect(() => {
    let cancelled = false;
    fetch("/mapel.json")
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setSubjects(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setSubjects([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const carieers = [
    {
      icon: <MdCode size={40} />,
      title: "Software Development",
      salary: "Gaji: Rp 8-25 juta/bulan",
    },
    {
      icon: <MdWeb size={40} />,
      title: "Web Development",
      salary: "Gaji: Rp 8-25 juta/bulan",
    },
    {
      icon: <AiOutlineMobile size={40} />,
      title: "Mobile Developer",
      salary: "Gaji: Rp 8-25 juta/bulan",
    },
    {
      icon: <MdOutlineLightbulb size={40} />,
      title: "Pengusaha Teknologi",
      salary: "Gaji: Rp 8-25 juta/bulan",
    },
  ];
  console.log("visibleArticles:", visibleArticles);

  return (
    <>
      <Navbar />
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/jurusan-rpl.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins p-2 font-bold text-white text-4xl md:text-6xl mb-4">
            Rekayasa Perangkat Lunak
          </h1>
        </div>
      </section>
      <section className="flex flex-col gap-4 items-center justify-center bg-[#F8F9FA] px-8 py-16">
        <h1 className="font-bold text-2xl text-center md:text-start">
          Tentang Jurusan Rekayasa Perangkat Lunak
        </h1>
        <p className="  md:text-justify text-gray-700 leading-relaxed">
          Rekayasa Perangkat Lunak (RPL) adalah salah satu program keahlian di
          bidang Teknologi Informasi dan Komunikasi yang berfokus pada
          pengembangan perangkat lunak atau software. Jurusan ini mempersiapkan
          siswa agar mampu merancang, membuat, mengembangkan, dan menguji
          aplikasi berbasis desktop, web, maupun mobile. Di RPL, siswa akan
          belajar mulai dari dasar logika pemrograman hingga implementasi
          aplikasi secara nyata. Kurikulum dirancang untuk mengikuti
          perkembangan teknologi terkini dan kebutuhan industri.
        </p>
      </section>

      <section className="bg-[#eeeeee] py-16 flex flex-col items-center justify-center px-2 m-8 rounded-2xl">
        <h1 className="text-2xl font-bold mb-8 relative">
          Mata Pelajaran Utama
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-6 w-full">
          {subjects.map((item) => (
            <div
              key={item.id ?? item.mapel}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-2 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2">
                <MdDoubleArrow size={20} className="text-[#FF6000]" />
                <h2 className="font-bold text-lg">
                  {item.mapel || item.title}
                </h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F77F00]/50 py-16 flex flex-col items-center justify-center px-6 m-8 rounded-lg">
        <h1 className="font-bold text-2xl mb-10 text-white">Peluang Karier</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
          {carieers.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="bg-[#FF6000] text-white p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="font-semibold text-lg text-white leading-tight">
                {item.title}
              </h2>
              <p className="text-sm text-white">{item.salary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 flex flex-col items-center justify-center px-2 m-8">
        <h1 className="font-bold text-2xl">Prestasi</h1>

        {/* Container scroll horizontal */}
        <div className="flex gap-6 w-full pt-10 pb-4 overflow-x-auto no-scrollbar">
          {visibleArticles.map((article) => (
            <div key={article.id} className="flex-none w-72 sm:w-80 md:w-96">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
      <h1 className="font-bold text-2xl justify-center items-center text-center mt-3">Bekerja sama dan dipercaya oleh</h1>
      <section className="bg-[#F7BB7D] py-16 flex flex-col items-center justify-center px-6 m-8 rounded-lg">

      </section>
      <Footer />
    </>
  );
};

export default MajorDetail;
