"use client"
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { FiTrendingUp } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa6";
import { RiPresentationFill } from "react-icons/ri";
import { FaUniversity } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./USP.css";
import { FolderOpenDot, RadioTower } from "lucide-react";
import { PiPathBold } from "react-icons/pi";

SwiperCore.use([Navigation]);

const USP = () => {
  const uspData = [
    {
      icon: <FaRegAddressCard className="w-full h-full" />,
      title: "Diverse Career Tracks Across High-Growth Verticals",
      description:
        "Choose from a wide range of programs, all tailored for impressive career outcomes.",
    },
    {
      icon: <FiTrendingUp className="w-full h-full" />,
      title: "Accreditation from Leading Institutes and Organizations",
      description:
        "Get certified with credentials backed by recognized top institutions that add weight to your resume globally.",
    },
    {
      icon: <RiPresentationFill className="w-full h-full" />,
      title: "1:1 Career Coaching, Resume Sessions, and Interview Prep",
      description:
        "Personalized career support tailored to your background, industry, and career goals — not one-size-fits-all guidance.",
    },
    {
      icon: <FolderOpenDot className="w-full h-full" />,
      title: "Capstone Projects with Real Business Impact",
      description:
        "Apply your skills to solve real-world problems through guided projects, not just simulations or classroom exercises.",
    },
    {
      icon: <PiPathBold className="w-full h-full" />,
      title: "Dedicated Transition Tracks",
      description:
        "Whether you're shifting into Data Science, Product, or Leadership roles, our transition pathways are tailor-made to get you there.",
    },
    {
      icon: <RadioTower className="w-full h-full" />,
      title: "Live, Interactive Sessions + Lifetime Access",
      description:
        "Engage in live classes with mentors, plus get lifetime access to updated content and recordings.",
    },
  ];

  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div
      id="unique points"
      className="USP second-bg-grad w-full flex justify-center mt-4 mb-20 sm:mb-26 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full text-center">
          <h4 className="text-base font-medium">
            Redefining Professional Education
          </h4>
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Why Learners <span className="text-universal"> Trust </span> Us
          </h1>
        </div>

        {/* ── CHANGED: single relative wrapper that contains both buttons + swiper ── */}
        <div className="USP-slider-wrapper mt-2 md:mt-4 relative w-full max-w-[85rem] mx-auto">

          {/* Prev button — inside the relative wrapper */}
          <div className="swiper-button-prev custom-prev2">
            <IoIosArrowBack className="text-universal" />
          </div>

          {/* Swiper container — padded so slides don't go under buttons */}
          <div
            ref={swiperContainerRef}
            className="swiper-container w-full"
          >
            <Swiper
              modules={[Navigation, Pagination]}
              className="mySwiper3"
              onSwiper={setSwiper}
              spaceBetween={20}
              slidesPerView={1}
              pagination={{
                el: paginationRef.current,
                clickable: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 2 },
              }}
              navigation={{
                nextEl: ".swiper-button-next.custom-next2",
                prevEl: ".swiper-button-prev.custom-prev2",
              }}
            >
              {uspData.map((usp, index) => (
                <SwiperSlide key={index}>
                  <div className="USP-card-bg-image gap-0 md:gap-4 lg:gap-10 flex flex-col md:flex-col lg:flex-row w-full justify-center lg:justify-between py-4 md:py-4 lg:py-6 px-3 md:px-5 rounded-lg items-center text-center drop-shadow-2xl border cursor-context-menu">
                    <div className="w-16 h-16 mt-4 text-blue-600 flex-shrink-0">
                      {usp.icon}
                    </div>
                    <div className="flex flex-col items-start text-center md:text-start">
                      <h1 className="text-lg font-semibold mt-4">
                        {usp.title}
                      </h1>
                      <h4 className="text-neutral-600 font-medium mt-2 text-[15px] max-md:hidden">
                        {usp.description}
                      </h4>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div ref={paginationRef} className="swiper-pagination"></div>
          </div>

          {/* Next button — inside the relative wrapper */}
          <div className="swiper-button-next custom-next2">
            <IoIosArrowForward className="text-universal" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default USP;