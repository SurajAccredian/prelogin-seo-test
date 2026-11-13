"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import { usePathname, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Modal from "../ui/Modal";
import { getStoredUTMData } from "../../helpers/utm.helpers";
import { trackGoogleAdsLeadConversion } from "../../helpers/googleAds.helpers";

const dropdown = [
  { value: "Data Science", label: "Data Science" },
  { value: "Product Management", label: "Product Management" },
  { value: "General Management", label: "General Management" },
  { value: "Digital Transformation", label: "Digital Transformation" },
  { value: "Business Management", label: "Business Management" },
  { value: "Project Management", label: "Project Management" },
  { value: "strategic management", label: "strategic management" },
  { value: "Senior Management", label: "Senior Management" },
  { value: "Finance", label: "Finance" },
];

const CareerTransitionContent = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [program, setProgram] = useState("");

  const handleChange = (event) => {
    setProgram(event.target.value);
  };

  const LoaderClose = () => setOpen(false);
  const LoaderOpen = () => setOpen(true);

  const [rcb, setRcb] = useState({
    mobile: "",
    name: "",
    newemail: "",
    program: "",
  });

  const rcbhandleChange = (e) => {
    setRcb({ ...rcb, [e.target.name]: e.target.value });
  };

  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const ctapage = pathname ? pathname.replace("/", "") : "";

  const submitForm = async (e) => {
    e.preventDefault();
    if (number && number.length > 2) {
      LoaderOpen();
      const utmData = getStoredUTMData();
      const resolvedSource = props.source || "career transition";

      const sendRcbctaData = {
        phone: number,
        name: rcb.name,
        email: rcb.newemail,
        program: props.program ? props.program : program,
        source: resolvedSource,
        page: ctapage,
        utm_source: utmData.utm_source || "Direct",
        utm_medium: utmData.utm_medium || "website-organic",
        utm_campaign: utmData.utm_campaign || searchParams?.get("utm_campaign") || "",
        utm_content: utmData.utm_content || "",
        utm_adset: utmData.utm_adset || "",
        utm_ad: utmData.utm_ad || "",
        utm_term: utmData.utm_term || "",
        utm_format: utmData.utm_format || "",
        cta_button: resolvedSource,
        form_id: "career_transition",
        type: "CTA",
      };

      try {
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/common_publish/commonPublish`,
          JSON.stringify(sendRcbctaData),
          options
        );

        LoaderClose();
        if (props.handleClose) props.handleClose();

        const Swal = (await import("sweetalert2")).default;

        if (result.data.status === "200" || result.data.status === 200) {
          trackGoogleAdsLeadConversion();
          Swal.fire({
            title: "Thank You",
            text: "Thank you for downloading the career handbook. Our executive will contact you to provide more information about the course!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((conf) => {
            if (conf.isConfirmed) {
              window.open(
                "https://storage.googleapis.com/accredian-assets/Frontend_Assests/PDF/Career-Handbook.pdf",
                "_blank"
              );
            }
          });
          setRcb({ mobile: "", name: "", newemail: "", program: "" });
          setNumber("");
          setProgram("");
        } else {
          Swal.fire({
            title: "Oops!",
            text: "We are facing server issue, please try again in sometime.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } catch {
        LoaderClose();
        const Swal = (await import("sweetalert2")).default;
        Swal.fire({
          title: "Error",
          text: "Request failed. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      toast.error("Please enter a valid mobile number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        showCloseButton={true}
        maxWidth="max-w-[733px]"
        className="p-4 sm:p-6"
      >
        <div className="relative">
          {/* Backdrop Loader */}
          {open && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Image column — hidden on mobile */}
            <div className="hidden sm:flex sm:w-5/12 justify-center items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/cta.png"
                alt="CTA Image"
                className="w-[300px] h-[350px] object-cover shadow-[8px_8px_#d6d6d6] mt-3 rounded"
              />
            </div>

            {/* Form column */}
            <div className="w-full sm:w-7/12 px-2 sm:px-3">
              <div className="mb-2 text-center">
                <h4 className="text-[22px] font-medium font-poppins text-gray-900">
                  Download Handbook
                </h4>
              </div>

              <div className="mb-4 text-center">
                <p className="text-[18px] font-poppins text-[#344563]">
                  Fill in the below details to receive your copy
                </p>
              </div>

              <form onSubmit={submitForm} className="space-y-3">
                <div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    value={rcb.name}
                    onChange={rcbhandleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <input
                    id="newemail"
                    name="newemail"
                    type="email"
                    required
                    placeholder="Email"
                    value={rcb.newemail}
                    onChange={rcbhandleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div>
                  <PhoneInput
                    containerClass="career"
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ width: "100%", height: "42px" }}
                    enableSearch={true}
                    country={"in"}
                    inputProps={{
                      name: "mobile",
                      required: true,
                    }}
                    placeholder="Enter phone number"
                    value={number}
                    onChange={setNumber}
                  />
                </div>

                {!props.program && (
                  <div>
                    <select
                      id="program"
                      name="program"
                      required
                      value={program}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="" disabled>
                        Select the vertical
                      </option>
                      {dropdown.map((ct) => (
                        <option key={ct.value} value={ct.value}>
                          {ct.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-[#0039e6] hover:bg-[#002bb3] text-white font-medium rounded-md shadow transition-colors text-sm"
                  >
                    Download
                  </button>
                </div>

                <p className="text-[0.8rem] text-[#858e9f] text-center pt-1">
                  Note: You will receive a call between Mon-Fri from 10am - 6pm.
                </p>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default function CareerTransition(props) {
  return (
    <React.Suspense fallback={null}>
      <CareerTransitionContent {...props} />
    </React.Suspense>
  );
}
