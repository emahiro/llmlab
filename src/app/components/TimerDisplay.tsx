import React from 'react';

interface TimerDisplayProps {
  time: string;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ time }) => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold">{time}</h1>
    </div>
  );
};

export default TimerDisplay;
