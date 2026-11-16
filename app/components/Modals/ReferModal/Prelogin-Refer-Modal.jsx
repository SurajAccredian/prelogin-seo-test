"use client";

import Image from "next/image";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import programs from "../../Assets/programs.json";
import { decodeToken } from "react-jwt";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getStoredUTMData } from "../../../helpers/utm.helpers";
import { IoWarning } from "react-icons/io5";
import { Loader2, X, ChevronLeft, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "../../ui/Modal";
import Select from "react-select";

const VERTICALS = [
  "data science",
  "product management",
  "general management",
  "digital transformation",
  "business management",
  "project management",
  "strategic management",
  "senior management",
  "finance",
];

const VERTICAL_OPTIONS = VERTICALS.map((vertical) => ({
  value: vertical,
  label: vertical
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" "),
}));

const getSelectStyles = (hasError) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "38px",
    borderRadius: "0.375rem",
    borderColor: hasError
      ? "#ef4444"
      : state.isFocused
      ? "#3b82f6"
      : "#d1d5db",
    boxShadow: state.isFocused
      ? hasError
        ? "0 0 0 2px rgba(239, 68, 68, 0.4)"
        : "0 0 0 2px rgba(59, 130, 246, 0.4)"
      : "none",
    "&:hover": {
      borderColor: hasError ? "#ef4444" : state.isFocused ? "#3b82f6" : "#9ca3af",
    },
    fontSize: "0.875rem",
    backgroundColor: "white",
    cursor: "pointer",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#6b7280",
    fontSize: "0.875rem",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontSize: "0.875rem",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.375rem",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    zIndex: 9999,
  }),
  option: (base, state) => ({
    ...base,
    fontSize: "0.875rem",
    backgroundColor: state.isSelected
      ? "#1A73E8"
      : state.isFocused
      ? "#EFF6FF"
      : "white",
    color: state.isSelected ? "white" : "#1f2937",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "#1A73E8",
      color: "white",
    },
  }),
});

