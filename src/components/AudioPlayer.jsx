import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "../utils/audioEngine";
import { loveStory } from "../data/loveStoryConfig";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("loveStory_musicMuted") === "true";
    }
    return false;
  });

  useEffect(() => {
    audioEngine.init(loveStory.music?.src || "/audio/love-song.mp3");

    const savedMute = sessionStorage.getItem("loveStory_musicMuted") === "true";
    if (savedMute) {
      audioEngine.setMute(true);
    }

    const unsubscribe = audioEngine.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      sessionStorage.setItem("loveStory_musicPlaying", "false");
    } else {
      audioEngine.play();
      sessionStorage.setItem("loveStory_musicPlaying", "true");
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const nextMute = !isMuted;
    audioEngine.setMute(nextMute);
    setIsMuted(nextMute);
    sessionStorage.setItem("loveStory_musicMuted", String(nextMute));
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-full glass-panel border border-rose-500/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-rose-400/40 group"
      role="region"
      aria-label="Romantic Background Music Player"
    >
      {/* Play/Pause Button */}
      <button
        onClick={handleTogglePlay}
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white flex items-center justify-center shadow-lg shadow-rose-950/50 transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400"
        title={isPlaying ? "Pause Music" : "Play Romantic Music"}
        aria-label={isPlaying ? "Pause Background Music" : "Play Romantic Background Music"}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 fill-white" />
        ) : (
          <Play className="w-4 h-4 fill-white translate-x-0.5" />
        )}
      </button>

      {/* Track Details & Visualizer */}
      <div className="hidden sm:flex flex-col pr-1 cursor-pointer select-none" onClick={handleTogglePlay}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-rose-100 tracking-wide font-sans">
            {loveStory.music?.title || "Forever With You"}
          </span>
          {/* Animated sound wave bars when active */}
          <div className="flex items-end gap-0.5 h-3.5" aria-hidden="true">
            <span
              className={`w-0.5 bg-rose-400 rounded-full transition-all duration-300 ${
                isPlaying ? "h-3 animate-pulse" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-pink-400 rounded-full transition-all duration-300 ${
                isPlaying ? "h-4 animate-bounce" : "h-1"
              }`}
              style={{ animationDuration: "0.8s" }}
            />
            <span
              className={`w-0.5 bg-rose-300 rounded-full transition-all duration-300 ${
                isPlaying ? "h-2.5 animate-pulse" : "h-1"
              }`}
              style={{ animationDuration: "1.1s" }}
            />
          </div>
        </div>
        <span className="text-[10px] text-rose-300/70 font-sans">
          {isPlaying ? "Playing Romantic Theme" : "Click to play song"}
        </span>
      </div>

      {/* Mute / Unmute Button */}
      {isPlaying && (
        <button
          onClick={handleToggleMute}
          className="p-1.5 rounded-full text-rose-200/80 hover:text-white hover:bg-rose-500/20 transition-all focus:outline-none focus:ring-1 focus:ring-rose-400"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-rose-200" />
          )}
        </button>
      )}
    </div>
  );
}
