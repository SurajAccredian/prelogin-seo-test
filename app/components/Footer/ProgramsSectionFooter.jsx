"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";
import Link from "next/link";
import { PhoneForwarded } from "lucide-react";

const MobileProgramFooter = ({
  categorizedPrograms,
  category,
  index,
  matchingContact,
}) => {
  return (
    <>
      <Accordion
        sx={{ backgroundColor: "#1d1d1d", color: "white", boxShadow: "none" }}
      >
        <AccordionSummary
          expandIcon={<AddIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            {category.toLowerCase() === "cxo leadership"
              ? "CXO Leadership"
              : category.toLowerCase() === "pg diploma"
                ? "PG Diploma"
                : category.replace(/(\bai\b)/gi, "AI")}
          </Typography>
          {/* Contact number */}
          <Typography
            sx={{
              ml: 1,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            ( <PhoneForwarded size={12} />
            {matchingContact?.contact} )
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {categorizedPrograms && categorizedPrograms[category] &&
            categorizedPrograms[category].map((program, innerIndex) => (
              <Link
                key={innerIndex}
                href={`/programs/${program.id}`}
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 13,
                  textDecoration: "none",
                  marginBottom: 6,
                }}
              >
                {program.university_name} - {program.program_name}
              </Link>
            ))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MobileProgramFooter;
