import Navbar from "./Navbar/Navbar";
import Credit from "./Credit/Credit";
import SignIn from "../SignIn/SignIn";
import Rates from "./Rates/Rates";
import "./home.style.css";

function Home() {
  return (
    <>
      <div className="parent-header">
        <div></div>
        <div>Kredi Hesaplama</div>
        <div>Giriş Yap</div>
        <div>Güncel Kurlar</div>
      </div>
      <div className="parent">
        <div></div>
        <Navbar />
        <Credit />
        <SignIn />
        <Rates />
      </div>
    </>
  );
}

export default Home;
