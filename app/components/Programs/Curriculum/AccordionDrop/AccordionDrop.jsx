import AccordionGroup from "@mui/joy/AccordionGroup";
import { accordionDetailsClasses } from "@mui/joy/AccordionDetails";
import { accordionSummaryClasses } from "@mui/joy/AccordionSummary";

import { useEffect, useState } from "react";
import Ordinary from "./Ordinary";
import Special from "./Special";
import { useSelector } from "react-redux";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { Step, Stepper } from "@mui/joy";

import { StepIcon, StepLabel } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
const BlueStepIcon = (props) => {
  return <StepIcon {...props} style={{ color: "#1A73E8" }} />;
};

export default function AccordionFilter({
  openAll,
  setOpenAll,
  curriculum = [],
  type = "modules",
}) {
  const [expanded, setExpanded] = useState({});
  const { data } = useSelector((state) => state.program);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prevExpanded) => {
      const newExpanded = { ...prevExpanded, [panel]: isExpanded };
      const anyClosed = Object.values(newExpanded).some((exp) => !exp);
      if (anyClosed) {
        setOpenAll(false);
      }
      const allOpen = Object.values(newExpanded).every((exp) => exp);
      if (allOpen) {
        setOpenAll(true);
      }
      return newExpanded;
    });
  };

  useEffect(() => {
    const isSplit = curriculum && !Array.isArray(curriculum) && curriculum.coreModules;

    if (openAll && !isSplit) {
      const newExpanded = {};
      curriculum.forEach((curriculum, index) => {
        newExpanded[`panel${index}-0`] = true;
        newExpanded[`panel-special-${index}-0`] = true;
      });
      setExpanded(newExpanded);
    }

    if (openAll && isSplit) {
      const newExpanded = {};
      curriculum.coreModules.forEach((curriculum, index) => {
        newExpanded[`panel${index}-0`] = true;
      });

      Object.entries(curriculum)
        .slice(1)
        .forEach(([key, modules]) => {
          newExpanded[key] = true;
          modules.forEach((module, i) => {
            if (typeof module === "object") {
              newExpanded[`${key}-${i}-0`] = true;
            }
          });
        });

      setExpanded(newExpanded);
    }

    if (openAll === false && isSplit) {
      const newExpanded = {};
      curriculum.coreModules.forEach((curriculum, index) => {
        newExpanded[`panel${index}`] = false;
      });

      Object.entries(curriculum)
        .slice(1)
        .forEach(([key]) => {
          newExpanded[key] = false;
        });
      setExpanded(newExpanded);
    }

    if (openAll === false && !isSplit) {
      const newExpanded = {};
      curriculum.forEach((curriculum, index) => {
        newExpanded[`panel${index}`] = false;
      });

      setExpanded(newExpanded);
    }
  }, [openAll, curriculum]);

  const isSplit = curriculum && !Array.isArray(curriculum) && curriculum.coreModules;

  let termIndex = 1;
  let specialIndex = 1;
  const formatTitle = (key) => {
    const role = key.split("-");
    const formattedRole = role
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return `${formattedRole}`;
  };

  return (
    <>
      {isSplit ? (
        <>
          <div className="sm:text-2xl text-xl text-universal p-4 pt-0 font-bold font-circular">
            {data?.id === "global-senior-leadership-program"
              ? "Core Modules"
              : "Curriculum"}
          </div>
          <AccordionGroup
            disableDivider
            variant="plain"
            sx={{
              borderRadius: "md",
              backgroundColor: "white",
              border: "1px solid #dedede",
              filter:
                "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));",
              [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
                {
                  paddingBlock: "1rem",
                },
              [`& .${accordionSummaryClasses.button}`]: {
                paddingBlock: "1rem",
              },
            }}
          >
            {curriculum.coreModules.map((curriculum, index) => (
              <div key={index}>
                {curriculum?.special ? (
                  <Special
                    curriculum={curriculum}
                    index={specialIndex++}
                    handleChange={handleChange}
                    expanded={expanded}
                  />
                ) : (
                  <Ordinary
                    curriculum={curriculum}
                    index={termIndex++}
                    handleChange={handleChange}
                    expanded={expanded}
                    type={type}
                    id={`panel${index}`}
                  />
                  // <Ordinary curriculum={curriculum} index={termIndex++} handleChange={handleChange} expanded={expanded} type={type} />
                )}
              </div>
            ))}
          </AccordionGroup>

          <div className="sm:text-2xl text-xl text-universal p-4 pt-6 font-bold font-circular">
            {data?.id === "global-senior-leadership-program"
              ? "Specialization Modules*"
              : "Masterclasses"}
          </div>

          <AccordionGroup
            disableDivider
            variant="plain"
            sx={{
              borderRadius: "md",
              backgroundColor: "white",
              border: "1px solid #dedede",
              filter:
                "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));",
              [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
                {
                  paddingBlock: "1rem",
                },
              [`& .${accordionSummaryClasses.button}`]: {
                paddingBlock: "1rem",
              },
            }}
          >
            {data?.id !== "global-senior-leadership-program" ? (
              Object.entries(curriculum)
                .slice(1)
                .map(([index, modules]) =>
                  modules.map((point, i) => (
                    <Ordinary
                      key={i}
                      curriculum={point}
                      expanded={expanded}
                      handleChange={handleChange}
                      index={i + 1}
                      id={`${index}-${i}`}
                      type="masterclass"
                    />
                  ))
                )
            ) : (
              Object.entries(curriculum)
                .slice(1)
                .map(([index, modules]) => {
                  return (
                    <div key={index}>
                      <Accordion
                        key={index}
                        sx={{
                          "&:hover": {
                            backgroundColor: "",
                            boxShadow: "none",
                          },
                        }}
                        expanded={expanded[index]}
                        onChange={handleChange(index)}
                        // expanded={expanded[panelId] || false}
                        // onChange={handleChangeInner}
                      >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <div className="w-full flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm md:text-base font-semibold">
                                {index.split("-").join(" ")}
                              </h3>
                            </div>

                            <h4 className="max-md:hidden text-nowrap font-circular">
                              {modules.length} Modules
                            </h4>
                          </div>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Stepper orientation="vertical">
                            {modules.map((point, i) => {
                              // const pointId = `${id}-panel${index}-${i}`;
                              if (typeof point === "object") {
                                return (
                                  <Ordinary
                                    curriculum={point}
                                    expanded={expanded}
                                    handleChange={handleChange}
                                    index={i + 1}
                                    id={`${index}-${i}`}
                                    type={type}
                                  />
                                );
                              } else {
                                return (
                                  <Step
                                    key={index}
                                    sx={{
                                      "& .MuiStepLabel-root .Mui-active": {
                                        color: "#1A73E8",
                                      },
                                      color: "#1A73E8",
                                    }}
                                  >
                                    <StepLabel StepIconComponent={BlueStepIcon}>
                                      <p className="text-sm font-medium">
                                        {point}
                                      </p>
                                    </StepLabel>
                                  </Step>
                                );
                              }
                            })}
                          </Stepper>
                        </AccordionDetails>
                        <div className="w-full border-b" />
                      </Accordion>
                    </div>
                  );
                })
            )}
          </AccordionGroup>

          {data?.id === "global-senior-leadership-program" && (
            <div>
              <p
                className={`italic p-3  pl-0 font-medium text-sm mt-2 text-gray-500`}
              >
                *Participants will select only one elective specialization module,
                each concluding with a Capstone Project.
              </p>
            </div>
          )}
        </>
      ) : (
        <AccordionGroup
          disableDivider
          variant="plain"
          sx={{
            borderRadius: "md",
            backgroundColor: "white",
            border: "1px solid #dedede",
            filter:
              "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));",
            [`& .${accordionDetailsClasses.content}.${accordionDetailsClasses.expanded}`]:
              {
                paddingBlock: "1rem",
              },
            [`& .${accordionSummaryClasses.button}`]: {
              paddingBlock: "1rem",
            },
          }}
        >
          {curriculum.map((curriculum, index) => (
            <div key={index}>
              {curriculum?.special ? (
                <Special
                  curriculum={curriculum}
                  index={specialIndex++}
                  handleChange={handleChange}
                  expanded={expanded}
                />
              ) : (
                <Ordinary
                  curriculum={curriculum}
                  index={termIndex++}
                  handleChange={handleChange}
                  expanded={expanded}
                  type={type}
                  id={`panel${index}`}
                />
                // <Ordinary curriculum={curriculum} index={termIndex++} handleChange={handleChange} expanded={expanded} type={type} />
              )}
            </div>
          ))}
        </AccordionGroup>
      )}
    </>
  );
}
