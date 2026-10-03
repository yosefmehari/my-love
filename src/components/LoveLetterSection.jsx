import React, { useState } from "react";
import { Mail, Heart, RotateCcw, Send, Sparkles, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { loveStory } from "../data/loveStoryConfig";
import { sendLoveNote } from "../services/db";

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#fb7185", "#fda4af", "#f43f5e", "#fbcfe8"],
      disableForReducedMotion: true
    });
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendLoveNote(loveStory.partnerName || "Rahel", replyText.trim());
      setSentSuccess(true);
      setReplyText("");
      confetti({
        particleCount: 35,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#f43f5e", "#fda4af", "#e879f9"],
        disableForReducedMotion: true
      });
      setTimeout(() => {
        setSentSuccess(false);
        setShowReplyBox(false);
      }, 4000);
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setIsSending(false);
    }
  };

  const letter = loveStory.loveLetter;

  return (
    <section
      id="letter"
      className="relative py-28 sm:py-36 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center"
      aria-label="Cinematic Love Letter Section"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/20 bg-rose-950/30 text-xs tracking-widest uppercase text-rose-300 font-mono">
          <Mail className="w-3.5 h-3.5 text-rose-400" />
          <span>A Private Letter</span>
        </div>
        <h2 className="font-serif-cormorant text-4xl sm:text-5xl md:text-6xl text-rose-100 font-normal tracking-tight">
          Words I Wrote for You
        </h2>
        <p className="text-sm sm:text-base text-rose-300/70 font-sans leading-relaxed">
          Some feelings are too precious to leave unsaid.
        </p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="w-full max-w-2xl relative flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope View */
          <div className="w-full max-w-lg aspect-[16/11] relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between border border-rose-400/30 shadow-[0_20px_60px_-15px_rgba(244,63,94,0.3)] group hover:border-rose-400/50 transition-all duration-500">
            {/* Envelope flap lines decoration */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              <svg className="w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M0,0 L50,55 L100,0" fill="none" stroke="#f43f5e" strokeWidth="1.2" />
                <path d="M0,100 L45,50" fill="none" stroke="#f43f5e" strokeWidth="0.8" />
                <path d="M100,100 L55,50" fill="none" stroke="#f43f5e" strokeWidth="0.8" />
              </svg>
            </div>

            <div className="text-center z-10 space-y-1">
              <span className="text-[11px] font-mono tracking-widest uppercase text-rose-400/80">
                {letter.envelopeTitle || "To My Beloved"}
              </span>
              <h3 className="font-serif-cormorant text-3xl sm:text-4xl text-rose-100">
                {loveStory.partnerName}
              </h3>
            </div>

            {/* Wax Seal Stamp in Center */}
            <div className="relative z-10 flex flex-col items-center my-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-rose-900 via-rose-700 to-pink-600 shadow-[0_0_25px_rgba(225,29,72,0.6)] flex items-center justify-center border-2 border-rose-300/40 transform transition-transform group-hover:scale-105 duration-300">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-rose-100 text-rose-100" />
              </div>
            </div>

            {/* Button: "Open My Letter 💌" */}
            <div className="z-10 w-full flex justify-center">
              <button
                onClick={handleOpenLetter}
                className="group/btn relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm sm:text-base font-medium text-white shadow-xl transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 opacity-75 blur-md group-hover/btn:opacity-100 transition duration-300" />
                <span className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-950 border border-rose-400/40">
                  <span>{letter.envelopeButtonText || "Open My Letter 💌"}</span>
                </span>
              </button>
            </div>
          </div>
        ) : (
          /* Opened Letter View */
          <div className="w-full relative glass-panel rounded-3xl p-8 sm:p-12 border border-rose-300/30 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-700 bg-[#0d0716]/95">
            {/* Top Close / Fold back button */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-rose-900/30">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400/80">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/50" />
                <span>Private & Confidential</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1.5 text-xs font-mono text-rose-300/70 hover:text-white px-3 py-1.5 rounded-full border border-rose-500/20 hover:bg-rose-950 transition-colors"
                title="Fold Letter Back"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Close Letter</span>
              </button>
            </div>

            {/* Letter Salutation */}
            <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-rose-200 font-normal mb-6 italic">
              {letter.salutation}
            </h3>

            {/* Letter Paragraphs */}
            <div className="space-y-4 sm:space-y-6 font-serif-cormorant text-base sm:text-lg md:text-xl text-rose-100/90 leading-relaxed font-light">
              {letter.paragraphs && letter.paragraphs.map((p, idx) => (
                <p key={idx} className="indent-4 sm:indent-8">
                  {p}
                </p>
              ))}
            </div>

            {/* Letter Closing & Handwritten Signature */}
            <div className="mt-10 sm:mt-12 pt-6 border-t border-rose-900/30 flex flex-col items-end">
              <span className="font-serif-cormorant text-base sm:text-lg text-rose-300/90 italic">
                {letter.closing}
              </span>
              <span className="font-script-romantic text-3xl sm:text-4xl text-rose-200 mt-1 select-none">
                {letter.author || loveStory.myName}
              </span>
            </div>

            {/* Interactive Reply to Yosef Button / Box */}
            <div className="mt-8 pt-6 border-t border-rose-900/40">
              {!showReplyBox ? (
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowReplyBox(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-xs sm:text-sm font-medium text-rose-200 transition-all hover:scale-105 shadow-lg shadow-rose-950/40"
                  >
                    <Send className="w-3.5 h-3.5 text-rose-400" />
                    <span>መልሲ ንዮሴፍ ጸሓፊ 💌 (Send a Reply to Yosef)</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between text-xs text-rose-300 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      <span>ንዮሴፍ ፍቕራዊ መልእኽቲ ጸሓፊሉ (Reply to Yosef)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowReplyBox(false)}
                      className="text-rose-400/60 hover:text-rose-200 text-[11px]"
                    >
                      Cancel
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="ፍቕራዊ መልእኽትኺ ኣብዚ ጸሓፊ... (Write your message to Yosef here...)"
                    className="w-full p-3 rounded-2xl bg-[#09040e]/90 border border-rose-500/30 text-rose-100 placeholder-rose-400/40 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400/50 resize-none font-serif-cormorant leading-relaxed"
                  />

                  {sentSuccess ? (
                    <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2 justify-center font-mono">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>መልእኽትኺ ብሰላም ተላኢኹ ኣሎ! ❤️ (Your love note has been sent!)</span>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSending || !replyText.trim()}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs sm:text-sm font-medium hover:from-rose-500 hover:to-pink-500 transition-all disabled:opacity-50 shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSending ? "ልኣኽ..." : "ንዮሴፍ ስደዲ (Send to Yosef)"}</span>
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
