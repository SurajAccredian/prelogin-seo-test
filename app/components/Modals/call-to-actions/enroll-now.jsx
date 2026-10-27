"use client";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoIosClose } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IoWarning } from 'react-icons/io5'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css';
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link';
import Swal from 'sweetalert2'
import { getCta, programSignUp } from '../../../services/program.service';
import { HashLoader } from '../../Loaders';
import { useDispatch } from 'react-redux';
import { programActions } from '../../../store/reducers/program';
import urlMapping from "../../Assets/category-urls.json"
import { trackGoogleAdsLeadConversion } from '../../../helpers/googleAds.helpers';


export default function EnrollNow({ open }) {

  const dispatch = useDispatch()

  useEffect(() => {
    if (window && open && open?.external_enroll) {
      window.open(open.external_enroll, "_blank")
      dispatch(programActions.setEnrollState(null))
    }
  }, [open, dispatch])

  const [url, setUrl] = useState("");

  useEffect(() => {
    if (urlMapping.hasOwnProperty(open?.category)) {
      setUrl(urlMapping[open?.category]);
    }
  }, [open?.category]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
    },
    mode: "onChange"
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => programSignUp(body),
    onSuccess: (result) => {
      dispatch(programActions.setEnrollState(null))
      reset("")
      if (result.status == 200) {
        trackGoogleAdsLeadConversion();
        Swal.fire({
          title: "Success",
          text: "Welcome! We have emailed you your login details. Please use those login details to continue your application on next page.",
          icon: "success",
          confirmButtonText: "Resume Application",
        }).then((conf) => {
          if (conf.isConfirmed) {
            window.open(url, "_blank");
          }
        });
      }
      else if (result.status == 302) {
        trackGoogleAdsLeadConversion();
        Swal.fire({
          title: "Success",
          text: "Hello! Account with this email already exists. We had emailed you login details when you registered with us last. Please check your email for these details to continue your application on next page.",
          icon: "success",
          confirmButtonText: "Resume Application",
        }).then((conf) => {
          if (conf.isConfirmed) {
            window.open(url, "_blank");
          }
        });
      } else {
        Swal.fire({
          title: "error",
          text: "We are experiencing heavy load. Please try again later.",
          icon: "error",
        });
      }
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const submitForm = (body) => {

    const { first_name, last_name, contact, email } = body

    const payload = {
      email,
      firstname: first_name,
      lastname: last_name,
      category_id: open.category,
      university: open.short_university_name,
      course: open.title,
      mobile: contact,
      url: url,
      type: "ApplyNow"
    };
    mutate(payload)
  };

  const handleClose = () => {
    if (isPending) {
      return
    } else {
      dispatch(programActions.setEnrollState(null))
    }
  }

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
          <Box sx={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}>
            <div className='overflow-hidden font-circular'>
              <div className='py-2 w-full text-center relative flex items-center justify-end'>
                {/* <h1 className="text-lg font-medium text-neutral-800 text-center">Don't miss the opportunities</h1> */}
                <div className='w-8 h-8 rounded-lg bg-white flex-shrink-0 cursor-pointer justify-self-end' onClick={handleClose}>
                  <IoIosClose className='w-full h-full' />
                </div>
              </div>
              <div className='bg-white xl:w-[50vw] lg:w-[70vw] md:w-[80vw] w-[90vw] min-h-[35vh] py-8 px-5 flex items-center gap-2 rounded-xl'>
                <div className='md:block hidden flex-[0.5]'>
                  <div className='max-w-sm w-full'>
                    <img title='enroll now' className='w-full' src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/enroll-now.webp" alt="enroll-now" />
                  </div>
                </div>
                <div className="flex-1 md:flex-[0.5] flex flex-col items-center">
                  {/* upper heading */}
                  <h1 className="text-sm font-medium text-neutral-600 text-center">Enter your details to start the application</h1>
                  {/* request form */}
                  <form className={`w-full h-full flex flex-col justify-between mt-2`} onSubmit={handleSubmit(submitForm)}>
                    <div className="w-full">
                      {/* first name */}
                      <div className="relative">
                        <input className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["first_name"] ? "border-rose-500" : "border-neutral-300"} 
${errors["first_name"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                          {...register("first_name", {
                            required: {
                              value: true,
                              message: "First name is required",
                            },
                          })}
                          id="first_name"
                          type="text"
                          placeholder="First Name (Required)"
                        />
                        {errors.first_name?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.first_name?.message}</p>
                          </div>
                        )}
                      </div>
                      {/* last name */}
                      <div className={`relative ${errors?.last_name?.message ? "mt-2" : "mt-4"}`}>
                        <input className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["last_name"] ? "border-rose-500" : "border-neutral-300"} 
${errors["last_name"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                          {...register("last_name", {
                            required: {
                              value: true,
                              message: "Last name is required",
                            },
                          })}
                          id="last_name"
                          type="text"
                          placeholder="Last Name (Required)"
                        />
                        {errors.last_name?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.last_name?.message}</p>
                          </div>
                        )}
                      </div>
                      {/* email */}
                      <div className={`relative ${errors?.email?.message ? "mt-2" : "mt-4"}`}>
                        <input className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2
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
                      <div className={`relative ${errors?.contact?.message ? "mt-2" : "mt-4"}`}>
                        <Controller
                          name="contact"
                          control={control}
                          rules={{
                            required: "Contact number is required",
                            minLength: {
                              value: 8,
                              message: "Must provide contact number"
                            }
                          }}
                          render={({ field }) => (
                            <PhoneInput
                              inputStyle={{
                                width: "100%",
                                borderTop: "none",
                                borderLeft: "none",
                                borderRight: "none",
                                borderBottom: errors.contact ? "2px solid red" : "2px solid rgb(212 212 212)",
                                borderRadius: "0px",
                                padding: "10px",
                                paddingLeft: "55px",
                                outline: "none",
                                fontSize: "0.875rem",
                                lineHeight: "1.25rem",
                              }}
                              specialLabel=''
                              enableSearch={true}
                              country={'in'}
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
                    <div className='w-full mt-6'>
                      {/* policy */}
                      <div className="w-full text-center">
                        <h3 className="text-xs font-medium">By submitting the form, you agree to our <Link href="/terms" className="text-universal">Terms and Conditions</Link> and our <Link href="/terms/privacy" className="text-universal">Privacy Policy</Link>.</h3>
                      </div>
                      {/* submit button */}
                      <button disabled={isPending} className={`disabled:py-6 disabled:bg-transparent hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`} type="submit">
                        {isPending ? (
                          <HashLoader />
                        ) : "Start Application"}
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
