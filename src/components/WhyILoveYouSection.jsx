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
        threshold: 0.25,
        rootMargin: "0px 0px -50px 0px"
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
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-5xl mx-auto"
      aria-label="Why I Love You Section"
    >
      {/* Background soft ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-500/50" />
          <span>From My Heart</span>
        </div>
        <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          Why I Love You
        </h2>
        <p className="text-sm sm:text-base text-rose-300/70 font-sans leading-relaxed">
          There are countless reasons, but here are the truths that echo in my soul
          every single day.
        </p>
      </div>

      {/* Sequential Animated Reasons List */}
      <div className="space-y-8 sm:space-y-12">
        {loveStory.reasons.map((reason, index) => {
          const isVisible = visibleIndices.has(index);

          return (
            <div
              key={reason.id || index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className={`transition-all duration-1000 ease-out transform ${
                isVisible
                  ? "opacity-100 translate-y-0 filter blur-0"
                  : "opacity-0 translate-y-12 filter blur-sm"
              }`}
            >
              <div className="glass-panel glass-panel-hover p-6 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                {/* Glowing subtle edge accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start sm:items-center gap-5 sm:gap-8">
                  {/* Number Badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-rose-950/60 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-inner group-hover:border-rose-400/60 transition-colors">
                    <span className="font-mono text-sm sm:text-base text-rose-300 font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Reason Text */}
                  <div className="space-y-2">
                    <h3 className="font-serif-cormorant text-2xl sm:text-3xl md:text-4xl text-rose-100 font-normal group-hover:text-rose-200 transition-colors">
                      {reason.title}
                    </h3>
                    {reason.detail && (
                      <p className="text-sm sm:text-base text-rose-300/80 font-sans font-light leading-relaxed max-w-2xl">
                        {reason.detail}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subtle Heart Accent */}
                <div className="self-end md:self-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-rose-950/40 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-900/50 transition-all duration-300">
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
