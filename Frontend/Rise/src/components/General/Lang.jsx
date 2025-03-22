import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import trFlag from "../../assets/tr.svg"; 
import enFlag from "../../assets/gb.svg"; 
import "./Lang.css";

function Lang() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const changeLanguage = (langKey) => {
    i18n.changeLanguage(langKey);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Dropdown dışına tıklayınca kapanması için
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="language-dropdown" ref={dropdownRef}>
      <div className="selected-language" onClick={toggleDropdown}>
        {i18n.language === "tr" ? (
          <>
            <img src={trFlag} alt="Türkçe" className="flag-icon" /> Türkçe
          </>
        ) : (
          <>
            <img src={enFlag} alt="English" className="flag-icon" /> English
          </>
        )}
      </div>
      {isOpen && (
        <ul className="language-list">
          <li onClick={() => changeLanguage("tr")}>
            <img src={trFlag} alt="Türkçe" className="flag-icon" /> Türkçe
          </li>
          <li onClick={() => changeLanguage("en")}>
            <img src={enFlag} alt="English" className="flag-icon" /> English
          </li>
        </ul>
      )}
    </div>
  );
}

export default Lang;