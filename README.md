# 💖 Our Love Story — Interactive Romantic Experience

An elegant, emotional, cinematic, and interactive digital love story website crafted for someone special.

---

## ✨ Features & Story Chapters

1. **Cinematic Hero Opening**: A poetic entrance with glowing typography revealing her name, accompanied by the **"Open My Heart 💖"** experience trigger.
2. **Love Story Timeline (Chapters 01–06)**:
   - *Chapter 01: The Beginning*
   - *Chapter 02: When I Started Falling*
   - *Chapter 03: The Moments I Can't Forget*
   - *Chapter 04: What You Mean To Me*
   - *Chapter 05: Why I Love You*
   - *Chapter 06: My Promise*
3. **Interactive Keepsake Memories Gallery**: Clickable memory cards that open into an expanded lightbox with full heartfelt stories and keyboard navigation (`←`, `→`, `Esc`).
4. **"Why I Love You" (Sequential Scroll Reveal)**: Animated reasons that smoothly illuminate one at a time as you scroll down.
5. **Interactive Glowing Heart**: A pulsing heart with gentle heartbeat audio pulse, burst of floating hearts, and reveal message (*"Every beat reminds me of you"*).
6. **Wax-Sealed Love Letter**: An animated envelope that opens to reveal your personal letter in handwritten and serif typography.
7. **"Our Future" Constellation**: Celestial cards visualizing your future adventures, shared laughter, and quiet ordinary days together.
8. **Cinematic Finale**: A dark glowing heart reveal, poetic conclusion, and **"Replay Our Story ↺"** button.
9. **Floating Music Player**: Respects browser autoplay, provides Play/Pause and Mute/Unmute, animates sound waves, remembers user preference across the session, and features a built-in romantic generative synth fallback.
10. **Subtle Story Progress Indicator**: A minimalist chapter tracker (`01 / 08`) with instant jump menu and glowing progress bar.

---

## 🛠️ Quick Start

### 1. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## 🎨 How to Personalize Everything (In One Place!)

All personal names, stories, dates, reasons, and letter contents are located in:

📁 **[`src/data/loveStoryConfig.js`](file:///C:/Users/HP/Desktop/as/my-love/src/data/loveStoryConfig.js)**

### 1. Change Names
```javascript
export const loveStory = {
  partnerName: "Rahel",    // Personalized for Rahel
  myName: "Yosef",         // Written by Yosef
  ...
};
```

### 2. Replace Photos
Add your own photos to the `public/images/` directory:
* `public/images/memory-1.jpg`
* `public/images/memory-2.jpg`
* `public/images/memory-3.jpg`
* `public/images/memory-4.jpg`
* `public/images/memory-5.jpg`
* `public/images/memory-6.jpg`

You can also point to any custom filenames or external image URLs inside [`src/data/loveStoryConfig.js`](file:///C:/Users/HP/Desktop/as/my-love/src/data/loveStoryConfig.js).

### 3. Replace Music
Replace `public/audio/love-song.mp3` with your favorite romantic song:
* File path: `public/audio/love-song.mp3`

*(If no audio file is provided or if an audio playback restriction occurs, the built-in ambient generative audio engine will automatically generate a soothing ambient romantic melody!)*

### 4. Edit Your Love Letter
In [`src/data/loveStoryConfig.js`](file:///C:/Users/HP/Desktop/as/my-love/src/data/loveStoryConfig.js), find the `loveLetter` section:
```javascript
loveLetter: {
  salutation: "My love,",
  paragraphs: [
    "Your first paragraph here...",
    "Your second paragraph here..."
  ],
  closing: "With all my love,",
  author: "YOUR NAME"
}
```

---

## 🗄️ Turso libSQL Database Connection

Your database URL is connected:
```env
VITE_TURSO_DATABASE_URL=libsql://my-love-yosefmehari.aws-ca-central-1.turso.io
```

### What the Database Powers:
1. **Interactive Replies to Yosef**: When Rahel reads the Tigrinya letter, she can type and submit a reply note, saving it directly to your Turso `love_notes` table!
2. **Heartbeat Sync**: Every pulse on the glowing heart is counted and synced to your `heartbeats` table.

### Adding Your Turso Auth Token:
Turso cloud databases require an authentication token to authorize write requests.
1. Generate an auth token from your terminal or Turso dashboard:
   ```bash
   turso db tokens create my-love
   ```
2. Paste it into your [`.env`](file:///C:/Users/HP/Desktop/as/my-love/.env) file:
   ```env
   VITE_TURSO_AUTH_TOKEN=your_token_here
   ```
3. Test your connection anytime with:
   ```bash
   node scripts/testDbWithToken.mjs
   ```
*(Note: If no token is provided yet, the website gracefully falls back to local storage so nothing ever breaks!)*

---

## 🚀 Deployment

You can deploy this site in seconds to **Vercel**, **Netlify**, or **GitHub Pages**:
- Connect this repository to Vercel or Netlify.
- Set the environment variables in your deployment dashboard:
  - `VITE_TURSO_DATABASE_URL`
  - `VITE_TURSO_AUTH_TOKEN`
- Build command: `npm run build`
- Output directory: `dist`

