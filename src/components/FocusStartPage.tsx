import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FocusStartPageProps {
  goal: string;
  onStart: (duration: number, autoBreak: boolean) => void;
}

export const FocusStartPage: React.FC<FocusStartPageProps> = ({ goal, onStart }) => {
  const [duration, setDuration] = useState(25);
  const [autoBreak, setAutoBreak] = useState(true);

  const adjustDuration = (delta: number) => {
    const newDuration = duration + delta;
    if (newDuration >= 5 && newDuration <= 120) {
      setDuration(newDuration);
    }
  };

  const handleStart = () => {
    onStart(duration * 60, autoBreak);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-violet-glow-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full max-w-md relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-cloud-white/70 text-base font-light"
            style={{ background: 'rgba(167, 139, 250, 0.1)', border: '1px solid rgba(167, 139, 250, 0.15)' }}
          >
            {goal}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center justify-center gap-10 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => adjustDuration(-5)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#F1F5F9',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>

          <div className="text-center">
            <motion.p
              className="text-[64px] font-light font-mono tracking-tight text-cloud-white"
              key={duration}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {String(duration).padStart(2, '0')}:00
            </motion.p>
            <p className="text-text-dim text-sm mt-2">专注时长</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => adjustDuration(5)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#F1F5F9',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="w-full flex items-center justify-between p-5 rounded-2xl mb-12"
          style={{ background: 'rgba(255, 255, 255, 0.04)' }}
        >
          <div>
            <p className="text-cloud-white text-base font-medium mb-1">结束后自动进入休息</p>
            <p className="text-text-dim text-sm">专注结束后自动开始休息计时</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setAutoBreak(!autoBreak)}
            className="w-12 h-7 rounded-full relative transition-colors flex-shrink-0"
            style={{ background: autoBreak ? '#A78BFA' : 'rgba(255, 255, 255, 0.15)' }}
          >
            <motion.div
              className="absolute top-0.5 w-6 h-6 rounded-full bg-white"
              animate={{ left: autoBreak ? '22px' : '2px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
            />
          </motion.button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="w-full h-[48px] rounded-[24px] font-medium text-lg text-white transition-all glow-violet"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' }}
        >
          进入心流
        </motion.button>
      </motion.div>
    </div>
  );
};