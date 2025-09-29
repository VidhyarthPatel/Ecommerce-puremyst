import AboutUs from "@/components/AboutUs";
import BestSelling from "@/components/BestSelling";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
   <div className="font-sans">
    <HeroSection/>
    <BestSelling/>
    <AboutUs/>
   </div>
  );
}
