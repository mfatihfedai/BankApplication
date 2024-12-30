import { createContext, useContext, useState } from "react";

const AdminMenuContext = createContext();

export const AdminContextProvider = ({ children }) => {

const [componentName, setComponentName] = useState("Home")

  const values = {
    componentName,
    setComponentName
  };

  return <AdminMenuContext.Provider value={values}>{children}</AdminMenuContext.Provider>;
};

export const useAdminMenu = () => {
  const context = useContext(AdminMenuContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default AdminMenuContext;
