"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Grid, Typography, Button, Box, Container } from "@mui/material";
import Link from "next/link";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CallIcon from "@mui/icons-material/Call";
import Tooltip from "@mui/material/Tooltip";
import SubFooter from "./SubFooter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./Footer.css";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Rcta from "../cta/request_a_call_back";
import { groupProgramsByCategory } from "../../helpers/common.helpers";
import programs from "../Assets/programs.json";
import { Phone, PhoneForwarded } from "lucide-react";
// import { IoCall } from "react-icons/io5";

import { categoriesWithContacts } from "../Assets/constants";
import MobileProgramFooter from "./ProgramsSectionFooter";
import FloatingChatWidget from "../bot/FloatingChatWidget";


const Footer = () => {
  const pathname = usePathname();
  const isFreeCoursePage = pathname && pathname.includes("/free-courses/");
  const isStickyBottomActive = pathname && (pathname.includes("/free-courses/") || pathname.includes("/programs/"));
  const [isOpen, setIsOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [categorizedPrograms, setCategorizedPrograms] = useState([]);
  const [cta, setCta] = useState(false);

  const handleClickOpenRcb = () => {
    setCta(true);
  };
  const RcbhandleClose = () => {
    setCta(false);
  };

  const handleFreshchatButtonClick = () => {
    window.fcWidget?.open();
  };

  useEffect(() => {
    const fetchPrograms = groupProgramsByCategory(programs);
    setCategorizedPrograms(fetchPrograms || []);
  }, []);

  return (
    <>
      <Box className="footer" sx={{ fontFamily: "circular" }}>
        <Container fixed sx={{ maxWidth: "85rem" }}>
          <Grid
            container
            item
            lg={12}
            sx={{
              marginBottom: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: {
                xs: "column",
                // sm: "row",
                md: "row",
              },
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <img
                style={{ width: "9rem" }}
                src="	https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/accredainnew.webp"
                alt="Accredian logo"
                width="338"
                height="90"
                loading="lazy"
              />
              <div className="flex mt-4">
                <a
                  href="https://facebook.com/accredianlearn"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <FacebookIcon sx={{ fontSize: "1.7rem" }} />
                </a>
                <a
                  href="https://www.linkedin.com/company/accredianedu/"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <LinkedInIcon sx={{ ml: 2, fontSize: "1.7rem" }} />
                </a>
                <a
                  href="https://twitter.com/accredianedu"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  {" "}
                  <TwitterIcon sx={{ ml: 2, fontSize: "1.7rem" }} />
                </a>
                <a
                  href="https://www.instagram.com/accredian_edu"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <InstagramIcon sx={{ ml: 2, fontSize: "1.7rem" }} />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA"
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <YouTubeIcon sx={{ ml: 2, fontSize: "1.7rem" }} />
                </a>
              </div>
              {/* <span className="img-head">
              International School of AI & Data Science
            </span> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: {
                  xs: "flex-start",
                  md: "flex-end",
                },
                marginTop: {
                  xs: "15px",
                  md: "0px",
                },
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#1A73E8",
                  color: "#fff",
                  borderRadius: "6px",
                  textTransform: "none",
                  width: {
                    xs: "250px",
                    sm: "250px",
                    md: "250px",
                  },
                  marginBottom: "6px",
                  "&:hover": {
                    backgroundColor: "#1A73E8",
                    color: "#fff",
                    borderRadius: "6px",
                  },
                }}
                onClick={handleClickOpenRcb}
              >
                Schedule 1-on-1 Call Now
              </Button>
              <span className="footer-head-right-text">
                Speak with our Learning Advisor
              </span>
            </Grid>
          </Grid>

          <hr />

          <Grid
            container
            lg={12}
            className="footer-body mb-6"
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
              },
            }}
          >
            <Grid item lg={2} sx={{ mt: 4 }} marginRight={"60px"}>
              <div className="footer-body-head">
                <Typography
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.2rem!important",
                    fontSize: "20px",
                  }}
                >
                  Accredian
                </Typography>
                <ul className="footer-body-content">
                  <li className="pt-4">
                    <Link href="/about" prefetch={false} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0.2rem!important",
                          fontSize: "14px",
                        }}
                      >
                        About
                      </Typography>
                    </Link>
                  </li>
                  <li className="pt-4">
                    <Link href="/Career" prefetch={false} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0.2rem!important",
                          fontSize: "14px",
                        }}
                      >
                        Career
                      </Typography>
                    </Link>
                  </li>
                  <li className="pt-4">
                    <Link href="/contact-us" prefetch={false} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0.2rem!important",
                          fontSize: "14px",
                        }}
                      >
                        Contact Us
                      </Typography>
                    </Link>
                  </li>
                  <li className="pt-4">
                    <a
                      href="https://blog.accredian.com/"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0.2rem!important",
                          fontSize: "14px",
                        }}
                      >
                        Blog
                      </Typography>
                    </a>
                  </li>
                  {/* <li className="pt-4 pb-4">
                    <Link href="/whyaccredian" prefetch={false} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0rem!important",
                          fontSize: "18px",
                        }}
                      >
                        Why Accredian
                      </Typography>
                    </Link>
                  </li> */}
                  <li className="pt-4">
                    <a href="/whyaccredian" style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0.2rem!important",
                          fontSize: "14px",
                        }}
                      >
                        Why Accredian
                      </Typography>
                    </a>
                  </li>

                  {/* <li>
                  <Link href="/Gallery" prefetch={false} style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      Gallery
                    </Typography>
                  </Link>
                </li> */}
                </ul>
              </div>
            </Grid>

            <Grid item lg={2.6} sx={{ mt: 4 }} marginRight={"60px"}>
              <div className="footer-body-head w-full">
                <Typography
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.2rem!important",
                    fontSize: "20px",
                  }}
                >
                  Support
                </Typography>
                <ul className="footer-body-content">
                  <div className="flex w-full flex-col md:flex-row gap-1 md:gap-4">
                    <div className="">
                      <Link
                        href={"/policies/accredian-policy"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Admission Policy
                        </Typography>
                      </Link>

                      <Link
                        href={"/terms/referral"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Referral Policy
                        </Typography>
                      </Link>

                      <Link
                        href={"/terms/refund"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Refund Policy
                        </Typography>
                      </Link>


                      <Link
                        href={"/terms/privacy"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Privacy Policy
                        </Typography>
                      </Link>

                      <Link
                        href={"/terms/cookie-policy"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Cookie Policy
                        </Typography>
                      </Link>

                    </div>

                    <div>
                      <Link
                        href={"/terms/cancellation"}
                        prefetch={false}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Cancellation Policy
                        </Typography>
                      </Link>

                      <Link href={"/terms"} prefetch={false} style={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Terms Of Service
                        </Typography>
                      </Link>

                      {/* <Link href="/Faq" style={{ textDecoration: "none" }}>
                        <Typography
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            marginBottom: "0.2rem!important",
                            fontSize: "14px",
                            marginTop: "10px",
                          }}
                        >
                          Master FAQs
                        </Typography>
                      </Link> */}
                    </div>
                  </div>
                  {/* <li className="pt-4"> */}
                  {/* <div className="flex gap-3"> */}
                  {/* <div className=""> */}

                  {/* </div> */}

                  {/* <div> */}

                  {/* </div> */}
                  {/* </div> */}

                  {/* </li> */}
                  {/* <li className="pt-4"> */}

                  {/* </li> */}
                  {/* <li className="pt-4"> */}

                  {/* </li> */}
                  {/* </li> */}

                  {/* <li className="pt-4">
                    <div className="flex gap-3"></div>
                  </li> */}

                  {/* <li className="pt-4">
                    <div className="flex gap-3"></div>
                  </li> */}

                  {/* <li className="pt-4"></li> */}
                  {/* <li>
                  <Link href="/Gallery" prefetch={false} style={{ textDecoration: "none" }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      Gallery
                    </Typography>
                  </Link>
                </li> */}
                </ul>
              </div>
            </Grid>

            <Grid item lg={5.5} md={5} sx={{ mt: 4 }} marginRight={"60px"}>
              <div className="footer-body-head">
                <Typography
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.2rem!important",
                    fontSize: "20px",
                  }}
                >
                  Address
                </Typography>

                <ul className="footer-body-content">
                  {/* <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      <a
                        href="mailto:contactus@accredian.com"
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        {" "}
                        Email us : contactus@accredian.com
                      </a>
                    </Typography>
                  </li> */}

                  {/* <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      <a
                        href="mailto:pm@accredian.com"
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        Email us (For Product Management
                        Queries):pm@accredian.com
                      </a>
                    </Typography>
                  </li>
                  <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      <a
                        href="tel:+919079653292"
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        {" "}
                        Data Science Admission Helpline:+91 9079653292 (9 AM - 7
                        PM)
                      </a>
                    </Typography>
                  </li>
                  <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      <a
                        href="tel:+917619555873"
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        {" "}
                        Product Management Admission Helpline:+91 7619555873
                      </a>
                    </Typography>
                  </li> */}
                  {/* <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      <h1>
                        Enrolled Student Helpline:{" "}
                        <a
                          href="tel:07969547220"
                          style={{ textDecoration: "none", color: "#fff" }}
                        >
                          07969547220
                        </a>
                      </h1>
                    </Typography>
                  </li> */}
                  <li className="pt-4">
                    <Typography
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        marginBottom: "0.2rem!important",
                        fontSize: "14px",
                      }}
                    >
                      {" "}
                      Office Address: 4th Floor, 250, Phase IV, Udyog Vihar,
                      Sector 18, Gurugram, Haryana
                    </Typography>
                  </li>
                </ul>
                {/* <Typography
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0rem!important",
                    fontSize: "20px",
                    fontWeight: 300,
                  }}
                >
                  Why Accredian
                </Typography> */}
                {/* <ul className="footer-body-content">
                  <li className="pt-4 pb-4">
                    <Link href="/whyaccredian" prefetch={false} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          marginBottom: "0rem!important",
                          fontSize: "18px",
                        }}
                      >
                        Why Accredian
                      </Typography>
                    </Link>
                  </li>
                </ul> */}
                {/* <Typography
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    marginBottom: "0.3rem!important",
                    fontSize: "20px",
                    fontWeight: 300,
                  }}
                >
                  Follow Us
                </Typography> */}
              </div>
            </Grid>
          </Grid>

          <hr />
          <div className="block md:hidden">
            <Grid className="footer-body mt-6">
              <Typography
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  marginBottom: "0.2rem!important",
                  fontSize: "20px",
                }}
              >
                Programs
              </Typography>
              {/* <div className="flex flex-wrap md:grid md:grid-cols-3 gap"> */}
              {Object.keys(categorizedPrograms).map((category, index) => {
                const matchingContact = categoriesWithContacts.find(
                  (item) =>
                    item.category.toLowerCase() === category.toLowerCase()
                );
                return (
                  <MobileProgramFooter
                    key={index}
                    categorizedPrograms={categorizedPrograms}
                    category={category}
                    index={index}
                    matchingContact={matchingContact}
                  />
                );
              })}
              {/* </div> */}
              {/* ------------------------------------------- */}
            </Grid>
          </div>
          <div className="mt-4 mb-4"></div>

          <div className="hidden md:block">
            <Grid className="footer-body mt-6">
              <Typography
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  marginBottom: "0.2rem!important",
                  fontSize: "20px",
                }}
              >
                Programs
              </Typography>
              <div className="grid grid-cols-3 gap-10 ">
                {Object.keys(categorizedPrograms).map((category, index) => {
                  const matchingContact = categoriesWithContacts.find(
                    (item) =>
                      item.category.toLowerCase() === category.toLowerCase()
                  );
                  return (
                    <React.Fragment key={index}>
                      <div className="mt-4 ">
                        <div className="flex gap-1 flex-col">
                          <Typography
                            sx={{
                              color: "#fff",
                              textDecoration: "none",
                              // marginBottom: "1rem!important",
                              fontSize: "17px",
                              fontWeight: "bold",
                              textTransform:
                                category.toLowerCase() === "cxo"
                                  ? "uppercase"
                                  : "capitalize",
                            }}
                          >

                            {category.toLowerCase() === "cxo leadership" ? "CXO Leadership" : category.toLowerCase() === "pg diploma" ? "PG Diploma" : category.replace(/(\bai\b)/gi, "AI")}
                          </Typography>
                          <div
                            className="flex gap-4 cursor-pointer mb-4 text-[12px]"
                            onClick={() =>
                              (window.location.href = `tel:${matchingContact.contact}`)
                            }
                          >
                            <div className="">
                              {/* <Phone size={20} /> */}({" "}
                              <PhoneForwarded
                                size={12}
                                className="inline mr-2"
                              />
                              {/* <IoCall size={12} className="inline mr-2" /> */}
                              <p className="pl-[1px] pr-[1px] inline">
                                {matchingContact.contact})
                              </p>
                            </div>
                            <div className="text-md"></div>
                          </div>
                        </div>

                        <div>
                          <ul className="footer-body-content w-full">
                            {categorizedPrograms &&
                              categorizedPrograms[category].map(
                                (program, innerIndex) => (
                                  <li
                                    key={`${program.id}-${innerIndex}`}
                                    className="pb-2 text-gray-400"
                                  >
                                    <Link
                                      href={program.category?.toLowerCase() === "free courses" || program.category?.toLowerCase() === "microsoft" || program.id === "transform-business-workflows-with-generative-ai" || program.id === "transform-ideas-into-impact-with-product-management" ? `/free-courses/${program.id}` : `/programs/${program.id}`}
                                      prefetch={false}
                                      style={{ textDecoration: "none" }}
                                    >
                                      <Typography
                                        sx={{
                                          color: "white",
                                          textDecoration: "none",
                                          marginBottom: "0rem!important",
                                          fontSize: "13px",
                                          fontWeight: 400,
                                        }}
                                      >
                                        {program.university_name} -{" "}
                                        {program.program_name}
                                      </Typography>
                                    </Link>
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      </div>
                      {(index + 1) % 3 === 0 &&
                        index !==
                        Object.keys(categorizedPrograms).length - 1 && (
                          <div className="col-span-3 mt-4">
                            <hr style={{ borderColor: "#fff" }} />
                          </div>
                        )}
                    </React.Fragment>
                  );
                })}
              </div>
              {/* ------------------------------------------- */}
            </Grid>
          </div>
          <div className="mt-4 mb-4"></div>

          <hr />
          <Box>
            <Typography
              sx={{
                color: "#fff",
                textAlign: "center",
                py: 5,
                marginBottom: "0rem!important",
                fontSize: "14px",
              }}
            >
              © {new Date().getFullYear()} Accredian A Brand of FullStack Education Pvt Ltd. All
              Rights Reserved
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ✅ Custom Floating Action Button — replaces react-floating-button-menu */}
      <div className={`fixed right-6 z-[99] flex flex-col items-center gap-3 transition-all duration-300 ${isStickyBottomActive ? "bottom-[88px]" : "bottom-6"}`}>
        {/* Child buttons — slide up when open */}
        <div
          className="flex flex-col items-center gap-3 transition-all duration-300"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(20px)",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {/* Chat button */}
          <Tooltip title="Chat" placement="left">
            <button
              onClick={() => { setIsChatBotOpen(true); setIsOpen(false); }}
              aria-label="Open chat"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#2563EB",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(37,99,235,0.45)",
                color: "#fff",
              }}
            >
              <ChatBubbleOutlineIcon style={{ fontSize: 20 }} />
            </button>
          </Tooltip>

          {/* Call back button */}
          <Tooltip title="Request Call Back" placement="left">
            <button
              onClick={() => { handleClickOpenRcb(); setIsOpen(false); }}
              aria-label="Request call back"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#2563EB",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(37,99,235,0.45)",
                color: "#fff",
              }}
            >
              <CallIcon style={{ fontSize: 20 }} />
            </button>
          </Tooltip>
        </div>

        {/* Main FAB toggle button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          style={{
            width: 54,       // was 60
            height: 54,      // was 60
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(37,99,235,0.5)",
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(45deg) scale(1.05)" : "scale(1)",
          }}
        >
          {isOpen ? (
            <span style={{ color: "#fff", fontSize: 24, lineHeight: 1 }}>✕</span>
          ) : (
            <ChatBubbleOutlineIcon style={{ fontSize: 28, color: "#fff" }} />
          )}
        </button>
      </div>

      <SubFooter />
      <FloatingChatWidget isOpen={isChatBotOpen} setIsChatBotOpen={setIsChatBotOpen} />
      <Rcta open={cta} handleClose={RcbhandleClose} />
      {/* {isFreshchatOpen && ( */}
      {/* <FreshChat
        token={process.env.NEXT_PUBLIC_FRESHCHAT_TOKEN}
        host={"https://insaid.freshchat.com"}
        email="user@email.com"
        // onWidgetClose={()=>{setisFreshchatOpen(false)}}
        config={{
          headerProperty: {
            hideChatButton: true,
            backgroundColor: "#3498db",
            foregroundColor: "#ffffff",
          },
        }}
        externalId={"john.doe1987"} // user’s id unique to your system
        first_name="..."
        onInit={(widget) => {
          // //console.log(888, widget.open());
          // //console.log(111, widget.user.get());
          // //console.log(
          //   333,
          //   widget.on("user:created", function (resp) {
          //     //console.log(11, resp);
          //     var status = resp && resp.status,
          //       data = resp && resp.data;
          //   })
          // );
        }}
        onHide={(widget) => {
          // //console.log(11, widget);
        }}
      /> */}
      {/* )} */}
    </>
  );
};

export default Footer;
