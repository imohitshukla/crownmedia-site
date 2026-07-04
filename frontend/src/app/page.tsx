import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col selection:bg-orange-500/30">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
