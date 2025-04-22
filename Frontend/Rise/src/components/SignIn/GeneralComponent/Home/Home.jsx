import React from "react";
import "react-calendar/dist/Calendar.css";  
import "./Home.style.css"
import ReceiptTable from "./ReceiptTable";
import LogsInfoTable from "./LogsInfoTable";
import PersonalInfoTable from "./PersonalInfoTable";

function Home() {

  return (
    
    <div className="persorece">
      <div id="personal" >
        <PersonalInfoTable />
      </div>
      <div id="receipt"> 
        <LogsInfoTable />
        <ReceiptTable />
      </div>
    </div>
   
  );
}

export default Home;
