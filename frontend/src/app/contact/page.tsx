import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col selection:bg-orange-500/30 pt-24">
      <Navbar />
      <div className="flex-grow">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
