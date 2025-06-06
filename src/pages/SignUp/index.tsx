import { Link, redirect } from "react-router";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthContainer from "@/components/container/auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LanguageSelect } from "@/components/language-select";

import { useFormState } from "@/hooks/use-form-state";
import { useI18n } from "@/hooks/use-i18n";
import { handleSignUp } from "./actions";

export function SignUpPage() {
  const { t, languages } = useI18n();
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    handleSignUp,
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
            <Label htmlFor="name">{t("new-account.name")}</Label>
            <Input name="name" type="name" id="name" />
            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>

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
            <Label htmlFor="password">{t("new-account.password")}</Label>
            <Input name="password" type="password" id="password" />
            {errors?.password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password_confirmation">
              {t("new-account.confirm-password")}
            </Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
            />
            {errors?.confirm_password && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.confirm_password[0]}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="locale">{t("new-account.language")}</Label>
            <Select name="locale">
              <SelectTrigger className="">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages?.map((locale) => (
                  <SelectItem value={locale.code}>{locale.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors?.locale && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.locale[0]}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size- animate-spin" />
            ) : (
              t("new-account.create-button")
            )}
          </Button>

          <Button className="w-full" variant="link" size="sm" asChild>
            <Link to="/auth/sign-in">
              {t("new-account.already-have-account")}
            </Link>
          </Button>

          <Separator />

          <div className="flex flex-row justify-between items-center">
            <ThemeSwitcher />
            <LanguageSelect />
          </div>
        </form>
      </div>
    </AuthContainer>
  );
}
