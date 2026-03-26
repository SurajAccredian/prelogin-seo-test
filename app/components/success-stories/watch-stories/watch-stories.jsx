"use client";
import { IoPlayCircleOutline } from "react-icons/io5";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'

import { useEffect, useRef, useState } from 'react';
import "./watch-stories.css"
import SUCCESS_STORIES from "../../Assets/success-stories.json";
import WatchSuccessStoriesModal from "../../Modals/watch-success-stories";
import { IoIosArrowBack } from "react-icons/io";

SwiperCore.use([EffectCoverflow, Navigation, Autoplay])

const WatchStories = () => {

  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [video, setVideo] = useState(null)

  useEffect(() => {
    if (swiper) {
      swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
      swiper.el.onmouseout = () => { swiper.autoplay.start(); };
    }
  }, [swiper]);


  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div className="watch-success-stories w-full flex flex-col items-center py-8 xl:px-12 px-4 font-circular">
      <div className='w-full max-w-[85rem]'>
        <h4 className="text-base font-medium">Meet our <span className='text-universal'>Alumni</span></h4>
        <h1 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>Get to Know Our <span className='text-universal'>Successful</span> Graduates</h1>
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <div className="relative hidden md:flex gap-2 items-center cursor-pointer" onClick={() => swiper.slidePrev()}>
          <div className="w-5 h-5 flex-shrink-0">
            <IoIosArrowBack className='text-universal w-full h-full' />
          </div>
        </div>
        <div className="w-full max-w-[85rem] mt-6">
          <Swiper
            loop
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true
            }}
            spaceBetween={30}
            navigation={{
              nextEl: '.swiper-button-next.custom-next',
              prevEl: '.swiper-button-prev.custom-prev',
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper2 py-2"
            onSwiper={setSwiper}
          >
            {SUCCESS_STORIES.map((alumni, index) => (
              <SwiperSlide key={index} className=''>
                <div className="w-full flex lg:flex-row flex-col gap-5">
                  <div className="rounded-lg bg-white border drop-shadow-sm p-5 cursor-pointer max-w-3xl w-full lg:max-w-xl">
                    <div className="w-full rounded-md overflow-hidden relative">
                      <img className="w-full" src={alumni.banner} alt="certificate" />
                      <div onClick={() => setVideo(alumni.videoSrc)} className="absolute right-0 left-0 top-0 bottom-0 z-10 flex flex-col items-center justify-center cursor-pointer bg-black/5">
                        <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full">
                          <IoPlayCircleOutline className="w-full h-full text-universal" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 px-4 max-w-3xl lg:max-w-2xl w-full md:text-start flex flex-col items-center justify-between text-center">
                    <div className="w-full text-center">
                      <h1 className="mt-4 text-lg md:text-3xl font-semibold text-neutral-800">Watch success story of <span className="text-universal capitalize">{alumni.name}</span></h1>
                      <h4 className="text-sm md:text-2xl font-semibold mt-12 text-neutral-700">&#xFF02;{alumni.quote}&#xFF02;</h4>
                      <a target="_blank" rel="noreferrer" href={alumni.link}>
                        <button className="mt-12 px-4 py-2 rounded-lg border bg-white text-universal font-semibold hover:bg-blue-100">
                          Read full story here
                        </button>
                      </a>
                    </div>
                    <div className="mt-4 border-b mx-auto px-8">
                      <h1 className="opacity-0 text-nowrap">Read full story here</h1>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="relative hidden md:flex items-center gap-2 justify-end cursor-pointer" onClick={() => swiper.slideNext()}>
          <div className="w-5 h-5 flex-shrink-0">
            <IoIosArrowBack className='text-universal rotate-180 w-full h-full' />
          </div>
        </div>
      </div>
      <div className="w-full relative h-8">
        <div ref={paginationRef} className="swiper-pagination"></div>
      </div>
      <WatchSuccessStoriesModal open={video} setOpen={setVideo} />
    </div>
  );
}

export default WatchStories;
