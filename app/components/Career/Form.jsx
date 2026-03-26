import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { IoWarning } from "react-icons/io5";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { DEPARTMENTS } from "../Assets/constants";

import "./Careers.css";
import { careersPortal } from "../../services/careers.service";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import BlackoutLoader from "../Loaders/BlackoutLoader/BlackoutLoader";
import ReCAPTCHA from "react-google-recaptcha";

const Form = () => {
  const [fileName, setFileName] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      department: "",
      position: "",
      experience: "",
      resume: null,
      message: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (body) => careersPortal({ body }),
    onSuccess: (result) => {
      // console.log(result);
      reset("");
      setFileName("");
      Swal.fire({
        title: "Thank You!",
        text: "Your application submitted successfully! Our team will contact you soon.",
        icon: "success",
        confirmButtonText: "OK",
      });
      // toast.success("Your application submitted successfully!")
    },
    onError: (error) => {
      // console.log(error);
      Swal.fire({
        title: "Oops!",
        text: "Apologies for any inconvenience. Our system is experiencing high demand, causing delays. Please retry later. Your patience is appreciated.",
        icon: "error",
        confirmButtonText: "OK",
      });
      reset("");
      setFileName("");
    },
  });

  const watchedFile = watch("resume");

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      setFileName(watchedFile[0].name);
    }
  }, [watchedFile]);

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  const submitForm = (body) => {
    try {
      body.resume = body.resume[0];
      body.department = body.department.value;

      const payload = new FormData();

      for (const key in body) {
        payload.append(key, body[key]);
      }

      mutate(payload);
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: errors.department
        ? "2px solid red"
        : "2px solid rgb(212 212 212)",
      borderRadius: "8px",
      padding: "6px 0",
      outline: "none",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
      marginTop: "8px",
    }),
  };

  return (
    <>
      <div className="w-full max-w-[85rem] mx-auto mt-4 pb-16 font-circular">
        <div className="request-brochure p-6 bg-white rounded-lg w-full max-w-4xl mx-auto h-fit flex flex-col justify-between">
          <div className="w-full flex flex-col items-center">
            {/* upper heading */}
            <h1 className="text-xl font-semibold text-neutral-800">
              Start Your Journey with Accredian
            </h1>
            {/* job application form */}
            <form
              className="w-full h-full min-h-[24rem] flex flex-col justify-between mt-4"
              onSubmit={handleSubmit(submitForm)}
            >
              <div className="w-full">
                <div className="w-full">
                  <div className="w-full flex gap-4 items-center md:flex-row flex-col">
                    {/* full name */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base">Full Name</h2>
                      <input
                        className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
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
                        placeholder="Your first and last name"
                      />
                      <div className="md:hidden block">
                        {errors.name?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.name?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* email */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base">Email</h2>
                      <input
                        className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
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
                        placeholder="Your email"
                      />
                      <div className="md:hidden block">
                        {errors.email?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.email?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* desktop warnings */}
                  <div className="w-full md:flex items-center gap-4 hidden">
                    <div className="flex-1">
                      {errors.name?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.name?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      {errors.email?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.email?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* contact and department */}
                <div className="w-full mt-2">
                  <div className="w-full flex items-center gap-4 md:flex-row flex-col">
                    {/* contact */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base mb-2">Contact</h2>
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
                              border: errors.contact
                                ? "2px solid red"
                                : "2px solid rgb(212 212 212)",
                              borderRadius: "8px",
                              padding: "12px",
                              paddingLeft: "55px",
                              outline: "none",
                            }}
                            enableSearch={true}
                            country={"in"}
                            placeholder="Contact"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />
                      <div className="md:hidden block">
                        {errors.contact?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.contact?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* department select */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base">Department</h2>
                      <Controller
                        name="department"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            isClearable
                            placeholder="Choose your department"
                            styles={customStyles}
                            {...field}
                            options={DEPARTMENTS}
                          />
                        )}
                      />
                      <div className="md:hidden block">
                        {errors.department?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.department?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* warnings */}
                  <div className="w-full hidden md:flex items-center gap-4">
                    <div className="flex-1">
                      {errors.contact?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.contact?.message}</p>
                        </div>
                      )}
                      {errors.department?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.department?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      {errors.department?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.department?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* position and experience */}
                <div className="w-full mt-2">
                  <div className="w-full flex items-center gap-4 md:flex-row flex-col">
                    {/* position */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base">Position</h2>
                      <input
                        className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
                  ${errors["position"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                          } 
                  ${errors["position"]
                            ? "focus:border-rose-500"
                            : "focus:border-blue-500"
                          }
                `}
                        {...register("position", {
                          required: {
                            value: true,
                            message: "Position is required",
                          },
                        })}
                        id="position"
                        type="text"
                        placeholder="Position you are applying for"
                      />
                      <div className="md:hidden block">
                        {errors.position?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.position?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* experience */}
                    <div className="relative w-full md:flex-1">
                      <h2 className="font-medium text-base">Experience</h2>
                      <input
                        className={`w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
                  ${errors["experience"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                          } 
                  ${errors["experience"]
                            ? "focus:border-rose-500"
                            : "focus:border-blue-500"
                          }
                  `}
                        {...register("experience", {
                          required: {
                            value: true,
                            message: "Experience is required",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "Only numbers are allowed",
                          },
                        })}
                        id="experience"
                        type="number"
                        placeholder="Years of Experience you have?"
                      />
                      <div className="md:hidden block">
                        {errors.experience?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                            <span className="mt-[-1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.experience?.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full hidden md:flex items-center gap-4">
                    <div className="flex-1">
                      {errors.position?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.position?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      {errors.experience?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.experience?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* message */}
                <div className="relative mt-2">
                  <h2 className="font-medium text-base">Message</h2>
                  <textarea
                    rows={2}
                    className={`resize-none w-full px-4 py-3 font-normal bg-white border-2 rounded-lg outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
${errors["message"] ? "border-rose-500" : "border-neutral-300"} 
${errors["message"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                    {...register("message", {
                      maxLength: {
                        value: 250,
                        message: "message should be under 250 characters",
                      },
                    })}
                    id="message"
                    placeholder="Tell us about yourself (Optional)"
                  />
                  {errors.message?.message && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.message?.message}</p>
                    </div>
                  )}
                </div>
                {/* upload resume */}
                <div className="relative mt-2">
                  <h2 className="font-medium text-base">Resume</h2>
                  <label
                    className={`w-full py-4 px-4 flex items-center justify-between cursor-pointer border border-dashed ${errors?.resume?.message
                      ? "border-red-500"
                      : !errors?.resume?.message && fileName
                        ? "border-green-500"
                        : "border-neutral-400"
                      } rounded-lg mt-2`}
                    htmlFor="resume"
                  >
                    <div className="flex items-center gap-2">
                      {fileName && !errors?.resume?.message ? (
                        <div className="w-8 h-8 flex-shrink-0">
                          <svg
                            className="w-full h-full"
                            fill="#22c55e"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            id="check"
                          >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L10 14.17l-1.88-1.88c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L17.3 9.7c.39-.39.39-1.02 0-1.41-.39-.39-1.03-.39-1.42 0z"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex-shrink-0">
                          <svg
                            className="w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            fill={
                              errors?.resume?.message ? "#ef4444" : "#94A3B8E6"
                            }
                            viewBox="0 0 24 24"
                          >
                            <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                            <g
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              id="SVGRepo_tracerCarrier"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                fill=""
                                d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                              ></path>{" "}
                            </g>
                          </svg>
                        </div>
                      )}
                      <h1
                        className={`text-base ${errors?.resume?.message
                          ? "text-red-500"
                          : !errors?.resume?.message && fileName
                            ? "text-green-500"
                            : "text-slate-400/90"
                          } font-medium`}
                      >
                        {fileName && !errors?.resume?.message
                          ? "Resume uploaded successfully"
                          : "Upload your resume"}
                      </h1>
                    </div>
                    <div className="">
                      {fileName && !errors?.resume?.message ? (
                        <h4
                          className={`text-base text-slate-400/90 font-medium`}
                        >
                          {fileName}
                        </h4>
                      ) : (
                        <h4
                          className={`text-base ${errors?.resume?.message
                            ? "text-red-500"
                            : "text-slate-400/90"
                            } font-medium`}
                        >
                          {errors?.resume?.message
                            ? errors?.resume?.message
                            : "PDF | Max: 2 MB"}
                        </h4>
                      )}
                    </div>
                    <input
                      {...register("resume", {
                        required: {
                          value: true,
                          message: "Resume is required",
                        },
                        validate: {
                          checkFileSize: (value) =>
                            value[0].size < 2000000 || "The file is too large",
                          checkFileType: (value) =>
                            value[0].type === "application/pdf" ||
                            "Only PDF files are allowed",
                        },
                      })}
                      id="resume"
                      className="hidden"
                      type="file"
                      accept=".pdf"
                    />
                  </label>
                </div>
              </div>
              <div className="pt-3">
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ""}
                  onChange={onCaptchChange}
                />
              </div>{" "}
              {/* submit button */}
              <button
                disabled={isPending || !captchaVerified}
                className={`disabled:py-2 disabled:bg-gray-300 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                type="submit"
              >
                Apply
              </button>
            </form>
            {/* policy */}
            <div className="w-full mt-6 text-center">
              <h3 className="text-sm font-medium text-neutral-500">
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
        </div>
      </div>
      <BlackoutLoader
        open={isPending}
        message="Please wait as we are submitting your application!"
      />
    </>
  );
};

export default Form;
