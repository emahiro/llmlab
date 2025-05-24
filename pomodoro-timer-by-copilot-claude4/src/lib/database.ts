import Database from 'better-sqlite3';
import path from 'node:path';

const dbPath = path.join(process.cwd(), 'pomodoro.db');
const db = new Database(dbPath);

// ポモドーロセッションのテーブルを作成
db.exec(`
  CREATE TABLE IF NOT EXISTS pomodoro_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time INTEGER NOT NULL,
    end_time INTEGER,
    duration INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
  )
`);

export interface PomodoroSession {
  id?: number;
  start_time: number;
  end_time?: number;
  duration: number;
  completed: boolean;
  created_at?: number;
}

export class PomodoroDatabase {
  // セッションを開始
  static startSession(duration: number): number {
    const startTime = Date.now();
    const stmt = db.prepare(`
      INSERT INTO pomodoro_sessions (start_time, duration, completed)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(startTime, duration, false);
    return result.lastInsertRowid as number;
  }

  // セッションを完了
  static completeSession(id: number): void {
    const endTime = Date.now();
    const stmt = db.prepare(`
      UPDATE pomodoro_sessions 
      SET end_time = ?, completed = 1 
      WHERE id = ?
    `);
    stmt.run(endTime, id);
  }

  // セッションを停止（未完了）
  static stopSession(id: number): void {
    const endTime = Date.now();
    const stmt = db.prepare(`
      UPDATE pomodoro_sessions 
      SET end_time = ? 
      WHERE id = ?
    `);
    stmt.run(endTime, id);
  }

  // 全セッションを取得（最新から）
  static getAllSessions(): PomodoroSession[] {
    const stmt = db.prepare(`
      SELECT * FROM pomodoro_sessions 
      ORDER BY created_at DESC 
      LIMIT 50
    `);
    return stmt.all() as PomodoroSession[];
  }

  // 完了したセッション数を取得
  static getCompletedSessionsCount(): number {
    const stmt = db.prepare(`
      SELECT COUNT(*) as count 
      FROM pomodoro_sessions 
      WHERE completed = 1
    `);
    const result = stmt.get() as { count: number };
    return result.count;
  }
}

export default db;
