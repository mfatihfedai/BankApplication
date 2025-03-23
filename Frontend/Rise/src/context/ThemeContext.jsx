import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    document.body.className = theme;

    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.style.background = "#0f1214"; // Dark mode'da arka plan rengi
      htmlElement.style.backgroundImage = "none"; // Arka plan resmini kaldır
    } else {
      htmlElement.style.background = 
        "linear-gradient(rgb(255, 255, 255), rgba(255, 255, 255, 0.678)), url('https://t3.ftcdn.net/jpg/05/31/74/50/360_F_531745035_JqfSNBmPT7gu1DPqQZ9YEiYt175oYczd.webp')";
      htmlElement.style.backgroundRepeat = "no-repeat";
      htmlElement.style.backgroundSize = "cover";
      htmlElement.style.backgroundPosition = "center";
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
