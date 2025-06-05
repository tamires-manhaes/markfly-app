import { LogOut } from "lucide-react";

import { ProfileCard } from "../profile-card";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getCategories, type CategoryResponse } from "@/api/category";

import Cookies from "js-cookie";
import { useNavigate } from "react-router";

export default function CommomContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
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
    navigate("/auth/sign-in", { replace: true });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-between items-start mt-16 px-12 mb-12 h-[calc(100vh-64px)] ">
        <div className=" w-[25%] h-screen flex flex-col items-start justify-start px-4  text-white">
          <ProfileCard />
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
        </div>
        <div className="w-[75%]">
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

          <main className="p-4 h-screen">{children}</main>
        </div>
      </div>
    </>
  );
}
