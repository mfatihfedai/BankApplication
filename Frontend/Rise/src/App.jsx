import "./App.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Logo from "./components/Home/Logo/Logo";
import Verify from "./components/SignIn/Verify";
import Dashboard from "./components/SignIn/Dashboard";

// App.js

function App() {
  return (
    <>
      <Logo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Home /> */}
    </>
  );
}

export default App;
