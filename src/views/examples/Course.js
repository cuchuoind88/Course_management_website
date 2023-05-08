import IndexNavbar from "components/Navbars/IndexNavbar";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
export default function Course() {
  const LXCstate = useSelector((state) => state);
  return LXCstate.auth.username ? (
    <>
      <IndexNavbar />
      <div>COURSE</div>
    </>
  ) : (
    <Redirect to="/home" />
  );
}
