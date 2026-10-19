"use client";
import React, { useState } from "react";
import Wrapper from "../Wrapper/HomePageWrapper";
import { Mail, Phone, Clock, ChevronDown, MessageSquare } from "lucide-react";

const FAQ_DATA = [
  {
    id: "faq-login",
    question: "I can't log in to the app - what should I do?",
    answer: "Try resetting your password. Use the same email address you registered with for your program."
  },
  {
    id: "faq-progress",
    question: "My progress isn't showing correctly.",
    answer: "Pull down to refresh on the home screen. If the issue persists, contact support with your registered email and program name."
  },
  {
    id: "faq-live",
    question: "I can't join my live class from the app.",
    answer: "Ensure the Zoom app is installed on your device. Tap \"Open in Zoom\" on the session screen and grant the required permissions."
  },
  {
    id: "faq-materials",
    question: "I can't find my study materials / resources.",
    answer: "Navigate to the Learning tab and click on \"Go To LMS\" to access your study materials for your enrolled program and unlock as per your curriculum schedule. Head to \"Resources.\" Resource materials are available for all the verticals and you can set it as per your requirement by clicking on the filter feature."
  },
  {
    id: "faq-crash",
    question: "The app is crashing or not loading.",
    answer: "Ensure you have the latest version of the app installed. If the issue continues, email us with your device model and OS version."
  }
];

const AppSupport = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Wrapper>
      <div className="bg-slate-50/50 min-h-screen pt-20 md:pt-12 pb-24 font-sans">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-8">

          {/* Header Section */}
          <div className="text-left mb-12">
            <span className="text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full">
              App Support
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-4 tracking-tight">
              Accredian App Support
            </h1>
            <p className="text-base md:text-lg text-slate-500 mt-4 leading-relaxed max-w-xl">
              Having trouble with the Accredian app? We're here to help. Whether you can't log in, have a question about your program, or need help navigating a feature - reach out to our support team and we'll get back to you within one-two business days.
            </p>
          </div>

          {/* Grid Layout using max-w-[85rem] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column - FAQ Accordion Section (Col span 8) */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">
                Common Issues & FAQs
              </h2>
              <div className="divide-y divide-slate-100">
                {FAQ_DATA.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex justify-between items-center text-left py-2 text-slate-800 hover:text-blue-600 transition-colors focus:outline-none group"
                      >
                        <span className="font-semibold text-base md:text-lg pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-all duration-200 flex-shrink-0 ${isOpen ? "transform rotate-180 text-blue-600" : ""
                            }`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] mt-3 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-1 pb-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Contact Stack (Col span 4) */}
            <div className="lg:col-span-4 space-y-6">

              {/* Email Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Email Us</h3>
                <p className="text-slate-400 text-xs mb-4 flex-grow">For program support and login issues</p>
                <a
                  href="mailto:support@accredian.com"
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  academics@accredian.com
                </a>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-4">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Call Support</h3>
                <p className="text-slate-400 text-xs mb-4 flex-grow">Direct helpline / WhatsApp chat</p>
                <div className="space-y-1">
                  <a
                    href="tel:+917969547220"
                    className="block text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    +91 7969547220
                  </a>
                  <a
                    href="https://wa.me/917619555873"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-green-600 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-4">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Support Hours</h3>
                <p className="text-slate-400 text-xs mb-4 flex-grow">Our team is active during these hours</p>
                <span className="text-sm font-semibold text-slate-600">
                  Monday – Saturday <br />
                  9:00 AM – 7:00 PM IST
                </span>
              </div>

            </div>

          </div>

          {/* Back Home Link */}
          <div className="text-left mt-12">
            <a
              href="/"
              className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
            >
              ← Back to accredian.com
            </a>
          </div>

        </div>
      </div>
    </Wrapper>
  );
};

export default AppSupport;
