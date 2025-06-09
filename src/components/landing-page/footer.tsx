import { Logo } from "@/assets/logo";
import { useI18n } from "@/hooks/use-i18n";

const Footer = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-muted/30 border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-row justify-between items-center">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-2" />
            <p className="text-muted-foreground mb-4 max-w-md">
              {t("landing-page.footer.description")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("landing-page.footer.visitus")}{" "}
              <a
                href="https://www.markfly.work/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                markfly.work
              </a>
            </p>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-semibold mb-4">
              {" "}
              {t("landing-page.footer.support.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("landing-page.footer.support.contactus")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("landing-page.footer.support.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("landing-page.footer.support.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-8 text-center">
          <p className="text-muted-foreground">
            {t("landing-page.footer.allrights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
