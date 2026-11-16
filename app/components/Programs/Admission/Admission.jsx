import { IoIosArrowForward } from "react-icons/io";
import { FcPositiveDynamic } from "react-icons/fc";
import CircularProgress from "@mui/material/CircularProgress";
import "./Admission.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import React, { useEffect, useState, useMemo } from "react";
import CustomEnrollNowButton from "../CustomEnrollNowButton";

const stepsData = [
  {
    title: "fill the application form",
    description:
      "We follow an application process to carefully curate our learning community.",
  },
  {
    title: "eligibility Test",
    description:
      "Successfully complete the eligibility test to confirm your admission.",
  },
  {
    title: "personalized discussion",
    description: "Schedule a One-on-One Consultation with Program Advisors.",
  },
  {
    title: "online test (MAST) and personal interview",
    description:
      "Successfully complete the Online Test (MAST) and Personal Interview to secure your admission.",
  },
  {
    title: "application review",
    description: "Qualify for the program following the review.",
  },
  {
    title: "start learning",
    description:
      "Congratulations, you're in! It's time to embark on your journey.",
  },
];

const Admission = ({ data: propData }) => {
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram.data;
  const enrollLoderState = reduxProgram.enrollLoderState;
  const dispatch = useDispatch();

  const initialSteps = React.useMemo(() => {
    return stepsData?.filter((step) =>
      data?.admission_process
        ?.map((item) => item.toLowerCase())
        .includes(step.title.toLowerCase())
    ) || [];
  }, [data?.admission_process]);

  const [filteredSteps, setFilteredSteps] = useState(initialSteps);

  useEffect(() => {
    setFilteredSteps(initialSteps);
  }, [initialSteps]);

  const handleEnrollNow = () => {
    if (data) {
      dispatch(programActions.setEnrollState(data));
    }
  };

  return (
    <div className="admission w-full flex justify-center py-6 md:py-12 xl:px-12 px-4">
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">
            Our Admissions Process is Simple - <br className="md:hidden" /> No
            hassle, Do it all online.
          </h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Structured <span className="text-universal">Admission</span> Process
          </h2>
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
                  <div key={index} className="flex gap-2 md:gap-4">
                    <div className="font-extrabold text-2xl text-universal/60 max-w-10 min-w-8 w-full">
                      <span className="text-2xl font-extrabold text-universal/60 leading-none">
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="p-1.5 flex-shrink-0 bg-universal/25 rounded-full flex justify-center items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      </div>
                      <div
                        className={`w-[1px] h-full ${index !== data?.admission_process?.length - 1
                            ? "min-h-10 md:min-h-16"
                            : ""
                          } bg-universal/60`}
                      />
                    </div>
                    <div
                      className={`${index !== data?.admission_process?.length - 1
                          ? "mb-4"
                          : "mb-2"
                        }`}
                    >
                      <h3 className="font-semibold text-lg text-neutral-800 capitalize">
                        {step.title}
                      </h3>
                      <h4 className="text-sm md:text-base leading-tight mt-2 text-neutral-600 ">
                        {step.description}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="md:max-w-md w-full border-0 md:border rounded-lg flex flex-col items-center md:justify-center px:4 md:px-6 py-4 md:text-center">
            {/* Mobile Layout */}
            <div className="flex md:hidden items-center gap-3 w-full">
              <div className="w-12 h-12 flex-shrink-0">
                <FcPositiveDynamic className="w-full h-full" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-semibold leading-tight">
                  Every submission is given thoughtful consideration!
                </p>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="w-20 h-20 flex-shrink-0 mx-auto">
                <FcPositiveDynamic className="w-full h-full" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mt-2">
                Every submission is given thoughtful consideration!
              </h3>
            </div>

            {/* Text visible only on desktop */}
            <h4 className="hidden md:block text-sm md:text-base text-neutral-600 mt-4">
              Experienced Working professionals{" "}
              {data?.required_years_experience !== 0 &&
                `${data?.required_years_experience}+ years`}{" "}
              are invited to join the program.{" "}
              <a href="#overview" className="text-universal">
                Know more
              </a>
              .
            </h4>

            {/* Button - Full width on mobile */}
            {data?.enrollments === "active" ? (
              <>
                {enrollLoderState ? (
                  <button
                    disabled={enrollLoderState}
                    className="w-full md:max-w-[200px] px-4 py-3 mt-4 rounded-lg bg-blue-500 text-white text-base font-semibold flex items-center justify-center gap-1"
                  >
                    <CircularProgress
                      size={15}
                      sx={{ color: "white" }}
                    />
                  </button>
                ) : (
                  <CustomEnrollNowButton
                    data={data}
                    text={"Enroll Now"}
                    className={
                      "w-full md:max-w-[200px] px-4 py-3 mt-4 rounded-lg bg-blue-500 text-white text-base font-semibold flex items-center justify-center gap-1"
                    }
                  />
                )}
              </>
            ) : (
              <>
                {data?.enrollments === "coming-soon" ? (
                  <button className="w-full md:max-w-[200px] px-4 py-3 mt-4 rounded-lg text-base font-semibold flex items-center justify-center gap-1 bg-[#AFAFAF] text-white border border-slate-300 cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <button className="w-full md:max-w-[200px] px-4 py-3 mt-4 rounded-lg text-base font-semibold flex items-center justify-center gap-1 bg-[#AFAFAF] text-white border border-slate-300 cursor-not-allowed">
                    Admission closed
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admission;
