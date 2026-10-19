import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navigation,
} from "swiper/modules";

import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";

import "./verticalsList.css";
import mentorOverview from "../../Assets/mentor-overview.json";
function MentorverticalListsList() {
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
        id="verticalList"
        className="verticalList w-full xl:px-12 px-4 py-10 mb-[2px] overflow-hidden relative"
      >
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[85rem]">
            <div className="w-full flex items-center justify-between">
              <div className="md:text-start text-center">
                <h4 className="text-base font-medium">
                  Explore Our
                  <span className="text-universal capitalize"> Verticals</span>
                </h4>
                <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
                  {/* Lead Innovation in
                    <span className="text-universal"> Key Domains</span>{" "} */}
                  A Diverse Range of
                  <span className="text-universal capitalize">
                    {" "}
                    Expertise
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[95rem] mx-auto flex justify-center items-center mt-8 relative">
          {/* Custom Navigation Buttons */}
          <div className="swiper-button-prev custom-prev2">
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
              slidesPerView={5}
              spaceBetween={20}
              pagination={true}
              navigation={{
                nextEl: ".swiper-button-next.custom-next2",
                prevEl: ".swiper-button-prev.custom-prev2",
              }}
              modules={[Navigation]}
              className="mySwiper3"
              breakpoints={{
                100: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
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
              {mentorOverview?.allVerticals?.map((val, index) => (
                <SwiperSlide key={index} className=" w-full">
                  <div className="verticalList-bg p-5 bg-white text-left flex justify-center  border rounded-lg cursor-context-menu drop-shadow mb-4 mt-4">
                    <div className="flex justify-center items-center gap-4 flex-col">
                      <img
                        src={val.image}
                        className="verticalListImage"
                        alt={val?.name}
                      />
                      <h3
                        title={val?.name}
                        className="text-md text-center font-bold text-slate-700 max-w-[280px] whitespace-normal break-words "
                      >
                        {val?.name}
                      </h3>
                    </div>
                    {/* {val?.points?.map((point, pointIndex) => (
                      <div
                        key={pointIndex}
                        className="flex items-center gap-2 mt-4 "
                      >
                        <div className="w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]">
                          <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                        </div>
                        <h1 className="text-sm   lg:text-sm font-medium capitalize">
                          {point}
                        </h1>
                      </div>
                    ))} */}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* <div ref={paginationRef} className="swiper-pagination"></div> */}
          </div>
          <div className="swiper-button-next custom-next2">
            <IoIosArrowForward className="text-universal" />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button className="w-full text-center max-w-[200px]  mt-4 rounded-lg bg-universal text-white text-base font-semibold flex items-center justify-center gap-1">
          <a
            href="/career/mentor/application"
            target="_blank"
            className="h-full w-full px-4 py-3"
          >
            Apply Now
          </a>
        </button>
      </div>
    </>
  );
}

export default MentorverticalListsList;

// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import {
//   Navigation,
//   Pagination,
//   Mousewheel,
//   Keyboard,
//   Autoplay,
// } from "swiper/modules";

// import { useEffect, useRef, useState } from "react";
// import {
//   IoIosArrowForward,
//   IoIosArrowBack,
//   IoMdCheckmarkCircleOutline,
// } from "react-icons/io";

// import "./verticalsList.css";
// import mentorOverview from "../../../Assets/constants/mentor-overview.json";
// function MentorverticalListsList() {
//   const paginationRef = useRef(null);
//   const swiperContainerRef = useRef(null);
//   const [swiper, setSwiper] = useState(null);

//   // const handleClickOpenMentorForm = () => {
//   //   window.open(
//   //     `${process.env.NEXT_PUBLIC_BASE_URL}/Career/mentor/application`,
//   //     "_blank"
//   //   );
//   // };

//   useEffect(() => {
//     if (swiper && swiperContainerRef.current && paginationRef.current) {
//       swiperContainerRef.current.appendChild(paginationRef.current);
//     }
//   }, [swiper]);

//   return (
//     <>
//       <div
//         id="verticalList"
//         className="verticalList w-full xl:px-12 px-4 py-10 mb-[2px] overflow-hidden relative"
//       >
//         <div className="w-full flex justify-center">
//           <div className="w-full max-w-[85rem]">
//             <div className="w-full flex items-center justify-between">
//               <div className="md:text-start text-center">
//                 <h4 className="text-base font-medium">
//                   Teach in Your{" "}
//                   <span className="text-universal capitalize"> Specialty</span>
//                 </h4>
//                 <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
//                   {/* Lead Innovation in
//                     <span className="text-universal"> Key Domains</span>{" "} */}
//                   Empower Learners
//                   <span className="text-universal capitalize">
//                     {" "}
//                     Across Our vertical
//                   </span>
//                 </h1>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-[95rem] mx-auto flex justify-center items-center mt-8 relative">
//           {/* Custom Navigation Buttons */}
//           <div className="swiper-button-prev custom-prev">
//             <IoIosArrowBack className="text-universal" />
//           </div>

//           {/* swiper container */}
//           <div
//             ref={swiperContainerRef}
//             className="swiper-container w-full max-w-[85rem]"
//           >
//             <Swiper
//               loop
//               autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: true,
//               }}
//               slidesPerView={5}
//               spaceBetween={20}
//               pagination={true}
//               navigation={{
//                 nextEl: ".swiper-button-next.custom-next",
//                 prevEl: ".swiper-button-prev.custom-prev",
//               }}
//               modules={[Navigation]}
//               className="mySwiper3"
//               breakpoints={{
//                 100: {
//                     slidesPerView: 2,
//                   },
//                 640: {
//                   slidesPerView: 3,
//                 },
//                 768: {
//                   slidesPerView: 3,
//                 },
//                 1024: {
//                   slidesPerView: 4,
//                 },
//                 1280: {
//                   slidesPerView: 4,
//                 },
//               }}
//               onSwiper={(swiper) => {
//                 swiper.el.addEventListener("mouseenter", () => {
//                   swiper.autoplay.stop();
//                 });
//                 swiper.el.addEventListener("mouseleave", () => {
//                   swiper.autoplay.start();
//                 });
//                 document.addEventListener("click", (event) => {
//                   // console.log(swiper.el);
//                   if (!swiper.el.contains(event.target)) {
//                     swiper.autoplay.start();
//                   }
//                 });
//               }}
//             >
//               {mentorOverview?.allVerticals?.map((val, index) => (
//                 <SwiperSlide key={index} className=" w-full">
//                   <div className="verticalList-bg p-5 bg-white text-left flex justify-start  border cursor-context-menu drop-shadow-lg mb-4 mt-4">
//                     <div className="flex justify-between items-center gap-4">
//                       <img src={val.image} className="verticalListImage" alt="" />
//                       <h1
//                         title={val?.name}
//                           className="text-md text-center font-bold text-slate-700 max-w-[280px] whitespace-normal break-words "
//                       >
//                         {val?.name}
//                       </h1>
//                     </div>
//                     {/* {val?.points?.map((point, pointIndex) => (
//                       <div
//                         key={pointIndex}
//                         className="flex items-center gap-2 mt-4 "
//                       >
//                         <div className="w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]">
//                           <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
//                         </div>
//                         <h1 className="text-sm   lg:text-sm font-medium capitalize">
//                           {point}
//                         </h1>
//                       </div>
//                     ))} */}
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             {/* <div ref={paginationRef} className="swiper-pagination"></div> */}
//           </div>
//           <div className="swiper-button-next custom-next">
//             <IoIosArrowForward className="text-universal" />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center mb-5">
//         <button className="w-full text-center max-w-[200px]  mt-4 rounded-lg bg-universal text-white text-base font-semibold flex items-center justify-center gap-1">
//           <a
//             href="/Career/mentor/application"
//             target="_blank"
//             className="h-full w-full px-4 py-3"
//           >
//             Apply Now
//           </a>
//         </button>
//       </div>
//     </>
//   );
// }

// export default MentorverticalListsList;
