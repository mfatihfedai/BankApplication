import { createContext, useContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(0);
    const secretKey = "a2b4c6d8e10f12g14h16i18j20k22";
  
    const newUser = (user) => {
        setUser(user);
    }

    const encryptData = (data) => {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };

    const decryptData = (encryptedUser) => {
      const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(decryptData(storedUser));
        }
      }, []);
    
      // Kullanıcı bilgisi değiştiğinde localStorage'a kaydet
      useEffect(() => {
        if (user) {
          const encryptUser = encryptData(user);
          localStorage.setItem("user", encryptUser);
          // setEncrypt(localStorage.getItem("user"));
          // const dec = decryptData(encrypt);
          // console.log(dec);
          // setDecrypt(dec);
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
    }

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
}

export default UserContext;