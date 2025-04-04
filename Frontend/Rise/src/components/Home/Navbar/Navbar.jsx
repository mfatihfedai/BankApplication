import { useState } from "react";
import "./navbar.style.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="navbar-item">Anasayfa</div>
          </a>
          <a href="/about-us">
            <div className="navbar-item">Hakkımızda</div>
          </a>
          <a href="/contact">
            <div className="navbar-item">İletişim</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
