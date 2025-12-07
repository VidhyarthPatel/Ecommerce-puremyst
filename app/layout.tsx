import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/provider";
import { CartMigrationNotification } from "@/components/CartMigrationNotification";
// import Nav from "../components/nav";  

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PureMyst - Premium Water Purifiers",
  description: "Experience pure water with advanced RO+UV+UF technology. Trusted by families across India for over 10 years.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        {/* <Nav/> */}
        <Providers>
          {children}
          <CartMigrationNotification />
        </Providers>
      </body>
    </html>
  );
}
