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
    setBrotureDownloadInfo(program);
    setOpen(true);
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
          <h1 title={program.university_name} className="text-center font-medium text-xs text-neutral-500 cursor-context-menu">
            {program.university_name}
          </h1>
        </div>
        <div className="w-full border-b border-neutral-300 mt-4" />
      </div>

      <div className="w-full flex-1 flex flex-col justify-between px-4 pt-2 pb-4 cursor-context-menu">
        <h1 className="font-semibold">{program.program_name}</h1>
        <div className="w-full">
          <h2 className="w-full text-[14px] text-neutral-400 my-4 truncate cursor-context-menu" title={program.tags?.join(", ")}>
            <span className="text-black">Core skills - </span>
            {program.tags?.join(", ")}
          </h2>
          <div className="flex items-center gap-2">
            <CiViewTimeline className="text-2xl text-universal/90" strokeWidth={0.5} />
            <h1 className="text-base font-medium capitalize">
              {program.duration} -{" "}
              <span title={program.batch_type}>{program.batch_type}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center w-full gap-2 mt-4">
          <Link href={program.category?.toLowerCase() === "free courses" || program.category?.toLowerCase() === "microsoft" || program.id === "transform-business-workflows-with-generative-ai" || program.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${program.id}` : `/programs/${program.id}`} className="px-2 py-2.5 flex-1 text-sm font-semibold border border-neutral-300 rounded-lg text-center">
            View Program
          </Link>
          <button
            onClick={() => handleOpen(program)}
            disabled={resolved.isAdmissionClosed || allowedIds.includes(program?.id)}
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
