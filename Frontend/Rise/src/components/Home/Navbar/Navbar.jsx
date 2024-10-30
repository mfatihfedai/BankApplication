
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#home">Anasayfa</a></li>
        <li><a href="#services">Hizmetler</a></li>
        <li><a href="#about">Hakkımızda</a></li>
        <li><a href="#contact">İletişim</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
