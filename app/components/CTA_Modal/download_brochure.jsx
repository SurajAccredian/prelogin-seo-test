"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "react-phone-input-2/lib/material.css";
import {
  Grid,
  Typography,
  Button,
  Box,
  CardMedia,
  Backdrop,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams, usePathname } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./phone-input.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "433px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const Brochure = (props) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  var ctapage = pathname === "/" ? "homepage" : pathname.replace("/", "");
  var utm_source = searchParams.get("utm_source") == null ? "null" : searchParams.get("utm_source");
  var utm_medium = searchParams.get("utm_medium") == null ? "null" : searchParams.get("utm_medium");
  
  const campaign_name = props?.campaign_name !== undefined ? props.campaign_name : null;

  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState("");
  const [cta, setCta] = useState({
    mobile: "",
    name: "",
    newemail: "",
    ctapage: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
  });

  const onCaptchChange = (value) => {
    setCaptchaVerified(true);
    setIsButtonVisible(true);
  };

  const ctahandleChange = (e) => {
    setCta({ ...cta, [e.target.name]: e.target.value });
  };
  const LoaderClose = () => {
    setLoader(false);
  };
  const LoaderOpen = () => {
    setLoader(true);
  };
  const submitForm = (e) => {
    e.preventDefault();
    if (number.length > 2) {
      LoaderOpen();
      const sendRcbctaData = {
        phone: number,
        name: cta.name,
        email: cta.newemail,
        program: props.program,
        source: props.source,
        page: ctapage,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: campaign_name,
        form_id: "brochure",
        type: "CTA",
      };
      
      const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD || process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD;
      
      axios
        .post(
          `${endpoint}/common_publish/commonPublish`,
          JSON.stringify(sendRcbctaData),
          options
        )
        .then((result) => {
          LoaderClose();
          props.handleClose();

          if (result.data.status == "200") {
            Swal.fire({
              title: "Thank You",
              text: "Thank you for downloading the brochure. Our executive will contact you to provide more information about the course!",
              icon: "success",
              confirmButtonText: "OK",
            }).then((conf) => {
              if (conf.isConfirmed) {
                if (window) window.open(props.pdf, "_blank");
              }
            });

            setCta({
              mobile: "",
              name: "",
              newemail: "",
              ctapage: "",
              utm_source: "",
              utm_medium: "",
              utm_campaign: "",
            });
            setNumber("");
            setCaptchaVerified(false);
          } else {
            Swal.fire({
              title: "Oops!",
              text: "We are facing server issue, please try again in sometime.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        });
    } else {
      toast.error("Please enter a valid mobile number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <Box>
          <Grid lg={12} sm={12} md={12} xs={12} container>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={props.handleClose}
            ></BootstrapDialogTitle>
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={loader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid lg={12} sm={12} md={12} xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  image={props.image}
                  alt="Organization Logo"
                  sx={{
                    width: "200px",
                    mx: 3,
                    mb: 2,
                    display: {
                      xs: "none",
                      lg: "block",
                      sm: "block",
                      md: "block",
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid lg={12} sm={12} md={12} xs={12}>
              <Box sx={{ mx: 3, mb: 2 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontSize: "22px",
                    textAlign: "center",
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Your Brochure is Ready
                </Typography>
              </Box>
              <Box sx={{ mx: 3, mb: 3 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontSize: "18px",
                    textAlign: "center",
                    fontFamily: "'Poppins', sans-serif",
                    color: "#344563",
                  }}
                >
                  Fill the form to know about Certificate, Faculty, curriculum
                  and more
                </Typography>
              </Box>
              <Box sx={{ mx: 3 }}>
                <form onSubmit={submitForm}>
                  <Box sx={{ pb: 2 }}>
                    <TextField
                      id="standard-basic-name"
                      label="Name"
                      name="name"
                      onChange={ctahandleChange}
                      value={cta.name}
                      type="text"
                      fullWidth
                      required
                      sx={{ pb: 1 }}
                    />
                    <TextField
                      id="standard-basic-email"
                      label="Email"
                      type="email"
                      name="newemail"
                      onChange={ctahandleChange}
                      value={cta.newemail}
                      fullWidth
                      required
                      sx={{ pb: 1 }}
                    />
                    <PhoneInput
                      inputStyle={{
                        width: "100%",
                      }}
                      enableSearch={true}
                      country={"in"}
                      inputProps={{
                        name: "mobile",
                        required: true,
                        autoFocus: true,
                      }}
                      size="small"
                      placeholder="Enter phone number"
                      value={number}
                      onChange={setNumber}
                    />

                    <div className="pt-3">
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                        onChange={onCaptchChange}
                      />
                    </div>
                  </Box>
                  <Box sx={{ pb: 2 }}>
                    <Button
                      variant="contained"
                      sx={{
                        mb: 2,
                        backgroundColor: "#0039e6",
                        textTransform: "none",
                        p: 1,
                        "&:hover": {
                          mb: 2,
                          backgroundColor: "#0039e6",
                          textTransform: "none",
                          p: 1,
                        },
                      }}
                      disabled={!captchaVerified}
                      fullWidth
                      type="submit"
                    >
                      Download Brochure
                    </Button>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        textAlign: "center",
                        color: "rgb(119, 119, 119)",
                        mx: 1,
                      }}
                    >
                      By submitting the form, you agree to our{" "}
                      <a
                        style={{ color: "rgb(119, 119, 119)" }}
                        rel="noreferrer"
                        target="_blank"
                        href="https://accredian.com/terms"
                      >
                        Terms and Conditions
                      </a>{" "}
                      and our{" "}
                      <a
                        rel="noreferrer"
                        target="_blank"
                        style={{ color: "rgb(119, 119, 119)" }}
                        href="https://accredian.com/terms/privacy"
                      >
                        Privacy Policy.
                      </a>
                    </Typography>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </BootstrapDialog>

      <ToastContainer />
    </>
  );
};
export default Brochure;
