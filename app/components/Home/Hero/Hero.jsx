import "./hero.css";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveRight, PhoneCall } from "lucide-react";
import RctaABTesting from "../../cta/request_a_call_back";
import { BLUR_DATA_URL } from "../../Assets/constants";

const Hero = () => {
  const [cta, setCta] = useState(false);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleClickOpenRcb = () => {
    setCta(true);
  };

  const RcbhandleClose = () => {
    setCta(false);
  };

  const heroSlides = [
    {
      id: 1,
      title: "Elevate your Career with India's top Institutes",
      subtitle:
        " Master in-demand skills with our expert-led courses, certified in partnerships with IIMs, IITs & XLRI.",
      bulletPoints: [],
      buttonText: "Explore Courses",
      backgroundImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/PDF/accredian-hero-section-image-1-v3_1920_x1280_v3.webp",
    },
    {
      id: 2,
      title: "Strategic Skills from Top Industry Experts",
      subtitle:
        "Gain strategic, role-ready expertise and proven tools to secure senior positions.",
      bulletPoints: [],
      buttonText: "Explore Courses",
      backgroundImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/PDF/accredian-hero-section-image-1-v4_1920x1280_v3.webp",
    },
    {
      id: 3,
      title: "Leadership Catalyst for CXOs",
      subtitle:
        "Boardroom-focused modules, live projects, and peer networks that deliver measurable ROI.",
      bulletPoints: [],
      buttonText: "Explore Courses",
      backgroundImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hero-section-image-3-compressed.webp",
    },
    {
      id: 4,
      title: "Master Microsoft Copilot. For Free.",
      subtitle:
        "Automate the busywork with Microsoft Copilot - free to start!",
      bulletPoints: [],
      buttonText: "Explore Course",
      backgroundImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hero-section-image-4-compressed-v3.jpg",
      mobileBackgroundImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hero-section-image-4-compressed-v3-mobile-v2.png",
    },
  ];

  const universityImages = [
    // "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iitg-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iimv-logo-v5.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-H.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iit-kanpur-logo-round-v2.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iiml-lucknow-logo-100x100.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iim-amritsar-round-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/xlri-logo.jpg",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/soj-brochure-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iit-jammu-short-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/IIM-Ranchi-Logo.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iim-kashipur-short-logo.webp"
  ];

  const universityNames = [
    "IIM Visakhapatnam",
    "IIM Tiruchirappalli",
    "IIT Kanpur",
    "IIM Lucknow",
    "IIM Amritsar",
    "XLRI Delhi NCR",
    "SP Jain School of Global Management",
    "IIT Jammu",
    "IIM Ranchi",
    "IIM Kashipur"
  ];

  const duplicatedUniversityImages = [...universityImages, ...universityImages];

  const universityImagesComponent = duplicatedUniversityImages.map(
    (imageUrl, index) => {
      const name = universityNames[index % universityNames.length] || `Partner University ${index + 1}`;
      return (
        <Image
          key={index}
          src={imageUrl}
          alt={`${name} - Accredian Partner Institution`}
          width={70}
          height={70}
          sizes="70px"
          className="university-image shadow-lg p-1"
        />
      );
    }
  );
  return (
    <div className="hero-wrapper">
      <div className="swiper-container">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          loop={true}
          autoplay={{
            delay: 5000,
          }}
          slidesPerView={1}
          speed={800}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="hero-swiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide">
                {/* Mobile Layout */}
                <div className="mobile-hero-layout" aria-hidden="true">
                  {/* Top Image Section */}
                  <div className="mobile-hero-image overflow-hidden relative">
                    <Image
                      src={slide.mobileBackgroundImage || slide.backgroundImage}
                      alt={slide.title}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(max-width: 767px) 100vw, 60vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover"
                    />
                  </div>

                  {/* Overlapping Content Card */}
                  <div className="mobile-content-card">
                    <div className="mobile-content-inner">
                      {/* Main Title */}
                      <div className="w-full capitalize flex flex-col gap-1 items-center">
                        {index === 0 ? (
                          <p className="hero-title-mobile text-center font-bold leading-tight text-gray-900">
                            Level up your career with{" "}
                            <span className="text-blue-600">india's</span>{" "}
                            <span className="text-blue-600">
                              Top Institutes
                            </span>
                          </p>
                        ) : (
                          <h2 className="hero-title-mobile text-center font-bold leading-tight text-gray-900">
                            {slide.title}
                          </h2>
                        )}
                      </div>

                      {/* Description */}
                      {index !== 0 ? (
                        <p className="hero-description md:text-start text-center text-gray-600 font-medium">
                          {slide.subtitle}
                        </p>
                      ) : (
                        <>
                          <div className="university-container">
                            <div className="university-scroll-wrapper">
                              {universityImagesComponent}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Bullet Points */}
                      {slide.bulletPoints.length > 0 && (
                        <div className="w-full flex flex-col gap-3 items-center">
                          {slide.bulletPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 w-full"
                            >
                              <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                                <svg
                                  width="12"
                                  height="9"
                                  viewBox="0 0 12 9"
                                  fill="none"
                                >
                                  <path
                                    d="M1 4.5L4.5 8L11 1.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span className="hero-bullet-mobile font-medium text-gray-800">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Buttons */}
                      <div className="mobile-buttons-container">
                        <button
                          className="mobile-secondary-button"
                          onClick={() => {
                            if (slide.id === 4) {
                              window.location.href = "/free-courses/transform-business-workflows-with-generative-ai";
                            } else {
                              window.location.href = "#courses";
                            }
                          }}
                          title={slide.id === 4 ? "Start Learning Free" : "Explore Programs"}
                        >
                          {slide.buttonText}{" "}
                          <MoveRight className="inline ml-2 mt-1 w-4 h-4" />
                        </button>
                        <button
                          className="mobile-primary-button"
                          onClick={() => {
                            if (slide.id === 4) {
                              window.location.href = "/free-courses/transform-business-workflows-with-generative-ai#curriculum";
                            } else {
                              handleClickOpenRcb();
                            }
                          }}
                          title={slide.id === 4 ? "See What You'll Learn" : "Talk to Expert"}
                        >
                          {slide.id === 4 ? "See What You'll Learn" : "Talk to Expert"}{" "}
                          {slide.id === 4 ? (
                            <MoveRight className="inline mb-1 mt-1 ml-2 w-4 h-4" />
                          ) : (
                            <MoveRight className="inline mb-1 mt-1 ml-2 w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="desktop-hero-layout">
                  {/* Desktop Background Image - Right Side */}
                  <div className="hero-background-desktop overflow-hidden relative">
                    <Image
                      src={slide.backgroundImage}
                      alt={slide.title}
                      fill
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(max-width: 767px) 100vw, 60vw"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      className="object-cover object-left"
                    />
                  </div>

                  {/* Gradient Overlays */}
                  <div className="hero-gradient-overlay" />

                  {/* Content Container */}
                  <div className="hero-content-wrapper">
                    <div className="hero-container-responsive font-roboto w-full max-w-[85rem] flex relative md:flex-row flex-col">
                      <div className="hero-content-left flex flex-col gap-4 sm:gap-6 md:items-start items-center w-full md:w-[800px] px-4 sm:px-6 md:px-8 lg:px-10">
                        {/* Main Title */}
                        <div className="w-full flex flex-col gap-1 sm:gap-2 md:items-start items-center ">
                          {index === 0 ? (
                            <h1 className="hero-title text-center capitalize mb-0 md:text-start font-bold leading-tight text-gray-900">
                              Level up your career with{" "}
                              <span className="text-blue-600">india's</span>{" "}
                              <br />
                              <span className="text-blue-600">
                                Top Institutes
                              </span>
                            </h1>
                          ) : (
                            <h2 className="hero-title text-center capitalize mb-0 md:text-start font-bold leading-tight text-gray-900">
                              {slide.title}
                            </h2>
                          )}
                        </div>

                        {/* Description */}
                        {index !== 0 ? (
                          <p className="hero-description md:text-start w-full md:max-w-lg text-center text-gray-600 font-medium">
                            {slide.subtitle}
                          </p>
                        ) : (
                          <>
                            <div className="university-container">
                              <div className="university-scroll-wrapper">
                                {universityImagesComponent}
                              </div>
                            </div>
                          </>
                        )}
                        {/* Bullet Points */}
                        {/* <div className="w-full flex flex-col gap-2 sm:gap-3 md:items-start items-center">
                          {slide.bulletPoints.map((point, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 sm:gap-3 w-full md:w-auto"
                            >
                              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                                <svg
                                  width="10"
                                  height="8"
                                  viewBox="0 0 12 9"
                                  fill="none"
                                  className="sm:w-3 sm:h-3"
                                >
                                  <path
                                    d="M1 4.5L4.5 8L11 1.5"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span className="hero-bullet-text font-medium text-gray-800">
                                {point}
                              </span>
                            </div>
                          ))}
                        </div> */}

                        {/* CTA Buttons */}
                        <div className="hero-buttons-container flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:justify-start justify-center w-full">
                          <button
                            className="hero-primary-button w-full sm:w-auto text-nowrap font-bold border-2 border-blue-600 rounded-lg text-black transition-all duration-300 shadow-xl hover:shadow-xl transform hover:scale-105"
                            onClick={() => {
                              if (slide.id === 4) {
                                window.location.href = "/free-courses/transform-business-workflows-with-generative-ai";
                              } else {
                                window.location.href = "#courses";
                              }
                            }}
                            title={slide.id === 4 ? "Start Learning Free" : "Explore Programs"}
                          >
                            {slide.buttonText}{" "}
                            <MoveRight className="inline ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            className=" w-full hero-secondary-button sm:w-auto text-nowrap font-bold border-2 border-blue-600 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-all duration-300 shadow-xl hover:shadow-xl transform hover:scale-105"
                            onClick={() => {
                              if (slide.id === 4) {
                                window.location.href = "/free-courses/transform-business-workflows-with-generative-ai#curriculum";
                              } else {
                                handleClickOpenRcb();
                              }
                            }}
                            title={slide.id === 4 ? "See What You'll Learn" : "Talk to Expert"}
                          >
                            {slide.id === 4 ? "See What You'll Learn" : "Talk to Expert"}{" "}
                            {slide.id === 4 ? (
                              <MoveRight className="inline mb-1 ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <PhoneCall className="inline mb-1 ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Right side spacer for desktop */}
                      <div className="flex-1 hidden lg:block"></div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Buttons - Hidden on Mobile */}
          <div
            className="custom-nav-prev desktop-nav"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="nav-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div
            className="custom-nav-next desktop-nav"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="nav-icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>
      </div>

      {/* Pagination positioned below Swiper */}
      <div className="pagination-container">
        <div className="custom-pagination">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className={`custom-pagination-bullet ${index === activeSlide ? "active" : ""
                }`}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
            />
          ))}
        </div>
      </div>

      <RctaABTesting open={cta} handleClose={RcbhandleClose} />
    </div>
  );
};

export default Hero;