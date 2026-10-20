import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { copy } from "@/content/copy";
import { isProduction, siteUrl } from "@/lib/site";
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

const TITLE = "Top Up: refill drinking water across India";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: TITLE, template: "%s | Top Up" },
  description: copy.hero.sub,
  applicationName: "Top Up",
  alternates: { canonical: "/" },
  // Only real production deploys are indexable. See src/lib/site.ts.
  robots: isProduction ? undefined : { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Top Up",
    title: TITLE,
    description: copy.hero.sub,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: copy.hero.sub },
};

export const viewport: Viewport = { themeColor: "#F6F0E4" };

// No contact details, logo file or social profiles yet, so none are claimed (docs/open-questions.md).
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Top Up",
  url: siteUrl(),
  description: copy.hero.sub,
  areaServed: { "@type": "Country", name: "India" },
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
        <script
          type="application/ld+json"
          // "<" is escaped so the JSON can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
