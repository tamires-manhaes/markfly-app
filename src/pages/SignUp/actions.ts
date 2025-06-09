import { signUp } from "@/api/auth";
import { HTTPError } from "ky";
import { z } from "zod";

type FormState = {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
};

const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string(),
  locale: z.string(),
});

export async function handleSignUp(data: FormData): Promise<FormState> {
  const result = signUpSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  const { name, email, locale, confirm_password, password } = result.data;

  try {
    if (confirm_password !== password) {
      return {
        success: false,
        message: "Passwords don't match!",
        errors: null,
      };
    }

    const data = {
      name,
      email,
      locale,
      password,
    };
    await signUp(data);
    window.location.replace("/auth/sign-in");
  } catch (err) {
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
  // Fallback return to satisfy all code paths
  return {
    success: false,
    message: "Unknown error occurred.",
    errors: null,
  };
}
