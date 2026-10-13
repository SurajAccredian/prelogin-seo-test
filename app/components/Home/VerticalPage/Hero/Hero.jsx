import React, { useEffect, useState } from "react";
import Rcta from "../../../cta/request_a_call_back";
import HeroCss from "./Hero.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
const Hero = ({ data: propData }) => {
  const [cta, setCta] = useState(false);
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram?.data;
  if (!data) return null;
  const handleClickOpenRcb = () => {
    setCta(true);
  };
  const RcbhandleClose = () => {
    setCta(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="max-w-full   relative bg-blue-50 flex flex-row justify-center md:flex-row  md:justify-evenly gap-0 sm:gap-4 md:gap-8 lg:gap-12 px-0 overflow-visible vertical-hero-card">
          <div className="vertical-main-section flex flex-col justify-center items-center md:items-start gap-2 md:gap-6 p-6 lg:gap-5 md:ps-8 lg:ps-8">
            <h1 className="vertical-text text-center hidden md:inline-block md:text-start cursor-context-menu text-2xl md:text-[10px] lg:text-6xl font-bold pt-2 capitalize px-8 sm:px-0 font-circular">
              <span className="inline-block whitespace-nowrap mb-2">
                Transform Your Career {data.short_title === "CXO" ? "as" : "in"}
              </span>
              <br />
              <span className="inlie-block text-universal">
                {" "}
                {data.short_title}{" "}
              </span>
            </h1>

            <h1 className="vertical-text md:hidden inline-block text-center cursor-context-menu text-2xl md:text-[10px] lg:text-6xl font-bold pt-2 capitalize sm:px-0 font-circular">
              <span className="inline-block mb-2">
                Transform Your Career {data.short_title === "CXO" ? "as" : "in"}{" "}
                <span className="text-universal">{data.short_title}</span>
              </span>
              <br />
              {/* <span className="inlie-block">  </span> */}
            </h1>
            <p className="font-medium text-center sm:text-left md:font-normal text-sm md:text-xl md:max-w-[500px] lg:text-xl text-paleBlack  mx-auto md:mx-0 font-circular">
              {data.description}
              {/* <span className="text-universal font-bold text-xl md:text-2xl lg:text-4xl">
              ₹10,000
            </span> */}
            </p>
            <ul className="grid grid-cols-2 justify-center md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-4 mx-auto md:mx-0">
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Accredited Certification
              </li>
              <li className=" flex items-center gap-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Quick Query Resolution
              </li>
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Live Online Classes
              </li>
              <li className=" flex items-center gap-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Hands-On Learning
              </li>
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Career Assistance
              </li>
              <li className=" flex items-center gap-2 mb-2">
                {" "}
                <IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-500" />
                Lifetime Support
              </li>
            </ul>
            <a
              href="#courses"
              className="vertical-button text-sm drop-shadow-xl xl:text-base font-medium xl:px-6 xl:py-2 px-5 py-1.5 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] capitalize cursor-pointer font-circular z-[10]"
            >
              Explore Courses
            </a>
          </div>

          {/* <div className="relative w-[600px] h-[420px] items-end"> */}
          {/* <div className=" w-full h-full"> */}
          {/* <img classname="" src={verticalHeader} alt="home" /> */}
          <div className="vertical-image-div flex flex-col justify-end mr-10">
            <img
              className="vertical-image-size w-[580px] h-[420px] "
              src={data?.image}
              alt="vertical"
            />
            {/* <img
              src={verticalHeader}
              className="vertical-image-size w-[580px] h-[460px] "
              alt="vertical"
            /> */}
          </div>
          {/* </div> */}
          {/* </div> */}
          {/* <div className="r-con home-4-container-right md:py-0 py-12 md:flex hidden justify-center ">
            <div className="relative hidden "></div>
          </div> */}
        </div>
      </div>
    </div>
    // <div className="main-container-4 xl:px-12 px-0">
    //   {/*<div className="home-gradient-right" /> */}
    //   <div className="home-4-container w-full max-w-[85rem] flex justify-center relative md:flex-row flex-col xl:px-0 px-4 py-10">
    //     <div className="home-4-container-left flex-1 flex flex-col gap-3 md:items-start items-center">
    //       <div className="w-full flex justify-center md:justify-start">
    //         {/* <h1 className="text-center cursor-context-menu md:text-start text-4xl 2xl:text-[5vw] 2xl:leading-[5.5vw] lg:text-5xl xl:text-7xl font-bold max-w-lg xl:max-w-[700px]">Unlock your Dream Career with </h1> */}
    //         <h1 className="text-center cursor-context-menu md:text-start text-4xl  font-bold max-w-lg xl:max-w-[700px]">
    //           Master Product Management <br className="lg:hidden block" />
    //           {/* with Top{" "} */}
    //         </h1>
    //       </div>
    //       {/* <div className="w-full max-w-[300px] lg:max-w-[380px] xl:max-w-[500px] 2xl:max-w-[590px] md:mt-0 -mt-3">
    //         <h1 className='text-4xl md:text-start text-center 2xl:text-[5vw] lg:text-5xl xl:text-7xl font-bold cursor-context-menu'>Top Universities</h1>
    //         <img className='w-full mt-2' src="/Rcimages/line.png" alt="line" />
    //       </div> */}
    //       <div className="w-full max-w-[200px] lg:max-w-[280px] xl:max-w-[400px] 2xl:max-w-[490px] md:mt-0 -mt-3">
    //         <h1 className="text-4xl  font-bold cursor-context-menu">
    //           {/* Universities */}
    //         </h1>
    //       </div>
    //       <div className="w-full flex justify-center md:justify-start">
    //         {/* <p className="max-w-sm lg:max-w-[630px] font-semibold text-sm md:text-start text-center md:text-base lg:text-[20px] text-paleBlack">Advance your career with India's premier online school. Experience top university programs for effective learning and success.</p> */}
    //         <p className="max-w-sm lg:max-w-md xl:max-w-[630px] font-semibold text-sm md:text-start text-center md:text-base xl:text-[20px] text-paleBlack">
    //           Learn product management from top institutes and advance your
    //           career.
    //         </p>
    //       </div>
    //       <div className="flex items-center gap-4 md:justify-start justify-center">
    //         <button
    //           className="text-nowrap text-sm xl:text-base drop-shadow-xl py-2 xl:py-4 px-4 xl:px-7 bg-white rounded-[4px] text-black font-semibold xl:font-bold transition-all duration-100 hover:bg-universal border-universal hover:text-white border"
    //           onClick={handleClickOpenRcb}
    //           title="Talk to Expert"
    //         >
    //           Talk to Expert
    //         </button>
    //         <a
    //           href="#courses"
    //           className="text-sm drop-shadow-xl xl:text-base xl:font-bold font-semibold xl:px-6 xl:py-4 px-4 py-2 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px]"
    //         >
    //           Explore Courses
    //         </a>
    //       </div>
    //     </div>
    //     <div className="home-4-container-right md:py-0 py-16 sm:flex hidden justify-center ">
    //       <div className="relative w-full sm:w-[70%] md:w-[40vw] lg:w-[45vw] 3xl:w-[42rem]">
    //         <img
    //           src={verticalHeader}
    //           alt="home"
    //           className=" w-full"
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <Rcta open={cta} handleClose={RcbhandleClose} />
    // </div>
  );
};

export default Hero;
