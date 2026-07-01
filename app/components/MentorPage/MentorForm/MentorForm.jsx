"use client";

import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./mentorForm.css";
import { useState } from "react";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import { useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
function MentorForm() {
  // const [fromData,setFormData] = useState({
  //   fullname: "",
  //   email: "",
  //   phoneNumber: "",
  //   linkedinProfile: "",
  //   yourCurrentRole: "",
  //   yourCurrentOrg: "",
  //   yearsOfExp: "",
  //   vertical: "",
  //   category: "",
  //   teachingExp
  // })
  const [fileName, setFileName] = useState("");
  const [fileUploaded, setFileUploaded] = useState(false);
  const [fileError, setFileError] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const fileInputRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const stepTitles = [
    "Let’s Get to Know You",
    "Tell Us About Your Professional Experience",
    "Select Your Preferred Training Role",
    "Share Your Teaching Experience with Us",
    "Upload your resume to begin the process",
  ];

  const roles = [
    {
      value: "Instructor",
      label: "Instructor",
      description:
        "Deliver training and classes in specialized industries to impart essential knowledge and skills.",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/instructor.svg",
    },
    {
      value: "Mentor",
      label: "Mentor",
      description:
        "Provide career guidance and support to help individuals achieve their professional goals.",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/mentor.svg", // make sure these variables are correctly imported or defined
    },

    // {
    //   value: "Notsure",
    //   label: "Not Sure?",
    //   description:
    //     "Connect with our domain experts for personalized advice to help you choose the right role",
    //   image:
    //     "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/notsure.svg",
    // },
  ];

  const [selectedRole, setSelectedRole] = useState("");

  const handleCardClick = (value) => {
    // console.log(value);
    setSelectedRole(value);
  };

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  const customStyles = (errors) => ({
    control: (provided, state) => ({
      ...provided,
      border: errors ? "2px solid red" : "2px solid rgb(212 212 212)",
      borderRadius: "8px",
      padding: "3px 0",
      outline: "none",
      boxShadow: state.isFocused ? "none" : provided.boxShadow,
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    control,
    clearErrors,
    setValue,
    setError,
  } = useForm({
    mode: "onChange",
  });

  const generateExperinceYears = () => {
    const ExperinceYears = [];
    for (let i = 0; i <= 20; i++) {
      if (i === 1) {
        ExperinceYears.push({ value: `${i} Year`, label: `${i} Year` });
      } else if (i === 20) {
        ExperinceYears.push({ value: `${i}+ Years`, label: `${i}+ Years` });
      } else {
        ExperinceYears.push({ value: `${i} Years`, label: `${i} Years` });
      }
    }
    return ExperinceYears;
  };

  const generateExperinceMonths = () => {
    const ExperinceMonths = [];
    for (let i = 1; i <= 12; i++) {
      if (i === 1) {
        ExperinceMonths.push({ value: `${i} Month`, label: `${i} Month` });
      } else {
        ExperinceMonths.push({ value: `${i} Months`, label: `${i} Months` });
      }
    }
    return ExperinceMonths;
  };

  const nextStep = async () => {
    const isValid = await trigger();
    // console.log(isValid); // Trigger validation for the current step
    if (isValid) {
      // console.log(currentStep);
      if (currentStep !== 5 && currentStep !== 3) {
        setCurrentStep((prev) => prev + 1);
      }
    }

    if (selectedRole !== "" && currentStep === 3) {
      setCurrentStep((prev) => prev + 1);
    }

    if (currentStep === 5) {
      if (fileUploaded === false && fileError === "") {
        setFileError("Resume Required");
        setFileName("");
        setFileUploaded(false);
        setValue("resume", null);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // console.log(process.env.NEXT_PUBLIC_BASE_URL)
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size and type
      if (file.size > 2000000) {
        setFileError("The file is too large");
        setFileName("");
        setFileUploaded(false);
        setValue("resume", null);
      } else if (file.type !== "application/pdf") {
        setFileError("Only PDF files are allowed");
        setFileUploaded(false);
        setFileName("");
        setValue("resume", null);
      } else {
        setFileName(file.name);
        setFileError("");
        setFileUploaded(true);
        setValue("resume", file);
      }

      await trigger("resume");
      // console.log(file);
    } else {
      setFileError("Resume is required");
      setFileName("");
      setFileUploaded(false);
      setValue("resume", null);
    }
  };

  const onSubmit = async (data) => {
    try {
      setFormSubmit(true);
      // console.log("Called");
      // console.log(data);
      // console.log(selectedRole);

      // Transform the data to match the required format
      const transformedData = {
        fullname: data.fullname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        linkedinProfile: data.linkedinProfile,
        yourCurrentRole: data.yourCurrentRole,
        yourCurrentOrg: data.yourCurrentOrg,
        professionalYearsOfExp: data.yearsOfExp,
        vertical: data.vertical.value,
        joinreason: data.joinreason,
        resume: data.resume,
        teachingExperience: data.teachingExperience.value,
        selectedRole: selectedRole,
      };

      if (data.teachingExperience.value === "Yes") {
        console.log("Exp values were added");
        transformedData.yearsOfExperience = data.expInYears.value;
        transformedData.monthsOfExperience = data.expInMonths.value;
      }

      // console.log("The trasform Data is ");
      // console.log(transformedData);

      const formData = new FormData();
      for (const [key, value] of Object.entries(transformedData)) {
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      }

      // console.log("Form Data:", formData);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD || process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/career/uploadMentorResume`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.type === "success") {
        const responseFormData = new FormData();
        responseFormData.append("Fullname", response.data?.data.fullname);
        responseFormData.append("Email", response.data?.data.email);
        responseFormData.append("Phone", response.data?.data.phoneNumber);
        responseFormData.append(
          "LinkedInProfile",
          response.data?.data.linkedinProfile
        );
        responseFormData.append(
          "CurrentRole",
          response.data?.data.yourCurrentRole
        );
        responseFormData.append(
          "CurrentOrganisation",
          response.data?.data.yourCurrentOrg
        );
        responseFormData.append(
          "YearsofExperience",
          response.data?.data.professionalYearsOfExp
        );
        responseFormData.append("Vertical", response.data?.data.vertical);
        responseFormData.append("JoinReason", response.data?.data.joinreason);
        responseFormData.append("ResumeLink", response.data?.data.resumeUrl);
        responseFormData.append(
          "TeachingExperience",
          response.data?.data.teachingExperience
        );
        responseFormData.append(
          "SelectedRole",
          response.data?.data.selectedRole
        );
        responseFormData.append(
          "TeachingExperienceYears",
          response.data?.data.yearsOfExperience || "0"
        );
        responseFormData.append(
          "TeachingExperienceMonths",
          response.data?.data.monthsOfExperience || "0"
        );

        fetch(
          "https://script.google.com/macros/s/AKfycbw47OPZAYIU91Djfz-s9ctK-xvXQhoG15PkjHym13M6my2we7UlqJTxPQioCp9XOc63/exec",
          {
            method: "POST",
            body: responseFormData,
          }
        )
          .then((res) => {
            res.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
        toast.success(response.data.feedback, { position: "top-right" });
        setTimeout(() => {
          setFormSubmit(false);
          window.location.href = "/Career/mentor";
        }, 1000);
      }
    } catch (error) {
      // console.log("Error uploading file:", error.response.data);
      if (error.response.data) {
        toast.error(error.response.data.feedback, { position: "top-right" });
      } else {
        toast.error(
          "Sorry, there seems to be a glitch! Please retry after a moment. Thank you for your patience!",
          { position: "top-right" }
        );
      }
      setTimeout(() => {
        window.location.href = "/Career/mentor";
        setFormSubmit(false);
      }, 1000);
    } finally {
      setFormSubmit(true);
    }
  };

  return (
    <>
      <div className="relative smooth-scroll bg-universal w-full  min-h-screen mentorback flex items-center ">
        <div className="w-[600px] mentorform ml-[70px] max-h-screen min-h-[68vh] sm:overflow-y-scroll md:overflow-visible  md:h-[670px] rounded-[30px] bg-white flex justify-center gap-5 flex-col p-8">
          <div className="w-full md:text-start text-center mb-10">
            <h4 className="text-base  font-medium">
              Apply to Join{" "}
              <span className="text-universal capitalize">
                Our Community of Experts
              </span>
            </h4>
            <h2 className="text-2xl  mt-2 font-semibold capitalize">
              <span className="text-universal">Your Path to Joining </span>Is
              Just a Few Clicks Away.
            </h2>
            <h1 className="text-2xl  mt-2 font-semibold capitalize">
              Get Started Today!
            </h1>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="sm:w-full w-[150px]">
                {stepTitles[currentStep - 1]}{" "}
              </p>
            </div>
            <div className="px-6 py-1 border-2 rounded-md">
              <p className="md:block hidden">Step {currentStep}/5</p>
              <p className="md:hidden block w-full">Step {currentStep}/5</p>
            </div>
          </div>

          {/* Changing Part of the form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              {currentStep === 1 && (
                <div className="mb-4">
                  <div className="flex flex-col  gap-5 justify-between mb-[20px] md:mb-[20px]">
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none  ${
                          errors["fullname"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
 ${errors["fullname"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        type="text"
                        placeholder="Full Name"
                        {...register("fullname", {
                          required: "Full Name is required",
                        })}
                      />
                      {errors.fullname?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.fullname?.message}</p>
                        </div>
                      )}
                    </div>

                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none  ${
                          errors["email"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
 ${errors["email"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        type="text"
                        placeholder="Email"
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
                  </div>

                  <div className="flex flex-col gap-5 justify-between mb-[20px] md:mb-[30px] ">
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none ${
                          errors["phoneNumber"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
  ${errors["phoneNumber"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        type="text"
                        placeholder="Phone Number"
                        {...register("phoneNumber", {
                          required: "Phone Number is required",
                          minLength: {
                            value: 10,
                            message: "Phone Number must be exactly 10 digits",
                          },
                          maxLength: {
                            value: 10,
                            message: "Phone Number must be exactly 10 digits",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Phone Number must contain only digits",
                          },
                        })}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          ))
                        } // Restrict input to numbers only
                      />

                      {errors.phoneNumber?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.phoneNumber?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none ${
                          errors["linkedinProfile"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
  ${
    errors["linkedinProfile"]
      ? "focus:border-rose-500"
      : "focus:border-blue-500"
  }`}
                        type="text"
                        placeholder="LinkedIn Profile"
                        {...register("linkedinProfile", {
                          required: "LinkedIn Profile is required",
                          pattern: {
                            value:
                              /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                            message:
                              "Please enter a valid LinkedIn profile URL",
                          },
                        })}
                      />

                      {errors.linkedinProfile?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.linkedinProfile?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="mb-4">
                  <div className="flex flex-col gap-5 justify-between mb-[20px] md:mb-[20px]">
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none  ${
                          errors["yourCurrentRole"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
                    ${
                      errors["yourCurrentRole"]
                        ? "focus:border-rose-500"
                        : "focus:border-blue-500"
                    }`}
                        type="text"
                        placeholder="Current Role"
                        {...register("yourCurrentRole", {
                          required: "Current Role is required",
                        })}
                      />
                      {errors.yourCurrentRole?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.yourCurrentRole?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none  ${
                          errors["yourCurrentOrg"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
                    ${
                      errors["yourCurrentOrg"]
                        ? "focus:border-rose-500"
                        : "focus:border-blue-500"
                    }`}
                        type="text"
                        placeholder="Current Organization"
                        {...register("yourCurrentOrg", {
                          required: "Current Organization is required",
                        })}
                      />
                      {errors.yourCurrentOrg?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.yourCurrentOrg?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col  gap-5 justify-between mb-[20px] md:mb-[20px]">
                    <div className="md:w-[90%] w-full flex flex-col">
                      <Controller
                        name="vertical"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Vertical is required" }}
                        render={({ field }) => (
                          <Select
                            isClearable
                            placeholder="Choose a vertical"
                            styles={customStyles(errors.vertical)} // Assuming you have customStyles defined for the select styling
                            {...field}
                            options={[
                              {
                                value: "Product Management",
                                label: "Product Management",
                              },
                              { value: "Data Science", label: "Data Science" },
                              {
                                value: "Project Management",
                                label: "Project Management",
                              },
                              {
                                value: "Digital Transformation",
                                label: "Digital Transformation",
                              },
                              { value: "Finance", label: "Finance" },
                            ]}
                          />
                        )}
                      />
                      {errors.vertical?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.vertical?.message}</p>
                        </div>
                      )}
                    </div>
                    <div className="md:w-[90%] w-full flex flex-col">
                      <input
                        className={`border-2 p-2 w-full rounded-md outline-none ${
                          errors["yearsOfExp"]
                            ? "border-rose-500"
                            : "border-neutral-300"
                        } 
  ${errors["yearsOfExp"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        type="number"
                        placeholder="Years of Experience"
                        {...register("yearsOfExp", {
                          required: "Years of Experience is required",
                          min: {
                            value: 0,
                            message: "Experience cannot be less than 0",
                          },
                          // max: {
                          //   value: 10,
                          //   message: "Experience cannot be more than 10 years",
                          // },
                        })}
                      />

                      {errors.yearsOfExp?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.yearsOfExp?.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-4">
                  {roles.map((role) => (
                    <div
                      key={role.value}
                      className={`w-full p-4 bg-white rounded-lg flex flex-col justify-between relative text-left h-full border cursor-pointer hover:shadow-lg transition-shadow duration-300 ${
                        selectedRole === role.value
                          ? "border-blue-500"
                          : "border-neutral-300"
                      }`}
                      onClick={() => handleCardClick(role.value)}
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 text-blue-600 flex-shrink-0">
                          <img
                            src={role.image}
                            alt={role.label}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="ml-3">
                          <h1 className="text-base font-semibold">
                            {role.label}
                          </h1>
                          <span className="text-gray-400 font-medium mt-2 text-[14px]">
                            {role.description}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {selectedRole === "" && (
                    <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>Please select a role</p>
                    </div>
                  )}
                </div>
              )}
              {currentStep === 4 && (
                <div className="mb-4">
                  <div className="flex flex-col mb-[20px]">
                    {/* Previous Teaching Experience */}
                    <div className="flex flex-col ">
                      <div className="flex flex-col justify-between  items-center gap-4">
                        <label className="font-medium w-full text-neutral-700">
                          Previous Online Teaching Experience:
                        </label>
                        <div className="flex w-full items-center gap-10">
                          <Controller
                            name="teachingExperience"
                            control={control}
                            defaultValue=""
                            rules={{
                              required:
                                "Please select your previous online teaching experience",
                            }}
                            render={({ field }) => (
                              <Select
                                className="w-full"
                                isClearable
                                isDisabled={formSubmit}
                                placeholder="Select your previous online teaching experience"
                                styles={customStyles(
                                  !!errors.teachingExperience
                                )} // Pass error state
                                {...field}
                                options={[
                                  { value: "Yes", label: "Yes" },
                                  { value: "No", label: "No" },
                                ]}
                                onChange={(selectedOption) => {
                                  field.onChange(selectedOption);
                                  setShowExperience(
                                    selectedOption?.value === "Yes"
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      {errors.teachingExperience?.message && (
                        <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.teachingExperience?.message}</p>
                        </div>
                      )}
                    </div>

                    {/* Preferred Mentoring Hours */}
                    {showExperience && (
                      <div className="flex flex-col w-full mt-4">
                        <div className="flex flex-col  items-center gap-4">
                          <label className="font-medium w-full text-neutral-700">
                            Years of experince
                          </label>
                          <div className="flex w-full flex-col justify-between gap-4">
                            <div>
                              <Controller
                                name="expInYears"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Please select experience in years",
                                }}
                                render={({ field }) => (
                                  <Select
                                    isClearable
                                    className="w-full"
                                    placeholder="Years"
                                    styles={customStyles(!!errors.expInYears)}
                                    {...field}
                                    options={generateExperinceYears()}
                                  />
                                )}
                              />

                              {errors.expInYears?.message && (
                                <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                                  <span className="mt-[-1px]">
                                    <IoWarning />
                                  </span>
                                  <p>{errors.expInYears?.message}</p>
                                </div>
                              )}
                            </div>
                            <div>
                              <Controller
                                name="expInMonths"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required:
                                    "Please select experience in months",
                                }}
                                render={({ field }) => (
                                  <Select
                                    isClearable
                                    className="w-full"
                                    placeholder="Months"
                                    styles={customStyles(!!errors.expInMonths)}
                                    {...field}
                                    options={generateExperinceMonths()}
                                  />
                                )}
                              />

                              {errors.expInMonths?.message && (
                                <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                                  <span className="mt-[-1px]">
                                    <IoWarning />
                                  </span>
                                  <p>{errors.expInMonths?.message}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <>
                  <div className="flex justify-between w-full">
                    <textarea
                      className={`w-full h-[120px] border-2 rounded-md outline-none p-2 resize-none ${
                        errors.joinreason
                          ? "border-red-500"
                          : "border-neutral-300"
                      }`}
                      disabled={formSubmit}
                      placeholder="Why do you want to join us?"
                      name="joinreason"
                      maxLength={500}
                      {...register("joinreason", {
                        required:
                          "Please give a reason why you want to join us?",
                        minLength: {
                          value: 300,
                          message:
                            "Your reason must be at least 300 characters long",
                        },
                        maxLength: {
                          value: 500,
                          message: "Your reason cannot exceed 500 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.joinreason?.message && (
                    <div className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                      <span className="mt-[-1px]">
                        <IoWarning />
                      </span>
                      <p>{errors.joinreason?.message}</p>
                    </div>
                  )}

                  <div className="mt-4">
                    <label
                      className={`w-full py-2 px-2 flex items-center justify-between cursor-pointer border border-dashed ${
                        fileError
                          ? "border-red-500"
                          : fileName
                          ? "border-green-500"
                          : "border-neutral-400"
                      } rounded-lg mt-2`}
                      htmlFor="resume"
                    >
                      <div className="flex items-center gap-2">
                        {fileName && !fileError ? (
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
                              fill={fileError ? "#ef4444" : "#94A3B8E6"}
                              viewBox="0 0 24 24"
                            >
                              <path d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"></path>
                            </svg>
                          </div>
                        )}
                        <h1
                          className={`text-base ${
                            fileError
                              ? "text-red-500"
                              : fileName
                              ? "text-green-500"
                              : "text-slate-400/90"
                          } font-medium`}
                        >
                          {fileName && !fileError
                            ? "Resume uploaded successfully"
                            : "Upload your resume"}
                        </h1>
                      </div>
                      <div className="">
                        {" "}
                        {/* Ensure the container has a width */}
                        {fileName && !fileError ? (
                          <h4 className="text-base text-slate-400/90 font-medium w-[100px] sm:w-[200px] md:[600px] lg:[600px] truncate">
                            {fileName}
                          </h4>
                        ) : (
                          <h4
                            className={`text-base ${
                              fileError ? "text-red-500" : "text-slate-400/90"
                            } font-medium truncate w-full`}
                          >
                            {fileError || "PDF | Max: 2 MB"}
                          </h4>
                        )}
                      </div>

                      <input
                        {...register("resume")}
                        id="resume"
                        disabled={formSubmit}
                        className="hidden"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <div className="mt-4">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                      onChange={onCaptchChange}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Changing Part ends */}
            <div className="flex justify-end outline-none">
              <button
                type="button"
                className={`p-2 mr-4 border-2 outline-none w-[192px] rounded-md bg-universal text-white ${
                  currentStep === 1 ? "hidden" : ""
                } cursor-pointer`}
                disabled={formSubmit}
                onClick={prevStep}
              >
                Back
              </button>
              {currentStep !== 5 && (
                <button
                  type="button"
                  className={`p-2 border-2 w-[192px] outline-none rounded-md bg-universal text-white
                   cursor-pointer`}
                  onClick={nextStep}
                >
                  Next
                </button>
              )}

              {currentStep === 5 && (
                <>
                  <button
                    type={fileUploaded ? "submit" : "button"}
                    disabled={formSubmit || !captchaVerified}
                    onClick={() => {
                      if (!fileUploaded) {
                        nextStep();
                      }
                    }}
                    className={`p-2 disabled:bg-gray-300  border-2 w-[192px] rounded-md bg-universal outline-none text-white cursor-pointer`}
                  >
                    {formSubmit ? (
                      <CircularProgress
                        size={24}
                        sx={{ color: "white" }} // Set spinner color to white
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="w-1/2 bg-gray-200 h-full hidden"></div>
      </div>
    </>
  );
}

export default MentorForm;
