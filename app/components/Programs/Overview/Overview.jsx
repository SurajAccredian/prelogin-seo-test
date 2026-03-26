import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux'



const Overview = () => {


  const { data } = useSelector(state => state.program);


  const [activeTab, setActiveTab] = useState("who should join");
  const [points, setPoints] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);



  const handleOverviewData = (data) => {
    try {
      const { title, points } = data;
      setActiveTab(title);
      setPoints(points);
    } catch (error) {
      console.error("Error handling overview data:", error);
    }
  };


  useEffect(() => {
    try {
      setPoints(data?.overview?.content.find(val => val.title === activeTab));
    } catch (error) {
      console.error("Error setting points:", error);
    }
  }, [data, activeTab]);


  // const handleChange = (title) => {
  //   try {
  //     if (activeTab === title) {
  //       setActiveTab(null);
  //     } else {
  //       setActiveTab(title);
  //     }
  //   } catch (error) {
  //     console.error("Error handling tab change:", error);
  //   }
  // };


  const scrollContainer = useRef(null);


  const handlePreviousButt = () => {
    try {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft -= 200;
      }
    } catch (error) {
      console.error("Error handling previous button:", error);
    }
  };


  const handleNextButt = () => {
    try {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += 200;
      }
    } catch (error) {
      console.error("Error handling next button:", error);
    }
  };


  useEffect(() => {
    const checkScroll = () => {
      try {
        if (scrollContainer.current) {
          setIsScrolled(scrollContainer.current.scrollLeft > 0);
          // setIsEnd(scrollContainer.current.scrollLeft + scrollContainer.current.clientWidth >= scrollContainer.current.scrollWidth);
        }
      } catch (error) {
        console.error("Error checking scroll:", error);
      }
    };


    try {
      checkScroll();
      scrollContainer.current.addEventListener('scroll', checkScroll);
      return () => {
        if (scrollContainer.current) {
          scrollContainer.current.removeEventListener('scroll', checkScroll);
        }
      };
    } catch (error) {
      console.error("Error setting up scroll event listener:", error);
    }
  }, []);


  return (
    <div id="overview" className="w-full flex justify-center xl:px-12 px-4 py-8 md:py-12">
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">Key Features of this <span className='text-universal capitalize'>{data?.short_title}</span> Program</h4>
          <h1 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'>What <span className="text-universal">benefits</span> you'll get with this Program</h1>
        </div>
        {/* side section in rows */}
        <div className="flex gap-4 mt-6 md:mt-12 md:flex-row flex-col">
          <div className="w-full md:flex-[0.3] relative">
            {isScrolled && (
              <button onClick={handlePreviousButt} className='absolute md:hidden block z-20 left-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1 rotate-180'>
                <IoIosArrowForward />
              </button>
            )}
            <div ref={scrollContainer} className="md:max-w-sm no-scrollbar md:px-4 py-2 flex flex-row md:flex-col items-center gap-4 md:gap-6 max-w-[90vw] overflow-x-auto relative">
              {data?.overview && data?.overview.content.map((val, index) => {
                return (
                  <div onClick={() => handleOverviewData(val)} key={index} className={`w-full max-w-[280px] rounded-md ${activeTab === val.title ? "drop-shadow-xl bg-white border" : "border border-neutral-300"} px-4 py-4 text-center cursor-pointer`}>
                    <h1 className={`text-sm max-md:text-nowrap lg:text-lg font-semibold ${activeTab === val.title ? " text-universal" : "text-neutral-500"} capitalize`}>
                      {val.title}
                    </h1>
                  </div>
                )
              })}
            </div>
            <button onClick={handleNextButt} className='absolute md:hidden block z-20 right-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1'>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full md:flex-[0.7] px-4 flex flex-col items-start">
            <div className="w-full md:w-fit grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {points?.points?.flat().map((point, index) => {
                const shouldApplyColon = activeTab === "who should join";

                const parts = shouldApplyColon ? point.split(':') : [];
                const hasColon = shouldApplyColon && parts.length > 1;

                return (
                  <div key={index} className="w-full max-w-md flex gap-2">
                    <div className="w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>

                    <h1 className="text-sm lg:text-lg font-medium capitalize">
                      {hasColon ? (
                        <>
                          <span className="font-semibold">{parts[0]}:</span>
                          <span className="font-normal text-gray-500">
                            {parts.slice(1).join(':')}
                          </span>
                        </>
                      ) : (
                        point
                      )}
                    </h1>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}



export default Overview



// <div className="w-full flex flex-col gap-4 mt-2 overflow-y-auto custom-scrollbar">
// {points?.points?.map((point, index) => (
//   <div key={index} className="w-full max-w-md flex gap-2">
//     <div className='w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]'>
//       <IoMdCheckmarkCircleOutline className='w-full h-full text-green-500' />
//     </div>
//     <h1 className="text-sm lg:text-lg font-medium capitalize">{point}</h1>
//   </div>
// ))}
// </div>
