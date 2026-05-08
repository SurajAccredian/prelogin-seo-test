import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";


const universities = [
  {
    name: "IIM Visakhapatnam",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-v.webp",
  },
  {
    name: "SP Jain",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/spjain-logo-new.webp",
  },
  {
    name: "IIT Kanpur",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iitk-logo-615x340.webp",
  },
  {
    name: "IIM Tiruchirappalli",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-V-v2.webp",
  },
  {
    name: "IIM Lucknow",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/IIML-LOGO-v4.webp",
  },
  {
    name: "IIM Amritsar",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iim-amritsar-logo-v2.webp",
  },
  {
    name: "XLRI Delhi | NCR",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/XLRI-v3.webp",
  },
  {
    name: "Department of Entrepreneurship and Management, IIT Hyderabad",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iith-long-logo.webp",
  },
  {
    name: "IIM Ranchi",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/IIM-Ranchi-Logo.png",
  },
  {
    name: "I3C-IIT JAMMU",
    logo: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iim-jammu-logo.webp",
  }
];


function Partnership() {
  const swiperRef = useRef(null);


  return (
    <div className="w-full flex justify-center font-circular mt-16 py-8">
      <div className="w-full max-w-[80rem] h-full flex flex-col gap-8">
        <div className="flex flex-col gap-4 items-center text-center">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="capitalize  ml-6 text-center text-3xl lg:text-[36px] font-medium leading-tight tracking-tight">
              Real-World Learning Powered by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Leading Institutions
              </span>
            </h1>
            <div className="h-1 sm:h-1.5 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto"></div>
          </div>
        </div>


        <div className="relative w-full flex  items-center gap-4">
          {/* Left Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex-shrink-0 text-gray-600 hover:text-blue-600 transition-colors duration-300 p-2"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>


          {/* Swiper Container with Fade Effect */}
          <div className="relative w-full mt-4 overflow-hidden">
            {/* Left Fade Overlay */}
            <div className="hidden md:absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>


            {/* Right Fade Overlay */}
            <div className="hidden md:absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>




            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={40}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 40 },
                768: { slidesPerView: 3, spaceBetween: 50 },
                1024: { slidesPerView: 4, spaceBetween: 50 },
              }}
              className="university-swiper"

              /* 🔥 THE 4 REQUIRED SETTINGS FOR REAL LAZY LOAD */
              watchSlidesProgress={true}
              observer={true}
              observeParents={true}
            >
              {universities.map((university, index) => (
                <SwiperSlide key={index}>
                  <div className="group flex items-center justify-center h-24 cursor-pointer">

                    <img
                      src={university.logo}
                      alt={university.name}
                      loading="lazy"
                      className={`w-full object-contain group-hover:scale-105 transition-all duration-300 ${university.name === "IIM Amritsar" ||
                        university.name === "XLRI Delhi | NCR"
                        ? "h-16"
                        : "h-full"
                        }`}
                      title={university.name}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>


          {/* Right Button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex-shrink-0 text-gray-600 hover:text-blue-600 transition-colors duration-300 p-2"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}


export default Partnership;






