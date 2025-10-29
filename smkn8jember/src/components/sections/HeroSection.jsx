import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui';
import parse from 'html-react-parser';

import { FaArrowDown } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCompassOutline } from "react-icons/io5";
import { useWebSettings } from '../../hooks/api/useWebSettings';
const HeroSection = ({ className = '', judul = "SMK NEGERI 8 JEMBER <br /> WES TOP", deskripsi = "Bersama kami, mari kita wujudkan masa depan generasi muda Bangsa Indonesia yang lebih berkualitas." }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const chatContainerRef = useRef(null);
  const { data: websetting } = useWebSettings();

    const { hero_image } = websetting?.data?.reduce((acc, setting) => {
    acc[setting.title] = setting.value;
    return acc;
  }, {}) || {};

 
 

const questions = [
    { q: "Apa jurusan yang ada di SMKN 8 Jember?", a: "Kami memiliki beberapa jurusan seperti TKR, TSM, RPL, DKV, TKJ, APT, dan ATPH." },
    { q: "Siapa nama kepala sekolah di SMKN 8 Jember?", a: "Kepala sekolah yang menjabat di SMKN 8 Jember saat ini adalah Hj.Rahmah Hidana, S.Pd, M.Si." },
    { q: "Dimanakah alamat SMKN 8 Jember?", a: "SMKN 8 Jember berlokasi di jl.Pelita No 27 Sidomekar Semboro Jember Jawa Timur ." },
    { q: "Bagaimana cara mendaftar?", a: "Pendaftaran bisa dilakukan melalui jalur PPDB online sesuai jadwal Dinas Pendidikan Jawa Timur." },

    { q: "Apa itu jurusan TKR dan apa yang dipelajari?", a: "TKR (Teknik Kendaraan Ringan) adalah keahlian yang mempelajari perbaikan, perawatan, dan pemeliharaan mobil (kendaraan ringan) secara menyeluruh." },
    { q: "Apa fokus utama dari jurusan TSM?", a: "TSM (Teknik Sepeda Motor) fokus pada penguasaan keterampilan di bidang perbaikan dan perawatan sepeda motor, baik dari segi mesin maupun kelistrikan." },
    { q: "Apa definisi dari RPL?", a: "RPL (Rekayasa Perangkat Lunak) adalah keahlian yang mendalami proses pengembangan aplikasi, pemrograman, dan pembuatan perangkat lunak (software)." },
    { q: "Apa yang dimaksud dengan DKV?", a: "DKV (Desain Komunikasi Visual) adalah keahlian yang berfokus pada penyampaian pesan atau informasi melalui media visual seperti desain grafis, ilustrasi, dan multimedia." },
    { q: "Apa itu jurusan TKJ?", a: "TKJ (Teknik Komputer dan Jaringan) adalah keahlian yang mempelajari instalasi, konfigurasi, dan pemeliharaan jaringan komputer, termasuk administrasi server." },
    { q: "Apa fokus keahlian dari APT?", a: "APT (Agribisnis Pengolahan Hasil Pertanian) fokus pada pengolahan bahan baku pertanian menjadi produk bernilai tambah, seperti makanan, minuman, atau produk non-pangan." },
    { q: "Apa pengertian jurusan ATPH?", a: "ATPH (Agribisnis Tanaman Pangan dan Hortikultura) adalah keahlian yang mendalami budidaya, perawatan, dan pengelolaan tanaman pangan (misalnya padi) serta hortikultura (sayuran, buah, bunga)." },

    { q: "Apa peluang kerja untuk lulusan TKR?", a: "Lulusan TKR dapat bekerja sebagai mekanik di bengkel resmi/umum, teknisi perbaikan mobil, atau membuka usaha bengkel sendiri." },
    { q: "Prospek kerja lulusan TSM apa saja?", a: "Lulusan TSM berpeluang menjadi mekanik sepeda motor, teknisi di dealer resmi, atau wirausaha bengkel dan penjualan suku cadang." },
    { q: "Peluang karir apa yang menanti lulusan RPL?", a: "Lulusan RPL banyak dicari sebagai Web Developer, Mobile App Developer, programmer, atau tester aplikasi di perusahaan teknologi." },
    { q: "Peluang kerja apa yang tersedia bagi lulusan DKV?", a: "Lulusan DKV bisa menjadi Desainer Grafis, Ilustrator, Content Creator, Fotografer, atau Videografer di berbagai agensi maupun perusahaan." },
    { q: "Apa saja pekerjaan yang cocok untuk lulusan TKJ?", a: "Lulusan TKJ dapat bekerja sebagai Teknisi Jaringan, Administrator Jaringan, Teknisi Komputer, atau IT Support di berbagai instansi." },
    { q: "Di mana lulusan APT biasanya bekerja?", a: "Lulusan APT dapat bekerja di industri makanan dan minuman (Quality Control/R&D), sebagai pengawas mutu hasil pertanian, atau menjadi wirausaha produk olahan pangan." },
    { q: "Peluang kerja apa yang relevan bagi lulusan ATPH?", a: "Lulusan ATPH dapat bekerja sebagai tenaga ahli budidaya, operator di perkebunan/pertanian modern, atau menjadi wirausaha di bidang tanaman dan hortikultura." }
  ];

  const handleQuestionClick = (question) => {
    setChatHistory((prev) => [...prev, { q: question.q }]);
    setIsTyping(false);

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setChatHistory((prev) =>
          prev.map((item, index) =>
            index === prev.length - 1 ? { ...item, a: question.a } : item
          )
        );
      }, 1500);
    }, 500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, isTyping]);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
    setShowFab(!isAtBottom);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      style={{ 
        backgroundImage: hero_image ? `url(${hero_image})` : "url('/assets/images/hero.png')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }}
      className={`h-screen flex lg:items-center relative ${className}`}
    >
      <div className="bg-gradient-to-r from-[#39302c9a] to-transparent w-full h-screen absolute"></div>
      
      <div className="px-6 md:px-16 w-full lg:w-5/6 z-10 pt-20 md:pt-36 lg:pt-0">
        <h1 className='font-poppins text-[#F8F9FA] text-left md:text-center lg:text-left font-bold text-5xl md:text-6xl lg:text-7xl'>
          <div className='underline decoration-[#ff6000]'>{ parse(judul) }</div> 
        </h1>
        
        <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left hidden md:flex text-sm md:text-lg'>
          { parse(deskripsi) }
        </p>
        
        <p className='text-white font-poppins pr-10 lg:pr-40 py-5 text-left md:text-center lg:text-left md:hidden text-sm md:text-lg'>
          { parse(deskripsi) }
        </p>
        
        <div className="flex flex-col md:flex-row gap-5 md:justify-center lg:justify-start">
          <Button onClick={() => location.href="#about"} variant="primary">
            Baca Selengkapnya
          </Button>
          <Button onClick={() => location.href="#pengumuman"} variant="secondary">
            Pengumuman Terbaru
          </Button>
        </div>


        
      </div>

      <div className="absolute flex md:flex-col md:right-14 bottom-10 gap-3 justify-center lg:justify-end w-full lg:w-auto">

        <div className="relative flex items-center justify-end rounded-full overflow-hidden group">
          <div className="bg-white flex items-center justify-end rounded-full">
            <div className="pr-5 pl-8 font-poppins text-[#ff6000] font-semibold hidden group-hover:lg:flex group-active:lg:flex transition-all duration-200">
              Tanya Seputar SMKN 8 Jember!
            </div>
            <Button
              className="z-10 w-16 h-16 flex items-center justify-center bg-[#ff6000] text-white rounded-full cursor-pointer"
              onClick={() => setIsChatOpen(true)}
            >
              <IoChatboxEllipsesOutline className='text-2xl' />
            </Button>
          </div>
        </div>

        {/* Tombol Jelajahi */}
        <div className="relative flex items-center justify-end rounded-full overflow-hidden group">
          <div className="bg-white flex items-center justify-end rounded-full">
            <div className="pr-5 pl-8 font-poppins text-[#ff6000] font-semibold hidden group-hover:lg:flex group-active:lg:flex transition-all duration-200">
              Jelajahi SMKN 8 Jember!
            </div>
            <Button
            onClick={()=> window.open('https://app.lapentor.com/sphere/smkn8jember')}
              className="z-10 w-16 h-16 flex items-center justify-center bg-[#ff6000] text-white rounded-full cursor-pointer"
            >
              <IoCompassOutline className='text-2xl' />
            </Button>
          </div>
        </div>

      </div>


      {/* Modal chatbot */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-[#EEEEEE] md:rounded-2xl shadow-lg w-screen h-screen lg:w-[60%] md:w-[90%] md:h-[70vh] lg:h-[90vh] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="bg-[#ff6000] text-white p-4 md:rounded-t-2xl flex justify-between items-center">
              <h2 className="font-bold text-lg font-poppins">Asisten Chat SMKN 8 Jember</h2>
              <button onClick={() => setIsChatOpen(false)} className="text-white text-2xl font-bold">&times;</button>
            </div>

            {/* Chat area */}
            <div 
              ref={chatContainerRef}
              onScroll={handleScroll}
              className="flex-1 p-5 overflow-y-auto space-y-3 scroll-smooth relative"
            >
              {chatHistory.length === 0 && (
                <div className="flex lg:flex-row flex-col items-center justify-center md:p-10 lg:p-0 gap-5 lg:gap-0">
                  <img src="assets/images/bot.png" alt="" className='w-1/2'/>
                  <div className="flex flex-col w-full lg:w-1/2 text-center lg:text-start">
                    <h1 className='font-black font-poppins text-3xl lg:text-4xl leading-tight text-gray-800'>Yuk Cari Tahu Tentang Sekolah Kami!</h1>
                    <p className="text-gray-800 mt-2 font-semibold lg:pr-10">
                      Pilih pertanyaan di bawah untuk memulai percakapan.
                    </p>
                    {/* <p></p> */}
                  </div>
                </div>
              )}
              {chatHistory.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-stretch">
                    <div className="bg-[#ea8d54] font-poppins text-white px-3 py-2 rounded-tl-xl rounded-bl-xl rounded-br-xl self-end w-fit max-w-[80%] md:max-x-[60%] lg:max-w-[50%] ml-auto shadow-md">
                      {item.q}
                    </div>
                    <div className="w-4 bg-[#ea8d54] relative">
                      <div className="absolute w-full h-full bg-[#eeeeee] rounded-tl-3xl"></div>
                    </div>
                  </div>
                  {item.a && (
                    <div className="flex items-stretch">
                      <div className="w-4 bg-white relative">
                        <div className="absolute w-full h-full bg-[#eeeeee] rounded-tr-3xl"></div>
                      </div>
                      <div className="bg-white font-poppins text-black px-3 py-2 rounded-br-xl rounded-tr-xl rounded-bl-xl self-start w-fit max-w-[80%] md:max-w-[60%] lg:max-w-[50%] shadow-md">
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Animasi mengetik */}
              {isTyping && (
                <div className="flex items-stretch">
                  <div className="w-4 bg-white relative">
                    <div className="absolute w-full h-full bg-[#eeeeee] rounded-tr-3xl"></div>
                  </div>
                  <div className="bg-white text-black px-3 py-2 rounded-br-xl rounded-tr-xl rounded-bl-xl self-start w-fit shadow-md">
                    <div className="flex gap-[3px] items-center">
                      <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAB scroll ke bawah */}
            {showFab && (
              <button 
                onClick={scrollToBottom} 
                className="absolute bottom-24 right-6 bg-[#ff6000] text-white p-3 rounded-full shadow-lg hover:bg-[#e65300] transition"
              >
                <FaArrowDown />
              </button>
            )}

            {/* Pilihan pertanyaan */}
            <div className="shadow-[0_-1px_10px_rgba(0,0,0,0.1)] px-3 py-5 flex flex-nowrap overflow-x-auto gap-2 bg-[#FCFDFF] md:rounded-b-2xl whitespace-nowrap shrink-0">
              {questions.map((item, i) => (
                <button 
                  key={i}
                  onClick={() => handleQuestionClick(item)} 
                  className="bg-white text-[#242424] border-[1.5px] border-zinc-400 text-sm px-3 py-2 rounded-full transition"
                >
                  {item.q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
