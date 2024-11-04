import { useState } from 'react';
import "./navbar.style.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className={`navbar ${isOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ul className="navbar-links">
        <li className="navbar-item">Anasayfa</li>
        <li className="navbar-item">Hakkımızda</li>
        <li className="navbar-item">İletişim</li>
      </ul>
    </div>
  );
};

export default Navbar;