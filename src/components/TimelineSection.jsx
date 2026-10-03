import React from "react";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { loveStory } from "../data/loveStoryConfig";

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto"
      aria-label="Love Story Timeline"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Our Journey</span>
        </div>
        <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          Chapters of Our Love
        </h2>
        <p className="text-sm sm:text-base text-rose-300/70 font-sans leading-relaxed">
          Every moment we have shared has led to where we are now. Here are the
          memories etched into my heart forever.
        </p>
      </div>

      {/* Central Glowing Timeline Line */}
      <div className="relative">
        <div
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-rose-500/40 via-pink-500/60 to-purple-600/30 shadow-[0_0_12px_rgba(244,63,94,0.4)]"
          aria-hidden="true"
        />

        {/* Chapters */}
        <div className="space-y-16 sm:space-y-24">
          {loveStory.timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.chapterNumber || index}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Center Node on Timeline */}
                <div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0512] border-2 border-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.8)] z-10"
                  aria-hidden="true"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                </div>

                {/* Content Card (Left or Right) */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0">
                  <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-3xl relative overflow-hidden group">
                    {/* Top ambient highlight inside card */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition-all duration-500" />

                    {/* Chapter & Meta Details */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-mono tracking-widest uppercase text-rose-400 font-bold px-2.5 py-1 rounded-full bg-rose-950/60 border border-rose-500/30">
                        {item.chapterTitle || `Chapter ${item.chapterNumber}`}
                      </span>

                      <div className="flex items-center gap-3 text-xs text-rose-300/70 font-sans">
                        {item.date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-rose-400" />
                            {item.date}
                          </span>
                        )}
                        {item.location && (
                          <span className="hidden sm:flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-pink-400" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-50 font-normal mb-3 group-hover:text-rose-200 transition-colors">
                      {item.title}
                    </h3>

                    {/* Emotional Story Message */}
                    <p className="text-sm sm:text-base text-rose-200/80 leading-relaxed font-sans font-light mb-5">
                      {item.message}
                    </p>

                    {/* Romantic Quote */}
                    {item.quote && (
                      <div className="border-l-2 border-rose-500/40 pl-3.5 py-1 text-xs sm:text-sm italic text-rose-300/80 font-serif-cormorant">
                        "{item.quote}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo / Image placeholder */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 flex justify-center">
                  <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-rose-500/20 shadow-2xl group">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09050e]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-rose-200/90 font-mono tracking-wider drop-shadow-md">
                      <span>{item.date}</span>
                      <span className="italic font-serif-cormorant capitalize text-sm">
                        {item.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
