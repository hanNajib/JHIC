import React from "react";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Navbar = () => {
    return (
        <>
        <div className="atas flex w-full bg-[#eeeeee] justify-between">
            <div className="flex bg-[#FF6000] px-16 py-2 items-center gap-2 justify-center rounded-tr-full">
                <p className="font-poppins font-bold text-white"> Follow Me : </p>
                <a href=""><FaYoutube className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
                <a href=""><FaInstagram className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
                <a href=""><FaFacebook className="text-white bg-[#ffffff3c] text-[2rem] p-2 rounded-full"/></a>
            </div>

            <div className="flex items-center justify-center mr-10 gap-8">
                <p className="flex items-center text-black font-poppins gap-2"><FaPhoneAlt className="text-[#ff6000] text-xl"/> (0336) 444112</p>
                <p className="flex items-center text-black font-poppins gap-2"><IoIosMail className="text-[#ff6000] text-2xl"/> smknegeri08jember@gmail.com </p>
            </div>
        </div>

        <div className="bawah sticky top-0 z-20 flex bg-white items-center px-14 py-2 justify-between">
            <img src="assets/images/logo-smk.png" alt="" className="w-[50px]"/>
            <div className="flex font-poppins gap-10 text-[#4c4c4c]">
                <a href="">Home</a>
                <a href="">Profil</a>
                <a href="">Jurusan</a>
                <a href="">Blog</a>
                <a href="">Galeri</a>
                <a href="">Pengumuman</a>
            </div>
            
            <div className="relative w-72">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500"
                />
            </div>

        </div>
        </>
    )
}

export default Navbar