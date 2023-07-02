import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  // open/close cart
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        handleClose,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
