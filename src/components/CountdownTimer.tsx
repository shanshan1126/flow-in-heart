import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, Pause, RotateCcw, X } from 'lucide-react';

interface CountdownTimerProps {
  onClose: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ onClose }) => {
  const [presetMinutes, setPresetMinutes] = useState<number>(5);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(presetMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, remainingSeconds]);

  const togglePlay = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setRemainingSeconds(presetMinutes * 60);
  };

  const handlePresetChange = (minutes: number) => {
    setPresetMinutes(minutes);
    setIsRunning(false);
    setRemainingSeconds(minutes * 60);
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const progress = (remainingSeconds / (presetMinutes * 60)) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-gray-900">倒计时</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          {[1, 5, 10, 15, 30].map((m) => (
            <button
              key={m}
              onClick={() => handlePresetChange(m)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                presetMinutes === m
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {m}分
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-gray-900 font-mono">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
        </div>

        <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween' }}
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
          <button
            onClick={togglePlay}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                暂停
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {remainingSeconds === 0 ? '重新开始' : '开始'}
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};