"use client";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { getBrochureCta } from "../../../../services/program.service";
import { HashLoader } from "../../../Loaders";
import Disclaimer from "../../Disclaimer";
import ReCAPTCHA from "react-google-recaptcha";
import { allowedIds } from "../../../Assets/constants";
import { detectBrowserLocation } from "../../../../helpers/location.helpers";
import { getStoredUTMData } from "../../../../helpers/utm.helpers";
import "react-phone-input-2/lib/style.css";

const SideForm = () => {
  const { data } = useSelector((state) => state.program);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage =
    pathname === "/" ? "homepage" : pathname.replace("/", "");

  const [locationStatus, setLocationStatus] = useState("idle"); // 'idle' | 'detecting' | 'detected' | 'fallback'
  const [detectedLocation, setDetectedLocation] = useState({ city: "", state: "", country: "" });
  const [showManualLocation, setShowManualLocation] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      query: "",
      city: "",
      state: "",
      country: "",
      fbc_field: "",
      fbp_field: "",
      ip_field: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_adset: "",
      utm_ad: "",
      utm_term: "",
      utm_format: "",
    },
    mode: "onChange",
  });

  // Automatically populate first-touch UTM attribution from sessionStorage / URL
  useEffect(() => {
    const utmData = getStoredUTMData();
    setValue("utm_source", utmData.utm_source || "");
    setValue("utm_medium", utmData.utm_medium || "");
    setValue("utm_campaign", utmData.utm_campaign || "");
    setValue("utm_content", utmData.utm_content || "");
    setValue("utm_adset", utmData.utm_adset || "");
    setValue("utm_ad", utmData.utm_ad || "");
    setValue("utm_term", utmData.utm_term || "");
    setValue("utm_format", utmData.utm_format || "");
  }, [setValue]);

  // Automatically request browser geolocation on mount
  useEffect(() => {
    let isMounted = true;
    detectBrowserLocation().then((res) => {
      if (!isMounted) return;
      if (res.success && res.data && (res.data.city || res.data.state || res.data.country)) {
        setLocationStatus("detected");
        setDetectedLocation(res.data);
        setValue("city", res.data.city || "");
        setValue("state", res.data.state || "");
        setValue("country", res.data.country || "");
        setShowManualLocation(false);
      } else {
        setLocationStatus("fallback");
        setShowManualLocation(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setValue]);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => getBrochureCta(body),
    onSuccess: (result) => {
      if (result.data.status == "200") {
        Swal.fire({
          title: "Thank You",
          text: "Thank you for downloading the brochure. Our executive will contact you to provide more information about the course!",
          icon: "success",
          confirmButtonText: "OK",
        }).then((conf) => {
          if (conf.isConfirmed) {
            window.open(data.brochure.pdf, "_blank");
          }
        });
      } else {
        Swal.fire({
          title: "Oops!",
          text: "We are facing server issue, please try again in sometime.",
          icon: "Warning",
          confirmButtonText: "OK",
        });
      }
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      setCaptchaVerified(false);
    },
  });

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
  };

  const submitForm = (body) => {
    const { name, contact, email, query, city, state, country, fbc_field, fbp_field, ip_field } = body;
    const utmData = getStoredUTMData();

    const finalCity = (city || detectedLocation.city || "").trim();
    const finalState = (state || detectedLocation.state || "").trim();
    const finalCountry = (country || detectedLocation.country || "").trim();

    const payload = {
      phone: contact,
      name,
      email,
      query,
      city: finalCity,
      state: finalState,
      country: finalCountry,
      fbc_field: fbc_field || "",
      fbp_field: fbp_field || "",
      ip_field: ip_field || "",
      program: data?.vertical,
      source: data?.brochure?.source,
      page: currentPage,
      utm_source: body.utm_source || utmData.utm_source || "Direct",
      utm_medium: body.utm_medium || utmData.utm_medium || "website-organic",
      utm_campaign: body.utm_campaign || utmData.utm_campaign || "",
      utm_content: body.utm_content || utmData.utm_content || "",
      utm_adset: body.utm_adset || utmData.utm_adset || "",
      utm_ad: body.utm_ad || utmData.utm_ad || "",
      utm_term: body.utm_term || utmData.utm_term || "",
      utm_format: body.utm_format || utmData.utm_format || "",
      campaign_name: data?.brochure?.campaign_name || null,
      form_id: "brochure",
      type: "CTA",
    };
    mutate(payload);
  };

  return (
    <div className="request-brochure p-6 bg-white border drop-shadow rounded-lg w-full max-w-[400px] h-fit flex flex-col justify-between">
      <div className="w-full flex flex-col items-center">
        {/* upper heading */}
        <h3 className="text-xl font-semibold text-neutral-800">
          Request more information
        </h3>
        {/* request form */}
        <form
          className="w-full h-full min-h-[24rem] flex flex-col justify-between"
          onSubmit={handleSubmit(submitForm)}
        >
          <input type="hidden" id="fbc_field" {...register("fbc_field")} />
          <input type="hidden" id="fbp_field" {...register("fbp_field")} />
          <input type="hidden" id="ip_field" {...register("ip_field")} />
          <input type="hidden" id="utm_source" {...register("utm_source")} />
          <input type="hidden" id="utm_medium" {...register("utm_medium")} />
          <input type="hidden" id="utm_campaign" {...register("utm_campaign")} />
          <input type="hidden" id="utm_content" {...register("utm_content")} />
          <input type="hidden" id="utm_adset" {...register("utm_adset")} />
          <input type="hidden" id="utm_ad" {...register("utm_ad")} />
          <input type="hidden" id="utm_term" {...register("utm_term")} />
          <input type="hidden" id="utm_format" {...register("utm_format")} />
          <div className="w-full">
            {/* name */}
            <div className="relative mt-4">
              <input
                className={`w-full px-4 py-3 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["name"] ? "border-rose-500" : "border-neutral-300"} 
${errors["name"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                })}
                id="name"
                type="text"
                placeholder="Name (Required)"
              />
              {errors.name?.message && (
                <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]">
                    <IoWarning />
                  </span>
                  <p>{errors.name?.message}</p>
                </div>
              )}
            </div>
            {/* email */}
            <div className="relative mt-4">
              <input
                className={`w-full px-4 py-3 font-normal bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["email"] ? "border-rose-500" : "border-neutral-300"} 
${errors["email"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email",
                  },
                })}
                id="email"
                type="email"
                placeholder="Email (Required)"
              />
              {errors.email?.message && (
                <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]">
                    <IoWarning />
                  </span>
                  <p>{errors.email?.message}</p>
                </div>
              )}
            </div>
            {/* contact */}
            <div className="relative mt-4">
              <Controller
                name="contact"
                control={control}
                rules={{
                  required: "Contact number is required",
                  minLength: {
                    value: 8,
                    message: "Must provide contact number",
                  },
                }}
                render={({ field }) => (
                  <PhoneInput
                    containerStyle={{
                      width: "100%",
                    }}
                    inputStyle={{
                      width: "100%",
                      borderTop: "none",
                      borderLeft: "none",
                      borderRight: "none",
                      borderBottom: errors.contact
                        ? "2px solid rgb(239 68 68)"   // red-500
                        : "2px solid rgb(212 212 212)", // neutral-300
                      borderRadius: "0px",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "55px",
                      outline: "none",
                      boxShadow: "none",  // ✅ removes material.css focus glow
                    }}
                    buttonStyle={{
                      border: "none",           // ✅ removes flag button border
                      background: "transparent",
                      borderBottom: errors.contact
                        ? "2px solid rgb(239 68 68)"
                        : "2px solid rgb(212 212 212)",
                      borderRadius: "0px",
                    }}
                    enableSearch={true}
                    country={"in"}
                    placeholder="Contact (Required)"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.contact?.message && (
                <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]">
                    <IoWarning />
                  </span>
                  <p>{errors.contact?.message}</p>
                </div>
              )}
            </div>

            {/* Location Capture: Auto-detected state or Manual fallback/editable fields */}
            {locationStatus === "detecting" && (
              <div className="mt-3 p-2 bg-neutral-50 border border-neutral-200 rounded-lg flex items-center gap-2 text-xs text-neutral-500 animate-pulse">
                <span>📍</span>
                <span>Detecting location...</span>
              </div>
            )}

            {locationStatus === "detected" && !showManualLocation && (
              <div className="mt-3">
                <div className="p-2.5 bg-blue-50/70 border border-blue-100 rounded-lg flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-700 truncate pr-2">
                    <span className="text-blue-600 text-sm">📍</span>
                    <span className="font-medium truncate">
                      {[detectedLocation.city, detectedLocation.state, detectedLocation.country].filter(Boolean).join(", ")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowManualLocation(true)}
                    className="text-universal hover:underline font-medium text-xs whitespace-nowrap cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-[10px] text-neutral-400 mt-0.5 pl-1">Location data © OpenStreetMap contributors</p>
              </div>
            )}

            {(showManualLocation || locationStatus === "fallback") && (
              <div className="mt-3 pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-neutral-600">Location Details</label>
                  {locationStatus === "detected" && (
                    <button
                      type="button"
                      onClick={() => setShowManualLocation(false)}
                      className="text-[11px] text-universal hover:underline cursor-pointer"
                    >
                      Use auto-detected
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      className={`w-full px-2 py-1.5 text-xs bg-white border-b-2 outline-none transition ${
                        errors["city"] ? "border-rose-500" : "border-neutral-300"
                      } focus:border-blue-500`}
                      {...register("city", { required: "City required" })}
                      id="city"
                      type="text"
                      placeholder="City (Required)"
                    />
                    {errors.city?.message && (
                      <p className="text-red-500 text-[10px] mt-0.5">{errors.city?.message}</p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      className={`w-full px-2 py-1.5 text-xs bg-white border-b-2 outline-none transition ${
                        errors["state"] ? "border-rose-500" : "border-neutral-300"
                      } focus:border-blue-500`}
                      {...register("state", { required: "State required" })}
                      id="state"
                      type="text"
                      placeholder="State (Required)"
                    />
                    {errors.state?.message && (
                      <p className="text-red-500 text-[10px] mt-0.5">{errors.state?.message}</p>
                    )}
                  </div>
                </div>
                <div className="relative mt-1.5">
                  <input
                    className={`w-full px-2 py-1.5 text-xs bg-white border-b-2 outline-none transition ${
                      errors["country"] ? "border-rose-500" : "border-neutral-300"
                    } focus:border-blue-500`}
                    {...register("country", { required: "Country required" })}
                    id="country"
                    type="text"
                    placeholder="Country (Required)"
                  />
                  {errors.country?.message && (
                    <p className="text-red-500 text-[10px] mt-0.5">{errors.country?.message}</p>
                  )}
                </div>
                <p className="text-[10px] text-neutral-400 mt-1 pl-1">Location data © OpenStreetMap contributors</p>
              </div>
            )}

            {/* query */}
            <div className="relative mt-4">
              <textarea
                rows={2}
                className={`resize-none w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["query"] ? "border-rose-500" : "border-neutral-300"} 
${errors["query"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                {...register("query", {
                  maxLength: {
                    value: 250,
                    message: "message should be under 250 characters",
                  },
                })}
                id="query"
                placeholder="Any message (Optional)"
              />
              {errors.query?.message && (
                <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]">
                    <IoWarning />
                  </span>
                  <p>{errors.query?.message}</p>
                </div>
              )}
            </div>
            {/* policy */}
            <div className="w-full mt-6 text-center">
              <h3 className="text-xs font-medium">
                By submitting the form, you agree to our{" "}
                <Link href="/terms" className="text-universal">
                  Terms and Conditions
                </Link>{" "}
                and our{" "}
                <Link href="/terms/privacy" className="text-universal">
                  Privacy Policy
                </Link>
                .
              </h3>
            </div>
          </div>
          <div className="pt-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
              onChange={onCaptchChange}
            />
          </div>

          {/* submit button */}
          {data?.enrollments == "inactive" ? (
            <button
              disabled={true}
              className={`disabled:bg-gray-400 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
              type="submit"
            >
              {"Admission closed"}
            </button>
          ) : (
            <>
              <button
                disabled={isPending || !captchaVerified || allowedIds.includes(data?.id)}
                className={`disabled:py-2 disabled:bg-gray-300 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                type="submit"
              >
                {isPending ? <HashLoader /> : "Get Brochure*"}
              </button>
            </>
          )}
        </form>

        <Disclaimer ClassName={"text-xs text-center"} />
      </div>
    </div>
  );
};

export default SideForm;
