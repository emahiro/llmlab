import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Define the database file path.
// __dirname will be <project_root>/pomodoro-timer-by-jules/.next/server/app/api/sessions in production after build
// or <project_root>/pomodoro-timer-by-jules/src/lib when running in a local dev context for this file itself.
// For consistency, especially for the DB file location, we aim for the project root.
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'pomodoro.db') // process.cwd() should be <project_root>/pomodoro-timer-by-jules
  : path.join(process.cwd(), 'pomodoro.db'); // In dev, cwd is usually <project_root>/pomodoro-timer-by-jules

let db: Database | null = null;

export async function initDb() {
  if (db) {
    return db;
  }
  try {
    const newDbInstance = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    await newDbInstance.exec(`
      CREATE TABLE IF NOT EXISTS pomodoro_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_type TEXT NOT NULL CHECK(session_type IN ('work', 'break')),
        start_time DATETIME NOT NULL,
        end_time DATETIME NOT NULL,
        duration_minutes INTEGER NOT NULL
      )
    `);
    console.log('Database initialized and table ensured:', dbPath);
    db = newDbInstance;
    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error; // Re-throw to indicate failure
  }
}

export async function addPomodoroSession(
  session_type: 'work' | 'break',
  start_time: Date,
  end_time: Date,
  duration_minutes: number
): Promise<{ id: number }> {
  const currentDb = await initDb(); // Ensure DB is initialized
  if (!currentDb) {
    throw new Error("Database not initialized, cannot add session.");
  }

  const result = await currentDb.run(
    'INSERT INTO pomodoro_sessions (session_type, start_time, end_time, duration_minutes) VALUES (?, ?, ?, ?)',
    session_type,
    start_time.toISOString(),
    end_time.toISOString(),
    duration_minutes
  );

  if (result.lastID === undefined) {
    throw new Error('Failed to insert session or retrieve lastID.');
  }
  return { id: result.lastID };
}

// Optional: A way to close the database if needed, though often not necessary for serverless functions
export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
    console.log('Database connection closed.');
  }
}
