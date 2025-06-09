import { useEffect, useState } from "react";
import { ChevronDown, LogInIcon } from "lucide-react";

import { getProfile } from "@/api/auth";
import { getInitials } from "@/utils/get-initials";

import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ProfileButton() {
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
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>

        <Avatar className="size-8">
          {user && <AvatarFallback>{getInitials(user.name)}</AvatarFallback>}
        </Avatar>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <a href="/api/auth/sign-out">
            <LogInIcon className="mr-2 size-4" />
            Sign out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
