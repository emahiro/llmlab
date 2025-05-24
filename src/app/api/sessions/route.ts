import { NextRequest, NextResponse } from 'next/server';
import { initDb, addPomodoroSession } from '@/lib/db'; // Using import alias

// Ensure the database is initialized when this module is loaded or when the API route is first hit.
// initDb is designed to be idempotent.
initDb().catch(err => {
  console.error("Failed to initialize database on API route load:", err);
  // Depending on the strategy, you might want to prevent the app from running
  // or handle this more gracefully. For now, we log the error.
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

    const sessionData = {
      session_type,
      start_time,
      end_time,
      duration_minutes,
    };

    const result = await addPomodoroSession(
      sessionData.session_type as 'work' | 'break',
      sessionData.start_time,
      sessionData.end_time,
      sessionData.duration_minutes
    );

    return NextResponse.json({ message: 'Pomodoro session saved successfully', data: result }, { status: 201 });
  } catch (error) {
    console.error('Error saving pomodoro session:', error);
    // Check if the error is an instance of Error to safely access its message property
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ message: 'Failed to save pomodoro session', error: errorMessage }, { status: 500 });
  }
}
