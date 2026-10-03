import React, { useState, useEffect } from "react";
import BackgroundEffects from "./components/BackgroundEffects";
import AudioPlayer from "./components/AudioPlayer";
import ExperienceNav from "./components/ExperienceNav";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import MemoriesSection from "./components/MemoriesSection";
import WhyILoveYouSection from "./components/WhyILoveYouSection";
import InteractiveHeartSection from "./components/InteractiveHeartSection";
import LoveLetterSection from "./components/LoveLetterSection";
import FutureSection from "./components/FutureSection";
import FinalSection from "./components/FinalSection";

const sections = [
  { id: "hero", label: "Prologue" },
  { id: "timeline", label: "Our Story" },
  { id: "memories", label: "Cherished Moments" },
  { id: "reasons", label: "Why I Love You" },
  { id: "heart", label: "My Heartbeat" },
  { id: "letter", label: "A Love Letter" },
  { id: "future", label: "Our Future" },
  { id: "final", label: "Forever Yours" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollObserver, { passive: true });
    handleScrollObserver();

    return () => window.removeEventListener("scroll", handleScrollObserver);
  }, []);

  const handleNavigate = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleStartJourney = () => {
    handleNavigate("timeline");
  };

  const handleReplay = () => {
    handleNavigate("hero");
  };

  return (
    <div className="relative min-h-screen bg-[#07040a] text-rose-50 overflow-x-hidden selection:bg-rose-500/30 selection:text-rose-200">
      {/* Dynamic Romantic Background Canvas & Atmospheric Vignettes */}
      <BackgroundEffects />

      {/* Floating Story Indicator Navigation */}
      <ExperienceNav
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Floating Music Controls */}
      <AudioPlayer />

      {/* Main Story Flow */}
      <main className="relative z-10">
        <HeroSection onStartJourney={handleStartJourney} />
        <TimelineSection />
        <MemoriesSection />
        <WhyILoveYouSection />
        <InteractiveHeartSection />
        <LoveLetterSection />
        <FutureSection />
        <FinalSection onReplay={handleReplay} />
      </main>
    </div>
  );
}
