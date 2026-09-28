// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

import "./verticals.css";
import mentorOverview from "../../Assets/mentor-overview.json";

const MentorVerticals = () => {
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  // const handleClickOpenMentorForm = () => {
  //   window.open(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/Career/mentor/application`,
  //     "_blank"
  //   );
  // };

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <>
      <div
        id="vertical"
        className="vertical w-full xl:px-12 px-4 py-10 mb-[2px] overflow-hidden relative"
      >
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[85rem]">
            <div className="w-full flex items-center justify-between">
              <div className="md:text-start text-center">
                <h4 className="text-base font-medium">
                  Eligibility Requirements Your
                  <span className="text-universal capitalize">
                    {" "}
                    Chosen Field
                  </span>
                </h4>
                <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
                  {/* Lead Innovation in
                  <span className="text-universal"> Key Domains</span>{" "} */}
                  Essential Skills              for
                  <span className="text-universal capitalize">
                    Each Vertical
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[95rem] mx-auto flex justify-center items-center mt-8 relative">
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev custom-prev1">
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
                delay: 3000,
                disableOnInteraction: true,
              }}
              slidesPerView={1}
              spaceBetween={20}
              pagination={true}
              navigation={{
                nextEl: ".swiper-button-next.custom-next1",
                prevEl: ".swiper-button-prev.custom-prev1",
              }}
              modules={[Navigation]}
              className="mySwiper"
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
                1280: {
                  slidesPerView: 2,
                },
              }}
              onSwiper={(swiper) => {
                swiper.el.addEventListener("mouseenter", () => {
                  swiper.autoplay.stop();
                });
                swiper.el.addEventListener("mouseleave", () => {
                  swiper.autoplay.start();
                });
                document.addEventListener("click", (event) => {
                  // console.log(swiper.el);
                  if (!swiper.el.contains(event.target)) {
                    swiper.autoplay.start();
                  }
                });
              }}
            >
              {mentorOverview?.verticals?.map((val, index) => (
                <SwiperSlide key={index} className="md:max-w[900px]  w-full">
                  <div className="vertical-bg p-5 bg-white text-left  border cursor-context-menu">
                    <div className="flex items-center gap-4">
                      <h3
                        title={val?.name}
                        className="text-xl font-bold text-slate-700  text-nowrap truncate"
                      >
                        {val?.name}
                      </h3>
                    </div>
                    {val?.points?.map((point, pointIndex) => (
                      <div
                        key={pointIndex}
                        className="flex items-center gap-2 mt-4 "
                      >
                        <div className="w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]">
                          <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                        </div>
                        <p className="text-sm   lg:text-sm font-medium capitalize">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <div ref={paginationRef} className="swiper-pagination"></div> */}
          </div>
          <div className="swiper-button-next custom-next1">
            <IoIosArrowForward className="text-universal" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button className="w-full text-center max-w-[200px]  mt-4 rounded-lg bg-universal text-white text-base font-semibold flex items-center justify-center gap-1">
          <a
            href="/Career/mentor/application"
            target="_blank"
            className="h-full w-full px-4 py-3"
          >
            Apply Now
          </a>
        </button>
      </div>
    </>
  );
};

export default MentorVerticals;
