import React from "react";
import { useState, useEffect } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isSearch, setIsSearch] = useState(false);

    const handleToggleOpen = () => {
    setIsOpen((prev) => {
        if (!prev) setIsSearch(false); // kalau mau buka open, tutup search
        if (!prev) setIsProfil(false); // kalau mau buka open, tutup search
        if(!prev) setIsJurusan(false);
        if(!prev) setIsBlog(false);
        return !prev;
    });
    };

    const handleToggleSearch = () => {
    setIsSearch((prev) => {
        if (!prev) setIsOpen(false); // kalau mau buka search, tutup open
        if (!prev) setIsProfil(false); // kalau mau buka open, tutup search
        if(!prev) setIsJurusan(false);
        if(!prev) setIsBlog(false);
        return !prev;
    });
    };


    const [isProfil, setIsProfil] = useState(false);
    const [isJurusan, setIsJurusan] = useState(false);
    const [isBlog, setIsBlog] = useState(false);

    const handleMenuProfil = () => {
        setIsProfil((prev) => {
            if(!prev) setIsJurusan(false);
            if(!prev) setIsBlog(false);
            return !prev;
        });
    };
    
    const handleMenuJurusan = () => {
        setIsJurusan((prev) => {
            if(!prev) setIsProfil(false);
            if(!prev) setIsBlog(false);
            return !prev;
        });
    };

    const handleMenuBlog = () => {
        setIsBlog((prev) => {
            if(!prev) setIsProfil(false);
            if(!prev) setIsJurusan(false);
            return !prev;
        });
    };


    // useEffect(() => {
    //     if (isOpen) {
    //         setIsSearch(false);
    //     } else if (isSearch) {
    //         setIsOpen(false);
    //     }
    // }, [isOpen, isSearch]);

    return (
        <>
        <div className="atas z-40 relative flex flex-col md:flex-row w-full bg-[#eeeeee] justify-between items-center gap-2">
            <div className="flex z-40 bg-[#FF6000] px-5 md:px-16 py-2 md:py-2 items-center gap-2 justify-center md:rounded-tr-full w-full md:w-auto">
                <p className="md:hidden lg:flex font-poppins font-bold text-white"> Ikuti Kami : </p>
                <a href=""><FaYoutube className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
                <a href=""><FaInstagram className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
                <a href=""><FaFacebook className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
            </div>

            <div className="flex items-center z-40 justify-center py-2 md:py-0 md:mr-10 gap-2 md:gap-8">
                <p className="flex items-center text-black font-poppins gap-2 text-xs md:text-[16px]"><FaPhoneAlt className="text-[#ff6000] md:text-xl"/> (0336) 444112</p>
                <p className="flex items-center text-black font-poppins gap-2 text-xs md:text-[16px]"><IoIosMail className="text-[#ff6000] text-lg md:text-2xl"/> smknegeri08jember@gmail.com </p>
            </div>
        </div>

        <div className="bawah sticky top-0 z-40 flex bg-white items-center px-6 md:px-14 py-3 md:py-2 justify-between shadow-md gap-6 md-gap-0">
            <div className="flex lg:hidden">
                <button onClick={handleToggleOpen}>
                    {isOpen ? (
                        <FaTimes className="text-xl" />
                        ) : (
                        <FaBars className="text-xl" />
                        )}
                </button>
            </div>
            <div className={`flex gap-3 items-center relative ${isSearch ? 'mr-0' : 'mr-6 lg:mr-0'}`}>
                <img src="assets/images/logo-smk.png" alt="" className="w-[40px] md:w-[50px] relative"/>
                <h1 className={`font-poppins font-bold text-[#424242] lg:hidden ${isSearch ? 'hidden md:flex' : 'flex'}`}>SMKN 8 JEMBER</h1>
            </div>
            <div className="hidden lg:flex font-poppins gap-10 text-[#4c4c4c]">
                <Link to={'/'} className="active:opacity-100 active:font-semibold hover:opacity-100 opacity-75 transition-all duration-300 cursor-pointer">Home</Link>
                <div className="relative group cursor-pointer">
                    <p className="flex items-center gap-1 active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">
                        Profil <FaChevronDown className="text-xs" />
                    </p>
                    <div className="absolute top-full left-0 mt-0 pt-2 w-48 bg-transparent hidden group-hover:block"></div>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:flex flex-col text-[#4c4c4c]/75 z-50">
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition ">Sejarah Sekolah</Link>
                        <Link to="/profil/struktur" className="px-4 py-2 hover:bg-gray-100 transition">Visi dan Misi</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Struktur Sekolah</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Kepala Sekolah</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Fasilitas Sekolah</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Data Guru</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Data Karyawan</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Data Siswa</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Ekstrakurikuler</Link>
                    </div>
                </div>
                <div className="relative group cursor-pointer">
                    <p className="flex items-center gap-1 active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">
                        Jurusan <FaChevronDown className="text-xs" />
                    </p>
                    <div className="absolute top-full left-0 mt-0 pt-2 w-48 bg-transparent hidden group-hover:block"></div>
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg rounded-md hidden group-hover:flex flex-col text-[#4c4c4c]/75 z-50">
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">Teknik Kendaraan Ringan</Link>
                        <Link to="/profil/struktur" className="px-4 py-2 hover:bg-gray-100 transition">Teknik Sepeda Motor</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Rekayasa Perangkat Lunak</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Desain Komunikasi Visual</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Teknik Komputer dan Jaringan</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Agribisnis Tanaman Pangan dan Holtikultura</Link>
                        <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 transition">Agribisnis Perbenihan Tanaman</Link>
                    </div>
                </div>
                <div className="relative group cursor-pointer">
                    <p className="flex items-center gap-1 active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">
                        Artikel <FaChevronDown className="text-xs" />
                    </p>
                    <div className="absolute top-full left-0 mt-0 pt-2 w-48 bg-transparent hidden group-hover:block"></div>
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:flex flex-col text-[#4c4c4c]/75 z-50">
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">Semua Artikel</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">TKR</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">TSM</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">RPL</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">DKV</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">TKJ</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">ATPH</Link>
                        <Link to="/profil/visi-misi" className="px-4 py-2 hover:bg-gray-100 transition">APT</Link>
                    </div>
                </div>
                <Link to={'/gallery'} className="active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">Galeri</Link>
                <Link to={'/announcement'} className="active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">Pengumuman</Link>
            </div>
            
            <div className="hidden lg:flex relative w-full lg:w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
            </div>
            <div className="relative flex lg:hidden">
                <button onClick={handleToggleSearch}>
                    {isSearch ? (
                        <FaTimes className={`text-xl absolute top-1/2 -translate-y-1/2 ${isSearch ? 'left-3' : 'right-3'}`}/>
                    ) : (
                        <FaSearch className={`text-xl absolute top-1/2 -translate-y-1/2 ${isSearch ? 'left-3' : 'right-3'}`}/>
                    )}
                </button>
                <input
                    type="search"
                    placeholder="Search"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 transition-transform duration-300 ease-in-out ${isSearch ? 'flex' : 'hidden'}`}
                />
            </div>

        </div>

        <div className="menu-drop sticky top-[3.8rem] w-full flex flex-col lg:hidden z-20 bg-transparent">
            <div
                className={`absolute top-0 left-0 w-full bg-white shadow-md transition-transform z-20 duration-300 ease-in-out ${
                isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex justify-center items-center flex-col font-poppins gap-2 text-center py-5 text-[#4c4c4c]">
                    <a href="" className="active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">Home</a>
                    <button onClick={handleMenuProfil} className="active:font-semibold hover:opacity-100 opacity-75  transition-all duration-300 flex items-center gap-1">
                        Profil
                        {isProfil ? 
                            ( <FaChevronUp className="text-xs" />
                            ) : (<FaChevronDown className="text-xs" />) 
                        }
                    </button>
                        <div className={`mt-2 w-72 bg-white shadow-lg rounded-md z-50 flex flex-col transition-all duration-300 text-[#4c4c4c]/75 ${isProfil ? 'flex' : 'hidden'}`}>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Sejarah Sekolah</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Visi dan Misi</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Struktur Sekolah</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Kepala Sekolah</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Fasilitas Sekolah</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Data Guru</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Data Karyawan</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Data Siswa</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Ekstrakurikuler</Link>
                        </div>
                    <button onClick={handleMenuJurusan} className="active:font-semibold hover:opacity-100 opacity-75  transition-all duration-300 flex items-center gap-1">
                        Jurusan 
                        {isJurusan ? 
                            ( <FaChevronUp className="text-xs" />
                            ) : (<FaChevronDown className="text-xs" />) 
                        }
                    </button>
                        <div className={`mt-2 w-72 bg-white shadow-lg rounded-md z-50 flex flex-col transition-all duration-300 text-[#4c4c4c]/75 ${isJurusan ? 'flex' : 'hidden'}`}>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Teknik Kendaraan Ringan</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Teknik Sepeda Motor</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Rekayasa Perangkat Lunak</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Desain Komunikasi Visual</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Teknik Komputer dan Jaringan</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Agribisnis Tanaman Pangan dan Holtikultura</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Agribisnis Perbenihan Tanaman</Link>
                        </div>
                    <button onClick={handleMenuBlog} className="active:font-semibold hover:opacity-100 opacity-75  transition-all duration-300 flex items-center gap-1">
                        Artikel
                        {isBlog ? 
                            ( <FaChevronUp className="text-xs" />
                            ) : (<FaChevronDown className="text-xs" />) 
                        }
                    </button>
                        <div className={`mt-2 w-72 bg-white shadow-lg rounded-md z-50 flex flex-col transition-all duration-300 text-[#4c4c4c]/75 ${isBlog ? 'flex' : 'hidden'}`}>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">Semua Artikel</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">TKR</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">TSM</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">RPL</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">DKV</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">TKJ</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">ATPH</Link>
                            <Link to="/profil/sejarah" className="px-4 py-2 hover:bg-gray-100 active:bg-gray-100 transition">APT</Link>
                        </div>
                    <a href="" className="active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">Galeri</a>
                    <a href="" className="active:opacity-100 active:font-semibold hover:opacity-100  opacity-75 transition-all duration-300 cursor-pointer">Pengumuman</a>
                </div>
            </div>
        </div>



        </>
    )
}

export default Navbar