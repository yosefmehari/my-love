import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, MapPin, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { loveStory } from "../data/loveStoryConfig";

export default function MemoriesSection() {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState(null);

  const memories = loveStory.memories || [];
  const selectedMemory =
    selectedMemoryIndex !== null ? memories[selectedMemoryIndex] : null;

  // Handle ESC and Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMemoryIndex(null);
      } else if (e.key === "ArrowRight" && selectedMemoryIndex !== null) {
        setSelectedMemoryIndex((prev) => (prev + 1) % memories.length);
      } else if (e.key === "ArrowLeft" && selectedMemoryIndex !== null) {
        setSelectedMemoryIndex((prev) => (prev - 1 + memories.length) % memories.length);
      }
    };

    if (selectedMemoryIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedMemoryIndex, memories.length]);

  return (
    <section
      id="memories"
      className="relative py-16 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto"
      aria-label="Interactive Memories Gallery"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-[11px] sm:text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Sparkles className="w-3 h-3 text-rose-400" />
          <span>Keepsakes</span>
        </div>
        <h2 className="font-serif-cormorant text-3xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          Memories We Cherish
        </h2>
        <p className="text-xs sm:text-base text-rose-300/70 font-sans leading-relaxed px-2">
          Snapshots of our journey. Tap any memory to open and relive the story behind it.
        </p>
      </div>

      {/* Memories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
        {memories.map((mem, index) => (
          <div
            key={mem.id || index}
            onClick={() => setSelectedMemoryIndex(index)}
            className="group cursor-pointer rounded-3xl overflow-hidden glass-panel glass-panel-hover flex flex-col transition-all duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-400 border border-rose-500/20 shadow-lg"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedMemoryIndex(index);
              }
            }}
            aria-label={`View memory: ${mem.title}`}
          >
            {/* Image Thumbnail with Overlay */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-rose-950/40">
              <img
                src={mem.image}
                alt={mem.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0512] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              {/* Expand Hint Icon */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/60 backdrop-blur-md border border-rose-400/20 text-rose-200 flex items-center justify-center shadow-md">
                <Maximize2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              </div>
            </div>

            {/* Card Information */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-rose-400/80 mb-2 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {mem.date}
                  </span>
                  {mem.location && (
                    <span className="flex items-center gap-1 text-[11px] text-rose-300/60 truncate max-w-[120px]">
                      <MapPin className="w-3 h-3 text-pink-400/80" />
                      {mem.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-cormorant text-xl text-rose-100 font-medium group-hover:text-rose-200 transition-colors line-clamp-1">
                  {mem.title}
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-rose-200/70 font-sans font-light line-clamp-2 leading-relaxed">
                  {mem.description}
                </p>
              </div>

              <div className="pt-1 text-[11px] sm:text-xs font-mono text-rose-400/80 group-hover:text-rose-300 flex items-center gap-1">
                <span>Relive memory</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Memory Lightbox Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setSelectedMemoryIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded memory: ${selectedMemory.title}`}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto glass-panel border border-rose-500/30 rounded-3xl shadow-2xl flex flex-col md:flex-row bg-[#0b0614]/95 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemoryIndex(null)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 border border-rose-500/30 text-rose-200 hover:text-white hover:bg-rose-900/60 flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
              aria-label="Close memory view"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Left/Image Area (Proportioned so on mobile it doesn't push text away) */}
            <div className="w-full md:w-1/2 relative bg-black/70 flex items-center justify-center aspect-[16/10] md:aspect-auto max-h-[36vh] md:max-h-full">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right/Content Area */}
            <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-rose-300/80 font-mono">
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/20">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    {selectedMemory.date}
                  </span>
                  {selectedMemory.location && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/20">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {selectedMemory.location}
                    </span>
                  )}
                </div>

                <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-50 font-normal">
                  {selectedMemory.title}
                </h3>

                <p className="text-sm sm:text-base text-rose-200/90 leading-relaxed font-sans font-light">
                  {selectedMemory.fullStory || selectedMemory.description}
                </p>
              </div>

              {/* Modal Footer with Carousel Navigation */}
              <div className="pt-3 border-t border-rose-900/30 flex items-center justify-between">
                <span className="text-xs font-mono text-rose-400/70">
                  {selectedMemoryIndex + 1} of {memories.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setSelectedMemoryIndex(
                        (prev) => (prev - 1 + memories.length) % memories.length
                      )
                    }
                    className="p-2 rounded-full border border-rose-500/20 text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors"
                    aria-label="Previous memory"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedMemoryIndex((prev) => (prev + 1) % memories.length)
                    }
                    className="p-2 rounded-full border border-rose-500/20 text-rose-300 hover:text-white hover:bg-rose-950/60 transition-colors"
                    aria-label="Next memory"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
