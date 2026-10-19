"use client"
import React, { useEffect, useRef } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  CardMedia,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Testingnavbar from "../Navbar/testinnav";
import Footer from "../Footer/Footer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "react-phone-input-2/lib/material.css";
import "./Careers.css"
import Form from "./Form";

const theme = createTheme()

export default function Career() {
  useEffect(() => {
    document.title = 'Career | Accredian';
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const sliderRef = useRef();

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dots: true,
    autoplay: true,
    autoplaySpeed: 6000,

    responsive: [
      {
        breakpoint: 1124,
        settings: {
          infinite: true,
          // dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          // dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          // dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
        },
      },
    ],
  };


  return (
    <main className="w-full block flex-grow mt-10 md:mt-0">
      <Testingnavbar />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }} >
          <Box
            sx={{
              backgroundImage:
                "url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/gurugram-image.webp)",
              backgroundSize: "cover",
            }}
          >
            <Container fixed>
              <Box sx={{ pt: 22, pb: 23 }}>
                {/* ✅ FIXED: removed `item`, lg={12} → size={12}, lg={6} → size={6} */}
                <Grid size={12} container>
                  <Grid size={6}>
                    <Typography
                      variant="h4"
                      component="h1"
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        display: "flex",
                        mb: 1,

                      }}
                    >
                      Careers at{" "}
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          fontWeight: "bold",
                          ml: 1,
                        }}
                      >
                        Accredian{" "}
                      </Typography>{" "}
                    </Typography>
                    <Typography
                      sx={{ color: "#fff", textDecoration: "none", }}
                    >
                      Accelerate your growth here{" "}
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "20px",
                        textAlign: "center",
                        display: "flex",
                        ml: 24,
                        mb: 1,
                      }}
                    >
                      {" "}
                      <LocationOnIcon sx={{ fontSize: "25px", color: "#fff" }} />
                      HEADQUARTERS
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: "25px",
                        textAlign: "center",
                      }}
                    >
                      Gurugram, India
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ pt: 4 }}>
                  <a href="#apply-form">
                    <Button
                      variant="contained"
                      sx={{
                        mb: 2,
                        fontSize: "1.2rem",
                        backgroundImage:
                          "linear-gradient(to left,#00c4ff 0%,#0091ff 71%)",
                        textTransform: "none",
                        width: "260px",
                        height: "50px",
                      }}
                    >
                      Apply Now
                    </Button>
                  </a>
                </Box>
              </Box>
            </Container>
          </Box>
          <Box sx={{ pt: 6 }}>
            <Box sx={{ pb: 5 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "25px",
                  textAlign: "center",
                  fontWeight: 400,
                  mb: 2,
                }}
              >
                Accelerate into your dream career
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: 300,
                }}
              >
                Our core values & cultural strengths reflect being a
              </Typography>
            </Box>
            <Box>
              <Container fixed>
                <Box sx={{ ml: -2, mr: 4 }}>
                  <Container fixed>
                    {/* ✅ FIXED: removed `item`, lg={12} → size={12} */}
                    <Grid
                      size={12}
                      container
                      sx={{ boxShadow: "0 0 4px 0 #0091ff", border: "8px" }}
                    >
                      {/* ✅ FIXED: removed `item`, lg={3} → size={3} */}
                      <Grid
                        size={3}
                        sx={{ py: 10, mx: 1, maxWidth: "23.333333% !important " }}
                      >
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/problem-solver.webp"
                          alt="Goole"
                          sx={{ width: "102px", mx: 12, pb: 4 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#000",
                            textDecoration: "none",
                            fontSize: "20px",
                            textAlign: "center",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          Problem Solver
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.5)",
                            textDecoration: "none",
                            fontSize: "17px",
                            textAlign: "center",
                            fontWeight: 400,
                          }}
                        >
                          Should have logical & analytical approach.
                        </Typography>
                      </Grid>
                      <Grid
                        size={3}
                        sx={{ py: 10, mx: 1, maxWidth: "23.333333% !important " }}
                      >
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Self-Starter.webp"
                          alt="Goole"
                          sx={{ width: "102px", mx: 12, pb: 4 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#000",
                            textDecoration: "none",
                            fontSize: "20px",
                            textAlign: "center",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          Self Starter
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.5)",
                            textDecoration: "none",
                            fontSize: "17px",
                            textAlign: "center",
                            fontWeight: 400,
                          }}
                        >
                          Should work with minimal supervision.
                        </Typography>
                      </Grid>
                      <Grid
                        size={3}
                        sx={{ py: 10, mx: 1, maxWidth: "23.333333% !important " }}
                      >
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Accelerator.webp"
                          alt="Goole"
                          sx={{ width: "102px", mx: 12, pb: 4 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#000",
                            textDecoration: "none",
                            fontSize: "20px",
                            textAlign: "center",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          Accelerator
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.5)",
                            textDecoration: "none",
                            fontSize: "17px",
                            textAlign: "center",
                            fontWeight: 400,
                          }}
                        >
                          Should be fast in driving results.
                        </Typography>
                      </Grid>
                      <Grid
                        size={3}
                        sx={{ py: 10, mx: 1, maxWidth: "23.333333% !important " }}
                      >
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Innovator.webp"
                          alt="Goole"
                          sx={{ width: "102px", mx: 12, pb: 4 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#000",
                            textDecoration: "none",
                            fontSize: "20px",
                            textAlign: "center",
                            fontWeight: "bold",
                            mb: 1,
                          }}
                        >
                          Innovator
                        </Typography>
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "rgba(0, 0, 0, 0.5)",
                            textDecoration: "none",
                            fontSize: "17px",
                            textAlign: "center",
                            fontWeight: 400,
                          }}
                        >
                          Should be open to rapid experimentation.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Container>
                </Box>
              </Container>
            </Box>
            <Box sx={{ py: 6 }}>
              <Box sx={{ pb: 5 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "25px",
                    textAlign: "center",
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  Life at Accredian
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: 300,
                  }}
                >
                  Here's what you should expect
                </Typography>
              </Box>
              <Box sx={{ mb: 5 }}>
                <Container fixed>
                  <Box sx={{ ml: -1 }}>
                    <Container fixed>
                      {/* ✅ FIXED: removed `item`, lg={12} → size={12}, lg={6} → size={6} */}
                      <Grid size={12} container>
                        <Grid size={6}>
                          <CardMedia
                            component="img"
                            image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/office-image.webp"
                            alt="Goole"
                            sx={{}}
                          />
                        </Grid>
                        <Grid size={6}>
                          <Box sx={{ mx: 13, mt: 15 }}>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "#000",
                                textDecoration: "none",
                                fontSize: "25px",
                                fontWeight: 400,
                                mb: 2,
                              }}
                            >
                              Open work stations
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "rgba(0, 0, 0, 0.5)",
                                textDecoration: "none",
                                fontSize: "17px",
                              }}
                            >
                              Open work stations are great culture boosters. We are a
                              close knit team and love to sit together in large open
                              spaces. We believe that this is a great way to collaborate
                              with everyone across teams and maximize creativity at
                              work.{" "}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                </Container>
              </Box>
              <Box sx={{ mb: 5 }}>
                <Container fixed>
                  <Box sx={{ ml: -2 }}>
                    <Container fixed>
                      <Grid size={12} container>
                        <Grid size={6}>
                          <Box sx={{ mx: 13, mt: 15 }}>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "#000",
                                textDecoration: "none",
                                fontSize: "25px",
                                fontWeight: 400,
                                mb: 2,
                              }}
                            >
                              Fun at work
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "rgba(0, 0, 0, 0.5)",
                                textDecoration: "none",
                                fontSize: "17px",
                              }}
                            >
                              Apart from daily grind, we don't miss an opportunity to
                              have fun at work. We celebrate every xsall occasion,
                              usually go on company wide outings, weekly team lunches
                              and not to miss HR activities which will ensure that
                              you're always high on energy.
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid size={6}>
                          <Slider
                            ref={sliderRef}
                            {...settings}
                            style={{ overflowX: "hidden" }}
                          >
                            <CardMedia
                              component="img"
                              image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/campany-work-fun.webp"
                              alt="Goole"
                              sx={{}}
                            />
                            <CardMedia
                              component="img"
                              image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/company-fun-2.webp"
                              alt="Goole"
                              sx={{}}
                            />
                          </Slider>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                </Container>
              </Box>
              <Box sx={{ mb: 5 }}>
                <Container fixed>
                  <Box sx={{ ml: -2 }}>
                    <Container fixed>
                      <Grid size={12} container>
                        <Grid size={6}>
                          <CardMedia
                            component="img"
                            image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/careers3.webp"
                            alt="Goole"
                            sx={{}}
                          />
                        </Grid>
                        <Grid size={6}>
                          <Box sx={{ mx: 13, mt: 15 }}>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "#000",
                                textDecoration: "none",
                                fontSize: "25px",
                                fontWeight: 400,
                                mb: 2,
                              }}
                            >
                              Accelerated Growth
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "rgba(0, 0, 0, 0.5)",
                                textDecoration: "none",
                                fontSize: "17px",
                                mb: 2,
                              }}
                            >
                              If you're looking for faster growth, right role and a
                              great opportunity to maximise your full potential then you
                              should join us.{" "}
                            </Typography>
                            <Typography
                              variant="h4"
                              component="div"
                              sx={{
                                color: "rgba(0, 0, 0, 0.5)",
                                textDecoration: "none",
                                fontSize: "17px",
                              }}
                            >
                              We truly believe in speed, innovation & results.{" "}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Container>
                  </Box>
                </Container>
              </Box>
            </Box>
            <Box sx={{ py: 2 }}>
              <Box sx={{ pb: 5, backgroundColor: "#0091ff" }}>
                <Container fixed>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "25px",
                      textAlign: "center",
                      fontWeight: 400,
                      mb: 3,
                      pt: 10,
                    }}
                  >
                    Three pillars of our culture
                  </Typography>
                  {/* ✅ FIXED: removed `item`, lg={12} → size={12}, lg={4} → size={4} */}
                  <Grid size={12} container justifyContent="center" spacing={4}>
                    <Grid size={4}>
                      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Transparency.webp"
                          alt="Transparency"
                          sx={{ width: "60px", flexShrink: 0 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "22px",
                          }}
                        >
                          Transparency
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={4}>
                      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Growth-Oriented.webp"
                          alt="Growth Oriented"
                          sx={{ width: "60px", flexShrink: 0 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "22px",
                          }}
                        >
                          Growth Oriented
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={4}>
                      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Impact-Driven.webp"
                          alt="Impact Driven"
                          sx={{ width: "60px", flexShrink: 0 }}
                        />
                        <Typography
                          variant="h4"
                          component="div"
                          sx={{
                            color: "#fff",
                            textDecoration: "none",
                            fontSize: "22px",
                          }}
                        >
                          Impact Driven
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            <Box id="apply-form">
              <Container fixed>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: "20px",
                    textAlign: "center",
                    fontWeight: 400,
                    mb: 3,
                    pt: 2,
                    mx: 15,
                  }}
                >
                  Your work will directly impact professionals through education and
                  help them upgrade to better lives. Apply to your dream role where
                  you can work with utmost passion.
                </Typography>
              </Container>
            </Box>
          </Box>
        </Box>

        {/* ===== MOBILE VIEW ===== */}
        <Box sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}>
          <Box
            sx={{
              backgroundImage:
                "url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/gurugram-image.webp)",
              backgroundSize: "cover",
            }}
          >
            <Box sx={{ py: 5 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#fff",
                  textDecoration: "none",
                  display: "flex",
                  mb: 1,
                  mt: 3,
                  justifyContent: "center",
                  fontSize: "36px"
                }}
              >
                Careers at{" "}
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "bold",
                    ml: 1,
                    textAlign: "center",
                    fontSize: "36px"
                  }}
                >
                  Accredian{" "}
                </Typography>{" "}
              </Typography>
              <Typography
                sx={{ color: "#fff", textDecoration: "none", textAlign: "center", fontSize: "20px" }}
              >
                Accelerate your growth here{" "}
              </Typography>
              <center>
                <a href="#apply-form">
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,
                      backgroundImage:
                        "linear-gradient(to left,#00c4ff 0%,#0091ff 71%)",
                      textTransform: "none",
                      width: "200px",
                      height: "45px",
                      fontSize: "14px"
                    }}
                  >
                    Apply Now
                  </Button>
                </a>
              </center>
            </Box>
          </Box>
          <Box sx={{ mx: 2 }}>
            <Container fixed>
              <Box sx={{ py: 3 }}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    fontSize: "22px",
                    textAlign: "center",
                    mb: 1,
                  }}
                >
                  Accelerate into your dream career
                </Typography>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    fontSize: "19px",
                    textAlign: "center",
                  }}
                >
                  Our core values & cultural strengths reflect being a
                </Typography>
              </Box>
              <Box>
                {/* ✅ FIXED: removed `item`, xs={12} → size={12} */}
                <Grid
                  container
                  sx={{ boxShadow: "0 0 4px 0 #0091ff", border: "8px", py: 4 }}
                >
                  <Grid
                    size={12}
                    sx={{ pb: 3 }}
                  >
                    <center><CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/problem-solver.webp"
                      alt="Goole"
                      sx={{ width: "102px", pb: 3 }}
                    /></center>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      Problem Solver
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        textDecoration: "none",
                        fontSize: "17px",
                        textAlign: "center",
                        fontWeight: 400,
                        px: 4
                      }}
                    >
                      Should have logical & analytical approach.
                    </Typography>
                  </Grid>
                  <Grid
                    size={12}
                    sx={{ pb: 3 }}
                  >
                    <center><CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Self-Starter.webp"
                      alt="Goole"
                      sx={{ width: "102px", pb: 3 }}
                    /></center>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      Self Starter
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        textDecoration: "none",
                        fontSize: "17px",
                        textAlign: "center",
                        fontWeight: 400,
                        px: 4
                      }}
                    >
                      Should work with minimal supervision.
                    </Typography>
                  </Grid>
                  <Grid
                    size={12}
                    sx={{ pb: 3 }}
                  >
                    <center><CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Accelerator.webp"
                      alt="Goole"
                      sx={{ width: "84px", pb: 3 }}
                    /></center>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      Accelerator
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        textDecoration: "none",
                        fontSize: "17px",
                        textAlign: "center",
                        fontWeight: 400,
                        px: 4
                      }}
                    >
                      Should be fast in driving results.
                    </Typography>
                  </Grid>
                  <Grid
                    size={12}
                    sx={{ pb: 3 }}
                  >
                    <center><CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Innovator.webp"
                      alt="Goole"
                      sx={{ width: "77px", pb: 3 }}
                    /></center>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "#000",
                        textDecoration: "none",
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      Innovator
                    </Typography>
                    <Typography
                      variant="h4"
                      component="div"
                      sx={{
                        color: "rgba(0, 0, 0, 0.5)",
                        textDecoration: "none",
                        fontSize: "17px",
                        textAlign: "center",
                        fontWeight: 400,
                        px: 4
                      }}
                    >
                      Should be open to rapid experimentation.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
          <Box>
            <Box sx={{ py: 5 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "25px",
                  textAlign: "center",
                  fontWeight: 400,
                  mb: 1,
                }}
              >
                Life at Accredian
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "20px",
                  textAlign: "center",
                  fontWeight: 300,
                }}
              >
                Here's what you should expect
              </Typography>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Container fixed>
                {/* ✅ FIXED: removed `item`, lg={12} → size={12}, xs={12} → size={12} */}
                <Grid size={12} container>
                  <Grid size={12}>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/office-image.webp"
                      alt="Goole"
                      sx={{ pb: 2 }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Box sx={{}}>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          fontSize: "25px",
                          fontWeight: 400,
                          mb: 2,
                          textAlign: "center"
                        }}
                      >
                        Open work stations
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          textDecoration: "none",
                          fontSize: "17px",
                        }}
                      >
                        Open work stations are great culture boosters. We are a
                        close knit team and love to sit together in large open
                        spaces. We believe that this is a great way to collaborate
                        with everyone across teams and maximize creativity at
                        work.{" "}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Container fixed>
                <Grid size={12} container>
                  <Grid size={12}>
                    <Slider
                      ref={sliderRef}
                      {...settings}
                      style={{ overflowX: "hidden" }}
                    >
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/campany-work-fun.webp"
                        alt="Goole"
                        sx={{}}
                      />
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/company-fun-2.webp"
                        alt="Goole"
                        sx={{}}
                      />
                    </Slider>
                  </Grid>
                  <Grid size={12}>
                    <Box sx={{}}>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          fontSize: "25px",
                          fontWeight: 400,
                          mb: 2,
                          textAlign: "center"
                        }}
                      >
                        Fun at work
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          textDecoration: "none",
                          fontSize: "17px",
                        }}
                      >
                        Apart from daily grind, we don't miss an opportunity to
                        have fun at work. We celebrate every xsall occasion,
                        usually go on company wide outings, weekly team lunches
                        and not to miss HR activities which will ensure that
                        you're always high on energy.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box sx={{ mb: 5 }}>
              <Container fixed>
                <Grid size={12} container>
                  <Grid size={12}>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/careers3.webp"
                      alt="Goole"
                      sx={{ mb: 3 }}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Box sx={{}}>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          fontSize: "25px",
                          fontWeight: 400,
                          textAlign: "center",
                          mb: 2,
                        }}
                      >
                        Accelerated Growth
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          textDecoration: "none",
                          fontSize: "17px",
                          mb: 2,
                        }}
                      >
                        If you're looking for faster growth, right role and a
                        great opportunity to maximise your full potential then you
                        should join us.{" "}
                      </Typography>
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "rgba(0, 0, 0, 0.5)",
                          textDecoration: "none",
                          fontSize: "17px",
                        }}
                      >
                        We truly believe in speed, innovation & results.{" "}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          <Box>
            <Box sx={{ pb: 5, backgroundColor: "#0091ff" }}>
              <Container fixed>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "25px",
                    textAlign: "center",
                    fontWeight: 400,
                    mb: 3,
                    pt: 10,
                  }}
                >
                  Three pillars of our culture
                </Typography>
                {/* ✅ FIXED: removed `item`, xs={12} → size={12} */}
                <Grid size={12} container justifyContent="center" spacing={2}>
                  <Grid size={12}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Transparency.webp"
                        alt="Transparency"
                        sx={{ width: "55px", flexShrink: 0 }}
                      />
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: "20px",
                        }}
                      >
                        Transparency
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Growth-Oriented.webp"
                        alt="Growth Oriented"
                        sx={{ width: "55px", flexShrink: 0 }}
                      />
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: "20px",
                        }}
                      >
                        Growth Oriented
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid size={12}>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 2 }}>
                      <CardMedia
                        component="img"
                        image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Career/Impact-Driven.webp"
                        alt="Impact Driven"
                        sx={{ width: "55px", flexShrink: 0 }}
                      />
                      <Typography
                        variant="h4"
                        component="div"
                        sx={{
                          color: "#fff",
                          textDecoration: "none",
                          fontSize: "20px",
                        }}
                      >
                        Impact Driven
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Box>
          <Box id="apply-form">
            <Container fixed>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontSize: "19px",
                  textAlign: "center",
                  fontWeight: 400,
                  mb: 3,
                  pt: 2,
                }}
              >
                Your work will directly impact professionals through education and
                help them upgrade to better lives. Apply to your dream role where
                you can work with utmost passion.
              </Typography>
            </Container>
          </Box>
        </Box>
        <Form />
      </ThemeProvider>
      <Footer />
    </main>
  );
}