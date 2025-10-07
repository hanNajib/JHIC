import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const History = () => {
  return (
    <>

        <Navbar/>

        <section style={{ backgroundImage: "url('/assets/images/header-history.png')", backgroundSize: "cover", backgroundPosition: "center",}} className="flex flex-col items-center justify-center py-20 relative">
            <div className="bg-gradient-to-r from-[#24201f9a] to-transparent w-full h-full absolute"></div>
            <h1 className='font-poppins font-bold text-[#F8F9FA] text-[4rem] z-10'>Sejarah Sekolah</h1>
            <p className='font-poppins text-[#F8F9FA] text-lg z-10'>Perjalanan Panjang SMK Negeri 8 Jember dalam Mencetak Generasi Unggul</p>
        </section>

        <section className='flex flex-col items-center justify-center bg-[#F8F9FA] px-16 py-12'>
            <h1 className='font-poppins text-justify leading-relaxed'><span className=''>SMKN 8 Jember</span> awalnya bernama SMKN 1 Semboro. Berdirinya sekolah ini mengacu pada surat permohonan Kepala Dinas Pendidikan Kabupaten Jember tanggal 25 Agustus 2008 nomor : 421.3/3342/ 436.316/2008 tentang permohonan rekomendasi pendirian lembaga sekolah baru tingkat SMK di Kecamatan Semboro. Pada tahun pertama dimulainya proses kegiatan belajar dan mengajar yaitu tahun pelajaran 2008/2009, kegiatan belajar mengajar awalnya bertempat di gedung barat SMP Negeri 4 Tanggul, Kecamatan Semboro. Sebagian besar guru yang mengajar pada waktu itu adalah guru SMP Negeri 4 Tanggul.</h1>
        </section>

        <Footer/>

    </>
  )
}

export default History