"use client";
import React, { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Backdrop,
} from "@mui/material";
import { useRouter, useParams } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../Footer/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import Testingnavbar from "../Navbar/testinnav";

const Resetpassword = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [messagecolor, setMessagecolor] = useState("");
  const [npassword, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const LoaderClose = () => setOpen(false);
  const LoaderOpen = () => setOpen(true);

  // Note: pass/conPass are temporary refs within the handler (same logic as CRA source)
  var pass, conPass;

  const fetchVal = (e) => {
    if (e.target.id === "password") {
      pass = e.target.value;
      comparePassword(pass, conPass);
    }
    if (e.target.id === "confirmPassword") {
      conPass = e.target.value;
      comparePassword(pass, conPass);
    }
  };

  const comparePassword = (pass, conPass) => {
    if (pass === "" && conPass === "") {
      setBtnDisabled(true);
      setMessage("");
    } else if (pass === conPass) {
      setBtnDisabled(false);
      setMessage("New Password and Confirm Password are matched");
      setMessagecolor("#248f24");
      setPassword(pass);
    } else {
      setBtnDisabled(true);
      setMessage("New Password and Confirm Password are not matched");
      setMessagecolor("#ff6666");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    if (npassword === "Dataleader@123") {
      setMessage(
        "For security reasons, this password is not allowed. Please choose a different password."
      );
      setMessagecolor("#ff6666");
      LoaderClose();
      return;
    }

    const sandData = {
      // atob is available globally in browser (this is a "use client" component)
      user_id: atob(id),
      password: CryptoJS.AES.encrypt(
        npassword,
        "ACCREDIAN@login$2022@$newweb$@"
      ).toString(),
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/change-password`,
        JSON.stringify(sandData),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.status == 200) {
        await Swal.fire({
          title: "Success",
          text: "Your password has been changed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((conf) => {
          if (conf.isConfirmed) {
            localStorage.clear();
            router.push("/Login");
          }
        });
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
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    marginBottom: "1rem!important",
                    px: 3,
                  }}
                >
                  Reset Password
                </Typography>

                <Box sx={{ px: 2 }}>
                  <form onSubmit={submitForm}>
                    <TextField
                      id="password"
                      label="New Password"
                      fullWidth
                      sx={{ pr: 3, mb: 3 }}
                      name="password"
                      type="password"
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={fetchVal}
                    />

                    <TextField
                      id="confirmPassword"
                      label="Confirm New Password"
                      fullWidth
                      sx={{ pr: 3, mb: 3 }}
                      name="confirmPassword"
                      type="password"
                      required
                      InputLabelProps={{ shrink: true }}
                      onChange={fetchVal}
                    />

                    <Typography
                      color={messagecolor}
                      sx={{ fontSize: "0.8rem", fontWeight: "bold", mb: 2 }}
                    >
                      {message}
                    </Typography>

                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        mb: 0.3,
                        mr: 3,
                        background: "#009ef7",
                        borderRadius: "8px",
                        textTransform: "none",
                        "&:hover": {
                          background: "#009ef7",
                          borderRadius: "8px",
                        },
                      }}
                      id="submit-button"
                      disabled={btnDisabled}
                    >
                      Save changes
                    </Button>
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
    </>
  );
};

export default Resetpassword;
