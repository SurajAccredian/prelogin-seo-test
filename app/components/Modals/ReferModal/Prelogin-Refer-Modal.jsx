"use client";
import {
  Backdrop,
  CircularProgress,
  Dialog,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import Swal from "sweetalert2";
import ClearIcon from "@mui/icons-material/Clear";
import toast, { Toaster } from "react-hot-toast";
// import { VERTICALS } from "../../../Assets/constants/constants";
import programs from "../../Assets/programs.json";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { decodeToken } from "react-jwt";
import { groupProgramsByCategory } from "../../../helpers/common.helpers";
import { Controller, useForm, useWatch } from "react-hook-form";
import { IoWarning } from "react-icons/io5";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useSearchParams } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      overflowX: "auto",
    },
  },
};

//Stepper design
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1A73E8",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#1A73E8",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#1A73E8",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#1A73E8",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed } = props;
  return (
    <QontoStepIconRoot ownerState={{ active }}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}
//end of stepper design

const InputPropsDesign = {
  sx: {
    fontSize: "14px",
    padding: "4px",
  },
};

//CSS for form fields
const responsiveStyle = {
  marginBottom: "20px",
  fontSize: "14px",
  "@media (max-width:480px)": {
    fontSize: "12px",
    padding: "0",
    marginBottom: "14px",
  },
};

