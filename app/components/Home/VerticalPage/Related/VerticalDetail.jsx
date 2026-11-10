import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Navigation,
  EffectCoverflow,
  Autoplay,
  Pagination,
} from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";

import PROGRAMS from "../../../Assets/programs.json";

import "./Related.css";
import { CiViewTimeline } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { programActions } from "../../../../store/reducers/program";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { allowedIds } from "../../../Assets/constants";
import { useProgramStatuses } from "../../../../helpers/useProgramStatuses";

SwiperCore.use([EffectCoverflow, Navigation, Autoplay]);

const VerticalDetail = ({ data: propData }) => {
  const { data: reduxData } = useSelector((state) => state.program);
  const data = propData || reduxData;
  const dispatch = useDispatch();
  const { getProgramStatus } = useProgramStatuses();
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [verticalPrograms, setVerticalPrograms] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const params = useParams();
  const category = params?.category;

  const normalizeCategory = (str) =>
    String(str || "")
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/\s*&\s*/g, " and ")
      .replace(/\s+/g, " ")
      .trim();

  const getFiltered = (cat, pageData) => {
    const target =
      pageData?.short_id ||
      pageData?.vertical ||
      pageData?.short_title ||
      cat;
    if (!target) return [];
    const targetStr = Array.isArray(target) ? target[0] : String(target);
    const targetNorm = normalizeCategory(decodeURIComponent(targetStr));
    return PROGRAMS.filter(
      (program) => normalizeCategory(program.category) === targetNorm
    );
  };

  const [categorizedPrograms, setCategorizedPrograms] = useState(() =>
    getFiltered(category, data)
  );
  useEffect(() => {
    if (swiper) {
      swiper.el.onmouseover = () => {
        swiper.autoplay.stop();
      };
      swiper.el.onmouseout = () => {
        swiper.autoplay.start();
      };
    }
  }, [swiper]);

  useEffect(() => {
    setCategorizedPrograms(getFiltered(category, data));
  }, [category, data]);

  // console.log(categorizedPrograms)

  const handleDownloadBrochure = (program) => {
    if (program) {
      dispatch(programActions.setBrochureState(program));
    }
  };

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div
      id="courses"
      className="second-bg-grad related w-full xl:px-12 px-4 py-6 md:py-12"
    >
      <div className="w-full flex justify-center mb-4">
        <div className="w-full max-w-[85rem] flex justify-center gap-2 relative">
          <div className="w-full max-w-[85rem] text-center capitalize">
            <h4 className="text-base font-medium">
              Our
              <span className="text-universal">
                {" "}
                {data?.short_title} Programs
              </span>
            </h4>
            <h2 className="text-2xl md:text-3xl mt-2 font-semibold ">
              {data?.short_title}{" "}
              {categorizedPrograms.length > 1 ? "Programs" : "Program"} from
              <span className="text-universal"> premier institutes</span>{" "}
            </h2>
          </div>
          {/* 
          <div className="w-full flex md:flex-row flex-col justify-normal md:justify-between lg:gap-8 gap-4 items-start md:items-end">
            <div className="w-full">
              <h4 className="text-base text-darkBlue font-medium max-sm:max-w-[300px] capitalize">
                
                <span className=""></span>
              </h4>
              <h1 className="text-3xl lg:text-[44px] mt-2 font-semibold capitalize">
                
                <span className="text-universal">  </span>
              </h1>
            </div>
          </div> */}
        </div>
      </div>
      {categorizedPrograms.length > 3 && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[85rem] flex justify-center gap-2 relative">
            <div className="swiper-button-prev custom-prev">
              <IoIosArrowBack className="text-universal" />
            </div>
            <div className="w-full max-w-6xl">
              <Swiper
                loop
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                }}
                spaceBetween={30}
                navigation={{
                  nextEl: ".swiper-button-next.custom-next",
                  prevEl: ".swiper-button-prev.custom-prev",
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper2 py-2"
                onSwiper={setSwiper}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
              >
                {categorizedPrograms.map((program, index) => {
                  const resolved = getProgramStatus ? getProgramStatus(program) : { status: program.status, isAdmissionClosed: program.status?.toLowerCase() === "admission closed" };
                  return (
                  <SwiperSlide key={index} className="py-4">
                    <div className="w-full lg:max-w-[400px] min-h-[420px] rounded-2xl overflow-hidden bg-white drop-shadow-md border flex flex-col relative">
                      <div className="w-full h-32 flex items-center justify-center bg-blue-50 relative">
                        {/* Status Badge at Top-Right */}
                        {resolved.status && (
                          <div className="absolute top-2 right-2 z-10">
                            <div
                              className={`rounded-lg px-3 py-1 capitalize text-xs font-semibold text-white shadow-md ${resolved.isAdmissionClosed
                                ? "bg-red-500"
                                : "bg-green-500"
                                }`}
                            >
                              {resolved.status}
                            </div>
                          </div>
                        )}

                        {/* Program Image */}
                        {program.cover_image && (
                          <Image
                            className="object-cover"
                            src={program.cover_image}
                            alt={`${program.program_name} - ${program.university_name || "Accredian"}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            quality={75}
                          />
                        )}
                      </div>
                      <div className="w-full pt-4 pb-2 px-4">
                        <div className="w-full flex items-center gap-4">
                          <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 bg-white drop-shadow-md">
                            {program.university_image && (
                              <Image
                                title={program.university_name}
                                src={program.university_image}
                                className="w-full h-full object-contain rounded-sm"
                                alt={program.university_name || "University"}
                                width={40}
                                height={40}
                                quality={75}
                                sizes="40px"
                              />
                            )}
                          </div>
                          <p
                            title={program.university_name}
                            className="text-center font-medium text-xs text-neutral-500 cursor-context-menu"
                          >
                            {program.university_name}
                          </p>
                        </div>
                        <div className="w-full border-b border-neutral-300 mt-4" />
                      </div>
                      <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {program.program_name}
                        </h3>
                        <div className="w-full">
                          <h4
                            className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu"
                            title={program.tags?.join(", ")}
                          >
                            <span className="text-black">Core skills - </span>
                            {program.tags?.join(", ")}
                          </h4>
                          <div className="flex items-center gap-2">
                            <CiViewTimeline
                              className="text-2xl text-universal/90"
                              strokeWidth={0.5}
                            />
                            <p className="text-base font-medium capitalize">
                              {program.duration} -{" "}
                              <span title={program.batch_type}>
                                {program.batch_type}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center w-full gap-2 mt-4">
                          <a
                            href={program.category?.toLowerCase() === "free courses" || program.category?.toLowerCase() === "microsoft" || program.id === "transform-business-workflows-with-generative-ai" || program.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${program.id}` : `/programs/${program.id}`}
                            className="px-2 py-2.5 flex-1 text-sm font-semibold border border-neutral-300 rounded-lg text-center"
                          >
                            View Program
                          </a>
                          <button
                            onClick={() => handleDownloadBrochure(program)}
                                disabled={
                              resolved.isAdmissionClosed || allowedIds.includes(program?.id)
                            }
                            className="px-2 py-2.5 flex-1 disabled:bg-gray-400  text-sm font-semibold bg-universal text-white rounded-lg"
                          >
                            Get Brochure
                          </button>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
                })}
              </Swiper>
              <div ref={paginationRef} className="swiper-pagination"></div>
            </div>
            <div className="swiper-button-next custom-next">
              <IoIosArrowForward className="text-universal" />
            </div>
          </div>
        </div>
      )}
      {categorizedPrograms.length <= 3 && (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[85rem] flex justify-center gap-2 relative">
            <div className="w-full flex gap-10 flex-wrap justify-center items-center ">
              {categorizedPrograms.map((program, index) => {
                const resolved = getProgramStatus ? getProgramStatus(program) : { status: program.status, isAdmissionClosed: program.status?.toLowerCase() === "admission closed" };
                return (
                <div className="w-full lg:max-w-[400px] min-h-[420px] rounded-2xl overflow-hidden bg-white drop-shadow-md border flex flex-col relative">
                  <div className="w-full h-32 flex items-center justify-center bg-blue-50 relative">
                    {resolved.status && (
                      <div className="absolute top-2 right-2 z-10">
                        <div
                          className={`rounded-lg px-3 py-1 capitalize text-xs font-semibold text-white shadow-md ${resolved.isAdmissionClosed
                            ? "bg-red-500"
                            : "bg-green-500"
                            }`}
                        >
                          {resolved.status}
                        </div>
                      </div>
                    )}
                    {program.cover_image && (
                      <Image
                        className="object-cover"
                        src={program.cover_image}
                        alt={`${program.program_name} - ${program.university_name || "Accredian"}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        quality={75}
                      />
                    )}
                  </div>
                  <div className="w-full pt-4 pb-2 px-4">
                    <div className="w-full flex items-center gap-4">
                      <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 bg-white drop-shadow-md">
                        {program.university_image && (
                          <Image
                            title={program.university_name}
                            src={program.university_image}
                            className="w-full h-full object-contain rounded-sm"
                            alt={program.university_name || "University"}
                            width={40}
                            height={40}
                            quality={75}
                            sizes="40px"
                          />
                        )}
                      </div>
                      <p
                        title={program.university_name}
                        className="text-center font-medium text-xs text-neutral-500 cursor-context-menu"
                      >
                        {program.university_name}
                      </p>
                    </div>
                    <div className="w-full border-b border-neutral-300 mt-4" />
                  </div>
                  <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
                    <h3 className="font-semibold text-lg text-gray-900">{program.program_name}</h3>
                    <div className="w-full">
                      <h4
                        className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu"
                        title={program.tags?.join(", ")}
                      >
                        <span className="text-black">Core skills - </span>
                        {program.tags?.join(", ")}
                      </h4>
                      <div className="flex items-center gap-2">
                        <CiViewTimeline
                          className="text-2xl text-universal/90"
                          strokeWidth={0.5}
                        />
                        <p className="text-base font-medium capitalize">
                          {program.duration} -{" "}
                          <span title={program.batch_type}>
                            {program.batch_type}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center w-full gap-2 mt-4">
                      <a
                        href={program.category?.toLowerCase() === "free courses" || program.category?.toLowerCase() === "microsoft" || program.id === "transform-business-workflows-with-generative-ai" || program.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${program.id}` : `/programs/${program.id}`}
                        className="px-2 py-2.5 flex-1 text-sm font-semibold border border-neutral-300 rounded-lg text-center"
                      >
                        View Program
                      </a>
                      <button
                        onClick={() => handleDownloadBrochure(program)}
                        disabled={
                          resolved.isAdmissionClosed || allowedIds.includes(program?.id)
                        }
                        className="disabled:bg-[#AFAFAF]  disabled:border disabled:border-slate-300 px-2 py-2.5 flex-1 text-sm font-semibold bg-universal text-white rounded-lg"
                      >
                        Get Brochure
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerticalDetail;
