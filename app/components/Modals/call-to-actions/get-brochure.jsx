"use client";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { IoIosClose } from "react-icons/io";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import Swal from "sweetalert2";
import { getCta } from "../../../services/program.service";
import { HashLoader } from "../../Loaders";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import ReCAPTCHA from "react-google-recaptcha";

export default function GetBrochure({ open }) {
  const { data } = useSelector((state) => state.program);
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage =
    pathname === "/" ? "homepage" : pathname.replace("/", "");
  const utm_source =
    searchParams.get("utm_source") == undefined
      ? "null"
      : searchParams.get("utm_source");
  const utm_medium =
    searchParams.get("utm_medium") == undefined
      ? "null"
      : searchParams.get("utm_medium");
  const campaign_name =
    open?.brochure?.campaign_name !== undefined
      ? open.brochure.campaign_name
      : null;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
    },
    mode: "onChange",
  });

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => getCta(body),
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
    const { name, contact, email } = body;

    const payload = {
      phone: contact,
      name,
      email,
      program: data.vertical,
      source: data?.brochure?.source,
      page: currentPage,
      utm_source,
      utm_medium,
      utm_campaign: campaign_name,
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
                <div className="flex-1 md:flex-[0.5] flex flex-col items-center">
                  {/* upper heading */}
                  <h1 className="text-sm font-medium text-neutral-600 text-center">
                    Grab the brochure to get further details about the program.
                  </h1>
                  {/* request form */}
                  <form
                    className={`w-full h-full flex flex-col justify-between mt-2`}
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div className="w-full">
                      {/* name */}
                      <div className="relative">
                        <input
                          className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
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