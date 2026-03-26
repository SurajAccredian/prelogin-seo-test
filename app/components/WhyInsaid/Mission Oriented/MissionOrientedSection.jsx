import React from "react";

import { FaChalkboardTeacher, FaUniversity } from "react-icons/fa";
import { RiLiveLine } from "react-icons/ri";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { ChartNoAxesCombined, Factory } from "lucide-react";
import { LiaIndustrySolid } from "react-icons/lia";
import { IoIosBuild } from "react-icons/io";

const items = [
  {
    icon: <LiaIndustrySolid className="w-12 h-12 text-universal" />,
    title: "Industry-Relevant Curriculum",
  },
  {
    icon: <RiLiveLine className="w-12 h-12 text-universal" />,
    title: "Career-Centric Learning",
  },
  {
    icon: <FaChalkboardTeacher className="w-12 h-12 text-universal" />,
    title: "Mentorship That Matters",
  },
  {
    icon: <IoIosBuild className="w-12 h-12 text-universal" />,
    title: "Built for Working Professionals",
  },
  {
    icon: <ChartNoAxesCombined className="w-12 h-12 text-universal" />,
    title: "Supportive Growth Ecosystem",
  },
  {
    icon: <MdOutlineAssignmentTurnedIn className="w-12 h-12 text-universal" />,
    title: "Outcome-Oriented Approach",
  },
];

export default function MissionOriented() {
  return (
    <>
      <div className="w-full flex justify-center mt-0 sm:mt-10 py-10 xl:px-12 px-4">
        <div className="max-w-[85rem] w-full">
          <div className="w-full text-center">
            <h4 className="text-base font-medium">
              Built for Growth. Designed for Change.
            </h4>
            <h1 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
              Empowering Ambitious <span className="text-universal">  Professionals</span>
              
            </h1>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-12">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-6 bg-gray-50 hover:shadow-md rounded-2xl transition duration-300"
              >
                <div className="mb-4">{item.icon}</div>
                <p className="text-lg font-semibold text-gray-800">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
