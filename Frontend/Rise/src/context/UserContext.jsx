import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(0);

    const newUser = (user) => {
        setUser(user);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }, []);
    
      // Kullanıcı bilgisi değiştiğinde localStorage'a kaydet
      useEffect(() => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
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