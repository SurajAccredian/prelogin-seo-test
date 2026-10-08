import React, { useCallback, useEffect, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ExploreDropDown from "./ExploreDropdown/ExploreDropDown";
import "./Navbar.css";
import { IoIosArrowDown } from "react-icons/io";
import {
  useDisclosure,
  ChakraProvider,
  PopoverContent,
  PopoverTrigger,
  Popover,
  Avatar,
} from "@chakra-ui/react";
import { NAV_ITEMS } from "../Assets/constants";
import NavItem from "./NavItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/user";
import LoginModal from "../Modals/LoginModal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Ham from "../Drawers/Drawer/Ham";
import ExploreDrawer from "../Drawers/Drawer/ExploreDrawer";
import Authdrawer from "../Drawers/Auth Drawers/Authdrawer";
import GlobalSearch from "./GlobalSearch/GlobalSearch";

export const shouldUseNewDashboard = () => {
  const enrollmentStatus = localStorage.getItem("enrollmentStatus");
  const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment"));
  if (
    !enrollmentStatus ||
    !enrollmentDetails ||
    enrollmentDetails.length === 0
  ) {
    return false;
  }

  const allowedCategories = [22, 4]; // add more if needed
  const allowedPrograms = [69, 43, 42, 60, 88]; // add more if needed
  const allowedBatches = [123, 116, 103, 133, 134];

  const status = enrollmentDetails.some((enrollment) => {
    return (
      allowedCategories.includes(enrollment.category) &&
      allowedPrograms.includes(enrollment.program_id) &&
      allowedBatches.includes(enrollment.batch_id)
    );
  });

  // Check if any enrollment matches the specific criteria
  return status;
};

export default function Navbar() {
  const [isOpenHam, setIsOpenHam] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [pgdmDashboardStatus, setPgdmDashboardStatus] = useState(false);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isCookie, setIsCookie] = useState(
    typeof document !== "undefined"
      ? document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1")
      : ""
  );
  const [filepath, setFilepath] = useState("");
  const [profile_var, setProfile_var] = useState(null);

  useEffect(() => {
    setIsCookie(
      document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      ),
    );
    setFilepath(localStorage.getItem("profileURL") || "");
    setProfile_var(localStorage.getItem("profile"));
  }, []);

  const [thinkificUrl, setThinkificUrl] = useState("");
  const [hasCategory66, setHasCategory66] = useState(false);
  const [onlyCategory66, setOnlyCategory66] = useState(false);

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

  useEffect(() => {
    if (isCookie) {
      const enrollmentDetails = JSON.parse(localStorage.getItem("enrollment") || "[]");

      const is66 = enrollmentDetails &&
  enrollmentDetails.some(
    item => Number(item.category) === 66 || Number(item.category) === 71
  );
     setHasCategory66(is66);

const isOnly66 =
  enrollmentDetails &&
  enrollmentDetails.length === 1 &&
  (
    Number(enrollmentDetails[0].category) === 66 ||
    Number(enrollmentDetails[0].category) === 71
  );
  setOnlyCategory66(isOnly66);
   
  if (is66) {
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

        if (email) {
          import("../../services/auth.service").then(({ fetchThinkificUrl }) => {
            fetchThinkificUrl({ email, firstname, lastname })
              .then((url) => {
                if (url) {
                  setThinkificUrl(url);
                }
              })
              .catch((err) => console.log("Error fetching thinkific URL on mount:", err));
          });
        }
      }
    }
  }, [isCookie]);

  // redux used for model opening and
  const dispatch = useDispatch();
  const { authType, redirectUrl, authenticated, openLoginDrawerState } =
    useSelector((state) => state.user);
  // console.log("Auth Type:", authType);

  const handleLoginClick = () => {
    dispatch(userActions.setRedirectUrl(`${(process.env.NEXT_PUBLIC_BASE_URL || "/")}`));
    dispatch(userActions.setLoginOpenFromProgramPage(null));
    dispatch(userActions.openLoginModal("login"));
  };

  useEffect(() => {
    if (!isCookie) {
      setIsCookie("");
      localStorage.removeItem("token");
    }
  }, [isCookie]);

  // useEffect(()=>{
  //   if (authenticated) {
  //     window.location.reload();
  //   }
  // }, [authenticated])

  // useEffect(() => {
  //   if (isCookie) {
  //     const enrollmentDetails = JSON.parse(
  //       localStorage.getItem("enrollment") || "[]",
  //     );
  //     // Case: Only one record AND category = 44
  //     if (
  //       enrollmentDetails.length === 1 &&
  //       [44].includes(enrollmentDetails[0].category)
  //     ) {
  //       setPgdmDashboardStatus(false);
  //     }
  //   }
  // }, [isCookie]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const authStatus = url.searchParams.get("auth_ref");
    const loginRedirect = url.searchParams.get("loginref");
    if (authStatus || loginRedirect) {
      loginClick();
      setTimeout(() => {
        url.searchParams.delete("auth_ref");
        url.searchParams.delete("loginref");
        window.history.replaceState(null, "", url);
      }, 1000);
    }
  }, []);

  // const openModel = () => {
  //   setIsOpenModel(true);
  // };
  // const closeLoginModel = () => {
  //   setIsOpenModel(false); // Function to close the login model
  // };

  // const fetchData = useCallback(async () => {
  //   await axios({
  //     method: "post",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       "Content-Type": "application/json",
  //     },
  //     url: `${process.env.NEXT_PUBLIC_API_ENDPOINT_NODE_PRODUCTION_DASHBOARD}/profile/profileDetails`,
  //     data: {
  //       user_id: localStorage.getItem("user_id"),
  //     },
  //   })
  //     .then((res) => {
  //       // console.log(res);
  //       if (res.data.status == "300") {
  //         setFilepath("");
  //       } else {
  //         localStorage.setItem("profileURL", res.data[0].filename);
  //         setFilepath(res.data[0]?.filename);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  // useEffect(() => {
  //   if (!localStorage.getItem("profileURL")) {
  //     fetchData();
  //   }
  // }, [profile_var, fetchData]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: authIsOpen,
    onOpen: onAuthOpen,
    onClose: authOnClose,
  } = useDisclosure();
  // const {}
  // const {
  //   isOpen: myAccountIsOpen,
  //   onOpen: myAccountOnOpen,
  //   onClose: myAccountOnClose,
  // } = useDisclosure();

  // const onMyAccountClick = () => {
  //   console.log("I got clicked");
  //   setIsOpenHam(false);
  //   myAccountOnOpen();
  // };

  const loginClick = () => {
    if (width <= 768) {
      openLoginDrawer();
    } else {
      handleLoginClick();
    }
  };
  const handleClick = () => {
    onOpen();
  };
  const openLoginDrawer = () => {
    dispatch(userActions.setRedirectUrl(`${(process.env.NEXT_PUBLIC_BASE_URL || "/")}`));
    dispatch(userActions.setLoginOpenFromProgramPage(null));
    dispatch(userActions.setDrawerState(true));
  };
  const closeLoginDrawer = () => {
    // dispatch(userActions.setRedirectUrl(`${(process.env.NEXT_PUBLIC_BASE_URL || "/")}`));
    // dispatch(userActions.setLoginOpenFromProgramPage(null))
    dispatch(userActions.setDrawerState(false));
  };
  const router = useRouter();

  const LogOut = (name, domain) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
    console.log(document.cookie);
    localStorage.removeItem("user_id");
    localStorage.clear();
    dispatch(userActions.setAuthenticatedState(false));
    // setIsCookie(false);
    // setUserInfo("");
    // navigate(`/Login`);
    // navigate('/')
    window.location.href = (process.env.NEXT_PUBLIC_BASE_URL || "/");
  };

  // Get the appropriate base URL
  const getBaseUrl = () => {
    // return shouldUseNewDashboard()
    //   ? process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL
    //   : process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL;
    return process.env.NEXT_PUBLIC_NEW_DASHBOARD_BASE_URL;
  };

  const handleAccessFreeCourses = async (e) => {
    e.preventDefault();
    if (thinkificUrl) {
      window.open(thinkificUrl, "_blank", "noopener,noreferrer");
      return;
    }

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
      const { fetchThinkificUrl } = await import("../../services/auth.service");
      const url = await fetchThinkificUrl({ email, firstname, lastname });
      if (url) {
        setThinkificUrl(url);
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error("Error fetching Thinkific URL on-the-fly:", err);
    }
  };

  return (
    <>
      <div className="nav-3 flex justify-center py-[0.6rem] w-full px-4 xl:px-12" data-lenis-prevent>
        <div className="nav-3-inner">
          <div className="nav-3-left">
            <Link href={"/"} prefetch={false} style={{ textDecoration: "none" }}>
              <div className="max-w-[125px] w-full">
                <img
                  src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/logo.webp"
                  alt="Accredian logo"
                  width="358"
                  height="105"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </Link>
            <ExploreDropDown />
            <div className="hidden md:flex justify-center flex-1 max-w-[320px] lg:max-w-[360px] xl:max-w-[400px] rounded-md">
              <GlobalSearch />
            </div>
          </div>
          <div className="nav-3-right">
            <div className="nav-3-right-inner">
              <ChakraProvider>
                {NAV_ITEMS.map((item, index) => (
                  <NavItem key={`nav_item_parent_key_${index}`} item={item} />
                ))}
              </ChakraProvider>
            </div>
            {isCookie ? (
              <div className="xl:flex hidden">
                <ChakraProvider>
                  <Popover trigger="hover" openDelay={100}>
                    <PopoverTrigger>
                      <div className="flex items-center gap-2 max-w-[160px] cursor-pointer hover:bg-blue-200/30 py-2 px-3 rounded-md">
                        <Avatar
                          bg="#1A73E8"
                          size={"sm"}
                          src={filepath ? filepath : ""}
                        />
                        <h2 className="font-medium truncate">
                          {localStorage.getItem("name")}
                        </h2>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent top={3} className="pop-content-user">
                      {/* 1. Only Free Course Enrollment */}
                      {onlyCategory66 && (
                        <>
                          <a
                            href="#"
                            onClick={handleAccessFreeCourses}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full flex items-center gap-2"
                          >

                            <h2 className="font-medium capitalize">
                              Access Free Courses
                            </h2>
                          </a>
                        </>
                      )}

                      {/* 2. Both Types of Enrollments */}
                      {hasCategory66 && !onlyCategory66 && (
                        <>
                          <a
                            href={`${getBaseUrl()}/?tab=my-applications`}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full"
                          >
                            <h2 className="font-medium capitalize">
                              Application Tracker
                            </h2>
                          </a>

                          <a
                            href={`${getBaseUrl()}/Dashboard`}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full"
                          >
                            <h2 className="font-medium capitalize">
                              Dashboard
                            </h2>
                          </a>

                          <a
                            href="#"
                            onClick={handleAccessFreeCourses}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full flex items-center gap-2"
                          >
                            <h2 className="font-medium capitalize">
                              Access Free Courses
                            </h2>
                          </a>
                        </>
                      )}

                      {/* 3. Standard Enrollments Only */}
                      {!hasCategory66 && !pgdmDashboardStatus && (
                        <>
                          <a
                            href={`${getBaseUrl()}/?tab=my-applications`}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full"
                          >
                            <h2 className="font-medium capitalize">
                              Application Tracker
                            </h2>
                          </a>

                          <a
                            href={`${getBaseUrl()}/Dashboard`}
                            className="py-2 px-4 hover:text-universal hover:bg-universal/15 rounded-md cursor-pointer w-full"
                          >
                            <h2 className="font-medium capitalize">
                              Dashboard
                            </h2>
                          </a>
                        </>
                      )}
                      <button
                        className="py-2 px-4 hover:text-red-500 text-start hover:bg-red-400/30 rounded-md cursor-pointer"
                        onClick={() => {
                          LogOut("token", "accredian.com");
                        }}
                      >
                        <h2 className="font-medium capitalize">Logout</h2>
                      </button>

                      {!hasCategory66 && (
                        <a
                          href={`${(process.env.NEXT_PUBLIC_BASE_URL || "/")}/referandearn`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/dropDownBanner-v2.webp"
                            className="w-[240px]"
                            alt="Refer and earn banner"
                          />
                        </a>
                      )}
                    </PopoverContent>
                  </Popover>
                </ChakraProvider>
              </div>
            ) : (
              <div className="hidden xl:flex items-center justify-center gap-[1rem]">
                {/* <Link to="/login">
                  <button className=" px-[18px] py-[8px] bg-slate-400/20 rounded-md font-medium text-base text-nowrap">
                    Login
                  </button>
                </Link> */}

                {/* TO open the login model I have used dispatch */}
                <button
                  onClick={handleLoginClick}
                  className="px-[18px] py-[8px] bg-universal hover:bg-darkBlue text-white rounded-md font-medium text-base text-nowrap"
                >
                  Login
                </button>
                {/* </Link> */}
                {/* <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://trial.accredian.com"
                  className="lg:block hidden"
                >
                  <button className="px-[18px] py-[8px] bg-universal hover:bg-darkBlue text-white rounded-md font-medium text-base text-nowrap">
                    Try for free
                  </button>
                </a> */}
              </div>
            )}
            <button
              className="explore-2  bg-universal text-white md:hidden flex items-center gap-1 font-medium px-3 py-1 rounded-sm"
              onClick={() => handleClick()}
            >
              Courses
              <IoIosArrowDown className="-rotate-90" />
            </button>
            <HiOutlineMenuAlt3
              size={28}
              className="text-neutral-800 xl:hidden block cursor-pointer"
              onClick={() => setIsOpenHam(!isOpenHam)}
            />
          </div>
        </div>
      </div>
      <Ham
        onLoginClick={loginClick}
        // onLoginClick={setIsLoginOpen}
        isLoginOpen={isLoginOpen}
        LogOut={LogOut}
        // userInfo={userInfo}
        loginStatus={isCookie}
        isOpen={isOpenHam}
        setIsOpen={setIsOpenHam}
      // openMyAccountDrawer={onMyAccountClick}
      />
      {/* <AccountDrawer isOpen={myAccountIsOpen} onClose={myAccountOnClose} /> */}
      <ExploreDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
      <Authdrawer isOpen={openLoginDrawerState} onClose={closeLoginDrawer} />

      {/* TO close the login model redux is used */}
      <div>
        {authType && (
          <LoginModal open={authType !== null && authType !== "loginsuccess"} />
        )}
      </div>
      {/* <div className="hidden" > */}
      {/* <LoginDrawer />
      </div> */}
    </>
  );
}
