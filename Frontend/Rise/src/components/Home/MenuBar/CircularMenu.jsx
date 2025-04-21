import React, { useState, useEffect } from "react";
import { useMenuItems } from "../../Core/useMenuItems";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import "./CircularMenu.css";

const CircularMenu = ({ userType = "user" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);
  const { adminList, userList } = useMenuItems();
  const menuItems = userType === "admin" ? adminList : userList;
  const { user } = useUser();

  const radius = 140; // Çemberin yarıçapı (px)

  const handleNavigation = (component) => {
    // Kullanıcı yoksa veya rol eşleşmiyorsa ana sayfaya yönlendir
    if (!user || (userType === "admin" && user.role !== "admin")) {
      return <Navigate to="/" replace />;
    }
    // Yönlendirme korumalı bir şekilde yapılır
    return <Navigate to={`/protected/${component}`} replace />;
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
          {menuItems.map((item, index) => {
            const angle = (2 * Math.PI * index) / menuItems.length; // Her öğe için açı hesaplama
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
                  onClick={() => handleNavigation(item.returnComponent)}
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