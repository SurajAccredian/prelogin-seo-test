
import "../mentor.css";

const mentorHero = () => {
  return (
    <div
      id="mentorHero"
      className="flex justify-center items-center my-4 md:mt-8 md:mt-4 xl:px-12 px-4 mb-10 md:mb-0"
    >
      <div className="">
        <div className="max-w-[75rem]  rounded-lg md:rounded-3xl relative bg-blue-50 flex flex-row md:flex-row items-center justify-center md:justify-between gap-0 sm:gap-4 md:gap-8 lg:gap-12 px-0 pb-4 md:p-4 shadow-card overflow-visible mentor-hero-card">
          <div className="l-con flex flex-col justify-center items-center md:items-start gap-2 md:gap-6 lg:gap-10 md:ps-2 lg:ps-8">
            <h1 className="text-center md:text-start cursor-context-menu text-2xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[5.2vw] 3xl:text-[5.0rem] font-bold max-w-sm md:max-w-[200px] lg:max-w-[700px] xl:max-w-[1000px] 2xl:max-w-[1000px] 3xl:max-w-[1000px] pt-2 capitalize px-8 sm:px-0 font-circular">
              <span className="inline-block whitespace-nowrap">
                Join Our Expert
              </span>
              <br />
              <span className="inline-block">Community</span>
            </h1>
            <p className="font-medium md:font-normal text-sm md:text-xl md:max-w-[1000px] lg:text-xl text-paleBlack text-center md:text-start font-circular">
              Share Your Knowledge, Engage with Top Professionals, and Make a Difference
              {/* <span className="text-universal font-bold text-xl md:text-2xl lg:text-4xl">
                ₹10,000
              </span> */}
            </p>
            <a href="/career/mentor/application" target="__blank" className="text-sm drop-shadow-xl xl:text-base font-medium xl:px-6 xl:py-2 px-5 py-1.5 bg-universal text-white hover:bg-darkBlue border border-universal rounded-[4px] capitalize cursor-pointer font-circular z-[10]">
              Become a Trainer
            </a>
          </div>

          <img
            className="mentorImage absolute right-[10px] bottom-[-88px] w-[1200px] overflow-hidden "
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/mentorImage.webp"
            alt="Mentor"
          />

          <div className="r-con home-4-container-right md:py-0 py-12 md:flex hidden justify-center ">
            <div className="relative hidden md:block w-full sm:w-[70%] md:w-[40vw] lg:w-[45vw] 3xl:w-[42rem]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default mentorHero;
