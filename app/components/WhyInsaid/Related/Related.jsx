"use client"
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

import PROGRAMS from "../../Assets/programs.json";

import "./Related.css";
import { CiViewTimeline } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { programActions } from "../../../store/reducers/program";
import { useDispatch } from "react-redux";

SwiperCore.use([EffectCoverflow, Navigation, Autoplay]);

const Related = () => {
  const dispatch = useDispatch();
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [verticalPrograms, setVerticalPrograms] = useState([]);
  const [swiper, setSwiper] = useState(null);

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
    const getRelatedPrograms = () => {
      const uniqueCategoryMap = new Map();

      for (const program of PROGRAMS) {
        const category = program.category.toLowerCase();
        const status = program.status?.toLowerCase();

        // Skip if status is "admission closed" or category already added
        if (status === "admission closed" || uniqueCategoryMap.has(category)) {
          continue;
        }

        uniqueCategoryMap.set(category, program);
      }

      const relatedPrograms = Array.from(uniqueCategoryMap.values());

      // Optional: sort by duration in descending order
      relatedPrograms.sort((a, b) => {
        const durationA = parseInt(a.duration);
        const durationB = parseInt(b.duration);
        return durationB - durationA;
      });

      return relatedPrograms;
    };

    setVerticalPrograms(getRelatedPrograms());
  }, []);

  const handleDownloadBrochure = (program) => {
    console.log(program);
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
    <div className="related w-full xl:px-12 px-4">
      <div className="w-full text-center">
        <h4 className="text-base font-medium">Choose the Right Program</h4>
        <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
          Explore Our
          <span className="text-universal"> Career-Accelerating</span> Programs
        </h1>
      </div>
      <div className="w-full flex mt-6 justify-center">
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
              {verticalPrograms.map((program, index) => (
                <SwiperSlide key={index} className="py-4">
                  {console.log(program)}
                  <div className="w-full lg:max-w-[400px] min-h-[420px] rounded-2xl overflow-hidden bg-white drop-shadow-md border flex flex-col relative">
                    <div className="w-full h-32 flex items-center justify-center bg-blue-50">
                      <div className="absolute top-2 right-2 z-10">
                        <div
                          className={`rounded-lg px-3 py-1 capitalize text-xs font-semibold text-white shadow-md bg-green-500`}
                        >
                          {program.category}
                        </div>
                      </div>
                      <img
                        className="w-full h-full object-cover"
                        src={program.cover_image}
                        alt="cover images"
                      />
                    </div>
                    <div className="w-full pt-4 pb-2 px-4">
                      <div className="w-full flex items-center gap-4">
                        <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 bg-white drop-shadow-md">
                          <img
                            title={program.university_name}
                            src={program.university_image}
                            className="w-full h-full object-contain rounded-sm"
                            alt={program.university_name}
                          />
                        </div>

                        <h1
                          title={program.university_name}
                          className="text-center font-medium text-xs text-neutral-500 cursor-context-menu"
                        >
                          {program.university_name}
                        </h1>
                      </div>
                      <div className="w-full border-b border-neutral-300 mt-4" />
                    </div>
                    <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
                      <h1 className="font-semibold">{program.program_name}</h1>
                      <div className="w-full">
                        <h2
                          className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu"
                          title={program.tags?.join(", ")}
                        >
                          <span className="text-black">Core skills - </span>
                          {program.tags?.join(", ")}
                        </h2>
                        <div className="flex items-center gap-2">
                          <CiViewTimeline
                            className="text-2xl text-universal/90"
                            strokeWidth={0.5}
                          />
                          <h1 className="text-base font-medium capitalize">
                            {program.duration} -{" "}
                            <span title={program.batch_type}>
                              {program.batch_type}
                            </span>
                          </h1>
                        </div>
                      </div>
                      <div className="flex items-center w-full gap-2 mt-4">
                        <a
                          href={`/programs/${program.id}`}
                          className="px-2 py-2.5 flex-1 text-sm font-semibold border bg-universal text-white border-neutral-300 rounded-lg text-center"
                        >
                          View Program
                        </a>
                        {/* <button
                          onClick={() => handleDownloadBrochure(program)}
                          className="px-2 py-2.5 flex-1 text-sm font-semibold bg-universal text-white rounded-lg"
                        >
                          Get Brochure
                        </button> */}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div ref={paginationRef} className="swiper-pagination"></div>
          </div>
          <div className="swiper-button-next custom-next">
            <IoIosArrowForward className="text-universal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Related;
