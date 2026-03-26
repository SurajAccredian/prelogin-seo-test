import React from "react";
import Wrapper from "../Wrapper/HomePageWrapper.jsx";
import GetInTouch from "./components/GetInTouch.jsx";
// import { Wrapper } from "../Wrappers";
const ContactUs = () => {
  return (
    <>
      <Wrapper>
        <div className="font-circular">
          <GetInTouch />
        </div>
      </Wrapper>
    </>
  );
};

export default ContactUs;
