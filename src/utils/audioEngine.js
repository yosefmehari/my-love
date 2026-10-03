/**
 * Romantic Audio Engine
 * Supports playing local audio files (/audio/love-song.mp3) with an ambient
 * generative Web Audio API synth backup if the file is unavailable or unplayable.
 */

class RomanticAudioEngine {
  constructor() {
    this.audioElement = null;
    this.audioCtx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.65;
    this.usingSynth = false;
    this.synthInterval = null;
    this.listeners = new Set();
  }

  init(audioSrc = "/audio/love-song.mp3") {
    if (typeof window === "undefined") return;

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.src = audioSrc;
      this.audioElement.loop = true;
      this.audioElement.preload = "auto";
      this.audioElement.volume = this.volume;

      this.audioElement.addEventListener("play", () => {
        this.isPlaying = true;
        this.usingSynth = false;
        this.notify();
      });

      this.audioElement.addEventListener("pause", () => {
        if (!this.usingSynth) {
          this.isPlaying = false;
          this.notify();
        }
      });

      this.audioElement.addEventListener("error", () => {
        console.warn("Audio file could not be played. Switching to generative ambient romantic sound.");
        if (this.isPlaying) {
          this.startSynth();
        }
      });
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        isPlaying: this.isPlaying,
        isMuted: this.isMuted,
        volume: this.volume,
        usingSynth: this.usingSynth
      });
    }
  }

  async play() {
    if (this.isPlaying) return;

    if (!this.audioElement) {
      this.init();
    }

    try {
      this.audioElement.volume = this.isMuted ? 0 : this.volume;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.usingSynth = false;
        this.notify();
      }
    } catch (err) {
      console.warn("Direct HTML5 audio play failed or restricted:", err.message);
      // Fallback to generative ambient audio using Web Audio API
      this.startSynth();
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
    this.notify();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setMute(mute) {
    this.isMuted = mute;
    if (this.audioElement) {
      this.audioElement.volume = mute ? 0 : this.volume;
    }
    if (this.synthMasterGain) {
      this.synthMasterGain.gain.setValueAtTime(
        mute ? 0 : this.volume * 0.25,
        this.audioCtx ? this.audioCtx.currentTime : 0
      );
    }
    this.notify();
  }

  toggleMute() {
    this.setMute(!this.isMuted);
  }

  // --- Generative Romantic Piano/Bell Chime Synth Fallback ---
  startSynth() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      if (!this.synthMasterGain) {
        this.synthMasterGain = this.audioCtx.createGain();
        this.synthMasterGain.connect(this.audioCtx.destination);
      }

      this.synthMasterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.volume * 0.25,
        this.audioCtx.currentTime
      );

      this.usingSynth = true;
      this.isPlaying = true;
      this.notify();

      // Progression: Fmaj9, Dm9, Bbmaj7, C9sus
      const notes = [
        [349.23, 440.00, 523.25, 659.25], // F, A, C, E
        [293.66, 349.23, 440.00, 523.25], // D, F, A, C
        [233.08, 349.23, 440.00, 523.25], // Bb, F, A, C
        [261.63, 392.00, 466.16, 587.33]  // C, G, Bb, D
      ];

      let chordIndex = 0;
      let noteIndex = 0;

      const playChime = () => {
        if (!this.isPlaying || !this.usingSynth || !this.audioCtx) return;
        const currentChord = notes[chordIndex];
        const freq = currentChord[noteIndex % currentChord.length];

        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        const now = this.audioCtx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.18, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

        osc.connect(gain);
        gain.connect(this.synthMasterGain);

        osc.start(now);
        osc.stop(now + 2.8);

        noteIndex++;
        if (noteIndex % currentChord.length === 0) {
          chordIndex = (chordIndex + 1) % notes.length;
        }
      };

      playChime();
      this.synthInterval = setInterval(playChime, 1400);
    } catch (e) {
      console.warn("Synth failed to start:", e);
    }
  }

  stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.usingSynth = false;
  }

  // Soft heartbeat audio pulse effect when heart is clicked
  playHeartbeatEffect() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = this.audioCtx || new AudioContext();
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const playLub = (time, freq, gainVal) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(35, time + 0.18);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(gainVal, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + 0.22);
      };

      // Two quick thumps: Lub-Dub
      playLub(now, 85, 0.25);
      playLub(now + 0.18, 70, 0.20);
    } catch {
      // Ignore if user has not interacted with audio context yet
    }
  }
}

export const audioEngine = new RomanticAudioEngine();
