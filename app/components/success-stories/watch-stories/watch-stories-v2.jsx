"use client";
import Image from "next/image";
import { Play, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from 'react';
import "./watch-stories-v2.css";
import SUCCESS_STORIES from '../../Assets/watch-success-stories.json';
import WatchSuccessStoriesModal from "../../Modals/watch-success-stories";


const WatchStoriesV2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [video, setVideo] = useState(null);


  useEffect(() => {
    if (!isAutoPlaying) return;


    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
    }, 3000);


    return () => clearInterval(interval);
  }, [isAutoPlaying]);


  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + SUCCESS_STORIES.length) % SUCCESS_STORIES.length);
  };


  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % SUCCESS_STORIES.length);
  };


  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const totalCards = SUCCESS_STORIES.length;
    
    let normalizedDiff = diff;
    if (Math.abs(diff) > totalCards / 2) {
      normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    const isActive = normalizedDiff === 0;
    const absPos = Math.abs(normalizedDiff);
    
    const translateX = normalizedDiff * 360;
    const translateZ = isActive ? 100 : -absPos * 50;
    const rotateY = 0;
    
    const scale = isActive ? 1.05 : Math.max(1.0, 1 - absPos * 0.1);
    const opacity = isActive ? 1 : Math.max(0.8, 1 - absPos * 0.6);
    
    const isVisible = absPos <= 1;


    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: isVisible ? opacity : 0,
      zIndex: isActive ? 10 : 10 - absPos,
      pointerEvents: isVisible ? 'auto' : 'none',
      visibility: isVisible ? 'visible' : 'hidden',
    };
  };


  return (
    <div 
      className="watch-success-stories w-full flex flex-col items-center py-8 xl:px-12 mt-10 px-4 font-circular overflow-hidden"

    >
      <div className='w-full max-w-[85rem]'>
        <h4 className="text-sm text-gray-600 font-medium">
          Meet our <span className='text-blue-600'>Alumni</span>
        </h4>
        <h2 className='text-3xl md:text-4xl mt-2 font-bold'>
          Get to Know Our <span className='text-blue-600'>Successful</span> Graduates
        </h2>
      </div>
      
      {/* 3D Carousel Container */}
      <div className="w-full max-w-[85rem] mt-12 relative">
        {/* Mobile Navigation - Minimal arrows at top corners */}
        {/* <div className="md:hidden flex justify-between items-center mb-4 px-4">
          <button
            className="p-2 transition-all duration-300 hover:scale-125 active:scale-95" 
            onClick={goToPrevious}
            aria-label="Previous story"
          >
            <ArrowLeft className="text-gray-700" size={24} strokeWidth={2} />
          </button>

          <button
            className="p-2 transition-all duration-300 hover:scale-125 active:scale-95" 
            onClick={goToNext}
            aria-label="Next story"
          >
            <ArrowRight className="text-gray-700" size={24} strokeWidth={2} />
          </button>
        </div> */}

        <div 
          className="relative h-[100px] md:h-[420px] flex items-center justify-center"
          style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}

        >
          {/* Cards Container */}
          <div className="relative w-full max-w-[436px] ml-0 md:ml-[50px] h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {SUCCESS_STORIES.map((alumni, index) => (
              <div
                key={index}
                className="absolute cursor-pointer w-full transition-all duration-700"
                onClick={() => setVideo(alumni.videoSrc)} 
                style={{
                  ...getCardStyle(index),
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <div className="card-wrapper rounded-xl border-2 border-gray-200 overflow-hidden shadow-lg bg-white group">
                  {/* Video Section with Play Button */}
                  <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                    {alumni.banner && (
                      <Image 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={alumni.banner} 
                        alt={alumni.name || "Alumni story"}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        quality={75}
                      />
                    )}
  
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
  
                    <div 
                      onClick={() => setVideo(alumni.videoSrc)} 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer z-20 transition-all duration-300"
                    >
                      <div className="play-button-circle w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110">
                        <Play className="w-7 h-7 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Quote Section */}
                  <div className="text-section cursor-auto p-6 space-y-4 bg-white">
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-600/20" />
                      <p className="text-gray-900 font-circular leading-relaxed pl-6 text-sm">
                        "{alumni.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Glow Effect on Active */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-700/5 animate-glow-pulse" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>


          {/* Desktop Navigation Buttons */}
          <button
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-110 hover:border-blue-600" 
            onClick={goToPrevious}
          >
            <ChevronLeft className="text-gray-700" size={24} />
          </button>


          <button
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg items-center justify-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-110 hover:border-blue-600" 
            onClick={goToNext}
          >
            <ChevronRight className="text-gray-700" size={24} />
          </button>
        </div>


        {/* Indicator Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {SUCCESS_STORIES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-600/40'
                  : 'w-2 bg-gray-300 hover:bg-blue-600/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <WatchSuccessStoriesModal open={video} setOpen={setVideo} />
    </div>
  );
}


export default WatchStoriesV2;


// import { IoPlayCircleOutline } from "react-icons/io5";
// import { Swiper, SwiperSlide } from 'swiper/react';

// import 'swiper/css';
// import 'swiper/css/navigation';

// import { Autoplay } from 'swiper/modules';

// import { useEffect, useState } from 'react';
// import "./watch-stories.css";
// import SUCCESS_STORIES from '../../../Assets/constants/watch-success-stories.json';
// import WatchSuccessStoriesModal from "../../Modals/watch-success-stories";

// const WatchStories = () => {
//   const [swiper, setSwiper] = useState(null);
//   const [video, setVideo] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);

//   useEffect(() => {
//     if (swiper) {
//       swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
//       swiper.el.onmouseout = () => { swiper.autoplay.start(); };
//     }
//   }, [swiper]);

//   return (
//     <div className="watch-success-stories w-full flex flex-col items-center py-8 xl:px-12 px-4 font-circular">
//       <div className='w-full max-w-[85rem]'>
//         <h4 className="text-base font-medium">Meet our <span className='text-universal'>Alumni</span></h4>
//         <h1 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>Get to Know Our <span className='text-universal'>Successful</span> Graduates</h1>
//       </div>
      
//       <div className="w-full max-w-[85rem] mt-2 relative">
//         <Swiper
//           grabCursor={true}
//           centeredSlides={true}
//           slidesPerView={3}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true
//           }}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//               spaceBetween: 20
//             },
//             640: {
//               slidesPerView: 1.5,
//               spaceBetween: 20
//             },
//             768: {
//               slidesPerView: 2,
//               spaceBetween: 25
//             },
//             1024: {
//               slidesPerView: 3,
//               spaceBetween: 30
//             }
//           }}
//           modules={[Autoplay]}
//           className="mySwiper3D"
//           onSwiper={setSwiper}
//           onSlideChange={(swiper) => {
//             setActiveIndex(swiper.realIndex);
//           }}
//         >
//           {SUCCESS_STORIES.map((alumni, index) => (
//             <SwiperSlide key={index}>
//               <div className="w-full flex flex-col items-center slide-content">
//                 <div className="rounded-lg bg-white border drop-shadow-sm p-5 w-full transition-all duration-300 card-wrapper">
//                   <div className="w-full rounded-md overflow-hidden relative">
//                     <img className="w-full aspect-video object-cover" src={alumni.banner} alt="certificate" />
//                     <div onClick={() => setVideo(alumni.videoSrc)} className="absolute right-0 left-0 top-0 bottom-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/5 hover:bg-black/10 transition-all">
//                       <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full">
//                         <IoPlayCircleOutline className="w-full h-full text-universal" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Quote text below each card */}
//                 <div className="mt-4 w-full px-2 quote-text">
//                   <p className="text-xs md:text-lg italic text-neutral-700 font-medium text-center">
//                     &#xFF02;{alumni.quote}&#xFF02;
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
        
//         {/* Navigation arrows positioned below side cards */}
//         <div className="hidden md:block absolute left-0 navigation-left" style={{ bottom: '30px', zIndex: 10 }}>
//           <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => swiper?.slidePrev()}>
//             <span className="text-3xl text-universal font-bold">←</span>
//           </div>
//         </div>
        
//         <div className="hidden md:block absolute right-0 navigation-right" style={{ bottom: '30px', zIndex: 10 }}>
//           <div className="cursor-pointer hover:opacity-70 transition-opacity" onClick={() => swiper?.slideNext()}>
//             <span className="text-3xl text-universal font-bold">→</span>
//           </div>
//         </div>
        
//         {/* Mobile navigation - centered below */}
//         <div className="flex md:hidden items-center justify-center gap-6 mt-8 px-4">
//           <div className="cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0" onClick={() => swiper?.slidePrev()}>
//             <span className="text-2xl text-universal font-bold">←</span>
//           </div>
          
//           <div className="cursor-pointer hover:opacity-70 transition-opacity flex-shrink-0" onClick={() => swiper?.slideNext()}>
//             <span className="text-2xl text-universal font-bold">→</span>
//           </div>
//         </div>
//       </div>
      
//       <WatchSuccessStoriesModal open={video} setOpen={setVideo} />
//     </div>
//   );
// }

// export default WatchStories;

