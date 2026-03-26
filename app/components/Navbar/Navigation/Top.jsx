"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { programActions } from "../../../store/reducers/program";
import { useDispatch } from "react-redux";
import { allowedIds } from "../../Assets/constants";

const NavigationTop = ({ show, data, setCurrentSection, currentSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const scrollContainer = useRef(null);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainer.current) {
        setIsScrolled(scrollContainer.current.scrollLeft > 0);
        // setIsEnd(scrollContainer.current.scrollLeft + scrollContainer.current.clientWidth >= scrollContainer.current.scrollWidth);
      }
    };

    checkScroll();
    scrollContainer.current.addEventListener("scroll", checkScroll);

    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const handleClick = (event, section) => {
    // event.preventDefault();
    setCurrentSection(section);
  };

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

  const handleDownloadBrochure = () => {
    if (data) {
      dispatch(programActions.setBrochureState(data));
    }
  };


  return (
    <div
      className={`w-full px-4 flex justify-center fixed transition-all ease-in-out duration-700 drop-shadow-md z-[100] ${show ? "top-0" : "top-[-100%]"
        } bg-white font-circular`}
    >
      <div className="nav-main-inner w-full max-w-[85rem]  flex items-center justify-between relative gap-2">
        <div className="flex-[0.1] hidden md:flex items-center">
          <Link href="/" style={{ textDecoration: "none" }}>
            <div className="max-w-[125px] min-w-[100px] w-full">
              <img
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                alt="Accredian logo"
                width="358"
                height="105"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </Link>
        </div>
        {isScrolled && (
          <button
            onClick={handlePreviousButt}
            className="drop-shadow-lg border bg-white rounded-full p-1 rotate-180 pointer-events-auto"
          >
            <IoIosArrowForward />
          </button>
        )}
        <div
          ref={scrollContainer}
          className="nav-main-inner-mid no-scrollbar flex-1 md:flex-[0.8] overflow-x-auto relative"
        >
          <div className={`w-full flex`}>
            {data?.sections.map((section, index) => (
              <a
                href={`#${section}`}
                onClick={(e) => handleClick(e, section)}
                key={index}
              >
                <div
                  className={`px-4 py-4 flex-shrink-0 cursor-pointer border-b-[3px] ${currentSection === section
                    ? "border-universal bg-universal/5"
                    : "border-white"
                    }`}
                >
                  <h1
                    className={`text-nowrap capitalize font-medium text-sm md:text-base ${currentSection === section
                      ? "text-universal"
                      : "text-black"
                      }`}
                  >
                    {section}
                  </h1>
                </div>
              </a>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextButt}
          className="drop-shadow-lg border bg-white rounded-full p-1 pointer-events-auto"
        >
          <IoIosArrowForward />
        </button>
        {data?.type !== "verticalPage" && (
          <div className="flex-[0.1] hidden md:flex items-center gap-4 justify-center">
            <button
              disabled={data?.enrollments == "inactive" || allowedIds.includes(data?.id)}
              onClick={handleDownloadBrochure}
              className="px-4 py-2 disabled:bg-[#AFAFAF]  disabled:border disabled:border-slate-300 bg-universal text-white rounded-lg drop-shadow text-nowrap"
            >
              Get Brochure
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavigationTop;
