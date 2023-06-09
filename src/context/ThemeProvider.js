import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

const defaultTheme = "light";
const darkTheme = "dark";

export default function ThemeProvider({ children }) {
  const toggleDarkMood = () => {
    const oldTheme = getTheme();
    // console.log(oldTheme);
    const newTheme = oldTheme === defaultTheme ? darkTheme : defaultTheme;

    updateTheme(newTheme, oldTheme);
  };

  useEffect(() => {
    const theme = getTheme();
    if (!theme) updateTheme(defaultTheme);
    else updateTheme(theme);
  });
  return (
    <ThemeContext.Provider value={{ toggleDarkMood }}>
      {children}
    </ThemeContext.Provider>
  );
}

const getTheme = () => {
  return localStorage.getItem("theme");
};

const updateTheme = (theme, themeToRemove) => {
  if (themeToRemove) document.documentElement.classList.remove(themeToRemove);
  document.documentElement.classList.add(theme);

  localStorage.setItem("theme", theme);
};
