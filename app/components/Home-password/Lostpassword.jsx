"use client";
import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Container,
  TextField,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Testingnavbar from "../Navbar/testinnav";
import Footer from "../Footer/Footer";

const Lostpassword = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const LoaderClose = () => setOpen(false);
  const LoaderOpen = () => setOpen(true);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    const sandData = { email };

    try {
      const result = await axios.post(
        `http://localhost:5001/password/forgot-password`,
        JSON.stringify(sandData),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.status == 200) {
        toast.success(
          "We have received your password reset request. Please check your email for further instructions.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
        e.target.reset();
        setEmail("");
      } else if (result.data.status === "404") {
        toast.warn(
          "Email not found. Please ensure you entered the correct email address or sign up for an account.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
        e.target.reset();
        setEmail("");
      } else {
        toast.error(
          "Apologies for any inconvenience. Our system is experiencing high demand, causing delays. Please retry later. Your patience is appreciated.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          }
        );
      }
    } finally {
      LoaderClose();
    }
  };

  return (
    <>
      <Testingnavbar />
      <Box sx={{ pt: 15, pb: 5 }}>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item lg={4} sx={{ pb: 4 }}>
              <Box
                sx={{
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  p: 3,
                }}
              >
                <Box>
                  <Typography
                    component="h1"
                    mb={2}
                    fontWeight="bold"
                    fontSize={25}
                    sx={{ textAlign: "center" }}
                  >
                    Lost your password?
                  </Typography>
                  <Typography mb={2} fontSize={15}>
                    Please enter your username or email address. You will
                    receive a link to create a new password via email.
                  </Typography>
                  <form onSubmit={submitForm}>
                    <Box mb={2}>
                      <TextField
                        required
                        id="email"
                        label="Email"
                        variant="standard"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={email}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </Box>
                    <Box>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ textTransform: "none" }}
                      >
                        Reset password
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer />
    </>
  );
};

export default Lostpassword;
