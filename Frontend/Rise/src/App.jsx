import "./App.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Logo from "./components/Home/Logo/Logo";
import Verify from "./components/SignIn/Verify";
// import Dashboard from "./components/SignIn/Dashboard";
import Admin from "./components/SignIn/Admin/Admin";
import User from "./components/SignIn/User/User";
import DashboardRedirect from "./components/SignIn/DashboardRedirect";
import { UserContextProvider } from "./context/UserContext";

// App.js

function App() {
  return (
    <>
      <UserContextProvider>
        <Logo />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/user-dashboard" element={<User />} />
        </Routes>
      </UserContextProvider>
      {/* <Home /> */}
    </>
  );
}

export default App;
