"use client";

import React, { useEffect } from "react";
import Wrapper from "../Wrapper/HomePageWrapper";

export default function MasterFaq() {
  useEffect(() => {
    document.title = "Master FAQ | Accredian";
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const items = [
    {
      title: "Program Pre-Requisites",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Program-Pre-Requisites.webp",
      mobileImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/output-onlinepngtools-2.webp",
      width: "w-[149px]",
    },
    {
      title: "Admissions",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Admissions.webp",
      mobileImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq.webp",
      width: "w-[149px]",
    },
    {
      title: "Programs",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Programs.webp",
      mobileImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq-2.webp",
      width: "w-[195px]",
    },
    {
      title: "Fee & Scholarships",
      image:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/FAQ/Fee-Scholarships.webp",
      mobileImage:
        "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/tools-images/master-faq-3.webp",
      width: "w-[149px]",
    },
  ];

  return (
    <Wrapper>
      <div className="pt-4 pb-12 max-w-[85rem] mx-auto px-4 sm:px-6">
        <h1 className="text-black font-bold text-[25px] mb-1.5">
          FAQ
        </h1>
        <h2 className="text-black font-bold text-[20px] mb-1.5">
          What are you looking for ?
        </h2>
        <p className="text-black text-[17px] mb-8">
          Search for answers to your questions below.
        </p>

        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className={`${item.width} pt-3 pb-2 object-contain`}
              />
              <h3 className="text-black font-bold text-[20px] text-center mb-1.5">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Grid */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.mobileImage}
                alt={item.title}
                className={`${item.width} pt-3 pb-2 object-contain`}
              />
              <h3 className="text-black font-bold text-[20px] text-center mb-1.5">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}
