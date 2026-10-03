import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

const url =
  process.env.VITE_TURSO_DATABASE_URL ||
  "libsql://my-love-yosefmehari.aws-ca-central-1.turso.io";

const authToken = process.env.VITE_TURSO_AUTH_TOKEN;

console.log("Connecting to:", url);
console.log("Auth Token present:", Boolean(authToken));

async function run() {
  if (!authToken) {
    console.log("\n⚠️ No VITE_TURSO_AUTH_TOKEN provided in .env yet.");
    console.log("To generate your token, run in your terminal / Turso dashboard:");
    console.log("  turso db tokens create my-love");
    console.log("And add it to your .env file as: VITE_TURSO_AUTH_TOKEN=your_token_here\n");
    return;
  }

  try {
    const client = createClient({ url, authToken });
    console.log("Creating tables if needed...");
    await client.execute(`
      CREATE TABLE IF NOT EXISTS love_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await client.execute(`
      CREATE TABLE IF NOT EXISTS heartbeats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        count INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    const rs = await client.execute("SELECT count(*) as count FROM love_notes;");
    console.log("✅ Successfully connected to Turso database! Total love notes:", rs.rows[0].count);
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
}

run();
