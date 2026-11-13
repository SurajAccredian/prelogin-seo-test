"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Grid, Typography, Button, Box, Container, Tooltip } from "../ui/LayoutPrimitives";
import Link from "next/link";
import SubFooter from "./SubFooter";
import { MessageSquare as ChatBubbleOutlineIcon, Phone as CallIcon } from "lucide-react";
import {
  FaFacebookF as FacebookIcon,
  FaLinkedinIn as LinkedInIcon,
  FaTwitter as TwitterIcon,
  FaInstagram as InstagramIcon,
  FaYoutube as YouTubeIcon,
} from "react-icons/fa";
import "./Footer.css";
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
  const categorizedPrograms = React.useMemo(() => groupProgramsByCategory(programs) || [], []);
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

  return (
    <>
      <Box className="footer" sx={{ fontFamily: "circular" }}>
        <Container fixed sx={{ maxWidth: "85rem" }}>
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6 md:gap-0">
            <div className="flex flex-col">
              <Image
                style={{ width: "9rem", height: "auto" }}
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/accredainnew.webp"
                alt="Accredian logo"
                width={144}
                height={38}
                quality={75}
              />
              <div className="flex mt-4 gap-4 items-center">
                <a
                  href="https://facebook.com/accredianlearn"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white hover:text-blue-400 transition"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <FacebookIcon className="text-[1.7rem]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/accredianedu/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white hover:text-blue-400 transition"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <LinkedInIcon className="text-[1.7rem]" />
                </a>
                <a
                  href="https://twitter.com/accredianedu"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white hover:text-blue-400 transition"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <TwitterIcon className="text-[1.7rem]" />
                </a>
                <a
                  href="https://www.instagram.com/accredian_edu"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white hover:text-pink-400 transition"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <InstagramIcon className="text-[1.7rem]" />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCE0L_4ADPU2iyKnDJ0xRzyA"
                  rel="noreferrer"
                  target="_blank"
                  className="text-white hover:text-red-500 transition"
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <YouTubeIcon className="text-[1.7rem]" />
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0">
              <button
                type="button"
                onClick={handleClickOpenRcb}
                className="bg-[#1A73E8] text-white rounded-md font-medium text-sm px-6 py-2.5 w-[250px] max-w-full mb-1.5 hover:bg-blue-600 transition cursor-pointer"
              >
                Schedule 1-on-1 Call Now
              </button>
              <span className="footer-head-right-text text-sm text-gray-300">
                Speak with our Learning Advisor
              </span>
            </div>
          </div>

          <hr />

          <div className="footer-body mb-6 flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-14">
            <div className="w-full md:w-1/5 mt-4">
              <div className="footer-body-head">
                <p className="text-white text-[20px] font-light mb-3">
                  Accredian
                </p>
                <ul className="flex flex-col space-y-3 text-sm text-white">
                  <li>
                    <Link href="/about" prefetch={false} className="hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/career" prefetch={false} className="hover:underline">
                      Career
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" prefetch={false} className="hover:underline">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a href="/whyaccredian" className="hover:underline">
                      Why Accredian
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full md:w-1/3 mt-4">
              <div className="footer-body-head w-full">
                <p className="text-white text-[20px] font-light mb-3">
                  Support
                </p>
                <div className="flex flex-col md:flex-row gap-3 md:gap-8 text-sm text-white">
                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/policies/accredian-policy"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Admission Policy
                    </Link>
                    <Link
                      href="/terms/referral"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Referral Policy
                    </Link>
                    <Link
                      href="/refund-policies/accredian-policy"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Refund Policy
                    </Link>
                    <Link
                      href="/terms/privacy"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms/cookie-policy"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Cookie Policy
                    </Link>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <Link
                      href="/terms/cancellation"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Cancellation Policy
                    </Link>
                    <Link
                      href="/terms"
                      prefetch={false}
                      className="hover:underline"
                    >
                      Terms Of Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/5 mt-4">
              <div className="footer-body-head">
                <p className="text-white text-[20px] font-light mb-3">
                  Address
                </p>
                <p className="text-sm text-white/90 leading-relaxed max-w-sm">
                  Office Address: 4th Floor, 250, Phase IV, Udyog Vihar,
                  Sector 18, Gurugram, Haryana
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-neutral-700 my-6" />
          <div className="block md:hidden">
            <div className="footer-body mt-6">
              <p className="text-white text-[20px] font-light mb-4">
                Programs
              </p>
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
            </div>
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
                              (window.location.href = `tel:${matchingContact.contact.replace(/\s/g, "")}`)
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

          <div className="border-t border-neutral-700 mt-8 py-6 pb-8 md:pb-8 text-center">
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed px-4">
              © {new Date().getFullYear()} Accredian A Brand of FullStack Education Pvt Ltd. All
              Rights Reserved
            </p>
          </div>
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
      <Rcta
        open={cta}
        handleClose={RcbhandleClose}
        source="Schedule 1-on-1 Call Now"
      />
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
