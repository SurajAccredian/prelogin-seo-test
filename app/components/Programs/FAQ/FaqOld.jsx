"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown } from "lucide-react";
import { IoIosArrowForward } from "react-icons/io";

const FaqOld = ({ data }) => {
  const [activeTab, setActiveTab] = useState("Program Pre-Requisites");

  const points = useMemo(() => {
    if (!data?.faq?.points) return [];
    const contents = data.faq.points.find(
      (val) => val.title.toLowerCase() === activeTab.toLowerCase()
    );
    return contents?.content || [];
  }, [data, activeTab]);

  const [isOpen, setIsOpen] = useState(points?.[0]?.title || null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainer = useRef(null);

  const handleOverviewData = (item) => {
    setActiveTab(item?.title);
    setIsOpen(item?.content?.[0]?.title || null);
  };

  const handleAccordionChange = (title) => {
    setIsOpen((prev) => (prev === title ? null : title));
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
    const el = scrollContainer.current;
    if (!el) return;

    const checkScroll = () => {
      setIsScrolled(el.scrollLeft > 0);
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
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
              <button
                onClick={handlePreviousButt}
                aria-label="Previous"
                className="absolute md:hidden block z-20 left-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1 rotate-180"
              >
                <IoIosArrowForward />
              </button>
            )}
            <div
              ref={scrollContainer}
              className="no-scrollbar md:max-w-sm md:px-4 py-2 flex flex-row md:flex-col items-center gap-4 md:gap-6 max-w-[90vw] overflow-x-auto"
            >
              {data?.faq?.points &&
                data.faq.points.map((val, index) => {
                  const isActive =
                    activeTab.toLowerCase() === val.title.toLowerCase();
                  return (
                    <div
                      onClick={() => handleOverviewData(val)}
                      key={index}
                      className={`w-full max-w-[280px] rounded-md ${
                        isActive
                          ? "drop-shadow-lg md:drop-shadow-xl bg-white border"
                          : "border-2 border-neutral-300"
                      } px-4 py-4 text-center cursor-pointer`}
                    >
                      <p
                        className={`text-sm max-md:text-nowrap lg:text-lg font-semibold ${
                          isActive ? "text-universal" : "text-neutral-500"
                        } capitalize`}
                      >
                        {val.title}
                      </p>
                    </div>
                  );
                })}
            </div>
            <button
              onClick={handleNextButt}
              aria-label="Next"
              className="absolute md:hidden block z-20 right-0 top-[50%] translate-y-[-50%] drop-shadow-lg border bg-white rounded-full p-1"
            >
              <IoIosArrowForward />
            </button>
          </div>
          <div className="w-full md:flex-[0.7] md:px-4 flex flex-col items-start space-y-2">
            {points?.map((point, pointIndex) => {
              const isItemOpen = isOpen === point.title;
              return (
                <div key={pointIndex} className="w-full bg-white">
                  <button
                    type="button"
                    onClick={() => handleAccordionChange(point.title)}
                    className="w-full flex items-center justify-between py-2 px-2 text-left"
                  >
                    <h3
                      className={`text-lg font-semibold w-full transition-colors ${
                        isItemOpen ? "text-universal" : "text-neutral-800"
                      }`}
                    >
                      {point?.title}
                    </h3>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
                        isItemOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isItemOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-4 pl-2 pb-4">
                        {point?.content && (
                          <ReactMarkdown
                            components={{
                              a: ({ ...props }) => (
                                <a
                                  {...props}
                                  className="text-blue-500 hover:underline"
                                />
                              ),
                              h1: ({ ...props }) => (
                                <h1
                                  {...props}
                                  className="text-2xl font-bold mb-2"
                                />
                              ),
                              h2: ({ ...props }) => (
                                <h2
                                  {...props}
                                  className="text-base font-semibold mt-4 mb-2"
                                />
                              ),
                              ul: ({ ...props }) => (
                                <ul {...props} className="list-disc ml-6" />
                              ),
                              li: ({ ...props }) => (
                                <li {...props} className="mt-1" />
                              ),
                            }}
                          >
                            {point?.content.join("\n")}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqOld;
