import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Icon } from '../../components/ui'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { all } from 'axios'
import { useStaffStructure } from '../../hooks/api/useStaff'
import DefaultLayout from '../../components/layout/DefaultLayout'

function Struktur() {
    const { data: staffResponse } = useStaffStructure({ all: true });
    const { kepala_sekolah, wakil_kepala, koordinator, koordinator_jurusan, jumlah_tenaga_kerja } = staffResponse || {};
    return (
        <DefaultLayout>
            <section
                className="flex flex-col items-center justify-center py-20 relative text-center"
                style={{
                    backgroundImage: "url('/assets/images/struktur.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 w-full h-full bg-orange-500 opacity-40 pointer-events-none z-0"></div>

                <div className="relative z-10 max-w-3xl">
                    <h1 className="font-poppins font-bold text-white text-4xl md:text-6xl mb-4">
                        Struktur Sekolah
                    </h1>
                    <p className="font-poppins hidden md:block text-white text-lg md:text-xl leading-relaxed">
                        Struktur organisasi sekolah yang solid dan terorganisir dengan baik untuk mendukung penyelenggaraan pendidikan yang berkualitas.
                    </p>
                </div>
            </section>

            <section className="flex flex-col px-6 md:px-16 pt-12">
                <div className="w-full flex justify-center items-center pb-6">
                    <div className="w-full md:w-3/5 lg:w-1/4 bg-[#F8F9FA] p-5 border-[1.5px] border-[#D0CFCF] shadow-md rounded-2xl flex flex-col items-center justify-center gap-2">
                        <img src={kepala_sekolah?.image || "assets/images/fallbackProfile.png"} alt="" className='w-32 h-32 object-cover object-center rounded-full shadow-md' />
                        <h1 className='font-poppins font-bold text-[#242424] text-lg'>{kepala_sekolah?.name || "Hj. Rahmah Hidana, S.Pd., M.Si."}</h1>
                        <p className='font-poppins font-semibold text-[#ff6000]'>{kepala_sekolah?.position || "Kepala Sekolah"}</p>
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between items-center gap-6">
                    {wakil_kepala?.map((wakil, index) => (
                        <div key={wakil?.id || index} className="w-full bg-[#F8F9FA] p-5 border-[1.5px] border-[#D0CFCF] shadow-md rounded-2xl flex flex-col items-center justify-center gap-2">
                            <img src={wakil?.image || "assets/images/fallbackProfile.png"} alt="" className='w-32 h-32 object-cover object-center rounded-full shadow-md' />
                            <h1 className='font-poppins font-bold text-[#242424] text-lg'>{wakil?.name || "-"}</h1>
                            <p className='font-poppins font-semibold text-[#ff6000]'>{wakil?.position || "-"}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex flex-col px-6 md:px-16 pt-14">
                <h1 className='text-center font-bold font-poppins text-[#242424] text-2xl md:text-3xl'>Koordinator Bidang </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center place-items-center w-full pt-8">

                    {koordinator?.map((koor, index) => (
                        <div key={koor?.id || index} className="flex flex-col bg-[#EEEEEE] shadow-md rounded-lg w-full p-10 gap-2">
                            <h1 className='font-poppins font-bold text-xl text-[#242424] flex gap-2 items-center'><Icon name="FaAnglesRight" size={24} color='#ff6000' />{koor?.position || "Koordinator XYZ"}</h1>
                            <p className='text-lg text-[#495057] font-bold'>{koor?.name || "Ir.H.Gathan Fairuz I"}</p>
                        </div>
                    ))}

                </div>
            </section>

            <section className="w-full flex flex-col lg:flex-row px-6 md:px-16 pt-14 pb-12 items-stretch gap-12">

                <div className="w-full lg:w-full flex flex-col items-center justify-start bg-[#f780001f] px-6 md:px-8 py-8 rounded-xl shadow-md">
                    <h1 className='font-bold font-poppins text-[#242424] text-2xl md:text-3xl'>Koordinator Jurusan</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 pt-6 w-full gap-4">

                        {koordinator_jurusan?.map((komite, index) => (
                            <div key={komite?.id || index} className="bg-white flex flex-col justify-center items-center p-6 rounded-xl shadow-md">
                                <h1 className='font-poppins font-bold text-2xl text-[#242424]'>{komite?.name || "Drs. H. Muh. Syarifuddin, M.Pd.I."}</h1>
                                <p className='font-poppins text-[#495057] font-medium '>{komite?.position || "Ketua Komite Sekolah"}</p>
                            </div>
                        ))}

                    </div>
                </div>

                {/* <div className="w-full lg:w-1/2 flex flex-col items-center justify-start bg-[#f780001f] px-6 md:px-8 py-8 rounded-xl shadow-md">
                    <h1 className='font-bold font-poppins text-[#242424] text-2xl md:text-3xl'>Jumlah Tenaga Kerja</h1>
                    <div className="grid grid-cols-2 pt-6 w-full gap-4 items-stretch">
                        <div className="bg-[#ebb96896] flex flex-col justify-center items-center p-8 rounded-xl">
                            <span className='bg-[#ff6000] p-4 rounded-full shadow'><Icon name="FaChalkboardTeacher" size={32} color='white' /></span>
                            <h1 className='font-poppins font-bold text-4xl text-[#242424] pt-2'>{jumlah_tenaga_kerja?.guru}</h1>
                            <p className='font-poppins text-[#495057] font-medium '>Guru</p>
                        </div>
                        <div className="bg-[#b7d1ec] flex flex-col justify-center items-center p-8 rounded-xl">
                            <span className='bg-[#53a3ff] p-4 rounded-full shadow'><Icon name="BsPersonVcard" size={32} color='white' /></span>
                            <h1 className='font-poppins font-bold text-4xl text-[#242424] pt-2'>{jumlah_tenaga_kerja?.staff}</h1>
                            <p className='font-poppins text-[#495057] font-medium '>Staf</p>
                        </div>
                        <div className="bg-[#abf2a2] flex flex-col justify-center items-center p-8 rounded-xl">
                            <span className='bg-[#60c83a] p-4 rounded-full shadow'><Icon name="FaTools" size={32} color='white' /></span>
                            <h1 className='font-poppins font-bold text-4xl text-[#242424] pt-2'>{jumlah_tenaga_kerja?.teknisi}</h1>
                            <p className='font-poppins text-[#495057] font-medium '>Teknisi</p>
                        </div>
                        <div className="bg-[#ebb96896] flex flex-col justify-center items-center p-8 rounded-xl">
                            <span className='bg-[#ff6000] p-4 rounded-full shadow'><Icon name="FaPersonMilitaryPointing" size={32} color='white' /></span>
                            <h1 className='font-poppins font-bold text-4xl text-[#242424] pt-2'>{jumlah_tenaga_kerja?.satpam}</h1>
                            <p className='font-poppins text-[#495057] font-medium '>Satpam</p>
                        </div>
                    </div>
                </div> */}

            </section>
        </DefaultLayout>
    )

}

export default Struktur