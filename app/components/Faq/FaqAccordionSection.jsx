"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FaqAccordionSection({ faqData }) {
  // Default first question of first category open, like original panel1
  const [expanded, setExpanded] = useState("about-accredian-0");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ pb: 8, pt: 2 }}>
      <Container fixed sx={{ maxWidth: "85rem" }}>
        {/* Main Heading & Intro */}
        <Box sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography
            component="h1"
            sx={{
              color: "#000",
              fontWeight: "bold",
              fontSize: { xs: "26px", sm: "30px", md: "34px" },
              marginBottom: "0.5rem !important",
              lineHeight: 1.2,
            }}
          >
            Frequently Asked Questions (FAQ)
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#1a1a1a",
              fontWeight: "600",
              fontSize: { xs: "18px", md: "20px" },
              marginBottom: "0.4rem !important",
            }}
          >
          </Typography>
          <Typography
            component="p"
            sx={{
              color: "#4a4a4a",
              fontSize: "16px",
              marginBottom: "0.5rem !important",
            }}
          >
            Search for the answers to your questions below.
          </Typography>
        </Box>

        {/* Categories & Accordions */}
        {faqData &&
          faqData.map((category) => (
            <Box key={category.id} sx={{ mb: { xs: 4, md: 5 } }}>
              <Typography
                component="h2"
                sx={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: { xs: "20px", sm: "22px", md: "28px" },
                  marginBottom: "1rem !important",
                  pb: 1,
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                {category.heading}
              </Typography>

              <Box sx={{ pt: 1, pb: 2 }}>
                {category.questions &&
                  category.questions.map((item, qIdx) => {
                    const panelId = `${category.id}-${qIdx}`;
                    const isPanelExpanded = expanded === panelId;

                    return (
                      <Accordion
                        key={item.id || panelId}
                        expanded={isPanelExpanded}
                        onChange={handleChange(panelId)}
                        slotProps={{ transition: { unmountOnExit: false } }}
                        sx={{
                          boxShadow: "none",
                          border: { xs: "1px solid #e0e0e0", lg: "none" },
                          borderBottom: { lg: "1px solid #e0e0e0" },
                          mb: { xs: 1.5, lg: 0 },
                          borderRadius: { xs: "8px", lg: 0 },
                          "&:before": { display: "none" },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon sx={{ color: "#333" }} />}
                          aria-controls={`${panelId}-content`}
                          id={`${panelId}-header`}
                          sx={{
                            minHeight: { xs: "64px", md: "72px" },
                            px: { xs: 2, md: 2 },
                            "& .MuiAccordionSummary-content": {
                              my: 1.5,
                            },
                          }}
                        >
                          <Typography
                            component="h3"
                            sx={{
                              fontWeight: "bold",
                              fontSize: { xs: "14px", md: "18px" },
                              color: isPanelExpanded ? "#1A73E8" : "#1a1a1a",
                              transition: "color 0.2s ease",
                              m: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {item.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            px: { xs: 2, md: 2 },
                            pt: 0,
                            pb: 2.5,
                          }}
                        >
                          <Typography
                            component="p"
                            sx={{
                              fontSize: "16px",
                              color: "#4a4a4a",
                              lineHeight: 1.7,
                              m: 0,
                            }}
                          >
                            {item.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </Box>
            </Box>
          ))}
      </Container>
    </Box>
  );
}
