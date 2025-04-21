import Navbar from "./Navbar/Navbar";
import Credit from "./Credit/Credit";
import SignIn from "./SignIn/SignIn";
import Rates from "./Rates/Rates";
import "./home.style.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";

function Home() {
  const { t } = useTranslation();

  const signInRef = useRef(null);
  const creditRatesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleWheel = (event) => {
    const scrollTop = window.scrollY;
    if (event.deltaY > 0) {
      // Fare tekerleği aşağı döndüğünde giriş bölümüne kaydır
      signInRef.current.scrollIntoView({ behavior: "smooth" });
    }
    else if (event.deltaY < 0 && scrollTop > 0) {
      // Fare tekerleği yukarı döndüğünde kredi ve kurlar bölümüne kaydır
      creditRatesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollIndicatorClick = () => {
    // Scroll-indicator div'ine tıklanınca giriş yap bölümüne kaydır
    signInRef.current.scrollIntoView({ behavior: "smooth" });
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
        <nav className="navMenu">
          <a href="/">
            {t("Anasayfa")}
          </a>
          <a href="/about-us">
            {t("Hakkimizda")}
          </a>
          <a href="/contact">
            {t("Iletisim")}
          </a>
        </nav>
        <div className="credit-rates-container">
          <Credit />
          <button className="scroll-indicator" onClick={handleScrollIndicatorClick}>
            <span className="arrow">↓</span>
            {t("GirisIcinKaydirin")}
            <span className="arrow">↓</span>
          </button>
          <Rates />
        </div>
        <div className="sign-in-container" ref={signInRef}>
          <SignIn />
          {/* <div className="circular-menu">
            <CircularMenu userType="admin" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
