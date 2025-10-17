import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CardGK from "../../components/ui/CardGK";
import { useStaff } from "../../hooks/api/useStaff";

const Employee = () => {
  const { data: karyawanResponse, isLoading } = useStaff({
    role: "employee",
    all: true,
  });

  const karyawan = karyawanResponse?.data || [];

  return (
    <>
      <Navbar />

      {/* Header */}
      <section
        style={{
          backgroundImage: "url('/assets/images/header-staf.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col items-center justify-center py-12 md:py-14 lg:py-20 relative"
      >
        <div className="absolute inset-0 bg-orange-700 opacity-40"></div>
        <h1 className="font-poppins font-bold text-[#F8F9FA] text-3xl md:text-[4rem] z-10">
          Data Karyawan
        </h1>
        <p className="font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0">
          Karyawan SMK kami berperan aktif dalam mencetak generasi siap kerja
          yang berkompeten dan berdaya saing.
        </p>
      </section>

      {/* Grid Karyawan */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 lg:p-16 lg:gap-7">
        {isLoading ? (
          // 🟠 Skeleton saat loading
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 animate-pulse"
              >
                <div className="w-32 h-32 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))
        ) : karyawan.length > 0 ? (
          karyawan.map((item, index) => (
            <CardGK
              key={index}
              data1={item.name}
              data2={item.position}
              data3={item.image}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            Belum ada data karyawan.
          </p>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Employee;
