import { useState } from "react";
import "./navbar.style.css";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Blur overlay */}
      <div className={`blur-overlay ${isOpen ? "active" : ""}`}></div>
<br/>
      {/* Navbar */}
      <div
        className={`navbar ${isOpen ? "open" : ""}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="navbar-links">
          <a href="/">
            <div className="navbar-item">{t("Anasayfa")}</div>
          </a>
          <a href="/about-us">
            <div className="navbar-item">{t("Hakkimizda")}</div>
          </a>
          <a href="/contact">
            <div className="navbar-item">{t("Iletisim")}</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
