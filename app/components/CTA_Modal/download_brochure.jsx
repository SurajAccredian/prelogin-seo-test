"use client";
import React, { useState, useEffect } from "react";
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
import ReCAPTCHA from "react-google-recaptcha";
import { detectBrowserLocation } from "../../helpers/location.helpers";
import { getStoredUTMData } from "../../helpers/utm.helpers";
import { getFbc, getFbp } from "../../helpers/cookie.helpers";
import { fetchClientIp } from "../../helpers/ip.helpers";
import { getBrochureCta } from "../../services/program.service";

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

const Brochure = (props) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  var ctapage = pathname === "/" ? "homepage" : pathname.replace("/", "");
  const campaign_name = props?.campaign_name !== undefined ? props.campaign_name : null;

  const [loader, setLoader] = useState(false);
  const [number, setNumber] = useState("");
  const [locationStatus, setLocationStatus] = useState("idle"); // 'idle' | 'detecting' | 'detected' | 'fallback'
  const [detectedLocation, setDetectedLocation] = useState({ city: "", state: "", country: "" });
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [userIp, setUserIp] = useState("");

  const [cta, setCta] = useState({
    mobile: "",
    name: "",
    newemail: "",
    city: "",
    state: "",
    country: "",
    fbc_field: "",
    fbp_field: "",
    ip_field: "",
    ctapage: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_adset: "",
    utm_ad: "",
    utm_term: "",
    utm_format: "",
  });

  // Automatically populate first-touch UTM attribution from sessionStorage / URL on open
  useEffect(() => {
    if (props.open) {
      const utmData = getStoredUTMData();
      setCta((prev) => ({
        ...prev,
        utm_source: utmData.utm_source || "",
        utm_medium: utmData.utm_medium || "",
        utm_campaign: utmData.utm_campaign || "",
        utm_content: utmData.utm_content || "",
        utm_adset: utmData.utm_adset || "",
        utm_ad: utmData.utm_ad || "",
        utm_term: utmData.utm_term || "",
        utm_format: utmData.utm_format || "",
        fbc_field: getFbc(),
        fbp_field: getFbp(),
      }));
      fetchClientIp().then((ip) => {
        if (ip) {
          setUserIp(ip);
          setCta((prev) => ({ ...prev, ip_field: ip }));
        }
      });
    }
  }, [props.open]);

  // Automatically request browser geolocation & reverse geocode via OpenStreetMap Nominatim
  useEffect(() => {
    let isMounted = true;
    if (props.open) {
      detectBrowserLocation().then((res) => {
        if (!isMounted) return;
        if (res.success && res.data && (res.data.city || res.data.state || res.data.country)) {
          setLocationStatus("detected");
          setDetectedLocation(res.data);
          setCta((prev) => ({
            ...prev,
            city: res.data.city || "",
            state: res.data.state || "",
            country: res.data.country || "",
          }));
          setShowManualLocation(false);
        } else {
          setLocationStatus("fallback");
          setShowManualLocation(true);
        }
      });
    } else {
      setShowManualLocation(false);
      setDetectedLocation({ city: "", state: "", country: "" });
    }
    return () => {
      isMounted = false;
    };
  }, [props.open]);

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

  const submitForm = async (e) => {
    e.preventDefault();
    if (number.length > 2) {
      LoaderOpen();

      const finalCity = (cta.city || detectedLocation.city || "").trim();
      const finalState = (cta.state || detectedLocation.state || "").trim();
      const finalCountry = (cta.country || detectedLocation.country || "").trim();
      const utmData = getStoredUTMData();

      const sendRcbctaData = {
        phone: number,
        name: cta.name,
        email: cta.newemail,
        city: finalCity,
        state: finalState,
        country: finalCountry,
        fbc_field: cta.fbc_field || getFbc(),
        fbp_field: cta.fbp_field || getFbp(),
        ip_field: userIp || cta.ip_field || "",
        program: props.program,
        source: "Download Brochure",
        page: ctapage,
        utm_source: cta.utm_source || utmData.utm_source || "Direct",
        utm_medium: cta.utm_medium || utmData.utm_medium || "website-organic",
        utm_campaign: cta.utm_campaign || utmData.utm_campaign || "",
        utm_content: cta.utm_content || utmData.utm_content || "",
        utm_adset: cta.utm_adset || utmData.utm_adset || "",
        utm_ad: cta.utm_ad || utmData.utm_ad || "",
        utm_term: cta.utm_term || utmData.utm_term || "",
        utm_format: cta.utm_format || utmData.utm_format || "",
        campaign_name,
        form_id: "brochure",
        type: "CTA",
      };
      
      try {
        const result = await getBrochureCta(sendRcbctaData);
        LoaderClose();
        props.handleClose();

        if (result?.data?.status == "200" || result?.status === 200) {
          Swal.fire({
            title: "Thank You",
            text: "Thank you for downloading the brochure. Our executive will contact you to provide more information about the course!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((conf) => {
            if (conf.isConfirmed) {
              if (props.pdf) window.open(props.pdf, "_blank");
            }
          });

          setCta({
            mobile: "",
            name: "",
            newemail: "",
            city: "",
            state: "",
            country: "",
            fbc_field: "",
            fbp_field: "",
            ip_field: "",
            ctapage: "",
            utm_source: "",
            utm_medium: "",
            utm_campaign: "",
            utm_content: "",
            utm_adset: "",
            utm_ad: "",
            utm_term: "",
            utm_format: "",
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
      } catch (err) {
        LoaderClose();
        console.error("Brochure submission error:", err);
        Swal.fire({
          title: "Oops!",
          text: "We are facing server issue, please try again in sometime.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
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
                  <input type="hidden" id="fbc_field" name="fbc_field" value={cta.fbc_field || ""} />
                  <input type="hidden" id="fbp_field" name="fbp_field" value={cta.fbp_field || ""} />
                  <input type="hidden" id="ip_field" name="ip_field" value={cta.ip_field || ""} />
                  <input type="hidden" id="utm_source" name="utm_source" value={cta.utm_source || ""} />
                  <input type="hidden" id="utm_medium" name="utm_medium" value={cta.utm_medium || ""} />
                  <input type="hidden" id="utm_campaign" name="utm_campaign" value={cta.utm_campaign || ""} />
                  <input type="hidden" id="utm_content" name="utm_content" value={cta.utm_content || ""} />
                  <input type="hidden" id="utm_adset" name="utm_adset" value={cta.utm_adset || ""} />
                  <input type="hidden" id="utm_ad" name="utm_ad" value={cta.utm_ad || ""} />
                  <input type="hidden" id="utm_term" name="utm_term" value={cta.utm_term || ""} />
                  <input type="hidden" id="utm_format" name="utm_format" value={cta.utm_format || ""} />
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

                    {/* Location Capture: Auto-detected or Manual fallback */}
                    {locationStatus === "detected" && !showManualLocation && (
                      <Box sx={{ mt: 1.5, mb: 1, p: 1.5, bgcolor: "#f0f7ff", borderRadius: 1.5, border: "1px solid #cce3ff" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "12px", color: "#1e3a8a", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            📍 {[detectedLocation.city, detectedLocation.state, detectedLocation.country].filter(Boolean).join(", ")}
                          </Typography>
                          <Typography
                            component="span"
                            onClick={() => setShowManualLocation(true)}
                            sx={{ fontSize: "12px", color: "#0039e6", cursor: "pointer", textDecoration: "underline", ml: 1, whiteSpace: "nowrap" }}
                          >
                            Edit
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "10px", color: "#888", mt: 0.5 }}>
                          Location data © OpenStreetMap contributors
                        </Typography>
                      </Box>
                    )}

                    {(showManualLocation || locationStatus === "fallback") && (
                      <Box sx={{ mt: 1.5, mb: 1, pt: 1, borderTop: "1px solid #eee" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                          <Typography sx={{ fontSize: "12px", fontWeight: 500, color: "#555" }}>
                            Location Details
                          </Typography>
                          {locationStatus === "detected" && (
                            <Typography
                              component="span"
                              onClick={() => setShowManualLocation(false)}
                              sx={{ fontSize: "11px", color: "#0039e6", cursor: "pointer", textDecoration: "underline" }}
                            >
                              Use auto-detected
                            </Typography>
                          )}
                        </Box>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <TextField
                              id="standard-basic-city"
                              label="City *"
                              name="city"
                              size="small"
                              onChange={ctahandleChange}
                              value={cta.city}
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="standard-basic-state"
                              label="State *"
                              name="state"
                              size="small"
                              onChange={ctahandleChange}
                              value={cta.state}
                              fullWidth
                              required
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="standard-basic-country"
                              label="Country *"
                              name="country"
                              size="small"
                              onChange={ctahandleChange}
                              value={cta.country}
                              fullWidth
                              required
                            />
                          </Grid>
                        </Grid>
                        <Typography sx={{ fontSize: "10px", color: "#888", mt: 0.5 }}>
                          Location data © OpenStreetMap contributors
                        </Typography>
                      </Box>
                    )}

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