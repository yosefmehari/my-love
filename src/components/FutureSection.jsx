import React from "react";
import { Star, Compass, Sparkles, Smile, Sun, Heart } from "lucide-react";
import { loveStory } from "../data/loveStoryConfig";

export default function FutureSection() {
  const wishes = loveStory.future?.wishes || [];

  const icons = [
    <Sparkles key="1" className="w-5 h-5 text-rose-400" />,
    <Compass key="2" className="w-5 h-5 text-pink-400" />,
    <Smile key="3" className="w-5 h-5 text-amber-300" />,
    <Sun key="4" className="w-5 h-5 text-rose-300" />,
    <Heart key="5" className="w-5 h-5 text-pink-400 fill-pink-500/30" />
  ];

  return (
    <section
      id="future"
      className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-6xl mx-auto"
      aria-label="Our Future Section"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Star className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>Tomorrow & Beyond</span>
        </div>
        <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          {loveStory.future?.sectionHeading || "Our Future"}
        </h2>
        <p className="text-sm sm:text-base text-rose-300/70 font-sans leading-relaxed">
          {loveStory.future?.sectionSubheading || "A lifetime of dreams waiting to unfold, side by side."}
        </p>
      </div>

      {/* Wishes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {wishes.map((item, index) => (
          <div
            key={index}
            className={`glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between group ${
              index === wishes.length - 1 && wishes.length % 2 !== 0
                ? "md:col-span-2 lg:col-span-1"
                : ""
            }`}
          >
            {/* Top light glow inside card */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-rose-500/10 rounded-full blur-xl group-hover:bg-rose-500/25 transition-all duration-500" />

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:border-rose-400/50 transition-all duration-300">
                {icons[index % icons.length]}
              </div>

              <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-100 font-normal group-hover:text-rose-200 transition-colors">
                {item.title}
              </h3>

              <p className="text-sm text-rose-300/70 font-sans font-light leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-900/30 flex items-center justify-between text-xs font-mono text-rose-400/60">
              <span>Promise #{index + 1}</span>
              <span className="text-rose-400 group-hover:translate-x-1 transition-transform">
                ✦
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
