import { createBookmark } from "@/api/bookmark";
import { createCategory } from "@/api/category";
import Cookies from "js-cookie";
import { HTTPError } from "ky";
import z from "zod";

export interface NewCategoryProps {
  name: string;
}

export interface NewLinkProps {
  title: string;
  url: string;
  tags?: string[];
  category: string;
}

const newBookmarkSchema = z.object({
  title: z.string({ message: "Please, provide a title" }),
  url: z.string().url({ message: "Please provide a url" }),
  tags: z.string().optional(),
  pinned: z.boolean().default(false),
  category: z.string(),
});

const NewCategorySchema = z.object({
  name: z.string({ message: "Please, provide a value" }),
});

export async function handleNewCategory(data: FormData) {
  const result = NewCategorySchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  try {
    const userId = Cookies.get("userId");
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated.",
        errors: null,
      };
    }

    await createCategory(result.data.name, userId);
    window.location.replace("/");
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

  return { success: true, message: null, errors: null };
}

export async function handleNewBookmark(data: FormData) {
  const result = newBookmarkSchema.safeParse(Object.fromEntries(data));

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    return { success: false, message: null, errors };
  }

  try {
    const entries = {
      title: result.data.title,
      url: result.data?.url,
      category: result.data?.category,
      pinned: result.data?.pinned,
      tags: result.data?.tags?.split(","),
    };
    if (entries) {
      await createBookmark(entries);
      window.location.replace("/");
    }
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

  return { success: true, message: null, errors: null };
}
