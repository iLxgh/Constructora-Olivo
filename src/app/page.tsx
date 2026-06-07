import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutVideo from "@/components/AboutVideo";
import PropertyListings from "@/components/PropertyListings";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutVideo />
      <PropertyListings />
      <Services />
      <WhyChooseUs />
      <ContactForm />
      <Footer />
    </main>
  );
}
