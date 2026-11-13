import Image from "next/image";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Button,
  Spinner,
} from "@chakra-ui/react";
import CryptoJS from "crypto-js";
import { IoWarning } from "react-icons/io5";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/reducers/user";
import toast from "react-hot-toast";
import { encodeBase64 } from "../../../helpers/encodeTrackerId";
import SignupDrawer from "./SignupDrawer";
import {
  genrateOtpExistingUser,
  verifyEmail,
  verifyOtp,
  verifyPassword,
} from "../../../services/auth.service";
import {
  createApplicationStepTracker,
  getApplicationDetails,
} from "../../../services/program.service";
// import SignUpModal from "../../Modals/SignUpModal";

// Setting the cookies so that the user can login from any portal of accredian.com
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

// Setting the cookies so that the user can login from any portal of accredian.com
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

const LoginDrawer = ({ isOpen, onClose }) => {
  const steps = ["Step 1", "Step 2"];
  const [activeStep, setActiveStep] = useState(0);
  // const [isOpen, setIsopen] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [tokenExp, setTokenexp] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for the buttons
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpInvalidMessage, setOtpInvalidMessage] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const [userAuthType, setUserAuthType] = useState(false);
  const [resetPasswordText, setResetPasswordText] = useState("");
  const dispatch = useDispatch();

  const { authType, redirectUrl, category, loginType, authenticated } =
    useSelector((state) => state.user);

  // console.log("The category from drawe page is " + category);
  // console.log(redirectUrl);
  // console.log("Auth Type:", authType);
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  // For resending the otp and stoping the user to hit the api again and again
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
    setTimer(60);
    setIsResending(true);
    if (emailValue) {
      await emailVerification(emailValue);
      // console.log("OTP WAS SENT AGAIN for the user");
    }
  };

  const handleResendForExistingUser = async () => {
    setTimer(60);
    setIsResending(true);
    if (emailValue) {
      await sendExistingUserOtp(emailValue);
      // console.log("OTP WAS SENT AGAIN for the existing user");
    }
  };


  // To update the auth status to OTP
  const handleEmailVerification = (status) => {
    dispatch(userActions.openLoginModal(status));
  };

  const sendExistingUserOtp = async (email) => {
    try {
      const otpPayload = {
        email,
      };
      const response = await genrateOtpExistingUser(otpPayload);
      if (response) {
        // console.log(response);
        toast.success(response.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Sending OTP to users email Id
  const emailVerification = async (email) => {
    try {
      const emailVerficationPayload = {
        email,
      };
      const response = await verifyEmail(emailVerficationPayload);
      // console.log(response);
      if (response) {
        const auth_type = response.auth_type;
        // If existing user then token is set and he is logged in directlly
        // if(response.message && response.message === "OTP has been successfully sent to your email."){

        // }

        // console.log("Email is verified now");
        setEmailValue(email);

        if (auth_type === "existingUser") {
          setResetPasswordText(response.message);
          setShowPasswordBox(true);
          setUserAuthType(true);
          // handleEmailVerification("Password");
        } else {
          setShowPasswordBox(false);
          setUserAuthType(false);
          setTimer(60);
          setIsResending(true);
          // handleEmailVerification("otp");
          toast.success(response.message, {
            position: "top-right",
          });
        }

        return response;
      }
      // } else {
      //   console.log("Here");
      //   toast.error(
      //     "Apologies, we are currently experiencing some server issues. Please try again later.",
      //     { position: "top-right" }
      //   );
      //   console.log("Unexpected status code:", response.status);
      // }
    } catch (error) {
      // console.log("Here");
      // console.log(error);
      // console.log(error.response.data.feedback);
      // const { status, data } = error.response;
      if (error.response.data.feedback) {
        toast.error(error.response.data.feedback, { position: "top-right" });
      }
      setTimeout(() => {
        window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
        dispatch(userActions.openLoginModal(null));
      }, 1000);
    }
  };

  // Once the otp is verfied the auth_type is checked if the user is a exisitng user then he is logged in or else the signup modal opens and his account is created
  const handleOTPVerification = (auth_type) => {
    if (auth_type == "existingUser") {
      // dispatch(userActions.openLoginModal(auth_type));
      handleClose();
    } else {
      // dispatch(userActions.openLoginModal(auth_type));
      setIsNewUser(true);
      console.log("New user");
    }
    // console.log("Auth Type:", authType);
  };

  // All the states are reset while closing the modal
  const handleClose = () => {
    // console.log("Called");
    // console.log("Not loading");
    if (!loading) {
      setActiveStep(0);
      setEmailValue("");
      setOtp(["", "", "", ""]);
      setTimer(0);
      setIsResending(false);
      setOtpVerified(false);
      setOtpInvalid(false);
      setOtpInvalidMessage("");
      setIsNewUser(false);
      reset();
      onClose();
      // dispatch(userActions.openLoginModal("loginsuccess"));
    } else {
      // console.log("Loding is going on ");
    }
  };

  // Logic of going to the next step of the form (email ---> otp)
  const handleNext = async (data) => {
    // console.log(data);
    // console.log(activeStep);
    setLoading(true); // Start loading

    if (activeStep === steps.length - 1) {
      const isOtpComplete = otp.every((digit) => digit.length > 0);

      if (!isOtpComplete) {
        setLoading(false);
        setOtpInvalid(true);
        setOtpInvalidMessage("OTP is required");
        // toast.error("OTP Incomplete");
        return;
      }

      await onSubmit(data)();
    } else {
      if (data.email) {
        const response = await emailVerification(data.email);
        if (response) {
          setActiveStep((prev) => prev + 1);
        }
      }
    }
    setLoading(false);
  };

  // Going back to the prev step of the form (if the user has to edit is email or wants to go back)
  const handleBack = () => {
    setOtp(["", "", "", ""]);
    setTimer(0);
    setIsResending(false);
    setOtpInvalid(false);
    setOtpInvalidMessage("");
    setOtpVerified(false);
    setActiveStep((prev) => prev - 1);
  };

  // Keeping the track of the otp the users has entered
  // const handleOtpChange = (index, value) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);
  //   setOtpInvalidMessage("");

  //   if (value.length === 1 && index < otp.length - 1) {
  //     setOtpInvalid(false);
  //     document.getElementById(`otp-${index + 1}`).focus();
  //   } else if (value.length === 0 && index > 0) {
  //     document.getElementById(`otp-${index - 1}`).focus();
  //   }
  // };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value; // Update the OTP digit at the specified index
    setOtp(newOtp);
    setOtpInvalidMessage("");

    // Handle moving focus based on input
    if (value.length === 1) {
      // If the user typed a digit, focus on the next input
      if (index < otp.length - 1) {
        setOtpInvalid(false);
        document.getElementById(`otp-${index + 1}`).focus();
      }
    } else if (value.length === 0) {
      // If the user deleted a digit, focus on the previous input
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }

    // Additional logic: check if the user is modifying the input
    if (value.length === 1 && index < otp.length - 1) {
      // Move focus to the next input if digit is added
      setOtpInvalid(false);
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (value.length === 0) {
      // Move focus back to the previous input if digit is deleted
      if (index > 0) {
        document.getElementById(`otp-${index - 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index].length === 0 && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const closePasswordBox = async () => {
    setShowPasswordBox(false);
    setTimer(60);
    setIsResending(true);
    await sendExistingUserOtp(emailValue);
    setOtpInvalidMessage("");
    setOtpInvalid(false);
    setOtp(["", "", "", ""]);
  };

  const openPasswordBox = async () => {
    setShowPasswordBox(true);
    setOtpInvalidMessage("");
    setOtpInvalid(false);
    setOtp(["", "", "", ""]);
  };
  // The otp is verfied of the user

  const setLoginDetails = (response) => {
    setCookie("token", response.token, 12, "accredian.com");
    // setCookie("token", response.token, 12, "accredian.com");
    const myDecodedToken = decodeToken(response.token);
    const isMyTokenExpired = isExpired(response.token);
    // console.log(myDecodedToken);
    // setTokenexp(isMyTokenExpired);
    localStorage.setItem("name", myDecodedToken.data.firstname);
    localStorage.setItem("token", response.token);
    setOtpVerified(true);
    return myDecodedToken;
  };

  const setEnrollmentDetails = (response) => {
    const enrollment = response.enrollmentDetails;
    if (enrollment.length > 0) {
      localStorage.setItem("enrollment", JSON.stringify(enrollment));
      localStorage.setItem("enrollmentStatus", true);
    } else {
      localStorage.setItem("enrollmentStatus", false);
    }
  };

  function openUniversityApp(response, encodedTracker) {
    // Check the current environment
    const isDevelopment = process.env.NODE_ENV === "development";
    // console.log(process.env);
    console.log(isDevelopment);
    console.log(process.env.NODE_ENV);
    console.log(typeof process.env.NODE_ENV);

    // Construct the URL based on the environment
    const url = isDevelopment
      ? `${process.env.NEXT_PUBLIC_PAYMENT_PORTAL_BASE_URL}/?app_id=${encodedTracker}` // Localhost URL for development
      : `https://${Number(category) == 44 ? 'iimv-pgdm' : response.data.university}.accredian.com/?app_id=${encodedTracker}`; // Production URL

    // Open the URL in a new browser tab
    window.open(url, "_blank");
  }

  const submimtPassword = async (data) => {
    setLoading(true);
    // console.log("Entered into submit password");
    try {
      // console.log(data);
      const sendData = {
        email: data.email,
        password: CryptoJS.AES.encrypt(
          data.password,
          "ACCREDIAN@login$2022@$newweb$@"
        ).toString(),
      };
      const response = await verifyPassword(sendData);
      const auth_type = "existingUser";
      if (response) {
        // console.log(response);
        if (response.token === "User access is revoked !") {
          toast.error("User access is revoked !", { position: "top-right" });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return;
        }
        toast.success(response.message, { position: "top-right" });
        const myDecodedToken = setLoginDetails(response);
        setEnrollmentDetails(response)
        const userId = myDecodedToken.data.user_id;
        if (window.clarity && typeof window.clarity === "function") {
          // window.clarity("set", "user_id", userId);
          // window.clarity("set", "app", "website");
          window.clarity("identify", userId);
          window.clarity("set", "uid", userId);
        }
        dispatch(userActions.setAuthenticatedState(true));

        // If the user is logging from the program page then using his cateogry we find out that his steptacker details if his step tracker exists then we redirect him to that portal or else we create it and then redirect him to that portal
        if (category) {
          // const currentURL = window.location.href;
          const universityName = localStorage.getItem("university_shortName");
          const payload = {
            id: userId,
            category: category,
            universityName: universityName,
          };
          // console.log("The cateogry is " + category);
          getApplicationDetails(payload)
            .then((response) => {
              console.log(response);
              // const encodedTracker = encodeBase64(response.data.tracker_id);
              if (response.status === "Continue Learning") {
                console.log("Enrollment case");
                setTimeout(() => {
                  window.open(
                    `${process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL}/`,
                    "_blank"
                  );
                  // console.log("The current url is "+currentURL);
                  window.location.reload();
                  handleOTPVerification(auth_type);
                }, 1000);
              } else if (response.message === "success") {
                // console.log("Step tracker is created");
                const encodedTracker = encodeBase64(response.data.tracker_id);
                setTimeout(() => {
                  openUniversityApp(response, encodedTracker);
                  window.location.reload();
                  handleOTPVerification(auth_type);
                  // window.open(
                  //   `https://${response.data.university}.accredian.com/?app_id=${encodedTracker}`,
                  //   "_blank"
                  // );
                  // console.log("The current url is "+currentURL);
                }, 1000);
              } else if (response.message === "error") {
                // console.log("No steptracker case");
                const createStepTrackerPayload = {
                  id: userId,
                  category: category,
                  universityName: universityName,
                };
                createApplicationStepTracker(createStepTrackerPayload)
                  .then((response) => {
                    // Handle the successful response
                    // console.log(
                    //   "Step tracker created successfully:",
                    //   response.data
                    // );
                    // console.log(response);

                    const encodedTracker = encodeBase64(response.data);
                    setTimeout(() => {
                      openUniversityApp(response, encodedTracker);
                      window.location.reload();
                      handleOTPVerification(auth_type);
                      // window.open(
                      //   `https://${universityName}.accredian.com/?app_id=${encodedTracker}`,
                      //   "_blank"
                      // );
                      // console.log("The current url is "+currentURL);
                      // window.location.reload();
                    }, 1000);
                  })
                  .catch((error) => {
                    console.log(error);
                    if (error.response.status === 409) {
                      // console.log("Here")
                      toast.error(error.response.data.feedback, {
                        position: "top-right",
                      });
                      setTimeout(() => {
                        // window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
                        // window.open(redirectUrl, "_blank");
                        window.location.reload();
                        handleOTPVerification(auth_type);
                      }, 1000);
                    } else {
                      if (
                        error.response.data.feedback ===
                        "Invalid university name!"
                      ) {
                        setTimeout(() => {
                          window.open(
                            `https://${universityName}.accredian.com/`,
                            "_blank"
                          );
                          // window.open(redirectUrl, "_blank");
                          window.location.reload();
                          handleOTPVerification(auth_type);
                        }, 1000);
                      }
                    }
                  });
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 409) {
                // console.log("Here")
                toast.error(error.response.data.feedback, {
                  position: "top-right",
                });
                setTimeout(() => {
                  window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
                  window.open(redirectUrl, "_blank");
                  handleOTPVerification(auth_type);
                }, 1000);
              }
            });
        } else {
          setTimeout(() => {
            window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
            // window.open(redirectUrl, "_blank");
            handleOTPVerification(auth_type);
          }, 1000);
        }
      }
    } catch (e) {
      // console.log("The error occured is " + e);
      if (e.response) {
        const { status, data } = e.response;
        if (e.response.data.feedback) {
          toast.error(e.response.data.feedback, { position: "top-right" });
          setLoading(false);
          // setOtp(["", "", "", ""]);
          return;
        } else if (e.response.data.message) {
          toast.error(e.response.data.message, { position: "top-right" });
          // setPasswordInvalidMessage(e.response.data.message);
          // setPasswordInvalid(true);
          setLoading(false);
          // setOtp(["", "", "", ""]);
          return;
        }
      }
    }
    setLoading(false);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log("otp is :" + otp);
    setLoading(true); // Start loading

    try {
      const email = emailValue;
      const stringOtp = otp.join("");
      const verifyOtpPayload = {
        email,
        otp: stringOtp,
      };
      const response = await verifyOtp(verifyOtpPayload);
      // console.log(response);

      if (response) {
        const auth_type = response.auth_type;
        // If existing user then token is set and he is logged in directlly
        if (auth_type === "existingUser") {
          // setCookie("token", response.token, 12, "accredian.com");
          // const myDecodedToken = decodeToken(response.token);
          // const isMyTokenExpired = isExpired(response.token);
          // console.log(myDecodedToken);
          // setTokenexp(isMyTokenExpired);
          // localStorage.setItem("name", myDecodedToken.user.firstname);
          // localStorage.setItem("token", response.token);
          // setOtpVerified(true);
          // toast.success("OTP Verified", { position: "top-right" });
          // const userId = myDecodedToken.user.id;
          // dispatch(userActions.setAuthenticatedState(true));
          if (response.token === "User access is revoked !") {
            toast.error("User access is revoked !", { position: "top-right" });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            return;
          }
          toast.success(response.message, { position: "top-right" });
          const myDecodedToken = setLoginDetails(response);
          setEnrollmentDetails(response)
          const userId = myDecodedToken.data.user_id;
          if (window.clarity && typeof window.clarity === "function") {
            // window.clarity("set", "user_id", userId);
            // window.clarity("set", "app", "website");
            window.clarity("identify", userId);
            window.clarity("set", "uid", userId);
          }

          // If the user is logging from the program page then using his cateogry we find out that his steptacker details if his step tracker exists then we redirect him to that portal or else we create it and then redirect him to that portal
          if (category) {
            const universityName = localStorage.getItem("university_shortName");
            const payload = {
              id: userId,
              category: category,
              universityName: universityName,
            };
            // const currentURL = window.location.href;
            // console.log(currentURL);
            // alert(currentURL)
            // console.log("The cateogry is " + category);
            getApplicationDetails(payload)
              .then((response) => {
                console.log(response);
                // const encodedTracker = encodeBase64(response.data.tracker_id);
                if (response.status === "Continue Learning") {
                  console.log("Enrollment case");
                  setTimeout(() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL}/`,
                      "_blank"
                    );
                    // console.log("The current url is "+currentURL);
                    window.location.reload();
                    handleOTPVerification(auth_type);
                  }, 1000);
                } else if (response.message === "success") {
                  // console.log("Step tracker is created");
                  const encodedTracker = encodeBase64(response.data.tracker_id);
                  setTimeout(() => {
                    openUniversityApp(response, encodedTracker);
                    window.location.reload();
                    handleOTPVerification(auth_type);
                    // window.open(
                    //   `https://${response.data.university}.accredian.com/?app_id=${encodedTracker}`,
                    //   "_blank"
                    // );
                    // console.log("The current url is "+currentURL);
                  }, 1000);
                } else if (response.message === "error") {
                  // console.log("No steptracker case");
                  const createStepTrackerPayload = {
                    id: userId,
                    category: category,
                    universityName: universityName,
                  };
                  createApplicationStepTracker(createStepTrackerPayload)
                    .then((response) => {
                      // Handle the successful response
                      // console.log(
                      //   "Step tracker created successfully:",
                      //   response.data
                      // );
                      // console.log(response);

                      const encodedTracker = encodeBase64(response.data);
                      setTimeout(() => {
                        openUniversityApp(response, encodedTracker);
                        window.location.reload();
                        handleOTPVerification(auth_type);
                        // window.open(
                        //   `https://${universityName}.accredian.com/?app_id=${encodedTracker}`,
                        //   "_blank"
                        // );
                        // console.log("The current url is "+currentURL);
                        // window.location.reload();
                      }, 1000);
                    })
                    .catch((error) => {
                      console.log(error);
                      if (error.response.status === 409) {
                        // console.log("Here")
                        toast.error(error.response.data.feedback, {
                          position: "top-right",
                        });
                        setTimeout(() => {
                          // window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
                          // window.open(redirectUrl, "_blank");
                          window.location.reload();
                          handleOTPVerification(auth_type);
                        }, 1000);
                      } else {
                        if (
                          error.response.data.feedback ===
                          "Invalid university name!"
                        ) {
                          setTimeout(() => {
                            window.open(
                              `https://${universityName}.accredian.com/`,
                              "_blank"
                            );
                            // window.open(redirectUrl, "_blank");
                            window.location.reload();
                            handleOTPVerification(auth_type);
                          }, 1000);
                        }
                      }
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                if (error.response.status === 409) {
                  // console.log("Here")
                  toast.error(error.response.data.feedback, {
                    position: "top-right",
                  });
                  setTimeout(() => {
                    window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
                    window.open(redirectUrl, "_blank");
                    handleOTPVerification(auth_type);
                  }, 1000);
                }
              });
          } else {
            setTimeout(() => {
              window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
              // window.open(redirectUrl, "_blank");
              handleOTPVerification(auth_type);
            }, 1000);
          }

          // setTimeout(() => {
          //   window.location.href = "http://localhost:3000/";
          //   handleOTPVerification(auth_type);
          // }, 1000);

          // setTimeout(() => {
          //   console.log(response);
          //   if (response.data.applicationStatus) {
          //     console.log("This was from the program page ");
          //     window.open(redirectUrl, "_blank");
          //   } else {
          //     // window.location.href = "http://localhost:3000/";
          //   }
          //   handleOTPVerification(auth_type);
          // }, 1000);
          // toast.success("OTP Verfied");
        } else {
          setOtpVerified(true);
          toast.success("OTP Verified", { position: "top-right" });
          localStorage.setItem("newUserEmail", emailValue);
          setTimeout(() => {
            setOtpVerified(false);
            handleOTPVerification(auth_type);
          }, 1000);
        }
      }
    } catch (error) {
      // console.log("Error occurred:", error);

      if (error.response) {
        const { status, data } = error.response;
        if (error.response.data.message) {
          // toast.error("Invalid OTP. Please try again.");
          setOtpInvalidMessage(error.response.data.message);
          setOtpInvalid(true);
          setLoading(false);
          setOtp(["", "", "", ""]);
          return;
        } else {
          console.error(`Error ${status}: ${data.message}`);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        // console.log("Error message:", error.message);
      }
    }

    dispatch(userActions.setLoginType("user"));
    setLoading(false); // Stop loading
  };

  // const toggleDrawer = (open) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }
  //   setIsDrawerOpen(open);
  // };
  return (
    <>
      {isOpen && !isNewUser && (
        <Drawer
          onClose={loading ? null : handleClose}
          isOpen={isOpen}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent bg="white" zIndex="1500">
            <DrawerCloseButton mx={"4px"} />
            <DrawerHeader mx={"4px"} borderBottom="2px solid #e2e8f0">
              <Image
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                alt="Company Logo"
                width={100}
                height={30}
                quality={75}
                style={{ width: "100px", height: "auto" }}
              />
            </DrawerHeader>
            <DrawerBody>
              <div class="font-circular font-normal  relative flex flex-row justify-center items-center outline-none border-none  mx-auto">
                <div className=" relative  bg-white flex justify-center items-center  rounded-2xl w-full outline-none border-none">
                  {/* <div className=" absolute py-2 w-full text-center  flex items-center justify-end top-0 right-2 ">
                <button
                  className=" w-8 h-8 rounded-lg bg-white flex items-center justify-center cursor-pointer"
                  onClick={handleClose}
                  disabled={loading}
                >
                  <IoIosClose className="w-12 h-12 text-gray-600" />
                </button>
              </div> */}

                  {/* Left Side: Image */}

                  {/* <Box
                sx={{
                  width: "50%",
                  display: {
                    xs: "none", // Show on extra-small screens
                    sm: "none", // Show on small screens
                    md: "block", // Hide on medium screens and up
                  },
                }}
              >
                <img
                  src={loginModalImage}
                  alt="Description"
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
              </Box> */}

                  {/* Right Side: Form */}
                  <div className="w-full md:w-1/2 px-1">
                    {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={logo}
                    alt="Company Logo"
                    style={{ width: "150px", height: "auto" }}
                  />
                </Box> */}

                    {activeStep === 0 ? (
                      <>
                        <div className="mb-4 text-2xl font-semibold text-paleBlack pb-3 pt-3">
                          <h2>Welcome! Sign up or Login</h2>
                        </div>
                        <div
                          id="modal-description"
                          className="mb-4 text-paleBlack "
                        >
                          <p className="">
                            You can sign in or join with us if you&apos;re new to
                            Accredian
                          </p>
                        </div>
                        <form onSubmit={handleSubmit(handleNext)}>
                          <div className="mb-4">
                            <input
                              className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
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
                              type="text"
                              placeholder="Email (Required)"
                              disabled={loading}
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
                          <button
                            className={`hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                            type="submit"
                            disabled={loading} // Disable button while loading
                          >
                            {loading ? (
                              <Spinner size="md" color="white" />
                            ) : (
                              "Continue"
                            )}{" "}
                            {/* Show loader or text */}
                          </button>

                          {/* <Button
                        isLoading={loading} // Use Chakra's isLoading to handle spinner automatically
          
                        colorScheme="blue" // You can change the color scheme as per your design
                        variant="solid"
                        width="full"
                        mt={6}
                        py={2}
                        px={4}
                        fontSize="base"
                        fontWeight="medium"
                        borderRadius="lg"
                        boxShadow="md"
                        _hover={{ bg: "darkBlue" }} // Customize the hover state color
                        type="submit"
                        disabled={loading} // Disable the button while loading
                      >
                        {loading ? (
                         
                        ) : (
                          "Continue"
                        )}
                      </Button> */}
                        </form>
                      </>
                    ) : activeStep === 1 ? (
                      <>
                        <button
                          onClick={handleBack}
                          className="text-universal pt-3 cursor-pointer "
                        >
                          {" "}
                          &lt; Back
                        </button>

                        {/* <div className="mb-4  text-paleBlack">
                      <h2 className="text-xl font-semibold">
                        We've sent an OTP on
                      </h2>
                      <p className="text-[14px] text-gray-500 ">
                        {emailValue}
                        <span className="ml-2">
                          <button
                            onClick={handleBack}
                            disabled={otpVerified}
                            className="text-universal underline"
                          >
                            Edit
                          </button>
                        </span>{" "}
                      </p>
                    </div> */}
                        <div
                          id="modal-description"
                          className="mb-4 text-paleBlack "
                        ></div>

                        {showPasswordBox ? (
                          <>
                            <div className="mb-4  text-paleBlack">
                              <h2 className="text-xl font-semibold">
                                Login using your password
                              </h2>
                              <p className="text-[14px] mt-2 text-gray-500 ">
                                {emailValue}
                                <span className="ml-2">
                                  <button
                                    onClick={handleBack}
                                    // disabled={otpVerified}
                                    className="text-universal underline"
                                  >
                                    Edit
                                  </button>
                                </span>{" "}
                              </p>
                            </div>
                            <form
                              action=""
                              onSubmit={handleSubmit(submimtPassword)}
                            >
                              <div className="flex relative w-[100%] items-center ">
                                <input
                                  className={` w-[100%]  px-4 py-3 font-normal text-sm bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
 ${errors["password"] ? "border-rose-500" : "border-neutral-300"} 
 ${errors["password"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                                  {...register("password", {
                                    required: {
                                      value: true,
                                      message: "Password is required",
                                    },
                                  })}
                                  id="password"
                                  type="password"
                                  placeholder="Password (Required)"
                                  disabled={loading}
                                />
                                {/* <button className="text-universal absolute right-12 top-5 font-semibold text-[14px]" >Reset ?</button> */}
                              </div>

                              {errors.password?.message && (
                                <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                                  <span className="mt-[-1px]">
                                    <IoWarning />
                                  </span>
                                  <p>{errors.password?.message}</p>
                                </div>
                              )}

                              {/* {passInvalidMessage && (
                            <>
                              <div className="text-red-500 text-[8px] w-full   flex items-center gap-1 mt-1 pl-2">
                                <span className="mt-[-1px]">
                                  <IoWarning />
                                </span>
                                <p>{passInvalidMessage}</p>
                              </div>
                            </>
                          )} */}
                              <a href="/lost-password" target="__blank">
                                <p className="text-[12px] mt-2">
                                  {resetPasswordText}
                                  <button
                                    type="button"
                                    className={`ml-1 text-universal ${isResending
                                      ? "cursor-not-allowed text-gray-400"
                                      : "cursor-pointer"
                                      }`}

                                  // disabled={}
                                  >
                                    {resetPasswordText === "Forgot password?"
                                      ? "Reset"
                                      : "Set It"}
                                  </button>
                                </p>
                              </a>
                              <button
                                className={`hover:bg-darkBlue text-base relative mt-4 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                                type="submit"
                                disabled={loading} // Disable button while loading
                              >
                                {loading ? (
                                  <Spinner size="md" color="white" />
                                ) : (
                                  "Submit"
                                )}{" "}
                                {/* Show loader or text */}
                              </button>
                              <div className="flex justify-center items-center mt-2 text-gray-500">
                                <p>OR</p>
                              </div>

                              <button
                                className={` text-base relative mt-2 px-4 py-2 bg-white font-medium text-gray-500 border-2  w-full flex justify-center rounded-lg drop-shadow-sm transition ease-in-out`}
                                type="button"
                                onClick={closePasswordBox}
                                disabled={loading} // Disable button while loading
                              >
                                Login using OTP
                                {/* Show loader or text */}
                              </button>
                            </form>

                            {/* <p className="text-[12px] mt-1">
                          Login using
                          <button
                            className={`ml-1 text-universal ${
                              isResending
                                ? "cursor-not-allowed text-gray-400"
                                : "cursor-pointer"
                            }`}
                            onClick={!isResending ? handleResend : null}
                            disabled={isResending || otpVerified}
                          >
                            {isResending ? `Resend in ${timer}s` : "OTP ?"}
                          </button>
                        </p> */}
                            {/* <div className="flex justify-around gap-2 items-center">
                          <div className="border-b border-universal w-[25%] h-2 "></div>
                          <button className="text-[14px]">
                            Login using OTP
                          </button>
                          <div className="border-b border-universal w-[25%] h-2"></div>
                        </div> */}
                          </>
                        ) : (
                          <>
                            <div className="mb-4  text-paleBlack">
                              <h2 className="text-xl font-semibold">
                                We&apos;ve sent an OTP on
                              </h2>
                              <p className="text-[14px] text-gray-500 ">
                                {emailValue}
                                <span className="ml-2">
                                  <button
                                    onClick={handleBack}
                                    disabled={otpVerified}
                                    className="text-universal underline"
                                  >
                                    Edit
                                  </button>
                                </span>{" "}
                              </p>
                            </div>
                            <div className="flex">
                              {otp.map((digit, index) => (
                                <input
                                  key={index}
                                  id={`otp-${index}`}
                                  disabled={loading}
                                  value={digit}
                                  onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                  }
                                  onKeyDown={(e) => handleKeyDown(index, e)}
                                  maxLength="1"
                                  className={` w-1/6 p-3  font-semibold text-md border-2 mr-2 rounded-lg text-center outline-none transition pl-2 mt-2 ${digit.length === 0
                                    ? "border-neutral-300"
                                    : "border-blue-500"
                                    } ${otpInvalid === true
                                      ? "border-rose-600 shake"
                                      : "border-blue-500"
                                    } ${otpVerified === true
                                      ? "border-green-600 shake"
                                      : "border-blue-500"
                                    } `}
                                />
                              ))}
                            </div>
                            {otpInvalidMessage && (
                              <>
                                <div className="text-red-500 text-[12px] w-full   flex items-center gap-1 mt-1 pl-2">
                                  <span className="mt-[-1px]">
                                    <IoWarning />
                                  </span>
                                  <p>{otpInvalidMessage}</p>
                                </div>
                              </>
                            )}
                            <p className="text-[14px] mt-2">
                              Didn&apos;t receive OTP?
                              <button
                                className={`ml-1 text-universal ${isResending
                                  ? "cursor-not-allowed text-gray-400"
                                  : "cursor-pointer"
                                  }`}
                                onClick={() => {
                                  if (userAuthType) {
                                    if (!isResending && !otpVerified) {
                                      handleResendForExistingUser();
                                    }
                                  } else {
                                    if (!isResending && !otpVerified) {
                                      handleResend();
                                    }
                                  }
                                }}
                                // onClick={!isResending ? handleResend : null}
                                disabled={isResending || otpVerified}
                              >
                                {isResending ? `Resend in ${timer}s` : "Resend"}
                              </button>
                            </p>

                            <button
                              className={`hover:bg-darkBlue text-base relative mt-4 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md ${showPasswordBox ? "hidden" : "block"
                                }`}
                              type="button"
                              onClick={handleNext}
                              disabled={loading || otpVerified} // Disable button while loading
                            >
                              {loading ? (
                                <Spinner size="md" color="white" />
                              ) : (
                                "Submit"
                              )}{" "}
                              {/* Show loader or text */}
                            </button>
                            {userAuthType && (
                              <>
                                <div className="flex justify-center items-center mt-2 text-gray-500">
                                  <p>OR</p>
                                </div>

                                <button
                                  className={` text-base relative mt-2 px-4 py-2 bg-white font-medium text-gray-500 border-2  w-full flex justify-center rounded-lg  transition ease-in-out`}
                                  type="button"
                                  onClick={openPasswordBox}
                                  disabled={loading || otpVerified} // Disable button while loading
                                >
                                  Login using password
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                <div></div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
      {isNewUser && (
        <SignupDrawer
          open={isNewUser}
          email={emailValue}
        // handleClose={handleClose}
        />
      )}
    </>
  );
};

export default LoginDrawer;
