import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  // ⚠️ Remplace cette URL par ton futur domaine (ex: https://dakardreamers.com) quand tu l'auras acheté
  metadataBase: new URL('https://dakar-dreamers.vercel.app'),
  title: {
    default: 'Dakar Dreamers — Rêver plus grand',
    template: '%s | Dakar Dreamers',
  },
  description: 'Marque de vêtements née à Dakar. Streetwear premium inspiré par l\'ambition et la créativité.',
  openGraph: {
    title: 'Dakar Dreamers',
    description: 'Streetwear premium né à Dakar.',
    url: 'https://dakar-dreamers.vercel.app',
    siteName: 'Dakar Dreamers',
    images: [
      {
        url: '/images/og-image.jpg', // Assure-toi d'avoir mis une image à ce nom dans public/images/
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // Assure-toi d'avoir mis le favicon dans le dossier app/
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}