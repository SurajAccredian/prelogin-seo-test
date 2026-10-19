import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./Faculty.css";
// import { useSelector } from "react-redux";
import mentorOverview from "../../Assets/mentor-overview.json";

SwiperCore.use([Navigation, Autoplay]);

const FacultyMentor = () => {
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  // useEffect(() => {
  //   if (swiper) {
  //     swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
  //     swiper.el.onmouseout = () => { swiper.autoplay.start(); };
  //   }
  // }, [swiper]);

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div
      id="faculty"
      className="faculty w-full xl:px-12 px-4 py-12 overflow-hidden relative"
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[85rem]">
          <div className="w-full flex items-center justify-between">
            <div className="md:text-start text-center">
              <h4 className="text-base font-medium">
                Our Esteemed{" "}
                <span className="text-universal capitalize">
                  {" "}
                  Team of Experts
                </span>{" "}
              </h4>
              <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
                Shaping The{" "}
                <span className="text-universal">Future Of Education</span> With Innovation
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
            // autoplay={{
            //   delay: 2000,
            //   disableOnInteraction: false
            // }}
            // pagination={{
            //   el: paginationRef.current,
            //   clickable: true,
            // }}
            spaceBetween={20}
            navigation={{
              nextEl: ".swiper-button-next.custom-next",
              prevEl: ".swiper-button-prev.custom-prev",
            }}
            modules={[Navigation]}
            className="mySwiper2"
            onSwiper={setSwiper}
            breakpoints={{
              // when window width is >= 640px
              640: {
                width: 640,
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                width: 768,
                slidesPerView: 2,
              },
              // when window width is >= 1024px
              1024: {
                width: 1024,
                slidesPerView: 3,
              },
              1280: {
                // width: 1480,
                slidesPerView: 4,
              },
            }}
          >
            {mentorOverview?.faculty?.map((val, index) => (
              <SwiperSlide key={index} className="max-w-sm w-full">
                <div className="faculty-bg w-full p-3 bg-white rounded-2xl border cursor-context-menu">
                  <div className="w-full flex items-center gap-3">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg relative z-20">
                      <img
                        className="w-full h-full object-cover object-top"
                        src={val?.image}
                        alt={val?.name}
                      />
                    </div>
                    <div className="flex mt-2 flex-col w-full truncate">
                      <h4
                        title={val?.position}
                        className="text-neutral-500 font-medium text-nowrap text-base truncate"
                      >
                        {val?.position}
                      </h4>
                      <div
                        className="w-12 h-12 flex-shrink-0 mt-2 rounded-lg overflow-hidden"
                        title={val?.organization}
                      >
                        <img
                          className="w-full h-full object-contain"
                          src={val?.organization_image}
                          alt={val?.organization}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* <div ref={paginationRef} className="swiper-pagination"></div> */}
        </div>
        <div className="swiper-button-next custom-next">
          <IoIosArrowForward className="text-universal" />
        </div>
      </div>
    </div>
  );
};

export default FacultyMentor;
