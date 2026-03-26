"use client";

import { useParams } from "next/navigation";
// import { ProgramWrapper } from "../Wrappers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { programActions } from "../../store/reducers/program";
import { useSelector } from "react-redux";
// import { ExtraPoints, Hero, Transition, Billing, CTA, Admission, FAQ, USP, Curriculum, Companies, Certificate, Projects, Related, Info, Overview, Faculty, Tools } from "./"

import "./Programs.css";
// import Line from "./generals/line";
import NotFound from "../NotFound/NotFound";
import GetBrochure from "../Modals/call-to-actions/get-brochure";
import EnrollNow from "../Modals/call-to-actions/enroll-now";
import SkeletonWL from "../Skeleton/Withoutlogin";
import Wrapper from "./wrapper";

const Programs = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, state, brochureState, enrollState } = useSelector(state => state.program);

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const { default: file } = await import(`./../Assets/programs/${id}.json`);
        dispatch(programActions.setData(file));
        dispatch(programActions.setState("success"));
      } catch (error) {
        console.error('Error loading file:', error);
        dispatch(programActions.setData(null));
        dispatch(programActions.setState("failed"));
      }
    };

    fetchFileData();
  }, [id, dispatch]);

  return (
    <>
      {state === "pending" ? (
        <SkeletonWL />
      ) : state === "success" && data ? (
        <Wrapper data={data} />
      ) : (
        <NotFound />
      )}
      {brochureState && (
        <GetBrochure open={brochureState} />
      )}
      {enrollState && (
        <EnrollNow open={enrollState} />
      )}
    </>
  );
};

export default Programs;
