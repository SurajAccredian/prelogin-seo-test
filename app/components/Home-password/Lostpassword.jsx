"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
        `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/password/forgot-password`,
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
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] p-6 sm:p-8">
            <h1 className="text-2xl font-bold text-center mb-3 text-gray-900">
              Lost your password?
            </h1>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </p>
            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1A73E8] hover:bg-[#1557b0] text-white font-medium rounded-lg shadow transition-colors text-sm"
              >
                Reset password
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-white" />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Lostpassword;
