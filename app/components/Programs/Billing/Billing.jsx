import React, { useEffect, useState, useMemo } from "react";
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Loader2 } from "lucide-react";
import "./Billing.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import BillingModal from "../../Modals/billing-modal";
import CustomEnrollNowButton from "../CustomEnrollNowButton";
import { Sparkle } from "lucide-react";

const Billing = ({ data: propData }) => {
  const reduxProgram = useSelector((state) => state.program);
  const data = propData || reduxProgram.data;
  const enrollLoderState = reduxProgram.enrollLoderState;
  const dispatch = useDispatch();
  const [billings, setBillings] = useState(null);
  const [showAllPoints, setShowAllPoints] = useState(false);

  const smallestEmi = React.useMemo(() => {
    if (!data?.billing?.monthly_emi?.length) return 0;
    const emiValues = data.billing.monthly_emi.map((item) => {
      if (typeof item.emi === "number") {
        return item.emi;
      } else if (typeof item.emi === "string") {
        const match = item.emi.match(/\d+/);
        return match ? parseInt(match[0], 10) : Infinity;
      }
      return Infinity;
    });

    const minEmi = Math.min(...emiValues);
    return isFinite(minEmi) ? minEmi.toLocaleString("en-IN") : 0;
  }, [data?.billing]);

  const handleEnrollNow = () => {
    if (data) {
      dispatch(programActions.setEnrollState(data));
    }
  };

  const handleBillingsOpen = () => {
    if (data) {
      setBillings(data?.billing);
    }
  };

  const visiblePoints = showAllPoints
    ? data?.billing?.points
    : data?.billing?.points?.slice(0, 3);

  if (!data?.billing) {
    return (
      <div
        id="program fee"
        className="billing w-full flex flex-col justify-center py-6 md:py-12 xl:px-12 px-4"
      >
        <div className="w-full max-w-[85rem] mx-auto animate-pulse">
          <div className="w-full md:text-start text-center">
            <div className="h-4 w-48 bg-slate-200 rounded mx-auto md:mx-0 mb-3" />
            <div className="h-8 w-80 bg-slate-200 rounded mx-auto md:mx-0 mb-6" />
          </div>
          <div className="w-full max-w-6xl h-72 bg-slate-100 rounded-xl border border-slate-200 mx-auto mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div
      id="program fee"
      className="billing w-full flex flex-col justify-center py-6 md:py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem] mx-auto">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">Make Your Investment Count!</h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Program <span className="text-universal">Fees</span> and Highlights:
            An Overview
          </h2>
        </div>

        {/* Mobile View - Exact same as original */}
        <div className="w-full mt-8 md:hidden">
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-full px-6 py-6 text-white relative">
              <button
                onClick={handleBillingsOpen}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-md backdrop-blur-sm bg-white text-black text-xs font-semibold transition-all duration-150"
              >
                View Plans
              </button>
              <div className="pr-20">
                <p className="text-xs font-medium uppercase tracking-wide opacity-90">
                  STARTS AT
                </p>
                <p className="text-4xl font-bold mt-1">
                  ₹{smallestEmi}
                </p>
                <p className="text-sm mt-1 opacity-90">per month</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs font-medium opacity-90">Total Fee</p>
                  <h2 className="text-xl font-bold mt-1">
                    ₹{data?.billing?.total?.toLocaleString("en-IN")}
                    {data?.id !==
                      "post-graduate-diploma-in-management-for-working-executives" && (
                        <span className="text-sm font-normal ml-1">+ GST</span>
                      )}
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-white px-6 py-6">
              <h2 className="text-base font-semibold text-slate-900 uppercase tracking-wide">
                PROGRAM HIGHLIGHTS
              </h2>
              <div className="w-full mt-4 flex flex-col gap-3">
                {visiblePoints?.map((point, index) => (
                  <div key={index} className="w-full flex gap-3 items-start">
                    <div className="w-5 h-5 flex-shrink-0 mt-[2px]">
                      <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-slate-800">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
              {data?.billing?.points?.length > 3 && (
                <button
                  onClick={() => setShowAllPoints(!showAllPoints)}
                  className="w-full mt-2 py-2 text-universal font-semibold text-sm flex items-center justify-center gap-1"
                >
                  {showAllPoints ? "Show Less" : "Show More"}
                  <IoIosArrowForward
                    className={`w-4 h-4 transition-transform duration-200 ${showAllPoints ? "rotate-90" : ""
                      }`}
                  />
                </button>
              )}
              <div className="mt-2">
                {data?.enrollments === "active" ? (
                  <>
                    {enrollLoderState ? (
                      <button
                        disabled={enrollLoderState}
                        className="w-full px-6 py-4 rounded-lg bg-universal text-white text-lg font-bold flex items-center justify-center gap-1"
                      >
                        <Loader2 className="w-4 h-4 animate-spin text-white inline-block" />
                      </button>
                    ) : (
                      <CustomEnrollNowButton
                        data={data}
                        text={"Apply Now"}
                        className={
                          "w-full px-6 py-4 rounded-lg bg-universal text-white text-lg font-bold flex items-center justify-center gap-1"
                        }
                      />
                    )}
                  </>
                ) : (
                  <>
                    {data?.enrollments === "coming-soon" ? (
                      <button className="w-full px-6 py-4 rounded-lg bg-neutral-400 text-white text-lg font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <button className="w-full px-6 py-4 rounded-lg bg-neutral-400 text-white text-lg font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                        Admission closed
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop - COLORS SWAPPED, POSITIONS SAME */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl hidden md:grid md:grid-cols-2 mx-auto shadow-lg rounded-xl overflow-hidden gap-0 mt-8">
          {/* LEFT: Blue background with HIGHLIGHTS content (color swapped) */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-6 text-white flex flex-col relative overflow-hidden">
            {/* <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1 z-20">
                  <Sparkle size={15} />
                  <span className="text-xs font-semibold">Premium Features</span>
                </div> */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
            </div>
            <div className="relative z-10 flex flex-col h-full items-center">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-white/20 text-white backdrop-blur-sm rounded-full text-xs font-semibold">
                  🚀 Premium Program
                </span>
              </div>
              <h2 className="text-xl font-bold mb-2 text-center">Why Choose This Program?</h2>
              <p className="text-blue-100 text-[16px] mb-5 text-center opacity-90">
                Designed for ambitious professionals ready to accelerate their careers
              </p>
              <div className="flex flex-col gap-3.5">
                {data?.billing?.points?.map((point, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                      <IoMdCheckmarkCircleOutline className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="font-medium text-[16px] leading-relaxed text-left flex-1 opacity-95">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: White background with PRICING content (color swapped) */}
          <div className="bg-white p-6 flex flex-col relative z-10">
            <div className="absolute top-4 right-4 bg-blue-100/80 backdrop-blur-sm rounded-xl px-3 py-1.5 flex items-center gap-1 z-20">
              <Sparkle size={15} className="text-blue-500" />
              <span className="text-blue-700 text-xs font-semibold">Most Popular Plan</span>
            </div>
            <div className="relative flex flex-col h-full pt-12">
              <div className="mb-5 text-center">
                <p className="text-xl font-semibold text-slate-900 mb-1">Starting at Just</p>
                <p className="text-4xl font-bold text-slate-900 leading-tight">
                  ₹{smallestEmi}
                </p>
                <p className="text-base mt-0.5 text-slate-700 font-semibold">per month</p>
                <button
                  onClick={handleBillingsOpen}
                  className="text-blue-600 text-sm font-semibold underline mt-1 hover:text-blue-700"
                >
                  View All Plans
                </button>
              </div>
              <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 pt-2 mb-5 border border-blue-100">
                <p className="text-xl font-medium mb-1 text-slate-900">
                  Total Program Investment
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  ₹{data?.billing?.total?.toLocaleString("en-IN")}
                  {data?.id !==
                    "post-graduate-diploma-in-management-for-working-executives" && (
                      <span className="text-base font-normal ml-1 text-slate-700">+ GST</span>
                    )}
                </h2>
              </div>
              <div className="mt-auto space-y-2.5">
                {data?.enrollments === "active" ? (
                  <>
                    {enrollLoderState ? (
                      <button
                        disabled={enrollLoderState}
                        className="w-full px-5 py-3.5 rounded-lg bg-blue-600 text-white text-base font-bold flex items-center justify-center gap-2 shadow-lg"
                      >
                        <Loader2 className="w-4 h-4 animate-spin text-white inline-block" />
                      </button>
                    ) : (
                      <CustomEnrollNowButton
                        data={data}
                        text={
                          <>
                            Apply Now <IoIosArrowForward className="w-4 h-4" />
                          </>
                        }
                        className="w-full px-5 py-3.5 rounded-lg bg-blue-600 text-white text-base font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 transition-all duration-150"
                      />
                    )}
                  </>
                ) : (
                  <>
                    {data?.enrollments === "coming-soon" ? (
                      <button className="w-full px-5 py-3.5 rounded-lg bg-slate-200 text-slate-700 text-base font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <button className="w-full px-5 py-3.5 rounded-lg bg-slate-200 text-slate-700 text-base font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                        Admission closed
                      </button>
                    )}
                  </>
                )}
                {/* <p className="text-center text-xs text-slate-600 mt-3">
                      ⚡ Trusted by 5000+ professionals worldwide
                    </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BillingModal open={billings} setOpen={setBillings} />
    </div>
  );

};

export default Billing;
