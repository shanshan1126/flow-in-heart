import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultPageProps {
  goal: string;
  totalTime: number;
  breakCount: number;
  flashNotes: string[];
  onReset: () => void;
}

const quotes = [
  '心流是秩序的回归',
  '专注是灵魂的香气',
  '深度工作，深度思考',
  '时间因专注而有意义',
  '心流是最好的状态',
];

const moods = [
  { id: 'tired', emoji: '😫', label: '疲惫' },
  { id: 'calm', emoji: '😐', label: '平静' },
  { id: 'fulfilled', emoji: '😌', label: '充实' },
];

export const ResultPage: React.FC<ResultPageProps> = ({
  goal,
  totalTime,
  flashNotes,
  onReset,
}) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);
  const longPressTimer = useRef<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins === 0) return `${secs}秒`;
    return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
  };

  const starCount = Math.min(Math.floor(totalTime / 60 / 5), 12);
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  const today = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '.');

  const constellation = useMemo(() => {
    return Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 80,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 2,
    }));
  }, [starCount]);

  const handleLongPressStart = () => {
    longPressTimer.current = window.setTimeout(() => {
      if (navigator.vibrate) navigator.vibrate(20);
      alert('心流卡片已保存！（模拟保存到相册）');
    }, 800);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0 bg-noise pointer-events-none z-30" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {constellation.map((star, i) => {
          const nextIndex = (i + 1) % constellation.length;
          const next = constellation[nextIndex];
          return (
            <React.Fragment key={star.id}>
              <motion.circle
                cx={`${star.x}%`}
                cy={`${star.y}%`}
                r={star.size}
                fill="#A78BFA"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  delay: star.delay,
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ filter: 'blur(0.5px)' }}
              />
              {i < constellation.length - 1 && (
                <motion.line
                  x1={`${star.x}%`}
                  y1={`${star.y}%`}
                  x2={`${next.x}%`}
                  y2={`${next.y}%`}
                  stroke="rgba(167, 139, 250, 0.15)"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.3, duration: 1 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </svg>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-glow-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
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
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="mb-5"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-cloud-white text-xl font-medium mb-2"
        >
          心流之旅完成
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-text-dim text-sm mb-8"
        >
          {goal}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full rounded-3xl p-7 mb-8"
          style={{
            background: 'rgba(34, 28, 56, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(167, 139, 250, 0.1)',
          }}
        >
          <motion.p
            className="text-center text-[52px] font-light font-mono tracking-tight text-cloud-white mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
          >
            {formatTime(totalTime)}
          </motion.p>

          <div className="flex items-center justify-center gap-6 text-text-dim text-sm">
            <span>目标：{goal}</span>
            {flashNotes.length > 0 && (
              <>
                <span className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <span>闪念：{flashNotes.length} 条</span>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mb-8"
        >
          <p className="text-center text-text-dim text-sm mb-4">现在的感受是？</p>
          <div className="flex justify-center gap-4">
            {moods.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.id)}
                className="flex flex-col items-center gap-2 px-6 py-3 rounded-2xl transition-all"
                style={{
                  background: selectedMood === mood.id
                    ? 'rgba(167, 139, 250, 0.15)'
                    : 'rgba(255, 255, 255, 0.04)',
                  border: selectedMood === mood.id
                    ? '1px solid rgba(167, 139, 250, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  transform: selectedMood === mood.id ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span className="text-xs" style={{ color: selectedMood === mood.id ? '#C4B5FD' : 'rgba(241, 245, 249, 0.5)' }}>
                  {mood.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
              onClick={() => setShowCard(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 3 }}
                transition={{ type: 'spring', damping: 20 }}
                className="w-full max-w-xs"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={handleLongPressStart}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={handleLongPressStart}
                onTouchEnd={handleLongPressEnd}
              >
                <div
                  className="rounded-sm overflow-hidden"
                  style={{
                    background: '#F1F5F9',
                    padding: '16px 16px 40px 16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  <div
                    className="rounded-sm p-5 flex flex-col items-center justify-center"
                    style={{
                      background: '#1A1528',
                      minHeight: 200,
                    }}
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(starCount)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -30 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="w-3 h-3"
                        >
                          <svg viewBox="0 0 24 24" fill="#A78BFA" width="12" height="12">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-cloud-white text-base font-medium mb-1">{goal}</p>
                    <p className="text-text-dim text-xs mb-3">{today}</p>
                    <p className="text-violet-glow-400 text-2xl font-mono font-light">{formatTime(totalTime)}</p>
                    <p className="text-text-dim text-xs mt-4 italic">"{quote}"</p>
                  </div>
                </div>
                <p className="text-center text-text-dim text-xs mt-3">长按卡片保存到相册</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCard(true)}
          className="w-full py-3 rounded-xl font-medium text-cloud-white/70 transition-all mb-4"
          style={{ background: 'rgba(255, 255, 255, 0.06)' }}
        >
          查看心流卡片
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="w-full h-[48px] rounded-[24px] font-medium text-lg text-white transition-all glow-violet flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          返回首页
        </motion.button>
      </motion.div>
    </div>
  );
};