'use client';

import { useState, useEffect } from 'react';

interface PomodoroSession {
  id: number;
  start_time: number;
  end_time?: number;
  duration: number;
  completed: boolean;
  created_at: number;
}

interface SessionHistoryProps {
  refreshTrigger: number;
}

export default function SessionHistory({ refreshTrigger }: SessionHistoryProps) {
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        const data = await response.json();
        setSessions(data.sessions);
        setCompletedCount(data.completedCount);
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [refreshTrigger]);

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}分`;
  };

  const getActualDuration = (session: PomodoroSession): number => {
    if (!session.end_time) return 0;
    return Math.floor((session.end_time - session.start_time) / 1000);
  };

  if (isLoading) {
    return (
      <div className="w-80 bg-gray-50 p-6 border-l border-gray-200">      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={`skeleton-${i}`} className="h-16 bg-gray-300 rounded" />
          ))}
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">セッション履歴</h2>
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-gray-600">完了したセッション</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {sessions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            まだセッションがありません
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`bg-white rounded-lg p-4 shadow-sm border-l-4 ${
                session.completed ? 'border-green-400' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${
                  session.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {session.completed ? '✓ 完了' : '⏸ 途中停止'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatDate(session.created_at)}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <div>予定: {formatDuration(session.duration)}</div>
                {session.end_time && (
                  <div>実際: {formatDuration(getActualDuration(session))}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {sessions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            最新の50件を表示
          </div>
        </div>
      )}
    </div>
  );
}
