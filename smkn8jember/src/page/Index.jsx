import React from 'react'
import Navbar from '../components/Navbar'

const  Index = () => {
  return (
    <>
      <Navbar/>
      <div  style={{ backgroundImage: "url('/assets/images/hero.png')", backgroundSize: "cover", backgroundPosition: "center",}} className="h-screen flex items-center ">
        <div className="bg-gradient-to-r from-[#6520039a] to-transparent w-full h-screen absolute"></div>
        <div className="px-10 w-5/6 z-10">
          <h1 className='font-poppins text-[#F8F9FA] font-bold text-7xl'><span className='underline decoration-[#ff6000]'>SMK NEGERI 8 JEMBER</span> <br /> WES TOP </h1>
          <p className='text-white font-poppins pr-40 py-5'>Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas, dengan menyiapkan lulusan yang siap kerja, siap berwirausaha, dan siap melanjutkan pendidikan ke jenjang yang lebih tinggi.</p>
          <div className="flex gap-5">
            <a href="" className='text-white bg-[#ff6000] px-5 py-2 font-poppins font-bold rounded-full'>Baca Selengkapnya</a>
            <a href="" className='text-[#ff6000] bg-transparent px-5 py-2 font-poppins font-bold rounded-full border-2 boder-[#ff6000]'>Baca Selengkapnya</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index