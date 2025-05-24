import React from 'react';

interface TimerDisplayProps {
  time: number; // Time in seconds
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold">{formatTime(time)}</h1>
    </div>
  );
};

export default TimerDisplay;
