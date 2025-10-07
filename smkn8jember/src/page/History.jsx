import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaAnglesRight } from "react-icons/fa6";
import { LuBookText } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { LuSchool } from "react-icons/lu";
import { TbMedal } from "react-icons/tb";

const History = () => {
  return (
    <>

        <Navbar/>

        <section style={{ backgroundImage: "url('/assets/images/header-history.png')", backgroundSize: "cover", backgroundPosition: "center",}} className="flex flex-col items-center justify-center py-12 md:py-14 lg:py-20 relative">
            <div className="bg-gradient-to-r from-[#24201f9a] to-transparent w-full h-full absolute"></div>
            <h1 className='font-poppins font-bold text-[#F8F9FA] text-3xl md:text-[4rem] z-10'>Sejarah Sekolah</h1>
            <p className='font-poppins text-[#F8F9FA] text-sm text-center md:text-lg z-10 pt-2 md:pt-0'>Perjalanan Panjang SMK Negeri 8 Jember dalam Mencetak Generasi Unggul</p>
        </section>

        <section className='flex flex-col items-center justify-center bg-[#F8F9FA] px-6 py-12 md:px-16 md:py-12 gap-5 md:gap-8'>
            <h1 className='font-poppins text-justify leading-relaxed text-[#495057]'><span className='font-bold'>SMKN 8 Jember</span> awalnya bernama SMKN 1 Semboro. Berdirinya sekolah ini mengacu pada surat permohonan Kepala Dinas Pendidikan Kabupaten Jember tanggal 25 Agustus 2008 nomor : 421.3/3342/ 436.316/2008 tentang permohonan rekomendasi pendirian lembaga sekolah baru tingkat SMK di Kecamatan Semboro. Pada tahun pertama dimulainya proses kegiatan belajar dan mengajar yaitu tahun pelajaran 2008/2009, kegiatan belajar mengajar awalnya bertempat di gedung barat SMP Negeri 4 Tanggul, Kecamatan Semboro. Sebagian besar guru yang mengajar pada waktu itu adalah guru SMP Negeri 4 Tanggul.</h1>
            <h1 className='font-poppins text-justify leading-relaxed text-[#495057]'>Kepala Sekolah pertama yang memimpin SMKN 1 Semboro adalah Drs. Suprayitno, menjelang dilaksanakannya penerimaan peserta didik baru (ppdb) tahun pelajaran 2009/2010 diputuskan untuk pindah ke gedung smk negeri 1 semboro yang baru selesai dibangun. Lokasi gedung unit sekolah baru ini terletak di Jl. Pelita No. 27, desa Sidomekar. Pada saat itu SMKN 1 Semboro telah memiliki : 5 ruang kelas, 1 ruang bengkel praktek program keahlian Teknik Otomotif, 1 ruang praktek program keahlian Teknik Komputer Dan Informatika dan 1 ruang praktek Agribisnis Produksi Tanaman, akan tetapi belum memiliki peralatan praktek.</h1>
        </section>

        <section className='flex flex-col lg:flex-row justify-center px-6 md:px-16 gap-3 md:gap-0 lg:gap-3 items-start bg-[#F8F9FA]'>
            
            <img src="assets/images/school-history.png" alt="" className="w-full lg:w-3/5" />
            <div className="w-full md:gap-4 lg:gap-0 lg:w-2/5 flex flex-col md:flex-row lg:flex-col items-center justify-center">
                <div className="bg-[#f7800027] w-full md:w-2/3 lg:w-full h-full rounded-2xl px-5 lg:px-8 py-5 md:py-10 lg:py-4">
                    <h1 className='text-black font-bold font-poppins text-xl md:text-2xl pb-1'>Pencapaian</h1>
                    <p className='flex items-center gap-1 text-[#495057]'><FaAnglesRight className='text-[#ff6000]'/>Pusat Keunggulan</p>
                    <p className='flex items-center gap-1 text-[#495057]'><FaAnglesRight className='text-[#ff6000]'/>Akreditasi A (Unggul) - 2023</p>
                </div>

                <div className="grid grid-cols-2 w-full gap-3 py-4">
                
                    <div className="relative w-full bg-[#f7800027] md:rounded-xl flex items-center justify-center md:px-5 px-2 py-3 rounded-2xl md:py-4 md:gap-5 cursor-pointer group">
                        <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-[#ff6000] font-poppins font-bold text-2xl lg:text-3xl'>7</h1>
                        <h1 className='text-[#272727] font-poppins font-medium text-xs lg:text-sm'>Jurusan</h1>
                        </div>        
                    </div>
        
                    <div className="relative w-full bg-[#f7800027] md:rounded-xl flex items-center justify-center md:px-5 px-2 py-3 rounded-2xl md:py-4 md:gap-5 cursor-pointer group">
                        <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-[#ff6000] font-poppins font-bold text-2xl lg:text-3xl'>37</h1>
                        <h1 className='text-[#272727] font-poppins font-medium text-xs lg:text-sm'>Bangunan/Fasilitas</h1>
                        </div>
                    </div>
        
                    <div className="relative w-full bg-[#f7800027] md:rounded-xl flex items-center justify-center md:px-5 px-2 py-3 rounded-2xl md:py-4 md:gap-5 cursor-pointer group">
                        <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-[#ff6000] font-poppins font-bold text-2xl lg:text-3xl'>17</h1>
                        <h1 className='text-[#272727] font-poppins font-medium text-xs lg:text-sm'>Ekstrakurikuler</h1>
                        </div>
                    </div>
        
                    <div className="relative w-full bg-[#f7800027] md:rounded-xl flex items-center justify-center md:px-5 px-2 py-3 rounded-2xl md:py-4 md:gap-5 cursor-pointer group">
                        <div className='flex flex-col justify-center items-center'>
                        <h1 className='text-[#ff6000] font-poppins font-bold text-2xl lg:text-3xl'>20.000+</h1>
                        <h1 className='text-[#272727] font-poppins font-medium text-xs lg:text-sm'>Alumni</h1>
                        </div>
                    </div>
        
                </div>

            </div>
        </section>

        <section className="flex flex-col items center justify-center px-6 md:px-16 pt-10 pb-16 bg-[#F8F9FA]">

            <h1 className='font-poppins font-bold text-2xl md:text-3xl text-[#212529] pb-8 md:pb-10'>Perjalanan Sejarah</h1>

            <div className="w-full flex flex-col gap-5 md:gap-0">
                <div className="flex items-start gap-3 md:gap-10">
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <div className="bg-[#ff6000] p-4 rounded-full text-white text-2xl md:text-3xl"><LuSchool/></div>
                        <div className="bg-[#f7800076] w-[4px] h-42 lg:h-32"></div>
                    </div>
                    <div className="border-[1.5px] border-[#495057] rounded-xl py-5 px-5 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                            <span className='font-poppins font-bold text-lg md:text-xl text-[#E03610] bg-[#f780003c] py-1 px-5 rounded-4xl'>2008</span>
                            <h1 className='font-poppins font-bold text-[#212529] text-lg md:text-xl'>Pendirian Sekolah</h1>
                        </div>
                        <p className='font-poppins text-[#495057]'>Berdirinya sekolah ini mengacu pada surat permohonan Kepala Dinas Pendidikan Kabupaten Jember tanggal 25 Agustus 2008 nomor : 421.3/3342/ 436.316/2008 tentang permohonan rekomendasi pendirian lembaga sekolah baru tingkat SMK di Kecamatan Semboro.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 md:gap-10">
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <div className="bg-[#ff6000] p-4 rounded-full text-white text-2xl md:text-3xl"><LuBuilding2/></div>
                        <div className="bg-[#f7800076] w-[4px] h-42 lg:h-32"></div>
                    </div>
                    <div className="border-[1.5px] border-[#495057] rounded-xl py-5 px-5 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                            <span className='font-poppins font-bold text-lg md:text-xl text-[#E03610] bg-[#f780003c] py-1 px-5 rounded-4xl'>2009</span>
                            <h1 className='font-poppins font-bold text-[#212529] text-lg md:text-xl'>Pemindahan Gedung</h1>
                        </div>
                        <p className='font-poppins text-[#495057]'>Kepala Sekolah pertama yang memimpin SMKN 1 Semboro adalah Drs. Suprayitno, menjelang dilaksanakannya penerimaan peserta didik baru (ppdb) tahun pelajaran 2009/2010 diputuskan untuk pindah ke gedung smk negeri 1 semboro yang baru selesai dibangun.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 md:gap-10">
                    <div className="hidden md:flex flex-col items-center justify-center">
                        <div className="bg-[#ff6000] p-4 rounded-full text-white text-2xl md:text-3xl"><TbMedal/></div>
                        <div className="bg-[#f7800076] w-[4px] h-20"></div>
                    </div>
                    <div className="border-[1.5px] border-[#495057] rounded-xl py-5 px-5 flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                            <span className='font-poppins font-bold text-lg md:text-xl text-[#E03610] bg-[#f780003c] py-1 px-5 rounded-4xl'>2018</span>
                            <h1 className='font-poppins font-bold text-[#212529] text-lg md:text-xl'>Akreditasi A</h1>
                        </div>
                        <p className='font-poppins text-[#495057]'>SMKN 8 Jember juga pernah mendapatkan Akreditasi A pada tahun 2018 berdasarkan SK BAN-SM Nomor 1214/BAN-SM/SK/2018.</p>
                    </div>
                </div>
            </div>

            
        </section>

        <Footer/>

    </>
  )
}

export default History