import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Dakar Dreamers — Rêver plus grand",
  description: "Marque de vêtements née à Dakar. Streetwear premium inspiré par l'ambition et la créativité.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}