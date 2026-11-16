"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from '@chakra-ui/react';
const Box = ({ children, className = "", ...props }) => (
  <div className={className} {...props}>
    {children}
  </div>
);
import { IoWarning } from 'react-icons/io5';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useForm, Controller } from 'react-hook-form';
import Link from "next/link";
import { decodeToken, isExpired } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../store/reducers/user';
import toast from 'react-hot-toast';
import {
  verifyEmail,
  verifyOtp,
  createUser,
  enrollFreeCourseUser,
  generateUserLoginOtp,
  fetchThinkificUrl,
} from '../../../services/auth.service';
import { createApplicationStepTracker } from '../../../services/program.service';
import { encodeBase64 } from '../../../helpers/encodeTrackerId';
import { mergeEnrollmentDetails } from '../../../helpers/enrollment.helpers';
import CryptoJS from 'crypto-js';
import { CircleCheck } from 'lucide-react';

function SignupDrawer({ open, reOpenLoginModal, handleClose }) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState('');
  const [timer, setTimer] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [tokenExp, setTokenexp] = useState();
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
    getValues
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

  // Send OTP
  const handleSendOtp = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords does not match', { position: 'top-right' });
      return;
    }

    try {
      setLoading(true);
      setUserData({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        contact: data.contact,
        password: data.password
      });

      const payload = { email: data.email };
      const response = await verifyEmail(payload);

      if (response) {
        const authtype = response.auth_type;
        if (authtype === 'existingUser') {
          console.log('Email already registered');
          toast.error('Email already registered. Please login.', { position: 'top-right' });
          reOpenLoginModal();
          return;
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

  // Verify OTP
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

      const otpResponse = await verifyOtp({
        email: userData.email,
        otp: stringOtp
      });

      console.log('OTP Response', otpResponse);
      if (otpResponse) {
        setOtpVerified(true);
        // toast.success('OTP verified successfully!', { position: 'top-right' });
        // Create user immediately after OTP verification
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

  // Create user account
  const createUserAccount = async (newTab = null) => {
    try {
      const formData = getValues();

      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords does not match', { position: 'top-right' });
        return;
      }

      const payload = {
        email: formData.email,
        first_name: formData.firstname,
        last_name: formData.lastname,
        mobile: formData.contact,
        password: CryptoJS.AES.encrypt(formData.password, 'ACCREDIAN@login$2022@$newweb$@').toString(),
        auth_type: 'signup'
      };

      console.log('Create User Payload', payload);

      const response = await createUser(payload);

      if (response) {
        localStorage.setItem('enrollmentStatus', false);
        setCookie('token', response.token, 12, 'accredian.com');
        const myDecodedToken = decodeToken(response.token);
        const isMyTokenExpired = isExpired(response.token);
        setTokenexp(isMyTokenExpired);
        localStorage.setItem('name', myDecodedToken.data.firstname);
        localStorage.setItem('token', response.token);
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
              mergeEnrollmentDetails(enrollRes.enrollmentDetails);
            }
          } catch (enrollErr) {
            console.error("Failed to auto-enroll new user in drawer:", enrollErr);
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

          if (thinkificRedirectUrl && newTab) {
            newTab.location.href = thinkificRedirectUrl;
          } else if (newTab && !newTab.closed) {
            newTab.close();
          }

          setLoading(false);
          handleClose();
          window.location.reload();
          return;
        }

        console.log(category)
        if (category) {
          const universityName = localStorage.getItem('university_shortName');
          const stepTrackerPayload = {
            id: userId,
            category,
            universityName
          };

          createApplicationStepTracker(stepTrackerPayload)
            .then(async (response) => {
              const encodedTracker = encodeBase64(response.data);
              await openUniversityApp(universityName, encodedTracker);
              setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
              console.log(error);
              setTimeout(() => {
                window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
              }, 1000);
            });
        } else {
          setTimeout(() => {
            window.location.href = process.env.NEXT_PUBLIC_BASE_URL;
          }, 1000);
        }
      }
    } catch (error) {
      if (newTab && !newTab.closed) {
        newTab.close();
      }
      console.log('Error creating account', error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          toast.error('The provided email is already linked to an existing account.', { position: 'top-right' });
          return;
        }
      }
      toast.error('Failed to create account. Please try again.', { position: 'top-right' });
    }
  };

  const handleCreateAccount = async () => {
    const newTab = isfreeCourse && typeof window !== "undefined" ? window.open("", "_blank") : null;
    try {
      setLoading(true);
      await createUserAccount(newTab);
    } catch (error) {
      toast.error('Failed to create account. Please try again.', { position: 'top-right' });
    } finally {
      setLoading(false);
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
    let expires;
    if (hours) {
      const date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    const cookieDomain = domain ? `; domain=${domain}` : '';
    document.cookie = `${name}=${value}${expires}${cookieDomain}; path=/`;
  }

  // OTP handlers
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpInvalid(false);
    setOtpErrorMessage('');

    if (value && index < otp.length - 1) {
      document.getElementById(`drawer-otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`drawer-otp-${index - 1}`)?.focus();
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
        console.log('OTP WAS SENT AGAIN for the user');
      }
    }
  };

  const closeDrawer = () => {
    reset();
    setOtp(['', '', '', '']);
    setOtpVerified(false);
    setOtpSent(false);
    setUserData({ email: '', firstname: '', lastname: '', contact: '', password: '' });
    handleClose();
  };

  return (
    <Drawer isOpen={open} placement="right" onClose={closeDrawer} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
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
          <form className="space-y-4 flex-1 flex flex-col justify-between">
            {/* Step Header */}
            <Box className="mb-4">
              <Box className="text-xl font-semibold mb-2">Create Account</Box>
              <Box className="text-sm text-gray-600">Enter your details to create account</Box>
            </Box>

            <Box className="space-y-4">
              {/* First Name */}
              <Box>
                <input
                  {...register('firstname', {
                    required: 'First name is required',
                    minLength: { value: 2, message: 'First name must be at least 2 characters' }
                  })}
                  type="text"
                  placeholder="First Name"
                  disabled={loading || otpSent}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstname?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.firstname?.message}
                  </Box>
                )}
              </Box>

              {/* Last Name */}
              <Box>
                <input
                  {...register('lastname', {
                    required: 'Last name is required',
                    minLength: { value: 2, message: 'Last name must be at least 2 characters' }
                  })}
                  type="text"
                  placeholder="Last Name"
                  disabled={loading || otpSent}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastname?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.lastname?.message}
                  </Box>
                )}
              </Box>

              {/* Email */}
              <Box>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Email"
                  disabled={loading || otpSent}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.email?.message}
                  </Box>
                )}
              </Box>

              {/* Mobile */}
              <Box>
                <Controller
                  name="contact"
                  control={control}
                  rules={{
                    required: 'Mobile number is required',
                    minLength: { value: 10, message: 'Mobile number must be at least 10 digits' }
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      country={'in'}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={loading || otpSent}
                      inputStyle={{
                        width: '100%',
                        height: '40px',
                        fontSize: '14px'
                      }}
                    />
                  )}
                />
                {errors.contact?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.contact?.message}
                  </Box>
                )}
              </Box>

              {/* Password */}
              <Box>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  type="password"
                  placeholder="Password"
                  disabled={loading || otpSent}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.password?.message}
                  </Box>
                )}
              </Box>

              {/* Confirm Password */}
              <Box>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === watch('password') || 'Passwords does not match'
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  disabled={loading || otpSent}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.confirmPassword?.message && (
                  <Box className="flex items-center gap-1 mt-1 text-rose-600 text-sm">
                    <IoWarning />
                    {errors.confirmPassword?.message}
                  </Box>
                )}
              </Box>

              {/* OTP Section */}
              <Box className="flex items-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`drawer-otp-${index}`}
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

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSubmit(handleSendOtp)}
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? <Spinner size="sm" /> : 'Send OTP'}
                  </button>
                ) : !otpVerified ? (
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={loading || otp.some(digit => !digit)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? <Spinner size="sm" /> : 'Verify OTP'}
                  </button>
                ) : (
                  <Box className="flex-1 flex items-center justify-center gap-2 text-green-600 font-medium">
                    <CircleCheck className="w-5 h-5" />
                    OTP Verified!
                  </Box>
                )}
              </Box>

              {/* OTP Error Message */}
              {otpErrorMessage && (
                <Box className="flex items-center gap-1 text-rose-600 text-sm">
                  <IoWarning />
                  {otpErrorMessage}
                </Box>
              )}

              {/* Resend OTP */}
              {otpSent && !otpVerified && (
                <Box className="text-sm text-center">
                  <span className="text-gray-600">Didn&apos;t receive OTP? </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-blue-600 font-medium hover:underline disabled:opacity-50"
                  >
                    {isResending ? `Resend in ${timer}` : 'Resend OTP'}
                  </button>
                </Box>
              )}

              {/* Terms & Conditions */}
              <Box className="text-xs text-gray-600 text-center">
                By submitting the form, you agree to our{' '}
                <Link href="/terms-and-conditions" prefetch={false} className="text-blue-600 hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" prefetch={false} className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </Box>

              {/* Create Account Button */}
              <button
                type="button"
                onClick={handleCreateAccount}
                disabled={loading || !otpVerified}
                className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {loading && otpVerified ? <Spinner size="sm" /> : 'Verify & Create Account'}
              </button>

              {/* Login Link */}
              <Box className="text-sm text-center text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={reOpenLoginModal}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Login
                </button>
              </Box>
            </Box>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default SignupDrawer;
