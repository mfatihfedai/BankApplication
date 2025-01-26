import React from "react";
import "react-calendar/dist/Calendar.css";  
import "./Home.style.css"
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ReceiptTable from "./ReceiptTable";

function Home() {

  return (
    <>
    <div >
      <PersonalInfo />
      <ReceiptTable />
    </div>
    </>
  );
}

export default Home;
