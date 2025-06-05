import { signInWithPassword } from "@/api/auth";
import Cookies from "js-cookie";
import { HTTPError } from "ky";
import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please, provide a valid e-mail address." }),
  senha: z.string().min(1, { message: "Please, provide your password." }),
});

export async function handleLogin(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { email, senha } = result.data;

  try {
    const { token, locale } = await signInWithPassword({
      email,
      password: senha,
    });

    Cookies.set("token", token);
    Cookies.set("locale", locale);
    window.location.replace("/");
  } catch (err) {
    console.log(err);
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();

      return { success: false, message, errors: null };
    }
    console.error(err);
    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    };
  }

  return { success: true, message: null, errors: null };
}
