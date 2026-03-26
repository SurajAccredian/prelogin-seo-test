import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { Step, Stepper } from "@mui/joy";

import { StepIcon, StepLabel } from "@mui/material";

const BlueStepIcon = (props) => {
  return <StepIcon {...props} style={{ color: "#1A73E8" }} />;
};

const Ordinary = ({
  curriculum,
  index,
  handleChange,
  expanded,
  type,
  id,
  level = 0,
}) => {
  // const panelId = `${id}-panel${index}`;
  const hasPoints =
    Array.isArray(curriculum?.points) && curriculum.points.length > 0;

  if (!hasPoints) {
    // 👉 Render just the header layout if no points
    return (
      <div
        key={index}
        className="w-full flex items-center justify-between gap-2 border-b p-4"
        style={{ paddingLeft: level === 0 ? "1.5rem" : "0.5rem" }}
      >
        <div className="flex items-center gap-2">
          <h1 className="text-sm md:text-base font-semibold">
            {/* {level === 0 && (
              <span className="font-bold">
                {type === "term"
                  ? "Term"
                  : type === "pillar"
                  ? "Pillar"
                  : "Module"}: {" "}
              </span>
            )} */}
            {curriculum?.title}
          </h1>
          {curriculum?.week && (
            <h1 className="text-xs font-medium max-md:hidden text-nowrap">
              <span className="text-green-500 mr-2">•</span>
              {curriculum?.week}
            </h1>
          )}
        </div>
      </div>
    );
  }

  return (
    <Accordion
      key={index}
      sx={{
        "&:hover": {
          backgroundColor: "",
          boxShadow: "none",
        },
        padding: `0px ${level === 0 ? "1.5rem" : "0.5rem"}`,
      }}
      expanded={expanded[`panel${index}-${level}`] || false}
      onChange={handleChange(`panel${index}-${level}`)}
      // expanded={expanded[panelId] || false}
      // onChange={handleChangeInner}
    >
      <AccordionSummary>
        <div className="w-full flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-semibold">
              {level === 0 && (
                <span className="font-bold">
                  {type === "term"
                    ? "Term"
                    : type === "pillar"
                    ? "Pillar"
                    : "Module"}{" "}
                  {index} :{" "}
                </span>
              )}
              {curriculum?.title}
            </h1>
            {curriculum?.week && (
              <>
                <h1 className="text-xs font-medium max-md:hidden text-nowrap">
                  <span className="text-green-500 mr-2">•</span>
                  {curriculum?.week}
                </h1>
              </>
            )}
          </div>
          {curriculum?.points && level === 0 && (
            <h4 className="max-md:hidden text-nowrap">
              {curriculum?.points.length}{" "}
              {type === "term"
                ? "Modules"
                : type === "pillar"
                ? "Modules"
                : "Topics"}
            </h4>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Stepper orientation="vertical">
          {curriculum?.points.map((point, i) => {
            // const pointId = `${id}-panel${index}-${i}`;
            if (typeof point === "object") {
              return (
                <Ordinary
                  key={i}
                  curriculum={point}
                  expanded={expanded}
                  handleChange={handleChange}
                  index={i + 1}
                  level={level + 1}
                />
              );
            } else {
              return (
                <Step
                  key={i}
                  sx={{
                    "& .MuiStepLabel-root .Mui-active": {
                      color: "#1A73E8",
                    },
                    color: "#1A73E8",
                  }}
                >
                  <StepLabel StepIconComponent={BlueStepIcon}>
                    <h1 className="text-sm font-medium">{point}</h1>
                  </StepLabel>
                </Step>
              );
            }
          })}
        </Stepper>
      </AccordionDetails>
      <div className="w-full border-b" />
    </Accordion>
  );
};

export default Ordinary;
