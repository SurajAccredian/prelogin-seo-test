"use client";

import { Coins, FastForward, Infinity } from "lucide-react";
import { useSelector } from "react-redux";

const Benefits = () => {
  const { data } = useSelector((state) => state.program);
  return (
    <div
      id="benefitsSection"
      className="tools my-10 w-full overflow-hidden flex flex-col items-center py-12 xl:px-12 px-4 capitalize"
    >
      <h2 className="text-xl sm:text-2xl md:text-4xl pb-6 font-semibold text-center font-circular">
        What are the Referral Benefits?
      </h2>
      <div className="w-full max-w-[85rem] flex justify-center p-4 text-center">
        <div>
          <div className="hidden md:flex justify-start  p-4 gap-10 rounded-xl">
            {/* {data.stats.map((stats, index) => {
              return ( */}
            <div
              className={`flex flex-col justify-start gap-4    items-center border-r-2 pr-6  `}
            >
              <div className="text-2xl text-universal font-semibold w-16 h-16 bg-blue-100 p-4 rounded-full">
                <div>
                  <Coins className="w-full h-full" />
                </div>
              </div>
              <div className="text-xl font-medium">
                <p className="max-w-[300px]">Earn  ₹10K per successful Referral</p>
              </div>
            </div>

            <div
              className={`flex flex-col justify-start gap-4    items-center border-r-2 pr-6  `}
            >
              <div className="text-2xl text-universal font-semibold w-16 h-16 bg-blue-100 p-4 rounded-full">
                <div>
                  <FastForward className="w-full h-full" />
                </div>
              </div>
              <div className="text-xl font-medium">
                <p className="max-w-[300px]">Quick and Easy Referral process</p>
              </div>
            </div>

            <div
              className={`flex flex-col justify-start gap-4    items-center  pr-6  `}
            >
              <div className="text-2xl text-universal font-semibold w-16 h-16 bg-blue-100 p-4 rounded-full">
                <div>
                  <Infinity className="w-full h-full" />
                  {/* <Infinity /> */}
                </div>
              </div>
              <div className="text-xl font-medium">
                <p className="max-w-[300px]">Unlimited Referral Potential</p>
              </div>
            </div>
          </div>

          <div className="md:hidden grid grid-cols-1  p-4 gap-10 rounded-xl">
            <div className={`flex justify-start items-center text-left  gap-4`}>
              <div className="text-2xl text-universal text-center font-semibold w-full h-full max-w-[50px] max-h-[50px] bg-blue-100 p-2 rounded-full">
                <div>
                  <Coins className="w-full h-full" />
                </div>
              </div>
              <div>
                <p className="">Earn Rs. 10,000 per Referral</p>
              </div>
            </div>

            <div className={`flex justify-start items-center text-left  gap-4`}>
              <div className="text-2xl text-universal text-center font-semibold w-full h-full max-w-[50px] max-h-[50px] bg-blue-100 p-2 rounded-full">
                <div>
                  <FastForward className="w-full h-full" />
                </div>
              </div>
              <div>
                <p className="">Quick and Easy Referral process</p>
              </div>
            </div>

            <div className={`flex justify-start items-center text-left  gap-4`}>
              <div className="text-2xl text-universal text-center font-semibold w-full h-full max-w-[50px] max-h-[50px] bg-blue-100 p-2 rounded-full">
                <div>
                  <Infinity className="w-full h-full" />
                </div>
              </div>
              <div>
                <p className="">Unlimited Referral Potential</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
