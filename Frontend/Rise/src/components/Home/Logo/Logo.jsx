import React from "react";
import Logos from "../../../assets/LogoNonBackground.png";
import { useTheme } from "../../../context/ThemeContext";

function Logo() {
  const { theme } = useTheme();
  return (
    <div style={{}}>
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
  );
}

export default Logo;
