import { useState, useEffect } from "react";

import { getProfile } from "@/api/auth";

import { Link } from "react-router";

export function ProfileCard() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
  }>({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      setUser({ email: profile.email, name: profile.name });
    })();
  }, []);

  return (
    <div className="flex  items-center gap-3 outline-none mb-16">
      <div className="flex flex-col items-start">
        <span className="text-xl font-medium text-slate-800 dark:text-slate-100">
          {user.name}
        </span>
        <span className="text-sm text-muted-foreground">{user.email}</span>
        <Link to="/profile" className="underline text-sm text-muted-foreground">
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
