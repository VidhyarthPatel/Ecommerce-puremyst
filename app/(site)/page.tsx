import Features from "@/components/Features";
import CategorySection from "@/components/CategorySection";
import PosterSlider from "@/components/PosterSlider";
import BestSelling from "@/components/BestSelling";
import Testimonials from "@/components/Testimonials";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import OurMission from "@/components/OurMission";
import FAQ from "@/components/FAQ";
import TrustedBy from "@/components/TrustedBy";

export default function Home() {
  return (
    <main className="font-sans bg-white dark:bg-ocean-900 transition-colors duration-300 pt-20">
      <PosterSlider />
      <CategorySection />
      <BestSelling />
      <Features />
      <OurMission />
      <FAQ />
      <Testimonials />
      <TrustedBy />
      <WhatsAppFloat />
    </main>
  );
}
