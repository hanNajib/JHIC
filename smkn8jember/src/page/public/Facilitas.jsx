import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CardFE from "../../components/ui/CardFE";
import { useFacilities } from "../../hooks/api/useFacility";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Link } from "react-router-dom";

const Facilitas = () => {
  const { data: fasilitasResponse = [], isLoading, isError } = useFacilities();
  const fasilitas = fasilitasResponse?.data || [];
  return (
    <DefaultLayout>
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
          Fasilitas Sekolah
        </h1>
        <p className="font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0">
          Fasilitas lengkap dan modern yang mendukung proses pembelajaran dan
          pengembangan potensi siswa secara optimal.
        </p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7 p-4 lg:p-16">
        {fasilitas.map((item, index) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link to={`/fasilitas/${slug}?i=${item.id}`} key={index}>
              <CardFE
                data1={item.image}
                data2={item.name}
                data3={`${item.room_total} Ruang`}
                data4={item.description}
              />
            </Link>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default Facilitas;
