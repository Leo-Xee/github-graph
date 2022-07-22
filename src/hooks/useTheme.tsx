import React from "react";
import useStore, { Theme } from "./useStore";

function useTheme() {
  const { theme, changeTheme } = useStore();

  const localTheme = localStorage.getItem("theme");
  const currentTheme = localTheme || theme;

  const ToggleTheme = () => {
    if (theme === "light") {
      changeTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      changeTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return [currentTheme as Theme, ToggleTheme] as const;
}

export default useTheme;
