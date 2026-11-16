import React from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Box } from "@mui/material";
import { IoWarning } from "react-icons/io5";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/reducers/user";
import toast from "react-hot-toast";
import { encodeBase64 } from "../../../helpers/encodeTrackerId";
import { createUser } from "../../../services/auth.service";
import { createApplicationStepTracker } from "../../../services/program.service";
// import SignUpModal from "../../Modals/SignUpModal";

function SignupDrawer({ open, email, handleClose }) {
  const [isOpen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenExp, setTokenexp] = useState("");
  const dispatch = useDispatch();
  const { authType, redirectUrl, category } = useSelector(
    (state) => state.user
  );
  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { firstname: "", lastname: "", contact: "" },
    mode: "onChange",
  });

  const closeSignUpModal = () => {
    reset();
    handleClose();
  };
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

  function openUniversityApp(university, encodedTracker) {
    // Check the current environment
    const isDevelopment = process.env.NODE_ENV === "development";

    // Construct the URL based on the environment
    const url = isDevelopment
      ? `${process.env.NEXT_PUBLIC_PAYMENT_PORTAL_BASE_URL}/?app_id=${encodedTracker}` // Localhost URL for development
      : `https://${Number(category) == 44 ? 'iimv-pgdm' : university}.accredian.com/?app_id=${encodedTracker}`; // Production URL

    // Open the URL in a new browser tab
    window.open(url, "_blank");
  }

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const first_name = data.firstname;
      const mobile = data.contact;
      const last_name = data.lastname;
      console.log(first_name);
      console.log(mobile);
      console.log(last_name);
      console.log(email);
      const payload = {
        email,
        first_name,
        last_name,
        mobile,
        auth_type: "signup",
      };
      const response = await createUser(payload);
      console.log(response);
      if (response) {
        localStorage.setItem("enrollmentStatus", false);
        console.log(response);
        const auth_type = response.auth_type;
        setCookie("token", response.token, 12, "localhost");
        const myDecodedToken = decodeToken(response.token);
        const isMyTokenExpired = isExpired(response.token);
        console.log(myDecodedToken);
        setTokenexp(isMyTokenExpired);
        console.log(myDecodedToken.data.firstname);
        localStorage.setItem("name", myDecodedToken.data.firstname);
        localStorage.setItem("token", response.token);
        toast.success("Account Created Successfully", {
          position: "top-right",
        });
        console.log("User was created");
        const userId = myDecodedToken.data.user_id;
        if (window.clarity && typeof window.clarity === "function") {
          // window.clarity("set", "user_id", userId);
          // window.clarity("set", "app", "website");
          window.clarity("identify", userId);
          window.clarity("set", "uid", userId);
        }
        dispatch(userActions.setAuthenticatedState(true));

        if (category) {
          const universityName = localStorage.getItem("university_shortName");
          const stepTrackerPayload = {
            id: userId,
            category: category,
            universityName: universityName,
          };
          createApplicationStepTracker(stepTrackerPayload)
            .then((response) => {
              // Handle the successful response
              console.log("Step tracker created successfully:", response.data);
              console.log(response);

              const encodedTracker = encodeBase64(response.data);

              setTimeout(() => {
                openUniversityApp(universityName, encodedTracker);
                // window.open(
                //   `https://${universityName}.accredian.com/?app_id=${encodedTracker}`,
                //   "_blank"
                // );
                // handleOTPVerification(auth_type);
                window.location.reload();
                handleClose();
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              setTimeout(() => {
                window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
                // window.open(redirectUrl, "_blank");
                handleClose();
              }, 1000);
            });
        } else {
          setTimeout(() => {
            window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

            handleClose();
          }, 1000);
        }
      }
    } catch (error) {
      console.log("Error occurred:", error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 409) {
          toast.error(
            "The provided email is already linked to an existing account.",
            { position: "top-right" }
          );
          // setLoading(false);
          return;
        } else {
          // toast.error(data.message);
          console.error(`Error ${status}: ${data.message}`);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.log("Error message:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Drawer onClose={loading ? null : handleClose} isOpen={open} size={"full"}>
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
            <div class="font-circular font-normal  relative flex flex-row justify-center items-center outline-none border-none mx-auto">
              <div className=" relative  bg-white flex justify-center items-center rounded-2xl w-full outline-none border-none">
                {/* <div className=" absolute py-2 w-full text-center  flex items-center justify-end top-0 right-2 ">
                  <button
                    className=" w-8 h-8 rounded-lg bg-white flex items-center justify-center cursor-pointer"
                    onClick={closeSignUpModal}
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
                    padding: 4,
                  }}
                >
                  <img
                    src={signUpModalImage}
                    alt="Description"
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Box> */}

                {/* Right Side: Form */}
                <Box
                  sx={{
                    width: "50%",
                    width: {
                      xs: "100%", // 100% width on extra-small screens
                      md: "50%", // 50% width on medium screens and up
                    },
                    paddingLeft: 1,
                    paddingRight: {
                      xs: 1,
                      md: 1,
                    },
                  }}
                >
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

                  <div className="mb-4 text-2xl font-semibold text-paleBlack pb-3 pt-3">
                    <h2>Welcome! Sign up or Login</h2>
                  </div>
                  {/* <div id="modal-description" className="mb-4 text-paleBlack ">
                  <p>
                 
                  </p>
                </div> */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* div 1 */}
                    <div className="mb-4">
                      <input
                        className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
 ${errors["firstname"] ? "border-rose-500" : "border-neutral-300"} 
 ${errors["firstname"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        {...register("firstname", {
                          required: {
                            value: true,
                            message: "Firstname is required",
                          },
                        })}
                        id="firstname"
                        disabled={loading}
                        type="text"
                        placeholder="Firstname (Required)"
                      />
                      {errors.firstname?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.firstname?.message}</p>
                        </div>
                      )}

                      {/* div 2 */}

                      <input
                        className={`w-full px-4 py-3 font-normal text-sm bg-white border-b-2 outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-2 mt-2
 ${errors["lastname"] ? "border-rose-500" : "border-neutral-300"} 
 ${errors["lastname"] ? "focus:border-rose-500" : "focus:border-blue-500"}`}
                        {...register("lastname", {
                          required: {
                            value: true,
                            message: "Lastname is required",
                          },
                        })}
                        id="lastname"
                        type="text"
                        disabled={loading}
                        placeholder="Lastname (Required)"
                      />
                      {errors.lastname?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1 pl-2">
                          <span className="mt-[-1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.lastname?.message}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className={`relative ${errors?.contact?.message ? "mt-2" : "mt-4"
                        }`}
                    >
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
                              borderTop: "none",
                              borderLeft: "none",
                              borderRight: "none",
                              borderBottom: errors.contact
                                ? "2px solid red"
                                : "2px solid rgb(212 212 212)",
                              borderRadius: "0px",
                              padding: "10px",
                              paddingLeft: "55px",
                              outline: "none",
                              fontSize: "0.875rem",
                              lineHeight: "1.25rem",
                            }}
                            specialLabel=""
                            enableSearch={true}
                            disabled={loading}
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

                    <div className="w-full text-[12px] font-base p-2 text-center">
                      <h3 className="">
                        By submitting the form, you agree to our{" "}
                        <Link href="/terms" prefetch={false} className="text-universal">
                          Terms and Conditions
                        </Link>{" "}
                        and our{" "}
                        <Link href="/terms/privacy" prefetch={false} className="text-universal">
                          Privacy Policy
                        </Link>
                        .
                      </h3>
                    </div>
                    <button
                      className={`hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <Spinner size="md" color="white" /> : "Submit"}
                    </button>
                  </form>
                </Box>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SignupDrawer;
