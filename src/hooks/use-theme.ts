import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.getElementById("body");

    if (!root) {
      console.warn(
        "Root element not found. Ensure your HTML has an element with id 'root'."
      );
      return;
    }
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return [theme, toggleTheme] as const;
}
