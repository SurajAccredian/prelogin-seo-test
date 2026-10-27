"use client"
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosClose } from "react-icons/io";
import React, { useCallback, useRef, useState } from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { getCta } from "../../../services/program.service";
import { HashLoader } from "../../Loaders";
import { CiPhone } from "react-icons/ci";
import ReCAPTCHA from "react-google-recaptcha";
import { STREAMS } from "../../Assets/constants";
import { getStoredUTMData } from "../../../helpers/utm.helpers";
export default function CtaModal({ open, setOpen }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage =
    pathname === "/" ? "homepage" : pathname.replace("/", "");
  const campaign_name =
    open?.brochure?.campaign_name !== undefined
      ? open.brochure.campaign_name
      : null;

  const [captchaVerified, setCaptchaVerified] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      program: "",
      captcha: undefined,
    },
    mode: "onChange",
  });

  const recaptchaRef = useRef(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => getCta(body),
    onSuccess: (result) => {
      setOpen(null);
      if (result.data.status == "200") {
        Swal.fire({
          title: "Thank You",
          text: "Thank you for your callback request! Our admission counselor will reach out shortly.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((conf) => {
          // if (conf.isConfirmed) {
          //   window.open(data.ctaPDF, "_blank");
          // }
          reset("");
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
  });

  const onCaptchChange = (value) => {
    console.log(value);
    setCaptchaVerified(true);
  };

  const submitForm = (body) => {
    const { name, contact, email, program } = body;
    const utmData = getStoredUTMData();

    const payload = {
      phone: contact,
      name,
      email,
      program: program.value,
      source: "Request Callback",
      page: "Why Accredian",
      utm_source: utmData.utm_source || "Direct",
      utm_medium: utmData.utm_medium || "website-organic",
      utm_campaign: utmData.utm_campaign || campaign_name || "",
      utm_content: utmData.utm_content || "",
      utm_adset: utmData.utm_adset || "",
      utm_ad: utmData.utm_ad || "",
      utm_term: utmData.utm_term || "",
      utm_format: utmData.utm_format || "",
      cta_button: "Request Callback",
      form_id: "request_callback",
      type: "CTA",
    };
    mutate(payload);
  };

  const handleClose = () => {
    if (isPending) {
      return;
    } else {
      setOpen(null);
    }
  };
  const options = STREAMS.map((item) => ({
    value: item.category,
    label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
  }));
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
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "none",
            }}
          >
            <div className="overflow-hidden font-circular">
              <div className="py-2 w-full text-center relative flex items-center justify-end">
                {/* <h1 className="text-lg font-medium text-neutral-800 text-center">Don't miss the opportunities</h1> */}
                <div
                  className="w-8 h-8 rounded-lg bg-white flex-shrink-0 cursor-pointer justify-self-end"
                  onClick={handleClose}
                >
                  <IoIosClose className="w-full h-full" />
                </div>
              </div>
              <div className="bg-white xl:w-[50vw] lg:w-[70vw] md:w-[80vw] w-[90vw] min-h-[35vh] py-5 px-5 flex items-center gap-2 rounded-xl">
                <div className="md:flex flex-col items-center justify-between gap-2 hidden flex-[0.5]">
                  <div className="max-w-sm w-full">
                    <img
                      className="w-full"
                      src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/get-in-touch.webp"
                      alt="get-in-touch"
                    />
                  </div>
                  {/* <div className="w-full mt-4 hidden md:flex justify-center items-center gap-4 bg-blue-50 border border-blue-300 py-4 px-4 rounded-lg">
                    <div className="w-8 h-8 flex-shrink-0 p-1 border-2 rounded-lg border-universal">
                      <CiPhone className="w-full h-full" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="font-medium">To Inquire</h1>
                      <span>-</span>
                      <a
                        href={`tel:8888777723`}
                        className="underline font-semibold"
                      >
                        8888777723
                      </a>
                    </div>
                  </div> */}
                </div>
                <div className="flex-1 md:flex-[0.5] flex flex-col items-center">
                  {/* upper heading */}
                  {/* <h1 className="text-xl font-semibold text-neutral-800">Request more information</h1> */}
                  {/* request form */}
                  <form
                    className="w-full h-full flex flex-col justify-between"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div className="w-full">
                      {/* name */}
                      <div className="relative">
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
                      <div className="relative mt-2">
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
                      <div className="relative mt-2">
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
                      {/* program */}
                      <div className="relative mt-2">
                        <Controller
                          name="program"
                          control={control}
                          rules={{ required: "Vertical is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              options={options}
                              placeholder="Select Vertical"
                              className="mt-1"
                              classNamePrefix="react-select"
                              isDisabled={false}
                              styles={{
                                control: (base, state) => ({
                                  ...base,
                                  borderColor: errors.program
                                    ? "#f43f5e"
                                    : "#d1d5db",
                                  borderTop: 0,
                                  borderLeft: 0,
                                  borderRight: 0,
                                  borderRadius: 0,

                                  boxShadow: state.isFocused
                                    ? `0 0 0 1px ${errors.program ? "#f43f5e" : "#3b82f6"
                                    }`
                                    : "none",
                                  "&:hover": {
                                    borderColor: errors.program
                                      ? "#f43f5e"
                                      : "#3b82f6",
                                  },
                                }),
                              }}
                            />
                          )}
                        />

                        {errors.program?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.program.message}</p>
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
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                        onChange={onCaptchChange}
                      />
                    </div>
                    <button
                      disabled={isPending || !captchaVerified}
                      className={`disabled:py-4 disabled:bg-gray-300 disabled:border-none hover:bg-darkBlue text-lg relative mt-6 px-4 py-4 bg-universal font-medium text-white w-full flex justify-center items-center rounded-lg drop-shadow-sm border border-universal`}
                      type="submit"
                    >
                      <div className="w-8 h-8 flex-shrink-0 opacity-0"></div>
                      {isPending ? <HashLoader /> : "Request Callback"}
                      <div className="w-8 h-8 flex-shrink-0 opacity-0"></div>
                    </button>
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
