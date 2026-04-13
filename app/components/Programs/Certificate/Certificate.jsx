import { useSelector } from "react-redux";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import React, { useEffect, useRef, useState } from "react";
import CertificateModal from "../../Modals/certificate-modal";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "./certificate.css";
SwiperCore.use([Navigation, Autoplay]);
const Certificate = () => {
  const { data } = useSelector((state) => state.program);
  const [isOpen, setIsCertificateModalOpen] = useState(false);
  const [isShowLarge, setIsShowLarge] = useState(null);
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const handleClose = () => {
    setIsCertificateModalOpen(false);
    // setIsShowLarge(null);
  };
  const handleCertificateClick = (url) => {
    if (url) {
      setIsCertificateModalOpen(true);
      setIsShowLarge(url);
    }
  };

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div
      id="certificate"
      className="w-full certificate flex justify-center py-8 md:py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem] rounded-md">
        <div className="w-full text-center">
          <h4 className="text-base font-medium">
            Get certified in{" "}
            <span className="text-universal">{data?.short_title}</span> Program
          </h4>
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Earn A Recognized{" "}
            <span className="text-universal">{data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "Diploma" : "Certification"}</span> to Boost your
            Career
          </h1>
        </div>
        {Array.isArray(data?.certificate) ? (
          <>
            <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-14 mt-6 md:mt-12 rounded-lg relative overflow-hidden">
              <div className="relative w-full lg:w-[45%]">
                <div className="swiper-button-prev custom-prev-certificate">
                  <IoIosArrowBack className="text-universal" />
                </div>
                <div className="w-[100%] mb-2 lg:mb-8">
                  <Swiper
                    slidesPerView={1}
                    pagination={{
                      el: paginationRef.current,
                      clickable: true,
                    }}
                    spaceBetween={30}
                    navigation={{
                      nextEl: ".swiper-button-next.custom-next-certificate",
                      prevEl: ".swiper-button-prev.custom-prev-certificate",
                    }}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                    onSwiper={setSwiper}
                  >
                    {data?.certificate?.map((val, index) => {
                      console.log(val);
                      return (
                        <SwiperSlide key={index} className="w-full">
                          <div
                            onClick={() => handleCertificateClick(val)}
                            className={`certificate-image w-full rounded-lg bg-white border drop-shadow-xl p-5 cursor-pointer transition-all duration-300 ${data?.id ===
                              "iith-professional-certificate-program-in-strategic-project-management" || data?.id === 'iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership' || data?.id === "iima-senior-management-program"
                              ? "max-w-sm mx-auto"
                              : ""
                              }`}
                          >
                            <img
                              className={`w-full ${data?.id ===
                                "iith-professional-certificate-program-in-strategic-project-management" || data?.id === 'iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership' || data?.id === "iima-senior-management-program"
                                ? "max-h-[400px] md:max-h-[500px] object-contain"
                                : ""
                                }`}
                              src={val}
                              alt="certificate"
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div ref={paginationRef} className="swiper-pagination "></div>
                </div>

                <div className="swiper-button-next custom-next-certificate">
                  <IoIosArrowForward className="text-universal" />
                </div>
              </div>
              <div className="px-4 max-w-3xl lg:max-w-2xl w-full md:text-start text-center">
                <h1 className="text-lg md:text-2xl font-semibold text-neutral-800">
                  Share your{" "}
                  <span className="text-universal">Achievements</span> and
                  Unlock New Opportunities
                </h1>
                <div className="flex flex-col max-md:items-center gap-4 md:gap-8 mt-4 md:mt-6">
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Worldwide Recognition
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Acquire a globally recognized {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"}, opening
                        doors to opportunities worldwide.
                      </h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Top College Endorsement
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Earn a prestigious {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"} from a top-tier
                        college, validating your expertise.
                      </h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Lifetime Validity Assurance
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Enjoy the assurance of lifetime validity with your
                        esteemed college {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"}, ensuring your
                        achievements stand the test of time.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-14 mt-6 md:mt-12 rounded-lg relative overflow-hidden">
              <div
                onClick={() => handleCertificateClick(data?.certificate)}
                className={`certificate-image max-w-3xl w-full rounded-lg bg-white border drop-shadow-xl p-5 cursor-pointer transition-all duration-300 ${data?.id ===
                  "iith-professional-certificate-program-in-strategic-project-management" || data?.id === "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership" || data?.id === "iima-senior-management-program"
                  ? "lg:max-w-sm"
                  : "lg:max-w-xl"
                  }`}
              >
                <img
                  className={`w-full ${data?.id ===
                    "iith-professional-certificate-program-in-strategic-project-management" || data?.id === "iith-executive-program-in-design-thinking-and-innovation-for-strategic-leadership" || data?.id === "iima-senior-management-program"
                    ? "max-h-[400px] md:max-h-[500px] object-contain"
                    : ""
                    }`}
                  src={data?.certificate}
                  alt="certificate"
                />
              </div>
              <div className="px-4 max-w-3xl lg:max-w-2xl w-full md:text-start text-center">
                <h1 className="text-lg md:text-2xl font-semibold text-neutral-800">
                  Share your{" "}
                  <span className="text-universal">Achievements</span> and
                  Unlock New Opportunities
                </h1>
                <div className="flex flex-col max-md:items-center gap-4 md:gap-8 mt-4 md:mt-6">
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Worldwide Recognition
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Acquire a globally recognized {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"}, opening
                        doors to opportunities worldwide.
                      </h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Top College Endorsement
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Earn a prestigious {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"} from a top-tier
                        college, validating your expertise.
                      </h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <div className="">
                      <h1 className="text-base md:text-xl font-semibold text-neutral-800">
                        Lifetime Validity Assurance
                      </h1>
                      <h4 className="text-sm md:text-lg mt-2 text-neutral-700 max-md:hidden">
                        Enjoy the assurance of lifetime validity with your
                        esteemed college {data?.id === "post-graduate-diploma-in-management-for-working-executives" ? "diploma" : "certification"}, ensuring your
                        achievements stand the test of time.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <CertificateModal
        open={isOpen}
        showImage={isShowLarge}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Certificate;
