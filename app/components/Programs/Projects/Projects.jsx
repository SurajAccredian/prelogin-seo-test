import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Autoplay, Pagination, Keyboard } from 'swiper/modules';
import SwiperCore from 'swiper'

import 'swiper/swiper-bundle.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import "./Projects.css"
import ProjectModal from '../../Modals/project-modal';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

SwiperCore.use([Navigation, Autoplay, Keyboard])

const Projects = () => {

  const { data } = useSelector(state => state.program)

  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [swiper, setSwiper] = useState(null);
  const [activeProject, setActiveProject] = useState(null)

  useEffect(() => {
    if (swiper) {
      swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
      swiper.el.onmouseout = () => { swiper.autoplay.start(); };
    }
  }, [swiper]);

  const handleProjectOpen = (event, val) => {
    setActiveProject(val)
  }

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);

  return (
    <div id='projects' className='projects second-bg-grad w-full xl:px-12 px-4 py-12 overflow-hidden relative'>
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[85rem]'>
          <div className="w-full flex items-center justify-between">
            <div className='md:text-start text-center'>
              <h4 className="text-base font-medium">Discover our exciting <span className='text-universal'>{data?.short_title}</span> challenges.</h4>
              <h2 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>Explore Innovative <span className='text-universal'>Projects</span> and drive <span className='text-universal'>impactful</span> results</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-[95rem] mx-auto flex justify-center mt-8 relative'>
        <div className="swiper-button-prev custom-prev">
          <IoIosArrowBack className='text-universal' />
        </div>
        <div ref={swiperContainerRef} className='w-full max-w-[85rem] relative'>
          <Swiper
            loop
            keyboard={{
              enabled: true
            }}
            pagination={{
              el: paginationRef.current,
              clickable: true
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: true
            }}
            spaceBetween={30}
            breakpoints={{
              640: {
                width: 640,
                slidesPerView: 1,
              },
              768: {
                width: 768,
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            navigation={{
              nextEl: '.swiper-button-next.custom-next',
              prevEl: '.swiper-button-prev.custom-prev',
            }}
            modules={[Navigation, Pagination]}
            className="mySwiper2"
            onSwiper={setSwiper}
          >
            {data?.projects?.map((val, index) => (
              <SwiperSlide key={index} className='max-w-[30rem] w-full py-2'>
                <div onClick={(e) => handleProjectOpen(e, val)} className=' w-full p-5 bg-white drop-shadow-md border hover:border-universal transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[20rem] rounded-xl'>
                  <div className='w-full'>
                    <div className='w-full flex items-center justify-between'>
                      <div className='w-20 h-20 flex-shrink-0 rounded-md bg-white overflow-hidden'>
                        <img className='w-full h-full object-contain' src={val?.icon} alt={val?.title} />
                      </div>
                    </div>
                    <h4 className='text-neutral-500 mt-2 text-base'>{val?.category}</h4>
                    <h2 className='text-xl font-semibold mt-2'>{val?.title}</h2>
                  </div>
                  <div className='w-full'>
                    <div className='w-full border-b border-neutral-300 my-4' />
                    <div className='w-full'>
                      <h4 className='text-sm font-medium mt-2'>Skill you'll gain : </h4>
                      <div className='w-full flex gap-2 justify-between items-center mt-2'>
                        <div className='flex gap-2 items-center'>
                          <div className='px-4 py-2 rounded-xl bg-neutral-100 border border-neutral-300'>
                            <span className='font-semibold text-xs'>{val?.skills[0]}</span>
                          </div>
                          <div className='w-9 h-9 text-xs font-semibold flex-shrink-0 rounded-full border border-neutral-300 flex items-center justify-center'>
                            +{val?.skills.length - 1}
                          </div>
                        </div>
                        <p className='text-universal text-base'>Read more</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div ref={paginationRef} className="swiper-pagination"></div>
        </div>
        <div className="swiper-button-next custom-next">
          <IoIosArrowForward className='text-universal' />
        </div>
      </div>
      <ProjectModal open={activeProject} setOpen={setActiveProject} />
    </div>
  );
}

export default Projects