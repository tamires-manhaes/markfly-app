import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { Zap, Smartphone, FolderOpen, Cloud } from "lucide-react";

const Features = () => {
  const { t } = useI18n();
  const features = [
    {
      icon: Zap,
      title: t("landing-page.features.items.fast.title"),
      description: t("landing-page.features.items.fast.description"),
    },
    {
      icon: Smartphone,
      title: t("landing-page.features.items.cross.title"),
      description: t("landing-page.features.items.cross.description"),
    },
    // {
    //   icon: Search,
    //   title: "Smart Search",
    //   description:
    //     "Find any bookmark instantly with intelligent search that understands context and content.",
    // },
    {
      icon: FolderOpen,
      title: t("landing-page.features.items.organization.title"),
      description: t("landing-page.features.items.organization.description"),
    },
    {
      icon: Cloud,
      title: t("landing-page.features.items.backup.title"),
      description: t("landing-page.features.items.backup.description"),
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-4 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t("landing-page.features.title.part1")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("landing-page.features.title.part2")}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("landing-page.features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover-scale border-0 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
