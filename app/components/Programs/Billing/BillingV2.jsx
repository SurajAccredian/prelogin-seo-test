import React, { useEffect, useState } from "react";
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import "./Billing.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import BillingModal from "../../Modals/billing-modal";
import CustomEnrollNowButton from "../CustomEnrollNowButton";

const BillingV2 = () => {
  const { data, enrollLoderState } = useSelector((state) => state.program);
  const dispatch = useDispatch();
  const [billings, setBillings] = useState(null);
  const [showAllPoints, setShowAllPoints] = useState(false);
  const [smallestEmi, setSmallestEmi] = useState(0);

  useEffect(() => {
    if (data?.billing) {
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
      setSmallestEmi(minEmi.toLocaleString("en-IN"));
    }
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

  return (
    <div
      id="program fee"
      className="billing w-full flex justify-center py-6 md:py-12 xl:px-12 px-4"
    >
      <div className="w-full max-w-[85rem]">
        <div className="w-full md:text-start text-center">
          <h4 className="text-base font-medium">Make Your Investment Count!</h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Program <span className="text-universal">Fees</span> and Highlights:
            An Overview
          </h2>
        </div>

        {/* Mobile View - Exact Design */}
        <div className="w-full mt-8 md:hidden">
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            {/* Top Section - bg-universal */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 w-full px-6 py-6 text-white relative">
              <button
                onClick={handleBillingsOpen}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-md  backdrop-blur-sm bg-white text-black  text-xs font-semibold transition-all duration-150"
              >
                View Plans
              </button>

              <div className="pr-20">
                <p className="text-xs font-medium uppercase tracking-wide opacity-90">
                  STARTS AT
                </p>
                <p className="text-4xl font-bold mt-1">
                  &#x20B9;{smallestEmi}
                </p>
                <p className="text-sm mt-1 opacity-90">per month</p>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs font-medium opacity-90">Total Fee</p>
                  <h2 className="text-xl font-bold mt-1">
                    &#x20B9;{data?.billing?.total.toLocaleString("en-IN")}
                    {data?.id !==
                      "post-graduate-diploma-in-management-for-working-executives" && (
                        <span className="text-sm font-normal ml-1">+ GST</span>
                      )}
                  </h2>
                </div>
              </div>
            </div>

            {/* Bottom Section - White Background */}
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

              {/* Apply Now Button */}
              <div className="mt-2">
                {data?.enrollments === "active" ? (
                  <>
                    {enrollLoderState ? (
                      <button
                        disabled={enrollLoderState}
                        className="w-full px-6 py-4 rounded-lg bg-universal text-white text-lg font-bold flex items-center justify-center gap-1"
                      >
                        <CircularProgress size={18} sx={{ color: "#fff" }} />
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

        {/* Desktop View - Original Layout */}
        <div className="w-full hidden md:flex max-md:items-center gap-4 lg:flex-row flex-col md:gap-8 mt-8 md:mt-12">
          <div className="w-full lg:max-w-sm border border-neutral-300 rounded-xl bg-white px-6 py-6">
            <h3 className="text-lg md:text-xl font-semibold">
              Key Program Highlights
            </h3>
            <div className="w-full mt-4 flex flex-col gap-3 md:gap-4">
              {data?.billing?.points.map((point, index) => (
                <div key={index} className="w-full flex gap-4 items-start">
                  <div className="md:w-6 md:h-6 h-5 w-5 flex-shrink-0 mt-[2px]">
                    <IoMdCheckmarkCircleOutline className="w-full h-full text-green-500" />
                  </div>
                  <p className="text-base md:text-lg font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full">
            <div className="billing-grad w-full border overflow-hidden bg-universal rounded-xl flex items-center justify-between md:flex-row flex-col p-2 md:p-[2px]">
              <div className="w-full md:flex-[0.6] h-full bg-white md:text-start text-center py-12 md:py-24 px-6 md:px-12 rounded-xl border border-universal">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold ">
                  Starts at Just &#x20B9; {smallestEmi}/month
                </h3>
                <h4 className="text-base md:text-lg mt-2 max-w-xl font-semibold md:font-medium text-neutral-600">
                  Program Fee: &#x20B9;{" "}
                  {data?.id ==
                    "post-graduate-diploma-in-management-for-working-executives"
                    ? data?.billing?.total.toLocaleString("en-IN")
                    : data?.billing?.total.toLocaleString("en-IN") + " + GST"}
                </h4>
              </div>

              <div className="w-full md:flex-[0.4] flex-col flex items-center justify-center py-8 md:py-16 px-4 rounded-xl">
                {data?.enrollments === "active" ? (
                  <>
                    {enrollLoderState ? (
                      <button
                        disabled={enrollLoderState}
                        className="text-nowrap w-full max-w-[250px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1"
                      >
                        <CircularProgress
                          size={15}
                          sx={{ color: "#1A73E8" }}
                        />
                      </button>
                    ) : (
                      <CustomEnrollNowButton
                        data={data}
                        text={"Apply Now"}
                        className={
                          "text-nowrap w-full max-w-[250px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1"
                        }
                      />
                    )}
                  </>
                ) : (
                  <>
                    {data?.enrollments === "coming-soon" ? (
                      <button className="text-nowrap w-full max-w-[200px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1 cursor-not-allowed">
                        Coming Soon
                      </button>
                    ) : (
                      <button className="text-nowrap w-full max-w-[200px] px-4 py-3 mt-4 rounded-lg text-blue-500 bg-white text-xl font-semibold flex items-center justify-center gap-1 cursor-not-allowed">
                        Admission closed
                      </button>
                    )}
                  </>
                )}

                <button
                  onClick={handleBillingsOpen}
                  className="w-full text-white underline mt-2"
                >
                  View all Plans
                </button>
              </div>
            </div>
            {/* <div className="border border-neutral-300 w-full py-6 md:py-16 px-6 md:px-12 rounded-xl flex items-center justify-between md:flex-row flex-col gap-6">
              <div className="md:text-start text-center">
                <h1 className="text-xl md:text-2xl font-semibold text-slate-800">
                  Are you ready to embark on a journey of growth and
                  transformation? Start today!
                </h1>
                <h4 className="text-base md:text-lg mt-4 max-w-xl font-medium text-neutral-500 max-md:hidden">
                  Limited Spots Available: Apply Now and Take the First Step
                </h4>
              </div>
              <button
                onClick={handleBillingsOpen}
                className="w-full max-w-[200px] px-4 py-3 mt-4 rounded-lg text-universal transition-all duration-150 hover:bg-universal/10 text-base md:text-lg font-medium flex items-center justify-center gap-1 border border-blue-100"
              >
                View all Plans
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <BillingModal open={billings} setOpen={setBillings} />
    </div>
  );
};

export default BillingV2;
