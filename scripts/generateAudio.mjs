import fs from 'fs';
import path from 'path';

// Generate a soothing, romantic ambient piano/celesta melody WAV file
const sampleRate = 44100;
const durationSec = 32; // 32 seconds seamless loop
const totalSamples = sampleRate * durationSec;
const numChannels = 2; // Stereo
const bytesPerSample = 2; // 16-bit
const blockAlign = numChannels * bytesPerSample;
const byteRate = sampleRate * blockAlign;
const dataSize = totalSamples * blockAlign;

const buffer = Buffer.alloc(44 + dataSize);

// Write WAV Header
buffer.write('RIFF', 0);
buffer.writeUInt32LE(36 + dataSize, 4);
buffer.write('WAVE', 8);
buffer.write('fmt ', 12);
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
buffer.writeUInt16LE(numChannels, 22);
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(byteRate, 28);
buffer.writeUInt16LE(blockAlign, 32);
buffer.writeUInt16LE(16, 34); // BitsPerSample
buffer.write('data', 36);
buffer.writeUInt32LE(dataSize, 40);

// Romantic chord progression in F Major / D minor
// Chords:
// 1. Fmaj7 (F3, C4, E4, A4) - 0s to 8s
// 2. Dm9   (D3, A3, C4, F4, E4) - 8s to 16s
// 3. Bbmaj7(Bb2, F3, A3, D4) - 16s to 24s
// 4. C9sus (C3, G3, Bb3, D4, G4) - 24s to 32s

const chords = [
  // chord 1: Fmaj7
  {
    start: 0, end: 8,
    bass: 174.61, // F3
    notes: [261.63, 329.63, 440.00, 523.25], // C4, E4, A4, C5
    arpeggios: [
      { time: 0.0, freq: 174.61 },
      { time: 0.8, freq: 261.63 },
      { time: 1.6, freq: 329.63 },
      { time: 2.4, freq: 440.00 },
      { time: 3.2, freq: 523.25 },
      { time: 4.2, freq: 440.00 },
      { time: 5.2, freq: 329.63 },
      { time: 6.2, freq: 349.23 }
    ]
  },
  // chord 2: Dm9
  {
    start: 8, end: 16,
    bass: 146.83, // D3
    notes: [220.00, 261.63, 349.23, 329.63], // A3, C4, F4, E4
    arpeggios: [
      { time: 8.0, freq: 146.83 },
      { time: 8.8, freq: 220.00 },
      { time: 9.6, freq: 261.63 },
      { time: 10.4, freq: 349.23 },
      { time: 11.2, freq: 329.63 },
      { time: 12.2, freq: 261.63 },
      { time: 13.2, freq: 220.00 },
      { time: 14.2, freq: 261.63 }
    ]
  },
  // chord 3: Bbmaj7
  {
    start: 16, end: 24,
    bass: 116.54, // Bb2
    notes: [174.61, 220.00, 293.66, 349.23], // F3, A3, D4, F4
    arpeggios: [
      { time: 16.0, freq: 116.54 },
      { time: 16.8, freq: 174.61 },
      { time: 17.6, freq: 220.00 },
      { time: 18.4, freq: 293.66 },
      { time: 19.2, freq: 349.23 },
      { time: 20.2, freq: 293.66 },
      { time: 21.2, freq: 220.00 },
      { time: 22.2, freq: 261.63 }
    ]
  },
  // chord 4: C9sus4
  {
    start: 24, end: 32,
    bass: 130.81, // C3
    notes: [196.00, 233.08, 293.66, 392.00], // G3, Bb3, D4, G4
    arpeggios: [
      { time: 24.0, freq: 130.81 },
      { time: 24.8, freq: 196.00 },
      { time: 25.6, freq: 233.08 },
      { time: 26.4, freq: 293.66 },
      { time: 27.2, freq: 392.00 },
      { time: 28.2, freq: 349.23 },
      { time: 29.2, freq: 329.63 },
      { time: 30.2, freq: 261.63 }
    ]
  }
];

let offset = 44;

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;
  let sampleL = 0;
  let sampleR = 0;

  // Find active chord
  const chordIdx = Math.floor(t / 8) % chords.length;
  const currentChord = chords[chordIdx];
  const chordTime = t - currentChord.start;

  // Warm warm pad tone (soft sine + overtones)
  const padEnv = Math.sin((chordTime / 8) * Math.PI);
  for (const f of currentChord.notes) {
    const osc = Math.sin(2 * Math.PI * f * t) * 0.04 +
                Math.sin(2 * Math.PI * f * 2 * t) * 0.015;
    sampleL += osc * padEnv;
    sampleR += osc * padEnv;
  }

  // Gentle bass
  const bassOsc = Math.sin(2 * Math.PI * currentChord.bass * t) * 0.07;
  sampleL += bassOsc * padEnv;
  sampleR += bassOsc * padEnv;

  // Gentle bell/piano arpeggio notes
  for (const arp of currentChord.arpeggios) {
    const dt = t - arp.time;
    if (dt >= 0 && dt < 4.0) {
      // Bell/piano envelope: quick attack, smooth exponential decay
      const env = Math.exp(-dt * 2.2);
      const tone = (
        Math.sin(2 * Math.PI * arp.freq * dt) * 0.16 +
        Math.sin(2 * Math.PI * arp.freq * 2 * dt) * 0.05 +
        Math.sin(2 * Math.PI * arp.freq * 3 * dt) * 0.02
      ) * env;

      // Slight stereo panning
      const pan = Math.sin(arp.freq);
      sampleL += tone * (0.5 - pan * 0.2);
      sampleR += tone * (0.5 + pan * 0.2);
    }
  }

  // Master volume limiter / soft clipper
  sampleL = Math.max(-0.95, Math.min(0.95, sampleL));
  sampleR = Math.max(-0.95, Math.min(0.95, sampleR));

  const intL = Math.floor(sampleL * 32767);
  const intR = Math.floor(sampleR * 32767);

  buffer.writeInt16LE(intL, offset);
  buffer.writeInt16LE(intR, offset + 2);
  offset += 4;
}

const outputPath = path.resolve('public/audio/love-song.mp3');
fs.writeFileSync(outputPath, buffer);
console.log(`Generated romantic placeholder audio: ${outputPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
