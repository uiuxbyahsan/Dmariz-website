import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "DžaMaris Restoran | Sarajevo",
  description:
    "DžaMaris Caffe & Restaurant at Aria Mall, Sarajevo — authentic Bosnian comfort food, grilled specialties, curry piletina, wok dishes and a cozy café lounge.",
  keywords: [
    "DžaMaris",
    "restoran Sarajevo",
    "Aria Mall",
    "caffe restaurant",
    "Bosnian food",
    "curry piletina",
    "wok",
  ],
  openGraph: {
    title: "DžaMaris Restoran | Sarajevo",
    description:
      "Authentic Bosnian comfort food and café culture at Aria Mall, Sarajevo.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
