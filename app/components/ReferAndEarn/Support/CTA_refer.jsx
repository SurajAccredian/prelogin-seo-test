"use client";

import { RiCustomerService2Fill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import Rcta from "../../cta/request_a_call_back";
import "./CTA_refer.css";

const CTA_refer = () => {
  const [cta, setCta] = useState(false);
  const handleClickOpenRcb = () => {
    setCta(true);
  };
  const RcbhandleClose = () => {
    setCta(false);
  };
  return (
    <div
      id="supportSection"
      className="cta flex justify-center w-full py-8 md:py-12 xl:px-12 px-4"
    >
      <div className="cta-grad border border-universal w-full max-w-[85rem] py-8 md:py-16 md:px-12 px-6 bg-universal rounded-xl flex items-center md:justify-between md:flex-row flex-col gap-6">
        <div className="flex gap-8 md:flex-row flex-col md:items-start items-center">
          <div className="w-20 h-20 flex-shrink-0 bg-slate-200/35 rounded-xl p-1">
            <div className="w-full h-full bg-white rounded-xl p-2">
              <RiCustomerService2Fill className="w-full h-full text-universal" />
            </div>
          </div>
          <div className="md:text-start text-center">
            <h1 className="text-2xl md:text-3xl font-semibold text-white font-circular">
              Have questions about referrals?
            </h1>
            <h4 className="text-base md:text-lg mt-2 max-w-xl font-medium text-neutral-100 font-circular">
              Get expert guidance today!
            </h4>
          </div>
        </div>
        <button
          onClick={handleClickOpenRcb}
          className="cta-button w-full max-w-[200px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1 font-circular"
        >
          Get in touch
          <IoIosArrowForward />
        </button>
      </div>
      <Rcta open={cta} handleClose={RcbhandleClose} />
    </div>
  );
};

export default CTA_refer;
