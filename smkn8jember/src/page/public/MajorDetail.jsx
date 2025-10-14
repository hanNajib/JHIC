import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  MdCode,
  MdDoubleArrow,
  MdOutlineLightbulb,
  MdWeb,
} from "react-icons/md";
import { AiOutlineMobile } from "react-icons/ai";
import { ArticleCard, Loading } from "../../components/ui";
import { useMajor } from "../../hooks/api/useMajor";
import { useParams } from "react-router-dom";
import { useSubject, useSubjects } from "../../hooks/api/useSubject";
import { usePartners } from "../../hooks/api/usePartner";
import { useCareers } from "../../hooks/api/useCareer";
import TextLoading from "../../components/ui/TextLoading";
// import { useMajor } from "../../hooks/useMajors";

const MajorDetail = () => {
  const { id } = useParams();
  const { data: major, isLoading } = useMajor(id);
  const { data: subjects = [] } = useSubjects({ major_id: id });
  const { data: careers = []} = useCareers({major_id: id}); 
  const {data: partner = []} = usePartners({major_id: id});
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrame;
    let scrollPosition = 0;
    const speed = 1.2;

    const animate = () => {
      scrollPosition += speed;
      if (scrollPosition >= slider.scrollWidth / 2) {
        scrollPosition = 0;
      }
      slider.scrollLeft = scrollPosition;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
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

  const logoItems = [
    { src: "/assets/images/smartlogy-logo.png", alt: "Smartlogy" },
    { src: "/assets/images/hummatect.png", alt: "Hummatect" },
    { src: "/assets/images/mascitra.png", alt: "Mascitra" },
    { src: "/assets/images/ubig.png", alt: "UBIG" },
    { src: "/assets/images/tamara.png", alt: "Tamara" },
    { src: "/assets/images/pringapus.png", alt: "Pringapus" },
    { src: "/assets/images/mitra1.png", alt: "Mitra 1" },
    { src: "/assets/images/mitra2.png", alt: "Mitra 2" },
    { src: "/assets/images/mitra3.png", alt: "Mitra 3" },
    { src: "/assets/images/mitra4.png", alt: "Mitra 4" },
  ];

  if (isLoading) {
    return (
     <TextLoading />
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: `url(${
            major?.image || "/assets/images/jurusan-rpl.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins p-2 font-bold text-white text-4xl md:text-6xl mb-4">
            {major?.name}
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="flex flex-col gap-4 items-center justify-center bg-[#F8F9FA] px-8 py-16">
        <h1 className="font-bold text-2xl text-center md:text-start">
          Tentang Jurusan {major?.name}
        </h1>
        <p className="md:text-justify text-gray-700 leading-relaxed">
          {major?.description || "Deskripsi jurusan tidak tersedia."}
        </p>
      </section>

      {/* Subjects */}
      <section className="bg-[#eeeeee] py-16 flex flex-col items-center justify-center px-2 m-8 rounded-2xl">
        <h1 className="text-2xl font-bold mb-8 relative">
          Mata Pelajaran Utama
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto px-6 w-full">
          {Array.isArray(subjects) && subjects.length > 0 ? (
            subjects.map((item, idx) => (
              <div
                key={item.id ?? idx}
                className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-2 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2">
                  <MdDoubleArrow size={20} className="text-[#FF6000]" />
                  <h2 className="font-bold text-lg">{item.name}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              Mata pelajaran tidak tersedia.
            </p>
          )}
        </div>
      </section>

      {/* Careers */}
      <section className="bg-[#F77F00]/50 py-16 flex flex-col items-center justify-center px-6 m-8 rounded-lg">
        <h1 className="font-bold text-2xl mb-10 text-white">Peluang Karier</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
          {careers.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="bg-[#FF6000] text-white p-2 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
                {item.icon}
              </div>
              <h2 className="font-semibold text-lg text-white leading-tight">
                {item.name}
              </h2>
              <p className="text-sm text-white">{item.salary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Prestasi / Articles */}
      {major?.articles?.length > 0 && (
        <section className="py-16 flex flex-col items-center justify-center px-2 m-8">
          <h1 className="font-bold text-2xl">Prestasi</h1>
          <div className="flex gap-6 w-full pt-10 pb-4 overflow-x-auto no-scrollbar">
            {major.articles.map((article) => (
              <div key={article.id} className="flex-none w-72 sm:w-80 md:w-96">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Partners / Logos */}
      <h1 className="font-bold text-2xl justify-center items-center text-center mt-3">
        Bekerja sama dan dipercaya oleh
      </h1>
      <section className="py-16 px-6 m-8 rounded-lg overflow-hidden">
        <div
          ref={sliderRef}
          className="flex items-center gap-16 whitespace-nowrap overflow-hidden scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          {partner.map((val, index) => (
            <div key={index}>
                <div
                  key={`${val.id}-${index}`}
                  className="flex flex-col items-center justify-between gap-3 w-32 h-32"
                >
                  <img
                    src={val.image}
                    alt={val.name}
                    className="object-contain max-h-24 p-3 grayscale hover:grayscale-0 hover:scale-[1.1] transition-all duration-300"
                  />

                  <h2 className="font-poppins font-semibold text-center text-sm">
                    {val.name}
                  </h2>
                </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MajorDetail;
