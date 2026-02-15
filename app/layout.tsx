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
  metadataBase: new URL('https://www.puremyst.in'),
  title: {
    default: "PureMyst - Premium Water Purifiers | 10+ Years of Excellence",
    template: "%s | PureMyst"
  },
  description: "Experience pure, healthy water with PureMyst's advanced RO+UV+UF technology. Trusted by families across India for over 10 years. Expert maintenance and service.",
  keywords: ["Water Purifier", "RO System", "UV Water Filter", "Alkaline Water Purifier", "Best Water Purifier India", "Reverse Osmosis", "Water Filter Service", "PureMyst"],
  authors: [{ name: "PureMyst Team" }],
  creator: "PureMyst",
  publisher: "PureMyst",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "PureMyst - Premium Water Purifiers",
    description: "Advanced RO+UV+UF water purification for your home and office.",
    url: 'https://www.puremyst.in',
    siteName: 'PureMyst',
    images: [
      {
        url: '/OG/logo.png',
        width: 1200,
        height: 630,
        alt: 'PureMyst Water Purifiers',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PureMyst - Premium Water Purifiers',
    description: 'Advanced RO+UV+UF water purification trusted by thousands.',
    images: ['/OG/logo.png'], // Ensure you have this image in public/OG/
    creator: '@PureMyst', // Update if you have a handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
