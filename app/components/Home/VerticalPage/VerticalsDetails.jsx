import { Link, useNavigate, useParams } from "react-router-dom";
import { STREAMS } from "../../../Assets/constants/constants";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";
import PROGRAMS from "../../../Assets/constants/programs.json";
import { useEffect, useState } from "react";
import { CiViewTimeline } from "react-icons/ci";
import Wrapper from "../../Wrappers/Wrapper";
import Brochure from "../../CTA_Modal/download_brochure";
const VerticalDetail = () => {
  const [categorizedPrograms, setCategorizedPrograms] = useState([]);
  const [brotureDownloadInfo, setBrotureDownloadInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    // Filter programs based on the category from URL
    const filteredPrograms = PROGRAMS.filter(
      (program) => program.category.toLowerCase() === category.toLowerCase()
    );
    setCategorizedPrograms(filteredPrograms);
  }, [category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (program) => {
    setBrotureDownloadInfo(program);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full flex justify-center mt-16 font-circular xl:px-12 px-4">
        <div className="w-full max-w-[86rem] h-full flex flex-col gap-4">
          <h4 className="capitalize">
            <Link to="/" className="text-gray-400">
              Home &nbsp;&gt;&nbsp;
            </Link>
            {category}
          </h4>
        </div>
      </div>
      <div className="w-full flex justify-center mt-16 font-circular xl:px-12 px-4">
        <div className="w-full max-w-[86rem] h-full flex flex-col gap-4">
          <div className="w-full flex md:flex-row flex-col justify-normal md:justify-between px-[10px] lg:gap-8 gap-4 items-start md:items-end">
            <div className="w-full">
              <h4 className="text-base text-darkBlue font-medium max-sm:max-w-[300px] capitalize">
                {category}{" "}
                <span className="">({categorizedPrograms.length})</span>
              </h4>
              <h1 className="text-3xl lg:text-[44px] mt-2 font-medium capitalize">
                {category} programs from
                <span className="text-universal"> premier institutes </span>
              </h1>
            </div>
          </div>

          <div className="w-full grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-4 py-8">
            {/* <div className="w-full max-w-[90vw] lg:max-w-[60rem] xl:max-w-[78rem]"> */}
            {categorizedPrograms &&
              categorizedPrograms.map((val, index) => (
                <div className="w-full lg:max-w-[325px] rounded-2xl overflow-hidden bg-white drop-shadow flex flex-col relative">
                  <div className="w-full h-32 flex items-center justify-center bg-blue-50">
                    <img
                      loading="lazy"
                      className="w-full h-full object-cover"
                      src={val.cover_image}
                      alt="cover images"
                    />
                  </div>
                  <div className="w-full pt-4 pb-2 px-4">
                    <div className="w-full flex items-center gap-4">
                      <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 bg-white drop-shadow-md">
                        <img
                          loading="lazy"
                          title={val.university_name}
                          src={val.university_image}
                          className="w-full h-full object-contain rounded-sm"
                          alt={val.university_name}
                        />
                      </div>
                      <h1
                        title={val.university_name}
                        className="text-center font-medium text-xs text-neutral-500 cursor-context-menu"
                      >
                        {val.university_name}
                      </h1>
                    </div>
                    <div className="w-full border-b border-neutral-300 mt-4" />
                  </div>
                  <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
                    <h1 className="font-semibold">{val.program_name}</h1>
                    <div className="w-full">
                      <h2
                        className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu"
                        title={val.tags?.join(", ")}
                      >
                        <span className="text-black">Core skills - </span>
                        {val.tags?.join(", ")}
                      </h2>
                      <div className="flex items-center gap-2">
                        <CiViewTimeline
                          className="text-2xl text-universal/90"
                          strokeWidth={0.5}
                        />
                        <h1 className="text-base font-medium capitalize">
                          {val.duration} -{" "}
                          <span title={val.batch_type}>{val.batch_type}</span>
                        </h1>
                      </div>
                    </div>
                    <div className="flex items-center w-full gap-2 mt-4">
                      <a
                        href={val.category?.toLowerCase() === "free courses" || val.category?.toLowerCase() === "microsoft" || val.id === "transform-business-workflows-with-generative-ai" ? `/free-courses/${val.id}` : `/programs/${val.id}`}
                        className="px-2 py-2.5 flex-1 text-sm font-semibold border border-neutral-300 rounded-lg text-center"
                      >
                        View Program
                      </a>
                      <button
                        className="px-2 py-2.5 flex-1 text-sm font-semibold bg-universal text-white rounded-lg"
                        onClick={() => handleOpen(val)}
                      >
                        Get Brochure
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            {/* </div> */}
          </div>
        </div>
      </div>
      {open && brotureDownloadInfo && (
        <Brochure
          open={open}
          handleClose={handleClose}
          source={brotureDownloadInfo?.brochure?.source}
          campaign_name={brotureDownloadInfo?.brochure?.campaign_name}
          program={brotureDownloadInfo?.category}
          pdf={brotureDownloadInfo?.brochure?.pdf}
          image={brotureDownloadInfo?.brochureHeader}
        />
      )}
    </>
  );
};

export default VerticalDetail;
