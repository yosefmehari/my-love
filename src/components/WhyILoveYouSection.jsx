import React, { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { loveStory } from "../data/loveStoryConfig";

export default function WhyILoveYouSection() {
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndices((prev) => {
              const updated = new Set(prev);
              updated.add(index);
              return updated;
            });
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="reasons"
      className="relative py-16 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label="Why I Love You Section"
    >
      {/* Background soft ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-600/10 rounded-full blur-[100px] sm:blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-[11px] sm:text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-500/50" />
          <span>From My Heart</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          Why I Love You
        </h2>
        <p className="text-xs sm:text-base text-rose-300/70 font-sans leading-relaxed px-2">
          There are countless reasons, but here are the truths that echo in my soul every single day.
        </p>
      </div>

      {/* Sequential Animated Reasons List */}
      <div className="space-y-5 sm:space-y-10">
        {loveStory.reasons.map((reason, index) => {
          const isVisible = visibleIndices.has(index);

          return (
            <div
              key={reason.id || index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`transition-all duration-700 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0 filter blur-0"
                  : "opacity-0 translate-y-8 filter blur-sm"
              }`}
            >
              <div className="glass-panel glass-panel-hover p-4 sm:p-8 rounded-3xl relative overflow-hidden flex items-start sm:items-center justify-between gap-4 sm:gap-6 group border border-rose-500/20 shadow-md">
                {/* Glowing subtle edge accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start sm:items-center gap-3.5 sm:gap-6 flex-1">
                  {/* Number Badge */}
                  <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:border-rose-400/60 transition-colors mt-0.5 sm:mt-0">
                    <span className="font-mono text-xs sm:text-base text-rose-300 font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Reason Text */}
                  <div className="space-y-1 sm:space-y-2 flex-1">
                    <h3 className="font-serif-cormorant text-xl sm:text-3xl text-rose-100 font-normal group-hover:text-rose-200 transition-colors leading-snug">
                      {reason.title}
                    </h3>
                    {reason.detail && (
                      <p className="text-xs sm:text-base text-rose-300/80 font-sans font-light leading-relaxed">
                        {reason.detail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtle Heart Accent */}
                <div className="hidden sm:flex shrink-0">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-500/20 items-center justify-center group-hover:scale-110 group-hover:bg-rose-900/50 transition-all duration-300">
                    <Heart className="w-4 h-4 text-rose-400 group-hover:fill-rose-400/40 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
