import React from "react";
import Logos from "../../../assets/LogoNonBackground.png";
import { useTheme } from "../../../context/ThemeContext";
import Theme from "../../General/Theme.jsx";
import Lang from "../../General/Lang.jsx";
import { he } from "date-fns/locale";

function Logo() {
  const { theme } = useTheme();
  return (
    <div className="navbar-container">

      {/* Logo */}
      <div className="logo-container">
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
            color: theme === "dark" ? "var(--color-white)" : "var(--color-blue)",
            letterSpacing: "5px",
            fontSize: "30px",
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
