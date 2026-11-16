"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";

import "./Testimonials.css";
import { TESTIMONIALS } from "../../../Assets/constants";

SwiperCore.use([Navigation, Autoplay]);

const Testimonials = () => {
  return (
    <div className="testimonials w-full py-8 relative font-circular flex justify-center overflow-hidden">
      <div className="absolute text-center mt-2 w-full max-w-[85rem] 2xl:px-0 px-4">
        <h4 className="text-base font-medium">
          Success Stories That Speak Volumes
        </h4>
        <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
          From <span className="text-universal"> Learners </span> to{" "}
          <span className="text-universal"> Leaders </span>
        </h2>
      </div>
      <div className="w-full max-w-[86rem] flex justify-center lg:justify-normal">
        <div className="w-full max-w-[90vw] lg:max-w-[60rem] xl:max-w-[78rem]">
          <Swiper
            loop
            autoplay={{
              delay: 4000,
            }}
            spaceBetween={30}
            // slidesPerView={3}
            breakpoints={{
              1280: {
                preventInteractionOnTransition: true,
                watchSlidesProgress: true,
                slidesPerView: "3.1",
                shortSwipes: false,
              },
              768: {
                spaceBetween: 20,
                watchSlidesProgress: true,
                slidesPerView: "2.1",
                shortSwipes: false,
              },
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
                watchSlidesProgress: true,
                shortSwipes: false,
              },
            }}
            // slidesPerGroup={1}
            navigation
            // grabCursor
            modules={[Navigation, Pagination]}
            className="mySwiper2"
          >
            {TESTIMONIALS.map((val, index) => (
              <SwiperSlide key={index} className="mt-28 pb-6">
                <div className="max-w-[420px] w-full bg-white min-h-[380px] md:min-h-[440px] lg:min-h-[360px] px-12 py-8 rounded-xl drop-shadow font-dmSans flex flex-col justify-between">
                  <div className="w-full">
                    <div className="w-full">
                      <div className="max-w-[100px] h-12 w-full">
                        {val.company_logo && (
                          <Image
                            width={100}
                            height={48}
                            quality={75}
                            className="w-full h-full object-contain"
                            src={val.company_logo}
                            alt={val.name || "Company logo"}
                          />
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-neutral-500 text-base font-extralight">
                        {val.review}
                        <span>”</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-universal/15 overflow-hidden flex-shrink-0">
                      {val.photo_url && (
                        <Image
                          width={48}
                          height={48}
                          quality={75}
                          className="w-full h-full object-cover"
                          src={val.photo_url}
                          alt={val.name || "Alumni photo"}
                        />
                      )}
                    </div>
                    <div className="">
                      <p className="text-lg font-medium">{val.name}</p>
                      <h4 className="font-extralight text-neutral-500">
                        {val.designation}
                      </h4>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
