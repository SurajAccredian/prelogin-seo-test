import { useEffect, useRef, useState } from 'react'
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useSelector } from 'react-redux'

const EXTRA_POINTS_CONTENT = [
  {
    "title": "Technical Support",
    "points": [
      "<bold>Dedicated technical assistance</bold> to ensure uninterrupted learning and smooth project execution.",
      "<bold>Expert-led troubleshooting and guidance</bold> for resolving technical issues and navigating complex challenges.",
      "<bold>Self-serve support resources</bold> including FAQs, step-by-step guides, and interactive support sessions."
    ]
  },
  {
    "title": "Industry Immersions",
    "points": [
      "<bold>Participate in expert-led sessions</bold> by global industry leaders sharing real-world strategies and experiences.",
      "<bold>Gain actionable insights from speaker sessions</bold> to strengthen decision-making and industry readiness.",
      "<bold>Stay updated with emerging industry trends</bold> to remain relevant and future-ready.",
      "<bold>Experience meaningful industry immersion</bold> to prepare for real-world challenges and opportunities."
    ]
  },
  {
    "title": "Placement Assistance",
    "points": [
      "<bold>Structured career support by Accredian Career Launchpad</bold> to guide learners toward relevant job opportunities.",
      "<bold>Resume-building sessions</bold> focused on highlighting impact, skills, and role-specific experience.",
      "<bold>LinkedIn profile optimization</bold> designed to improve recruiter discovery and professional visibility.",
      "<bold>Interview preparation support</bold> with mock interviews, role-play scenarios, and proven response frameworks."
    ]
  },
  {
    "title": "Learning Hub",
    "points": [
      "<bold>Centralized access to a rich learning ecosystem</bold> including content, tools, and community support.",
      "<bold>Regularly updated learning resources</bold> such as study materials, research papers, and industry tools.",
      "<bold>Diverse learning formats</bold> including tutorials, webinars, and real-world case studies.",
      "<bold>Collaborative learning environment</bold> connecting peers, faculty, and alumni for ongoing engagement."
    ]
  }
]

const ExtraPoints = () => {

  const { data } = useSelector(state => state.program)
  const [activeTab, setActiveTab] = useState("Technical Support")
  const [points, setPoints] = useState([])
  const [isScrolled, setIsScrolled] = useState(false);

  const handleOverviewData = (data) => {
    const { title, points } = data
    setActiveTab(title)
    setPoints(points)
  }

  useEffect(() => {
    setPoints(EXTRA_POINTS_CONTENT[0].points)
  }, [])

  const scrollContainer = useRef(null);

  const handlePreviousButt = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 200;
    }
  }

  const handleNextButt = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 200;
    }
  }

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainer.current) {
        setIsScrolled(scrollContainer.current.scrollLeft > 0);
        // setIsEnd(scrollContainer.current.scrollLeft + scrollContainer.current.clientWidth >= scrollContainer.current.scrollWidth);
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

  const parseTextWithBold = (text) => {
    const parts = text.split(/(<bold>.*?<\/bold>)/g);

    return parts.map((part, index) => {
      if (part.startsWith('<bold>') && part.endsWith('</bold>')) {
        const boldText = part.replace(/<\/?bold>/g, '');
        return <strong key={index} className="font-semibold text-gray-900">{boldText}</strong>;
      }
      return <span key={index} className="text-gray-500 font-normal">{part}</span>;
    });
  };



  return (
    <div id="extra achievements" className="w-full flex justify-center xl:px-12 px-4 py-12">
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">What added benefits does this program offer?</h4>
          <h1 className='text-2xl md:text-3xl mt-2 font-semibold capitalize'><span className='text-universal'>Additional</span> Program Resources</h1>
        </div>
        <div className="flex gap-4 mt-8 md:mt-12 md:flex-row flex-col">
          <div className="w-full md:flex-[0.3] relative">
            {/* previous */}
            {isScrolled && (
              <button onClick={handlePreviousButt} className='absolute md:hidden block z-20 left-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1 rotate-180'>
                <IoIosArrowForward />
              </button>
            )}
            <div ref={scrollContainer} className="no-scrollbar md:max-w-sm md:px-4 py-2 flex flex-row md:flex-col items-center gap-4 md:gap-6 max-w-[90vw] overflow-x-auto">
              {/* {data?.extra_points && data?.extra_points.content.map((val, index) => {
                return (
                  <div onClick={() => handleOverviewData(val)} key={index} className={`w-full max-w-[280px] rounded-md ${activeTab === val.title ? "drop-shadow-xl bg-white border" : "border border-neutral-300"} px-4 py-4 text-center cursor-pointer`}>
                    <h1 className={`text-sm max-md:text-nowrap lg:text-lg font-semibold ${activeTab === val.title ? " text-universal" : "text-neutral-500"} capitalize`}>
                      {val.title}
                    </h1>
                  </div>
                )
              })} */}
              {data?.extra_points && EXTRA_POINTS_CONTENT?.map((val, index) => {
                const section = Array.isArray(data?.extra_points) && data?.extra_points?.includes(val.title);
                if (!section) return null
                return (
                  <div
                    onClick={() => handleOverviewData(val)}
                    key={index}
                    className={`w-full max-w-[280px] rounded-md ${activeTab === val.title ? "drop-shadow-xl bg-white border" : "border border-neutral-300"} px-4 py-3 lg:py-4 text-center cursor-pointer`}
                  >
                    <h1 className={`text-xs max-md:text-nowrap lg:text-lg font-semibold ${activeTab === val.title ? " text-universal" : "text-neutral-500"} capitalize`}>
                      {val.title}
                    </h1>
                  </div>
                );
              })}
            </div>
            {/* next */}
            <button onClick={handleNextButt} className='absolute md:hidden block z-20 right-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1'>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full md:flex-[0.7] px-4 flex flex-col items-start">
            <div className="w-full md:w-fit flex flex-col gap-4 mt-2">
              {points?.map((point, index) => (
                <div key={index} className="w-full flex gap-2 max-w-3xl">
                  <div className='w-5 lg:w-6 h-5 lg:h-6 flex-shrink-0 mt-[2px]'>
                    <IoMdCheckmarkCircleOutline className='w-full h-full text-green-500' />
                  </div>
                  <h1 className="text-sm lg:text-lg font-medium">
                    {parseTextWithBold(point)}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExtraPoints