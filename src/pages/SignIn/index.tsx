import { AlertTriangle, Loader2 } from "lucide-react";
import { redirect, Link } from "react-router";

import AuthContainer from "@/components/container/auth";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useFormState } from "@/hooks/use-form-state";
import { handleLogin } from "./actions";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/locales";
import getFlagByCode from "@/utils/flag-dict";
import React from "react";

export function SignInPage() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    handleLogin,
    () => {
      redirect("/");
    }
  );

  return (
    <AuthContainer>
      <div className="space-y-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-sans text-4xl font-bold">mark.fly</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>SIgn in failed!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input name="email" type="email" id="email" />
            {errors?.email && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.email[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input name="senha" type="password" id="senha" />

            <Link
              to="/auth/forgot-password"
              className="text-xs font-medium text-foreground hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full pointer-events-auto cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="size- animate-spin" /> : "Login"}
          </Button>

          <Button variant="link" className="w-full" size="sm" asChild>
            <Link to="/auth/sign-up">Criar nova conta</Link>
          </Button>
        </form>

        <Separator />

        <div className="flex flex-row justify-between items-center">
          <ThemeSwitcher />
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Idioma" defaultValue="EN" />
            </SelectTrigger>
            <SelectContent>
              {locales.map((l) => (
                <SelectItem value={l.code} className="W-[90px]">
                  {getFlagByCode(l.code) &&
                    React.createElement(getFlagByCode(l.code)!, {
                      className: "inline w-5 h-5",
                    })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </AuthContainer>
  );
}
