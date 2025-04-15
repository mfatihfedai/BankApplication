import { createContext, useContext, useEffect, useState } from "react";
import darkPhoto from "../assets/dark-page-background.jpg";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.body.className = theme;

    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.style.background = 
      `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${darkPhoto})`;
      //htmlElement.style.backgroundImage = "none"; // Arka plan resmini kaldır
      htmlElement.style.backgroundRepeat = "no-repeat";
      htmlElement.style.backgroundSize = "cover";
      htmlElement.style.backgroundPosition = "center";
      htmlElement.style.backgroundAttachment = "fixed";
    } else {
      htmlElement.style.background = 
        "linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.2)), url('https://t3.ftcdn.net/jpg/05/31/74/50/360_F_531745035_JqfSNBmPT7gu1DPqQZ9YEiYt175oYczd.webp')";
        htmlElement.style.backgroundRepeat = "no-repeat";
        htmlElement.style.backgroundSize = "cover";
        htmlElement.style.backgroundPosition = "center";
        htmlElement.style.backgroundAttachment = "fixed";
      }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return context;
};
