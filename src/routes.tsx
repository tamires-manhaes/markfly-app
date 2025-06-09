import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import { SignInPage } from "./pages/SignIn";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { SignUpPage } from "./pages/SignUp";
import { HomePage } from "./pages/Home";
import { CategoryPage } from "./pages/Category";
import { LandingPage } from "./pages/LandingPage";

function AuthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");

    if (
      token &&
      (location.pathname === "/auth/sign-in" ||
        location.pathname === "/auth/sign-up")
    ) {
      navigate("/home", { replace: true });
    }

    if (!token && location.pathname === "/home") {
      navigate("/auth/sign-in", { replace: true });
    }
  }, [location, navigate]);

  return null;
}

export function Router() {
  return (
    <BrowserRouter>
      <AuthRedirect />
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route index path="/home" element={<HomePage />} />
        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />
        <Route path="/categories/:categoryId" element={<CategoryPage />} />
        <Route path="/profile" element={<div>Profile</div>} />
      </Routes>
    </BrowserRouter>
  );
}
