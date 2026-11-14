"use client";
import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const CareerTransition = dynamic(() => import("../CTA_Modal/career_transition"), { ssr: false });


const Hero = () => {

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex justify-center xl:px-12 px-4 py-12">
        <div className="w-full max-w-[85rem] flex justify-center relative md:flex-row flex-col">
          <div className="flex-1 flex flex-col gap-3 md:items-start items-center justify-between">
            <div className="w-full flex flex-col md:items-start items-center">
              <h1 className="text-center cursor-context-menu md:text-start text-4xl lg:text-7xl font-bold max-w-lg xl:max-w-[700px]">Alumni Achievements:</h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-4">Inspiring Journeys to Success</h2>
              <p className="max-w-sm mt-4 lg:max-w-[630px] font-semibold text-sm md:text-start text-center md:text-base lg:text-[20px] text-paleBlack">Hear how our alumni transformed their careers and see the results that speak for themselves.</p>
            </div>
            <div className="flex items-center gap-4 md:justify-start justify-center mt-6 font-circular">
              <button onClick={() => setOpen(true)} className="text-sm drop-shadow-lg lg:font-bold font-semibold lg:px-6 lg:py-4 px-4 py-2 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] text-nowrap">
                Get Career Handbook
              </button>
              <a href="/programs" className="text-nowrap text-sm drop-shadow-xl py-2 lg:py-4 px-4 lg:px-7 bg-white rounded-[4px] text-black font-semibold lg:font-bold transition-all duration-100 hover:bg-universal border-universal hover:text-white border" title='Talk to Expert'>
                Explore Courses
              </a>
            </div>
          </div>
          <div className="flex-1 md:py-0 py-16 sm:flex hidden justify-center">
            <div className='relative h-fit w-full max-w-xl rounded-lg overflow-hidden p-2 bg-white border drop-shadow-xl'>
              <Image
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/success-stories-hero2.webp"
                alt="Alumni Achievements"
                width={600}
                height={400}
                priority
                quality={75}
                sizes="(max-width: 768px) 100vw, 550px"
                className="w-full h-auto rounded-md object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <CareerTransition open={open} handleClose={handleClose} />
    </>
  )
}

export default Hero