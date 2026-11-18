import { AudienceSection } from "./components/AudienceSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { FinalCtaSection } from "./components/FinalCtaSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { WhatsAppFloatingButton } from "./components/WhatsAppFloatingButton";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#071222] text-slate-100">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <CurriculumSection />
        <AudienceSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
