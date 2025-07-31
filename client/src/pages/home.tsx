import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputSection from "@/components/InputSection";
import ResultsSection from "@/components/ResultsSection";
import SidebarSection from "@/components/SidebarSection";
import LoggingSection from "@/components/LoggingSection";
import MLAnalysisPanel from "@/components/MLAnalysisPanel";
import Footer from "@/components/Footer";
import { useState } from "react";
import { type ProcessLog } from "@shared/schema";

export default function Home() {
  const [lastProcessResult, setLastProcessResult] = useState<ProcessLog | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="bg-slate-50 text-slate-700 min-h-screen">
      <title>AutoForge - Privacy-First AI Agentic System | NASSCOM Hackathon 2025</title>
      <meta name="description" content="Privacy-first AI agentic system built for NASSCOM AI Hackathon 2025. Process sensitive automation queries while automatically redacting PII." />
      
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InputSection 
              onProcessResult={setLastProcessResult}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
            <ResultsSection 
              processResult={lastProcessResult}
              isProcessing={isProcessing}
            />
            <div className="mt-8">
              <MLAnalysisPanel processResult={lastProcessResult} />
            </div>
          </div>
          
          <SidebarSection />
        </div>

        <LoggingSection />
      </main>

      <Footer />
    </div>
  );
}
