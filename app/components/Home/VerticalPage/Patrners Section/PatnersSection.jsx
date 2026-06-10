import React from "react";

import { useSelector } from "react-redux";

import Patners from "./Patners.css";

const Partners = () => {
  const { data } = useSelector((state) => state.program);
  const universitiesURL = {
    iitg: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iitg.webp",
    iimv: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/iim-v.webp",
    spj: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/spjain-logo-new.webp",
    xlri: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/XLRI-v3.webp",
    iitk: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/iit-kanpur-logo-v3.webp",
    "iim-trichy":
      "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/IIMT-V-v2.webp",
    iiml: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/logo/IIML-LOGO-v4.webp",
  };

  const partnerURLs = data?.patners?.map((partner) => ({
    university: partner,
    url: universitiesURL[partner],
  }));
  return (
    <div className=" w-full flex justify-center py-12 xl:px-12 px-4">
      <div className="w-full max-w-[85rem]">
        <div className="w-full text-center  capitalize">
          <h4 className="text-base font-medium">
            Our
            <span className="text-universal"> Educational Partners</span>
          </h4>
          <h1 className="text-2xl md:text-3xl mt-2 font-semibold ">
            Learn from the{" "}
            <span className="text-universal"> Best Institutions</span> in India
          </h1>
        </div>

        {/* <div className="flex"> */}
        <div className="flex justify-center items-center gap-16 py-10 flex-wrap">
          {partnerURLs?.map((partner, index) => (
            <div
              key={index}
              className="w-[150px] h-[50px] flex justify-center items-center overflow-hidden"
            >
              <img
                className="object-contain w-full h-full"
                src={partner.url}
                alt={partner.university}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
