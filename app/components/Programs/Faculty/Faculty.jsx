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
import { useSelector } from "react-redux";

SwiperCore.use([Navigation, Autoplay]);

const Faculty = () => {
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  // useEffect(() => {
  //   if (swiper) {
  //     swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
  //     swiper.el.onmouseout = () => { swiper.autoplay.start(); };
  //   }
  // }, [swiper]);

  const { data } = useSelector((state) => state.program);

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div id="faculty" className="faculty w-full xl:px-12 px-4 py-12 relative">
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[85rem]">
          <div className="w-full flex items-center justify-between">
            <div className="md:text-start text-center">
              <h4 className="text-base font-medium">
                Our Esteemed{" "}
                <span className="text-universal capitalize">
                  {data?.short_title}
                </span>{" "}
                Faculty{" "}
              </h4>
              <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
                Top <span className="text-universal">
                  Faculty
                  {/* {data?.id == 'post-graduate-diploma-in-management-for-working-executives' ? "Academicians" :"Industry Experts"} */}
                  </span> For
                The Guidance & Success
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto flex justify-center items-center mt-8 relative">
        {data?.short_university_name?.toLowerCase() !== "iim-trichy" && (
          <div className="swiper-button-prev custom-prev">
            <IoIosArrowBack className="text-universal" />
          </div>
        )}
        {/* swiper container */}
        <div
          ref={swiperContainerRef}
          className="swiper-container w-full max-w-[85rem]"
        >
          {data?.short_university_name?.toLowerCase() === "iim-trichy" ? (
            <div className="w-full max-w-[85rem] flex flex-wrap justify-center gap-6">
              {data?.faculty?.map((val, index) => (
                <div
                  key={index}
                  className="faculty-bg w-full max-w-xs p-3 bg-white rounded-2xl border"
                >
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
              ))}
            </div>
          ) : (
            <Swiper
              loop
              // autoplay={{
              //   delay: 4000,
              //   disableOnInteraction: false
              // }}
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
              className="mySwiper"
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
              {data?.faculty?.map((val, index) => (
                <SwiperSlide key={index} className="w-full">
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
          )}
          <div ref={paginationRef} className="swiper-pagination"></div>
        </div>
        {data?.short_university_name?.toLowerCase() !== "iim-trichy" && (
          <div className="swiper-button-next custom-next">
            <IoIosArrowForward className="text-universal" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Faculty;
