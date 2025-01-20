"use client";
import { FaSearch } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5";
import Link from 'next/link'
import Image from "next/image"
import React, { useState } from 'react'
import logo from '@/assets/logoBlack.png'
import { usePathname } from "next/navigation";
import { HiMenuAlt2 } from "react-icons/hi";

const NavBar = () => {
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("")

    const navBarList=[
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Shop",
        link: "/shop",
      },
      {
        title: "Cart",
        link: "/cart",
      },
      {
        title: "Profile",
        link: "/profile",
      },
      {
        title: "Studio",
        link: "/studio",
      },
    ]
  return (
    <div className='w-full h-20 bg-white border-b-[1px] border-b-gray-400 sticky top-0 z-50'>
      <nav className='h-full max-w-screen-xl mx-auto px-4 xl:px-0 flex items-center justify-between gap-2'>
        <Link href={"/"}>
            <Image src={logo} alt='logo' className='w-20' />
        </Link>
        <div className='relative w-full hidden lg:inline-flex lg:min-w-[600px] h-10 text-base text-primeColor border-[1px] border-black items-center gap-2 
        justify-between px-6 rounded-md'>
          <input 
            type="text" 
            placeholder="Search your product here"
            className='flex-1 h-full outline-none bg-transparent placeholder:text-gray-600' 
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          {searchQuery ? 
          <IoCloseOutline 
            onClick={() => setSearchQuery("")}
            className="w-5 h-5 duration-200 hover:cursor-pointer"/> : 
          <FaSearch className="w-5 h-5 hover:cursor-pointer"/>}
        </div>
        <div className="hidden md:inline-flex items-center gap-2">
        {navBarList.map((item) => (
          <Link 
            href={item?.link} 
            key={item?.link} 
            className={`flex hover:font-medium w-20 h-6 justify-center items-center px-12 text-gray-600 hover:underline 
            underline-offset-4 decoration-[1px] hover:text-gray-950 md:border-r-[2px] border-r-gray-500 
            last:border-r-0 ${pathname === item?.link && 'text-gray-950 underline'}`}
        >
            {item?.title}
          </Link>
        ))}
        </div>
        <HiMenuAlt2 className="inline-flex md_gidden cursor-pointer w-8 h-6"/>
      </nav>
    </div>
  )
}

export default NavBar
