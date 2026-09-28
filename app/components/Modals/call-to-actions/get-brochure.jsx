"use client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosClose } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Swal from "sweetalert2";
import { getBrochureCta } from "../../../services/program.service";
import { HashLoader } from "../../Loaders";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import ReCAPTCHA from "react-google-recaptcha";
import { detectBrowserLocation } from "../../../helpers/location.helpers";
import { getStoredUTMData } from "../../../helpers/utm.helpers";

export default function GetBrochure({ open }) {
  const { data } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage =
    pathname === "/" ? "homepage" : pathname.replace("/", "");
  const campaign_name =
    open?.brochure?.campaign_name !== undefined
      ? open.brochure.campaign_name
      : null;

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
    if (open) {
      const utmData = getStoredUTMData();
      setValue("utm_source", utmData.utm_source || "");
      setValue("utm_medium", utmData.utm_medium || "");
      setValue("utm_campaign", utmData.utm_campaign || "");
      setValue("utm_content", utmData.utm_content || "");
      setValue("utm_adset", utmData.utm_adset || "");
      setValue("utm_ad", utmData.utm_ad || "");
      setValue("utm_term", utmData.utm_term || "");
      setValue("utm_format", utmData.utm_format || "");
    }
  }, [open, setValue]);

  // Automatically request browser geolocation & reverse geocode via OpenStreetMap Nominatim
  useEffect(() => {
    let isMounted = true;
    if (open) {
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
    } else {
      setShowManualLocation(false);
      setDetectedLocation({ city: "", state: "", country: "" });
    }
    return () => {
      isMounted = false;
    };
  }, [open, setValue]);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => getBrochureCta(body),
    onSuccess: (result) => {
      if (result.data.status == "200") {
        Swal.fire({
          title: "Thank You",
          text: "Thank you for your interest in our brochure! Our admissions team will get in touch soon to assist you further. Click the button below to view the brochure.",
          icon: "success",
          confirmButtonText: "View Brochure",
        }).then((conf) => {
          if (conf.isConfirmed && open) {
            window.open(open?.brochure?.pdf, "_blank");
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
      reset("");
      dispatch(programActions.setBrochureState(null));
    },
  });

  const submitForm = (body) => {
    const { name, contact, email, city, state, country, fbc_field, fbp_field, ip_field } = body;
    const utmData = getStoredUTMData();

    const finalCity = (city || detectedLocation.city || "").trim();
    const finalState = (state || detectedLocation.state || "").trim();
    const finalCountry = (country || detectedLocation.country || "").trim();

    const payload = {
      phone: contact,
      name,
      email,
      city: finalCity,
      state: finalState,
      country: finalCountry,
      fbc_field: fbc_field || "",
      fbp_field: fbp_field || "",
      ip_field: ip_field || "",
      program: open?.vertical || open?.category || open?.program_name || data?.vertical || data?.category || "Explore Programs",
      source: open?.brochure?.source || data?.brochure?.source || "Get Brochure",
      page: currentPage,
      utm_source: body.utm_source || utmData.utm_source || "",
      utm_medium: body.utm_medium || utmData.utm_medium || "",
      utm_campaign: body.utm_campaign || utmData.utm_campaign || "",
      utm_content: body.utm_content || utmData.utm_content || "",
      utm_adset: body.utm_adset || utmData.utm_adset || "",
      utm_ad: body.utm_ad || utmData.utm_ad || "",
      utm_term: body.utm_term || utmData.utm_term || "",
      utm_format: body.utm_format || utmData.utm_format || "",
      campaign_name,
      form_id: "brochure",
      type: "CTA",
    };
    mutate(payload);
  };

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  const handleClose = () => {
    if (isPending) {
      return;
    } else {
      dispatch(programActions.setBrochureState(null));
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open ? true : false}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open ? true : false}>
          <Box
            sx={{
              position: "absolute",
              top: "45%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
            }}
          >
            <div className="overflow-hidden font-circular">
              <div className="py-2 w-full text-center relative flex items-center justify-end">
                {/* <h1 className="text-lg font-medium text-neutral-800 text-center">Don't miss the opportunities</h1> */}
                <button
                  className="w-8 h-8 rounded-lg bg-white disabled:bg-slate-300 flex-shrink-0 cursor-pointer justify-self-end"
                  disabled={isPending}
                  onClick={handleClose}
                >
                  <IoIosClose className="w-full h-full" />
                </button>
              </div>
              <div className="bg-white xl:w-[50vw] lg:w-[70vw] md:w-[80vw] w-[90vw] min-h-[35vh] py-8 px-5 flex gap-2 rounded-xl">
                <div className="md:block hidden flex-[0.5] h-full items-center">
                  <div className="max-w-sm w-full">
                    <img
                      className="w-full"
                      src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/get-brochure.webp"
                      alt="get-brochure"
                    />
                  </div>
                </div>
                <div className="flex-1 md:flex-[0.55] flex flex-col items-center">
                  {/* upper heading */}
                  <h1 className="text-sm font-medium text-neutral-600 text-center">
                    Grab the brochure to get further details about the program.
                  </h1>
                  {/* request form */}
                  <form
                    className={`w-full h-full flex flex-col justify-between mt-2`}
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
                      <div className="relative">
                        <input
                          className={`w-full px-4 py-2.5 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-1
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
                      <div
                        className={`relative ${
                          errors?.email?.message ? "mt-2" : "mt-4"
                        }`}
                      >
                        <input
                          className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2
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
                      <div
                        className={`relative ${
                          errors?.contact?.message ? "mt-2" : "mt-4"
                        }`}
                      >
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
                              inputStyle={{
                                width: "100%",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                                borderBottom: errors.contact
                                  ? "2px solid red"
                                  : "2px solid rgb(212 212 212)",
                                borderRadius: "0px",
                                padding: "10px",
                                paddingLeft: "55px",
                                outline: "none",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                              }}
                              specialLabel=""
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
                    </div>
                    <div className="w-full mt-6">
                      {/* policy */}
                      <div className="w-full text-center">
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
                        <div className="pt-4">
                          <ReCAPTCHA
                            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                            onChange={onCaptchChange}
                          />
                        </div>
                      {/* submit button */}
                        <button
                          disabled={isPending || !captchaVerified}
                          className={`disabled:py-2 disabled:bg-gray-300 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                          type="submit"
                        >
                          {isPending ? <HashLoader /> : "Get Brochure"}
                        </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
