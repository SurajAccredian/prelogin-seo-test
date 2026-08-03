import React from "react";
import { useSelector } from "react-redux";
import { BiSolidTimer } from "react-icons/bi";
import { RiLiveLine } from "react-icons/ri";
import { FaChalkboardTeacher, FaTasks, FaUniversity } from "react-icons/fa";
import {
  MdFolderSpecial,
  MdOutlineAssignmentTurnedIn,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { LuNotebookPen, LuPackagePlus } from "react-icons/lu";
import { programActions } from "../../../store/reducers/program";
import { useDispatch } from "react-redux";
import { GiStack } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { FaEarthAmericas, FaPeopleGroup } from "react-icons/fa6";
import CustomEnrollNowButton from "../CustomEnrollNowButton";
import CircularProgress from "@mui/material/CircularProgress";
import Disclaimer from "../Disclaimer";
import { Blocks, BookCopy, SquareLibrary } from "lucide-react";


// ── Add more program IDs here as needed ──
const ADMISSION_CLOSED_IDS = [
];


const FeatureIcons = {
  credits: <Blocks className="w-full h-full" />,
  "subject areas": <BookCopy className="w-full h-full" />,
  "live sessions": <RiLiveLine className="w-full h-full" />,
  hours: <RiLiveLine className="w-full h-full" />,
  "class hours": <RiLiveLine className="w-full h-full" />,
  "career sessions": <FaChalkboardTeacher className="w-full h-full" />,
  "career sessions by accredian": <FaChalkboardTeacher className="w-full h-full" />,
  projects: <MdOutlineAssignmentTurnedIn className="w-full h-full" />,
  project: <MdOutlineAssignmentTurnedIn className="w-full h-full" />,
  "capstone project": <MdOutlineAssignmentTurnedIn className="w-full h-full" />,
  "capstone projects": (
    <MdOutlineAssignmentTurnedIn className="w-full h-full" />
  ),
  tools: <LuPackagePlus className="w-full h-full" />,
  modules: <MdOutlineSpaceDashboard className="w-full h-full" />,
  courses: <MdOutlineSpaceDashboard className="w-full h-full" />,
  "core modules": <MdOutlineSpaceDashboard className="w-full h-full" />,
  "int. immersion in dubai": (
    <FaEarthAmericas className="w-full h-full" />
  ),
  "specialization modules": <MdFolderSpecial className="w-full h-full" />,
  term: <MdOutlineSpaceDashboard className="w-full h-full" />,
  assignments: <FaTasks className="w-full h-full" />,
  "campus immersion": <FaUniversity className="w-full h-full" />,
  "masterclasses": <LuNotebookPen className="w-full h-full" />,
  "campus immersions": <FaUniversity className="w-full h-full" />,
  "immersion at iimv": <FaUniversity className="w-full h-full" />,
  "campus immersion (opt.)": <FaUniversity className="w-full h-full" />,
  frameworks: <GiStack className="w-full h-full" />,
  "case studies": <MdLibraryBooks className="w-full h-full" />,
  simulations: <MdLibraryBooks className="w-full h-full" />,
  "CXO coaching": <FaPeopleGroup className="w-full h-full" />,
};


const Info = () => {
  const { data, enrollLoderState } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  // Check if the current program is in the admission closed list
  const isAdmissionClosedProgram = ADMISSION_CLOSED_IDS.includes(data?.id);


  const handleEnrollNow = () => {
    if (data) {
      dispatch(programActions.setEnrollState(data));
    }
  };


  const renderFeature = (feature) => {
    if (
      data?.key_features?.some(
        (item) => item.title.toLowerCase() === feature.title.toLowerCase()
      )
    ) {
      return (
        <>
          {/* Mobile Card View (below md) */}
          <div className="md:hidden flex items-center bg-white min-h-[80px] rounded-xl border border-gray-200 p-3 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-universal flex items-center justify-center p-2.5 text-white">
                {FeatureIcons[feature.title.toLowerCase()]}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg text-slate-800 font-semibold leading-tight break-words">
                  {feature.count && `${feature.count}+`}
                  {feature.text && `${feature.text}`}
                </h1>
                <h4 className="text-xs font-medium text-neutral-600 mt-1 capitalize break-words">
                  {feature.title}
                </h4>
              </div>
            </div>
          </div>


          {/* Desktop View (md and above) - Original Design */}
          <div className="hidden md:flex items-center">
            <div className="w-16 md:w-20 h-16 md:h-20 flex-shrink-0 p-4 text-universal">
              {FeatureIcons[feature.title.toLowerCase()]}
            </div>
            <div>
              <h1 className="text-lg md:text-2xl text-slate-800 font-semibold">
                {feature.count && `${feature.count}+`}
              </h1>
              <h1 className="text-lg md:text-2xl text-slate-800 font-semibold">
                {feature.text && `${feature.text}`}
              </h1>
              <h4 className="text-xs md:text-base font-medium text-neutral-600 text-nowrap capitalize">
                {feature.title}
              </h4>
            </div>
          </div>
        </>
      );
    }
    return null;
  };


  return (
    <div className="info second-bg-grad w-full flex justify-center xl:px-12 px-4 py-6 md:py-12  border-t overflow-x-hidden">
      <div className="w-full max-w-[85rem]">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            {/* Our Unique <span className="text-universal">Educational</span> Suite */}
            Program <span className="text-universal">USPs</span> at a Glance
          </h1>
        </div>
        <div className="w-full flex gap-4 mt-3 md:mt-10 lg:flex-row flex-col max-lg:items-center">
          <div className="flex-[0.5] flex flex-col justify-between">
            <div className="mx-auto">
              <h1 className="md:block hidden lg:text-start text-center text-lg md:text-3xl font-semibold text-slate-800 max-w-2xl">
                Get to Know Our Program,{" "}
                <span className="text-universal">Essential Facts</span> for Your
                Consideration<span className="inline-block">*</span>
              </h1>
              <h4 className="md:hidden block lg:text-start text-center text-black font-medium text-lg mb-3 md:text-base  md:mt-4">
                <span className="text-universal">Key Information</span><span className="">*</span> for Your Evaluation
              </h4>
            </div>
            <div className="w-full py-3 hidden lg:flex items-center gap-4">
              <button className="w-full cursor-context-menu max-w-[14rem] px-4 py-2 bg-white drop-shadow-xl border border-universal rounded-md flex items-center justify-center gap-4">
                <BiSolidTimer className="text-universal" size={35} />
                <div>
                  {/* ── CHANGE: Show "Coming Soon" for admission closed programs instead of date ── */}
                  <h1 className="font-semibold text-nowrap">
                    {isAdmissionClosedProgram
                      ? "Coming Soon"
                      : data?.enrollments == "inactive"
                        ? "Coming Soon"
                        : data?.start_date}
                  </h1>
                </div>
              </button>
              {data?.enrollments === "active" ? (
                <>
                  {enrollLoderState ? (
                    <button
                      disabled={enrollLoderState}
                      //  onClick={handleEnrollNow}
                      className="px-4 py-2 h-full min-w-[100px] border-universal border drop-shadow-xl text-nowrap font-semibold rounded-md bg-universal hover:bg-darkBlue active:bg-darkBlue text-white"
                    >
                      <CircularProgress
                        size={15}
                        sx={{ color: "white" }} // Set spinner color to white
                      />
                    </button>
                  ) : (
                    <CustomEnrollNowButton
                      data={data}
                      text={"Enroll Now"}
                      className={
                        "px-4 py-2 h-full border-universal border drop-shadow-xl text-nowrap font-semibold rounded-md bg-universal hover:bg-darkBlue active:bg-darkBlue text-white"
                      }
                    />
                  )}
                </>
              ) : (
                // <button onClick={handleEnrollNow} className="px-4 py-2 h-full border-universal border drop-shadow-xl text-nowrap font-semibold rounded-md bg-universal hover:bg-darkBlue active:bg-darkBlue text-white">
                //   Enroll Now
                // </button>


                // <CustomEnrollNowButton    text={"Enroll Now"}  data={data}  className={"px-4 py-2 h-full border-universal border drop-shadow-xl text-nowrap font-semibold rounded-md bg-universal hover:bg-darkBlue active:bg-darkBlue text-white"}  />
                <>
                  {data?.enrollments === "coming-soon" ? (
                    <button className="px-4 py-2 h-full border drop-shadow-xl text-nowrap font-semibold rounded-md bg-[#AFAFAF] text-white border-slate-300 text-base cursor-not-allowed">
                      Coming Soon
                    </button>
                  ) : (
                    <button className="px-4 py-2 h-full border drop-shadow-xl text-nowrap font-semibold rounded-md bg-[#AFAFAF] text-white border-slate-300 text-base cursor-not-allowed">
                      Admission closed
                    </button>
                  )}
                </>
              )}
            </div>
            {/* Disclaimer - Hidden on mobile, shown on desktop */}
            <Disclaimer ClassName={"text-sm lg:text-left text-center hidden lg:block"} />
          </div>
          <div className="flex-[0.5] w-full">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 md:gap-4">
              {data?.key_features?.map((feature, index) => (
                <React.Fragment key={index}>
                  {renderFeature(feature)}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>


        {/* Disclaimer - Only shown on mobile below all content */}
        <div className="lg:hidden mt-4">
          <Disclaimer ClassName={"text-[12px] text-center"} />
        </div>
      </div>
    </div>
  );
};


export default Info;