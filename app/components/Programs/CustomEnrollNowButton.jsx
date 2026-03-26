import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { userActions } from "../../store/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createApplicationStepTracker } from "../../services/program.service";
import universityUrls from "../Assets/category-urls.json";
import { IoIosArrowForward } from "react-icons/io";
import { programActions } from "../../store/reducers/program";
import toast from "react-hot-toast";
import { decodeToken } from "react-jwt";
import { encodeBase64 } from "../../helpers/encodeTrackerId";
const CustomEnrollNowButton = ({
  className,
  data,
  arrowVisible,
  text,
  ...props
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { authenticated } = useSelector((state) => state.user);

  const { enrollText, trackerId, enrollLoderState } = useSelector(
    (state) => state.program
  );
  const dataCategory = data.category;
  const intCategory = parseInt(dataCategory, 10);
  // console.log(intCategory);
  const url = universityUrls[intCategory];
  // console.log("This component was called");
  // console.log(data.short_university_name);
  const dispatch = useDispatch();

  // Redirecting the user to the specific payment portal
  function openUniversityApp(data, encodedTracker) {
    // Check the current environment
    const isDevelopment = process.env.NODE_ENV === "development";
    // Construct the URL based on the environment
    const url = isDevelopment
      ? `${process.env.NEXT_PUBLIC_PAYMENT_PORTAL_BASE_URL}/?app_id=${encodedTracker}` // Localhost URL for development
      : `https://${data?.id == 'post-graduate-diploma-in-management-for-working-executives' ? 'iimv-pgdm' : data.short_university_name}.accredian.com/?app_id=${encodedTracker}`; // Production URL
    // Open the URL in a new browser tab
    window.open(url, "_blank");
  }

  const loginClick = () => {
    if (width <= 768) {
      handleDrawerLogin();
    } else {
      handleModalLogin();
    }
  };

  // Function for opening the modal in big screens
  const handleModalLogin = () => {
    if (data) {
      //   const redirectUrl = universityUrlsdata.];
      //   console.log(intCategory);
      dispatch(userActions.setRedirectUrl(url));
      dispatch(userActions.setLoginOpenFromProgramPage(intCategory));
      // console.log("The category is " + category);
      // console.log(category);
      // console.log(intCategory);
      // console.log(url);
    }
    dispatch(userActions.openLoginModal("login"));
  };

  // Function for opening the drawer in small screens
  const handleDrawerLogin = () => {
    if (data) {
      //   const redirectUrl = universityUrlsdata.];
      //   console.log(intCategory);
      dispatch(userActions.setRedirectUrl(url));
      dispatch(userActions.setLoginOpenFromProgramPage(intCategory));
      // console.log("The category is " + category);
      // console.log(category);
      // console.log(intCategory);
      // console.log(url);
    }
    dispatch(userActions.setDrawerState(true));
  };

  // TO create user steptracker
  const createUserStepTracker = async (id, category) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(programActions.setEnrollLoaderState(true));
      const myDecodedToken = decodeToken(token);
      const id = myDecodedToken.data.user_id;
      const dataCategory = data.category;
      try {
        const payload = {
          id,
          category: dataCategory,
          universityName: data.short_university_name,
        };
        const response = await createApplicationStepTracker(payload);

        if (response) {
          dispatch(programActions.setEnrollText("Continue Application"));
          // console.log(response);
          dispatch(programActions.setTracker(response.data));
          // console.log(trackerId);
          const encodedTracker = encodeBase64(response.data);
          openUniversityApp(data, encodedTracker);
          // window.open(
          //   `https://${data.short_university_name}.accredian.com/?app_id=${encodedTracker}`,
          //   "_blank"
          // );
        }
      } catch (error) {
        console.log("Error : " + error);
        // dispatch(programActions.setEnrollText("Continue Application"));
        window.open(
          `https://${data.short_university_name}.accredian.com/`,
          "_blank"
        );
        // if (error.response.data) {
        // toast.error(error.response.data.feedback, { position: "top-right" });
        // } else {
        // toast.error(
        //   "Sorry, there seems to be a glitch! Please retry after a moment. Thank you for your patience!",
        //   { position: "top-right" }
        // );
        // }
      } finally {
        // setLoading(false);
        dispatch(programActions.setEnrollLoaderState(false));
      }
    } else {
      toast.error("Login Required to enroll in a course", {
        position: "top-right",
      });
      console.log("Login Is required");
    }
  };

  const handleEnrollNow = () => {
    if (data?.external_enroll) {
      window.open(data.external_enroll, "_blank");
    } else {
      if (authenticated) {
        if (enrollText === "Continue Application") {
          // const traker_id = localStorage.getItem("tracker");
          // console.log(trackerId);
          const encodedTracker = encodeBase64(trackerId);
          // console.log("Encoded Tracker" + encodedTracker);
          openUniversityApp(data, encodedTracker);
          // window.open(
          //   `https://${data.short_university_name}.accredian.com/?app_id=${encodedTracker}`,
          //   "_blank"
          // );
        } else if (enrollText === "Continue Learning") {
          window.open(`${process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL}/`, "_blank");
          // setLoading(true);
          // dispatch(programActions.setEnrollLoaderState(true))
        } else {
          createUserStepTracker();
        }
      } else {
        loginClick();
      }
    }
  };

  // const isDisabled =
  //   enrollLoderState ||
  //   [
  //     "pg-certificate-program-in-data-science",
  //     "pg-certificate-program-in-ai-for-leaders",
  //     "pg-certificate-program-in-data-science-ai",
  //   ].includes(data.id);

  return (
    <button
      // disabled={enrollLoderState || data?.external_enroll === 'disabled'}
      disabled={enrollLoderState}
      onClick={handleEnrollNow}
      className={`${className}`}
      {...props}
    >
      {enrollLoderState ? (
        <CircularProgress
          size={24}
          sx={{ color: "#1A73E8" }} // Set spinner color
        />
      ) : (
        <>
          {enrollText === "" ? text : enrollText}
          {arrowVisible && <IoIosArrowForward />}
        </>
      )}
    </button>
  );
};

export default CustomEnrollNowButton;
