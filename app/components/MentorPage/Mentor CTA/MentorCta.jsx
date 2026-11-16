
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import "./CTA_mentor.css";

const MentorCta = () => {
  // const handleClickOpenMentorForm = () => {
  //   window.open(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/Career/mentor/application`,
  //     "_blank"
  //   );
  // };

  return (
    <div
      id="supportSection"
      className="cta flex justify-center w-full py-8 md:py-12 xl:px-12 px-4"
    >
      <div className="cta-grad border border-universal w-full max-w-[85rem] py-8 md:py-16 md:px-12 px-6 bg-universal rounded-xl flex items-center md:justify-between md:flex-row flex-col gap-6">
        <div className="flex gap-8 md:flex-row flex-col md:items-start items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-200/35 rounded-xl p-1">
            <div className="w-full h-full bg-white rounded-xl p-2 flex items-center justify-center">
              <Image
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/hanshake.svg"
                className="w-full h-full object-contain"
                alt="Handshake"
                width={60}
                height={60}
                quality={75}
              />
              {/* <RiCustomerService2Fill className="w-full h-full text-universal" /> */}
            </div>
          </div>
          <div className="md:text-start text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-circular">
              Join Us in Revolutionizing Education
            </h2>
            <h4 className="text-base md:text-lg mt-2 max-w-xl font-medium text-neutral-100 font-circular">
              Apply Now to Shape the Future
            </h4>
          </div>
        </div>

        <button className="w-full max-w-[200px] outline-none mt-4 rounded-lg text-blue-500 bg-white text-base font-semibold flex items-center justify-center gap-1">
          <a
            href="/career/mentor/application"
            target="_blank"
            className="h-full w-full px-4 py-3 flex items-center justify-center gap-1"
          >
            Apply Now <IoIosArrowForward />
          </a>
        </button>
      </div>
    </div>
  );
};

export default MentorCta;
