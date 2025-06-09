import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";
import { ArrowRight, Chrome, Globe, Monitor, Laptop } from "lucide-react";

const Hero = () => {
  const { t } = useI18n();
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          {t("landing-page.hero.available")}
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          {t("landing-page.hero.title.part1")}{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("landing-page.hero.title.part2")}
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
          {t("landing-page.hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
          >
            {t("landing-page.hero.cta")}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Browser Icons */}
        <div className="flex justify-center items-center space-x-8 opacity-60">
          <div className="text-center">
            <Chrome className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <span className="text-xs text-muted-foreground">Chrome</span>
          </div>
          <div className="text-center">
            <Globe className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <span className="text-xs text-muted-foreground">Firefox</span>
          </div>
          <div className="text-center">
            <Monitor className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <span className="text-xs text-muted-foreground">Safari</span>
          </div>
          <div className="text-center">
            <Laptop className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <span className="text-xs text-muted-foreground">Edge</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
