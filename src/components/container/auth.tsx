import { redirect } from "react-router";

import { isAuthenticated } from "@/api/auth";
import { useEffect } from "react";

export default function AuthContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    (async () => {
      if (await isAuthenticated()) {
        redirect("/");
      }
    })();
  }, []);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  );
}
