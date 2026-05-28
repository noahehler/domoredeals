import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIStats from "@/components/AIStats";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import AuditForm from "@/components/AuditForm";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import BookCall from "@/components/BookCall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AIStats />
        <Problem />
        <HowItWorks />
        <AuditForm />
        <Pricing />
        <Guarantee />
        <BookCall />
      </main>
      <Footer />
    </>
  );
}
