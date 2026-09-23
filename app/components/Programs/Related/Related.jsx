import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'

import PROGRAMS from "../../Assets/programs.json"

import "./Related.css"
import { CiViewTimeline } from 'react-icons/ci';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { programActions } from '../../../store/reducers/program';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ProgramCard } from '../../Home/Programs/Programs';

SwiperCore.use([EffectCoverflow, Navigation, Autoplay])


const Related = () => {

  const { data } = useSelector(state => state.program)
  const dispatch = useDispatch()
  const paginationRef = useRef(null);
  const swiperContainerRef = useRef(null);
  const [verticalPrograms, setVerticalPrograms] = useState([])
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiper) {
      swiper.el.onmouseover = () => { swiper.autoplay.stop(); };
      swiper.el.onmouseout = () => { swiper.autoplay.start(); };
    }
  }, [swiper]);

  useEffect(() => {

    const getRelatedPrograms = (programName, category) => {
      if (category) {
        const programs = PROGRAMS.filter(program => program.category.toLocaleLowerCase() === data?.vertical.toLocaleLowerCase());

        let relatedPrograms = programs.filter(p => p.program_name !== programName);
        if (relatedPrograms.length < 3) {
          const mostSellingCourses = PROGRAMS.filter(p => p.status.toLocaleLowerCase() === 'best selling');
          const jobGuaranteeCourses = PROGRAMS.filter(p => p.status.toLocaleLowerCase() === 'job guarantee');
          relatedPrograms = [...mostSellingCourses, ...jobGuaranteeCourses];
        }

        relatedPrograms.sort((a, b) => {
          const durationA = parseInt(a.duration);
          const durationB = parseInt(b.duration);

          return durationB - durationA;
        });

        return relatedPrograms;
      }
      return [];
    }

    setVerticalPrograms(getRelatedPrograms(data?.title, data?.vertical));


  }, [data])

  const handleDownloadBrochure = (program) => {
    console.log(program);
    if (program) {
      dispatch(programActions.setBrochureState(program))
    }
  }

  useEffect(() => {
    if (swiper && swiperContainerRef.current && paginationRef.current) {
      swiperContainerRef.current.appendChild(paginationRef.current);
    }
  }, [swiper]);


  return (
    <div className='related w-full xl:px-12 px-4 py-6 md:py-12'>
      <div className='w-full flex justify-center'>
        <div className='w-full max-w-[85rem] relative'>
          <div className='mt-2 w-full flex items-center'>
            <h2 className='text-xl capitalize font-semibold'>Related Programs</h2>
          </div>
        </div>
      </div>
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
              {verticalPrograms.map((program, index) => (
                <SwiperSlide key={index} className='py-4'>
                  <ProgramCard
                    key={program.id || index}
                    program={program}
                    handleOpen={handleDownloadBrochure}
                  />
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
  )
}

export default Related

