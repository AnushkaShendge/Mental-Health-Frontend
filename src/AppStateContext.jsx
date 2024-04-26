import React, { createContext, useContext, useState, useEffect } from "react";

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => {
    const storedIsLoggedIn = sessionStorage.getItem('loggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  useEffect(() => {
    sessionStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  }, [loggedIn]);

  return (
    <AppStateContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
}
