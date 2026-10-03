import React from "react";
import { Heart, Sparkles, ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { loveStory } from "../data/loveStoryConfig";
import { audioEngine } from "../utils/audioEngine";

export default function HeroSection({ onStartJourney }) {
  const handleOpenHeart = () => {
    // Gentle romantic heart-burst particle effect
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f43f5e", "#fb7185", "#fda4af", "#e879f9"],
      shapes: ["circle"],
      scalar: 1.2,
      disableForReducedMotion: true
    });

    // Start audio if browser allows it
    audioEngine.play();

    // Scroll to the timeline / start journey
    onStartJourney();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-20 overflow-hidden"
    >
      {/* Soft central radiant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-rose-600/10 via-pink-600/15 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
        {/* Subtle romantic badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/20 bg-rose-950/20 backdrop-blur-md text-xs sm:text-sm tracking-widest uppercase text-rose-300/80 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>A Story of Us</span>
          <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
        </div>

        {/* Lead sentence from prompt */}
        <p className="font-serif-cormorant text-xl sm:text-2xl md:text-3xl text-rose-200/90 italic font-light tracking-wide max-w-2xl leading-relaxed">
          "{loveStory.hero?.leadText || "To the person who means more to me than words can explain..."}"
        </p>

        {/* The Partner's Name with breathtaking entrance styling */}
        <div className="relative py-2 sm:py-4">
          <h1 className="font-serif-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight bg-gradient-to-b from-white via-rose-100 to-rose-300 bg-clip-text text-transparent drop-shadow-[0_10px_35px_rgba(244,63,94,0.35)] select-none">
            {loveStory.partnerName}
          </h1>
          <div className="mt-2 text-rose-300/60 font-script-romantic text-2xl sm:text-3xl">
            forever in my heart
          </div>
        </div>

        {/* Button: "Open My Heart 💖" */}
        <div className="pt-6 sm:pt-10 flex flex-col items-center space-y-4">
          <button
            onClick={handleOpenHeart}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium text-white shadow-2xl transition-all duration-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400/80"
          >
            {/* Pulsing glow aura around button */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 opacity-70 blur-lg group-hover:opacity-100 group-hover:blur-xl transition duration-500 animate-pulse" />

            {/* Button background */}
            <span className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-700 via-pink-600 to-rose-600 border border-rose-300/30">
              <span className="tracking-wide">
                {loveStory.hero?.actionButtonText || "Open My Heart"}
              </span>
              <Heart className="w-5 h-5 fill-white text-white animate-heart-pulse" />
            </span>
          </button>

          <span className="text-xs text-rose-300/50 tracking-wider uppercase font-mono">
            {loveStory.hero?.ambientNote || "Click to begin our story"}
          </span>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <button
          onClick={handleOpenHeart}
          className="p-2 text-rose-300/70 hover:text-rose-100 transition-colors"
          aria-label="Scroll to first chapter"
        >
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
