import React from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useTheme } from "../../context/ThemeContext";

function Theme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme} style={{ cursor: "pointer" }}>
      {theme === "light" ? <DarkModeIcon /> : <WbSunnyIcon />}
    </div>
  );
}

export default Theme;
