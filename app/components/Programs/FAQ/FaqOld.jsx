import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IoIosArrowForward } from "react-icons/io";

const FaqOld = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Program Pre-Requisites");
  const [isOpen, setIsOpen] = useState(null);
  const [points, setPoints] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainer = useRef(null);

  const handleOverviewData = (data) => {
    setActiveTab(data?.title);
    setPoints(data?.content);
  };

  useEffect(() => {
    if (data?.faq?.points) {
      const contents = data?.faq?.points.find(val => val.title.toLowerCase() === activeTab.toLowerCase());
      setPoints(contents.content);
      setIsOpen(points[0]?.title);
    }
  }, [data, activeTab, points]);

  const handleAccordionChange = (title) => {
    setIsOpen(isOpen === title ? null : title);
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

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainer.current) {
        setIsScrolled(scrollContainer.current.scrollLeft > 0);
      }
    };

    checkScroll();
    if (scrollContainer.current) {
      scrollContainer.current.addEventListener('scroll', checkScroll);
    }

    return () => {
      if (scrollContainer.current) {
        scrollContainer.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  return (
    <div id="FAQs" className="w-full flex justify-center py-6 md:py-12 xl:px-12 px-4">
      <div className="w-full max-w-[85rem]">
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Frequently Asked <span className="text-universal">Questions</span>
          </h2>
        </div>
        <div className="flex gap-4 mt-8 md:mt-12 md:flex-row flex-col">
          <div className="w-full md:flex-[0.3] relative">
            {isScrolled && (
              <button onClick={handlePreviousButt} className='absolute md:hidden block z-20 left-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1 rotate-180'>
                <IoIosArrowForward />
              </button>
            )}
            <div ref={scrollContainer} className="no-scrollbar md:max-w-sm md:px-4 py-2 flex flex-row md:flex-col items-center gap-4 md:gap-6 max-w-[90vw] overflow-x-auto">
              {data?.faq?.points && data?.faq?.points.map((val, index) => {
                return (
                  <div onClick={() => handleOverviewData(val)} key={index} className={`w-full max-w-[280px] rounded-md ${activeTab.toLowerCase() === val.title.toLowerCase() ? "drop-shadow-lg md:drop-shadow-xl bg-white border" : "border-2 border-neutral-300"} px-4 py-4 text-center cursor-pointer`}>
                    <p className={`text-sm max-md:text-nowrap lg:text-lg font-semibold ${activeTab.toLowerCase() === val.title.toLowerCase() ? " text-universal" : "text-neutral-500"} capitalize`}>
                      {val.title}
                    </p>
                  </div>
                );
              })}
            </div>
            <button onClick={handleNextButt} className='absolute md:hidden block z-20 right-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1'>
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full md:flex-[0.7] md:px-4 flex flex-col items-start">
            {points?.map((point, pointIndex) => (
              <Accordion
                key={pointIndex}
                sx={{
                  '&:before': {
                    display: 'none',
                  },
                  boxShadow: "none",
                  backgroundColor: "white",
                }}
                expanded={isOpen === point.title}
                onChange={() => handleAccordionChange(point.title)}
                disableGutters={true}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{
                    minHeight: "0",
                    padding: "0",
                    m: 0,
                  }}
                >
                  <div className="flex items-center gap-2 py-2 px-2">
                    <h3 className={`text-lg font-semibold w-full h-full ${isOpen === point.title ? "text-universal" : ""}`}>{point?.title}</h3>
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    margin: "0px !important"
                  }}
                >
                  <div className="flex flex-col gap-4">
                    {point?.content && (
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a {...props} className="text-blue-500 hover:underline" />
                          ),
                          h1: ({ node, ...props }) => (
                            <h3 {...props} className="text-2xl font-bold mb-2" />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2 {...props} className="text-base font-semibold mt-4 mb-2" />
                          ),
                          ul: ({ node, ...props }) => (
                            <ul {...props} className="list-disc ml-6" />
                          ),
                          li: ({ node, ...props }) => (
                            <li {...props} className="mt-1" />
                          ),
                        }}
                      >
                        {point?.content.join("\n")}
                      </ReactMarkdown>
                    )}
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqOld;
