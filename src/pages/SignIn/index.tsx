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

import { LanguageSelect } from "@/components/language-select";
import { useI18n } from "@/hooks/use-i18n";
import { Logo } from "@/assets/logo";

export function SignInPage() {
  const { t } = useI18n();
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
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Sign in failed!</AlertTitle>
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
            <Label htmlFor="password">{t("login.password")}</Label>
            <Input name="senha" type="password" id="senha" />

            <Link
              to="/auth/forgot-password"
              className="text-xs font-medium text-foreground hover:underline"
            >
              {t("login.forget-password")}
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full pointer-events-auto cursor-pointer bg-gradient-to-br from-blue-600 to-purple-600"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size- animate-spin" />
            ) : (
              t("login.login-button")
            )}
          </Button>

          <Button variant="link" className="w-full " size="sm" asChild>
            <Link to="/auth/sign-up">{t("login.create-account")}</Link>
          </Button>
        </form>

        <Separator />

        <div className="flex flex-row justify-between items-center">
          <ThemeSwitcher />
          <LanguageSelect />
        </div>
      </div>
    </AuthContainer>
  );
}
