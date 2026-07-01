"use client"
import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Container,
  CardMedia,
} from "@mui/material";
import Testingnavbar from "../Navbar/testinnav";
import Footer from "../Footer/Footer";

export default function About() {
  useEffect(() => {
    document.title = 'Vision & Mission | Accredian';
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Testingnavbar />

      {/* ===== DESKTOP VIEW ===== */}
      <Box sx={{ display: { xs: "none", lg: "block", sm: "block", md: "block" } }}>

        {/* Hero Banner */}
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right,rgb(8 47 88 / 88%),rgb(8 47 88 / 88%)),url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/about-us-banner.webp)",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ py: 20 }}>
            <Typography component="h1" sx={{ color: "#7c98cd", textAlign: "center", fontSize: "28px" }}>
              our vision
            </Typography>
            <Typography sx={{ color: "#fff", textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "0rem!important", lineHeight: 1.3 }}>
              Empower every professional to reach their highest potential
            </Typography>
            <Typography sx={{ color: "#fff", textAlign: "center", fontSize: "36px", fontWeight: "bold" }}>
              through world-class learning.
            </Typography>
          </Box>
        </Box>

        {/* Quote */}
        <Box sx={{ pt: 6, pb: 3 }}>
          <Typography sx={{ color: "#000", textAlign: "center", fontSize: "25px", fontWeight: 400, marginBottom: "0rem!important", lineHeight: 1.3 }}>
            " We believe that anyone can learn new skills and{" "}
          </Typography>
          <Typography sx={{ color: "#000", textAlign: "center", fontSize: "25px", fontWeight: 400, marginBottom: "0.4rem!important", lineHeight: 1.3 }}>
            grow in their careers. "{" "}
          </Typography>
          <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "14px", fontWeight: 400 }}>
            - Manav, CEO - Accredian
          </Typography>
        </Box>

        {/* Leadership Team */}
        <Box>
          <Box sx={{ pb: 5 }}>
            <Typography sx={{ color: "#000", textAlign: "center", fontSize: "32px", fontWeight: "bold" }}>
              Leadership Team
            </Typography>
          </Box>
          <Box sx={{ pb: 4 }}>
            <Container fixed>
              <Box>
                <Container fixed>
                  {/* FIX: added `item` to parent Grid */}
                  <Grid item lg={12} sm={12} container sx={{ justifyContent: "center", gap: 3.6 }}>

                    {/* Card 1 - Manav */}
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff", // FIX: was backgroubdColor
                        maxWidth: { lg: "30.333333% !important", sm: "100%", md: "30.333333% !important" },
                        mb: { lg: 0, md: 0, sm: 4 },
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
                      <Typography sx={{ color: "#000", textAlign: "center", fontSize: "20px", fontWeight: 400, marginBottom: "0.4rem!important", lineHeight: 1.3 }}>
                        Manvender Singh (Manav)
                      </Typography>
                      <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "20px", fontWeight: 400 }}>
                        Chief executive officer
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

                    {/* Card 2 - Nikhil */}
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff", // FIX: was backgroubdColor
                        maxWidth: { lg: "30.333333% !important", sm: "100%", md: "30.333333% !important" },
                        ml: { lg: 0, md: 0, sm: 0 },
                        mb: { lg: 0, md: 0, sm: 4 },
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
                      <Typography sx={{ color: "#000", textAlign: "center", fontSize: "20px", fontWeight: 400, marginBottom: "0.4rem!important", lineHeight: 1.3 }}>
                        Nikhil Bhogaraju
                      </Typography>
                      <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "20px", fontWeight: 400 }}>
                        Chief operating officer
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

                    {/* Card 3 - Suchit */}
                    <Grid
                      item
                      lg={4}
                      sm={12}
                      sx={{
                        boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                        borderRadius: "10px",
                        backgroundColor: "#fff", // FIX: was backgroubdColor
                        maxWidth: { lg: "30.333333% !important", sm: "100%", md: "30.333333% !important" },
                        ml: { lg: 0, md: 0, sm: 0 },
                        mb: { lg: 0, md: 0, sm: 4 },
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
                      <Typography sx={{ color: "#000", textAlign: "center", fontSize: "20px", fontWeight: 400, marginBottom: "0.4rem!important", lineHeight: 1.3 }}>
                        Suchit Majumdar
                      </Typography>
                      <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "20px", fontWeight: 400 }}>
                        Chief product officer
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

        {/* Mission Section */}
        <Box sx={{ py: 5 }}>
          <Box sx={{ pb: 4 }}>
            <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "28px", fontWeight: 400 }}>
              Our mission &amp; focus
            </Typography>
          </Box>
          <Box sx={{ pb: 4 }}>
            <Typography sx={{ color: "#000", textAlign: "center", fontSize: "28px", fontWeight: 400, marginBottom: "0rem!important", lineHeight: 1.3 }}>
              To make world class education accessible &amp;{" "}
            </Typography>
            <Typography sx={{ color: "#000", textAlign: "center", fontSize: "28px", fontWeight: 400 }}>
              enable high impact careers for everyone.
            </Typography>
          </Box>
          <Container fixed>
            <Box sx={{ pb: 2 }}>
              <Container fixed>
                <Grid item lg={12} container sx={{ justifyContent: "center", columnGap: 2, rowGap: 4 }}>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 0, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#c2e76b", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>2018</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>Year of inception</Typography>
                  </Grid>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 5, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#002e5e", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>5000+</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>professionals trained</Typography>
                  </Grid>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 5, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#00acd7", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>1.6M</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>class hours delivered</Typography>
                  </Grid>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 0, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#00acd7", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>30+</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>batches launched</Typography>
                  </Grid>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 5, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#002e5e", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>3.6 lac</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>followers &amp; users</Typography>
                  </Grid>

                  <Grid
                    item
                    lg={4} sm={12} md={6}
                    sx={{
                      boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                      maxWidth: { lg: "19.333333% !important", sm: "100%", md: "100%" },
                      p: 3, ml: { lg: 5, md: 0, sm: 0 }, mb: { lg: 4, sm: 3, md: 3 },
                      borderRadius: "10px",
                      backgroundColor: "#fff", // FIX: was backgroubdColor
                    }}
                  >
                    <Typography sx={{ color: "#c2e76b", textAlign: "center", fontSize: "42px", fontWeight: "bold", marginBottom: "0.6rem!important" }}>4.5/5</Typography>
                    <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "17px", fontWeight: 300 }}>program satisfaction</Typography>
                  </Grid>

                </Grid>
              </Container>
            </Box>
          </Container>
        </Box>

        {/* Join Team / PR Section */}
        <Box sx={{ py: 6 }}>
          <Container fixed>
            <Grid item lg={12} container sx={{ justifyContent: "center", gap: 4 }}>

              <Grid
                item
                lg={6} sm={12} md={12}
                sx={{
                  backgroundColor: "#7cdaff",
                  borderRadius: "10px",
                  p: 4,
                  maxWidth: { lg: "43.333333% !important", sm: "100%", md: "100%" },
                  ml: { lg: 0, md: 0, sm: 0 },
                  mb: { lg: 0, md: 3, sm: 3 },
                }}
              >
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Join our team</Typography>
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400, marginBottom: "0.1rem!important" }}>Explore current job openings in full</Typography>
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400 }}>time, internships and freelance.</Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2, backgroundColor: "#f8f9fa", textTransform: "none", color: "#000", width: "250px",
                      "&:hover": { backgroundColor: "#f8f9fa", textTransform: "none", color: "#000", width: "250px" },
                    }}
                  >
                    Current job openings
                  </Button>
                </center>
              </Grid>

              <Grid
                item
                lg={6} sm={12} md={12}
                sx={{
                  backgroundColor: "#f7b500",
                  p: 4,
                  borderRadius: "10px",
                  maxWidth: { lg: "43.333333% !important", sm: "100%", md: "100%" },
                  ml: { lg: 0, md: 0, sm: 0 },
                }}
              >
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>Public Relations</Typography>
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400, marginBottom: "0.1rem!important" }}>For any media enqueries,</Typography>
                <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400 }}>drop us an email.</Typography>
                <center>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2, backgroundColor: "#f8f9fa", textTransform: "none", color: "#000", width: "230px",
                      "&:hover": { backgroundColor: "#f8f9fa", textTransform: "none", color: "#000", width: "230px" },
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

      {/* ===== MOBILE VIEW ===== */}
      <Box sx={{ display: { xs: "block", lg: "none", md: "none", sm: "none" } }}>

        {/* Hero Banner */}
        <Box
          sx={{
            backgroundImage:
              "linear-gradient(to right,rgb(8 47 88 / 88%),rgb(8 47 88 / 88%)),url(https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/about-us-banner.webp)",
            backgroundSize: "cover",
          }}
        >
          <Box sx={{ py: 20 }}>
            <Typography component="div" sx={{ color: "#7c98cd", textAlign: "center", fontSize: "28px" }}>our vision</Typography>
            <Typography sx={{ color: "#fff", textAlign: "center", fontSize: "30px", fontWeight: "bold", marginBottom: "0rem!important", lineHeight: 1.3 }}>
              Empower every professional to reach their highest potential through world-class learning.
            </Typography>
          </Box>
        </Box>

        {/* Quote */}
        <Box sx={{ pt: 6, pb: 3 }}>
          <Container fixed> {/* FIX: was <Container fixd> */}
            <Typography sx={{ color: "#000", textAlign: "center", fontSize: "20px", fontWeight: 400, marginBottom: "1rem!important", lineHeight: 1.3 }}>
              " We believe that anyone can learn new skills and grow in their careers. "
            </Typography>
            <Typography sx={{ color: "#6c757d", textAlign: "center", fontSize: "14px", fontWeight: 400 }}>
              - Manav, CEO - Accredian
            </Typography>
          </Container>
        </Box>

        {/* Leadership Team Mobile */}
        {/* ===== MOBILE - Leadership Team ===== */}
        <Box>
          <Box sx={{ pb: 5 }}>
            <Typography sx={{ color: "#000", textAlign: "center", fontSize: "32px", fontWeight: "bold" }}>
              Leadership Team
            </Typography>
          </Box>

          {/* ✅ Replace Grid entirely with Box flex column */}
          <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              {
                name: "Manvender Singh (Manav)",
                title: "Chief executive officer",
                img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/manav-profile.webp",
                alt: "manav-profile",
              },
              {
                name: "Nikhil Bhogaraju",
                title: "Chief operating officer",
                img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/nikhil-profile.webp",
                alt: "nikhil-profile",
              },
              {
                name: "Suchit Majumdar",
                title: "Chief product officer",
                img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/suchit-profile.webp",
                alt: "suchit-profile",
              },
            ].map((person, i) => (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  pb: 2,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CardMedia
                    component="img"
                    image={person.img}
                    alt={person.alt}
                    sx={{ width: "65%", py: 3 }}
                  />
                </Box>
                <Typography sx={{ color: "#000", textAlign: "center", fontSize: "20px", fontWeight: 400, marginBottom: "0.4rem!important", lineHeight: 1.3 }}>
                  {person.name}
                </Typography>
                <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "20px", fontWeight: 400 }}>
                  {person.title}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                  <CardMedia
                    component="img"
                    image="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/vision/linkedin-icon.webp"
                    alt="linkedin"
                    sx={{ width: "8%" }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mission Mobile */}
        {/* ===== MOBILE - Mission Stats Section ===== */}
        <Box sx={{ py: 5 }}>
          <Container fixed>
            <Box sx={{ pb: 4 }}>
              <Typography sx={{ color: "#0077b7", textAlign: "center", fontSize: "28px", fontWeight: 400 }}>
                Our mission &amp; focus
              </Typography>
            </Box>
            <Box sx={{ pb: 4 }}>
              <Typography sx={{ color: "#000", textAlign: "center", fontSize: "24px", fontWeight: 400, marginBottom: "0rem!important", lineHeight: 1.3 }}>
                To make world class education accessible &amp; enable high impact careers for everyone.
              </Typography>
            </Box>
          </Container>

          {/* ✅ Replace Grid entirely with Box flex column */}
          <Box sx={{ px: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              { value: "2018", label: "Year of inception", color: "#c2e76b" },
              { value: "5000+", label: "professionals trained", color: "#002e5e" },
              { value: "1.6M", label: "class hours delivered", color: "#00acd7" },
              { value: "30+", label: "batches launched", color: "#00acd7" },
              { value: "3.6 lac", label: "followers & users", color: "#002e5e" },
              { value: "4.5/5", label: "program satisfaction", color: "#c2e76b" },
            ].map((stat, i) => (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  boxShadow: "0 0 30px 0 rgb(0 145 255 / 10%)",
                  p: 3,
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: stat.color, fontSize: "42px", fontWeight: "bold", mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography sx={{ color: "#6c757d", fontSize: "17px", fontWeight: 300 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ===== MOBILE - Join Team / PR Section ===== */}
        <Box sx={{ py: 6, px: 2 }}>
          {/* Join our team card */}
          <Box
            sx={{
              backgroundColor: "#7cdaff",
              borderRadius: "10px",
              p: 4,
              mb: 3,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>
              Join our team
            </Typography>
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400, marginBottom: "0.1rem!important" }}>
              Explore current job openings in full
            </Typography>
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400 }}>
              time, internships and freelance.
            </Typography>
            <center>
              <Button
                variant="contained"
                sx={{
                  mt: 2, mb: 1,
                  backgroundColor: "#f8f9fa",
                  textTransform: "none",
                  color: "#000",
                  width: "250px",
                  "&:hover": { backgroundColor: "#f8f9fa", color: "#000" },
                }}
              >
                Current job openings
              </Button>
            </center>
          </Box>

          {/* Public Relations card */}
          <Box
            sx={{
              backgroundColor: "#f7b500",
              borderRadius: "10px",
              p: 4,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "25px", fontWeight: "bold" }}>
              Public Relations
            </Typography>
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400, marginBottom: "0.1rem!important" }}>
              For any media enqueries,
            </Typography>
            <Typography sx={{ color: "#09142f", textAlign: "center", fontSize: "17px", fontWeight: 400 }}>
              drop us an email.
            </Typography>
            <center>
              <Button
                variant="contained"
                sx={{
                  mt: 2, mb: 1,
                  backgroundColor: "#f8f9fa",
                  textTransform: "none",
                  color: "#000",
                  width: "230px",
                  "&:hover": { backgroundColor: "#f8f9fa", color: "#000" },
                }}
              >
                info@accredian.com
              </Button>
            </center>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}