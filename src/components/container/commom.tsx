import { LogOut } from "lucide-react";

import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getCategories, type CategoryResponse } from "@/api/category";

import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSideBar } from "./app-sidebar";

export default function CommomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [categories, setCategories] = useState<CategoryResponse[]>();

  useEffect(() => {
    (async () => {
      const response = await getCategories();
      setCategories(response);
    })();
  }, []);

  const handleLogout = async () => {
    await Cookies.remove("token");
    await Cookies.remove("userId");
    await Cookies.remove("locale");
    navigate("/", { replace: true });
  };

  return (
    <>
      <SidebarProvider>
        <div
          className={`flex flex-row flex-wrap justify-between items-start ${
            isMobile ? "mt-8" : "mt-16"
          } px-12 mb-12 h-[calc(100vh-64px)] w-full`}
        >
          <AppSideBar
            categories={categories || []}
            handleLogout={handleLogout}
          />
          <div className={`${isMobile ? "w-full" : "w-[75%]"}`}>
            {isMobile ? (
              <></>
            ) : (
              <nav className="flex items-center justify-end mb-8">
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
            )}

            <main className="p-4 h-screen">
              {isMobile && <SidebarTrigger />}
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
