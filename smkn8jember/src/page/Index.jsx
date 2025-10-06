import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { LuBookText } from "react-icons/lu";
import { FaChalkboardTeacher, FaMotorcycle } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { LuHousePlus } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaWifi } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { IoCarSport } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { PiPlantFill } from "react-icons/pi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { RiMegaphoneFill } from "react-icons/ri";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const  Index = () => {

  const [isAboutLengkap, setAboutLengkap] = useState(false);
  const [isJurusanLengkap, setJurusanLengkap] = useState(false);

  return (
    <>
      <Navbar/>
      <section  style={{ backgroundImage: "url('/assets/images/hero.png')", backgroundSize: "cover", backgroundPosition: "center",}} className="h-screen flex lg:items-center">
        <div className="bg-gradient-to-r from-[#39302c9a] to-transparent w-full h-screen absolute"></div>
        <div className="px-6 md:px-16 w-full lg:w-5/6 z-10 pt-20 md:pt-36 lg:pt-0">
          <h1 className='font-poppins text-[#F8F9FA] text-left md:text-center lg:text-left font-bold text-5xl md:text-6xl lg:text-7xl'><span className='underline decoration-[#ff6000]'>SMK NEGERI 8 JEMBER</span> <br /> WES TOP </h1>
          <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left hidden md:flex md:text-lg'>Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas, dengan menyiapkan lulusan yang siap kerja, siap berwirausaha, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi.</p>
          <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left md:hidden md:text-lg'>Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas.</p>
          <div className="flex flex-col md:flex-row gap-5 md:justify-center lg:justify-start">
            <a href="" className='text-white bg-[#ff6000] px-5 py-2 font-poppins font-bold rounded-full text-center'>Baca Selengkapnya</a>
            <a href="" className='text-[#ff6000] bg-transparent px-5 py-2 font-poppins font-bold rounded-full border-2 boder-[#ff6000] text-center'>Baca Selengkapnya</a>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FA] flex flex-col lg:flex-row justify-center items-center px-6 py-10 md:px-16 md:py-12 gap-5">
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="flex flex-col items-center justify-center gap-3 pb-5">
            <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem]'>Tentang <span className='text-[#ff6000]'>Kami</span></h1>
            <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          </div>
          <p className={`font-poppins text-[#272727] font-medium text-[14px] text-justify  ${isAboutLengkap? 'line-clamp-0' : 'line-clamp-10'}`}>SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik. SMK Negeri 8 Jember adalah institusi pendidikan kejuruan yang berkomitmen untuk menghasilkan lulusan yang kompeten, berkarakter, dan siap menghadapi tantangan dunia kerja. Dengan pengalaman lebih dari 25 tahun, kami terus berinovasi dalam memberikan pendidikan berkualitas tinggi yang mengintegrasikan teori dan praktik.</p>
          
          <div className="flex md:hidden py-4 justify-center text-center">
            <button onClick={() => setAboutLengkap(!isAboutLengkap)}>
              {isAboutLengkap ? (
                <p className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl flex items-center justify-center gap-2'>Tampilkan Lebih Sedikit <FaChevronUp/> </p>
              ) : (
                <p className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl flex items-center justify-center gap-2'>Lihat Selengkapnya <FaChevronDown/> </p>
              )}
            </button>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-2 w-full gap-3 py-4 lg:pr-8">

            <div className="relative w-full bg-white shadow-lg md:rounded-xl flex items-center justify-center md:px-5 px-2 py-6 rounded-full md:py-4 md:gap-5 cursor-pointer group">
              <p className='text-3xl text-[#3C4A78]'> <LuBookText/> </p>
              <div className='hidden md:flex flex-col justify-center items-center'>
                <h1 className='text-[#ff6000] font-poppins font-bold text-3xl'>2,500+</h1>
                <h1 className='text-[#272727] font-poppins font-medium text-sm'>Siswa - Siswi</h1>
              </div>

              <div class="absolute hidden group-hover:flex group-hover:md:hidden justify-center items-center flex-col bg-white shadow-lg p-4 rounded-xl top-full mt-2  z-10 left-0 w-56">
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-[#ff6000] font-poppins font-bold text-2xl'>2,500+</h1>
                  <h1 className='text-[#272727] font-poppins font-medium text-sm'>Siswa - Siswi</h1>
                </div>  
              </div>

            </div>

            <div className="relative w-full bg-white shadow-lg md:rounded-xl flex items-center justify-center md:px-5 px-2 py-6 rounded-full md:py-4 md:gap-5 cursor-pointer group">
              <p className='text-3xl text-[#3C4A78]'> <FaChalkboardTeacher/> </p>
              <div className='hidden md:flex flex-col justify-center items-center'>
                <h1 className='text-[#ff6000] font-poppins font-bold text-3xl'>90+</h1>
                <h1 className='text-[#272727] font-poppins font-medium text-sm'>Guru</h1>
              </div>

              <div class="absolute hidden group-hover:flex group-hover:md:hidden justify-center items-center flex-col bg-white shadow-lg p-4 rounded-xl top-full mt-2  z-10 left-0 w-56">
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-[#ff6000] font-poppins font-bold text-2xl'>90+</h1>
                  <h1 className='text-[#272727] font-poppins font-medium text-sm'>Guru</h1>
                </div>  
              </div>

            </div>

            <div className="relative w-full bg-white shadow-lg md:rounded-xl flex items-center justify-center md:px-5 px-2 py-6 rounded-full md:py-4 md:gap-5 cursor-pointer group">
              <p className='text-3xl text-[#3C4A78]'> <PiStudentBold/> </p>
              <div className='hidden md:flex flex-col justify-center items-center'>
                <h1 className='text-[#ff6000] font-poppins font-bold text-3xl'>20,000+</h1>
                <h1 className='text-[#272727] font-poppins font-medium text-sm'>Lulusan Potensial</h1>
              </div>

              <div class="absolute hidden group-hover:flex group-hover:md:hidden justify-center items-center flex-col bg-white shadow-lg p-4 rounded-xl top-full mt-2  z-10 right-0 w-56">
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-[#ff6000] font-poppins font-bold text-2xl'>20.000+</h1>
                  <h1 className='text-[#272727] font-poppins font-medium text-sm'>Lulusan Potensional</h1>
                </div>  
              </div>

            </div>

            <div className="relative w-full bg-white shadow-lg md:rounded-xl flex items-center justify-center md:px-5 px-2 py-6 rounded-full md:py-4 md:gap-5 cursor-pointer group">
              <p className='text-3xl text-[#3C4A78]'> <LuHousePlus/> </p>
              <div className='hidden md:flex flex-col justify-center items-center'>
                <h1 className='text-[#ff6000] font-poppins font-bold text-3xl'>17+</h1>
                <h1 className='text-[#272727] font-poppins font-medium text-sm'>Tahun Berdiri</h1>
              </div>

              <div class="absolute hidden group-hover:flex group-hover:md:hidden justify-center items-center flex-col bg-white shadow-lg p-4 rounded-xl top-full mt-2  z-10 right-0 w-56">
                <div className='flex flex-col justify-center items-center'>
                  <h1 className='text-[#ff6000] font-poppins font-bold text-2xl'>17+</h1>
                  <h1 className='text-[#272727] font-poppins font-medium text-sm'>Tahun Berdiri</h1>
                </div>  
              </div>

            </div>

          </div>
        </div>

        <div className="flex justify-center items-center lg:w-1/2">
          <img src="assets/images/about-img.png" alt="" />
        </div>
      </section>


      <section className="flex justify-center items-center bg-gradient-to-b from-[#f7800027] to-[#f7800034] px-6 py-12 md:px-16 md:py-16 flex-col">
        <div className="flex flex-col items-center justify-center gap-3 pb-5">
          <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem] text-center'>Program <span className='text-[#ff6000]'>Keahlian</span></h1>
          <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          <p className='font-poppins text-[#495057] pt-4 text-center'>SMKN 8 Jember menyediakan 7 program keahlian</p>
        </div>

        <div className="flex flex-col md:flex-row overflow-x-auto w-full pt-8 md:pt-10 gap-6 md:gap-4 items-stretch pb-4">


          <div className="tkr flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <IoCarSport/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Teknik Kendaraan Ringan</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">
                Program keahlian yang membekali siswa dengan kemampuan perawatan, perbaikan, dan pengelolaan sistem kendaraan ringan berbasis teknologi otomotif modern.
              </p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Mesin Kendaraan</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Sistem Chassis</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Kelistrikan Mobil</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Sistem Injeksi</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Teknologi Otomotif</div>
              </div>

            </div>
          </div>

          <div className="tsm flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/tsm.jpg" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <FaMotorcycle/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Teknik Sepeda Motor</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">
                Program keahlian yang berfokus pada pemeliharaan, perbaikan, dan penguasaan teknologi sepeda motor, baik konvensional maupun injeksi.
              </p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Mesin Sepeda Motor</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Sistem Chassis</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Kelistrikan Motor</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Perawatan Motor</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Sistem Injeksi</div>
              </div>
            </div>
          </div>

          <div className="rpl flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/rpl.jpg" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <FaCode/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Rekayasa Perangkat Lunak</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">Program keahlian yang mempersiapkan siswa menjadi programmer, web developer, dan software engineer yang handal.</p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>UI/UX</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Dasar Premrograman</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>OOP</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Database</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Mobile App</div>
              </div>
            </div>
          </div>

          <div className={`tkj md:flex flex-col flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip ${isJurusanLengkap? 'flex' : 'hidden'}`}>
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/hero.png" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <FaWifi/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Teknik Komputer dan Jaringan</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">Program keahlian yang mempersiapkan siswa menjadi teknisi jaringan, administrator sistem, dan ahli IT support yang kompeten di bidang jaringan komputer dan perangkat keras.</p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Dasar Dasar Jaringan</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Keamanan Jaringan</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Routing & Switching</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Sistem Operasi</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Administrasi server</div>
              </div>
            </div>
          </div>
          
          <div className={`dkv md:flex flex-col flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip ${isJurusanLengkap? 'flex' : 'hidden'}`}>
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/hero.png" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <IoMdColorPalette/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Desain Komunikasi Visual</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">Program keahlian yang membekali siswa dengan keterampilan di bidang desain grafis, ilustrasi, dan media visual untuk keperluan komunikasi dan industri kreatif.</p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Desain Grafis</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Tipografi</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Fotografi</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Video Editing / Animasi Dasar</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium flex items-center justify-center relative'>Komunikasi Visual</div>
              </div>
            </div>
          </div>

          <div className={`atph md:flex flex-col flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip ${isJurusanLengkap? 'flex' : 'hidden'}`}>
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/hero.png" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <RiPlantFill /> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Agribisnis Tanaman Pangan dan Hortikultura</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">
                Program keahlian yang mempelajari teknik budidaya tanaman pangan dan hortikultura serta pengelolaan agribisnis pertanian yang berkelanjutan.
              </p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Tanaman Pangan</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Tanaman Hortikultura</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Produksi Tanaman</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Manajemen Agribisnis</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Pemasaran Hasil</div>
              </div>
            </div>
          </div>

          <div className={`apt md:flex flex-col flex-none w-full lg:w-1/3 bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip ${isJurusanLengkap? 'flex' : 'hidden'}`}>
            <img className='h-52 md:h-56 w-full object-cover' src="assets/images/hero.png" alt="" />
            <div className="flex flex-col px-5 py-6 gap-2 relative">
              <div className="flex items-center gap-3">
                <span className='p-2 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <PiPlantFill/> </span>
                <h1 className='text-[#242424] font-poppins font-semibold '>Agribisnis Perbenihan Tanaman</h1>
              </div>
              <p className="text-[#495057] leading-snug py-2">
                Program keahlian yang membekali siswa dengan keterampilan dalam memproduksi, mengelola, dan memasarkan benih tanaman berkualitas tinggi sesuai standar agribisnis modern.
              </p>
              <p className='font-poppins font-medium text-[#ff6000] text-sm'>Mata pelajaran utama:</p>
              <div className="flex flex-wrap w-full gap-2 relative">
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Teknologi Perbenihan</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Produksi Benih</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Pengujian Mutu Benih</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Penyimpanan Benih</div>
                <div className='px-4 py-1 bg-[#ffa07b] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>Pemasaran Benih</div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex md:hidden py-4 justify-center text-center">
            <button onClick={() => setJurusanLengkap(!isJurusanLengkap)}>
              {isJurusanLengkap ? (
                <p className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl flex items-center justify-center gap-2'>Tampilkan Lebih Sedikit <FaChevronUp/> </p>
              ) : (
                <p className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl flex items-center justify-center gap-2'>Lihat Selengkapnya <FaChevronDown/> </p>
              )}
            </button>
          </div>

      </section>

      <section className="flex justify-center items-center bg-gradient-to-b px-6 py-12 md:px-16 md:py-16 flex-col">

        <div className="flex flex-col items-center justify-center gap-3 pb-5">
          <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem] text-center'>Artikel <span className='text-[#ff6000]'>Terbaru</span></h1>
          <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          <p className='font-poppins text-[#495057] pt-4 text-center'>Ikuti berita dan informasi terkini seputar kegiatan dan prestasi SMK Negeri 8 Jember</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">

          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 1 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 2 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 3 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 4 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 5 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-56 w-full object-cover' src="assets/images/tkr.jpg" alt="" />
            <div className="flex flex-wrap w-full gap-2 relative px-5 py-6">
              <div className='px-4 py-1 bg-[#ff6000] text-[#ffffff] text-xs rounded-2xl font-poppins font-medium'>Prestasi</div>
              <div className='px-4 py-1 bg-[#ff6000] text-[#fff] text-xs rounded-2xl font-poppins font-medium'>RPL</div>
            </div>
            <div className="flex flex-col px-5 gap-2 relative">
              <h1 className='text-[#1a1a1a] text-lg font-poppins font-bold' >Juara 6 Lomba  Kompetensi Siswa Tingkat Kabupaten Jember</h1>
              <p className="text-[#5a5a5a] leading-snug py-1 line-clamp-2 font-medium">
                Siswa SMK Negeri 8 Jember kembali meraih juara dalam ajang perlombannahasidhasihciuasgigasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, magnam impedit nesciunt fugiat ducimus perspiciatis voluptatibus tenetur hic, nobis beatae fugit saepe exercitationem sunt placeat quae cum delectus vero natus.
              </p>
            </div>
            <div className="flex flex-col pb-7 pt-2 px-5 gap-2 relative">
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <LuEye/> Telah Dilihat Sebanyak 109</p>
            </div>
          </div>

          
        </div>

        <div className="flex justify-center items-center w-full pt-5">
          <a href="" className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl'>Lihat Semua Artikel</a>
        </div>

      </section>


      <section className="flex justify-center items-center bg-gradient-to-b from-[#f7800027] to-[#f7800034] px-6 py-12 md:px-16 md:py-16 flex-col">
        <div className="flex flex-col items-center justify-center gap-3 pb-5">
          <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem] text-center'>Pengumuman <span className='text-[#ff6000]'>Terbaru</span></h1>
          <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          <p className='font-poppins text-[#495057] pt-4 text-center'>Informasi penting dan terkini untuk seluruh siswa, orang tua, dan civitas akademika SMK  Negeri 8 Jember</p>
        </div>

        <div className="flex flex-col gap-5 w-full mx-20 bg-[#F8F9FA] rounded-xl shadow-md p-5 md:p-10 mt-5">
          <div className="flex items-center gap-3 md:pb-3">
            <span className='p-3 md:p-4 bg-[#3C4A78] text-[#fff] text-2xl rounded-full'> <RiMegaphoneFill/> </span>
            <h1 className='text-[#212529] text-xl md:text-3xl font-poppins font-bold '>Papan Pengumuman</h1>
          </div>

          <div className="flex overflow-x-auto flex-row md:flex-col gap-2 md:gap-5 w-full">
            
            <div className="min-w-full flex flex-col px-7 py-5 bg-white border-2 border-[#49505730] rounded-xl">
              <div className="flex flex-col items-start gap-3 md:gap-0 md:flex md:flex-row md:items-center">
                <h1 className='text-[#212529] font-semibold font-poppins text-lg flex-100'>Kegiatan MPLS 2025</h1>
                <span className='text-[#0800E1] font-poppins font-bold text-sm bg-[#0700e136] px-4 py-1 rounded-4xl'>Info</span>
              </div>
              <p className='font-poppins text-[#495057] text-md py-3'>Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
            </div>

            <div className="min-w-full flex flex-col px-7 py-5 bg-white border-2 border-[#49505730] rounded-xl">
              <div className="flex flex-col items-start gap-3 md:gap-0 md:flex md:flex-row md:items-center">
                <h1 className='text-[#212529] font-semibold font-poppins text-lg flex-100'>Kegiatan MPLS 2025</h1>
                <span className='text-[#E10000] font-poppins font-bold text-sm bg-[#e1000043] px-4 py-1 rounded-4xl'>Penting</span>
              </div>
              <p className='font-poppins text-[#495057] text-md py-3'>Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
            </div>

            <div className="min-w-full flex flex-col px-7 py-5 bg-white border-2 border-[#49505730] rounded-xl">
              <div className="flex flex-col items-start gap-3 md:gap-0 md:flex md:flex-row md:items-center">
                <h1 className='text-[#212529] font-semibold font-poppins text-lg flex-100'>Kegiatan MPLS 2025</h1>
                <span className='text-[#0800E1] font-poppins font-bold text-sm bg-[#0700e136] px-4 py-1 rounded-4xl'>Info</span>
              </div>
              <p className='font-poppins text-[#495057] text-md py-3'>Masa Pengenalan Lingkungan Sekolah (MPLS) akan dilaksanakan pada tanggal 15–17 Juli 2024 untuk seluruh siswa baru. Peserta wajib hadir pukul 06.30 dengan mengenakan seragam putih biru (SMP) atau putih abu (SMA/SMK).</p>
              <p className="text-[#5a5a5a] leading-snug font-medium text-sm flex items-center gap-2"> <IoCalendarClearOutline/> 25 Februari 2025</p>
            </div>

          </div>
          

          <div className="flex justify-center items-center w-full py-3 md:py-0 md:pt-5">
            <a href="" className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl'>Lihat Semua Pengumuman</a>
          </div>


        </div>

      </section>


      <section className="flex justify-center items-center bg-gradient-to-b px-6 py-12 md:px-16 md:py-16 flex-col">

        <div className="flex flex-col items-center justify-center gap-3 pb-5">
          <h1 className='font-poppins text-[#212529] font-bold text-3xl md:text-4xl lg:text-[3rem] text-center'>Galeri <span className='text-[#ff6000]'>Sekolah</span></h1>
          <div className="w-1/2 h-1 bg-[#ff6000]"></div>
          <p className='font-poppins text-[#495057] pt-4 text-center'>Dokumentasi kegiatan, prestasi, Event, dan fasilitas SMK Negeri 8 Jember yang membanggakan</p>
        </div>

        <div className="flex flex-wrap w-full justify-center items-center gap-3 py-5">
          <button className='button-active flex justify-center items-center font-poppins font-bold text-[#ff6000] bg-transparent border-2 border-[#ff6000] rounded-3xl text-sm md:text-md py-1 px-6'>Semua</button>
          <button className='flex justify-center items-center font-poppins font-bold text-[#ff6000] bg-transparent border-2 border-[#ff6000] rounded-3xl text-sm md:text-md py-1 px-6'>Kegiatan</button>
          <button className='flex justify-center items-center font-poppins font-bold text-[#ff6000] bg-transparent border-2 border-[#ff6000] rounded-3xl text-sm md:text-md py-1 px-6'>Event</button>
          <button className='flex justify-center items-center font-poppins font-bold text-[#ff6000] bg-transparent border-2 border-[#ff6000] rounded-3xl text-sm md:text-md py-1 px-6'>Fasilitas</button>
          <button className='flex justify-center items-center font-poppins font-bold text-[#ff6000] bg-transparent border-2 border-[#ff6000] rounded-3xl text-sm md:text-md py-1 px-6'>Prestasi</button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full pt-10 gap-6 items-stretch pb-4">

          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>
          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>
          <div className="flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>
          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>
          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>
          <div className="hidden md:flex md:flex-col md:flex-none bg-[#F8F9FA] rounded-2xl shadow-lg overflow-clip">
            <img className='h-60 w-full object-cover' src="assets/images/senam.png" alt="" />
          </div>

          
        </div>

        <div className="flex justify-center items-center w-full pt-5">
          <a href="" className='text-white bg-[#ff6000] font-poppins font-bold px-5 py-2 rounded-4xl'>Lihat Semua Galeri</a>
        </div>

      </section>

      <Footer></Footer>

    </>
  )
}

export default Index