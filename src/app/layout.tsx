import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { copy } from "@/content/copy";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  // Display text is only ever bold, so a single static weight keeps the file small.
  weight: "700",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Top Up",
  description: copy.hero.sub,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`}>
      <body id="top" className="relative min-h-dvh">
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
