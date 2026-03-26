import "./Info.css";

const InfoNew = () => {
  // Company logos - split into two rows
  const logosRow1 = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/American-Express.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/amazon.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/atlassian.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/shell.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/oracle.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/Accenture.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/deloitte.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/jp-morgan.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/company-images/jio.webp",
  ];

  const logosRow2 = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/google_logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/Microsoft_logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/Adobe_Corporate.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/Walmart-logo.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/cisco.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/intel.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/kpmg.webp",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/Alumni-Companies/Razorpay.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/company-images/paytm.webp",
  ];

  return (
    <div
      id=""
      className="bg-blue-50 py-6 flex flex-col font-circular items-center px-4 overflow-hidden"
    >
      <h4 className="capitalize text-center text-xl lg:text-[28px] mb-3 font-medium leading-tight tracking-tight max-w-4xl">
        Our Alumni Thriving Across the{" "}
        <span className="text-universal"> World's Best </span>
      </h4>

      <div className="logo-carousel-wrapper">
        {/* First Row - Scrolling Right to Left */}
        <div className="logo-carousel-container">
          <div className="logo-carousel logo-carousel-rtl">
            {logosRow1.map((logo, index) => (
              <div key={`row1-1-${index}`} className="logo-item">
                <img src={logo} alt={`Company ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {logosRow1.map((logo, index) => (
              <div key={`row1-2-${index}`} className="logo-item">
                <img src={logo} alt={`Company ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolling Right to Left */}
        <div className="logo-carousel-container">
          <div className="logo-carousel logo-carousel-rtl">
            {logosRow2.map((logo, index) => (
              <div key={`row2-1-${index}`} className="logo-item">
                <img src={logo} alt={`Company ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {logosRow2.map((logo, index) => (
              <div key={`row2-2-${index}`} className="logo-item">
                <img src={logo} alt={`Company ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoNew;
