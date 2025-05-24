"use client";

import React, { useState, useEffect } from 'react';
import { PomodoroSession } from '@/lib/db'; // Assuming PomodoroSession is exported from db.ts

interface FormattedSession extends Omit<PomodoroSession, 'start_time' | 'end_time'> {
  start_time: string;
  end_time: string;
}

const HistorySidebar: React.FC = () => {
  const [sessions, setSessions] = useState<FormattedSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sessions');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch sessions: ${response.status}`);
      }
      const data: { sessions: PomodoroSession[] } = await response.json();
      
      // Format dates before setting state
      const formattedSessions = data.sessions.map(session => ({
        ...session,
        start_time: new Date(session.start_time).toLocaleString(),
        end_time: new Date(session.end_time).toLocaleString(),
      }));
      setSessions(formattedSessions);
    } catch (err) {
      console.error("Error fetching sessions:", err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
    // Listen for a custom event that can be dispatched when a session is saved
    const handleSessionSaved = () => fetchSessions();
    window.addEventListener('sessionSaved', handleSessionSaved);

    return () => {
      window.removeEventListener('sessionSaved', handleSessionSaved);
    };
  }, []);

  return (
    <aside className="w-full md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-xl h-full overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6 text-white border-b border-gray-700 pb-3">
        Session History
      </h3>
      {isLoading && <p className="text-gray-400">Loading history...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}
      {!isLoading && !error && sessions.length === 0 && (
        <p className="text-gray-400">No sessions recorded yet.</p>
      )}
      {!isLoading && !error && sessions.length > 0 && (
        <ul className="space-y-4">
          {sessions.map((session) => (
            <li key={session.id} className="bg-gray-700 p-4 rounded-md shadow hover:shadow-lg transition-shadow">
              <p className="text-lg font-medium text-white capitalize">
                {session.session_type} Session
              </p>
              <p className="text-sm text-gray-300">
                Started: {session.start_time}
              </p>
              <p className="text-sm text-gray-400">
                Duration: {session.duration_minutes} mins
              </p>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default HistorySidebar;
