import Navbar from "./Navbar/Navbar";
import Credit from "./Credit/Credit";
import SignIn from "./SignIn/SignIn";
import Rates from "./Rates/Rates";
import "./home.style.css";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

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
    </>
  );
}

export default Home;
