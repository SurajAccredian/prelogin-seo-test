// import React, { useState } from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import { MdKeyboardArrowDown } from 'react-icons/md';
// import { Link } from 'react-router-dom';
// import profileLogo from '../../../Assets/images/profileLogo.svg'

// const sections = [
//   {
//     label: 'My Account',
//     href: '/my-account',
//   },
//   {
//     label: 'My Applications',
//     href: '/my-applications',
//   },
//   {
//     label: 'My Courses',
//     href: '/my-courses',
//   },
// ];

// export default function AccodionMyAccount() {
//   const [expanded, setExpanded] = useState(null);

//   const handleChange = (panel) => (event, newExpanded) => {
//     setExpanded(newExpanded ? panel : false);
//   };

//   return (
//     <Accordion
//       expanded={expanded === 'profile'}
//       onChange={handleChange('profile')}
//       className="accordion-parent"
//     >
//       <AccordionSummary
//         aria-controls="panel-content"
//         className="accordion-summary"
//       >
//         <div className="w-full flex items-center justify-between text-lg lg:hidden">
//           <div className="flex items-center gap-2">
//             <img src={profileLogo} className='w-4 h-4' alt="" />
//             <h1 className="font-semibold">Profile</h1>
//           </div>
//           <div className="text-lg">
//             <MdKeyboardArrowDown
//               className={`${
//                 expanded === 'profile' ? 'rotate-180' : 'rotate-0'
//               } transition-all duration-150`}
//             />
//           </div>
//         </div>
//       </AccordionSummary>
//       <AccordionDetails className="accordion-details max-h-[40vh] overflow-y-auto custom-scrollbar">
//         <div className="w-full flex flex-col">
//           {sections.map((section, index) => (
//             <div
//               key={`Section_${index}`}
//               className="w-full py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-md"
//             >
//               <Link
//                 to={section.href}
//                 className="w-full text-base text-neutral-700 hover:text-universal"
//               >
//                 {section.label}
//               </Link>
//             </div>
//           ))}
//         </div>
//       </AccordionDetails>
//     </Accordion>
//   );
// }

import React, { useEffect, useState } from "react";

export default function AccodionMyAccount() {
  const [isCookie, setIsCookie] = useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );
  const [pgdmDashboardStatus, setPgdmDashboardStatus] = useState(false);

  useEffect(() => {
    if (!isCookie) {
      setIsCookie("");
      localStorage.removeItem("token");
    }
  }, [isCookie]);


  useEffect(() => {
    if (isCookie) {
      const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment") || "[]");
      // Case: Only one record AND category = 44
      if (enrollmentDetails.length === 1 && enrollmentDetails[0].category == 44) {
        setPgdmDashboardStatus(true); // or whatever you want to set
      }
    }
  }, [isCookie]);



  const getBaseUrl = () => {
    // return shouldUseNewDashboard()
    //   ? process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL
    //   : process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL;
    return process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL
  };

  const sections = !pgdmDashboardStatus ? [
    {
      label: "Application Tracker",
      href: `${getBaseUrl()}/?tab=my-applications`,
      img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/myApplication.svg",
    },
    {
      label: "Dashboard",
      href: `${getBaseUrl()}/Dashboard`,
      img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/myCourses.svg",
    },
  ] : [];

  return (
    <div className="w-full flex flex-col pt-3">
      {/* <div className="flex items-center gap-2"> */}
      {/* <img src={profileLogo} className='w-4 h-4' alt="Profile logo" /> */}
      {/* <h1 className="font-semibold text-lg">Profile</h1> */}
      {/* </div> */}
      <div className="w-full font-semibold text-lg flex flex-col">
        {sections.map((section, index) => (
          <div
            key={`Section_${index}`}
            className="w-full py-2  cursor-pointer hover:bg-gray-200 rounded-md"
          >
            {/* <a
              to={section.href}
              className="w-full text-neutral-700 hover:text-universal"
            > */}
            <a
              href={section.href}
              className="w-full text-neutral-700 hover:text-universal"
            >
              <div className="flex items-center gap-2">
                <img src={section.img} alt="" className="w-5 h-5" />
                {section.label}
              </div>
            </a>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}
