import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { Toggle } from "./ui/toggle";

export function ThemeSwitcher() {
  const [theme, toggleTheme] = useTheme();
  return (
    <Toggle
      size="sm"
      className="cursor-pointer transition-all bg-slate-200 dark:bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
      onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <Sun className="size-4 dark:text-slate-50 text-slate-800" />
      ) : (
        <Moon className="invisible size-0 dark:text-slate-50 text-slate-800 dark:visible dark:size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Toggle>
  );
}
