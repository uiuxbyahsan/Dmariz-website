import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComeSayHello from "@/components/ComeSayHello";
import Menu from "@/components/Menu";
import Features from "@/components/Features";
import ComfortFood from "@/components/ComfortFood";
import Gallery from "@/components/Gallery";
import InstagramReelsSection from "@/components/InstagramReelsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-cream">
      <Navbar />
      <Hero />
      <Menu />
      <Features />
      <ComfortFood />
      <Gallery />
      <ComeSayHello />
      <InstagramReelsSection />
      <Footer />
    </main>
  );
}
