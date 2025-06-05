import { useState, type FormEvent } from "react";
import { Link, redirect } from "react-router";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signUp } from "@/api/auth";
import AuthContainer from "@/components/container/auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locales } from "@/locales";

interface SignInForm {
  name: string;
  email: string;
  password: string;
}

export function SignUpPage() {
  const [form, setForm] = useState<SignInForm>({
    name: "",
    email: "",
    password: " ",
  });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsPending(true);
      if (!form.email || !form.password) {
        throw new Error("Email and password are required");
      }
      await signUp(form);
      setIsPending(false);
      redirect("/");
    } catch (err) {
      console.error("Error during sign-in:", err);
      return;
    }
  };
  return (
    <AuthContainer>
      <div className="space-y-4">
        <div className="flex flex-row justify-between">
          <h2 className="font-sans text-4xl font-bold">mark.fly</h2>
          <ThemeSwitcher />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nome</Label>
            <Input
              name="name"
              type="name"
              id="name"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">E-mail</Label>
            <Input
              name="email"
              type="email"
              id="email"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              name="password"
              type="password"
              id="password"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password_confirmation">Confirme sua senha</Label>
            <Input
              name="password_confirmation"
              type="password"
              id="password_confirmation"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="locale">Idioma</Label>
            <Select name="locale">
              <SelectTrigger className="">
                <SelectValue placeholder="Idioma" />
              </SelectTrigger>
              <SelectContent>
                {locales?.map((locale) => (
                  <SelectItem value={locale.code}>{locale.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="size- animate-spin" />
            ) : (
              "Criar conta"
            )}
          </Button>

          <Button className="w-full" variant="link" size="sm" asChild>
            <Link to="/auth/sign-in">Ja tem uma conta? Entre</Link>
          </Button>

          <Separator />
        </form>
      </div>
    </AuthContainer>
  );
}
