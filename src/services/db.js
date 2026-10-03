import { createClient } from "@libsql/client/web";

const TURSO_URL =
  import.meta.env.VITE_TURSO_DATABASE_URL ||
  "libsql://my-love-yosefmehari.aws-ca-central-1.turso.io";

const TURSO_AUTH_TOKEN = import.meta.env.VITE_TURSO_AUTH_TOKEN || "";

let client = null;

export function getDbClient() {
  if (!client && TURSO_AUTH_TOKEN) {
    try {
      client = createClient({
        url: TURSO_URL,
        authToken: TURSO_AUTH_TOKEN,
      });
    } catch (e) {
      console.warn("Failed to initialize Turso client:", e);
    }
  }
  return client;
}

export async function initDatabaseTables() {
  const db = getDbClient();
  if (!db) return false;

  try {
    // Create tables if they do not exist
    await db.execute(`
      CREATE TABLE IF NOT EXISTS love_notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        author TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS heartbeats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        count INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    return true;
  } catch (err) {
    console.warn("Turso init tables error:", err.message);
    return false;
  }
}

export async function sendLoveNote(author, message) {
  const db = getDbClient();
  if (!db) {
    // Store in localStorage as fallback
    const local = JSON.parse(localStorage.getItem("local_love_notes") || "[]");
    const newNote = {
      id: Date.now(),
      author: author || "Rahel",
      message,
      created_at: new Date().toISOString(),
    };
    local.unshift(newNote);
    localStorage.setItem("local_love_notes", JSON.stringify(local));
    return { success: true, localOnly: true, data: newNote };
  }

  try {
    await db.execute({
      sql: "INSERT INTO love_notes (author, message) VALUES (?, ?);",
      args: [author || "Rahel", message],
    });
    return { success: true, localOnly: false };
  } catch (err) {
    console.error("Error sending love note to Turso:", err);
    return { success: false, error: err.message };
  }
}

export async function getLoveNotes() {
  const db = getDbClient();
  if (!db) {
    const local = JSON.parse(localStorage.getItem("local_love_notes") || "[]");
    return local;
  }

  try {
    const rs = await db.execute("SELECT * FROM love_notes ORDER BY created_at DESC LIMIT 50;");
    return rs.rows.map((row) => ({
      id: row.id,
      author: row.author,
      message: row.message,
      created_at: row.created_at,
    }));
  } catch (err) {
    console.warn("Error fetching love notes from Turso:", err);
    return JSON.parse(localStorage.getItem("local_love_notes") || "[]");
  }
}

export async function recordHeartbeat() {
  const db = getDbClient();
  if (!db) return;

  try {
    await db.execute("INSERT INTO heartbeats (count) VALUES (1);");
  } catch (err) {
    console.warn("Error recording heartbeat:", err.message);
  }
}
