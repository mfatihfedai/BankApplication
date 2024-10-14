import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1
          style={{
            color: "var(--color-black)",
            letterSpacing: "5px",
            padding: "10px , 5px",
          }}
        >
          RIS
          <span style={{ color: "var(--color-black)", fontSize: "40px" }}>
            e
          </span>
        </h1>
      </div>
      <div className="main">
        <h1 style={{ color: "var(--color-white)" }}>Talha</h1>
        <h1 className="nihan">Nihan</h1>
        <p style={{ color: "var(--color-white)" }}>Lorem, ipsum dolor.</p>
      </div>
      <div className="second">
        <h1>Fatih</h1>
        <h1>Merve</h1>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
    </>
  );
}

export default App;
