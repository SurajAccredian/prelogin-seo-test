import { RiCustomerService2Fill } from "react-icons/ri";

import "./CTA.css"
import { IoIosArrowForward } from "react-icons/io";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useSelector } from "react-redux";

const CtaModal = dynamic(() => import("../../Modals/call-to-actions/get-in-touch"), { ssr: false });

const CTA = ({ data: propData }) => {
  const reduxProgram = useSelector(state => state.program);
  const data = propData || reduxProgram.data;
  const [isModalOpen, setIsModalOpen] = useState(null)

  const handleModalOpen = () => {
    if (data) {
      setIsModalOpen({ ...data, source: "Get in touch" });
    }
  };

  return (
    <div className='cta flex justify-center w-full py-8 md:py-12 xl:px-12 px-4'>
      <div className='cta-grad border border-universal w-full max-w-[85rem] py-4 md:py-16 md:px-12 px-4 bg-universal rounded-xl flex items-center md:justify-between md:flex-row flex-col gap-6'>
        <div className='flex md:gap-8 gap-2 flex-row md:items-start items-center'>
          <div className='w-16 h-16 flex-shrink-0 bg-slate-200/35 rounded-xl p-1'>
            <div className="w-full h-full bg-white rounded-xl p-2">
              <RiCustomerService2Fill className="w-full h-full text-universal" />
            </div>
          </div>
          <div className="text-start">
            <h2 className="text-2xl md:text-3xl font-semibold text-white max-md:hidden">Want to delve deeper into the program?</h2>
            {/* <h4 className="text-base md:text-lg mt-2 max-w-xl font-medium text-neutral-100">Share your details to receive expert insights from our program team!</h4> */}
            <h4 className="text-lg md:mt-2 max-w-xl font-medium text-neutral-100">Connect with an expert for clear program insights!</h4>
          </div>
        </div>
        <button onClick={handleModalOpen} className="cta-button w-full md:max-w-[200px] px-4 py-3 md:mt-4 rounded-lg text-blue-500 bg-white text-lg md:text-xl font-semibold flex items-center justify-center gap-1">
          Get in touch
          <IoIosArrowForward />
        </button>
      </div>
      <CtaModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  )
}

export default CTA