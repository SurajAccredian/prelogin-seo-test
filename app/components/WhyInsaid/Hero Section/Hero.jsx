"use client"
import React, { useState } from "react";
import "./whyaccredian.css";
import CtaModal from "../CTA/CtaModal";
import { CircleCheck } from "lucide-react";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <div
        id="home"
        className="flex justify-center items-center my-4  xl:px-12 sm:px-4 mt-20 md:mt-0"
      >
        <div className="rounded-lg md:rounded-3xl  bg-blue-50 flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-4 sm:gap-4 md:gap-8 lg:gap-12  shadow-card overflow-visible">
          <div className="sm:w-1/2 w-full sm:ml-7 p-4 flex flex-col  justify-between gap-4 sm:gap-4 md:gap-8 lg:gap-10 md:ps-2 lg:ps-8">
            <h1 className="text-center sm:text-left cursor-context-menu text-2xl sm:text-4xl lg:text-6xl xxl:text-7xl 2xl:text-[5.2vw] 3xl:text-[5.0rem] font-bold max-w-full sm:max-w-[350px] lg:max-w-[700px] pt-2 capitalize px-8 sm:px-0 font-circular">
              Why <span className="text-universal">Accredian ?</span>
            </h1>
            <p className="font-medium md:font-normal text-sm sm:text-lg lg:text-2xl text-paleBlack max-w-full p-2 sm:p-0 w-full sm:max-w-[600px] text-center sm:text-start font-circular">
              At Accredian, we empower professionals to grow or pivot in their
              careers with future-ready skills, practical training, and expert
              support.
            </p>
            <ul className=" grid grid-cols-2 mx-auto sm:flex sm:mx-0 sm:justify-start sm:flex-wrap gap-4">
              <li className=" flex items-center  gap-2 mb-2">
                {" "}
                <CircleCheck className="w-6 h-6  text-green-600" />
                100% Live Sessions
              </li>
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <CircleCheck className="w-6 h-6  text-green-600" />
                Industry Insights
              </li>
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <CircleCheck className="w-6 h-6  text-green-600" />
                Expert Guidance
              </li>
              <li className=" flex items-center gap-2 mb-2 sm:hidden">
                {" "}
                <CircleCheck className="w-6 h-6  text-green-600" />
                Peer Learning
              </li>
            </ul>
            <div className="flex mb-6 sm:mb-0 justify-center sm:justify-start">
              <button
                onClick={handleModalOpen}
                className=" w-[80%] sm:w-[170px] p-[5px] text-md font-normal text-white bg-universal rounded-lg shadow-md"
              >
                <p className="text-sm md:text-xl">Enquire Now</p>{" "}
              </button>
            </div>
          </div>
          <div className="flex w-full sm:w-1/2 sm:justify-end sm:items-end justify-center">
            <img
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/whyAccredianHeader-v2-updated.webp"
              alt="headerImage"
              className="sm:w-full sm:h-full h-[80%] w-[80%]"
            />
          </div>
        </div>
      </div>
      {isModalOpen && <CtaModal open={isModalOpen} setOpen={setIsModalOpen} />}
    </>
  );
};

export default Hero;
