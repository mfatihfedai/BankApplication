import { createContext, useContext, useEffect, useState } from "react";
import { decryptData, encryptData } from "../components/Core/CryptoJS";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(0);
  const [lastLoginTime, setLastLoginTime] = useState();

  const newUser = (user) => {
    setUser(user);
  };

  const saveLastLoginTime = (lastLoginTime) => {
    setLastLoginTime(lastLoginTime);
  }

  // "user" bilgisini al ve dekirpt ederek user'a tanımla
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(decryptData(storedUser));
    }
  }, []);

  // Kullanıcı bilgisi değiştiğinde localStorage'a kaydet ve veriyi kriptola
  useEffect(() => {
    if (user) {
      const encryptUser = encryptData(user);
      localStorage.setItem("user", encryptUser);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const values = {
    user,
    setUser,
    newUser,
    userId,
    setUserId,
    saveLastLoginTime,
    lastLoginTime
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default UserContext;
