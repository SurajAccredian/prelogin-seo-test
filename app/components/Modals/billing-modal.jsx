"use client";

import React from "react";
import Modal from "../ui/Modal";
import { IoIosClose } from "react-icons/io";
import { useSelector } from "react-redux";

export default function BillingModal({ open, setOpen }) {
  const handleClose = () => setOpen(null);
  const { data } = useSelector((state) => state.program);

  return (
    <Modal
      open={!!open}
      onClose={handleClose}
      maxWidth="max-w-2xl"
      className="p-0 overflow-hidden font-circular bg-transparent shadow-none"
    >
      <div className="overflow-hidden font-circular flex flex-col max-h-[90vh]">
        {/* Fixed header with close button */}
        <div className="py-2 w-full text-center relative flex items-center justify-end flex-shrink-0">
          <button
            type="button"
            aria-label="Close"
            className="w-8 h-8 rounded-lg bg-white shadow hover:bg-gray-100 flex items-center justify-center transition cursor-pointer"
            onClick={handleClose}
          >
            <IoIosClose className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Scrollable content */}
            <div className="bg-white w-full py-8 px-6 pt-0 rounded-xl shadow-2xl overflow-y-auto font-circular">
              <h3 className="font-semibold text-neutral-700 text-center text-lg">
                EMI Solutions Available for Program Enrollment
              </h3>
              <table className="w-full mt-4 table-auto border-collapse border border-gray-200">
                <thead>
                      <tr>
                        <th className="border max-md:hidden border-neutral-200 px-4 py-2 font-medium text-neutral-800"></th>
                        <th className="border border-neutral-200 px-4 py-2 font-medium text-neutral-800">
                          Months
                        </th>
                          <th className="border border-neutral-200 px-4 py-2 font-medium text-neutral-800">
                            {data?.id === "executive-general-management-program"
                              ? "EMI (Range)"
                              : "EMI"}
                          </th>
                      </tr>
                    </thead>
                    <tbody>
                      {open &&
                        open.monthly_emi &&
                        open.monthly_emi.map((val, index) => {
                          return (
                            <tr
                              key={index}
                              className={index % 2 === 0 ? "bg-blue-50" : ""}
                            >
                              <td
                                className={`border-r max-md:hidden ${index % 2 === 0
                                  ? "border-neutral-300"
                                  : "border-neutral-200"
                                  } px-4 py-2 text-center text-sm text-neutral-700`}
                              >
                                {index + 1}
                              </td>
                              <td
                                className={`border-x ${index % 2 === 0
                                  ? "border-neutral-300"
                                  : "border-neutral-200"
                                  } px-4 py-2 text-center text-sm text-neutral-700`}
                              >
                                {val.months} Months
                              </td>
                              <td
                                className={`border-l ${index % 2 === 0
                                  ? "border-neutral-300"
                                  : "border-neutral-200"
                                  } px-4 py-2 text-center text-sm text-neutral-700`}
                              >
                                {typeof val.emi === "number"
                                  ? `INR ${val.emi.toLocaleString("en-IN")}`
                                  : val.emi}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                        <div className="w-full mt-4">
                          <ul className="list-disc pl-4 space-y-2">
                            <li className="my-2">
                              <p className="text-sm text-neutral-500 font-normal">
                                The application fee, a non-refundable reservation deposit for
                                the program, must be paid before the application process can
                                begin and will be adjusted against the final fee payable by the
                                student.
                              </p>
                            </li>
                              <li className="my-2">
                                <p className="text-sm text-neutral-500 font-normal">
                                  Please be aware that the credit facility is provided by a
                                  third-party provider, and any arrangements with them are
                                  beyond the purview of both Accredian and the institute.
                                </p>
                              </li>
                                <li className="my-2">
                                  <p className="text-sm text-neutral-500 font-normal">
                                    The EMI plan agreed upon with the third-party loan provider
                                    will continue as per the terms discussed during the
                                    enrollment period
                                  </p>
                                </li>
                              <li className="my-2">
                                <p className="text-sm text-neutral-500 font-normal">
                                  Please note that these EMI amounts are approximate and may
                                  vary slightly depending on the third-party loan provider
                                </p>
                              </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                </Modal>
                );
}
