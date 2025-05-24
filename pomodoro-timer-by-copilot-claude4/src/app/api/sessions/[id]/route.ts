import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PomodoroDatabase } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { completed } = await request.json();
    const sessionId = Number.parseInt(params.id, 10);
    
    if (completed) {
      PomodoroDatabase.completeSession(sessionId);
    } else {
      PomodoroDatabase.stopSession(sessionId);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}
