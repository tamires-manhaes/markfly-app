import { getProfile, signInWithPassword } from "@/api/auth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const updateUserLocale = (locale: string) => {
    if (locale) {
      i18n.changeLanguage(locale);
    }
  };

  const login = async (credentials: { email: string; password: string }) => {
    const user = await signInWithPassword(credentials);
    updateUserLocale(user.locale);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getProfile();
      if (user) updateUserLocale(user.locale);
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}
