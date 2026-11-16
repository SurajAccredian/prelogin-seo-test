"use client";
import Image from "next/image";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import CircularProgress from "@mui/material/CircularProgress";
import { decodeToken, isExpired } from "react-jwt";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { masterVerifyEmail, masterVerifyOtp } from "../../services/auth.service";

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
  } = useForm({
    defaultValues: { email: "", name: "" },
    mode: "onChange",
  });

  useEffect(() => {
    let interval = null;
    if (isResending && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResending(false);
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
        setOtpInvalidMessage("OTP is required");
        return;
      }
      await onSubmit(data)();
    } else {
      if (data.email) {
        const response = await emailVerification(data.email, data.name);
        if (response) {
          setActiveStep((prev) => prev + 1);
        }
      }
    }
    setLoading(false);
  };

  const handleBack = () => {
    setOtp(["", "", "", ""]);
    setTimer(0);
    setIsResending(false);
    setOtpInvalid(false);
    setOtpInvalidMessage("");
    setOtpVerified(false);
    setActiveStep((prev) => prev - 1);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpInvalidMessage("");

    if (value.length === 1 && index < otp.length - 1) {
      setOtpInvalid(false);
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (value.length === 0 && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index].length === 0 && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const setEnrollmentDetails = (response) => {
    const enrollment = response.enrollmentDetails;
    if (enrollment && enrollment.length > 0) {
      localStorage.setItem("enrollment", JSON.stringify(enrollment));
      localStorage.setItem("enrollmentStatus", true);
    } else {
      localStorage.setItem("enrollmentStatus", false);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const email = emailValue;
      const stringOtp = otp.join("");
      const verifyOtpPayload = { email, otp: stringOtp };
      const response = await masterVerifyOtp(verifyOtpPayload);

      if (response) {
        const auth_type = response.auth_type;
        if (auth_type === "existingUser") {
          setEnrollmentDetails(response);
          setCookie("token", response.token, 12, "localhost");
          const myDecodedToken = decodeToken(response.token);
          const isMyTokenExpired = isExpired(response.token);
          setTokenexp(isMyTokenExpired);
          localStorage.setItem("name", myDecodedToken?.data?.firstname || nameValue);
          localStorage.setItem("token", response.token);
          setOtpVerified(true);
          toast.success("OTP Verified", { position: "top-right" });

          setTimeout(() => {
            router.push("/");
          }, 1000);
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message) {
          setOtpInvalidMessage(error.response.data.message);
          setOtpInvalid(true);
          setLoading(false);
          setOtp(["", "", "", ""]);
          return;
        }
      }
    }
    setLoading(false);
  };

  return (
    <Box
      className="font-circular font-normal relative p-10"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 4,
        margin: "auto",
        minHeight: "80vh",
      }}
    >
      <div className="relative bg-white flex justify-center items-center h-[60%] rounded-lg max-w-[840px] w-[90%] outline-none border-none shadow-lg overflow-hidden">
        <Box
          sx={{
            width: "50%",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <Image
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/loginModalImage.svg"
            alt="Login illustration"
            width={400}
            height={400}
            quality={75}
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "50%" }, paddingLeft: 4, paddingRight: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 2 }}>
            <Image
              src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
              alt="Company Logo"
              width={150}
              height={45}
              quality={75}
              style={{ width: "150px", height: "auto" }}
            />
          </Box>

          {activeStep === 0 ? (
            <>
              <div className="mb-4 text-2xl font-semibold text-paleBlack pb-3 pt-3">
                <h2>Admin Login</h2>
              </div>
              <form onSubmit={handleSubmit(handleNext)}>
                <div className="mb-4">
                  <input
                    className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2 ${errors["name"] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-blue-500"
                      }`}
                    {...register("name", { required: { value: true, message: "Name is required" } })}
                    id="name"
                    type="text"
                    placeholder="Name (Required)"
                    disabled={loading}
                  />
                  {errors.name?.message && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                      <span className="mt-[-1px]"><IoWarning /></span>
                      <p>{errors.name?.message}</p>
                    </div>
                  )}

                  <input
                    className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2 ${errors["email"] ? "border-rose-500 focus:border-rose-500" : "border-neutral-300 focus:border-blue-500"
                      }`}
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    id="email"
                    type="text"
                    placeholder="Email (Required)"
                    disabled={loading}
                  />
                  {errors.email?.message && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                      <span className="mt-[-1px]"><IoWarning /></span>
                      <p>{errors.email?.message}</p>
                    </div>
                  )}
                </div>
                <button
                  className="hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Continue"}
                </button>
              </form>
            </>
          ) : activeStep === 1 ? (
            <>
              <button onClick={handleBack} className="text-universal pb-3 pt-3 cursor-pointer">
                &lt; Back
              </button>

              <div className="mb-4 text-paleBlack">
                <h2 className="text-xl font-semibold">We've sent an OTP on </h2>
                <p className="text-[14px] text-gray-500">
                  {emailValue}
                  <span className="ml-2">
                    <button onClick={handleBack} disabled={otpVerified} className="text-universal underline">
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
                    className={`w-1/6 p-3 font-semibold text-md border-2 mr-2 rounded-lg text-center outline-none transition pl-2 mt-2 ${digit.length === 0 ? "border-neutral-300" : "border-blue-500"
                      } ${otpInvalid ? "border-rose-600 shake" : ""} ${otpVerified ? "border-green-600 shake" : ""}`}
                  />
                ))}
              </div>

              {otpInvalidMessage && (
                <div className="text-red-500 text-[12px] w-full flex items-center gap-1 mt-1 pl-2">
                  <span className="mt-[-1px]"><IoWarning /></span>
                  <p>{otpInvalidMessage}</p>
                </div>
              )}

              <p className="text-[14px] mt-2">
                Didn't receive OTP?
                <button
                  className={`ml-1 text-universal ${isResending ? "cursor-not-allowed text-gray-400" : "cursor-pointer"}`}
                  onClick={!isResending ? handleResend : null}
                  disabled={isResending || otpVerified}
                >
                  {isResending ? `Resend in ${timer}s` : "Resend"}
                </button>
              </p>

              <button
                className="hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md"
                type="button"
                onClick={handleNext}
                disabled={loading || otpVerified}
              >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
              </button>
            </>
          ) : null}
        </Box>
      </div>
    </Box>
  );
}

export default MasterForm;
