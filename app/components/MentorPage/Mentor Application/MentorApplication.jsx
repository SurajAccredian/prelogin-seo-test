import { IoIosArrowForward } from "react-icons/io";
import { FcPositiveDynamic } from "react-icons/fc";

import "./mentorApplication.css";

import { useState } from "react";

const stepsData = [
  {
    title: "fill the application form",
    description:
      "Complete the application form with your qualifications and details.",
  },
  {
    title: "In-Depth Application Review",
    description:
      "Complete a comprehensive assessment to confirm that you are an ideal fit.",
  },
  {
    title: "Start Mentoring",
    description:
      "Once selected, you'll join our expert community and start making a difference.",
  },
];

const Application = () => {
  const [filteredSteps, setFilteredSteps] = useState(stepsData);
  // const handleRedirect = () => {
  //   console.log("Here")
  //   window.open(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/Career/mentor/application`,
  //     "_blank"
  //   ); // Replace with your desired URL
  // };
  return (
    <div className="admission w-full flex justify-center py-6 md:py-12 xl:px-12 px-4">
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">
            <span className="text-universal">Become an Expert</span> in Just
            Three Simple Steps
          </h4>
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Structured <span className="text-universal">Application</span>{" "}
            Process
          </h1>
        </div>
        <div className="w-full flex md:flex-row flex-col mt-8 md:mt-12 gap-4 md:gap-8">
          <div className="admission-card-bg-image w-full border py-6 md:py-12 px-4 md:px-8 rounded-lg">
            <div className="flex flex-col">
              {/* hollow component */}
              <div className="flex gap-2 md:gap-4 items-end">
                <div className="font-extrabold text-2xl text-universal/60 max-w-10 min-w-8 w-full"></div>
                <div className="px-1.5 w-fit">
                  <div className="w-4 flex-shrink-0 flex justify-center">
                    <div className="w-[1px] h-4 bg-universal/60" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {filteredSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-2 md:gap-4 h-[150px] md:h-[150px] lg:h-[100px]"
                  >
                    <div className="font-extrabold  text-2xl text-universal/60 max-w-10 min-w-8 w-full">
                      <h1 className="text-2xl font-extrabold text-universal/60 leading-none">
                        0{index + 1}
                      </h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-1.5 flex-shrink-0 bg-universal/25 rounded-full flex justify-center items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      </div>
                      <div className={`w-[1px] h-full  bg-universal/60`} />
                    </div>
                    <div className="">
                      <h1 className="font-semibold text-lg text-neutral-800 capitalize">
                        {step.title}
                      </h1>
                      <h4 className="text-sm md:text-base leading-tight mt-2 mb-4 text-neutral-600 ">
                        {step.description}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:max-w-md w-full border rounded-lg flex flex-col items-center justify-center px-6 py-4 text-center">
            <div className="w-20 h-20 flex-shrink-0">
              <FcPositiveDynamic className="w-full h-full" />
            </div>
            <h1 className="text-xl md:text-2xl font-semibold mt-2">
              Every submission is given thoughtful consideration!
            </h1>
            <h4 className="text-sm md:text-base text-neutral-600 mt-4">
              Inviting Industry Professionals to Join Our Expert Community
            </h4>

            <button className="w-full max-w-[200px] outline-none mt-4 rounded-lg bg-blue-500 text-white text-base font-semibold flex items-center justify-center gap-1">
              <a
                href="/Career/mentor/application"
                target="_blank"
                className="h-full w-full px-4 py-3 flex items-center justify-center gap-1"
              >
                Apply Now <IoIosArrowForward />
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Application;
