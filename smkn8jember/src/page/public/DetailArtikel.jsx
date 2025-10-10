import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Icon } from '../../components/ui'

function DetailArtikel() {
  return (
    <>
        <Navbar/>
            <div className='flex flex-col lg:flex-row w-full bg-[#F8F9FA] px-2 md:px-10 py-6 md:py-8 gap-4'>

                <div className="w-full lg:w-5/7 bg-white p-4 md:p-6 rounded-2xl shadow-lg">
                    <div className="flex gap-3">
                        <span className='font-poppins font-semibold bg-[#ff6000] py-1 px-3 text-white rounded-4xl'>Prestasi</span>
                        <span className='font-poppins font-semibold bg-[#ff6000] py-1 px-3 text-white rounded-4xl'>RPL</span>
                    </div>
                    <h1 className='font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-[#272727] py-5'>Juara 1 Lomba Kompetensi Siswa Tingkat Kabupaten Jember</h1>
                    <div className="flex flex-col pb-7 pt-2 gap-2 relative">
                        <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
                            <Icon name="IoCalendarClearOutline" size={16} />
                            17 Agustus 1945
                        </div>
                        <div className="flex items-center gap-2 text-[#5a5a5a] leading-snug font-medium text-sm">
                            <Icon name="LuEye" size={16} />
                            Telah Dilihat Sebanyak 54
                        </div>
                    </div>
                    <img src="assets/images/dewa.png" alt="" className='w-full h-[15rem] md:h-[30rem] object-cover object-center'/>
                    <p className="font-poppins text-start text-black leading-relaxed py-8">
                        Gelaran Lomba Kompetensi Siswa (LKS) tingkat Kabupaten Jember tahun 2025 telah usai, menyisakan euforia dan kebanggaan bagi para pemenangnya. Salah satu bidang yang paling dinanti, yaitu pengembangan website, berhasil menelurkan talenta muda berbakat dari Kabupaten Jember. Dengan bangga, kami mengumumkan bahwa Dewa Permana Putra S dari XI RPL 1 berhasil meraih  juara pertama dalam kompetisi bergengsi ini!

                        Prestasi gemilang ini bukan sekadar keberuntungan. [Nama Peserta] menunjukkan dedikasi, kerja keras, serta pemahaman mendalam tentang dunia pengembangan website. Dalam lomba yang berlangsung ketat, [Nama Peserta] berhasil menyisihkan puluhan peserta lainnya dengan karya website yang inovatif, fungsional, dan memiliki nilai estetika tinggi.

                        "Saya sangat bersyukur dan bangga bisa meraih juara di LKS tahun ini," ujar [Nama Peserta] dengan senyum sumringah. "Ini adalah hasil dari latihan dan bimbingan yang tak henti dari guru-guru saya, serta dukungan dari teman-teman dan keluarga."

                        Para juri sepakat bahwa website buatan [Nama Peserta] unggul dalam beberapa aspek kunci. Mulai dari desain antarmuka yang intuitif dan menarik, kualitas kode yang bersih dan efisien, hingga fitur-fitur interaktif yang relevan. Keberhasilan ini juga menunjukkan kemampuan [Nama Peserta] dalam memahami dan mengimplementasikan teknologi terbaru dalam pengembangan website.

                        Kepala Sekolah [Nama Sekolah Peserta], [Nama Kepala Sekolah, jika ada dan relevan], menyampaikan apresiasi setinggi-tingginya atas pencapaian siswanya. "Ini adalah bukti bahwa siswa-siswi kami memiliki potensi luar biasa. Kami akan terus mendukung dan membimbing mereka untuk meraih prestasi yang lebih tinggi lagi, tidak hanya di tingkat kabupaten, tapi juga nasional bahkan internasional," ujarnya.

                        Kemenangan ini diharapkan menjadi motivasi bagi [Nama Peserta] untuk terus mengembangkan kemampuannya di bidang teknologi informasi, khususnya pengembangan website yang kian vital di era digital ini. Selain itu, prestasi ini juga menjadi inspirasi bagi siswa-siswi lain di Kabupaten Jember untuk berani berkompetisi dan menunjukkan bakat terbaik mereka.

                        Selamat kepada [Nama Peserta] atas pencapaian luar biasa ini! Semoga keberhasilan ini menjadi langkah awal menuju kesuksesan yang lebih besar di masa depan. Kita nantikan kiprah [Nama Peserta] selanjutnya di LKS tingkat provinsi, membawa nama baik Kabupaten Jember.
                    </p>

                    <div className="flex gap-3 items-center border-t-[1.5px] border-[#A0A0A0] pt-3">
                        <img src="assets/images/repel.png" alt="" className='w-14 rounded-full'/>
                        <h1 className='text-[#212529] font-poppins font-bold text-xl'>Rekayasa Perangkat Lunak</h1>
                    </div>

                </div>

                <div className="w-full lg:w-2/7 flex flex-col md:flex-row lg:flex-col gap-4 lg:gap-0 items-stretch">

                    <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto mb-6">
                        <h1 className='font-poppins font-semibold text-black text-xl flex items-center gap-3'> <Icon name="FaNewspaper" size={20} color='#ff6000'/> Artikel Lainnya</h1>
                        <div className="flex flex-col pt-7 gap-4">

                            <div className="flex gap-2">
                                <img src="assets/images/dewa.png" alt="" className='w-20 h-20 object-cover object-center'/>
                                <div className="flex flex-col gap-1">
                                    <h1 className='font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3'>Siswa & siswi SMKN 8 Jember lolos seleksi paskibra.</h1>
                                    <p className='font-poppins text-[#5A5A5A] text-xs'>11 Agustus 2020</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <img src="assets/images/dewa.png" alt="" className='w-20 h-20 object-cover object-center'/>
                                <div className="flex flex-col gap-1">
                                    <h1 className='font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3'>Siswa & siswi SMKN 8 Jember lolos seleksi paskibra.</h1>
                                    <p className='font-poppins text-[#5A5A5A] text-xs'>11 Agustus 2020</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <img src="assets/images/dewa.png" alt="" className='w-20 h-20 object-cover object-center'/>
                                <div className="flex flex-col gap-1">
                                    <h1 className='font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3'>Siswa & siswi SMKN 8 Jember lolos seleksi paskibra.</h1>
                                    <p className='font-poppins text-[#5A5A5A] text-xs'>11 Agustus 2020</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <img src="assets/images/dewa.png" alt="" className='w-20 h-20 object-cover object-center'/>
                                <div className="flex flex-col gap-1">
                                    <h1 className='font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3'>Siswa & siswi SMKN 8 Jember lolos seleksi paskibra.</h1>
                                    <p className='font-poppins text-[#5A5A5A] text-xs'>11 Agustus 2020</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <img src="assets/images/dewa.png" alt="" className='w-20 h-20 object-cover object-center'/>
                                <div className="flex flex-col gap-1">
                                    <h1 className='font-poppins font-semibold text-[#1a1a1a] leading-snug text-sm line-clamp-3'>Siswa & siswi SMKN 8 Jember lolos seleksi paskibra.</h1>
                                    <p className='font-poppins text-[#5A5A5A] text-xs'>11 Agustus 2020</p>
                                </div>
                            </div>

                        </div>
                        
                    </div>

                    <div className="w-full bg-white p-6 rounded-2xl shadow-lg h-full lg:h-auto overflow-y-auto">
                        <h1 className='font-poppins font-semibold text-black text-xl flex items-center gap-2'> <Icon name="TbCategoryFilled" size={26} color='#ff6000'/> Kategori</h1>
                        <div className="flex flex-col pt-5">
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Prestasi</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">TKR</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">TSM</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">RPL</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">DKV</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">TKJ</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">ATPH</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">APT</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">News</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Event</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Karya Siswa</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Ekstrakurikuler</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Kunjungan</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Teaching Factory</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Keagamaan</a></div>
                            <div className="border-b-[1px] text-[#212529] font-poppins text-lg py-2 border-[#D0CFCF]"><a href="">Edukasi</a></div>
                        </div>
                    </div>

                </div>

            </div>
        <Footer/>
    </>
  )
}

export default DetailArtikel