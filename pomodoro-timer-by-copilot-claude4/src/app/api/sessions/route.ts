import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PomodoroDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const { duration } = await request.json();
    const sessionId = PomodoroDatabase.startSession(duration);
    return NextResponse.json({ sessionId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to start session' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sessions = PomodoroDatabase.getAllSessions();
    const completedCount = PomodoroDatabase.getCompletedSessionsCount();
    return NextResponse.json({ sessions, completedCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}
