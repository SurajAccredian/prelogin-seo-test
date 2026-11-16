"use client";

import React, { useState } from "react";
import { NAV_ITEMS } from "../../Assets/constants";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function AccordionHam() {
  const [expanded, setExpanded] = useState(null);
  const [innerExpanded, setInnerExpanded] = useState(null);

  const togglePanel = (panel) => {
    setExpanded((prev) => (prev === panel ? null : panel));
  };

  const toggleInnerPanel = (panel) => {
    setInnerExpanded((prev) => (prev === panel ? null : panel));
  };

  return (
    <>
      {NAV_ITEMS &&
        NAV_ITEMS.map((acc, index) => {
          const isParentOpen = expanded === acc.label;

          return acc.children ? (
            <div
              key={`Accordion_${index}`}
              className="accordion-parent border-b border-[#e5e7eb]"
            >
              <button
                type="button"
                onClick={() => togglePanel(acc.label)}
                className="w-full flex items-center justify-between text-xl xl:hidden py-4 text-left font-medium text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <span>{acc.label}</span>
                </div>
                <div className="text-lg">
                  <MdKeyboardArrowDown
                    className={`${
                      isParentOpen ? "rotate-180" : "rotate-0"
                    } transition-transform duration-200`}
                  />
                </div>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isParentOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-h-[40vh] overflow-y-auto custom-scrollbar pb-3">
                    <div className="w-full flex flex-col">
                      {acc.children &&
                        acc.children.map((child, cIndex) => {
                          const isInnerOpen = innerExpanded === child.label;

                          return (
                            <React.Fragment key={`inner_child_${cIndex}`}>
                              {child.children ? (
                                <div className="border-b border-[#e5e7eb] mb-2">
                                  <button
                                    type="button"
                                    onClick={() => toggleInnerPanel(child.label)}
                                    className="w-full flex items-center justify-between text-lg xl:hidden py-3 text-left font-medium text-gray-800"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span>{child.label}</span>
                                    </div>
                                    <div className="text-lg">
                                      <MdKeyboardArrowDown
                                        className={`${
                                          isInnerOpen ? "rotate-180" : "rotate-0"
                                        } transition-transform duration-200`}
                                      />
                                    </div>
                                  </button>

                                  <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                      isInnerOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    }`}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="w-full flex flex-col pl-3 pb-2">
                                        {child.children.map((inner_child, iIndex) => (
                                          <React.Fragment
                                            key={`inner_child_acc_${iIndex}`}
                                          >
                                            {inner_child?.redirect ? (
                                              <a
                                                rel="noreferrer"
                                                target="_blank"
                                                href={inner_child.href}
                                                className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                              >
                                                {inner_child.label}
                                              </a>
                                            ) : (
                                              <Link
                                                href={inner_child.href}
                                                prefetch={false}
                                                className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                              >
                                                {inner_child.label}
                                              </Link>
                                            )}
                                          </React.Fragment>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <React.Fragment key={`Accordion_inner_${cIndex}`}>
                                  {child?.redirect ? (
                                    <a
                                      rel="noreferrer"
                                      target="_blank"
                                      href={child.href}
                                      className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                    >
                                      {child.label}
                                    </a>
                                  ) : (
                                    <Link
                                      href={child.href}
                                      prefetch={false}
                                      className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                    >
                                      {child.label}
                                    </Link>
                                  )}
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment key={`Accordion_main_${index}`}>
              <div className="w-full flex items-center justify-between text-xl my-6 xl:hidden">
                {acc.redirect ? (
                  <a
                    href={acc.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <span className="font-semibold">{acc.label}</span>
                  </a>
                ) : (
                  <Link href={acc.href} prefetch={false}>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{acc.label}</span>
                    </div>
                  </Link>
                )}
              </div>
              <div className="w-full bg-[#e5e7eb] h-[1px]" />
            </React.Fragment>
          );
        })}
    </>
  );
}
