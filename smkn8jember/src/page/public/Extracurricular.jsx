import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CardFE from "../../components/ui/CardFE";
import { useExtarculiculars } from "../../hooks/api/useExtarculicular";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { Link } from "react-router-dom";

const Extracurricular = () => {
  const { data: ekstraResponse, isLoading, isError } = useExtarculiculars();
  const ekstra = ekstraResponse?.data || [];

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
          Ekstrakulikuler Sekolah
        </h1>
        <p className="font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0">
          Semua Ekstrakulikuler yang ada di SMK Negeri 8 Jember
        </p>
      </section>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-7 p-4 lg:p-16">
        {ekstra.map((item, index) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link to={`/ekstrakurikuler/${slug}?i=${item.id}`} key={index}>
              <CardFE
                data1={item.image}
                data2={item.name}
                data3={`${item.mentor_name}`}
                data4={item.description}
              />
            </Link>
          );
        })}
      </div>
    </DefaultLayout>
  );
};

export default Extracurricular;
