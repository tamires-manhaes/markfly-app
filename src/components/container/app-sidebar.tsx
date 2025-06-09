import { LogOut } from "lucide-react";
import { ProfileCard } from "../profile-card";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";
import type { CategoryResponse } from "@/api/category";
import type { MouseEventHandler } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router";

interface AppSideBarProps {
  categories: CategoryResponse[];
  handleLogout: MouseEventHandler<HTMLButtonElement>;
}

export const AppSideBar = ({ categories, handleLogout }: AppSideBarProps) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isMobile ? (
        <Sidebar>
          <div className="px-6 py-4">
            <SidebarHeader className="px-4 py-2">
              <ProfileCard />
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <nav className="flex items-center justify-start mb-2">
                  <ThemeSwitcher />
                  <Button
                    onClick={handleLogout}
                    size="sm"
                    className="ml-4 bg-slate-200 dark:bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-400 focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600"
                  >
                    <LogOut className="size-4 dark:text-slate-100 text-slate-800" />
                    <span className="sr-only">Logout</span>
                  </Button>
                </nav>
              </SidebarGroup>
              <SidebarGroup>
                <ul className=" space-y-2">
                  {categories?.map((category) => (
                    <li
                      key={category.id}
                      className="text-slate-800 dark:text-slate-100 hover:underline"
                    >
                      <a href={`/categories/${category.id}`}>{category.name}</a>
                    </li>
                  ))}
                </ul>
              </SidebarGroup>
            </SidebarContent>
          </div>
        </Sidebar>
      ) : (
        <div className="w-[25%] h-screen flex flex-col items-start justify-start px-4  text-white">
          <ProfileCard />
          <ul className=" space-y-2">
            {categories?.map((category) => (
              <li
                key={category.id}
                className="text-slate-800 dark:text-slate-100 hover:underline"
              >
                <Link to={`/categories/${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
