import React from "react";
import { useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

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
            <img src="assets/images/logo-smk.png" alt="" className="w-[40px] md:w-[50px]"/>
            <div className="hidden lg:flex font-poppins gap-10 text-[#4c4c4c]">
                <a href="">Home</a>
                <a href="">Profil</a>
                <a href="">Jurusan</a>
                <a href="">Blog</a>
                <a href="">Galeri</a>
                <a href="">Pengumuman</a>
            </div>
            
            <div className="flex relative w-full md:w-1/2 lg:w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
            </div>

            <div className="flex lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <FaTimes className="text-xl" />
                        ) : (
                        <FaBars className="text-xl" />
                        )}
                </button>
            </div>

        </div>

        <div className="menu-drop sticky top-[4rem] w-full flex flex-col lg:hidden z-20 bg-transparent">
            <div
                className={`absolute top-0 left-0 w-full bg-white shadow-md transition-transform z-20 duration-300 ease-in-out ${
                isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="flex flex-col font-poppins gap-2 text-center py-5 text-[#4c4c4c]">
                <a href="">Home</a>
                <a href="">Profil</a>
                <a href="">Jurusan</a>
                <a href="">Blog</a>
                <a href="">Galeri</a>
                <a href="">Pengumuman</a>
                </div>
            </div>
        </div>



        </>
    )
}

export default Navbar