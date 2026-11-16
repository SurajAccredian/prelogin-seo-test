"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import { decodeToken, isExpired } from "react-jwt";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { masterVerifyEmail, masterVerifyOtp } from "../../services/auth.service";

function setCookie(name, value, hours, domain) {
  let expires = "";
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  const cookieDomain = domain ? `; domain=${domain}` : "";
  document.cookie = `${name}=${value || ""}${expires}${cookieDomain}; path=/`;
}

function MasterForm() {
  const steps = ["Step 1", "Step 2"];
  const [activeStep, setActiveStep] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [tokenExp, setTokenexp] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpInvalidMessage, setOtpInvalidMessage] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [userIp, setUserIp] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    let interval = null;
    if (isResending && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setIsResending(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResending, timer]);

  const handleResend = async () => {
    setTimer(30);
    setIsResending(true);
    if (emailValue) {
      await emailVerification(emailValue, nameValue);
    }
  };

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIp(data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchIp();
  }, []);

  const emailVerification = async (email, name) => {
    try {
      const emailVerficationPayload = {
        email,
        name,
        ipaddress: userIp,
      };
      const response = await masterVerifyEmail(emailVerficationPayload);
      if (response) {
        setEmailValue(email);
        setNameValue(name);
        toast.success(response.message, { position: "top-right" });
        return response;
      }
    } catch (error) {
      if (error.response?.data?.feedback) {
        toast.error(error.response.data.feedback, { position: "top-right" });
      } else {
        toast.error(
          "Apologies, we are currently experiencing some server issues. Please try again later.",
          { position: "top-right" }
        );
      }
    }
  };

  const handleNext = async (data) => {
    setLoading(true);
    if (activeStep === steps.length - 1) {
      const isOtpComplete = otp.every((digit) => digit.length > 0);
      if (!isOtpComplete) {
        setLoading(false);
        setOtpInvalid(true);
        setOtpInvalidMessage("Please enter all 4 digits of the OTP.");
        return;
      }

      const verifyOtpPayload = {
        email: emailValue,
        name: nameValue,
        otp: otp.join(""),
        ipaddress: userIp,
      };

      try {
        const response = await masterVerifyOtp(verifyOtpPayload);
        if (response) {
          const myDecodedToken = decodeToken(response.token);
          const isMyTokenExpired = isExpired(response.token);
          const tokenExp = myDecodedToken.exp;

          localStorage.setItem("token", response.token);
          setTokenexp(tokenExp);
          localStorage.setItem("user_id", response.id);
          localStorage.setItem("name", response.name);
          localStorage.setItem("email", response.email);

          setCookie("token", response.token, 7, "accredian.com");
          setCookie("user_id", response.id, 7, "accredian.com");
          setCookie("name", response.name, 7, "accredian.com");
          setCookie("email", response.email, 7, "accredian.com");

          setOtpVerified(true);
          toast.success(response.message, { position: "top-right" });

          setTimeout(() => {
            window.location.href = "https://master.accredian.com";
          }, 500);
        }
      } catch (error) {
        setOtpInvalid(true);
        if (error.response?.data?.feedback) {
          toast.error(error.response.data.feedback, { position: "top-right" });
          setOtpInvalidMessage(error.response.data.feedback);
        } else {
          toast.error(
            "Apologies, we are currently experiencing some server issues. Please try again later.",
            { position: "top-right" }
          );
        }
      }
    } else {
      const response = await emailVerification(data.email, data.name);
      if (response) {
        setActiveStep((prevStep) => prevStep + 1);
        setTimer(30);
        setIsResending(true);
      }
    }
    setLoading(false);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setOtp(["", "", "", ""]);
    setOtpInvalid(false);
    setOtpInvalidMessage(false);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };


  return (
    <div className="font-circular font-normal relative p-6 sm:p-10 flex flex-row justify-center items-center h-full rounded-2xl mx-auto min-h-[80vh]">
      <div className="relative bg-white flex justify-center items-center h-[60%] rounded-lg max-w-[840px] w-[90%] shadow-lg overflow-hidden">
        <div className="w-1/2 hidden md:block">
          <Image
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/loginModalImage.svg"
            alt="Login illustration"
            width={400}
            height={400}
            quality={75}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </div>

        <div className="w-full md:w-1/2 px-4 sm:px-8 py-6">
          <div className="flex justify-center items-center mb-2">
            <Image
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
              alt="Company Logo"
              width={150}
              height={45}
              quality={75}
              style={{ width: "150px", height: "auto" }}
            />
          </div>

          {activeStep === 0 ? (
            <>
              <div id="modal-description" className="mb-4 text-paleBlack">
                <p className="text-sm text-gray-600">
                  You can sign in with us if you&apos;re a Master member
                </p>
              </div>

              <form onSubmit={handleSubmit(handleNext)}>
                <div className="mb-4">
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 font-semibold text-sm border-2 rounded-lg outline-none transition pl-2 border-neutral-300 focus:border-blue-500"
                  />
                  {errors.name && (
                    <div className="text-red-500 text-[12px] flex items-center gap-1 mt-1 pl-2">
                      <IoWarning />
                      <p>{errors.name.message}</p>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 font-semibold text-sm border-2 rounded-lg outline-none transition pl-2 border-neutral-300 focus:border-blue-500"
                  />
                  {errors.email && (
                    <div className="text-red-500 text-[12px] flex items-center gap-1 mt-1 pl-2">
                      <IoWarning />
                      <p>{errors.email.message}</p>
                    </div>
                  )}
                </div>

                <button
                  className="hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center items-center rounded-lg drop-shadow-md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-white" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            </>
          ) : activeStep === 1 ? (
            <>
              <button
                onClick={handleBack}
                type="button"
                className="text-universal pb-3 pt-3 cursor-pointer text-sm"
              >
                &lt; Back
              </button>

              <div className="mb-4 text-paleBlack">
                <h2 className="text-xl font-semibold">
                  We&apos;ve sent an OTP on{" "}
                </h2>
                <p className="text-[14px] text-gray-500">
                  {emailValue}
                  <span className="ml-2">
                    <button
                      onClick={handleBack}
                      type="button"
                      disabled={otpVerified}
                      className="text-universal underline"
                    >
                      Edit
                    </button>
                  </span>
                </p>
              </div>

              <div className="flex">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    disabled={loading}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    className={`w-1/6 p-3 font-semibold text-md border-2 mr-2 rounded-lg text-center outline-none transition pl-2 mt-2 ${
                      digit.length === 0
                        ? "border-neutral-300"
                        : "border-blue-500"
                    } ${otpInvalid ? "border-rose-600 shake" : ""} ${
                      otpVerified ? "border-green-600 shake" : ""
                    }`}
                  />
                ))}
              </div>

              {otpInvalidMessage && (
                <div className="text-red-500 text-[12px] w-full flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]">
                    <IoWarning />
                  </span>
                  <p>{otpInvalidMessage}</p>
                </div>
              )}

              <p className="text-[14px] mt-2">
                Didn&apos;t receive OTP?
                <button
                  type="button"
                  className={`ml-1 text-universal ${
                    isResending
                      ? "cursor-not-allowed text-gray-400"
                      : "cursor-pointer"
                  }`}
                  onClick={!isResending ? handleResend : null}
                  disabled={isResending || otpVerified}
                >
                  {isResending ? `Resend in ${timer}s` : "Resend"}
                </button>
              </p>

              <button
                className="hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center items-center rounded-lg drop-shadow-md"
                type="button"
                onClick={handleNext}
                disabled={loading || otpVerified}
              >
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                ) : (
                  "Submit"
                )}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MasterForm;
