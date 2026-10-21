"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { decodeToken } from "react-jwt";
import { Base64 } from "js-base64";
import toast from "react-hot-toast";
import Head from "next/head";
import Script from "next/script";
import MainNavbar from "../../../components/Navbar/MainNavbar";
import Footer from "../../../components/Footer/Footer";
import { FaCheckCircle, FaShieldAlt, FaAward, FaMicrosoft } from "react-icons/fa";

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const encryptedId = params?.id;

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [programId, setProgramId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [programData, setProgramData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  const FEE_AMOUNT = 2499;
  const GST_PERCENT = 18;
  const GST_AMOUNT = (FEE_AMOUNT * GST_PERCENT) / 100;
  const TOTAL_AMOUNT = FEE_AMOUNT + GST_AMOUNT;

  useEffect(() => {
    if (encryptedId && typeof window !== "undefined") {
      try {
        const decodedId = Base64.decode(encryptedId);
        setProgramId(decodedId);

        const token = localStorage.getItem("token");
        if (token) {
          const decoded = decodeToken(token);
          if (decoded?.data) {
            const fname = decoded.data.firstname || "";
            const lname = decoded.data.lastname || decoded.data.userlastname || "";
            const fullName = [fname, lname].filter(Boolean).join(" ");

            setUserData({
              id: decoded.data.user_id,
              name: fullName,
              email: decoded.data.email || "",
              phone: decoded.data.mobile || "",
            });

            const BACKEND_URL =
              process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD
            fetch(`${BACKEND_URL}/api/certification-payment/check-enrollment?user_id=${decoded.data.user_id}&program_id=${decodedId}`)
              .then(res => res.json())
              .then(resData => {
                if (resData.success && resData.isEnrolled) {
                  setIsAlreadyEnrolled(true);
                }
              })
              .catch(console.error);

          }
        } else {
          router.push("/");
        }

        setProgramData({
          name: "Microsoft Certification Program",
        });

      } catch (e) {
        console.error("Invalid program ID");
        toast.error("Invalid URL");
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
  }, [encryptedId, router]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!userData || !programId) return;
    setProcessing(true);

    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        setProcessing(false);
        return;
      }

      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD

      const orderResponse = await fetch(`${BACKEND_URL}/api/certification-payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: TOTAL_AMOUNT,
          user_id: userData.id,
          program_id: programId,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        toast.error("Could not initiate payment");
        setProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // fallback to test key from .env if needed
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "Accredian",
        description: "Microsoft Certification Fee",
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            toast.loading("Verifying payment...", { id: "payment-toast" });
            const verifyRes = await fetch(`${BACKEND_URL}/api/certification-payment/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                user_id: userData.id,
                program_id: programId,
                amount: TOTAL_AMOUNT,
                email: userData.email,
                name: userData.name,
                phone: userData.phone,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              toast.success("Payment successful! You are enrolled.", { id: "payment-toast" });
              setIsAlreadyEnrolled(true);
            } else {
              toast.error("Payment verification failed.", { id: "payment-toast" });
            }
          } catch (err) {
            console.error(err);
            toast.error("Something went wrong verifying payment.", { id: "payment-toast" });
          } finally {
            setProcessing(false);
          }
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: {
          color: "#2563EB",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment failed. Please try again.");
        setProcessing(false);
      });

    } catch (err) {
      console.error(err);
      toast.error("Error creating payment order.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <MainNavbar />

      <main className="flex-grow flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
          <div className="absolute top-[60%] -right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-100 opacity-50 blur-3xl"></div>
        </div>

        <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center h-full pt-8 lg:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold mb-6 w-max">
              <FaMicrosoft className="text-blue-600" />
              <span>Official Certification Partner</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
              Validate your skills with <span className="text-blue-600 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Microsoft Certification</span>
            </h1>

            <p className="text-base text-slate-600 mb-6 leading-relaxed max-w-2xl">
              Take the final step to officially recognize your expertise. Stand out to employers, increase your earning potential, and advance your career globally.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Industry Recognized</h3>
                  <p className="text-slate-600 mt-1">Earn a badge trusted and valued by top tech companies worldwide.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaAward className="text-indigo-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Career Advancement</h3>
                  <p className="text-slate-600 mt-1">Certified professionals are 90% more likely to get promoted and see salary hikes.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaShieldAlt className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Secure Payment</h3>
                  <p className="text-slate-600 mt-1">Your transaction is fully encrypted and processed securely by Razorpay.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Card */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            {/* Decorative ring behind card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25"></div>

            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

              {/* Card Header */}
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900">Checkout</h2>
                <p className="text-sm text-slate-500 mt-1">Complete your registration</p>
              </div>

              <div className="px-6 py-4">
                {isAlreadyEnrolled ? (
                  <div className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-5xl" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Already Enrolled!</h3>
                    <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                      You have already successfully completed the payment and registration for this certification.
                    </p>
                    <button
                      onClick={() => router.push("/")}
                      className="text-white bg-blue-600 hover:bg-blue-700 py-3 px-8 rounded-xl font-bold transition-colors w-full shadow-lg shadow-blue-500/30"
                    >
                      Explore other courses
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Program Name */}
                    <div className="mb-3 pb-3 border-b border-slate-100">
                      <div className="flex justify-between items-start">
                        <span className="text-slate-500 font-medium">Program</span>
                        <span className="text-slate-900 font-bold text-right max-w-[200px]">{programData?.name}</span>
                      </div>
                    </div>

                    {/* Candidate Info */}
                    <div className="mb-3 pb-3 border-b border-slate-100 space-y-2 text-sm">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Candidate Details</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Name</span>
                        <span className="text-slate-900 font-medium">{userData?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Email</span>
                        <span className="text-slate-900 font-medium max-w-[200px] truncate" title={userData?.email}>{userData?.email}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Phone</span>
                        <span className="text-slate-900 font-medium">{userData?.phone || "N/A"}</span>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 mb-5 text-sm">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Order Summary</h3>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">Base Fee</span>
                        <span className="text-slate-900 font-medium">₹{FEE_AMOUNT}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500">GST ({GST_PERCENT}%)</span>
                        <span className="text-slate-900 font-medium">₹{GST_AMOUNT.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center pt-4 mt-2 border-t-2 border-dashed border-slate-200">
                        <span className="text-lg font-bold text-slate-900">Total</span>
                        <span className="text-2xl font-extrabold text-blue-700">₹{TOTAL_AMOUNT.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className={`w-full py-3 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform flex justify-center items-center ${processing
                        ? "bg-blue-400 cursor-not-allowed scale-100"
                        : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 hover:shadow-blue-600/40 active:scale-95"
                        }`}
                    >
                      {processing ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        `Pay ₹${TOTAL_AMOUNT.toFixed(2)} Securely`
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-3 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                      <FaShieldAlt />
                      <span>Secured by Razorpay</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
