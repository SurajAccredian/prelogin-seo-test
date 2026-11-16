"use client";

import { useParams } from "next/navigation";
// import { ProgramWrapper } from "../Wrappers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { programActions } from "../../../store/reducers/program";
import { useSelector } from "react-redux";
// import { ExtraPoints, Hero, Transition, Billing, CTA, Admission, FAQ, USP, Curriculum, Companies, Certificate, Projects, Related, Info, Overview, Faculty, Tools } from "./"

// import "./Programs.css";
// import Line from "./generals/line";
// import GetBrochure from "../Modals/call-to-actions/get-brochure";
// import EnrollNow from "../Modals/call-to-actions/enroll-now";
// import SkeletonWL from "../Skeleton/Withoutlogin";
import Wrapper from "./wrapper";
import NotFound from "../../NotFound/NotFound";
import dynamic from "next/dynamic";

const GetBrochure = dynamic(() => import("../../Modals/call-to-actions/get-brochure"), { ssr: false });
const EnrollNow = dynamic(() => import("../../Modals/call-to-actions/enroll-now"), { ssr: false });

const MainVerticals = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { data, state, brochureState, enrollState } = useSelector(
    (state) => state.program
  );

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const sanitizedCategory = decodeURIComponent(category).replace(/-/g, " ").toLowerCase();

        const { verticalsData } = await import("../../Assets/verticals");
        const file = verticalsData[sanitizedCategory];

        if (!file) throw new Error("Vertical missing in registry for: " + sanitizedCategory);

        dispatch(programActions.setData(file));
        dispatch(programActions.setState("success"));
      } catch (error) {
        dispatch(programActions.setData(null));
        dispatch(programActions.setState("failed"));
      }
    };

    fetchFileData();
  }, [category, dispatch]);

  return (
    <>
      {state === "pending" ? (
        // <SkeletonWL />
        <></>
      ) : state === "success" && data ? (
        <Wrapper data={data} />
      ) : (
        <NotFound />
      )}
      {brochureState && <GetBrochure open={brochureState} />}
      {enrollState && <EnrollNow open={enrollState} />}
    </>
  );
};

export default MainVerticals;
