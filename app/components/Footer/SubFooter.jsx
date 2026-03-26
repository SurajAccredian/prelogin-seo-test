"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

import "./Footer.css";

export default function SubFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 900 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 900) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };
  return (
    <>
      <Box sx={{ display: "none" }}>
        {isVisible && (
          <Box
            sx={{
              background: "#F9E3C3",
              height: "80px",
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Container fixed>
              <Grid container item lg={12} sx={{ mx: 3 }}>
                <Grid lg={1} sx={{ my: "auto" }}>
                  <CancelOutlinedIcon onClick={handleClose} />
                </Grid>
                <Grid lg={2}>
                  <CardMedia
                    component="img"
                    image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/home-page-images/manv.webp"
                    alt="green iguana"
                    sx={{
                      width: "172px",

                      objectFit: "contain",
                      mt: -8,
                    }}
                  />
                </Grid>
                <Grid lg={4} sx={{ my: 2 }}>
                  <Typography
                    sx={{
                      color: "#00",
                      textDecoration: "none",
                      marginBottom: "0rem!important",
                      fontWeight: "bold",
                      fontSize: "23px",
                    }}
                  >
                    Want to get 100% Job Guarantee?
                  </Typography>
                  <Typography
                    sx={{
                      color: "#00",
                      textDecoration: "none",
                      marginBottom: "0.2rem!important",
                      fontSize: "13px",
                    }}
                  >
                    Talk to our experts to select India's only Job guarantee
                    program.
                  </Typography>
                </Grid>
                <Grid lg={3} sx={{ my: 3, ml: 3 }}>
                  <Button
                    sx={{
                      background: "#D63A3A",
                      textTransform: "capitalize",
                      width: "186px",
                      borderRadius: "7px",
                      p: 1,
                      fontSize: "15px",
                    }}
                    variant="contained"
                  >
                    Book your call
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
}
