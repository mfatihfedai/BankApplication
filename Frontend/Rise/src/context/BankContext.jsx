import { createContext, useContext, useState } from "react";

const BankContext = createContext();

export const BankContextProvider = ({ children }) => {

const [banks, setBanks] = useState(["a"]);

  const values = {
    banks,
    setBanks
  };

   return <BankContext.Provider value={values}>{children}</BankContext.Provider>;
};

export const useBanks = () => {
  const context = useContext(BankContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};

export default BankContext;
