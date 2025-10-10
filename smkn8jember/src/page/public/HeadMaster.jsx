import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const HeadMaster = () => {
  return (
    <>
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        className="flex flex-col items-center justify-center py-20 relative text-center"
        style={{
          backgroundImage: "url('/assets/images/header-headmaster.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
            Kepala Sekolah
          </h1>
          <p className="font-poppins leading-snug hidden md:block text-white text-lg md:text-xl ">
            Profil lengkap kepala sekolah SMKN 8 Jember yang memimpin dengan
            dedikasi tinggi dalam mengembangkan pendidikan berkualitas.
          </p>
        </div>
      </section>

      {/* ===== CONTENT SECTION ===== */}
      <section className="flex items-center justify-center bg-[#F8F9FA] px-6 py-16">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="bg-white shadow-lg justify-center rounded-2xl p-8 flex flex-col items-center text-center h-full">
            <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
              <img
                src="/assets/images/KEPSEK.jpg"
                alt="Kepala Sekolah"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-poppins font-semibold text-xl text-[#111827]">
              Hj. RAHMAH HIDANA S.Pd., M.Si
            </h2>
            <p className="text-sm font-bold text-[#F97316] mt-1">
              Kepala Sekolah
            </p>
          </div>

          {/* Kanan: Kata Sambutan */}
          <div className="bg-[#F77F00]/10 shadow-md rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between">
            <h3 className="font-poppins font-bold text-2xl text-[#111827] mb-5">
              Kata Sambutan
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              Web Site merupakan salah satu wujud dari kemajuan teknologi di
              dunia yang tentunya memberikan keuntungan bagi pengguna teknologi
              sehingga bisa dengan mudah mendapatkan informasi yang diinginkan
              melalui Web Site. SMKN 8 Jember telah memiliki Web site yang
              berisi tentang segala informasi SMKN 8 Jember diantaranya mengenai
              sejarah awal mula berdirinya sekolah ini, berisi tentang data-data
              guru/ siswa, dan tentunya juga berisi tentang berita
              kegiatan-kegiatan sekolah.Dengan adanya Web Site ini diharapkan
              dapat memudahkan para pengguna teknologi untuk mendapatkan
              informasi tentang SMKN 8 Jember. Selain itu, saya selaku Kepala
              SMKN 8 Jember berharap isi dan berita didalamnya dapat diketahui
              oleh masyarakat luas dan bisa diambil manfaat darinya.
            </p>

            <div className="mt-8 flex items-center">
              <div>
                <p className="font-semibold text-base text-[#111827]">
                  Hj. RAHMAH HIDANA S.Pd., M.Si
                </p>
                <p className="text-sm text-gray-500">Kepala Sekolah</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HeadMaster;
