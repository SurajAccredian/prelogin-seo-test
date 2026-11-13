"use client";

import React, { useState } from "react";
import Image from "next/image";
import "../refer.css";
import benefitOnReferral from "../../Assets/programs.json";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";

const BenefitTable = ({ selectedVertical, enrolled, columnNames }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Getting all the programs
  const programs = groupProgramsByCategory(benefitOnReferral);

  // Filtering the category of programs based on vertical
  const selectedCat = programs[selectedVertical] || [];
  const totalPages = Math.ceil(selectedCat.length / rowsPerPage);

  // Paginate rows if more than rows per table
  const paginatedRows = selectedCat.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="gap-3 w-full h-full h-max font-circular">
      <div className="benefit-table rounded-xl mt-[-13px] overflow-hidden shadow-[0px_4px_29.3px_0px_#3c3c3c26] my-4 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead>
              <tr className="bg-[#1A73E859] text-[#1350A0]">
                {columnNames.map((column, index) => (
                  <th
                    key={index}
                    className={`p-3.5 font-semibold text-sm border-r border-gray-300 last:border-r-0 ${
                      column === "Programs" ? "text-left" : "text-center"
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50/50 transition">
                  <td className="p-3.5 text-sm text-gray-800 border-r border-gray-300 last:border-r-0 max-w-[150px] sm:max-w-[300px] break-words">
                    <span className="flex gap-4 items-start">
                      <Image
                        src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/program-hat.svg"
                        alt="program icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 flex-shrink-0"
                      />
                      {row.program_name}
                    </span>
                  </td>
                  <td className="p-3.5 text-sm text-gray-800 text-center border-r border-gray-300 last:border-r-0">
                    {enrolled
                      ? row.enrolled.referrerBonus
                      : row.notEnrolled.referrerBonus}
                  </td>
                  <td className="p-3.5 text-sm text-gray-800 text-center border-r border-gray-300 last:border-r-0">
                    {enrolled
                      ? row.enrolled.refreeBonus
                      : row.notEnrolled.refreeBonus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {selectedCat.length > rowsPerPage && (
        <div className="w-full flex justify-end items-center gap-1 mt-3">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2.5 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 text-sm rounded font-medium transition ${
                currentPage === page
                  ? "bg-[#1A73E8] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 text-sm rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default BenefitTable;
