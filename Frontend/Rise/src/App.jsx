import "./App.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Logo from "./components/Home/Logo/Logo";
import Verify from "./components/SignIn/Verify";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./components/SignIn/Admin/Admin";
import User from "./components/SignIn/User/User";
import { UserContextProvider } from "./context/UserContext";
import CreateUserForm from "./components/SignIn/CreateUserForm";

// App.js

function App() {
  return (
    <>
      <UserContextProvider>
        <div style={{ marginLeft: "3rem" }}>
          <a href="/" style={{textDecoration: "none"}}>
            <Logo />
          </a>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/newUser" element={<CreateUserForm />} />
          {/* User için korumalı rota */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute role="USER">
                <User />
              </ProtectedRoute>
            }
          />
          {/* Admin için korumalı rota */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="ADMIN">
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
