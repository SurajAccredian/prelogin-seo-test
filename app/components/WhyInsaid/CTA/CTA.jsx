"use client"
import { RiCustomerService2Fill } from "react-icons/ri";

import "./CTA.css";
import { IoIosArrowForward } from "react-icons/io";
import CtaModal from "./CtaModal";
import { useState } from "react";
const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="cta flex justify-center w-full py-8 mt-6 md:py-12 xl:px-12 px-4">
      <div className="cta-grad border border-universal w-full max-w-[85rem] py-8 md:py-16 md:px-12 px-6 bg-universal rounded-xl flex items-center md:justify-between md:flex-row flex-col gap-6">
        <div className="flex gap-8 md:flex-row flex-col md:items-start items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-200/35 rounded-xl p-1">
            <div className="w-full h-full bg-white rounded-xl p-2">
              <RiCustomerService2Fill className="w-full h-full text-universal" />
            </div>
          </div>
          <div className="md:text-start text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white">
              Achieve the Career Growth You Deserve
            </h2>
            {/* <h4 className="text-base md:text-lg mt-2 max-w-xl font-medium text-neutral-100">Share your details to receive expert insights from our program team!</h4> */}
            <h4 className="text-base hidden sm:block md:text-lg mt-2 max-w-xl font-medium text-neutral-100">
              Join thousands of professionals who have transformed their careers
              with Accredian’s expert-led programs.
            </h4>
          </div>
        </div>
        <button
          onClick={handleModalOpen}
          className="cta-button w-full max-w-[200px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1"
        >
          Get in Touch
          <IoIosArrowForward />
        </button>
      </div>
      <CtaModal open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
};

export default CTA;
