import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { IoChevronDown, IoChevronUp, IoArrowDown, IoArrowUp } from "react-icons/io5";
import { generateFAQFromTemplate } from "../../../helpers/faqTemplateService";


const FaqTemplateVersion = ({ data }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [faqData, setFaqData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showAll, setShowAll] = useState(false);


  useEffect(() => {
    if (data) {
      const generatedFAQ = generateFAQFromTemplate(data);
      setFaqData(generatedFAQ);
    }
  }, [data]);


  const handleQuestionChange = (questionTitle) => {
    setExpandedQuestion(expandedQuestion === questionTitle ? null : questionTitle);
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);
  };

  const handleShowLess = () => {
    setVisibleCount(10);
    setShowAll(false);
    document.getElementById('FAQs')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  // Flatten all questions with their category info
  const allQuestions = faqData?.points?.flatMap((category) =>
    category.content.map((question) => ({
      ...question,
      categoryTitle: category.title,
    }))
  ) || [];

  const displayCount = showAll ? allQuestions.length : visibleCount;
  const visibleQuestions = allQuestions.slice(0, displayCount);
  const hasMore = displayCount < allQuestions.length;
  const remainingCount = allQuestions.length - displayCount;

  // Group visible questions by category
  const groupedQuestions = visibleQuestions.reduce((acc, question) => {
    if (!acc[question.categoryTitle]) {
      acc[question.categoryTitle] = [];
    }
    acc[question.categoryTitle].push(question);
    return acc;
  }, {});


  return (
    <div id="FAQs" className="w-full flex justify-center py-6 md:py-12 xl:px-12 px-4">
      <div className="w-full max-w-[80rem]">
        <div className="w-full text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 tracking-wider">
            Frequently Asked <span className="text-universal">Questions</span>
          </h2>
          {/* <p className="text-gray-600 mt-2">
            Showing {visibleQuestions.length} of {allQuestions.length} questions
          </p> */}
        </div>


        {/* Single big card container */}
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
          {Object.entries(groupedQuestions).map(([categoryTitle, questions], categoryIndex) => (
            <div key={categoryIndex} className="w-full">
              {/* Category header inside the card */}
              <div className="px-5 md:px-6 py-4 bg-gray-100 border-b-2 border-gray-200">
                <h2 className="text-lg font-bold text-gray-800">
                  {categoryTitle}
                </h2>
              </div>

              {/* Questions for this category */}
              {questions.map((question, questionIndex) => (
                <div
                  key={questionIndex}
                  className="border-b border-gray-200 last:border-b-0 font-sans"
                >
                  <div className="w-full py-4 px-5 md:px-6 flex justify-between items-start hover:bg-gray-50 transition-colors duration-200 group relative cursor-pointer">
                    <div className="flex items-center gap-3 w-full pr-12">
                      {/* <span className="rounded-full bg-gray-300 text-gray-600 text-sm font-medium min-w-[24px] h-6 flex items-center justify-center flex-shrink-0 mt-1">
                        {questionIndex + 1}
                      </span> */}
                      <button
                        onClick={() => handleQuestionChange(question.title)}
                        className="text-left text-gray-800 text-base font-medium group-hover:text-universal transition-colors duration-200 w-full"
                      >
                        {question.title}
                      </button>
                    </div>


                    <button
                      onClick={() => handleQuestionChange(question.title)}
                      className="absolute right-5 md:right-6 top-4 text-gray-400 group-hover:text-universal flex-shrink-0 transition-colors duration-200"
                    >
                      {expandedQuestion === question.title ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
                    </button>
                  </div>


                  {expandedQuestion === question.title && (
                    <div className="px-5 md:px-6 pb-5 pt-1 bg-gray-50">
                      <div className="text-gray-600 text-sm leading-relaxed">
                        {question?.content && (
                          <ReactMarkdown
                            components={{
                              a: ({ node, ...props }) => (
                                <a {...props} className="text-universal underline" target="_blank" rel="noopener noreferrer" />
                              ),
                              h1: ({ node, ...props }) => (
                                <h3 {...props} className="text-2xl font-bold mb-2" />
                              ),
                              h2: ({ node, ...props }) => (
                                <h2 {...props} className="text-base font-semibold mt-4 mb-2" />
                              ),
                              ul: ({ node, ...props }) => (
                                <ul {...props} className="list-disc ml-6 space-y-1" />
                              ),
                              li: ({ node, ...props }) => (
                                <li {...props} className="mt-1" />
                              ),
                            }}
                          >
                            {question?.content.join("\n")}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Compact Button Section */}
        <div className="w-full flex flex-col items-center gap-3 mt-6">
          {hasMore && !showAll && (
            <div className="flex gap-3">
              <button
                onClick={handleShowAll}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <IoArrowDown size={18} />
                View More
              </button>
              {/* <button
                onClick={handleShowAll}
                className="relative px-6 py-2.5 bg-gradient-to-r from-universal to-blue-600 text-white text-sm font-semibold rounded-full hover:shadow-lg transition-all duration-200 shadow-md"
              >
                View More
                {remainingCount > 0 && (
                  <span className="ml-2 bg-white text-universal text-xs font-bold px-2 py-0.5 rounded-full">
                    +{remainingCount}
                  </span>
                )}
              </button> */}
            </div>
          )}

          {(showAll || (!hasMore && visibleCount > 10)) && (
            <button
              onClick={handleShowLess}
              className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-200 transition-all duration-200 border border-gray-300"
            >
              <IoArrowUp size={18} />
              View less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default FaqTemplateVersion;
