import React from "react";
import { Heart, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { loveStory } from "../data/loveStoryConfig";

export default function FinalSection({ onReplay }) {
  const handleReplay = () => {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#f43f5e", "#fb7185", "#fda4af", "#e879f9"],
      disableForReducedMotion: true
    });
    onReplay();
  };

  const final = loveStory.final;

  return (
    <section
      id="final"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 py-28 overflow-hidden bg-gradient-to-b from-transparent via-[#060309] to-[#040207]"
      aria-label="Final Cinematic Message"
    >
      {/* Intense warm glowing core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-rose-600/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-8 sm:space-y-10">
        {/* Glowing Heart Centerpiece */}
        <div className="relative">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-rose-950/40 border border-rose-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.5)] animate-heart-pulse">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 fill-rose-500 text-rose-300 drop-shadow-[0_0_15px_rgba(244,63,94,0.9)]" />
          </div>
        </div>

        {/* Cinematic Prose Reveal */}
        <div className="space-y-6 max-w-2xl px-2">
          <p className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-rose-200/90 font-light italic leading-relaxed">
            "{final?.firstLine || "I don't know what the future holds..."}"
          </p>

          <p className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-rose-100 font-normal leading-relaxed rose-glow-text">
            "{final?.secondLine || "But I know that meeting you changed my world."}"
          </p>

          <p className="font-serif-cormorant text-xl sm:text-2xl md:text-3xl text-rose-300/90 font-light mt-4">
            {final?.thirdLine || "Thank you for being you. ❤️"}
          </p>
        </div>

        {/* Signature */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center space-y-2">
          <span className="font-serif-cormorant text-sm sm:text-base text-rose-300/70 tracking-widest uppercase">
            {final?.signOff || "With all my love,"}
          </span>
          <span className="font-script-romantic text-4xl sm:text-5xl text-rose-100 select-none drop-shadow-[0_5px_20px_rgba(244,63,94,0.4)]">
            {final?.authorName || loveStory.myName}
          </span>
        </div>

        {/* Button: "Replay Our Story ↺" */}
        <div className="pt-8 sm:pt-12">
          <button
            onClick={handleReplay}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium text-rose-200 glass-panel border border-rose-500/30 hover:border-rose-400 hover:text-white transition-all duration-300 active:scale-95 shadow-xl hover:shadow-[0_0_30px_rgba(244,63,94,0.4)] focus:outline-none focus:ring-2 focus:ring-rose-400"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-90 duration-500 text-rose-400" />
            <span className="tracking-wide">
              {final?.replayButtonText || "Replay Our Story"}
            </span>
          </button>
        </div>
      </div>

      {/* Subtle footer copyright / touch of personal love */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-xs font-mono text-rose-400/40">
        <span>Handcrafted with all my heart for {loveStory.partnerName}</span>
      </footer>
    </section>
  );
}
