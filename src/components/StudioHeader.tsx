import React from 'react';
import Image from 'next/image';
import logo from "@/assets/logoLight.png"
import Link from 'next/link';
import { IoReturnDownBack } from "react-icons/io5";

const StudioHeader = (props: any) => {
  return (
    <div>
      <div className='p-5 bg-black text-gray-100 flex items-center justify-between'>
        <Link href={"/"} className='flex items-center gap-3 font-semibold hover:text-blue-400'>
          <IoReturnDownBack className='text-2xl'/> Go to Website </Link>
        <Image src={logo} alt='logo' className='w-24'/>
        <p>Admin Studio for Shopping site</p>
      </div>
      {props.renderDefault(props)}
    </div>
  );
};

export default StudioHeader;
