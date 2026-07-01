"use client";

import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  CardMedia,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import Testingnavbar from "../Navbar/testinnav";
import Footer from "../Footer/Footer";
import Link from 'next/link';
import Wrapper from "../Wrapper/HomePageWrapper";

export default function MasterFaq() {
  useEffect(() => {
    document.title = 'Master FAQ | Accredian';
  }, []);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <Wrapper>
        <Box sx={{ pt: 2, display: { xs: "none", lg: "block", md: "none", sm: "none" } }}>
          <Box sx={{}}>
            <Container fied>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "25px",

                  marginBottom: "0.4rem!important",
                }}
              >
                FAQ{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "20px",

                  marginBottom: "0.4rem!important",
                }}
              >
                What are you looking for ?{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",

                  fontSize: "17px",
                }}
              >
                Search for answers to your questions below.{" "}
              </Typography>

              <Grid item lg={12} container sx={{ ml: -5 }}>
                <Grid item lg={4}>
                  <Link
                    href={"/Faqs/program-pre-requisites"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Program-Pre-Requisites.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Program Pre-Requisites{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item lg={4}>
                  <Link
                    href={"/Faqs/admissions"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Admissions.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Admissions{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item lg={4}>
                  <Link href={"/Faqs/program"} style={{ textDecoration: "none" }}>
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Programs.webp"
                        alt="Goole"
                        sx={{ width: "195px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Programs{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item lg={4}>
                  <Link
                    href={"/Faqs/fee-scholarships"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Fee-Scholarships.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2, ml: 3 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Fee & Scholarships{" "}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box sx={{ height: { md: 1120, sm: 780, xs: 1120 }, display: { xs: "block", lg: "none", md: "block", sm: "block" } }}>
          <Box sx={{ mt: 3 }}>
            <Container fied sx={{ pt: { xs: 6, sm: 4, md: 4 } }}>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "25px",
                  mx: 4,
                  marginBottom: "0.4rem!important",
                }}
              >
                FAQ{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "20px",
                  mx: 4,
                  marginBottom: "0.4rem!important",
                }}
              >
                What are you looking for ?{" "}
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",

                  fontSize: "17px",
                  mx: 4,
                }}
              >
                Search for answers to your questions below.{" "}
              </Typography>

              <Grid item lg={12} container>
                <Grid xs={12} sm={6} md={6}>
                  <Link
                    href={"/Faqs/program-pre-requisites"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/output-onlinepngtools-2.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Program Pre-Requisites{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                  <Link
                    href={"/Faqs/admissions"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Admissions{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                  <Link href={"/Faqs/program"} style={{ textDecoration: "none" }}>
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq-2.webp"
                        alt="Goole"
                        sx={{ width: "195px", pt: 3, pb: 2 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Programs{" "}
                    </Typography>
                  </Link>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                  <Link
                    href={"/Faqs/fee-scholarships"}
                    style={{ textDecoration: "none" }}
                  >
                    <center>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq-3.webp"
                        alt="Goole"
                        sx={{ width: "149px", pt: 3, pb: 2, ml: 3 }}
                      />
                    </center>
                    <Typography
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "20px",
                        textAlign: "center",
                        marginBottom: "0.4rem!important",
                      }}
                    >
                      Fee & Scholarships{" "}
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
}
