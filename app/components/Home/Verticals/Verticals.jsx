"use client";

import { useRouter } from "next/navigation";
import { STREAMS } from "../../Assets/constants";
import "./verticals.css";
import programs from "../../Assets/programs.json";
import { useEffect, useState } from "react";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";

const Verticals = () => {
  const sortedStreams = STREAMS.slice().sort((a, b) => a.order - b.order);
  const [categorizedPrograms, setCategorizedPrograms] = useState([]);

  useEffect(() => {
    function setData() {
      const fetchPrograms = groupProgramsByCategory(programs);
      setCategorizedPrograms(fetchPrograms || []);
    }
    setData();
  }, []);

  const router = useRouter();

  return (
    <>
      <div className="w-full flex justify-center mt-16 font-circular xl:px-12 px-4 py-8">
        <div className="w-full max-w-[86rem] h-full flex flex-col gap-4">
          <div className="w-full flex md:flex-row flex-col justify-normal md:justify-between px-[10px] lg:gap-8 gap-4 items-start md:items-end">
            <div className="w-full">
              <h4 className="text-base capitalize text-darkBlue font-medium max-sm:max-w-[300px]">
                Verticals
              </h4>
              <h2 className="text-3xl lg:text-[44px] mt-2 font-medium capitalize">
                Browse interested
                <span className="text-universal"> verticals</span>
              </h2>
            </div>
          </div>

          {/* DESKTOP VERSION */}
          <div className="hidden md:flex justify-center mt-4">
            <div className="w-full max-w-[76rem] flex justify-center items-center gap-4 mt-4 flex-wrap">
              {sortedStreams.map((val, index) => {
                let vertical = val.category.toLowerCase();
                if (vertical === "pg diploma" || vertical === "design thinking" || vertical === "digital transformation" || vertical === "product management" || vertical == "microsoft" || vertical == "free courses") {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="max-w-[330px] hover:bg-gray-100 hover:transition ease-in-out hover:shadow-xl w-full bg-white px-8 py-4 rounded-xl drop-shadow font-dmSans flex flex-col justify-between cursor-pointer group"
                    onClick={() =>
                      window.open(
                        `${window.location.origin}/course/${val.category.replace(/ /g, "-")}`,
                        "_blank"
                      )
                    }
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 relative bg-universal/15 bg-white group-hover:transition ease-in-out group-hover:bg-gray-100">
                        <val.icon className="w-full h-full text-universal"></val.icon>
                      </div>
                      <div className="">
                        <h3 className="text-lg font-medium capitalize">
                          {val.category}
                        </h3>
                        <h4 className="text-gray-500">
                          {categorizedPrograms[vertical]?.length}{" "}
                          {categorizedPrograms[vertical]?.length === 1
                            ? "Course"
                            : "Courses"}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE VERSION 1: Compact Horizontal */}
          <div className="flex md:hidden justify-center mt-4">
            <div className="w-full flex flex-col gap-2.5">
              {sortedStreams.map((val, index) => {
                let vertical = val.category.toLowerCase();
                if (vertical === "pg diploma") {
                  return null;
                }
                return (
                  <div
                    key={index}
                    className="w-full bg-white px-3 py-2.5 rounded-lg shadow-sm border border-l-4 border-l-blue-500 flex items-center gap-3 cursor-pointer active:bg-gray-50 transition-colors"
                    onClick={() =>
                      window.open(
                        `${window.location.origin}/course/${val.category.replace(/ /g, "-")}`,
                        "_blank"
                      )
                    }
                  >
                    <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-50 flex items-center justify-center">
                      <val.icon className="w-5 h-5 text-universal" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[16px] md:text-sm font-semibold capitalize text-gray-900">
                        {val.category}
                      </h3>
                      <h4 className="text-gray-500 text-xs">
                        {categorizedPrograms[vertical]?.length}{" "}
                        {categorizedPrograms[vertical]?.length === 1
                          ? "Course"
                          : "Courses"}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verticals;
