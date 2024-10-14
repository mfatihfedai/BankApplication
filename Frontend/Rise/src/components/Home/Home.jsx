import React from "react";
import Navbar from "./Navbar/Navbar";
import Credit from "./Credit/Credit";
import SingIn from "../SingIn/SingIn";
import Rates from "./Rates/Rates";
import "./home.style.css";

function Home() {
  return (
    <>
      <div className="parent">
        <p>NihaN için</p>
        <Navbar/>
        <Credit/>
        <SingIn/>
        <Rates/>
      </div>
    </>
  );
}

export default Home;
