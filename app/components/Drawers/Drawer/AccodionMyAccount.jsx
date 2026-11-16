"use client";


import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function AccodionMyAccount() {
  const [isCookie, setIsCookie] = useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );
  const [pgdmDashboardStatus, setPgdmDashboardStatus] = useState(false);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!isCookie) {
      setIsCookie("");
      localStorage.removeItem("token");
    }
  }, [isCookie]);


  // useEffect(() => {
  //   if (isCookie) {
  //     // const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment") || "[]");
  //     // // Case: Only one record AND category = 44
  //     // if (
  //     //   enrollmentDetails.length === 1 &&
  //     //   [44].includes(enrollmentDetails[0].category)
  //     // ) {
  //     //   setPgdmDashboardStatus(false);
  //     // }
  //   }
  // }, [isCookie]);



  const getBaseUrl = () => {
    // return shouldUseNewDashboard()
    //   ? process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL
    //   : process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL;
    return process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL
  };

  const decodeJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window.atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error decoding JWT token:", e);
      return null;
    }
  };

  const handleAccessFreeCourses = async (e) => {
    e.preventDefault();

    const token = isCookie || localStorage.getItem("token");
    let email = localStorage.getItem("email");
    let firstname = "";
    let lastname = "";

    if (token) {
      const decoded = decodeJwt(token);
      if (decoded?.data) {
        email = decoded.data.email || email;
        firstname = decoded.data.firstname || "";
        lastname = decoded.data.userlastname || decoded.data.lastname || "";
      }
    }

    if (!firstname && !lastname) {
      const name = localStorage.getItem("name") || "";
      const nameParts = name.trim().split(/\s+/);
      firstname = nameParts[0] || "";
      lastname = nameParts.slice(1).join(" ") || "";
    }

    if (!email) {
      console.error("No email found to fetch Thinkific URL");
      return;
    }

    try {
      const { fetchThinkificUrl } = await import("../../../services/auth.service");
      const url = await fetchThinkificUrl({ email, firstname, lastname });
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("Error fetching Thinkific URL on-the-fly in drawer:", err);
    }
  };

const FREE_COURSE_CATEGORIES = [66, 71];
const isFreeCourseCategory = (cat) => FREE_COURSE_CATEGORIES.includes(Number(cat));

  useEffect(() => {
    if (isCookie) {
      const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment") || "[]");
      const hasFreeCourse = Array.isArray(enrollmentDetails) && enrollmentDetails.some(
        item => isFreeCourseCategory(item.category || item.category_id)
      );
      const hasOtherEnrollment = Array.isArray(enrollmentDetails) && enrollmentDetails.some(
        item => !isFreeCourseCategory(item.category || item.category_id)
      );
      const onlyFreeCourses = hasFreeCourse && !hasOtherEnrollment;

      if (onlyFreeCourses) {
        setSections([
          {
            label: "Access Free Courses",
            href: "#",
            onClick: handleAccessFreeCourses,
            img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/myCourses.svg",
          }
        ]);
      } else if (hasFreeCourse && hasOtherEnrollment) {
        setSections([
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
          {
            label: "Access Free Courses",
            href: "#",
            onClick: handleAccessFreeCourses,
            img: "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/myCourses.svg",
          }
        ]);
      } else {
        setSections(!pgdmDashboardStatus ? [
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
        ] : []);
      }
    }
  }, [isCookie, pgdmDashboardStatus]);

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
              onClick={section.onClick}
              className="w-full text-neutral-700 hover:text-universal"
            >
              <div className="flex items-center gap-2">
                {section.img && (
                  <Image
                    src={section.img}
                    alt={section.label || "Section icon"}
                    width={20}
                    height={20}
                    className="w-5 h-5 flex-shrink-0"
                  />
                )}
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
