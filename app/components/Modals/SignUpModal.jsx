"use client";

import { Box, Modal } from '@mui/material';
import { IoIosClose } from 'react-icons/io';
import { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { IoWarning } from 'react-icons/io5';
import CircularProgress from '@mui/material/CircularProgress';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { decodeToken, isExpired } from "react-jwt";
import { verifyEmail, verifyOtp, createUser, enrollFreeCourseUser, generateUserLoginOtp, fetchThinkificUrl } from '../../services/auth.service';
import { userActions } from '../../store/reducers/user';
import { createApplicationStepTracker } from '../../services/program.service';
import { encodeBase64 } from '../../helpers/encodeTrackerId';
import CryptoJS from "crypto-js";
import { CircleCheck } from 'lucide-react';

function SignUpModal({ open = false, reOpenLoginModal }) {
  // 2 Steps: 0=Profile+Password, 1=OTP Verification
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [tokenExp, setTokenexp] = useState("");
  const [userData, setUserData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    contact: '',
    password: ''
  });

  const dispatch = useDispatch();
  const { authType, redirectUrl, category, isfreeCourse, program_id } = useSelector(state => state.user);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      contact: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  // OTP Timer
  useEffect(() => {
    let interval = null;
    if (isResending && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    } else if (timer === 0) {
      setIsResending(false);
    }
    return () => clearInterval(interval);
  }, [isResending, timer]);

  const handleSendOtp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords does not match', { position: 'top-right' });
      return;
    }

    try {
      setLoading(true);

      // Save all user data including password
      setUserData({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        contact: data.contact,
        password: data.password
      });

      // Send OTP
      const payload = { email: data.email };
      const response = await verifyEmail(payload);

      if (response) {
        const auth_type = response.auth_type;
        if (auth_type === "existingUser") {
          toast.error('Email already registered. Please login.', { position: 'top-right' });
          reOpenLoginModal();
        } else {
          const otpResponse = await generateUserLoginOtp(payload);
          if (otpResponse) {
            setTimer(60);
            setIsResending(true);
            toast.success(otpResponse?.message, { position: 'top-right' });
            setOtpSent(true);
          }
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.feedback || 'Please enter a valid email', { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const stringOtp = otp.join('');

    if (!otp.every(digit => digit.length > 0)) {
      setOtpInvalid(true);
      setOtpErrorMessage('Please enter complete 4-digit OTP');
      toast.error('Complete OTP required', { position: 'top-right' });
      return;
    }

    try {
      setLoading(true);
      setOtpInvalid(false);

      // Verify OTP
      const otpResponse = await verifyOtp({
        email: userData.email,
        otp: stringOtp
      });

      if (otpResponse) {
        setOtpVerified(true);
        // toast.success('OTP Verified Successfully!', { position: 'top-right' });
      }
    } catch (error) {
      setOtpInvalid(true);
      setOtpErrorMessage(error.response?.data?.message || 'Invalid OTP');
      toast.error(error.response?.data?.feedback || 'Something went wrong', { position: 'top-right' });
      setOtp(['', '', '', '']);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      await createUserAccount();
    } catch (error) {
      toast.error('Failed to create account. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false)
    }
  }

  // Create user account
  const createUserAccount = async () => {
    try {
      // Get fresh form values directly from React Hook Form
      const formData = getValues();

      const payload = {
        email: formData.email,
        first_name: formData.firstname,
        last_name: formData.lastname,
        mobile: formData.contact,
        password: CryptoJS.AES.encrypt(formData.password, "ACCREDIAN@login$2022@$newweb$@").toString(),
        auth_type: "signup",
      };
      const response = await createUser(payload);
      if (response) {
        localStorage.setItem("enrollmentStatus", false);
        setCookie("token", response.token, 12, "localhost");
        const myDecodedToken = decodeToken(response.token);
        const isMyTokenExpired = isExpired(response.token);
        setTokenexp(isMyTokenExpired);
        localStorage.setItem("name", myDecodedToken.data.firstname);
        localStorage.setItem("token", response.token);
        toast.success("Account Created Successfully", {
          position: "top-right",
        });
        const userId = myDecodedToken.data.user_id;
        if (window.clarity && typeof window.clarity === "function") {
          window.clarity("identify", String(userId));
          window.clarity("set", "uid", String(userId));
        }
        dispatch(userActions.setAuthenticatedState(true));

        if (isfreeCourse) {
          // Standard signup succeeded, now enroll them in the free course
          try {
            const finalProgramId = program_id || localStorage.getItem('freeCourseProgram');
            const finalCategoryId = localStorage.getItem('freeCourseCategory');
            const finalBatchId = localStorage.getItem('freeCourseBatch');
            const finalCourseTitle = localStorage.getItem('freeCourseTitle');

            // if (!finalProgramId || !finalCategoryId || !finalBatchId || !finalCourseTitle) {
            //   toast.error("Course configuration is missing. Please refresh the page and try again.", { position: "top-right" });
            //   handleClose();
            //   return;
            // }

            const user_id = myDecodedToken?.data?.user_id || myDecodedToken?.data?.id;
            const firstname = myDecodedToken?.data?.firstname || 'Learner';
            const lastname = myDecodedToken?.data?.userlastname || myDecodedToken?.data?.lastname || '';
            const email = myDecodedToken?.data?.email;

            if (!user_id || !email) {
              toast.error("Invalid user profile details. Please try again.", { position: "top-right" });
              handleClose();
              return;
            }

            const enrollRes = await enrollFreeCourseUser({
              user_id,
              firstname,
              lastname,
              email,
              program_id: finalProgramId,
              category_id: finalCategoryId,
              batch_id: finalBatchId,
              course_name: finalCourseTitle,
              dashboard_link: process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL || "https://accredian.com",
            });
            if (enrollRes?.enrollmentDetails?.length > 0) {
              localStorage.setItem("enrollment", JSON.stringify(enrollRes.enrollmentDetails));
              localStorage.setItem("enrollmentStatus", "true");
            }
          } catch (enrollErr) {
            console.error("Failed to auto-enroll new user:", enrollErr);
          }

          let thinkificRedirectUrl = "";
          try {
            const email = myDecodedToken.data.email;
            const firstname = myDecodedToken.data.firstname;
            const lastname = myDecodedToken.data.lastname || '';
            thinkificRedirectUrl = await fetchThinkificUrl({ email, firstname, lastname });
            if (thinkificRedirectUrl) {
              localStorage.setItem("thinkificUrl", thinkificRedirectUrl);
            }
          } catch (err) {
            console.error("Failed to fetch Thinkific redirect URL:", err);
            toast.error("Failed to generate course redirect URL. Please try again.", { position: "top-right" });
          }

          // Open the dashboard in a new tab and close the modal
          setTimeout(() => {
            if (thinkificRedirectUrl) {
              window.open(thinkificRedirectUrl, "_blank");
            }
            window.location.reload();
          }, 1000);
          return;
        }

        if (category) {
          const universityName = localStorage.getItem("university_shortName");
          const stepTrackerPayload = {
            id: userId,
            category: category,
            universityName: universityName,
          };
          createApplicationStepTracker(stepTrackerPayload)
            .then(async (response) => {
              const encodedTracker = encodeBase64(response.data);
              await openUniversityApp(universityName, encodedTracker);
              setTimeout(() => {
                window.location.reload();
                handleClose();
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              setTimeout(() => {
                window.location.href = `${(process.env.NEXT_PUBLIC_BASE_URL || "/")}/`;
                handleClose();
              }, 1000);
            });
        } else {
          setTimeout(() => {
            window.location.href = `${(process.env.NEXT_PUBLIC_BASE_URL || "/")}/`;
            handleClose();
          }, 1000);
        }
      }
    } catch (error) {
      console.log("Error creating account:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          toast.error(
            "The provided email is already linked to an existing account.",
            { position: "top-right" }
          );
          return;
        }
      }
      toast.error('Failed to create account. Please try again.', { position: 'top-right' });
    }
  };

  async function openUniversityApp(university, encodedTracker) {
    const isDevelopment = process.env.NODE_ENV === "development";
    const url = isDevelopment
      ? `${process.env.NEXT_PUBLIC_PAYMENT_PORTAL_BASE_URL}/?app_id=${encodedTracker}`
      : `https://${Number(category) == 44 ? 'iimv-pgdm' : university}.accredian.com/?app_id=${encodedTracker}`;
    window.open(url, "_blank");
  }

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

  // OTP handlers
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpInvalid(false);
    setOtpErrorMessage('');

    if (value && index < otp.length - 1) {
      document.getElementById(`signup-otp-${index + 1}`).focus();
    }
  };


  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`signup-otp-${index - 1}`).focus();
    }
    if (e.key === 'Enter' && otp.every(digit => digit.length > 0) && !otpVerified) {
      handleVerifyOtp();
    }
  };

  const handleResendOTP = async () => {
    setTimer(60);
    setIsResending(true);
    setOtp(['', '', '', '']);
    setOtpVerified(false);
    const email = getValues("email");
    if (email) {
      const otpResponse = await generateUserLoginOtp({ email: email });
      if (otpResponse) {
        setTimer(60);
        setIsResending(true);
        toast.success(otpResponse?.message, { position: 'top-right' });
      }
    }
  };

  const handleClose = () => {
    reset();
    setOtp(['', '', '', '']);
    setOtpVerified(false);
    setOtpSent(false);
    setUserData({ email: '', firstname: '', lastname: '', contact: '', password: '' });
    dispatch(userActions.openLoginModal(false));
    console.log('SignUpModal closed');
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClose={loading ? null : handleClose}
    >
      <div className="font-circular font-normal w-full max-w-[760px] relative flex justify-center items-center h-full mx-auto px-3">
        <div className="relative flex w-full rounded-2xl overflow-hidden shadow-[0_18px_45px_rgba(15,23,42,0.18)] bg-white" style={{ minHeight: 420 }}>
          {/* Close Button */}
          <div className="absolute py-2 w-full text-center flex items-center justify-end top-1 right-2 z-10">
            <button
              className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center cursor-pointer hover:bg-white transition-all"
              onClick={handleClose}
              disabled={loading}
            >
              <IoIosClose className="w-5 h-5 text-gray-700" />
            </button>
          </div>


          {/* Left Side Image */}
          <Box
            sx={{
              width: '50%',
              display: { xs: 'none', sm: 'block' },
              backgroundImage:
                'linear-gradient(135deg, #f1f5ff 0%, #e0f2ff 40%, #e5f3ff 100%)',
            }}
            className="relative"
          >
            <div className="absolute inset-0 flex flex-col justify-between">
              <div className="px-6 pt-8 text-slate-800">
                <img src='https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp'
                  alt="Company Logo"
                  className="w-28" />
                <h2 className="mt-2 text-xl font-semibold leading-snug text-slate-900">
                  Designed for Professionals. Built for Impact.
                </h2>
                <p className="mt-2 text-xs text-slate-600">
                  Create your account to begin your upskilling journey with Accredian.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center px-4 pb-4">
                <img
                  src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/signUpModalImage.svg"
                  alt="Create Account"
                  className="w-full max-w-[260px] h-auto drop-shadow-[0_14px_30px_rgba(15,23,42,0.18)]"
                />
              </div>
            </div>
          </Box>


          {/* Right Side Form */}
          <Box
            sx={{
              width: { xs: '100%', sm: '50%' },
              height: '100%',
              backgroundColor: '#F9FAFB',
            }}
            className="flex items-stretch"
          >
            <div className="w-full h-full flex flex-col px-5 py-6 sm:px-7 sm:py-7">
              {/* Logo (mobile only) */}
              <div className="mb-3 flex justify-between items-center sm:hidden">
                <img
                  src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                  alt="Company Logo"
                  className="h-6 w-auto"
                />
              </div>


              {/* Step Header */}
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Create Account
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter your details to create account
                </p>
              </div>


              {/* STEP 1: Profile + Password */}
              <form onSubmit={handleSubmit(handleCreateAccount)} className="space-y-4">
                {/* First and Last Name */}
                <div className="flex gap-4">
                  {/* First Name */}
                  <div className='w-full'>
                    <input
                      className={`w-full px-3 py-2.5 font-normal text-sm bg-white border rounded-md outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${errors.firstname
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                        }`}
                      {...register("firstname", { required: "First name is required" })}
                      id="firstname"
                      type="text"
                      placeholder="First Name*"
                      disabled={loading}
                    />
                    {errors.firstname?.message && (
                      <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                        <IoWarning className="mt--1px" />
                        <p>{errors.firstname?.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className='w-full'>
                    <input
                      className={`w-full px-3 py-2.5 font-normal text-sm bg-white border rounded-md outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${errors.lastname
                        ? 'border-rose-500 focus:border-rose-500'
                        : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                        }`}
                      {...register("lastname", { required: "Last name is required" })}
                      id="lastname"
                      type="text"
                      placeholder="Last Name*"
                      disabled={loading}
                    />
                    {errors.lastname?.message && (
                      <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                        <IoWarning className="mt--1px" />
                        <p>{errors.lastname?.message}</p>
                      </div>
                    )}
                  </div>
                </div>


                {/* Email */}
                <div>
                  <input
                    className={`w-full px-3 py-2.5 font-normal text-sm bg-white border rounded-md outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${errors.email
                      ? 'border-rose-500 focus:border-rose-500'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                      }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                        message: "Please enter a valid email"
                      }
                    })}
                    id="email"
                    type="text"
                    placeholder="Email*"
                    disabled={loading || otpSent}
                  />
                  {errors.email?.message && (
                    <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                      <IoWarning />
                      <p>{errors.email?.message}</p>
                    </div>
                  )}
                </div>


                {/* Mobile */}
                <div>
                  <Controller
                    name="contact"
                    control={control}
                    rules={{
                      required: "Contact number is required",
                      minLength: { value: 8, message: "Must provide contact number" }
                    }}
                    render={({ field }) => (
                      <PhoneInput
                        inputStyle={{
                          width: '100%',
                          borderRadius: 8,
                          border: errors.contact
                            ? '1px solid rgb(248,113,113)'
                            : '1px solid rgb(226,232,240)',
                          padding: '10px 10px 10px 52px',
                          outline: 'none',
                          fontSize: '0.875rem',
                        }}
                        specialLabel={false}
                        enableSearch={true}
                        disabled={loading || otpSent}
                        country={'in'}
                        placeholder="Mobile number*"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.contact?.message && (
                    <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                      <IoWarning className="mt--1px" />
                      <p>{errors.contact?.message}</p>
                    </div>
                  )}
                </div>


                {/* Password */}
                <div>
                  <input
                    className={`w-full px-3 py-2.5 font-normal text-sm bg-white border rounded-md outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${errors.password ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                      }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" }
                    })}
                    type="password"
                    placeholder="Password*"
                    disabled={loading || otpSent}
                  />
                  {errors.password?.message && (
                    <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                      <IoWarning className="mt--1px" />
                      <p>{errors.password?.message}</p>
                    </div>
                  )}
                </div>


                {/* Confirm Password */}
                <div>
                  <input
                    className={`w-full px-3 py-2.5 font-normal text-sm bg-white border rounded-md outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed ${errors.confirmPassword ? 'border-rose-500 focus:border-rose-500' : 'border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                      }`}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: value => value === watch('password') || "Passwords does not match"
                    })}
                    type="password"
                    placeholder="Confirm Password*"
                    disabled={loading || otpSent}
                  />
                  {errors.confirmPassword?.message && (
                    <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mt-1">
                      <IoWarning className="mt--1px" />
                      <p>{errors.confirmPassword?.message}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-start gap-4">
                  <div className="flex gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`signup-otp-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        disabled={loading || !otpSent || otpVerified}
                        className={`w-10 h-11 font-semibold text-base border rounded-md text-center outline-none transition-all ${otpInvalid
                          ? 'border-rose-500 bg-rose-50'
                          : digit.length > 0
                            ? 'border-green-500 bg-green-50'
                            : 'border-neutral-300 hover:border-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100'
                          } ${loading || !otpSent || otpVerified ? 'opacity-70 cursor-not-allowed' : 'shadow-xs'}`}
                      />
                    ))}
                  </div>
                  {!otpSent ? (
                    <button
                      className="mt-1 hover:bg-darkBlue text-sm relative px-4 py-2.5 bg-universal font-medium text-white w-full flex justify-center rounded-lg shadow-sm"
                      type="button"
                      disabled={loading}
                      onClick={handleSubmit(handleSendOtp)}
                    >
                      {loading ? (
                        <CircularProgress size={20} sx={{ color: 'white' }} />
                      ) : (
                        'Send OTP'
                      )}
                    </button>
                  ) : !otpVerified ? (
                    <button
                      className="hover:bg-darkBlue text-sm relative px-2 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg shadow-sm"
                      type="button"
                      disabled={loading}
                      onClick={handleVerifyOtp}
                    >
                      {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Verify OTP'}
                    </button>
                  ) : (
                    <div className='flex items-center gap-1'>
                      <CircleCheck className='text-green-600' size={18} />
                      <p className='text-sm text-green-600 font-medium'>OTP Verified!</p>
                    </div>
                  )}
                </div>
                {otpErrorMessage && (
                  <div className="text-red-500 text-[11px] w-full font-medium flex items-center gap-1 mb-2 justify-center">
                    <IoWarning className="mt--1px" />
                    <p>{otpErrorMessage}</p>
                  </div>
                )}
                {otpSent && !otpVerified && (
                  <p className="text-[11px] text-center text-gray-500">
                    Didn't receive OTP?{' '}
                    <button
                      type="button"
                      className={`ml-1 underline font-medium ${isResending ? 'cursor-not-allowed text-gray-400' : 'hover:text-darkBlue text-universal'
                        }`}
                      onClick={handleResendOTP}
                      disabled={isResending || loading}
                    >
                      {isResending ? `Resend in ${timer}s` : 'Resend OTP'}
                    </button>
                  </p>
                )}

                {/* Terms & Conditions */}
                <div className="w-full text-[11px] text-left text-slate-500">
                  <h3>
                    By submitting the form, you agree to our{' '}
                    <Link href="/terms" className="text-universal underline">Terms and Conditions</Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-universal underline">Privacy Policy</Link>.
                  </h3>
                </div>

                {/* {otpVerified && ( */}
                <button
                  className="mt-1 hover:bg-darkBlue text-sm relative px-4 py-2.5 bg-universal font-medium text-white w-full flex justify-center rounded-lg shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading || !otpVerified}
                >
                  {loading && otpVerified ? (
                    <CircularProgress size={20} sx={{ color: 'white' }} />
                  ) : (
                    'Verify & Create Account'
                  )}
                </button>
                {/* )} */}

                {/* Already have account - Login link */}
                <div className="text-center pt-2">
                  <p className="text-xs text-slate-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={reOpenLoginModal}
                      disabled={loading}
                      className="text-universal font-semibold hover:text-darkBlue underline transition-colors"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </form>

            </div>
          </Box>
        </div>
      </div>
    </Modal>
  );

}

export default SignUpModal;
