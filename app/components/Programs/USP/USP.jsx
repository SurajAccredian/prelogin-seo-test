import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import {
  FaBookBookmark,
  FaEarthAmericas,
  FaRegAddressCard,
} from "react-icons/fa6";
import { FaAward, FaChalkboardTeacher, FaSuitcase, FaUniversity } from "react-icons/fa";
import { CgExtensionAdd } from "react-icons/cg";
import { GrDocumentPerformance } from "react-icons/gr";
import { RiPresentationFill } from "react-icons/ri";
import { MdGroups, MdGroups2, MdLeaderboard } from "react-icons/md";
import { IoBagHandleSharp, IoNewspaper } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";

import "./USP.css";
import { useSelector } from "react-redux";
import Disclaimer from "../Disclaimer";
import { PiBooksLight, PiCertificateFill } from "react-icons/pi";
import { TbBooks } from "react-icons/tb";
import { FileCog, ScrollText, Trophy } from "lucide-react";
import { GiDiploma } from "react-icons/gi";
import { FcDiploma1 } from "react-icons/fc";

const USP = ({ data: propData }) => {
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram.data;

  return (
    <div
      id="unique points"
      className="USP second-bg-grad w-full flex justify-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full text-center">
          <h4 className="text-base font-medium">
            Explore the unparalleled offerings for{" "}
            <span className="text-universal">{data?.short_title}</span> Program
          </h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold">
            Program <span className="text-universal">Strengths</span> at a
            Glance*
          </h2>
        </div>
        <div className="flex justify-center mt-12">
          <div className={`w-full max-w-[75rem] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 md:place-items-center gap-4 md:gap-8`}>
            {data?.unique_points?.includes("certificate") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaRegAddressCard className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Completion Certificate
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Official credential validating skills & program completion
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("capstone-project") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FileCog className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">Capstone Project</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Solve real business challenges through hands-on application
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("BYOP-challenge") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FiTrendingUp className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">BYOP Challenge</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Design, build, & launch your own product
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("product-demo-day") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <RiPresentationFill className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">Product Demo Day</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Showcase products to industry experts & receive feedback
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("campus-immersion") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaUniversity className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Campus Immersion
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    On-campus exposure with faculty & industry insights
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("campus-immersion-opt") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaUniversity className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Campus Immersion
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Optional on-campus learning experience with industry exposure
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("add-ons") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <CgExtensionAdd className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Add-on Modules
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Specialized modules to deepen expertise & practical knowledge
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("experiential-learning") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <GrDocumentPerformance className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Experiential Learning
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Hands-on learning through live projects & case studies
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("international-immersion") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaEarthAmericas className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Dual Immersive Experiences
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Leadership immersions across IIMV & global business hub, Dubai
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("engaging-simulations") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <MdGroups2 className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Engaging Simulations
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Interactive simulations to strengthen strategic decision-making
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("exclusive-merchandise") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <IoBagHandleSharp className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Exclusive Merchandise
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Premium curated merchandise kit for enrolled participants
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("mentoring-session") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaChalkboardTeacher className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">Career Session</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Guided mentoring sessions for career clarity & transitions
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("iimt-mentoring-session") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaChalkboardTeacher className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">Career Session</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Guided mentoring sessions for career clarity & transitions, by Accredian
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("CXO-coaching-sessions") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaChalkboardTeacher className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    CXO Coaching Sessions
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Strategic coaching from senior industry leaders & CXOs
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("alumni-status") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaGraduationCap className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Executive Alumni Status
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Exclusive access to executive alumni community & benefits
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("alumni-status-opt") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaGraduationCap className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Executive Alumni Status
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Optional access to executive-level alumni network benefits
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("iimv-alumni-status") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaGraduationCap className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    IIMV Alumni Status
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Membership in the prestigious IIM Visakhapatnam alumni network
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("convocation-ceremony") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaAward className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Convocation Ceremony
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Formal graduation ceremony celebrating academic achievements
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("iimv-diploma") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <PiCertificateFill className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    PG Diploma from IIMV
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Industry-recognized postgraduate diploma for career advancement
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("alumni-status-iit") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <FaGraduationCap className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">Alumni Status</h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Official alumni status with E&ICT IIT Guwahati
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("leadership-driven-learning") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <MdGroups className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    AI Leadership Training
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Develop AI-driven leadership & strategic decision-making
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("case-based-learning") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <TbBooks className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Case Based Pedagogy
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Learn through real-world AI & business case studies
                  </h4>
                </div>
              </div>
            )}
            {data?.unique_points?.includes("strategic-leadership") && (
              <div className="USP-card-bg-image py-4 md:py-6 px-3 md:px-5 bg-white rounded-lg flex md:flex-col items-center md:text-center text-left md:max-w-sm md:min-h-[17rem] drop-shadow-2xl border md:border-l-0 border-l-4 border-l-blue-500 cursor-context-menu overflow-hidden gap-3 md:gap-0">
                <div className="w-12 h-12 md:w-16 md:h-16 md:mt-4 text-blue-600 flex-shrink-0 rounded-full md:rounded-none bg-blue-50 md:bg-transparent flex items-center justify-center md:block">
                  <TbBooks className="w-6 h-6 md:w-full md:h-full" />
                </div>
                <div className="flex flex-col md:block">
                  <h3 className="text-base md:text-lg font-semibold md:mt-4">
                    Senior Leadership
                  </h3>
                  <h4 className="text-gray-500 md:text-neutral-600 font-normal md:font-medium mt-1 md:mt-2 text-sm md:text-[15px] ">
                    Master enterprise-level leadership, strategy, & innovation
                  </h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <Disclaimer ClassName={"text-sm mt-8 text-center"} />
      </div>
    </div>
  );
};

export default USP;
