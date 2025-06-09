import Footer from "@/components/landing-page/footer";
import Features from "@/components/landing-page/features";
import Header from "@/components/landing-page/header";
import Hero from "@/components/landing-page/hero";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};
