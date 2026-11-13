"use client";
import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/material.css";
import Modal from "../ui/Modal";
import { IoIosClose } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "./phone-input.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReCAPTCHA from "react-google-recaptcha";
import { detectBrowserLocation } from "../../helpers/location.helpers";
import { getStoredUTMData } from "../../helpers/utm.helpers";
import { getFbc, getFbp } from "../../helpers/cookie.helpers";
import { fetchClientIp } from "../../helpers/ip.helpers";
import { getBrochureCta } from "../../services/program.service";
import { trackGoogleAdsLeadConversion } from "../../helpers/googleAds.helpers";
import { trackBrochureLeadSubmit } from "../../helpers/gtm.helpers";

const BrochureContent = (props) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  var ctapage = pathname === "/" ? "homepage" : pathname.replace("/", "");
  const campaign_name = props?.campaign_name !== undefined ? props.campaign_name : null;

  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle"); // 'idle' | 'detecting' | 'detected' | 'fallback'
  const [detectedLocation, setDetectedLocation] = useState({ city: "", state: "", country: "" });
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [userIp, setUserIp] = useState("");

  const [cta, setCta] = useState({
    mobile: "",
    name: "",
    newemail: "",
    city: "",
    state: "",
    country: "",
    fbc_field: "",
    fbp_field: "",
    ip_field: "",
    ctapage: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_adset: "",
    utm_ad: "",
    utm_term: "",
    utm_format: "",
  });

  // Automatically populate first-touch UTM attribution from sessionStorage / URL on open
  useEffect(() => {
    if (props.open) {
      const utmData = getStoredUTMData();
      setCta((prev) => ({
        ...prev,
        utm_source: utmData.utm_source || "",
        utm_medium: utmData.utm_medium || "",
        utm_campaign: utmData.utm_campaign || "",
        utm_content: utmData.utm_content || "",
        utm_adset: utmData.utm_adset || "",
        utm_ad: utmData.utm_ad || "",
        utm_term: utmData.utm_term || "",
        utm_format: utmData.utm_format || "",
        fbc_field: getFbc(),
        fbp_field: getFbp(),
      }));
      fetchClientIp().then((ip) => {
        if (ip) {
          setUserIp(ip);
          setCta((prev) => ({ ...prev, ip_field: ip }));
        }
      });
    }
  }, [props.open]);

  // Automatically request browser geolocation & reverse geocode via OpenStreetMap Nominatim
  useEffect(() => {
    let isMounted = true;
    if (props.open) {
      detectBrowserLocation().then((res) => {
        if (!isMounted) return;
        if (res.success && res.data && (res.data.city || res.data.state || res.data.country)) {
          setLocationStatus("detected");
          setDetectedLocation(res.data);
          setCta((prev) => ({
            ...prev,
            city: res.data.city || "",
            state: res.data.state || "",
            country: res.data.country || "",
          }));
          setShowManualLocation(false);
        } else {
          setLocationStatus("fallback");
          setShowManualLocation(true);
        }
      });
    } else {
      setShowManualLocation(false);
      setDetectedLocation({ city: "", state: "", country: "" });
    }
    return () => {
      isMounted = false;
    };
  }, [props.open]);

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  const ctahandleChange = (e) => {
    setCta({ ...cta, [e.target.name]: e.target.value });
  };
  const LoaderClose = () => {
    setLoader(false);
  };
  const LoaderOpen = () => {
    setLoader(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (number.length > 2) {
      LoaderOpen();

      const finalCity = (cta.city || detectedLocation.city || "").trim();
      const finalState = (cta.state || detectedLocation.state || "").trim();
      const finalCountry = (cta.country || detectedLocation.country || "").trim();
      const utmData = getStoredUTMData();

      const sendRcbctaData = {
        phone: number,
        name: cta.name,
        email: cta.newemail,
        city: finalCity,
        state: finalState,
        country: finalCountry,
        fbc_field: cta.fbc_field || getFbc(),
        fbp_field: cta.fbp_field || getFbp(),
        ip_field: userIp || cta.ip_field || "",
        program: props.program,
        source: "Download Brochure",
        page: ctapage,
        utm_source: cta.utm_source || utmData.utm_source || "Direct",
        utm_medium: cta.utm_medium || utmData.utm_medium || "website-organic",
        utm_campaign: cta.utm_campaign || utmData.utm_campaign || "",
        utm_content: cta.utm_content || utmData.utm_content || "",
        utm_adset: cta.utm_adset || utmData.utm_adset || "",
        utm_ad: cta.utm_ad || utmData.utm_ad || "",
        utm_term: cta.utm_term || utmData.utm_term || "",
        utm_format: cta.utm_format || utmData.utm_format || "",
        campaign_name,
        form_id: "brochure",
        type: "CTA",
      };

      // 1. Push to dataLayer with eid and stamp sendRcbctaData.mx_Event_ID = eid
      trackBrochureLeadSubmit(sendRcbctaData, pathname);

      try {
        // 2. Send payload containing the exact same mx_Event_ID to backend
        const result = await getBrochureCta(sendRcbctaData);
        LoaderClose();
        props.handleClose();

        const Swal = (await import("sweetalert2")).default;
        if (result?.data?.status == "200" || result?.status === 200) {
          trackGoogleAdsLeadConversion();
          Swal.fire({
            title: "Thank You",
            text: "Thank you for downloading the brochure. Our executive will contact you to provide more information about the course!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((conf) => {
            if (conf.isConfirmed) {
              if (props.pdf) window.open(props.pdf, "_blank");
            }
          });

          setCta({
            mobile: "",
            name: "",
            newemail: "",
            city: "",
            state: "",
            country: "",
            fbc_field: "",
            fbp_field: "",
            ip_field: "",
            ctapage: "",
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_content: "",
            utm_adset: "",
            utm_ad: "",
            utm_term: "",
            utm_format: "",
          });
          setNumber("");
          setCaptchaVerified(false);
        } else {
          Swal.fire({
            title: "Oops!",
            text: "We are facing server issue, please try again in sometime.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } catch (err) {
        LoaderClose();
        console.error("Brochure submission error:", err);
        const Swal = (await import("sweetalert2")).default;
        Swal.fire({
          title: "Oops!",
          text: "We are facing server issue, please try again in sometime.",
          icon: "warning",
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
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        maxWidth="max-w-[440px]"
        className="p-0 overflow-hidden font-circular relative bg-white rounded-2xl shadow-2xl"
      >
        {loader && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-30 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}
        <div className="relative p-6 pt-4">
          <button
            type="button"
            onClick={props.handleClose}
            aria-label="Close"
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <IoIosClose className="w-6 h-6" />
          </button>

          {props.image && (
            <div className="w-full flex justify-center items-center mb-3">
              <img
                src={props.image}
                alt="Organization Logo"
                className="w-[200px] object-contain hidden sm:block"
              />
            </div>
          )}

          <div className="text-center mb-1">
            <h4 className="text-xl font-semibold text-gray-900 font-sans">
              Your Brochure is Ready
            </h4>
          </div>
          <div className="text-center mb-4">
            <p className="text-sm text-[#344563] leading-relaxed">
              Fill the form to know about Certificate, Faculty, curriculum and more
            </p>
          </div>
          <div>
            <form onSubmit={submitForm}>
                  <input type="hidden" id="fbc_field" name="fbc_field" value={cta.fbc_field || ""} />
                  <input type="hidden" id="fbp_field" name="fbp_field" value={cta.fbp_field || ""} />
                  <input type="hidden" id="ip_field" name="ip_field" value={cta.ip_field || ""} />
                  <input type="hidden" id="utm_source" name="utm_source" value={cta.utm_source || ""} />
                  <input type="hidden" id="utm_medium" name="utm_medium" value={cta.utm_medium || ""} />
                  <input type="hidden" id="utm_campaign" name="utm_campaign" value={cta.utm_campaign || ""} />
                  <input type="hidden" id="utm_content" name="utm_content" value={cta.utm_content || ""} />
                  <input type="hidden" id="utm_adset" name="utm_adset" value={cta.utm_adset || ""} />
                  <input type="hidden" id="utm_ad" name="utm_ad" value={cta.utm_ad || ""} />
                  <input type="hidden" id="utm_term" name="utm_term" value={cta.utm_term || ""} />
                  <input type="hidden" id="utm_format" name="utm_format" value={cta.utm_format || ""} />
                  <div className="space-y-2 pb-2">
                    <input
                      id="standard-basic-name"
                      placeholder="Name *"
                      name="name"
                      onChange={ctahandleChange}
                      value={cta.name}
                      type="text"
                      required
                      className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-blue-600 transition"
                    />
                    <input
                      id="standard-basic-email"
                      placeholder="Email *"
                      type="email"
                      name="newemail"
                      onChange={ctahandleChange}
                      value={cta.newemail}
                      required
                      className="w-full border-b border-gray-300 py-2 text-sm outline-none focus:border-blue-600 transition"
                    />
                    <div className="pt-1">
                      <PhoneInput
                        inputStyle={{
                          width: "100%",
                        }}
                        enableSearch={true}
                        country={"in"}
                        inputProps={{
                          name: "mobile",
                          required: true,
                          autoFocus: true,
                        }}
                        size="small"
                        placeholder="Enter phone number"
                        value={number}
                        onChange={setNumber}
                      />
                    </div>

                    {/* Location Capture: Auto-detected or Manual fallback */}
                    {locationStatus === "detected" && !showManualLocation && (
                      <div className="mt-2 mb-1 p-2 bg-[#f0f7ff] rounded-lg border border-[#cce3ff]">
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-[#1e3a8a] font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                            📍 {[detectedLocation.city, detectedLocation.state, detectedLocation.country].filter(Boolean).join(", ")}
                          </p>
                          <span
                            onClick={() => setShowManualLocation(true)}
                            className="text-xs text-[#0039e6] cursor-pointer underline ml-2 whitespace-nowrap"
                          >
                            Edit
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          Location data © OpenStreetMap contributors
                        </p>
                      </div>
                    )}

                    {(showManualLocation || locationStatus === "fallback") && (
                      <div className="mt-2 mb-1 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-medium text-gray-600">
                            Location Details
                          </p>
                          {locationStatus === "detected" && (
                            <span
                              onClick={() => setShowManualLocation(false)}
                              className="text-[11px] text-[#0039e6] cursor-pointer underline"
                            >
                              Use auto-detected
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 mt-1">
                          <div className="flex gap-2 w-full">
                            <input
                              id="standard-basic-city"
                              placeholder="City *"
                              name="city"
                              onChange={ctahandleChange}
                              value={cta.city}
                              required
                              className="w-full border-b border-gray-300 py-1.5 text-xs outline-none focus:border-blue-600 transition"
                            />
                            <input
                              id="standard-basic-state"
                              placeholder="State *"
                              name="state"
                              onChange={ctahandleChange}
                              value={cta.state}
                              required
                              className="w-full border-b border-gray-300 py-1.5 text-xs outline-none focus:border-blue-600 transition"
                            />
                          </div>
                          <input
                            id="standard-basic-country"
                            placeholder="Country *"
                            name="country"
                            onChange={ctahandleChange}
                            value={cta.country}
                            required
                            className="w-full border-b border-gray-300 py-1.5 text-xs outline-none focus:border-blue-600 transition"
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Location data © OpenStreetMap contributors
                        </p>
                      </div>
                    )}

                    <div className="pt-2">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                        onChange={onCaptchChange}
                      />
                    </div>
                  </div>

                  <div className="mt-3 pb-1">
                    <button
                      className="w-full py-2.5 px-4 bg-[#0039e6] hover:bg-[#002bb8] text-white font-semibold rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed mb-2 shadow"
                      data-track="Download Brochure"
                      disabled={!captchaVerified || loader}
                      type="submit"
                    >
                      Download Brochure
                    </button>
                  </div>
                  <div>
                    <p className="text-xs text-center text-gray-500 mx-1">
                      By submitting the form, you agree to our{" "}
                      <a
                        className="text-gray-500 underline"
                        rel="noreferrer"
                        target="_blank"
                        href="https://accredian.com/terms"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and our{" "}
                      <a
                        rel="noreferrer"
                        target="_blank"
                        className="text-gray-500 underline"
                        href="https://accredian.com/terms/privacy"
                      >
                        Privacy Policy.
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default function Brochure(props) {
  if (!props.open) return null;
  return (
    <React.Suspense fallback={null}>
      <BrochureContent {...props} />
    </React.Suspense>
  );
}