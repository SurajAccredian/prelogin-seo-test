"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
} from "@mui/material";
// import Testingnavbar from "../Navbar/testinnav";
// import Footer from "../Footer/Footer";
import { useParams } from "next/navigation";
import { faq } from "../Assets/faq";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Wrapper from "../Wrapper/HomePageWrapper";

export default function Subpage() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { id } = useParams();
  const [Fdata, setData] = useState();

  useEffect(() => {
    let ansone = faq.filter((obj) => {
      return obj.id == id;
    });
    //console.log(id);
    setData(ansone);
  }, []);
  return (
    <>
      <Wrapper>
        {Fdata &&
          Fdata.map((faqs) => (
            <>
              <Box sx={{ pt: 2, display: { xs: "none", lg: "block", sm: "none", md: "none" } }}>
                <Box sx={{ mt: 3 }}>
                  <Container fied>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "25px",

                        marginBottom: "0.4rem!important",
                      }}
                      key={faqs.id}
                    >
                      {faqs.hadding}
                    </Typography>
                    <Box sx={{ pt: 5, pb: 3, ml: -1, mr: 3 }}>
                      {faqs.Faqaccd &&
                        faqs.Faqaccd.map((sfaqs) => (
                          <Accordion
                            expanded={expanded === sfaqs.accodingid}
                            onChange={handleChange(sfaqs.accodingid)}
                            key={sfaqs.accodingid}
                            sx={{ boxShadow: "none" }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id={sfaqs.accodingid}
                              sx={{ height: "80px" }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  marginBottom: "0.4rem!important",
                                }}
                              >
                                {sfaqs.faqhadding}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {sfaqs.subfaq &&
                                sfaqs.subfaq.map((subfaq) => (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      marginBottom: "1.1rem!important",
                                    }}
                                  >
                                    {subfaq}
                                  </Typography>
                                ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </Container>
                </Box>
              </Box>
              <Box sx={{
                height: { md: 1133, sm: 792 }, overflowY: "scroll", "&::-webkit-scrollbar": {
                  width: { sm: "0.2em", md: "0.2em" },
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: { sm: "inset 0 0 6px silver", md: "inset 0 0 6px silver" },
                  webkitBoxShadow: { sm: "inset 0 0 6px silver", md: "inset 0 0 6px silver" },
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: { sm: "silver", md: "silver" },
                  outline: { sm: "silver", md: "silver" },
                }, display: { xs: "block", lg: "none", sm: "block", md: "block" }
              }}>
                <Box>
                  <Container field sx={{ pt: { xs: 8, md: 5, sm: 5 } }}>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "25px",
                        textAlign: { xs: "center", sm: "left", md: "left" },
                        ml: { xs: 0, sm: 2, md: 2 },
                        marginBottom: "0.4rem!important",
                      }}
                      key={faqs.id}
                    >
                      {faqs.hadding}
                    </Typography>
                    <Box sx={{ pt: 5, pb: 3, ml: 1 }}>
                      {faqs.Faqaccd &&
                        faqs.Faqaccd.map((sfaqs) => (
                          <Accordion
                            expanded={expanded === sfaqs.accodingid}
                            onChange={handleChange(sfaqs.accodingid)}
                            key={sfaqs.accodingid}
                            sx={{
                              boxShadow: "none",
                              border: "1px solid #000",
                              mb: 2,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id={sfaqs.accodingid}
                              sx={{ height: "80px" }}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                  marginBottom: "0.4rem!important",
                                }}
                              >
                                {sfaqs.faqhadding}
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              {sfaqs.subfaq &&
                                sfaqs.subfaq.map((subfaq) => (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      marginBottom: "1.1rem!important",
                                    }}
                                  >
                                    {subfaq}
                                  </Typography>
                                ))}
                            </AccordionDetails>
                          </Accordion>
                        ))}
                    </Box>
                  </Container>
                </Box>
              </Box>
            </>
          ))}
      </Wrapper>
    </>
  );
}
