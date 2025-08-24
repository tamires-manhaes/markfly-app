import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSelect } from "../language-select";
import { ThemeSwitcher } from "../theme-switcher";
import { useI18n } from "@/hooks/use-i18n";
import { Logo } from "@/assets/logo";
import { Link } from "react-router";
import { useSentry } from "@/hooks/use.sentry";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();
  const { captureEvent } = useSentry();

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("landing-page.header.features")}
            </a>

            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("landing-page.header.about")}
            </a>
            <Button
              asChild
              variant="outline"
              size="sm"
              onClick={() =>
                captureEvent({
                  message: "Sign In Clicked",
                  level: "info",
                  tags: { feature: "header", button: "sign-in" },
                })
              }
            >
              <Link to="/auth/sign-in">{t("landing-page.header.signin")}</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() =>
                captureEvent({
                  message: "Sign Up Clicked",
                  level: "info",
                  tags: { feature: "header", button: "sign-in" },
                })
              }
            >
              <Link to="/auth/sign-up">{t("landing-page.header.started")}</Link>
            </Button>
            <LanguageSelect />
            <ThemeSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("landing-page.header.features")}
              </a>

              <a
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("landing-page.header.about")}
              </a>
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" size="sm">
                  {t("landing-page.header.signin")}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {t("landing-page.header.started")}
                </Button>
              </div>
              <LanguageSelect />
              <ThemeSwitcher />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
