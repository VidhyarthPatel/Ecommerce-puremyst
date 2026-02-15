import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import Providers from "@/provider";
import Nav from "@/components/nav";
import "@/app/globals.css";
import ScrollToTopOnNavigation from "@/components/ScrollToTopOnNavigation";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata = {
  title: "PureMyst | Premium RO Water Purifier Accessories",
  description:
    "PureMyst provides high-quality RO water purifier accessories, filters, and spare parts designed for pure, safe, and healthy drinking water. Trusted for reliability, performance, and long-lasting purity.",
};


export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${robotoMono.variable} antialiased`}>
      <Nav />
      <main className="pt-24 bg-white dark:bg-ocean-900 min-h-screen">
        <ScrollToTopOnNavigation />
        <Providers>{children}</Providers>
      </main>
      <Footer />
    </div>
  );
}
