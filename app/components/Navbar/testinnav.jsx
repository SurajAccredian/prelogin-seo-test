"use client"
import React, { useEffect, useState } from "react";
import Navbar3 from "./MainNavbar";

function Testingnavbar(props) {

  useEffect(() => {
    // //console.log(auth)
    var user_id = localStorage.getItem("user_id");
    setUser(user_id);
  }, []);
  const [user, setUser] = useState(null);

  return (
    <Navbar3 />
  );
}
export default Testingnavbar;