import React from "react";
import Logos from "../../../assets/LogoNonBackground.png";
import Theme from "../../General/Theme.jsx";
import Lang from "../../General/Lang.jsx";
import "./Logo.css";

function Logo() {
  return (
    <div className="navbar-container">

      {/* Logo */}
      <div className="logo-containers">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
            color: "var(--color-logo)",
            letterSpacing: "5px",
            fontSize: "30px",
            fontWeight: "600",
            marginBottom: "0px",
          }}
        >
          <img src={Logos} alt="Logo" className="logos" />
          PRISMA
        </h1>
      </div>
      
      {/* Dil seçimi ve tema butonu */}
      <div className="lang-theme-container">
        <Lang />
        <Theme />
      </div>
    </div>
  );
}

export default Logo;
