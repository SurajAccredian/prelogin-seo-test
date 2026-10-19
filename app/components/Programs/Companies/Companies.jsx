import React from "react";
import "./Companies.css";

const Companies = () => {
  const logosRow1 = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Firstsource.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/GE_Digital_Logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Gartner-Logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/IBM_logo.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Infosys_logo.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/jp-morgan.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Jio.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Logo_kantar.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/MSFT_logo_rgb_C-Gray.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Morgan_Stanley_Logo_1.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Netwest.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Paytm_logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Philips_logo_new.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/PwC_2025_Logo.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Saint%20Gobain.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Syniverse.webp",
  ];

  const logosRow2 = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/ADP-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Amazon_logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Axis-Security.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/BCG_MONOGRAM.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Barclays-Logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Boeing-Logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Cisco_logo.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Cognizant-Logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/DXC.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Delta_logo.svg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/EA.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Edelweiss.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/Verizon.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/bajajcapital.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Section-Images/pine-labs-logo-png_seeklogo-461867.webp"
  ];

  const getCompanyName = (url) => {
    try {
      const filename = url.split("/").pop().replace(/\.(webp|png|svg|jpg)/gi, "");
      const clean = decodeURIComponent(filename)
        .replace(/[_-]+/g, " ")
        .replace(/\b(logo|svg|rgb|gray|new|monogram|seeklogo|\d+)\b/gi, "")
        .replace(/\s+/g, " ")
        .trim();
      return clean ? `${clean} - Accredian Alumni Hiring Partner` : "Top Hiring Partner";
    } catch {
      return "Top Hiring Partner";
    }
  };

  return (
    <>
      <div
        id="top companies"
        className="bg-white py-8 md:py-12 flex flex-col font-circular items-center px-4 overflow-hidden"
      >
        <div className="w-full text-center">
          <h4 className="text-base font-medium">A Track Record of Success</h4>
          <h2 className="text-2xl md:text-3xl mt-2 font-semibold capitalize">
            Our <span className="text-universal">Students</span> Thrive in{" "}
            <span className="text-universal">Top-tier</span> Professions
          </h2>
        </div>

        <div className="companies-carousel-wrapper">
          {/* First Row - Scrolling Right to Left */}
          <div className="companies-carousel-container">
            <div className="companies-carousel-track scroll-right-to-left">
              {logosRow1.map((logo, index) => (
                <div key={`row1-set1-${index}`} className="company-logo-card">
                  <img src={logo} alt={getCompanyName(logo)} loading="lazy" />
                </div>
              ))}
              {logosRow1.map((logo, index) => (
                <div key={`row1-set2-${index}`} className="company-logo-card">
                  <img src={logo} alt={getCompanyName(logo)} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Second Row - Scrolling Left to Right */}
          <div className="companies-carousel-container">
            <div className="companies-carousel-track scroll-left-to-right">
              {logosRow2.map((logo, index) => (
                <div key={`row2-set1-${index}`} className="company-logo-card">
                  <img src={logo} alt={getCompanyName(logo)} loading="lazy" />
                </div>
              ))}
              {logosRow2.map((logo, index) => (
                <div key={`row2-set2-${index}`} className="company-logo-card">
                  <img src={logo} alt={getCompanyName(logo)} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="italic p-3 text-center font-medium">
        <span className="font-semibold text-sm">*Note:</span>{" "}
        <span className="text-gray-500 text-sm md:text-black font-normal md:font-medium">
          All product and company names are trademarks or registered trademarks of
          their respective holders, use of them does not imply any affiliation with
          or endorsement by them.
        </span>
      </p>

    </>
  );
};

export default Companies;
