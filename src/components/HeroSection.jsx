import React from "react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { loveStory } from "../data/loveStoryConfig";
import { audioEngine } from "../utils/audioEngine";

export default function HeroSection({ onStartJourney }) {
  const handleOpenHeart = () => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.65 },
      colors: ["#f43f5e", "#fb7185", "#fda4af", "#e879f9"],
      shapes: ["circle"],
      scalar: 1.1,
      disableForReducedMotion: true
    });

    audioEngine.play();
    onStartJourney();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-between text-center px-4 sm:px-6 pt-24 pb-8 sm:py-24 overflow-hidden"
    >
      {/* Soft central radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-tr from-rose-600/15 via-pink-600/15 to-purple-600/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="my-auto relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-5 sm:space-y-8 w-full">
        {/* Subtle romantic badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-rose-500/25 bg-rose-950/40 backdrop-blur-md text-[11px] sm:text-xs tracking-widest uppercase text-rose-300 font-mono shadow-sm">
          <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" />
          <span>A Story of Us</span>
          <Sparkles className="w-3 h-3 text-rose-400 animate-pulse" />
        </div>

        {/* Lead sentence */}
        <p className="font-serif-cormorant text-lg sm:text-2xl md:text-3xl text-rose-200/90 italic font-light tracking-wide max-w-xl sm:max-w-2xl leading-relaxed px-2">
          "{loveStory.hero?.leadText || "To the person who means more to me than words can explain..."}"
        </p>

        {/* The Partner's Name */}
        <div className="relative py-1 sm:py-4">
          <h1 className="font-serif-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_8px_30px_rgba(244,63,94,0.35)] select-none">
            {loveStory.partnerName}
          </h1>
          <div className="mt-1 sm:mt-2 text-rose-300/70 font-script-romantic text-2xl sm:text-3xl">
            forever in my heart
          </div>
        </div>

        {/* Button: "Open My Heart 💖" */}
        <div className="pt-4 sm:pt-8 flex flex-col items-center space-y-3 w-full">
          <button
            onClick={handleOpenHeart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-5 rounded-full text-base sm:text-lg font-medium text-white shadow-2xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400/80 w-auto max-w-[90vw]"
          >
            {/* Pulsing glow aura around button */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 opacity-75 blur-md sm:blur-lg group-hover:opacity-100 transition duration-500 animate-pulse" />

            {/* Button background */}
            <span className="relative flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-rose-700 via-pink-600 to-rose-600 border border-rose-300/30">
              <span className="tracking-wide text-sm sm:text-base font-sans font-medium">
                {loveStory.hero?.actionButtonText || "Open My Heart"}
              </span>
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white animate-heart-pulse shrink-0" />
            </span>
          </button>

          <span className="text-[11px] sm:text-xs text-rose-300/50 tracking-wider uppercase font-mono">
            {loveStory.hero?.ambientNote || "Click to begin our story"}
          </span>
        </div>
      </div>

      {/* Down indicator */}
      <div className="relative z-10 pt-4 pb-2 opacity-70 hover:opacity-100 transition-opacity">
        <button
          onClick={handleOpenHeart}
          className="p-2 text-rose-300/80 hover:text-white transition-colors"
          aria-label="Scroll to first chapter"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
