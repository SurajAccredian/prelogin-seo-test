"use client";
import React from "react";
import { CiViewTimeline } from "react-icons/ci";
import Link from "next/link";
import { resolveProgramStatus } from "../../../helpers/useProgramStatuses";

// allowedIds from constants - empty array as per original
const allowedIds = [];

const Program = ({ program, setBrotureDownloadInfo, setOpen, getProgramStatus }) => {
  const resolved = getProgramStatus
    ? getProgramStatus(program)
    : resolveProgramStatus(program);

  const isClosed = Boolean(resolved?.isAdmissionClosed);

  const handleOpen = (program) => {
    if (setBrotureDownloadInfo) setBrotureDownloadInfo(program);
    if (setOpen) setOpen(true);
  };

  return (
    <div
      className={`w-full lg:max-w-[325px] rounded-2xl overflow-hidden flex flex-col relative transition-all duration-200 ${
        isClosed
          ? "bg-neutral-50/90 border border-neutral-200 shadow-sm"
          : "bg-white drop-shadow"
      }`}
    >
      <div
        className={`w-full h-32 flex items-center justify-center relative overflow-hidden ${
          isClosed ? "bg-neutral-100" : "bg-blue-50"
        }`}
      >
        {resolved.status && (
          <div className="absolute top-2 right-2 z-10">
            <div
              className={`rounded-lg px-3 py-1 capitalize text-xs font-semibold text-white shadow-md ${
                isClosed ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {resolved.status}
            </div>
          </div>
        )}
        <img
          loading="lazy"
          className={`w-full h-full object-cover transition-all duration-200 ${
            isClosed ? "grayscale contrast-[0.85] opacity-70" : ""
          }`}
          src={program.cover_image}
          alt="cover images"
        />
      </div>

      <div className="w-full pt-4 pb-2 px-4">
        <div className="w-full flex items-center gap-4">
          <div
            className={`w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 drop-shadow-md transition-all ${
              isClosed ? "bg-neutral-100 grayscale opacity-80" : "bg-white"
            }`}
          >
            <img
              loading="lazy"
              title={program.university_name}
              src={program.university_image}
              className="w-full h-full object-contain rounded-sm"
              alt={program.university_name}
            />
          </div>
          <p
            title={program.university_name}
            className={`text-center font-medium text-xs cursor-context-menu ${
              isClosed ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            {program.university_name}
          </p>
        </div>
        <div
          className={`w-full border-b mt-4 ${
            isClosed ? "border-neutral-200" : "border-neutral-300"
          }`}
        />
      </div>

      <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
        <h2
          className={`font-semibold ${
            isClosed ? "text-neutral-600" : "text-neutral-900"
          }`}
        >
          {program.program_name}
        </h2>
        <div className="w-full">
          <p
            className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu"
            title={program.tags?.join(", ")}
          >
            <span className={isClosed ? "text-neutral-500 font-medium" : "text-black"}>
              Core skills -{" "}
            </span>
            {program.tags?.join(", ")}
          </p>
          <div className="flex items-center gap-2">
            <CiViewTimeline
              className={`text-2xl ${
                isClosed ? "text-neutral-400" : "text-universal/90"
              }`}
              strokeWidth={0.5}
            />
            <p
              className={`text-base font-medium capitalize ${
                isClosed ? "text-neutral-500" : "text-neutral-800"
              }`}
            >
              {program.duration} -{" "}
              <span title={program.batch_type}>{program.batch_type}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 mt-4">
          <Link
            href={
              program.category?.toLowerCase() === "free courses" ||
              program.category?.toLowerCase() === "microsoft" ||
              program.id === "transform-business-workflows-with-generative-ai" ||
              program.id === "transform-ideas-into-impact-with-product-management"
                ? `/free-courses/${program.id}`
                : `/programs/${program.id}`
            }
            className={`px-2 py-2.5 flex-1 text-sm font-semibold border rounded-lg text-center transition-colors ${
              isClosed
                ? "border-neutral-300 text-neutral-600 bg-white/80 hover:bg-neutral-100"
                : "border-neutral-300 text-neutral-800 hover:bg-neutral-50"
            }`}
          >
            View Program
          </Link>
          <button
            onClick={() => handleOpen(program)}
            disabled={isClosed || allowedIds.includes(program?.id)}
            className="px-2 py-2.5 flex-1 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed text-sm font-semibold bg-universal text-white rounded-lg"
          >
            Get Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;
