"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import CryptoJS from "crypto-js";
import { Loader2 } from "lucide-react";
import Footer from "../Footer/Footer";
import Testingnavbar from "../Navbar/testinnav";

const Resetpassword = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [messagecolor, setMessagecolor] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);

  const LoaderClose = () => setOpen(false);
  const LoaderOpen = () => setOpen(true);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    compare(val, confirmPassword);
  };

  const handleConfirmChange = (e) => {
    const val = e.target.value;
    setConfirmPassword(val);
    compare(password, val);
  };

  const compare = (pass, conPass) => {
    if (!pass && !conPass) {
      setBtnDisabled(true);
      setMessage("");
    } else if (pass === conPass) {
      setBtnDisabled(false);
      setMessage("New Password and Confirm Password are matched");
      setMessagecolor("#248f24");
    } else {
      setBtnDisabled(true);
      setMessage("New Password and Confirm Password are not matched");
      setMessagecolor("#ff6666");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    LoaderOpen();

    if (password === "Dataleader@123") {
      setMessage(
        "For security reasons, this password is not allowed. Please choose a different password."
      );
      setMessagecolor("#ff6666");
      LoaderClose();
      return;
    }

    const sandData = {
      user_id: atob(id),
      password: CryptoJS.AES.encrypt(
        password,
        "ACCREDIAN@login$2022@$newweb$@"
      ).toString(),
    };

    try {
      const result = await axios.post(
        `http://localhost:5001/change-password`,
        JSON.stringify(sandData),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      if (result.data.status == 200) {
        const Swal = (await import("sweetalert2")).default;
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
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.2)] p-6 sm:p-8">
            <h1 className="text-xl font-bold mb-4 text-gray-900">
              Reset Password
            </h1>

            <form onSubmit={submitForm} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {message && (
                <p
                  className="text-xs font-semibold"
                  style={{ color: messagecolor }}
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                id="submit-button"
                disabled={btnDisabled}
                className="w-full py-2.5 px-4 bg-[#009ef7] hover:bg-[#008be0] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow transition-colors text-sm"
              >
                Save changes
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
    </>
  );
};

export default Resetpassword;
