import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { NAV_ITEMS } from "../../Assets/constants";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function AccordionHam() {
  const [expanded, setExpanded] = useState(null);
  const [innerExpanded, setInnerExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleChangeInner = (panel) => (event, newExpanded) => {
    setInnerExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {NAV_ITEMS &&
        NAV_ITEMS.map((acc, index) => {
          return acc.children ? (
            <Accordion
              expanded={expanded === acc.label}
              onChange={handleChange(acc.label)}
              key={`Accordion_${index}`}
              className="accordion-parent border-b"
              sx={{
                borderBottom: "1px solid #e5e7eb !important",
                boxShadow: "none !important",
              }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                className="accordion-summary"
                sx={{
                  marginBottom: "16px !important",
                  marginTop: "12px !important",
                }}

              >
                <div className="w-full flex items-center justify-between text-xl xl:hidden">
                  <div className="flex items-center gap-2">
                    <h1 className="font-medium">{acc.label}</h1>
                  </div>
                  <div className="text-lg">
                    <MdKeyboardArrowDown
                      className={`${expanded === acc.label ? "rotate-180" : "rotate-0"
                        } transition-all duration-150`}
                    />
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails className="accordion-details max-h-[40vh] overflow-y-auto custom-scrollbar">
                <div className="w-full flex flex-col">
                  {acc.children &&
                    acc.children.map((child, index) => {
                      return (
                        <React.Fragment key={`inner_child_${index}`}>
                          {child.children ? (
                            <Accordion
                              expanded={innerExpanded === child.label}
                              onChange={handleChangeInner(child.label)}
                              key={`Accordion_${index}`}
                              className="accordion-parent border-b mb-8"
                              sx={{
                                borderBottom: "1px solid #e5e7eb !important",
                                boxShadow: "none !important",
                              }}
                            >
                              <AccordionSummary
                                aria-controls="panel1d-content"
                                className="accordion-summary"
                                sx={{
                                  marginBottom: "16px !important",
                                  marginTop: "12px !important",
                                }}
                              >
                                <div className="w-full flex items-center justify-between text-lg xl:hidden">
                                  <div className="flex items-center gap-2">
                                    <h1 className="font-medium">
                                      {child.label}
                                    </h1>
                                  </div>
                                  <div className="text-lg">
                                    <MdKeyboardArrowDown
                                      className={`${innerExpanded === child.label
                                        ? "rotate-180"
                                        : "rotate-0"
                                        } transition-all duration-150`}
                                    />
                                  </div>
                                </div>
                              </AccordionSummary>
                              <AccordionDetails className="accordion-details">
                                <div className="w-full flex flex-col">
                                  {child.children.map((inner_child, index) => (
                                    <React.Fragment key={`inner_child_acc_${index}`}>
                                      {inner_child?.redirect ? (
                                        <a
                                          rel="noreferrer"
                                          target="_blank"
                                          href={inner_child.href}
                                          className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                          key={`inner_child_acc_${index}`}
                                        >
                                          {inner_child.label}
                                        </a>
                                      ) : (
                                        <Link
                                          href={inner_child.href}
                                          prefetch={false}
                                          className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                          key={`inner_child_acc_${index}`}
                                        >
                                          {inner_child.label}
                                        </Link>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </AccordionDetails>
                            </Accordion>
                          ) : (
                            <React.Fragment key={`Accordion_inner_${index}`}>
                              {child?.redirect ? (
                                <a
                                  rel="noreferrer"
                                  target="_blank"
                                  href={child.href}
                                  className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                  key={`Accordion_${index}`}
                                >
                                  {child.label}
                                </a>
                              ) : (
                                <Link
                                  href={child.href}
                                  prefetch={false}
                                  className="w-full py-2 font-medium text-lg text-neutral-700 hover:text-universal"
                                  key={`Accordion_${index}`}
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
              </AccordionDetails>
            </Accordion>
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
                    <h1 className="font-semibold">{acc.label}</h1>
                  </a>
                ) : (
                  <Link href={acc.href} prefetch={false}>
                    <div className="flex items-center gap-2">
                      <h1 className="font-semibold">{acc.label}</h1>
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
