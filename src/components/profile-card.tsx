import { useState, useEffect } from "react";
import { Link } from "react-router";

import { getProfile } from "@/api/auth";

import { useI18n } from "@/hooks/use-i18n";

export function ProfileCard() {
  const { t } = useI18n();
  const [user, setUser] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      await getProfile().then((res) => {
        setUser({ email: res.email, name: res.name });
      });
    })();
  }, []);

  return (
    <div className="flex  items-center gap-3 outline-none mb-16">
      <div className="flex flex-col items-start">
        <Link to="/">
          <span className="text-xl font-medium text-slate-800 dark:text-slate-100">
            {user.name}
          </span>
        </Link>
        <span className="text-sm text-muted-foreground">{user.email}</span>
        <Link to="/profile" className="underline text-sm text-muted-foreground">
          {t("home.see-profile")}
        </Link>
      </div>
    </div>
  );
}
