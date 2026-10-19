"use client"
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'

import { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import "./alumines.css"
import SUCCESS_STORIES from '../../Assets/success-stories.json';
import Alumni from './alumni';

SwiperCore.use([EffectCoverflow, Navigation, Autoplay])

const Alumines = () => {

  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);

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
    <div className="success-stories w-full flex justify-center font-circular xl:px-12 px-4 py-16">
      <div className="w-full max-w-[85rem]">
        <div className='w-full'>
          <h4 className="text-base font-medium"><span className='text-universal'>Success</span> Stories from Our Graduates</h4>
          <h2 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>Alumni <span className='text-universal'>Testimonials</span></h2>
        </div>
        <div className="w-full">
          <div className='w-full flex justify-center'>
            <div className='w-full max-w-[85rem] flex justify-center gap-2 relative'>
              <div className="swiper-button-prev custom-prev">
                <IoIosArrowBack className='text-universal' />
              </div>
              <div className='w-full max-w-6xl'>
                <Swiper
                  loop
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
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {SUCCESS_STORIES.map((alumni, index) => (
                    <SwiperSlide key={index} className='py-4'>
                      <Alumni alumni={alumni} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div ref={paginationRef} className="swiper-pagination"></div>
              </div>
              <div className="swiper-button-next custom-next">
                <IoIosArrowForward className='text-universal' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alumines;