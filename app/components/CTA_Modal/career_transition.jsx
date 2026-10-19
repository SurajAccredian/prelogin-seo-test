"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/material.css";
import {
  Grid,
  Typography,
  Button,
  Box,
  CardMedia,
  Backdrop,
  MenuItem,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { usePathname, useSearchParams } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const RcbDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "733px",
  },
}));

function RcbDialogTitle(props) {
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

const dropdown = [
  { value: "Data Science", label: "Data Science" },
  { value: "Product Management", label: "Product Management" },
  { value: "General Management", label: "General Management" },
  { value: "Digital Transformation", label: "Digital Transformation" },
  { value: "Business Management", label: "Business Management" },
  { value: "Project Management", label: "Project Management" },
  { value: "strategic management", label: "strategic management" },
  { value: "Senior Management", label: "Senior Management" },
  { value: "Finance", label: "Finance" },
];

const CareerTransitionContent = (props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [program, setProgram] = useState("");

  const handleChange = (event) => {
    setProgram(event.target.value);
  };

  const LoaderClose = () => setOpen(false);
  const LoaderOpen = () => setOpen(true);

  const [rcb, setRcb] = useState({
    mobile: "",
    name: "",
    newemail: "",
    program: "",
  });

  const rcbhandleChange = (e) => {
    setRcb({ ...rcb, [e.target.name]: e.target.value });
  };

  const options = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const ctapage = pathname ? pathname.replace("/", "") : "";
  const utm_source = searchParams?.get("utm_source") || "null";
  const utm_medium = searchParams?.get("utm_medium") || "null";
  const utm_campaign = searchParams?.get("utm_campaign") || "null";

  const submitForm = (e) => {
    e.preventDefault();
    if (number && number.length > 2) {
      LoaderOpen();
      const sendRcbctaData = {
        phone: number,
        name: rcb.name,
        email: rcb.newemail,
        program: props.program ? props.program : program,
        source: "career transition",
        page: ctapage,
        utm_source,
        utm_medium,
        utm_campaign,
        form_id: "career_transition",
        type: "CTA",
      };

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/common_publish/commonPublish`,
          JSON.stringify(sendRcbctaData),
          options
        )
        .then((result) => {
          LoaderClose();
          if (props.handleClose) props.handleClose();

          if (result.data.status === "200" || result.data.status === 200) {
            Swal.fire({
              title: "Thank You",
              text: "Thank you for downloading the career handbook. Our executive will contact you to provide more information about the course!",
              icon: "success",
              confirmButtonText: "OK",
            }).then((conf) => {
              if (conf.isConfirmed) {
                window.open(
                  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/PDF/Career-Handbook.pdf",
                  "_blank"
                );
              }
            });
            setRcb({ mobile: "", name: "", newemail: "", program: "" });
            setNumber("");
            setProgram("");
          } else {
            Swal.fire({
              title: "Oops!",
              text: "We are facing server issue, please try again in sometime.",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        })
        .catch(() => {
          LoaderClose();
          Swal.fire({
            title: "Error",
            text: "Request failed. Please try again later.",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } else {
      toast.error("Please enter a valid mobile number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <RcbDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <RcbDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
        />
        <Box>
          {/* ✅ MUI v7: no `item` prop, use size={{ }} instead of xs/sm/md/lg */}
          <Grid container alignItems="center">

            {/* Image column — hidden on mobile */}
            <Grid
              size={{ lg: 5, md: 5, sm: 5, xs: 12 }}
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <Box sx={{ mx: 2 }}>
                <CardMedia
                  component="img"
                  image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/cta.png"
                  alt="CTA Image"
                  sx={{
                    width: "300px",
                    height: "350px",
                    boxShadow: "8px 8px #d6d6d6",
                    mt: 3,
                  }}
                />
              </Box>
            </Grid>

            {/* Form column — full width on mobile, 7 cols on sm+ */}
            <Grid size={{ lg: 7, md: 7, sm: 7, xs: 12 }}>
              <Box sx={{ px: { xs: 2, sm: 3 } }}>

                <Box sx={{ mb: 2 }}>
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
                    Download Handbook
                  </Typography>
                </Box>

                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Box sx={{ mb: 3 }}>
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
                    Fill in the below details to receive your copy
                  </Typography>
                </Box>

                <form onSubmit={submitForm}>
                  {/* ✅ All fields use width="100%" — parent px handles spacing */}
                  <TextField
                    id="name"
                    label="Name"
                    sx={{ pb: 1, width: "100%" }}
                    onChange={rcbhandleChange}
                    value={rcb.name}
                    type="text"
                    name="name"
                    required
                  />

                  <TextField
                    id="newemail"
                    label="Email"
                    sx={{ pb: 1, width: "100%" }}
                    type="email"
                    name="newemail"
                    onChange={rcbhandleChange}
                    value={rcb.newemail}
                    required
                  />

                  {/* ✅ PhoneInput: width 100% on both container and input */}
                  <PhoneInput
                    containerClass="career"
                    containerStyle={{ width: "100%" }}
                    inputStyle={{ width: "100%" }}
                    enableSearch={true}
                    country={"in"}
                    inputProps={{
                      name: "mobile",
                      required: true,
                    }}
                    placeholder="Enter phone number"
                    value={number}
                    onChange={setNumber}
                  />

                  {!props.program && (
                    <TextField
                      id="program"
                      select
                      value={program}
                      onChange={handleChange}
                      sx={{ mt: 1, width: "100%" }}
                      name="program"
                      label="Select the vertical"
                      required
                    >
                      {dropdown.map((ct) => (
                        <MenuItem
                          sx={{ height: "30px", p: 2 }}
                          key={ct.value}
                          value={ct.value}
                        >
                          {ct.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <Box textAlign="center">
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        mb: 2,
                        mt: 2,
                        backgroundColor: "#0039e6",
                        textTransform: "none",
                        p: 1,
                        width: "100%",
                        "&:hover": {
                          backgroundColor: "#002bb3",
                        },
                      }}
                    >
                      Download
                    </Button>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      color: "#858e9f",
                    }}
                  >
                    Note: You will receive a call between Mon-Fri from 10am - 6pm.
                  </Typography>
                </form>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </RcbDialog>
      <ToastContainer />
    </>
  );
};

export default function CareerTransition(props) {
  return (
    <React.Suspense fallback={null}>
      <CareerTransitionContent {...props} />
    </React.Suspense>
  );
}