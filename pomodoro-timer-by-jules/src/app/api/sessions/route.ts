import { NextRequest, NextResponse } from 'next/server';
import { initDb, addPomodoroSession, getPomodoroSessions, PomodoroSession } from '@/lib/db'; // Using import alias

// Ensure the database is initialized when this module is loaded or when the API route is first hit.
initDb().catch(err => {
  console.error("Failed to initialize database on API route load:", err);
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_type, duration_minutes } = body;

    if (!session_type || typeof duration_minutes !== 'number') {
      return NextResponse.json({ message: 'Missing session_type or duration_minutes' }, { status: 400 });
    }

    if (session_type !== 'work' && session_type !== 'break') {
      return NextResponse.json({ message: 'Invalid session_type' }, { status: 400 });
    }

    const start_time = new Date(); // Current time as start time
    const end_time = new Date(start_time.getTime() + duration_minutes * 60000);

    const result = await addPomodoroSession(
      session_type as 'work' | 'break',
      start_time,
      end_time,
      duration_minutes
    );

    return NextResponse.json({ message: 'Pomodoro session saved successfully', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error saving pomodoro session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to save pomodoro session', error: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  try {
    // initDb is called at the top level, but calling again ensures it's ready.
    // It's designed to be idempotent (won't re-initialize if already done).
    await initDb(); 
    
    const sessions: PomodoroSession[] = await getPomodoroSessions();
    return NextResponse.json({ sessions }, { status: 200 });
  } catch (error) {
    console.error('Error fetching pomodoro sessions:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to fetch pomodoro sessions', error: errorMessage }, { status: 500 });
  }
}
