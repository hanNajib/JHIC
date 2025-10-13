import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CardFE from "../../components/ui/CardFE";

const Extracurricular = () => {
  const [ekstra, setEkstra] = useState([]);

  useEffect(() => {
    fetch("/ekstra.json")
      .then((res) => res.json())
      .then((data) => setEkstra(data));
  }, []);

  return (
    <>
      <Navbar />

      <section
        style={{
          backgroundImage: "url('/assets/images/header-history.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center justify-center py-12 md:py-14 lg:py-20 relative"
      >
        <div className="bg-gradient-to-r from-[#24201f9a] to-transparent w-full h-full absolute"></div>
        <h1 className="font-poppins font-bold text-[#F8F9FA] text-3xl md:text-[4rem] z-10">
          Ekstrakulikuler Sekolah
        </h1>
        <p className="font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0">
          Semua Ekstrakulikuler yang ada di SMK Negeri 8 Jember
        </p>
      </section>


      {/* Versi 1 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 lg:p-16 lg:gap-7 ">
          {ekstra.map((item, index) => (
            <CardFE
              key={index}
              data1={item.foto}
              data2={item.nama}
              data3={item.pembimbing}
              data4={item.deskripsi}
            />
          ))}
        </div>

      {/* VErsi 2 */}
      {/* <section className="flex flex-col items-center py-10 px-4 lg:px-16">
        <h2 className="font-bold text-2xl lg:text-4xl text-gray-800">Ekstrakulikuler</h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7 mt-10">
          {ekstra.map((item, index) => (
            <CardFE
              key={index}
              data1={item.foto}
              data2={item.nama}
              data3={item.pembimbing}
              data4={item.deskripsi}
            />
          ))}
        </div>
      </section> */}

      <Footer />
    </>
  );
};

export default Extracurricular;
