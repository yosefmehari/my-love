import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { loveStory } from "../data/loveStoryConfig";
import { audioEngine } from "../utils/audioEngine";
import { recordHeartbeat } from "../services/db";

export default function InteractiveHeartSection() {
  const [clickCount, setClickCount] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);

  const handleHeartClick = (e) => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    setIsPulsing(true);
    setHasRevealed(true);

    // Audio heartbeat effect
    audioEngine.playHeartbeatEffect();

    // Record heartbeat in database
    recordHeartbeat();

    // Canvas confetti heart particles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      angle: 90,
      spread: 70,
      origin: { x, y },
      colors: ["#f43f5e", "#fda4af", "#ec4899", "#fb7185"],
      shapes: ["circle"],
      scalar: 1.1,
      disableForReducedMotion: true
    });

    // Create transient floating mini-heart
    const id = Date.now() + Math.random();
    const newParticle = {
      id,
      x: (Math.random() - 0.5) * 80,
      rotation: (Math.random() - 0.5) * 45
    };

    setFloatingParticles((prev) => [...prev, newParticle]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1800);

    setTimeout(() => {
      setIsPulsing(false);
    }, 500);
  };

  return (
    <section
      id="heart"
      className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-4xl mx-auto text-center flex flex-col items-center justify-center overflow-hidden"
      aria-label="Interactive Glowing Heart Section"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[550px] h-[420px] sm:h-[550px] bg-rose-600/12 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-xs tracking-widest uppercase text-rose-300 font-mono mb-8">
        <Sparkles className="w-3 h-3 text-rose-400" />
        <span>Rhythm of My Soul</span>
      </div>

      <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-rose-100 font-normal tracking-tight mb-4">
        The Pulse of My Heart
      </h2>
      <p className="text-sm text-rose-300/70 font-sans max-w-md mx-auto mb-12">
        {loveStory.interactiveHeart?.subtext || "Click to feel the rhythm of my heart beating for you."}
      </p>

      {/* Large Glowing Animated Heart */}
      <div className="relative py-6">
        {/* Floating Mini Hearts when clicked */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {floatingParticles.map((p) => (
            <div
              key={p.id}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float text-pink-400"
              style={{
                transform: `translate(${p.x}px, -120px) rotate(${p.rotation}deg)`,
                transition: "all 1.8s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: 0
              }}
            >
              <Heart className="w-6 h-6 fill-pink-500 text-pink-300 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
            </div>
          ))}
        </div>

        {/* Heart Trigger Button */}
        <button
          onClick={handleHeartClick}
          className={`relative group p-8 sm:p-12 rounded-full transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-rose-400/50 ${
            isPulsing ? "scale-125" : "hover:scale-105 active:scale-95"
          }`}
          aria-label="Click the glowing heart"
        >
          {/* Subtle outer glowing rings */}
          <div
            className={`absolute inset-0 rounded-full bg-rose-500/15 blur-2xl transition-all duration-700 ${
              isPulsing ? "scale-150 opacity-100 bg-rose-500/30" : "scale-100 opacity-60"
            }`}
          />
          <div className="absolute inset-4 rounded-full border border-rose-500/20 animate-ping opacity-30 pointer-events-none" />

          {/* SVG Heart Icon */}
          <svg
            className={`w-32 h-32 sm:w-44 sm:h-44 transition-all duration-300 drop-shadow-[0_0_35px_rgba(244,63,94,0.6)] ${
              isPulsing
                ? "fill-rose-500 text-rose-300 scale-110 drop-shadow-[0_0_60px_rgba(244,63,94,0.9)]"
                : "fill-rose-600/90 text-rose-400 animate-heart-pulse hover:fill-rose-500"
            }`}
            viewBox="0 0 24 24"
          >
            <defs>
              <radialGradient id="heartGradient" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="70%" stopColor="#be123c" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>
            </defs>
            <path
              fill="url(#heartGradient)"
              stroke="#fda4af"
              strokeWidth="0.5"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      {/* Revealed Message */}
      <div
        className={`mt-6 transition-all duration-700 transform ${
          hasRevealed
            ? "opacity-100 translate-y-0 filter blur-0"
            : "opacity-40 translate-y-2 filter blur-[1px]"
        }`}
      >
        <p className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-rose-100 font-light italic rose-glow-text">
          "{loveStory.interactiveHeart?.revealedMessage || "Every beat reminds me of you."}"
        </p>

        {clickCount > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm text-rose-300/80">
            <span className="px-3 py-1 rounded-full bg-rose-950/50 border border-rose-500/20">
              {clickCount}{" "}
              {loveStory.interactiveHeart?.clickCounterLabel || "heartbeats for you"}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
