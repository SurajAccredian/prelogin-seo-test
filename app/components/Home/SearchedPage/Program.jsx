"use client";
import React from "react";
import { CiViewTimeline } from "react-icons/ci";
import Link from "next/link";
import { useProgramStatuses } from "../../../helpers/useProgramStatuses";

// allowedIds from constants - empty array as per original
const allowedIds = [];

const Program = ({ program, setBrotureDownloadInfo, setOpen, getProgramStatus }) => {
  const defaultStatus = useProgramStatuses();
  const statusResolver = getProgramStatus || defaultStatus.getProgramStatus;
  const resolved = statusResolver
    ? statusResolver(program)
    : { status: program.status, isAdmissionClosed: program.status?.toLowerCase() === "admission closed" };

  const handleOpen = (program) => {
    if (setBrotureDownloadInfo) setBrotureDownloadInfo(program);
    if (setOpen) setOpen(true);
  };

  return (
    <div className="w-full lg:max-w-[325px] rounded-2xl overflow-hidden bg-white drop-shadow flex flex-col relative">
      <div className="w-full h-32 flex items-center justify-center bg-blue-50 relative">
        {resolved.status && (
          <div className="absolute top-2 right-2 z-10">
            <div className={`rounded-lg px-3 py-1 capitalize text-xs font-semibold text-white shadow-md ${resolved.isAdmissionClosed ? "bg-red-500" : "bg-green-500"}`}>
              {resolved.status}
            </div>
          </div>
        )}
        <img loading="lazy" className="w-full h-full object-cover" src={program.cover_image} alt="cover images" />
      </div>

      <div className="w-full pt-4 pb-2 px-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-10 h-10 flex-shrink-0 rounded-xl overflow-hidden p-2 bg-white drop-shadow-md">
            <img loading="lazy" title={program.university_name} src={program.university_image} className="w-full h-full object-contain rounded-sm" alt={program.university_name} />
          </div>
          <p title={program.university_name} className="text-center font-medium text-xs text-neutral-500 cursor-context-menu">
            {program.university_name}
          </p>
        </div>
        <div className="w-full border-b border-neutral-300 mt-4" />
      </div>

      <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
        <h2 className="font-semibold">{program.program_name}</h2>
        <div className="w-full">
          <p className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu" title={program.tags?.join(", ")}>
            <span className="text-black">Core skills - </span>
            {program.tags?.join(", ")}
          </p>
          <div className="flex items-center gap-2">
            <CiViewTimeline className="text-2xl text-universal/90" strokeWidth={0.5} />
            <p className="text-base font-medium capitalize">
              {program.duration} -{" "}
              <span title={program.batch_type}>{program.batch_type}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 mt-4">
          <Link href={program.category?.toLowerCase() === "free courses" || program.category?.toLowerCase() === "microsoft" || program.id === "transform-business-workflows-with-generative-ai" ? `/free-courses/${program.id}` : `/programs/${program.id}`} className="px-2 py-2.5 flex-1 text-sm font-semibold border border-neutral-300 rounded-lg text-center">
            View Program
          </Link>
          <button
            onClick={() => handleOpen(program)}
            disabled={resolved.isAdmissionClosed || allowedIds.includes(program?.id)}
            className="px-2 py-2.5 flex-1 border border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-800 hover:text-universal text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 transition uppercase tracking-wide cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span>BROCHURE</span>
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Program;
