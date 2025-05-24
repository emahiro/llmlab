"use client"; // Required for hooks

import React, { useState, useEffect } from 'react';
import TimerDisplay from '@/app/components/TimerDisplay';
import HistorySidebar from '@/app/components/HistorySidebar'; // Import the sidebar

const WORK_DURATION_MINUTES = 25;
const BREAK_DURATION_MINUTES = 5;
const WORK_DURATION_SECONDS = WORK_DURATION_MINUTES * 60;
const BREAK_DURATION_SECONDS = BREAK_DURATION_MINUTES * 60;

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);

  const saveSession = async (session_type: 'work' | 'break', duration_minutes: number) => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_type, duration_minutes }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Session saved successfully:', data);
        window.dispatchEvent(new CustomEvent('sessionSaved')); // Dispatch event
      } else {
        console.error('Failed to save session:', data.message);
      }
    } catch (error) {
      console.error('Error POSTing session data:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) { // Only trigger if timer was active and reached zero
      const completedSessionType = isWorkSession ? 'work' : 'break';
      const completedSessionDuration = isWorkSession ? WORK_DURATION_MINUTES : BREAK_DURATION_MINUTES;
      
      saveSession(completedSessionType, completedSessionDuration);

      // Prepare for next session
      const nextIsWorkSession = !isWorkSession;
      setIsWorkSession(nextIsWorkSession);
      setTimeLeft(nextIsWorkSession ? WORK_DURATION_SECONDS : BREAK_DURATION_SECONDS);
      // Optionally play a sound here or notify user
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, timeLeft, isWorkSession]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(isWorkSession ? WORK_DURATION_SECONDS : BREAK_DURATION_SECONDS);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Main Timer Area */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl flex flex-col items-center gap-6 w-full max-w-md">
          <h2 className="text-3xl font-semibold tracking-wider">
            {isWorkSession ? 'Work Session' : 'Break Time'}
          </h2>
        <TimerDisplay time={timeLeft} />
        <div className="flex gap-4">
          <button
            onClick={handleStart}
            disabled={isActive}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded text-lg disabled:opacity-50 transition-colors"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isActive}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded text-lg disabled:opacity-50 transition-colors"
          >
            Stop
          </button>
        </div>
        <button
          onClick={handleReset}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded text-md transition-colors"
        >
          Reset
        </button>
      </div>
    </main>

      {/* History Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-0 md:mt-0">
        <HistorySidebar />
      </div>
    </div>
  );
}
