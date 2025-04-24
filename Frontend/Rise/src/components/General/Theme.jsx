import React from "react";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useTheme } from "../../context/ThemeContext";
import "../../App.css";

function Theme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} className="theme-icon" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {theme === "light" ? 
        <WbSunnyIcon sx={{ color:"var(--color-purple)"}} /> : 
        <NightsStayIcon sx={{ color: "var(--color-dark-white)"}} />
      }
    </div>
  );
}

export default Theme;
