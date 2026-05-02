import { useSelector, useDispatch } from "react-redux";
import { FaCirclePlay } from "react-icons/fa6";
import { getColorAndBgColor } from "../../../helpers/colors.helpers";
import { BiSolidTimer } from "react-icons/bi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import CircularProgress from "@mui/material/CircularProgress";
import "./Hero.css";
import { useState, useEffect } from "react";
import { programActions } from "../../../store/reducers/program";
import HeroModal from "../../Modals/video-modal";
import { usePathname } from "next/navigation";
import { MdOutlineHourglassTop } from "react-icons/md";
import Moment from "react-moment";
import * as moment from "moment";
import { decodeToken } from "react-jwt";
import { userActions } from "../../../store/reducers/user";
import CustomEnrollNowButton from "../CustomEnrollNowButton";
import { getApplicationDetails } from "../../../services/program.service";
import { CircleAlertIcon, HandshakeIcon } from "lucide-react";
import { allowedIds } from "../../Assets/constants";


// ── Add more program IDs here as needed ──
const ADMISSION_CLOSED_IDS = [
];

const IIMV_PROGRAM_ID = "iimv-executive-program-in-leadership-with-ai";


const Hero = () => {
  const pathname = usePathname();
  const { data, enrollLoderState } = useSelector((state) => state.program);
  localStorage.setItem("university_shortName", data.short_university_name);
  const isNewProgram = data?.tags.find((tag) => tag.title === "new launch");
  const isMain = data?.tags.find((tag) => tag.type === "main");
  const dispatch = useDispatch();

  // Check if the current program is the IIMV program
  const isAdmissionClosedProgram = ADMISSION_CLOSED_IDS.includes(data?.id);

  const now = moment();
  let date = "";
  if (now.day() === 0 && now.format("hh:mm A") === "12:55 PM") {
    date = moment().day("Sunday").add(7, "days");
  }


  if (now.day() === 0 && now.isBefore(moment("23:55", "HH:mm"))) {
    date = moment().day("Sunday");
  }


  if (now.day() !== 0) {
    date = moment().day("Sunday").add(7, "days");
  }


  const startDateObj = new Date(data?.start_date);
  const admissionDeadlineObj = date.toDate();
  const [isVideoOpen, setIsVideoOpen] = useState(null);


  useEffect(() => {
    async function checkUserEnrollStatus() {
      const token = localStorage.getItem("token");
      console.log("Loader started");
      console.log(token)
      if (token) {
        dispatch(programActions.setEnrollLoaderState(true));
        const myDecodedToken = decodeToken(token);
        const id = myDecodedToken.data.user_id;
        const dataCategory = data.category;
        dispatch(userActions.setAuthenticatedState(true));
        const payload = {
          id: id,
          category: dataCategory,
          universityName: data.short_university_name,
        };
        try {
          const response = await getApplicationDetails(payload);
          if (response) {
            dispatch(programActions.setEnrollText(response.status));
            dispatch(programActions.setTracker(response.data.tracker_id));
          }
        } catch (error) {
          if (error.response.data) {
            dispatch(programActions.setEnrollText(""));
          }
        } finally {
          dispatch(programActions.setEnrollLoaderState(false));
        }
      }
    }


    checkUserEnrollStatus();
  }, [dispatch, data.category, data.short_university_name]);


  const handleDownloadBrochure = () => {
    if (data) {
      dispatch(programActions.setBrochureState(data));
    }
  };


  const handleVideoOpen = () => {
    if (data) {
      setIsVideoOpen(data?.university_video);
    }
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this page",
          url: window.location.origin + pathname,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };




  return (
    <div
      id="introduction"
      className="hero w-full flex justify-center lg:py-16 pt-0 py-4 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem] flex gap-4 md:gap-8 lg:flex-row flex-col-reverse">
        {/* Left Section - Content */}
        <div className="w-full lg:flex-[0.5]">
          {/* Mobile Background Image Container - Full Width */}
          <div
            className="lg:hidden relative min-h-[300px] overflow-hidden mb-6 w-screen left-1/2 -translate-x-1/2"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.70)), url(${data?.university_image})`,


              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* University Name Badge - Top Right */}
            {/* <div className="absolute top-4 right-4 z-20 bg-white text-black px-2 py-1 rounded-md shadow-md">
              <span className="text-[10px] font-semibold">
                {data?.university_name}
              </span>
            </div> */}


            {/* Content */}
            <div className="relative z-10 p-6 pt-8 text-white">
              {/* University Logo Box - Bottom Left */}
              <div className="bg-white rounded-md px-3 py-1 inline-block mb-3">
                <div
                  className={`${data.short_university_name?.toLowerCase() === "iim-trichy"
                    ? "max-w-[300px]"
                    : data.short_university_name?.toLowerCase() === "iiml"
                      ? "max-w-[200px]"
                      : data.short_university_name?.toLowerCase() === "iim-ranchi"
                        ? "max-w-[70px]"   // ← adjust this value to your liking
                        : "max-w-[120px]"
                    } flex-shrink-0 rounded-md`}
                >
                  <img
                    className="w-full h-full object-contain"
                    src={data?.university_logo}
                    alt="university logo"
                  />
                </div>
              </div>


              <h1 className="text-2xl font-semibold mt-1">{data?.title}</h1>
              <h4 className="text-base font-normal mt-4 text-white/90">
                {data?.description}
              </h4>


              {/* Tags on Mobile - Below Description */}
              <div className="flex flex-wrap gap-3 mt-6">
                {data?.tags?.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: `${getColorAndBgColor(tag.title.toLowerCase()).bgColor
                        }`,
                    }}
                    className="rounded-md px-2 py-1 w-fit text-center drop-shadow-md"
                  >
                    <h1
                      style={{
                        color: `${getColorAndBgColor(tag.title.toLowerCase()).color
                          }`,
                      }}
                      className="text-nowrap font-semibold text-[10px] capitalize"
                    >
                      {tag.title}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Desktop Title/Description */}
          <div className="hidden lg:block lg:text-start text-center">
            <h1 className="text-neutral-500 text-xl md:text-2xl font-semibold">
              {data?.university_name}
            </h1>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
              {data?.title}
            </h1>
            <h4 className="max-w-xl text-base lg:text-lg font-normal md:font-medium mt-2 md:mt-6 text-neutral-700">
              {data?.description}
            </h4>
          </div>


          {/* Stats Section */}
          <div className="flex gap-8 my-4 md:my-8 lg:justify-normal justify-center">

            {/* ── CHANGE 1: For IIMV program, show "Number of Hours" instead of "Next Cohort" ── */}
            <div className="flex gap-2 items-center">
              <div className="xl:w-12 w-10 h-10 xl:h-12 md:block hidden flex-shrink-0 bg-green-100 rounded-full p-3">
                <BiSolidTimer className="w-full h-full text-green-500" />
              </div>
              <div className="text-center sm:text-start">
                <h1 className="text-neutral-600 text-nowrap text-xs sm:text-sm xl:text-base font-medium">
                  {isAdmissionClosedProgram ? "Number of Hours" : "Next Cohort"}
                </h1>
                <h4 className="text-[14px] xl:text-xl font-semibold text-universal text-nowrap">
                  {isAdmissionClosedProgram
                    ? `${data?.key_features?.find(f => f.title === "hours")?.count ?? "120"}+ Hours`
                    : data?.enrollments == "inactive"
                      ? "Coming Soon"
                      : data?.start_date}
                </h4>
              </div>
            </div>

            {/* ── CHANGE 2: For IIMV program show "Admission Deadline → Closed", original logic for others ── */}
            {data.enrollments === "active" && (
              <div className="flex gap-2 items-center">
                <div className="xl:w-12 w-10 h-10 xl:h-12 md:block hidden flex-shrink-0 bg-green-100 rounded-full p-3">
                  <MdOutlineHourglassTop className="w-full h-full text-green-500" />
                </div>
                <div className="text-center sm:text-start">
                  <h1 className="text-neutral-600 text-nowrap text-xs sm:text-sm xl:text-base font-medium">
                    {isAdmissionClosedProgram
                      ? "Admission Deadline"
                      : (() => {
                        return startDateObj < admissionDeadlineObj
                          ? "Cohort Status"
                          : "Admission Deadline";
                      })()}
                  </h1>
                  <h4 className="text-[14px] xl:text-xl font-semibold text-universal text-nowrap">
                    {isAdmissionClosedProgram
                      ? "Closed"
                      : (() => {
                        if (startDateObj < admissionDeadlineObj) {
                          return "Closing Soon";
                        }
                        return data?.admission_deadline ? (
                          data?.admission_deadline
                        ) : (
                          <Moment format="D MMM YYYY">{date}</Moment>
                        );
                      })()}
                  </h4>
                </div>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <div className="xl:w-12 w-10 h-10 xl:h-12 md:block hidden flex-shrink-0 bg-green-100 rounded-full p-3">
                <IoCalendarNumberOutline className="w-full h-full text-green-500" />
              </div>
              <div className="text-center sm:text-start">
                <h1 className="text-neutral-600 text-nowrap text-xs sm:text-sm xl:text-base font-medium">
                  Duration
                </h1>
                <h4 className="text-[14px] xl:text-xl font-semibold text-universal text-nowrap">
                  {data?.duration}
                </h4>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex md:flex-row flex-col-reverse items-center gap-0 md:gap-4 lg:justify-normal justify-center w-full md:w-auto">
            <button
              onClick={handleDownloadBrochure}
              disabled={data?.enrollments === "inactive" || allowedIds.includes(data?.id)}
              className="w-full md:w-auto px-4 py-4 md:py-2 disabled:text-white disabled:bg-[#AFAFAF] cursor-pointer disabled:cursor-not-allowed disabled:border disabled:border-slate-300 rounded border border-universal text-universal bg-white hover:text-white hover:bg-universal text-lg md:text-base font-medium mt-4 md:mt-4 drop-shadow-xl"
            >
              Get Brochure
            </button>
            {data?.enrollments === "active" ? (
              <>
                {enrollLoderState ? (
                  <button
                    disabled={enrollLoderState}
                    className="w-full md:w-auto px-4 py-4 md:py-2 rounded bg-universal text-white drop-shadow-xl text-lg md:text-base font-medium mt-4 min-w-[100px]"
                  >
                    <CircularProgress size={15} sx={{ color: "#FFFFFF" }} />
                  </button>
                ) : (
                  <CustomEnrollNowButton
                    data={data}
                    text={"Enroll Now"}
                    className={
                      "w-full md:w-auto px-4 py-4 md:py-2 rounded bg-universal hover:bg-darkBlue active:bg-darkBlue text-white drop-shadow-xl text-lg md:text-base font-medium mt-1 md:mt-4 min-w-[100px]"
                    }
                  />
                )}
              </>
            ) : (
              <>
                {data?.enrollments === "coming-soon" ? (
                  <button className="w-full md:w-auto px-4 py-4 md:py-2 rounded bg-[#AFAFAF] text-white border border-slate-300 drop-shadow-xl text-xl md:text-base font-medium mt-1 md:mt-4 cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <button className="w-full md:w-auto px-4 py-4 md:py-2 rounded bg-[#AFAFAF] text-white border border-slate-300 drop-shadow-xl text-xl md:text-base font-medium mt-1 md:mt-4  cursor-not-allowed">
                    Admission closed
                  </button>
                )}
              </>
            )}
          </div>


          {/* Message Section */}
          {isMain && data?.enrollments !== "inactive" && (
            <div className="lg:text-start text-center flex max-lg:justify-center">
              {isNewProgram ? (
                <h4 className="text-sm font-medium mt-6 lg:max-w-xl">
                  <CircleAlertIcon className="text-rose-400 inline-block w-5 h-5  mr-1" /> Don't wait, Act now! Our newly launched course has already
                  attracted many participants!
                </h4>
              ) : (
                <h4 className="text-sm font-medium mt-6 lg:max-w-xl">
                  {data?.id === "post-graduate-diploma-in-management-for-working-executives"
                    ? <>
                      <HandshakeIcon className="text-green-400 inline-block w-5 h-5  mr-1" /> Marketing Partner Accredian
                    </>
                    : (
                      <>
                        <CircleAlertIcon className="text-rose-400 inline-block w-5 h-5  mr-1" />
                        Act quickly! Over 200 individuals have already enrolled in this program! Begin your journey now.
                      </>
                    )}
                </h4>


              )}
            </div>
          )}


          {/* Tags on Desktop - Below Message */}
          <div className="hidden lg:flex gap-4 lg:justify-normal justify-center mt-4">
            {data?.tags?.map((tag, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: `${getColorAndBgColor(tag.title.toLowerCase()).bgColor
                    }`,
                }}
                className="rounded-md px-2 py-1 w-fit text-center drop-shadow-md"
              >
                <h1
                  style={{
                    color: `${getColorAndBgColor(tag.title.toLowerCase()).color
                      }`,
                  }}
                  className="text-nowrap font-semibold text-xs capitalize"
                >
                  {tag.title}
                </h1>
              </div>
            ))}
          </div>
        </div>


        {/* Right Section - University Card (Desktop Only) */}
        <div className="w-full lg:flex-[0.5] hidden lg:flex justify-end relative gap-4">
          <div className="lg:mx-6 w-full min-h-0 md:min-h-[260px] max-h-[400px] drop-shadow-none md:drop-shadow-md bg-white border overflow-hidden rounded-lg relative flex flex-col">
            <div className="py-2 px-4 bg-white flex items-center md:justify-between justify-center border-b drop-shadow-none md:drop-shadow-md">
              <div
                className={`${data.short_university_name?.toLowerCase() === "iim-trichy"
                  ? "max-w-[120px]"
                  : data.short_university_name?.toLowerCase() === "iim-ranchi"
                    ? "max-w-[60px]"   // ← adjust this value to your liking
                    : data.short_university_name?.toLowerCase() === "iim-amritsar"
                      ? "max-w-[250px]"  // ← adjust this value to your liking
                      : "max-w-[100px]"
                  }`}
              >
                <img
                  className={`${data.short_university_name?.toLowerCase() === "iim-amritsar"
                    ? "w-[400px] h-[55px]"
                    : data?.short_university_name?.toLowerCase() !== "iim-trichy"
                      ? "w-full h-full"
                      : "w-[300px] h-[35px]"
                    } rounded`}
                  src={data?.university_logo}
                  alt="university"
                />
              </div>
              <div
                onClick={handleShare}
                title="share"
                className="w-12 h-12 hidden md:flex flex-shrink-0 p-3 cursor-pointer absolute right-2 md:relative md:right-0"
              >
                <LuShare2 className="w-full h-full text-blue-500" />
              </div>
            </div>


            <div className="w-full h-full relative">
              <img
                className="w-full h-full object-cover"
                src={data?.university_image}
                alt={data?.university_name}
              />
              {data?.university_video && (
                <div
                  onClick={handleVideoOpen}
                  className="absolute right-0 left-0 top-0 bottom-0 z-20 bg-black/30 flex flex-col items-center justify-center cursor-pointer"
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-universal rounded-full animate-pulse">
                    <FaCirclePlay className="w-full h-full text-white" />
                  </div>
                  <h1 className="text-white text-sm font-semibold mt-4">
                    Watch Program Video
                  </h1>
                </div>
              )}
            </div>
            {data?.accredited_by?.length && (
              <div className="absolute right-0 bottom-0 z-30 p-2 md:p-4">
                <div className="max-w-20 sm:max-w-[120px] w-full flex-shrink-0 rounded-md bg-white px-3 py-2">
                  <h3 className="text-[10px] sm:text-xs font-semibold text-neutral-600">
                    Powered By
                  </h3>
                  <img
                    className="w-full h-full rounded mt-1"
                    src={data?.accredited_by[0]}
                    alt="accredited_logo"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <HeroModal open={isVideoOpen} setOpen={setIsVideoOpen} />
    </div>
  );
};


export default Hero;