const ReferModalContent = ({ open, setOpen }) => {
  const searchParams = useSearchParams();
  const [activeStep, setActiveStep] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [userData, setUserData] = useState(null);

  const LoaderClose = () => setLoaderOpen(false);
  const LoaderOpen = () => setLoaderOpen(true);

  const handleCloseref = () => {
    setOpen(false);
    setActiveStep(0);
  };

  const onCaptchChange = (value) => {
    setCaptchaVerified(Boolean(value));
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const selectedVertical = useWatch({ control, name: "vertical" });
  const allPrograms = React.useMemo(() => groupProgramsByCategory(programs), []);
  const filteredPrograms = selectedVertical
    ? allPrograms[selectedVertical.toLowerCase()] || []
    : [];

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const decodedToken = decodeToken(token);
        if (decodedToken?.data) {
          setUserData(decodedToken.data);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSubmitRef = async (formData) => {
    LoaderOpen();

    if (activeStep < 1) {
      setActiveStep((prevStep) => prevStep + 1);
      LoaderClose();
      return;
    }

    const request = {
      useremail: formData.useremail,
      username: formData.username,
      mobile: formData.userphone,
      user_program_id: userData?.program_id,
      batch_id: userData?.batch_id,
      friend_name: formData.friendname,
      friend_email: formData.friendemail,
      friend_mobile: formData.friendnumber,
      friend_vertical: formData.vertical,
      friend_program: formData.programname,
      lead_source: getStoredUTMData().utm_source || "Website",
    };

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/prelogin_referandearn/refer`,
        request,
        options
      );

      const Swal = (await import("sweetalert2")).default;
      Swal.fire({
        title: "Thank You!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
      reset();
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.data?.feedback) {
        toast.error(`${error.response.data.feedback}`);
      } else {
        toast.error(
          "Apologies, we are currently experiencing some server issues. Please try again later."
        );
      }
    } finally {
      LoaderClose();
      handleCloseref();
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseref}
      maxWidth="max-w-4xl"
      className="p-0 overflow-hidden rounded-2xl"
    >
      <div className="flex flex-col md:flex-row relative">
        {/* Left image section */}
        <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-universal p-6">
          <Image
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/refer-modal-bg.webp"
            alt="Refer your friend"
            width={550}
            height={550}
            quality={75}
            className="max-w-[400px] w-full h-auto object-cover object-center"
          />
        </div>

        {/* Right form section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header / close row */}
            <div className="w-full flex items-center justify-between mb-2">
              {activeStep === 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="button"
                onClick={handleCloseref}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-2xl font-semibold font-circular text-center mb-4">
              Refer your <span className="text-universal">friend!</span>
            </p>

            {/* Stepper indicator */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  activeStep === 0 ? "text-[#1A73E8]" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep >= 0 ? "bg-[#1A73E8] text-white" : "bg-gray-200"
                  }`}
                >
                  {activeStep > 0 ? <Check className="w-3.5 h-3.5" /> : "1"}
                </span>
                <span>Friend&apos;s details</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-200" />
              <div
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  activeStep === 1 ? "text-[#1A73E8]" : "text-gray-500"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    activeStep >= 1 ? "bg-[#1A73E8] text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </span>
                <span>Refer now</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleSubmitRef)} className="space-y-3.5">
              {/* Step 0: Friend's details */}
              {activeStep === 0 && (
                <>
                  <div>
                    <input
                      placeholder="Enter friend's name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("friendname", {
                        required: "Please enter your friend's name",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Name can only contain letters",
                        },
                      })}
                    />
                    {errors.friendname && (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <IoWarning />
                        <p>{errors.friendname.message}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Enter friend's email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("friendemail", {
                        required: "Email cannot be empty",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.friendemail && (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <IoWarning />
                        <p>{errors.friendemail.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                    <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 flex items-center">
                      +91
                    </span>
                    <input
                      type="number"
                      placeholder="Friend's phone number"
                      className="w-full px-3 py-2 text-sm focus:outline-none"
                      {...register("friendnumber", {
                        required: "Please enter your friend's number",
                      })}
                    />
                  </div>
                  {errors.friendnumber && (
                    <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                      <IoWarning />
                      <p>{errors.friendnumber.message}</p>
                    </div>
                  )}

                  <div>
                    <Controller
                      name="vertical"
                      control={control}
                      rules={{ required: "Please select vertical" }}
                      render={({ field }) => (
                        <Select
                          id="vertical"
                          instanceId="vertical-select"
                          value={
                            field.value
                              ? VERTICAL_OPTIONS.find((opt) => opt.value === field.value) || {
                                  value: field.value,
                                  label: field.value,
                                }
                              : null
                          }
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption ? selectedOption.value : "");
                            setValue("programname", "");
                          }}
                          options={VERTICAL_OPTIONS}
                          placeholder="Select Vertical"
                          isClearable
                          styles={getSelectStyles(Boolean(errors.vertical))}
                        />
                      )}
                    />
                    {errors.vertical && (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <IoWarning />
                        <p>{errors.vertical.message}</p>
                      </div>
                    )}
                  </div>

                  {selectedVertical && (
                    <div>
                      <Controller
                        name="programname"
                        control={control}
                        rules={{ required: "Please select program name" }}
                        render={({ field }) => (
                          <Select
                            id="programname"
                            instanceId="programname-select"
                            value={
                              field.value
                                ? { value: field.value, label: field.value }
                                : null
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption ? selectedOption.value : "");
                            }}
                            options={filteredPrograms.map((prog) => ({
                              value: prog.program_name,
                              label: prog.program_name,
                            }))}
                            placeholder="Select Program"
                            isClearable
                            styles={getSelectStyles(Boolean(errors.programname))}
                          />
                        )}
                      />
                      {errors.programname && (
                        <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                          <IoWarning />
                          <p>{errors.programname.message}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="hover:bg-darkBlue text-sm mt-4 px-4 py-2.5 bg-universal font-medium text-white w-full flex justify-center rounded-lg shadow transition"
                  >
                    Next
                  </button>
                </>
              )}

              {/* Step 1: User's details */}
              {activeStep === 1 && (
                <>
                  <div>
                    <input
                      placeholder="Enter your name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("username", {
                        required: "Please enter your name",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Name can only contain letters",
                        },
                      })}
                    />
                    {errors.username && (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <IoWarning />
                        <p>{errors.username.message}</p>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("useremail", {
                        required: "Email cannot be empty",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                    {errors.useremail && (
                      <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <IoWarning />
                        <p>{errors.useremail.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex rounded-md border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
                    <span className="px-3 py-2 bg-gray-50 text-gray-500 text-sm border-r border-gray-300 flex items-center">
                      +91
                    </span>
                    <input
                      type="number"
                      placeholder="Enter your phone number"
                      className="w-full px-3 py-2 text-sm focus:outline-none"
                      {...register("userphone", {
                        required: "Please enter your phone number",
                      })}
                    />
                  </div>
                  {errors.userphone && (
                    <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                      <IoWarning />
                      <p>{errors.userphone.message}</p>
                    </div>
                  )}

                  <div className="pt-2">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                      onChange={onCaptchChange}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || !captchaVerified}
                    className="disabled:bg-gray-400 hover:bg-darkBlue text-sm mt-4 px-4 py-2.5 bg-universal font-medium text-white w-full flex justify-center rounded-lg shadow transition"
                  >
                    Refer Now
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        <Toaster position="top-right" />
      </div>

      {loaderOpen && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center rounded-2xl">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      )}
    </Modal>
  );
};

export default function ReferModal(props) {
  if (!props.open) return null;
  return (
    <React.Suspense fallback={null}>
      <ReferModalContent {...props} />
    </React.Suspense>
  );
}
