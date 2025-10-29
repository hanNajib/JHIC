import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoMdPin } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import parse from "html-react-parser";
import { Link } from "react-router-dom";
import { useMajors } from "../hooks/api/useMajor";
import { useWebSettings } from "../hooks/api/useWebSettings";

const Footer = ({ data }) => {
  const { data: majorResponse } = useMajors();
  const majors = majorResponse?.data || [];
  const { data: websetting } = useWebSettings();
  const { youtube_link, instagram_link, facebook_link, telepon, email, alamat, deskripsi_footer } = websetting?.data?.reduce((acc, setting) => {
    acc[setting.title] = setting.value;
    return acc;
  }, {}) || {};

  return (
    <>
      <div className="flex flex-col bg-[#212529] p-8 md:p-20 w-full justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-flow-col lg:auto-cols-max gap-10 justify-between">
          <div className="flex flex-col gap-4 w-auto">
            <h1 className="font-poppins font-bold text-[#ff6000] text-xl">
              SMK Negeri 8 Jember
            </h1>
            <p className="font-poppins text-[#A0A0A0] text-sm">
              {data
                ? parse(deskripsi_footer)
                : "Sekolah Menengah Kejuruan yang berkomitmen menghasilkan lulusan berkualitas dan siap kerja di era digital."}
            </p>
            <div className="flex items-center gap-2">
              <a href={youtube_link || ""}>
                <FaYoutube className="text-white bg-[#ff6000] text-[2rem] p-2 rounded-full" />
              </a>
              <a href={instagram_link || ""}>
                <FaInstagram className="text-white bg-[#ff6000] text-[2rem] p-2 rounded-full" />
              </a>
              <a href={facebook_link || ""}>
                <FaFacebook className="text-white bg-[#ff6000] text-[2rem] p-2 rounded-full" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-auto">
            <h1 className="font-poppins font-bold text-[#ff6000] text-xl">
              Navigasi
            </h1>
            <div className="flex flex-col gap-2">
              <a href="" className="font-poppins text-[#A0A0A0] text-md">
                Beranda
              </a>
              <a href="" className="font-poppins text-[#A0A0A0] text-md">
                Profil Sekolah
              </a>
              <a href="" className="font-poppins text-[#A0A0A0] text-md">
                Artikel & Blog
              </a>
              <a href="" className="font-poppins text-[#A0A0A0] text-md">
                Galeri Kegiatan
              </a>
              <a href="" className="font-poppins text-[#A0A0A0] text-md">
                Pengumuman
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-auto">
            <h1 className="font-poppins font-bold text-[#ff6000] text-xl">
              Program Keahlian
            </h1>
            <div className="flex flex-col gap-2">
              {majors.map((major) => (
                <Link to={`/major/${major.short_name}`} key={major.id} className="font-poppins text-[#A0A0A0] text-md">
                  {major.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-auto">
            <h1 className="font-poppins font-bold text-[#ff6000] text-xl">
              Kontak Kami
            </h1>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <IoMdPin className="text-[#ff6000] text-2xl" />
                <p className="font-poppins text-[#A0A0A0] text-md max-w-xs">
                  {alamat || 'Jl. Pelita no 27 Sidomekar'}
                </p>
              </div>
              <div className="flex gap-3">
                <FaPhone className="text-[#ff6000] text-2xl" />
                <p className="font-poppins text-[#A0A0A0] text-md">
                  {telepon || '(0336)444112'}
                </p>
              </div>
              <div className="flex gap-3">
                <IoMdMail className="text-[#ff6000] text-2xl" />
                <p className="font-poppins text-[#A0A0A0] text-md">
                  {email || 'smknegeri08jember@gmail.com'}
                </p>
              </div>
              <div className="flex gap-3">
                <FaClock className="text-[#ff6000] text-2xl" />
                <p className="font-poppins text-[#A0A0A0] text-md">
                  Senin - Jumat: 07:00 - 15:00
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-white md:w-2/3 lg:w-1/2 mt-14 rounded-2xl">
          <img src="/assets/images/Logo Jagoan Hosting, Komdigi, Maspion IT, Garuda Spark.png" alt="" className="" />
        </div>


        <div className="flex border-t-2 w-full border-[#495057] justify-center items-center mt-8 text-center">
          <p className="font-poppins text-[#A0A0A0] text-sm pt-8">
            © {new Date().getFullYear()} SMK Negeri 8 Jember. Semua hak dilindungi undang-undang.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
