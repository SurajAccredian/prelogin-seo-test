"use client";

import React, { useState } from "react";
import Image from "next/image";
import Modal from "../ui/Modal";
import { IoIosClose } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import vertical from "../Assets/programs.json";
import { groupProgramsByCategory } from "../../helpers/common.helpers";
import ReCAPTCHA from "react-google-recaptcha";
import { getStoredUTMData } from "../../helpers/utm.helpers";
import { trackGoogleAdsLeadConversion } from "../../helpers/googleAds.helpers";

const streams = Object.keys(groupProgramsByCategory(vertical));

// Default enquiry number
const ENQUIRY_NUMBER = "7619555873";

function RctaInner(props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [program, setProgram] = useState("");

  const handleChange = (event) => {
    setProgram(event.target.value);
  };

  const [loader, setLoader] = useState(false);

  const LoaderClose = () => {
    setLoader(false);
  };
  const LoaderOpen = () => {
    setLoader(true);
  };

  const [rcb, setRcb] = useState({
    mobile: "",
    name: "",
    newemail: "",
    query: "",
    program: "",
    ctaname: "",
    ctapage: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
  };

  const rcbhandleChange = (e) => {
    setRcb({ ...rcb, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!rcb.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!rcb.newemail.trim()) {
      newErrors.newemail = "Email is required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        rcb.newemail
      )
    ) {
      newErrors.newemail = "Please enter a valid email";
    }

    if (!rcb.mobile.trim()) {
      newErrors.mobile = "Contact number is required";
    } else if (rcb.mobile.length < 8) {
      newErrors.mobile = "Must provide valid contact number";
    }

    if (!props.program && !program) {
      newErrors.program = "Please select a category";
    }

    if (rcb.query && rcb.query.length > 250) {
      newErrors.query = "Message should be under 250 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const ctapage = pathname === "/" ? "homepage" : pathname.replace("/", "");

  const submitForm = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    LoaderOpen();

    const utmData = getStoredUTMData();
    const resolvedSource = props.source || "Request Callback Top Bar";

    const sendRcbctaData = {
      phone: rcb.mobile,
      name: rcb.name,
      email: rcb.newemail,
      query: rcb.query,
      program: props.program ? props.program : program,
      source: resolvedSource,
      page: ctapage,
      utm_source: utmData.utm_source || "Direct",
      utm_medium: utmData.utm_medium || "website-organic",
      utm_campaign: utmData.utm_campaign || searchParams.get("utm_campaign") || "",
      utm_content: utmData.utm_content || "",
      utm_adset: utmData.utm_adset || "",
      utm_ad: utmData.utm_ad || "",
      utm_term: utmData.utm_term || "",
      utm_format: utmData.utm_format || "",
      cta_button: resolvedSource,
      form_id: "request_callback",
      type: "CTA",
    };

    const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD || "https://api.accredian.com";

    axios
      .post(
        `${endpoint}/common_publish/commonPublish`,
        JSON.stringify(sendRcbctaData),
        options
      )
      .then((result) => {
        LoaderClose();
        props.handleClose();

        if (result.data.status == "200") {
          trackGoogleAdsLeadConversion();
          if (window) {
            window.open("/cta-thank-you", "_blank");
          }
          setRcb({
            mobile: "",
            name: "",
            newemail: "",
            query: "",
            program: "",
            ctaname: "",
            ctapage: "",
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
          });
          setProgram("");
          setCaptchaVerified(false);
        } else {
          import("sweetalert2").then(({ default: Swal }) => {
            Swal.fire({
              title: "Warning",
              text: "Something went wrong. Please try again!",
              icon: "warning",
              confirmButtonText: "OK",
            });
          });
        }
      })
      .catch(() => {
        LoaderClose();
        import("sweetalert2").then(({ default: Swal }) => {
          Swal.fire({
            title: "Warning",
            text: "Something went wrong. Please try again!",
            icon: "warning",
            confirmButtonText: "OK",
          });
        });
      });
  };

  const handleClose = () => {
    if (loader) {
      return;
    } else {
      props.handleClose();
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden font-circular relative"
    >
      {/* Backdrop loader */}
      {loader && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-30 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-universal" />
        </div>
      )}

      {/* Close button */}
      <div className="absolute top-3 right-3 z-20">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
        >
          <IoIosClose className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="bg-white w-full py-6 px-4 sm:px-6 flex items-start gap-4 max-h-[90vh] overflow-y-auto">
        {/* Left side image section */}
        <div className="md:flex flex-col items-center justify-between gap-4 hidden flex-[0.5] h-full pt-4">
          <div className="max-w-sm w-full border-r-[1px] border-neutral-100 pr-4">
            <Image
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/get-in-touch.webp"
              alt="get-in-touch"
              width={384}
              height={384}
              quality={75}
              className="w-full h-auto"
            />
          </div>
          {/* Enquiry number for desktop */}
          <div className="w-full mt-4 flex justify-center items-center gap-4 bg-blue-50 border border-blue-300 py-4 px-4 rounded-lg">
            <div className="w-8 h-8 flex-shrink-0 p-1 border-2 rounded-lg border-universal bg-white">
              <CiPhone className="w-full h-full text-universal" />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-gray-800">To Inquire</p>
              <span className="text-gray-600">-</span>
              <a
                href={`tel:${ENQUIRY_NUMBER}`}
                className="underline font-semibold text-universal"
              >
                {ENQUIRY_NUMBER}
              </a>
            </div>
          </div>
        </div>

        {/* Right side form section */}
        <div className="flex-1 w-full md:flex-[0.5] flex flex-col items-center md:pl-4">
          <div className="w-full text-center mb-6 block md:hidden">
            <h2 className="text-2xl font-bold text-gray-900">Request a Callback</h2>
            <p className="text-sm text-gray-500 mt-1">Fill the simple form below to get in touch</p>
          </div>
          <form
            className="w-full h-full flex flex-col justify-between"
            onSubmit={submitForm}
          >
            <div className="w-full">
              {/* Name field */}
              <div className="relative mb-4">
                <input
                  className={`w-full py-3 px-2 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed mt-2
${errors["name"] ? "border-rose-500" : "border-neutral-300"} 
${errors["name"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Name (Required)"
                  value={rcb.name}
                  onChange={rcbhandleChange}
                />
                {errors.name && (
                  <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                    <span className="mt-[-1px]">
                      <IoWarning />
                    </span>
                    <p>{errors.name}</p>
                  </div>
                )}
              </div>

              {/* Email field */}
              <div className="relative mb-4">
                <input
                  className={`w-full py-3 px-2 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed mt-2
${errors["newemail"] ? "border-rose-500" : "border-neutral-300"} 
${errors["newemail"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                  id="newemail"
                  type="email"
                  name="newemail"
                  placeholder="Email (Required)"
                  value={rcb.newemail}
                  onChange={rcbhandleChange}
                />
                {errors.newemail && (
                  <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                    <span className="mt-[-1px]">
                      <IoWarning />
                    </span>
                    <p>{errors.newemail}</p>
                  </div>
                )}
              </div>

              {/* Mobile field */}
              <div className="relative mb-4">
                <input
                  className={`w-full py-3 px-2 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed mt-2
${errors["mobile"] ? "border-rose-500" : "border-neutral-300"} 
${errors["mobile"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                  id="mobile"
                  type="number"
                  name="mobile"
                  placeholder="Mobile (Required)"
                  value={rcb.mobile}
                  onChange={rcbhandleChange}
                />
                {errors.mobile && (
                  <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                    <span className="mt-[-1px]">
                      <IoWarning />
                    </span>
                    <p>{errors.mobile}</p>
                  </div>
                )}
              </div>

              {/* Program dropdown */}
              {!props.program && (
                <div className="relative mt-4 mb-4">
                  <select
                    id="program"
                    name="program"
                    value={program}
                    onChange={handleChange}
                    className={`w-full py-3 px-2 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed mt-2 ${errors.program
                        ? "border-rose-500 focus:border-rose-500"
                        : "border-neutral-300 focus:border-blue-500"
                      } ${program === "" ? "text-gray-500" : "text-gray-900"}`}
                  >
                    <option value="">---- Select Category ----</option>
                    {streams.map((stream) => (
                      <option
                        key={stream.toUpperCase()}
                        value={stream}
                        className="text-gray-900"
                      >
                        {stream.toLowerCase() === "cxo leadership"
                          ? "CXO Leadership"
                          : stream.toLowerCase() === "data science & ai"
                            ? "Data Science & AI"
                            : stream}
                      </option>
                    ))}
                  </select>
                  {errors.program && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.program}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Policy text */}
              <div className="w-full mt-6 text-center">
                <h3 className="text-xs font-medium text-gray-500 py-2 pt-4 border-t-[1px] border-neutral-100">
                  By submitting the form, you agree to our{" "}
                  <Link href="/terms" prefetch={false} className="text-universal transition hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and our{" "}
                  <Link href="/terms/privacy" prefetch={false} className="text-universal transition hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </h3>
              </div>
            </div>

            {/* ReCAPTCHA */}
            <div className="pt-2 pb-2 flex justify-center w-full transform scale-[0.85] sm:scale-100 origin-center">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                onChange={onCaptchChange}
              />
            </div>

            {/* Submit button */}
            <button
              data-track="Request a Callback"
              disabled={loader || !captchaVerified}
              className={`disabled:bg-gray-300 disabled:text-gray-500 disabled:border-transparent hover:bg-darkBlue text-lg relative mt-2 px-4 py-3 bg-universal font-medium text-white w-full flex justify-center items-center rounded-lg shadow-md border border-universal transition-colors`}
              type="submit"
            >
              {loader ? (
                <Loader2 className="w-6 h-6 animate-spin text-white" />
              ) : (
                "Request a Callback"
              )}
            </button>
          </form>

          {/* Enquiry number for mobile */}
          <div className="mt-8 flex md:hidden flex-col items-center gap-4 w-full">
            <div className="flex items-center gap-2 w-full">
              <div className="flex-[0.45] border border-neutral-200" />
              <p className="flex-[0.1] text-sm font-medium text-gray-400 text-center uppercase tracking-wider">
                or
              </p>
              <div className="flex-[0.45] border border-neutral-200" />
            </div>
            <div className="w-full flex justify-center items-center gap-4 bg-blue-50 border border-blue-200 py-3 px-4 rounded-lg">
              <div className="w-8 h-8 flex-shrink-0 p-1 border-2 rounded-lg border-universal bg-white">
                <CiPhone className="w-full h-full text-universal" />
              </div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-800">To Inquire</p>
                <span className="text-gray-400">-</span>
                <a
                  href={`tel:${ENQUIRY_NUMBER}`}
                  className="underline font-semibold text-universal"
                >
                  {ENQUIRY_NUMBER}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default function Rcta(props) {
  return (
    <React.Suspense fallback={null}>
      <RctaInner {...props} />
    </React.Suspense>
  );
}
