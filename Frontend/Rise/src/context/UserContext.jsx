import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    const newUser = (user) => {
        setUser(user);
    }

    const values = {
        user,
        setUser,
        newUser,
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