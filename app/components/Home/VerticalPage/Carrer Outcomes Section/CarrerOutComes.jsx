import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaChalkboardTeacher, FaUniversity } from "react-icons/fa";
import { CgExtensionAdd } from "react-icons/cg";
import { GrDocumentPerformance } from "react-icons/gr";
import { RiPresentationFill } from "react-icons/ri";
import { MdGroups2 } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";

import "./CarrerOutComes.css";
import { useSelector } from "react-redux";
import Disclaimer from "../../../Programs/Disclaimer";

const CarrerOutComes = () => {
  const { data } = useSelector((state) => state.program);

  return (
    <div
      id="unique points"
      className="USP second-bg-grad w-full flex justify-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full text-center">
          <h4 className="text-base font-medium">
            Key
            <span className="text-universal"> Program Benefits</span>*
          </h4>
          <h1 className="text-2xl md:text-3xl capitalize mt-2 font-semibold">
            Elevate Your
            <span className="text-universal"> {data?.short_title} </span>
            Career
          </h1>
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-full max-w-[75rem] grid grid-cols-2 xl:grid-cols-4 md:place-items-center gap-4 md:gap-8">
            {data?.unique_points?.includes("gain practical exp") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mt-4  text-blue-600 flex-shrink-0">
                  <RiPresentationFill className="w-full h-full" />
                </div>
                <h1 className="text-lg font-semibold mt-4">
                  Gain Practical Experience
                </h1>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Engage in real-world, hands-on learning with impactful
                  projects.
                </h4>
              </div>
            )}

            {data?.unique_points?.includes("accelerate your career") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mt-4  text-blue-600 flex-shrink-0">
                  <FaGraduationCap className="w-full h-full" />
                </div>
                <h1 className="text-lg font-semibold mt-4">
                  Accelerate Your Career
                </h1>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Step into {data.short_id} leadership and drive innovation.
                </h4>
              </div>
            )}

            {data?.unique_points?.includes("accelerate your career pmt") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mt-4  text-blue-600 flex-shrink-0">
                  <FaGraduationCap className="w-full h-full" />
                </div>
                <h1 className="text-lg font-semibold mt-4">
                  Accelerate Your Career
                </h1>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Step into leadership roles and drive impactful project success
                  globally.
                </h4>
              </div>
            )}

            {data?.unique_points?.includes("unlock-oppertunittes") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mt-4  text-blue-600 flex-shrink-0">
                  <FaChalkboardTeacher className="w-full h-full" />
                </div>
                <h1 className="text-lg font-semibold mt-4">
                  Unlock Opportunities
                </h1>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Transition to high-demand roles in tech & startups.
                </h4>
              </div>
            )}

            {data?.unique_points?.includes("expand-network") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex flex-col items-center text-center md:max-w-sm md:min-h-[18rem] drop-shadow-2xl border cursor-context-menu overflow-hidden">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mt-4  text-blue-600 flex-shrink-0">
                  <GrDocumentPerformance className="w-full h-full" />
                </div>
                <h1 className="text-lg font-semibold mt-4">
                  Expand Your Network
                </h1>
                <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                  Connect with peers, leaders, and alumni for new opportunities.
                </h4>
              </div>
            )}
          </div>
        </div>
        <Disclaimer ClassName={"text-sm mt-8 text-center"} />
      </div>
    </div>
  );
};

export default CarrerOutComes;
