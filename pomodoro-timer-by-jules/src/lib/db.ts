import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

// Define the database file path.
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), 'pomodoro.db') 
  : path.join(process.cwd(), 'pomodoro.db');

let db: Database | null = null;

export interface PomodoroSession {
  id: number;
  session_type: 'work' | 'break';
  start_time: string; // Stored as ISO string
  end_time: string;   // Stored as ISO string
  duration_minutes: number;
}

export async function initDb(): Promise<Database> {
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
    throw error; 
  }
}

export async function addPomodoroSession(
  session_type: 'work' | 'break',
  start_time: Date,
  end_time: Date,
  duration_minutes: number
): Promise<{ id: number }> {
  const currentDb = await initDb();
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

export async function getPomodoroSessions(): Promise<PomodoroSession[]> {
  const currentDb = await initDb();
  if (!currentDb) {
    throw new Error("Database not initialized, cannot get sessions.");
  }

  const sessions = await currentDb.all<PomodoroSession[]>(
    'SELECT id, session_type, start_time, end_time, duration_minutes FROM pomodoro_sessions ORDER BY start_time DESC'
  );
  return sessions;
}

export async function closeDb() {
  if (db) {
    await db.close();
    db = null;
    console.log('Database connection closed.');
  }
}
