import React, { useState, useEffect } from "react";
import { ChevronDown, Heart } from "lucide-react";

export default function ExperienceNav({ sections, activeSection, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeSection)
  );
  const currentSection = sections[currentIndex] || sections[0];

  return (
    <>
      {/* Top progress hairline with gentle rose shimmer */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-rose-950/40 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-rose-500 via-pink-400 to-rose-300 transition-all duration-150 shadow-[0_0_10px_rgba(244,63,94,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Story Indicator Pill */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40"
        aria-label="Story Chapters Navigation"
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-rose-500/20 backdrop-blur-xl shadow-lg hover:border-rose-400/40 transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-rose-400"
            aria-expanded={isOpen}
            aria-label="Toggle Chapter Navigation Menu"
          >
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs tracking-widest uppercase font-mono text-rose-300/90 font-medium">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(sections.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline-block w-px h-3 bg-rose-800/40" />
            <span className="hidden sm:inline-block text-xs font-serif-cormorant text-rose-100 text-sm tracking-wide">
              {currentSection?.label || "Prologue"}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-rose-300/80 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Expanded Chapters Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-2 rounded-2xl glass-panel border border-rose-500/25 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200"
              role="menu"
            >
              <div className="px-3 py-1.5 text-[10px] uppercase tracking-wider text-rose-400/70 font-semibold border-b border-rose-900/30 mb-1 flex items-center justify-between">
                <span>Story Chapters</span>
                <Heart className="w-3 h-3 text-rose-500/60 fill-rose-500/40" />
              </div>
              <div className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
                {sections.map((section, idx) => {
                  const isActive = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        onNavigate(section.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all duration-200 text-xs ${
                        isActive
                          ? "bg-rose-500/20 text-rose-100 font-medium border border-rose-500/30"
                          : "text-rose-200/70 hover:text-rose-100 hover:bg-rose-950/40"
                      }`}
                      role="menuitem"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-rose-400/80">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif-cormorant text-sm">
                          {section.label}
                        </span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,1)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Backdrop for closing navigation dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
