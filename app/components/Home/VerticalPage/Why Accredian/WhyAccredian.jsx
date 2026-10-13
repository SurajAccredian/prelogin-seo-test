import { useSelector } from "react-redux";
import "./whyAccredian.css";
import { FiTrendingUp } from "react-icons/fi";
import { FaPeopleGroup, FaRegAddressCard } from "react-icons/fa6";
import { FaChalkboardTeacher, FaUniversity } from "react-icons/fa";
import { CgExtensionAdd } from "react-icons/cg";
import { GrDocumentPerformance } from "react-icons/gr";
import { RiPresentationFill } from "react-icons/ri";
import { MdGroups2, MdLibraryBooks } from "react-icons/md";
import { IoBagHandleSharp } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { LuPackagePlus } from "react-icons/lu";
import { BookHeadphones, BookOpenText, ShieldQuestion } from "lucide-react";
const WhyAccredian = ({ data: propData }) => {
  const { data: reduxData } = useSelector((state) => state.program);
  const data = propData || reduxData;

  return (
    <div
      id="why accredian"
      className="tools w-full overflow-hidden flex flex-col items-center py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem] text-center capitalize">
        <h4 className="text-base font-medium">
          The <span className="text-universal"> Accredian Advantage</span>
        </h4>
        <h1 className="text-2xl md:text-3xl mt-2 font-semibold ">
          Transformative{" "}
          <span className="text-universal">Features of Our Programs</span>{" "}
        </h1>
      </div>
      <div className="w-full md:max-w-[75rem] grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center sm:items-center gap-4 mt-12">
        {data?.whyaccredian?.includes("campus immersion") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0 ">
              <div className=" text-blue-600 flex-shrink-0">
                <FaUniversity className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Engaging Campus Immersion
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("carrer assistance sessions") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <FaGraduationCap className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Dedicated Career Assistance Sessions
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("online classes") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <FaChalkboardTeacher className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              100% Live Online Classes
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("certificate") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <FaRegAddressCard className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Certification from Premier Institutions
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("doubt clearing") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className="text-blue-600 flex-shrink-0">
                <RiPresentationFill className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Interactive Doubt-Clearing sessions
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("query resolution") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <ShieldQuestion className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Quick Query Resolution
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("student support") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <BookHeadphones className="w-full h-full" />
                {/* <FaRegAddressCard className="w-full h-full" /> */}
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Lifelong Student Support
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("tools") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <LuPackagePlus className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Hands-On {data.id} Tools
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("case-study") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <BookOpenText className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Real-World Case Studies
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("CXO-coaching-sessions") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <FaPeopleGroup className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              CXO Coaching Sessions
            </h4>
          </div>
        )}

        {data?.whyaccredian?.includes("simulation") && (
          <div className="rounded-2xl bg-white drop-shadow-xl border flex  mb-6  items-center justify-center min-h-[4rem] max-w-[15rem] w-full">
            <div className="md:w-10 w-8 md:h-10 h-8 flex-shrink-0">
              <div className=" text-blue-600 flex-shrink-0">
                <MdLibraryBooks className="w-full h-full" />
              </div>
            </div>
            <h4 className="text-sm font-semibold capitalize ml-4 w-[130px]">
              Practical Simulations
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhyAccredian;
