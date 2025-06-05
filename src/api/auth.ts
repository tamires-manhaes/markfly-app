import i18n from "@/lib/i18n";
import { api } from ".";
import cookies from "js-cookie";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

export interface SignInWithPasswordResponse {
  token: string;
  locale: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

type SignUpResponse = void;

export interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  locale: string;
  bookmarks: [
    {
      id: string;
      title: string;
      url: string;
      tags: string[];
      pinned: boolean;
      userId: string;
    }
  ];
}

export async function isAuthenticated() {
  return !!(await cookies.get("token"));
}

export async function updateLocale(userId: string, locale: string) {
  await api.put(`/users/${userId}`, {
    json: {
      locale,
    },
  });
  i18n.changeLanguage(locale);
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api
    .post("session/login", {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>();

  return result;
}

export async function signUp({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post("users", {
    json: {
      name,
      email,
      password,
    },
  });
}

export async function getProfile() {
  const result = await api.get("profile").json<GetProfileResponse>();
  return result;
}
