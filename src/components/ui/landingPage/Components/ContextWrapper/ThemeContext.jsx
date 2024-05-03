import React, { useState, createContext, useEffect } from "react";

export const ThemeBgContext = createContext();

const ThemeContext = ({ children }) => {
  // Retrieve theme from localStorage
  const storedTheme = localStorage.getItem("theme");

  // Check if stored theme is "light" or "dark", otherwise set to null
  const initialTheme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;

  // State to hold the current theme
  const [theme, setTheme] = useState(initialTheme);

  // Update localStorage when the theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const handleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  // Context value containing theme and theme toggle function
  const contextValue = {
    theme: theme,
    handleTheme: handleTheme
  };

  return (
    <div>
      {/* Provide the theme context value to its children */}
      <ThemeBgContext.Provider value={contextValue}>
        {children}
      </ThemeBgContext.Provider>
    </div>
  );
};

export default ThemeContext;
