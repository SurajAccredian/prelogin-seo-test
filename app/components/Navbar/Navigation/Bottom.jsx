import { FcFlashOn } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import { IoIosArrowUp } from "react-icons/io";
import CustomEnrollNowButton from "../../Programs/CustomEnrollNowButton";
import CircularProgress from "@mui/material/CircularProgress";
import { allowedIds } from "../../Assets/constants";


// ── Add more program IDs here as needed ──
const ADMISSION_CLOSED_IDS = [
];


const NavigationDown = ({ showBottom, data, enrollLoderState }) => {
  const dispatch = useDispatch();

  // Check if the current program is in the admission closed list
  const isAdmissionClosedProgram = ADMISSION_CLOSED_IDS.includes(data?.id);


  const handleEnrollNow = () => {
    if (data) {
      dispatch(programActions.setEnrollState(data));
    }
  };


  const handleDownloadBrochure = () => {
    if (data) {
      dispatch(programActions.setBrochureState(data));
    }
  };


  const handleScrollTop = () => {
    const scrollHeight = window.scrollY;
    const scrollStep = Math.round(scrollHeight / 30);
    const scrollInterval = setInterval(() => {
      if (window.scrollY > 0) {
        window.scrollBy(0, -scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };


  return (
    <div className="w-full fixed bottom-0 z-[100] pointer-events-none">
      {/* scroll to top */}
      <div className="w-full max-w-[85rem] mx-auto flex justify-end my-2 xl:px-0 px-4 pointer-events-none">
        <button
          onClick={handleScrollTop}
          title="scroll to top"
          className={`w-12 h-12 transition-all duration-200 ${showBottom ? "opacity-100 scale-100" : "opacity-0 scale-0"
            } flex-shrink-0 bg-white border border-universal/50 drop-shadow-md rounded-full p-2 pointer-events-auto text-universal hover:bg-universal hover:text-white`}
        >
          <IoIosArrowUp className="w-full h-full" />
        </button>
      </div>
      <div
        className={`w-full px-4 py-4 flex flex-col items-center justify-center transition-all  ${showBottom
          ? "translate-y-0 pointer-events-auto"
          : "translate-y-[100%] pointer-events-none"
          } ease-in-out duration-700 drop-shadow-md  bg-white font-circular border-t`}
      >
        {/* for desktop */}
        <div className="w-full max-w-[85rem] hidden lg:flex items-center justify-between gap-4">
          <div className="flex-[0.3] flex items-center gap-8">

            {/* ── CHANGE: For admission closed programs, replace "Next cohort" with "Admission Deadline → Closed" ── */}
            <div className="">
              <p className="text-neutral-600 text-xs font-semibold">
                {isAdmissionClosedProgram ? "Admission Deadline" : "Next cohort"}
              </p>
              <h4 className="text-base font-semibold text-universal text-nowrap">
                {isAdmissionClosedProgram
                  ? "Closed"
                  : data?.enrollments == "inactive"
                    ? "Coming Soon"
                    : data?.start_date}
              </h4>
            </div>

            <div className="">
              <p className="text-neutral-600 text-xs font-semibold">
                Duration
              </p>
              <h4 className="text-base font-semibold text-universal text-nowrap">
                {data?.duration}
              </h4>
            </div>
            <div className="">
              <p className="text-neutral-600 text-xs font-semibold">
                Sessions
              </p>
              <h4 className="text-base font-semibold text-universal text-nowrap capitalize">
                {data?.type} | {data?.timings}
              </h4>
            </div>
          </div>
          <div className="flex-[0.4] flex items-center justify-center">
            {data?.enrollments === "active" && (
              <p className="text-neutral-700 text-lg font-semibold flex items-center italic">
                Hurry! <FcFlashOn /> Only Few Seats Available
              </p>
            )}
          </div>
          <div className="flex-[0.3] flex items-center gap-4 justify-between">
            <div>
              <p className="text-neutral-600 text-sm font-semibold">
                Accredited by
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <div
                  className={`${data.short_university_name?.toLowerCase() === "iim-ranchi"
                    ? "max-w-[70px]"   // ← adjust to your liking
                    : data.short_university_name?.toLowerCase() === "iim-amritsar"
                      ? "max-w-[170px]"  // ← adjust this value to your liking
                      : "max-w-[120px]"
                    } flex-shrink-0 rounded-md`}
                >
                  <img
                    className={`${data.short_university_name?.toLowerCase() === "iim-trichy"
                      ? "w-14 h-14"
                      : "w-full h-full"
                      } rounded`}
                    src={
                      data.short_university_name?.toLowerCase() === "iim-trichy"
                        ? "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-H.webp"
                        : data?.university_logo
                    }
                    alt={data?.university_name}
                  />
                </div>
                {/* <div className="max-w-[120px] flex-shrink-0 rounded-md bg-black">
                <img className="w-full" src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/accredainnew.webp" alt="logo" />
              </div> */}
              </div>
            </div>
            {data?.enrollments === "active" ? (
              // <button
              //   onClick={handleEnrollNow}
              //   className="px-4 py-2 border-universal border bg-white drop-shadow text-nowrap font-medium rounded-lg hover:bg-universal hover:text-white"
              // >
              //   Enroll Now
              // </button>


              <>
                {enrollLoderState ? (
                  <button
                    disabled={enrollLoderState}
                    //  onClick={handleEnrollNow}
                    classname="px-4 py-2 min-w-[100px] border-universal border-2 bg-white drop-shadow text-nowrap font-medium rounded-lg hover:bg-universal hover:text-white"
                  >
                    <CircularProgress
                      size={15}
                      sx={{ color: "#1A73E8" }} // Set spinner color to white
                    />
                  </button>
                ) : (
                  <CustomEnrollNowButton
                    data={data}
                    text={"Enroll Now"}
                    className={
                      "px-4 py-2 border-universal border bg-white drop-shadow text-nowrap font-medium rounded-lg hover:bg-universal hover:text-white"
                    }
                  />
                )}
              </>
            ) : (
              // <CustomEnrollNowButton
              //   data={data}
              //   text={"Enroll Now"}
              //   className={
              //     "px-4 py-2 border-universal border bg-white drop-shadow text-nowrap font-medium rounded-lg hover:bg-universal hover:text-white"
              //   }
              // />
              <>
                {data?.enrollments === "coming-soon" ? (
                  <button className="px-4 py-2 drop-shadow text-nowrap font-medium rounded-lg bg-[#AFAFAF] text-white border border-slate-300 cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <button className="px-4 py-2 drop-shadow text-nowrap font-medium rounded-lg bg-[#AFAFAF] text-white border border-slate-300 cursor-not-allowed">
                    Admission closed
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {/* for mobiles and tablets */}
        <div className="w-full max-w-[85rem] lg:hidden block">
          <div className="w-full flex justify-center md:justify-between items-center mb-2">
            {data?.enrollments === "active" && (
              <p className="text-neutral-700 text-sm font-semibold flex items-center italic">
                Hurry! <FcFlashOn /> Only 1 Seat Available
              </p>
            )}
            <div className="hidden md:flex gap-4">

              {/* ── CHANGE: For admission closed programs, replace "Next cohort" with "Admission Deadline → Closed" on tablet ── */}
              <div className="">
                <p className="text-neutral-600 text-xs font-semibold">
                  {isAdmissionClosedProgram ? "Admission Deadline" : "Next cohort"}
                </p>
                <h4 className="text-sm font-semibold text-universal text-nowrap">
                  {isAdmissionClosedProgram
                    ? "Closed"
                    : data?.enrollments == "inactive"
                      ? "Coming Soon"
                      : data?.start_date}
                </h4>
              </div>

              <div className="">
                <p className="text-neutral-600 text-xs font-semibold">
                  Duration
                </p>
                <h4 className="text-sm font-semibold text-universal text-nowrap">
                  {data?.duration}
                </h4>
              </div>
              <div className="">
                <p className="text-neutral-600 text-xs font-semibold">
                  Sessions
                </p>
                <h4 className="text-sm font-semibold text-universal text-nowrap capitalize">
                  {data?.type} | {data?.timings}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {data?.enrollments === "active" ? (
              // <button onClick={handleEnrollNow} className="flex-[0.5] px-2 py-2 border-2 border-universal rounded-md font-semibold text-nowrap text-universal">
              //   Enroll Now
              // </button>
              <>
                {enrollLoderState ? (
                  <button
                    disabled={enrollLoderState}
                    //  onClick={handleEnrollNow}
                    classname="flex-[0.5]  px-2 py-2 border-2 border-universal rounded-md font-semibold text-nowrap text-universal"
                  >
                    <CircularProgress
                      size={15}
                      sx={{ color: "#1A73E8" }} // Set spinner color to white
                    />
                  </button>
                ) : (
                  <CustomEnrollNowButton
                    data={data}
                    text={"Enroll Now"}
                    className={
                      "flex-[0.5] px-2 py-2 border-2 border-universal rounded-md font-semibold text-nowrap text-universal"
                    }
                  />
                )}
              </>
            ) : (
              // <CustomEnrollNowButton
              //   data={data}
              //   className={
              //     "flex-[0.5] px-2 py-2 border-2 border-universal rounded-md font-semibold text-nowrap text-universal"
              //   }
              // />
              <>
                {data?.enrollments === "coming-soon" ? (
                  <button className="flex-[0.5] px-2 py-2 rounded-md font-semibold text-nowrap bg-[#AFAFAF] text-white border border-slate-300 drop-shadow-xl cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <button className="flex-[0.5] px-2 py-2 rounded-md font-semibold text-nowrap bg-[#AFAFAF] text-white border border-slate-300 drop-shadow-xl cursor-not-allowed">
                    Admission closed
                  </button>
                )}
              </>
            )}
            <button
              onClick={handleDownloadBrochure}
              disabled={data?.enrollments == "inactive" || allowedIds.includes(data?.id)}
              className="flex-[0.5] disabled:bg-[#AFAFAF] disabled:border-slate-300 px-2 py-2 border-2 border-universal bg-universal text-white font-semibold rounded-md text-nowrap cursor-pointer disabled:cursor-not-allowed"
            >
              Get Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default NavigationDown;