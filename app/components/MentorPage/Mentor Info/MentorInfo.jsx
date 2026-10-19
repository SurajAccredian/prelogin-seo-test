import React from "react";

import { RiLiveLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  MdOutlineAssignmentTurnedIn,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

import { LuPackagePlus } from "react-icons/lu";

import mentorOverview from "../../Assets/mentor-overview.json";

const FeatureIcons = {
  "professionals trained": <FaChalkboardTeacher className="w-full h-full" />,
  "program satisfaction": (
    <MdOutlineAssignmentTurnedIn className="w-full h-full" />
  ),

  tools: <LuPackagePlus className="w-full h-full" />,
  "positive career impact": (
    <BsGraphUpArrow className="w-full h-full" />
  ),
  "live sessions": <RiLiveLine className="w-full h-full" />,
  "million hours": <RiLiveLine className="w-full h-full" />,
};

const MentorInfo = () => {
  const renderFeature = (feature) => {
    if (
      mentorOverview?.key_features?.some(
        (item) => item.title.toLowerCase() === feature.title.toLowerCase()
      )
    ) {
      return (
        <div className="relative flex items-center border-2 shadow-2xl p-3 sm:border-0 flex-col text-center sm:flex-col md:flex-col md:text-center lg:flex-row lg:text-left  sm:text-center  bg-white sm:p-0 h-[150px] sm:shadow-none rounded-lg overflow-hidden">
          <div className="w-16 md:w-20 h-16 md:h-20 flex-shrink-0 p-4 text-universal">
            {FeatureIcons[feature.title.toLowerCase()]}
          </div>

          <div className="sm:ml-0 flex-1">
            <p className="text-lg md:text-2xl text-slate-800 font-semibold break-words">
              {feature.count && `${feature.count}+`}
            </p>
            <p className="text-lg md:text-2xl text-slate-800 font-semibold break-words">
              {feature.text && `${feature.text}`}
            </p>
            <h4 className="text-xs md:text-base font-medium text-neutral-600 whitespace-normal capitalize">
              {feature.title}
            </h4>
          </div>
        </div>
      );

    }
    return null;
  };

  return (
    <div className="info second-bg-grad w-full flex justify-center xl:px-12 px-4 py-8 md:py-12 mt-4">
      <div className="w-full max-w-[85rem]">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Transforming Careers with
            <span className="text-universal"> Proven Excellence</span>
          </h2>
        </div>
        <div className="flex-[0.5] grid grid-cols-2 md:grid-cols-2 mt-10 lg:grid-cols-4 gap-4">
          {mentorOverview?.key_features?.map((feature, index) => (
            <React.Fragment key={index}>
              {renderFeature(feature)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorInfo;
