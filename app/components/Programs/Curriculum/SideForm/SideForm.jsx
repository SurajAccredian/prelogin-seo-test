"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { getCta } from "../../../../services/program.service";
import { HashLoader } from "../../../Loaders";
import Disclaimer from "../../Disclaimer";
import ReCAPTCHA from "react-google-recaptcha";
import { allowedIds } from "../../../Assets/constants";
import "react-phone-input-2/lib/style.css";
const SideForm = () => {
  const { data } = useSelector((state) => state.program);

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
  const utm_campaign =
    searchParams.get("utm_campaign") == undefined
      ? "null"
      : searchParams.get("utm_campaign");

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
      query: "",
    },
    mode: "onChange",
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (body) => getCta(body),
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
    const { name, contact, email, query } = body;

    const payload = {
      phone: contact,
      name,
      email,
      query,
      program: data.vertical,
      source: data.brochure.source,
      page: currentPage,
      utm_source,
      utm_medium,
      utm_campaign,
      form_id: "brochure",
      type: "CTA",
    };
    mutate(payload);
  };

  return (
    <div className="request-brochure p-6 bg-white border drop-shadow rounded-lg w-full max-w-[400px] h-fit flex flex-col justify-between">
      <div className="w-full flex flex-col items-center">
        {/* upper heading */}
        <h1 className="text-xl font-semibold text-neutral-800">
          Request more information
        </h1>
        {/* request form */}
        <form
          className="w-full h-full min-h-[24rem] flex flex-col justify-between"
          onSubmit={handleSubmit(submitForm)}
        >
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
