"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../Footer/Footer";
import MainNavbar from "../Navbar/MainNavbar";
import { useRouter } from "next/navigation";
import { reportIssue } from "../../services/student.service";


const NotFound = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    setLoading(true); // Show full-screen loader
    const url = window.location.href;

    try {
      const response = await reportIssue({ body: { url } });

      // Show toast notification
      toast.success(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#1A73E8" strokeWidth="2" fill="none" />
            <path
              d="M8 12l2 2 4-4"
              stroke="#1A73E8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        style: {
          fontSize: "15px",
          width: window.innerWidth < 480 ? "100%" : "340px",
          maxWidth: window.innerWidth < 480 ? "100vw" : "340px",
        },
        progressStyle: {
          background: "#1A73E8",
          height: "6px",
        },
      });


      // Redirect after 5 seconds
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          fontSize: "15px",
          width: window.innerWidth < 480 ? "100%" : "340px",
          maxWidth: window.innerWidth < 480 ? "100vw" : "340px",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <MainNavbar />
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white-100 px-6 pb-6 text-center">

        <div className="max-w-[100%] max-h-[100%]">
          <Image
            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/404.svg"
            alt="404 Not Found"
            width={500}
            height={350}
            quality={75}
            className="object-contain w-full h-auto max-w-lg"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-universal mb-6 md:text-5xl">
          Congratulations!
        </h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          You've found the 404 page
        </h2>
        <p className="text-lg text-gray-600 max-w-lg">
          Oops! This page seems to be missing or unavailable. If you believe this is a mistake, please{" "}
          <span
            className={`font-semibold cursor-pointer hover:underline ${loading ? "text-gray-400 cursor-not-allowed" : "text-universal"
              }`}
            onClick={!loading ? handleReport : undefined}
          >
            {loading ? "Reporting" : "Report it"}
          </span>
        </p>
        <Link href="/" className="mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 bg-universal hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md"
          >
            Go to Home Page
          </motion.button>
        </Link>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
