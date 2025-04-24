import React, { useState, useEffect } from "react";
import "./CircularMenu.css";
import { useAdminMenu } from "../../../context/AdminMenuContext";

const CircularMenu = ({ setMenuOpen, list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const { componentName, setComponentName } = useAdminMenu();

  const radius = window.innerWidth < 768 ? 120 : 160; // Çemberin yarıçapı (px)

  const handleClick = (e) => {
    setComponentName(e);
    setIsOpen(false);
    setShowItems(false);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setShowItems(true), 500); // `nav` animasyonu tamamlandıktan sonra
    } else {
      setShowItems(false); // Menü kapandığında li öğelerini gizle
    }
  };

  const handleOutsideClick = (e) => {
    if (isOpen && !e.target.closest(".nav")) {
      setIsOpen(false);
      setShowItems(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Arka planın flu olması */}
      {isOpen && <div className="blur-overlayy"></div>}
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <input
          id="menu"
          type="checkbox"
          checked={isOpen}
          onChange={handleMenuToggle}
        />
        <button htmlFor="menu" onClick={handleMenuToggle}>
          Menu
        </button>
        <ul className="menu">
          {list.map((item, index) => {
            const angle = (2 * Math.PI * index) / list.length; // Her öğe için açı hesaplama
            const top = showItems ? `${-radius * Math.cos(angle)}px` : "0px";
            const left = showItems ? `${radius * Math.sin(angle)}px` : "0px";

            return (
              <li
                key={index}
                style={{
                  top,
                  left,
                  transitionDelay: showItems ? `${0.05 * index}s` : "0s",
                }}
              >
                <a
                  onClick={() => handleClick(item.returnComponent)} key={index}
                  style={{ cursor: "pointer" }}
                >
                  <span style={{ opacity: showItems ? 1 : 0 }}>{item.header}</span>
                  {item.startIcon}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default CircularMenu;