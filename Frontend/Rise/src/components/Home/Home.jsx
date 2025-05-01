import Navbar from "./Navbar/Navbar";
import Credit from "./Credit/Credit";
import SignIn from "./SignIn/SignIn";
import Rates from "./Rates/Rates";
import "./home.style.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import Theme from "../General/Theme";
import Lang from "../General/Lang";

function Home() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false); // Menü aç/kapat
  const [menuVisible, setMenuVisible] = useState(false);
  const [menusOpen, setMenusOpen] = useState(false);
  const signInsRef = useRef(null);
  const signInRef = useRef(null);
  const creditRatesRef = useRef(null);
  const creditRef = useRef(null);
  const ratesRef = useRef(null);
  const sectionsRef = [creditRef, signInRef, ratesRef];
  const currentIndex = useRef(0); // aktif bölüm indeksi
  const scrollCooldown = useRef(false);

  const handleToggleMenu = () => {
    if (!menuVisible) {
      setMenuVisible(true);
      setTimeout(() => setMenusOpen(true), 10); // DOM’a görünür olduktan sonra animasyonu başlat
    } else {
      setMenusOpen(false);
      setTimeout(() => setMenuVisible(false), 50); // animasyon süresi kadar bekle, sonra DOM’dan kaldır
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWheel = (event) => {
    const scrollTop = window.scrollY;
    if (event.deltaY > 0) {
      // Fare tekerleği aşağı döndüğünde giriş bölümüne kaydır
      signInsRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (event.deltaY < 0 && scrollTop > 0) {
      // Fare tekerleği yukarı döndüğünde kredi ve kurlar bölümüne kaydır
      creditRatesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWheels = (event) => {
    if (scrollCooldown.current) return;

    scrollCooldown.current = true;
    setTimeout(() => {
      scrollCooldown.current = false;
    }, 70); // Scroll arası bekleme süresi

    if (event.deltaY > 0 && currentIndex.current < sectionsRef.length - 1) {
      currentIndex.current += 1;
    } else if (event.deltaY < 0 && currentIndex.current > 0) {
      currentIndex.current -= 1;
    }

    const nextSection = sectionsRef[currentIndex.current];
    nextSection.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollIndicatorClick = () => {
    if (signInRef.current) {
      signInRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollIndicatorClicks = () => {
    if (signInsRef.current) {
      signInsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="parent-header">
        <div></div>
        <div>{t("KrediHesaplama")}</div>
        <div>{t("GirisYap")}</div>
        <div>{t("GuncelKurlar")}</div>
      </div>
      <div className="parent">
        <Navbar />
        <Credit />
        <SignIn />
        <Rates />
      </div>
      <div className="parentTablet"  onWheel={handleWheel} ref={creditRatesRef}>
        <button
          className={`hamburger-menus ${menuOpen ? "open" : ""}`}
          onClick={() => {setMenuOpen(!menuOpen); handleToggleMenu()}}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`blur-overlay ${menusOpen ? "active" : ""}`}></div>
        {menuVisible && (
          <div className={`home-menu-parent ${menusOpen ? "open" : ""}`}>
            <div className="home-menu-navbar">
              <a href="/">
                 {t("Anasayfa")}
               </a>
               <a href="/about-us">
               {t("Hakkimizda")}
               </a>
               <a href="/contact">
               {t("Iletisim")}
               </a>
            </div>
            <div className="home-menu-tools">
              <ul>
                <li style={{ "--i": 1 }}><Theme /></li>
                <li style={{ "--i": 2 }}><Lang /></li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="credit-rates-container">
          <Credit />
          <button className="scroll-indicator" onClick={handleScrollIndicatorClicks}>
            <span className="arrow">↓</span>
            {t("GirisIcinKaydirin")}
            <span className="arrow">↓</span>
          </button>
          <Rates />
        </div>
        <div className="sign-in-container" ref={signInsRef}>
          <SignIn />
        </div>
      </div>
      <div className="parentMobile" onWheel={handleWheels}>
      <button
          className={`hamburger-menus ${menuOpen ? "open" : ""}`}
          onClick={() => {setMenuOpen(!menuOpen); handleToggleMenu()}}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className={`blur-overlay ${menusOpen ? "active" : ""}`}></div>
        {menuVisible && (
          <div className={`home-menu-parent ${menusOpen ? "open" : ""}`}>
            <div className="home-menu-navbar">
              <a href="/">
                 {t("Anasayfa")}
               </a>
               <a href="/about-us">
               {t("Hakkimizda")}
               </a>
               <a href="/contact">
               {t("Iletisim")}
               </a>
            </div>
            <div className="home-menu-tools">
              <ul>
                <li style={{ "--i": 1 }}><Theme /></li>
                <li style={{ "--i": 2 }}><Lang /></li>
              </ul>
            </div>
          </div>
        )}
        <div className="credit-container"  ref={creditRef}>
          <Credit />
            <button className="scroll-indicator" onClick={handleScrollIndicatorClick}>
              <span className="arrow">↓</span>
              {t("GirisIcinKaydirin")}
              <span className="arrow">↓</span>
            </button>
        </div>
        <div className="sign-in-container" ref={signInRef}>
          <SignIn />
        </div>
        <div className="sign-in-container" ref={ratesRef}>
          <Rates />
        </div>
      </div>
    </>
  );
}

export default Home;
