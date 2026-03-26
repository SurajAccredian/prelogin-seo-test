import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import mentorOverview from "../../Assets/mentor-overview.json";

const MentorOverview = () => {
  const [activeTab, setActiveTab] = useState(mentorOverview.overview.content[0].title);
  const [points, setPoints] = useState(mentorOverview.overview.content[0].points);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOverviewData = (title) => {
    const selectedTab = mentorOverview.overview.content.find((item) => item.title === title);
    setActiveTab(selectedTab.title);
    setPoints(selectedTab.points);
  };

  const scrollContainer = useRef(null);

  const handlePreviousButt = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 200;
    }
  };

  const handleNextButt = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 200;
    }
  };

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainer.current) {
        setIsScrolled(scrollContainer.current.scrollLeft > 0);
      }
    };

    checkScroll();
    scrollContainer.current.addEventListener('scroll', checkScroll);

    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  return (
    <div id="overview" className="w-full flex justify-center xl:px-12 px-4 py-8 md:py-12  ">
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">
            Discover the Key Differences and Their  <span className="text-universal capitalize">Impact on the Learning Journey</span>
          </h4>
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Understanding The  <span className="text-universal">Roles:</span> Instructor &  Mentor
          </h1>
        </div>
        {/* Side section in rows */}
        <div className="flex gap-4 mt-6 md:mt-12 md:flex-row flex-col">
          <div className="w-full md:flex-[0.3] relative">
            {isScrolled && (
              <button
                onClick={handlePreviousButt}
                className="absolute md:hidden block z-20 left-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1 rotate-180"
              >
                <IoIosArrowForward />
              </button>
            )}
            <div
              ref={scrollContainer}
              className="md:max-w-sm no-scrollbar md:px-4 py-2 flex flex-row md:flex-col items-center gap-4 md:gap-6 max-w-[90vw] overflow-x-auto relative"
            >
              {mentorOverview.overview.content.map((val, index) => (
                <div
                  onClick={() => handleOverviewData(val.title)}
                  key={index}
                  className={`w-full max-w-[280px] rounded-md ${activeTab === val.title ? "drop-shadow-xl bg-white border" : "border border-neutral-300"
                    } px-4 py-4 text-center cursor-pointer`}
                >
                  <h1
                    className={`text-sm max-md:text-nowrap lg:text-lg font-semibold ${activeTab === val.title ? "text-universal" : "text-neutral-500"
                      } capitalize`}
                  >
                    {val.title}
                  </h1>
                </div>
              ))}
            </div>
            <button
              onClick={handleNextButt}
              className="absolute md:hidden block z-20 right-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full md:flex-[0.7] px-4 flex flex-col items-start">
            <div className="w-full md:w-fit grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 max-h-[300px] overflow-y-auto custom-scrollbar">
              {points.map((point, index) => (
                <div key={index} className="w-full max-w-md flex gap-2">
                  <div className="w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]">
                    <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                  </div>
                  <h1 className="text-sm lg:text-lg font-medium capitalize">{point}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorOverview;
