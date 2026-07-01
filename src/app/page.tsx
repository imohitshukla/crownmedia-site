import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import TrustSection from "@/components/TrustSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col selection:bg-orange-500/30">
      <Navbar />
      <HeroSection />
      <ServicesGrid />
      <TrustSection />
      <AboutSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
