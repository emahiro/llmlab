'use client';

import { useState, useEffect, useRef } from 'react';

interface PomodoroTimerProps {
  onSessionComplete: (duration: number, completed: boolean) => void;
}

export default function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25分（秒単位）
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [initialDuration, setInitialDuration] = useState(25 * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startTimer = async () => {
    try {
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duration: initialDuration }),
      });
      const data = await response.json();
      setSessionId(data.sessionId);
      setIsRunning(true);
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const stopTimer = async () => {
    if (sessionId) {
      try {
        await fetch(`/api/sessions/${sessionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: false }),
        });
        onSessionComplete(initialDuration, false);
      } catch (error) {
        console.error('Failed to stop session:', error);
      }
    }
    setIsRunning(false);
    setSessionId(null);
    setTimeLeft(initialDuration);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSessionId(null);
    setTimeLeft(initialDuration);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleDurationChange = (minutes: number) => {
    const seconds = minutes * 60;
    setInitialDuration(seconds);
    if (!isRunning) {
      setTimeLeft(seconds);
    }
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // タイマー完了
            setIsRunning(false);
            if (sessionId) {
              fetch(`/api/sessions/${sessionId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: true }),
              }).then(() => {
                onSessionComplete(initialDuration, true);
              });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, sessionId, initialDuration, onSessionComplete]);

  const progress = ((initialDuration - timeLeft) / initialDuration) * 100;

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      {/* 時間設定 */}
      <div className="flex space-x-4">
        {[15, 25, 45].map((minutes) => (
          <button
            key={minutes}
            onClick={() => handleDurationChange(minutes)}
            disabled={isRunning}
            className={`px-4 py-2 rounded-lg transition-colors ${
              initialDuration === minutes * 60
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {minutes}分
          </button>
        ))}
      </div>

      {/* プログレスサークル */}
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100" aria-label="タイマープログレス">
          <title>タイマープログレス</title>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-gray-300"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
            className="text-blue-500 transition-all duration-1000 ease-linear"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-mono font-bold text-gray-800">
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {timeLeft === 0 ? '完了！' : isRunning ? '実行中' : '準備完了'}
            </div>
          </div>
        </div>
      </div>

      {/* コントロールボタン */}
      <div className="flex space-x-4">
        {!isRunning ? (
          <button
            onClick={startTimer}
            disabled={timeLeft === 0}
            className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            スタート
          </button>
        ) : (
          <button
            type="button"
            onClick={stopTimer}
            className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            ストップ
          </button>
        )}
        <button
          type="button"
          onClick={resetTimer}
          className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
        >
          リセット
        </button>
      </div>
    </div>
  );
}
