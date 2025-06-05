import { ProfileCard } from "./profile-card";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 mt-10 mx-12 text-white">
      <ProfileCard />
      <nav>
        <ThemeSwitcher />

        <Button
          size="sm"
          className="ml-4 bg-slate-100 dark:bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
        >
          <LogOut className="size-4 dark:text-slate-600 text-slate-800" />
          <span className="sr-only">Logout</span>
        </Button>
      </nav>
    </header>
  );
}
