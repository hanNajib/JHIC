import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardGK from "../../components/ui/CardGK";

const Teacher = () => {
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    fetch("/guru.json")
      .then((res) => res.json())
      .then((data) => setGuru(data));
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
          Data Guru
        </h1>
        <p className="font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0">
          Di balik setiap keberhasilan siswa, ada guru hebat yang bekerja dengan
          sepenuh hati untuk membimbing, melayani, dan menginspirasi.
        </p>
      </section>

      {/* Versi 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 lg:p-16 lg:gap-7">
        {guru.map((item, index) => (
          <CardGK
            key={index}
            data1={item.nama}
            data2={item.mapel}
            data3={item.foto}
          />
        ))}
      </div>

      {/* Versi 2 */}
      {/* <section className="flex flex-col items-center py-10 px-4 lg:px-16">
        <h2 className="font-bold text-2xl lg:text-4xl text-gray-800">
          Guru Guru Hebat Kami
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7 mt-10">
          {guru.map((item, index) => (
            <CardGK
              key={index}
              data1={item.nama}
              data2={item.mapel}
              data3={item.foto}
            />
          ))}
        </div>
      </section> */}

      <Footer />
    </>
  );
};

export default Teacher;
