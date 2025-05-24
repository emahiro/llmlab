'use client';

import { useState } from 'react';
import PomodoroTimer from '@/components/PomodoroTimer';
import SessionHistory from '@/components/SessionHistory';

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSessionComplete = (duration: number, completed: boolean) => {
    // セッション完了時に履歴を更新
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        {/* メインコンテンツ */}
        <main className="flex-1 flex flex-col items-center justify-center min-h-screen">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ポモドーロタイマー
            </h1>
            <p className="text-gray-600">
              集中時間を管理して生産性を向上させましょう
            </p>
          </div>
          
          <PomodoroTimer onSessionComplete={handleSessionComplete} />
          
          <div className="mt-8 text-center text-sm text-gray-500 max-w-md">
            <p>
              ポモドーロ・テクニックは、25分間の集中作業と5分間の休憩を繰り返す時間管理法です。
              タイマーを使って効率的に作業を進めましょう。
            </p>
          </div>
        </main>

        {/* サイドバー */}
        <SessionHistory refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}
