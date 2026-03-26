"use client";
import Footer from "../Footer/Footer";
// import Footer from "../Footer/Footer";
import MainNavbar from "../Navbar/MainNavbar";



const HomePageWrapper = ({ children }) => {
  return (
    <>
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
};

export default HomePageWrapper;
