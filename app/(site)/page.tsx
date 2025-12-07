import AboutUs from "@/components/AboutUs";
import BestSelling from "@/components/BestSelling";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="font-sans bg-white dark:bg-ocean-900 transition-colors duration-300">
      <HeroSection />
      <Features />
      <BestSelling />
      <AboutUs />
    </main>
  );
}
