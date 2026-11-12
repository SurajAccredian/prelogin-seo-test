"use client"
import Image from "next/image";
import { useRef } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { useEffect, useState } from "react";
import TRANSITIONS from "../../../Assets/transitions.json";
import "./Transition.css";

SwiperCore.use([Navigation, Autoplay]);

const Transition = () => {
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
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
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div
      id="career transition"
      className="transitions w-full xl:px-12 px-4 py-12 overflow-hidden relative"
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[85rem]">
          <div className="w-full flex items-center justify-between">
            <div className="w-full text-center">
              <h4 className="text-base font-medium">
                Witnessing Our Student's Growth
              </h4>


              <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
                Our Top Career{" "}
                <span className="text-universal">Transitions</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto flex justify-center items-center mt-8 relative">
        <div className="swiper-button-prev custom-prev">
          <IoIosArrowBack className="text-universal" />
        </div>
        {/* swiper container */}
        <div
          ref={swiperContainerRef}
          className="swiper-container w-full max-w-[85rem]"
        >
          <Swiper
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: true,
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true,
            }}
            spaceBetween={20}
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-next.custom-next",
              prevEl: ".swiper-button-prev.custom-prev",
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper2"
            onSwiper={setSwiper}
          >
            {TRANSITIONS.map((transition, index) => (
              <SwiperSlide key={index} className="max-w-[30rem] w-full py-2">
                <div className="rounded-xl border px-3 py-3 bg-white drop-shadow-sm">
                  <div className="w-full flex items-center gap-4 justify-between relative">
                    <div className="w-full md:flex-[0.7] flex items-center gap-4">
                      <div className="w-28 h-28 flex-shrink-0 rounded-full overflow-hidden border">
                        {transition.image && (
                          <Image
                            width={112}
                            height={112}
                            quality={75}
                            className="w-full h-full object-cover object-top"
                            src={transition.image}
                            alt={transition.name || "Alumni photo"}
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {transition.name}
                        </h3>
                        {transition.experience && (
                          <h4 className="text-xs md:text-sm font-medium text-neutral-500">
                            {transition.experience} Years of Experience
                          </h4>
                        )}
                        <div className="md:hidden flex items-center mt-2">
                          <FaArrowTrendUp
                            size={20}
                            className="text-green-500"
                          />
                          {/* <h1 className='font-medium capitalize drop-shadow-md text-lg'>120% Hike</h1> */}
                        </div>
                      </div>
                    </div>
                    {/* hike */}
                    {/* <div className='absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-40 w-fit'> */}
                    <div className="w-full md:flex-[0.3] hidden md:flex justify-center">
                      <div className="rounded-full min-h-16 min-w-16 border bg-white drop-shadow-sm p-2 flex-shrink-0 flex items-center justify-center">
                        <FaArrowTrendUp size={30} className="text-green-500" />
                        {/* <h1 className='font-medium capitalize drop-shadow-md text-lg'>120%</h1> */}
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                  <div className="w-full flex lg:flex-row flex-col-reverse items-center mt-4 relative">
                    {/* companies div */}
                    <div className="w-full lg:flex-[0.5] min-h-32 border rounded-xl py-3 px-4 text-center flex flex-col justify-between items-center">
                      <div className="w-full min-h-20 ">
                        <p className="font-medium text-sm text-neutral-500">
                          From
                        </p>
                        <p className="text-base mt-2 text-neutral-700 font-medium">
                          {transition?.from?.role}
                        </p>
                      </div>
                      <div className="w-full max-w-28 min-h-12 mt-2 flex flex-col justify-center items-center">
                        {transition?.from?.logo && (
                          <Image
                            width={112}
                            height={48}
                            quality={75}
                            className="w-full h-auto max-h-12 object-contain"
                            src={transition?.from?.logo}
                            alt={transition?.from?.name || "Company logo"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-5 h-5 flex-shrink-0">
                      <IoIosArrowForward className="w-full h-full text-green-500 lg:rotate-0 -rotate-90" />
                    </div>
                    <div className="w-full lg:flex-[0.5] min-h-32 border rounded-xl py-3 px-4 text-center flex flex-col justify-between items-center">
                      <div className="w-full min-h-20">
                        <p className="font-medium text-sm text-neutral-500">
                          To
                        </p>
                        <p className="text-base mt-2 text-neutral-700 font-medium">
                          {transition?.to?.role}
                        </p>
                      </div>
                      <div className="w-full max-w-28 min-h-12 mt-2 flex flex-col justify-center items-center">
                        {transition?.to?.logo && (
                          <Image
                            width={112}
                            height={48}
                            quality={75}
                            className="w-full h-auto max-h-12 object-contain"
                            src={transition?.to?.logo}
                            alt={transition?.to?.name || "Company logo"}
                          />
                        )}
                      </div>
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
  );
};

export default Transition;