const ReferModalContent = ({ open, setOpen }) => {
  const searchParams = useSearchParams();
  const myParam = searchParams ? searchParams.get("utm_source") : null;

  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // console.log(programs[0].program_name)
  const [userData, setUserData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  //useForm for validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm({
    defaultValues: {
      friendname: "",
      friendemail: "",
      friendnumber: "",
      vertical: "",
      programname: "",
      username: "",
      useremail: "",
      userphone: "",
    },
    mode: "onChange",
  });

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  //watch for selected vertical
  const selectedVertical = useWatch({ name: "vertical", control });

  const handleCloseref = () => {
    setOpen(false);
    reset();
    setActiveStep(0);
  };
  const LoaderOpen = () => {
    setLoaderOpen(true);
  };
  const LoaderClose = () => {
    setLoaderOpen(false);
  };

  //Filtering the program belongs to same vertical
  const filteredPrograms = programs.filter(
    (program) =>
      program.category.toLowerCase() == selectedVertical.toLowerCase()
  );

  //Fetching all verticals
  const VERTICALS = Object.keys(groupProgramsByCategory(programs));

  // Extracting user information from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token does not exist");
    } else {
      try {
        // Decode the token to get user data
        const decodedToken = decodeToken(token);

        // Check if the decoded token contains user data
        if (decodedToken?.data) {
          setUserData(decodedToken.data);
        } else {
          console.error("Token is invalid");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleSubmitRef = async (data) => {
    LoaderOpen();

    if (activeStep < formSteps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      LoaderClose();
      return;
    }

    //Request object to send data to refer and earn API
    const request = {
      useremail: data.useremail,
      username: data.username,
      mobile: data.userphone,
      user_program_id: userData?.program_id,
      batch_id: userData?.batch_id,
      friend_name: data.friendname,
      friend_email: data.friendemail,
      friend_mobile: data.friendnumber,
      friend_vertical: data.vertical,
      friend_program: data.programname,
      lead_source: myParam ? myParam : "Website",
    };
    // return console.log(request)

    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD || process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/prelogin_referandearn/refer`,
        // `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_LOCAL}/prelogin_referandearn/refer`,
        request,
        options
      );
      // console.log(data);
      Swal.fire({
        title: "Thank You!",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`${error.response.data.feedback}`);
      } else {
        toast.error(
          `Apologies, we are currently experiencing some server issues. Please try again later.`
        );
      }
    } finally {
      LoaderClose();
      handleCloseref();
    }
  };

  //function to navigate to previous form state
  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep > 0 ? prevActiveStep - 1 : prevActiveStep;
    });
  };

  //form steps
  const formSteps = ["Friend's details", "Refer now"];

  return (
    <Dialog
      open={open}
      onClose={handleCloseref}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: ".75rem",
        },
      }}
      sx={{
        padding: "0px",
      }}
      className="refer-modal"
    >
      <DialogContent sx={{ padding: "0px" }}>
        <div className="flex">
          <div className="left-img-sec w-1/2 hidden md:flex items-center justify-center bg-universal">
            <div className="img-container-refer-modal w-full overflow-hidden">
              <img
                src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/refer-modal-bg.svg"
                alt="Refer your friend"
                className="max-w-[550px] w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="right-form-sec px-4 md:px-4 lg:px-4 w-full md:w-1/2 flex items-center justify-center py-5 md:py-5 lg:py-10">
            <div className="flex w-full gap-2 flex-col items-center">
              {/* close button and back button */}
              <div
                className={`w-full flex ${activeStep === 1 ? "justify-between" : "justify-end"
                  } px-0 lg:px-0 m-[-10px] ${activeStep === 1 ? "lg:mt-[-25px]" : "lg:m-[-25px]"
                  } `}
              >
                {activeStep === 1 && (
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textTransform: "capitalize",
                    }}
                    onClick={handleBack}
                  >
                    <ArrowBackIosIcon sx={{ fontSize: "16px" }} />
                    Back
                  </Button>
                )}

                <div className="w-max hover:bg-gray-100 p-2 rounded-full">
                  <ClearIcon
                    className="cursor-pointer"
                    onClick={handleCloseref}
                  />
                </div>
              </div>
              <p className="text-2xl md:text-2xl font-semibold font-circular">
                Refer your <span className="text-universal ">friend!</span>
              </p>

              {/* Form Stepper */}
              <Box sx={{ width: "100%", paddingTop: 0, mb: { xs: 3, md: 2 } }}>
                <Stepper
                  activeStep={activeStep}
                  connector={<QontoConnector />}
                  alternativeLabel
                  sx={{ flexDirection: "row", alignItems: "flex-start" }}
                >
                  {formSteps.map((label) => (
                    <Step key={label}>
                      <StepLabel
                        StepIconComponent={QontoStepIcon}
                        sx={{
                          flexDirection: "column",
                          alignItems: "center",
                          "& .MuiStepLabel-label": {
                            marginTop: "0px!important",
                          },
                        }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Right side form */}
              <form
                onSubmit={handleSubmit(handleSubmitRef)}
                className="w-full py-1"
              >
                {/* step - 1 - friend's details */}
                {activeStep === 0 && (
                  <>
                    <Box mb={3} sx={responsiveStyle}>
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter friend's name"
                        name="friendname"
                        size="small"
                        InputProps={InputPropsDesign}
                        {...register("friendname", {
                          required: {
                            value: true,
                            message: "Please enter your friend's name",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name can only contain letters",
                          },
                        })}
                      // required
                      />
                      {errors.friendname && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.friendname.message}</p>
                        </div>
                      )}
                    </Box>
                    <Box mb={3} sx={responsiveStyle}>
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter friend's email"
                        name="friendemail"
                        size="small"
                        InputProps={InputPropsDesign}
                        {...register("friendemail", {
                          required: {
                            value: true,
                            message: "Email cannot be empty",
                          },
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        type="email"
                      // required
                      />
                      {errors.friendemail && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.friendemail.message}</p>
                        </div>
                      )}
                    </Box>
                    <Box
                      mb={3}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      sx={responsiveStyle}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Friend's phone number"
                        name="friendnumber"
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                mb: 0.4,
                                "& .MuiTypography-root": { fontSize: "14px" },
                              }}
                            >
                              +91
                            </InputAdornment>
                          ),
                          sx: {
                            fontSize: "14px",
                            padding: "4px",
                          },
                        }}
                        {...register("friendnumber", {
                          required: {
                            value: true,
                            message: "Please enter your friend's number",
                          },
                        })}
                        type="number"
                      // required
                      />
                      {errors.friendnumber && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.friendnumber.message}</p>
                        </div>
                      )}
                    </Box>
                    <Box mb={3} sx={responsiveStyle}>
                      <FormControl fullWidth variant="standard">
                        <Controller
                          name="vertical"
                          control={control}
                          rules={{ required: "Please select vertical" }}
                          render={({ field }) => (
                            <Select
                              labelId="vertical-label"
                              id="vertical"
                              {...field}
                              label="Select vertical"
                              placeholder="Select vertical"
                              MenuProps={MenuProps}
                              size="small"
                              displayEmpty
                              sx={{
                                textTransform: "capitalize",
                                padding: "4px",
                                fontSize: "14px",
                              }}
                              renderValue={(selected) => {
                                if (!selected) {
                                  return (
                                    <span style={{ color: "#9e9e9e" }}>
                                      Select vertical
                                    </span>
                                  );
                                }
                                return (
                                  <span style={{ fontSize: "14px" }}>
                                    {selected}
                                  </span>
                                );
                              }}
                            >
                              <MenuItem
                                value=""
                                disabled
                                sx={{ fontSize: "14px" }}
                              >
                                select vertical
                              </MenuItem>
                              {VERTICALS.map((vertical, index) => (
                                <MenuItem
                                  key={index}
                                  value={vertical}
                                  sx={{
                                    textTransform: "capitalize",
                                    fontSize: "14px",
                                  }}
                                >
                                  {vertical}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                      {errors.vertical?.message && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.vertical.message}</p>
                        </div>
                      )}
                    </Box>
                    {/* If vertical is selected then show program dropdown */}
                    {selectedVertical && (
                      <Box mb={3} sx={responsiveStyle}>
                        <FormControl fullWidth variant="standard">
                          <Controller
                            name="programname"
                            control={control}
                            rules={{ required: "Please select program name" }}
                            render={({ field }) => (
                              <Select
                                labelId="program-label"
                                id="program"
                                {...field}
                                placeholder="Select Program"
                                MenuProps={MenuProps}
                                size="small"
                                sx={{ padding: "4px" }}
                                displayEmpty
                                renderValue={(selected) => {
                                  if (!selected) {
                                    return (
                                      <span style={{ color: "#9e9e9e" }}>
                                        Select program
                                      </span>
                                    );
                                  }
                                  return (
                                    <span style={{ fontSize: "14px" }}>
                                      {selected}
                                    </span>
                                  );
                                }}
                              >
                                <MenuItem disabled sx={{ fontSize: "14px" }}>
                                  select programs
                                </MenuItem>
                                {filteredPrograms.map((program, index) => (
                                  <MenuItem
                                    key={index}
                                    value={program.program_name}
                                    sx={{
                                      maxWidth: "100%",
                                      overflow: "hidden",
                                      wordBreak: "break-word",
                                      whiteSpace: "normal",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {program.program_name}
                                  </MenuItem>
                                ))}
                              </Select>
                            )}
                          />
                        </FormControl>
                        {errors.programname?.message && (
                          <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                            <span className="mt-[1px]">
                              <IoWarning />
                            </span>
                            <p>{errors.programname.message}</p>
                          </div>
                        )}
                      </Box>
                    )}
                    <button
                      className="disabled:py-6 disabled:bg-transparent hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md"
                      onClick={handleSubmit(handleSubmitRef)}
                    >
                      Next
                    </button>
                  </>
                )}

                {/* step - 2 - personal details */}
                {activeStep === 1 && (
                  <>
                    <Box mb={3} sx={responsiveStyle}>
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter your name"
                        name="username"
                        InputProps={InputPropsDesign}
                        {...register("username", {
                          required: {
                            value: true,
                            message: "Please enter your your name",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name can only contain letters",
                          },
                        })}
                      // required
                      />
                      {errors.username && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.username.message}</p>
                        </div>
                      )}
                    </Box>
                    <Box mb={3} sx={responsiveStyle}>
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter your email"
                        name="useremail"
                        InputProps={InputPropsDesign}
                        {...register("useremail", {
                          required: {
                            value: true,
                            message: "Email cannot be empty",
                          },
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "Please enter a valid email",
                          },
                        })}
                        type="email"
                      // required
                      />
                      {errors.useremail && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.useremail.message}</p>
                        </div>
                      )}
                    </Box>
                    <Box
                      mb={3}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      sx={responsiveStyle}
                    >
                      <TextField
                        fullWidth
                        variant="standard"
                        placeholder="Enter your phone number"
                        name="userphone"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{
                                "& .MuiTypography-root": { fontSize: "14px" },
                              }}
                            >
                              +91
                            </InputAdornment>
                          ),
                          sx: {
                            fontSize: "14px",
                            padding: "4px",
                          },
                        }}
                        {...register("userphone", {
                          required: {
                            value: true,
                            message: "Please enter your friend's number",
                          },
                        })}
                        type="number"
                      // required
                      />
                      {errors.userphone && (
                        <div className="text-red-500 text-xs w-full font-medium flex items-center gap-1 mt-1">
                          <span className="mt-[1px]">
                            <IoWarning />
                          </span>
                          <p>{errors.userphone.message}</p>
                        </div>
                      )}
                    </Box>

                    <div className="pt-3">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                        onChange={onCaptchChange}
                      />
                    </div>

                    <Box display="flex" justifyContent="center">
                      <button
                        className={`disabled:bg-gray-400 hover:bg-darkBlue text-base relative mt-6 px-4 py-2 bg-universal font-medium text-white w-full flex justify-center rounded-lg drop-shadow-md`}
                        disabled={!isValid || !captchaVerified}
                        onClick={handleSubmit(handleSubmitRef)}
                      >
                        Refer Now
                      </button>
                    </Box>
                  </>
                )}
              </form>
            </div>
          </div>
          <Toaster position="top-right" />
        </div>
      </DialogContent>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loaderOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Dialog>
  );
};

export default function ReferModal({ open, setOpen }) {
  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <ReferModalContent open={open} setOpen={setOpen} />
    </Suspense>
  );
}
