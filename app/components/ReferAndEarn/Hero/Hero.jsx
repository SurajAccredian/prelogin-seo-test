"use client"
import { useState } from "react";
import ReferModal from "../../Modals/ReferModal/Prelogin-Refer-Modal";
import "../refer.css";

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div
      id="referHero"
      className="flex justify-center items-center my-4 md:mt-8 md:mt-4 xl:px-12 px-4 mb-10 md:mb-0"
    >
      <div className="">
        <div className="rounded-lg md:rounded-3xl bg-blue-50 flex flex-col md:flex-row items-center justify-center md:justify-between gap-0 sm:gap-4 md:gap-8 lg:gap-12 px-0 pb-4 md:p-4 shadow-card overflow-visible refer-hero-card">
          <div className="l-con flex flex-col justify-center items-center md:items-start gap-2 md:gap-6 lg:gap-10 md:ps-2 lg:ps-8">
            <h1 className="text-center md:text-start cursor-context-menu text-2xl lg:text-6xl xl:text-7xl 2xl:text-[5.2vw] 3xl:text-[5.0rem] font-bold max-w-sm md:max-w-[200px] lg:max-w-[450px] pt-2 capitalize px-8 sm:px-0 font-circular">
              Let's learn & earn
            </h1>
            <p className="font-medium md:font-normal text-sm md:text-xl lg:text-3xl text-paleBlack max-w-[170px] md:max-w-[200px] lg:max-w-[300px] text-center md:text-start font-circular">
              Get a chance to earn {" "}
              <span className="text-universal font-bold text-xl md:text-2xl lg:text-3xl">
                ₹10,000 {" "}
              </span>
              for every friend who enrolls!
            </p>
            <a
              className="text-sm drop-shadow-xl xl:text-base font-medium xl:px-6 xl:py-2 px-5 py-1.5 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] capitalize cursor-pointer font-circular"
              onClick={handleModalOpen}
            >
              Refer now
            </a>
          </div>
          <div className="r-con home-4-container-right md:py-0 py-12 md:flex hidden justify-center ">
            <div className="relative hidden md:block w-full sm:w-[70%] md:w-[40vw] lg:w-[45vw] 3xl:w-[42rem]"></div>
          </div>
        </div>
      </div>
            <ReferModal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Hero;
