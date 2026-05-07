import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConciergeWidget } from "@/components/ui/ConciergeWidget";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivir Travel | Luxury Travel Boutique",
  description: "Curated journeys to Mexico’s most extraordinary destinations. Every detail, thoughtfully designed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen font-sans selection:bg-brand-gold/30 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}
