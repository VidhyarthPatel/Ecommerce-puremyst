import AboutUs from "@/components/AboutUs";
import Features from "@/components/Features";
import HeroSectionNew from "@/components/HeroSectionNew";
import NewArrivals from "@/components/NewArrivals";
import SaleBanner from "@/components/SaleBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="font-sans bg-white dark:bg-ocean-900 transition-colors duration-300">
      <HeroSectionNew />
      <NewArrivals />
      <SaleBanner />
      <Features />
      <AboutUs />
      <WhatsAppFloat />
    </main>
  );
}
