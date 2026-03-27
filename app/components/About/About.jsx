"use client"
import React, { useEffect, useRef } from "react";
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function About() {
  useEffect(() => {
    document.title = 'Vision & Mission | Accredian';
  }, []);
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <Testingnavbar />
      <Box sx={{ display: { xs: "none", lg: "block", sm: "block", md: "block" } }}>
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right,rgb(8 47 88 / 88%),rgb(8 47 88 / 88%)),url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/about-us-banner.webp)",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ py: 20 }}>
            <Typography
              sx={{
                color: "#7c98cd",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "28px",
              }}
            >
              our vision{" "}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "36px",
                fontWeight: "bold",
                marginBottom: "0rem!important",
                lineHeight: 1.3,
              }}
            >
              Empower every professional to reach their highest potential
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              through world-class learning.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ pt: 6, pb: 3 }}>
          <Typography
            sx={{
              color: "#000",
              textDecoration: "none",
              textAlign: "center",
              fontSize: "25px",
              fontWeight: 400,
              marginBottom: "0rem!important",
              lineHeight: 1.3,
            }}
          >
            “ We believe that anyone can learn new skills and{" "}
          </Typography>
          <Typography
            sx={{
              color: "#000",
              textDecoration: "none",
              textAlign: "center",
              fontSize: "25px",
              fontWeight: 400,
              marginBottom: "0.4rem!important",
              lineHeight: 1.3,
            }}
          >
            grow in their careers. ”{" "}
          </Typography>
          <Typography
            sx={{
              color: "#6c757d",
              textDecoration: "none",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            - Manav, CEO - Accredian{" "}
          </Typography>
        </Box>
        <Box sx={{}}>
          <Box sx={{ pb: 5 }}>
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Leadership Team{" "}
            </Typography>
          </Box>
          <Box sx={{ pb: 4 }}>
            <Container fixed>
              <Box>
                <Container fixed>
                  <Grid item lg={12} sm={12} container sx={{ justifyContent: "center", gap: 3.6 }}>
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        maxWidth: { lg: "30.333333% !important ", sm: "100%", md: "30.333333% !important " },
                        mb: { lg: 0, md: 0, sm: 4 }

                      }}
                    >
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/manav-profile.webp"
                          alt="manav-profile"
                          sx={{ width: "65%", py: 3 }}
                        />
                      </center>
                      <Typography
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                          marginBottom: "0.4rem!important",
                          lineHeight: 1.3,
                        }}
                      >
                        Manvender Singh (Manav){" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#0077b7",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                        }}
                      >
                        Chief executive officer{" "}
                      </Typography>
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                          alt="linkedin-icon"
                          sx={{ width: "8%", py: 2 }}
                        />
                      </center>
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        maxWidth: { lg: "30.333333% !important ", sm: "100%", md: "30.333333% !important " },
                        ml: { lg: 0, md: 0, sm: 0 },
                        mb: { lg: 0, md: 0, sm: 4 }
                      }}
                    >
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/nikhil-profile.webp"
                          alt="suchit-profile"
                          sx={{ width: "65%", py: 3 }}
                        />
                      </center>
                      <Typography
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                          marginBottom: "0.4rem!important",
                          lineHeight: 1.3,
                        }}
                      >
                        Nikhil Bhogaraju{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#0077b7",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                        }}
                      >
                        Chief operating officer{" "}
                      </Typography>
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                          alt="linkedin-icon"
                          sx={{ width: "8%", py: 2 }}
                        />
                      </center>
                    </Grid>
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        maxWidth: { lg: "30.333333% !important ", sm: "100%", md: "30.333333% !important " },
                        ml: { lg: 0, md: 0, sm: 0 },
                        mb: { lg: 0, md: 0, sm: 4 }
                      }}
                    >
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/suchit-profile.webp"
                          alt="suchit-profile"
                          sx={{ width: "65%", py: 3 }}
                        />
                      </center>
                      <Typography
                        sx={{
                          color: "#000",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                          marginBottom: "0.4rem!important",
                          lineHeight: 1.3,
                        }}
                      >
                        Suchit Majumdar{" "}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#0077b7",
                          textDecoration: "none",
                          textAlign: "center",
                          fontSize: "20px",
                          fontWeight: 400,
                        }}
                      >
                        Chief product officer{" "}
                      </Typography>
                      <center>
                        <CardMedia
                          component="img"
                          image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                          alt="linkedin-icon"
                          sx={{ width: "8%", py: 2 }}
                        />
                      </center>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Container>
          </Box>
        </Box>
        <Box sx={{ py: 5 }}>
          <Box sx={{ pb: 4 }}>
            <Typography
              sx={{
                color: "#0077b7",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 400,
              }}
            >
              Our mission & focus{" "}
            </Typography>
          </Box>
          <Box sx={{ pb: 4 }}>
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 400,
                marginBottom: "0rem!important",
                lineHeight: 1.3,
              }}
            >
              To make world class education accessible &{" "}
            </Typography>
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: 400,
              }}
            >
              enable high impact careers for everyone.{" "}
            </Typography>
          </Box>
          <Container fixed>
            <Box sx={{ pb: 2 }}>
              <Container fixed>
                <Grid item lg={12} container sx={{ justifyContent: "center", columnGap: 2, rowGap: 4 }}>
                  <Grid

                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 0, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#c2e76b",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      2018{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      Year of inception{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 5, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#002e5e",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      5000+{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      professionals trained{" "}
                    </Typography>
                  </Grid>

                  <Grid
                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 5, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#00acd7",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      1.6M{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      class hours delivered{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 0, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#00acd7",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      30+{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      batches launched{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 5, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#002e5e",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      3.6 lac{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      followers & users{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    lg={4}
                    sm={12}
                    md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important ", sm: "100%", md: "100%" },
                      p: 3,
                      ml: { lg: 5, md: 0, sm: 0 },
                      mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#c2e76b",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      4.5/5{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      program satisfaction{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            {/* <Box>
              <Container fixed>
              <Grid item lg={12} container sx={{}}>
                 
                </Grid>
              </Container>
            </Box> */}
          </Container>
        </Box>
        <Box sx={{ py: 6 }}>
          <Container fixed>
            <Grid item lg={12} container sx={{ justifyContent: "center", gap: 4 }}>
              <Grid
                lg={6}
                sm={12}
                md={12}
                sx={{
                  backgroundColor: "#7cdaff",
                  borderRadius: "10px",
                  p: 4,
                  maxWidth: { lg: "43.333333% !important ", sm: "100%", md: "100%" },
                  ml: { lg: 0, md: 0, sm: 0 },
                  mb: { lg: 0, md: 3, sm: 3 }
                }}
              >
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Join our team{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                    marginBottom: "0.1rem!important",
                  }}
                >
                  Explore current job openings in full{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                  }}
                >
                  time, internships and freelance.{" "}
                </Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,

                      backgroundColor: "#f8f9fa",
                      textTransform: "none",
                      color: "#000",
                      width: "250px",
                      "&:hover": {
                        mb: 2,

                        backgroundColor: "#f8f9fa",
                        textTransform: "none",
                        color: "#000",
                        width: "250px",
                      },
                    }}
                  >
                    Current job openings
                  </Button>
                </center>
              </Grid>
              <Grid
                lg={6}
                sm={12}
                md={12}
                sx={{
                  backgroundColor: "#f7b500",
                  p: 4,
                  borderRadius: "10px",
                  maxWidth: { lg: "43.333333% !important ", sm: "100%", md: "100%" },
                  ml: { lg: 0, md: 0, sm: 0 },
                }}
              >
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Public Relations{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                    marginBottom: "0.1rem!important",
                  }}
                >
                  For any media enqueries,{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                  }}
                >
                  drop us an email.{" "}
                </Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,

                      backgroundColor: "#f8f9fa",
                      textTransform: "none",
                      color: "#000",
                      width: "230px",

                      "&:hover": {
                        mb: 2,

                        backgroundColor: "#f8f9fa",
                        textTransform: "none",
                        color: "#000",
                        width: "230px",
                      },
                    }}
                  >
                    info@accredian.com
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      <Box sx={{ display: { xs: "block", lg: "none", md: "none", sm: "none" } }}>
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right,rgb(8 47 88 / 88%),rgb(8 47 88 / 88%)),url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/about-us-banner.webp)",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ py: 20 }}>
            <Typography
              sx={{
                color: "#7c98cd",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "28px",
              }}
            >
              our vision{" "}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "30px",
                fontWeight: "bold",
                marginBottom: "0rem!important",
                lineHeight: 1.3,
              }}
            >
              Empower every professional to reach their highest potential through world-class learning.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ pt: 6, pb: 3 }}>
          <Container fixd>
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: 400,
                marginBottom: "1rem!important",
                lineHeight: 1.3,
              }}
            >
              “ We believe that anyone can learn new skills and grow in their
              careers. ”{" "}
            </Typography>

            <Typography
              sx={{
                color: "#6c757d",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              - Manav, CEO - Accredian{" "}
            </Typography>
          </Container>
        </Box>
        <Box sx={{}}>
          <Box sx={{ pb: 5 }}>
            <Typography
              sx={{
                color: "#000",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "32px",
                fontWeight: "bold",
              }}
            >
              Leadership Team{" "}
            </Typography>
          </Box>

          <Box>
            <Container fixd>
              <Grid item lg={12} container>
                <Grid
                  item
                  xs={12}
                  sx={{
                    boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                    borderRadius: "10px",
                    backgroubdColor: "#fff",
                    mb: 4,
                  }}
                >
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/manav-profile.webp"
                      alt="manav-profile"
                      sx={{ width: "65%", py: 3 }}
                    />
                  </center>
                  <Typography
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                      marginBottom: "0.4rem!important",
                      lineHeight: 1.3,
                    }}
                  >
                    Manvender Singh (Manav){" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0077b7",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                    }}
                  >
                    Chief executive officer{" "}
                  </Typography>
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                      alt="Goole"
                      sx={{ width: "8%", py: 2 }}
                    />
                  </center>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                    borderRadius: "10px",
                    backgroubdColor: "#fff",
                    mb: 4,
                  }}
                >
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/nikhil-profile.webp"
                      alt="nikhil-profile"
                      sx={{ width: "65%", py: 3 }}
                    />
                  </center>
                  <Typography
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                      marginBottom: "0.4rem!important",
                      lineHeight: 1.3,
                    }}
                  >
                    Nikhil Bhogaraju{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0077b7",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                    }}
                  >
                    Chief operating officer{" "}
                  </Typography>
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                      alt="Goole"
                      sx={{ width: "8%", py: 2 }}
                    />
                  </center>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                    borderRadius: "10px",
                    backgroubdColor: "#fff",
                    mb: 4,
                  }}
                >
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/suchit-profile.webp"
                      alt="suchit-profile"
                      sx={{ width: "65%", py: 3 }}
                    />
                  </center>
                  <Typography
                    sx={{
                      color: "#000",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                      marginBottom: "0.4rem!important",
                      lineHeight: 1.3,
                    }}
                  >
                    Suchit Majumdar{" "}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#0077b7",
                      textDecoration: "none",
                      textAlign: "center",
                      fontSize: "20px",
                      fontWeight: 400,
                    }}
                  >
                    Chief product officer{" "}
                  </Typography>
                  <center>
                    <CardMedia
                      component="img"
                      image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                      alt="Goole"
                      sx={{ width: "8%", py: 2 }}
                    />
                  </center>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        <Box sx={{ py: 5 }}>
          <Container fixd>
            <Box sx={{ pb: 4 }}>
              <Typography
                sx={{
                  color: "#0077b7",
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: 400,
                }}
              >
                Our mission & focus{" "}
              </Typography>
            </Box>
            <Box sx={{ pb: 4 }}>
              <Typography
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  textAlign: "center",
                  fontSize: "24px",
                  fontWeight: 400,
                  marginBottom: "0rem!important",
                  lineHeight: 1.3,
                }}
              >
                To make world class education accessible & enable high impact
                careers for everyone.{" "}
              </Typography>
            </Box>
          </Container>
          <Container fixed>
            <Box sx={{}}>
              <Container fixed>
                <Grid item lg={12} container sx={{}}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#c2e76b",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      2018{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      Year of inception{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#002e5e",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      5000+{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      professionals trained{" "}
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#00acd7",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      1.6M{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      class hours delivered{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box>
              <Container fixed>
                <Grid item lg={12} container sx={{}}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#00acd7",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      30+{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      batches launched{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#002e5e",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      3.6 lac{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      followers & users{" "}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      p: 3,
                      borderRadius: "10px",
                      backgroubdColor: "#fff",
                      mb: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#c2e76b",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "42px",
                        fontWeight: "bold",
                        marginBottom: "0.6rem!important",
                      }}
                    >
                      4.5/5{" "}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6c757d",
                        textDecoration: "none",
                        textAlign: "center",
                        fontSize: "17px",
                        fontWeight: 300,
                      }}
                    >
                      program satisfaction{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </Container>
        </Box>
        <Box sx={{ py: 6 }}>
          <Container fixed>
            <Grid item lg={12} container sx={{}}>
              <Grid
                item
                xs={12}
                sx={{
                  backgroundColor: "#7cdaff",
                  borderRadius: "10px",
                  p: 4,
                  mb: 4,
                }}
              >
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Join our team{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                    marginBottom: "0.1rem!important",
                  }}
                >
                  Explore current job openings in full{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                  }}
                >
                  time, internships and freelance.{" "}
                </Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,

                      backgroundColor: "#f8f9fa",
                      textTransform: "none",
                      color: "#000",
                      width: "250px",
                      "&:hover": {
                        mb: 2,

                        backgroundColor: "#f8f9fa",
                        textTransform: "none",
                        color: "#000",
                        width: "250px",
                      },
                    }}
                  >
                    Current job openings
                  </Button>
                </center>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ backgroundColor: "#f7b500", p: 4, borderRadius: "10px" }}
              >
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "25px",
                    fontWeight: "bold",
                  }}
                >
                  Public Relations{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                    marginBottom: "0.1rem!important",
                  }}
                >
                  For any media enqueries,{" "}
                </Typography>
                <Typography
                  sx={{
                    color: "#09142f",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: 400,
                  }}
                >
                  drop us an email.{" "}
                </Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,

                      backgroundColor: "#f8f9fa",
                      textTransform: "none",
                      color: "#000",
                      width: "230px",

                      "&:hover": {
                        mb: 2,

                        backgroundColor: "#f8f9fa",
                        textTransform: "none",
                        color: "#000",
                        width: "230px",
                      },
                    }}
                  >
                    info@accredian.com
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
