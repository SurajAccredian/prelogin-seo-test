import "./hero.css";
import React, { useState, useRef, useEffect } from "react";
import Rcta from "../../cta/request_a_call_back";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MoveRight, PhoneCall } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    const lazyBackgrounds = document.querySelectorAll(".lazy-bg");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bg = entry.target.getAttribute("data-bg");
          if (bg) {
            entry.target.style.backgroundImage = `url(${bg})`;
            entry.target.classList.remove("lazy-bg");
            observer.unobserve(entry.target);
          }
        }
      });
    });

    lazyBackgrounds.forEach((bg) => observer.observe(bg));
    return () => observer.disconnect();
  }, []);

  const [cta, setCta] = useState(false);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleClickOpenRcb = () => setCta(true);
  const RcbhandleClose = () => setCta(false);

  const heroSlides = [
    {
      id: 1,
      title: "Elevate your Career with India's top Institutes",
      subtitle:
        "Master in-demand skills with our expert-led courses, certified in partnerships with IIMs, IITs & XLRI.",
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
  ];

  const universityImages = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iimv-logo-v5.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-H.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iit-kanpur-logo-round.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iiml-lucknow-logo-100x100.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iim-amritsar-round-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/xlri-logo.jpg",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/soj-brochure-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iith-short-logo.webp",
  ];

  const duplicatedUniversityImages = [...universityImages, ...universityImages];

  const universityImagesComponent = duplicatedUniversityImages.map(
    (imageUrl, index) => (
      <img
        key={index}
        src={imageUrl}
        alt={`University ${index + 1}`}
        className="university-image shadow-lg p-1"
      />
    )
  );

  return (
    <div className="hero-wrapper">
      <div className="swiper-container">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 4000 }}
          slidesPerView={1}
          speed={800}
          onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
          className="hero-swiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 1, spaceBetween: 0 },
            1024: { slidesPerView: 1, spaceBetween: 0 },
          }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-slide">

                {/* ── MOBILE LAYOUT ── */}
                <div className="mobile-hero-layout">
                  <div
                    className="mobile-hero-image lazy-bg"
                    data-bg={slide.backgroundImage}
                  />

                  <div className="mobile-content-card">
                    <div className="mobile-content-inner">
                      <div className="w-full capitalize flex flex-col gap-1 items-center">
                        <h1 className="hero-title-mobile text-center font-bold leading-tight text-gray-900">
                          {index === 0 ? (
                            <>
                              Level up your career with{" "}
                              <span className="text-blue-600">india's</span>{" "}
                              <span className="text-blue-600">Top Institutes</span>
                            </>
                          ) : (
                            slide.title
                          )}
                        </h1>
                      </div>

                      {index !== 0 ? (
                        <p className="hero-description text-center text-gray-600 font-medium">
                          {slide.subtitle}
                        </p>
                      ) : (
                        <div className="university-container">
                          <div className="university-scroll-wrapper">
                            {universityImagesComponent}
                          </div>
                        </div>
                      )}

                      {slide.bulletPoints.length > 0 && (
                        <div className="w-full flex flex-col gap-3 items-center">
                          {slide.bulletPoints.map((point, idx) => (
                            <div key={idx} className="flex items-center gap-3 w-full">
                              <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 flex items-center justify-center">
                                <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
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

                      {/* Mobile CTA Buttons - classes only, no conflicting Tailwind */}
                      <div className="mobile-buttons-container">
                        <button
                          className="mobile-secondary-button"
                          onClick={() => (window.location.href = "#courses")}
                          title="Explore Programs"
                        >
                          {slide.buttonText}
                          <MoveRight className="inline ml-2 mt-1 w-4 h-4" />
                        </button>
                        <button
                          className="mobile-primary-button"
                          onClick={handleClickOpenRcb}
                          title="Talk to Expert"
                        >
                          Talk to Expert
                          <MoveRight className="inline mb-1 mt-1 ml-2 w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── DESKTOP LAYOUT ── */}
                <div className="desktop-hero-layout">
                  <div
                    className="hero-background-desktop lazy-bg"
                    data-bg={slide.backgroundImage}
                  />

                  <div className="hero-gradient-overlay" />

                  <div className="hero-content-wrapper">
                    <div className="hero-container-responsive font-roboto w-full max-w-[85rem] flex relative md:flex-row flex-col">
                      <div className="hero-content-left flex flex-col gap-4 sm:gap-6 md:items-start items-center w-full md:w-[800px] px-4 sm:px-6 md:px-8 lg:px-10">

                        <div className="w-full flex flex-col gap-1 sm:gap-2 md:items-start items-center">
                          <h1 className="hero-title text-center capitalize mb-0 md:text-start font-bold leading-tight text-gray-900">
                            {index === 0 ? (
                              <>
                                Level up your career with{" "}
                                <span className="text-blue-600">india's</span>{" "}
                                <br />
                                <span className="text-blue-600">Top Institutes</span>
                              </>
                            ) : (
                              slide.title
                            )}
                          </h1>
                        </div>

                        {index !== 0 ? (
                          <p className="hero-description md:text-start w-full md:max-w-lg text-center text-gray-600 font-medium">
                            {slide.subtitle}
                          </p>
                        ) : (
                          <div className="university-container">
                            <div className="university-scroll-wrapper">
                              {universityImagesComponent}
                            </div>
                          </div>
                        )}

                        {/* Desktop CTA Buttons - CSS classes own all styling */}
                        <div className="hero-buttons-container flex flex-col sm:flex-row items-center gap-3 sm:gap-4 md:justify-start justify-center w-full">
                          <button
                            className="hero-primary-button"
                            onClick={() => (window.location.href = "#courses")}
                            title="Explore Programs"
                          >
                            {slide.buttonText}
                            <MoveRight className="inline ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            className="hero-secondary-button"
                            onClick={handleClickOpenRcb}
                            title="Talk to Expert"
                          >
                            Talk to Expert
                            <PhoneCall className="inline mb-1 ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                      </div>
                      <div className="flex-1 hidden lg:block" />
                    </div>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}

          <div
            className="custom-nav-prev desktop-nav"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>

          <div
            className="custom-nav-next desktop-nav"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="nav-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Swiper>
      </div>

      <div className="pagination-container">
        <div className="custom-pagination">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className={`custom-pagination-bullet ${index === activeSlide ? "active" : ""}`}
              onClick={() => swiperRef.current?.swiper.slideTo(index)}
            />
          ))}
        </div>
      </div>

      {cta && <Rcta open={cta} handleClose={RcbhandleClose} />}
    </div>
  );
};

export default Hero;
