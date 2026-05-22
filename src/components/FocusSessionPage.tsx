import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FocusSessionPageProps {
  goal: string;
  duration: number;
  isBreak: boolean;
  onComplete: () => void;
  onEnd: () => void;
  onFlashNote?: (note: string) => void;
}

const PARTICLE_COUNT = 100;
const RING_RADIUS = 120;

const focusMessages = ['保持专注...', '思绪在流动...', '沉浸其中...', '继续前进...', '时间在流逝...'];

export const FocusSessionPage: React.FC<FocusSessionPageProps> = ({
  goal,
  duration,
  isBreak,
  onComplete,
  onEnd,
  onFlashNote,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showGoal, setShowGoal] = useState(false);
  const [showFlashNote, setShowFlashNote] = useState(false);
  const [flashNoteText, setFlashNoteText] = useState('');
  const [hasNotes, setHasNotes] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const touchStartY = useRef(0);
  const goalTimerRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (navigator.vibrate) navigator.vibrate(50);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [onComplete]);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % focusMessages.length);
    }, 60 * 1000);
    return () => clearInterval(msgInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = duration > 0 ? timeLeft / duration : 0;
  const aliveParticles = Math.floor(progress * PARTICLE_COUNT);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (i / PARTICLE_COUNT) * 360;
      const rad = (angle * Math.PI) / 180;
      const x = Math.cos(rad) * RING_RADIUS;
      const y = Math.sin(rad) * RING_RADIUS;
      return { id: i, angle, x, y };
    });
  }, []);

  const particleColor = isBreak ? '#FCD34D' : '#A78BFA';

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY > 40) {
      setShowGoal(true);
      if (goalTimerRef.current) clearTimeout(goalTimerRef.current);
      goalTimerRef.current = window.setTimeout(() => {
        setShowGoal(false);
      }, 2000);
    }
  };

  const handleSaveFlashNote = () => {
    if (flashNoteText.trim()) {
      const note = flashNoteText.trim();
      onFlashNote?.(note);
      setHasNotes(true);
      setFlashNoteText('');
      setShowFlashNote(false);
    }
  };

  const bgColor = isBreak
    ? '#2D2420'
    : '#1A1528';

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-[2000ms]"
      style={{ background: bgColor }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="absolute inset-0 bg-noise pointer-events-none z-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: isBreak
              ? 'radial-gradient(circle, rgba(252, 211, 77, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(167, 139, 250, 0.06) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence>
        {showGoal && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-40"
          >
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-cloud-white/80 text-base font-light"
              style={{ background: 'rgba(167, 139, 250, 0.12)', border: '1px solid rgba(167, 139, 250, 0.2)' }}
            >
              {goal.length > 12 ? goal.substring(0, 12) + '...' : goal}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setShowConfirmExit(true)}
        className="absolute top-6 left-6 text-text-dim hover:text-cloud-white transition-colors text-sm font-light z-40"
      >
        结束
      </motion.button>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative" style={{ width: 280, height: 280 }}>
          {particles.map((p, i) => {
            const isAlive = i < aliveParticles;
            const collapseFactor = isAlive ? 1 : 0.3;
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  width: isAlive ? 4 : 2,
                  height: isAlive ? 4 : 2,
                  left: `calc(50% + ${p.x * collapseFactor}px)`,
                  top: `calc(50% + ${p.y * collapseFactor}px)`,
                  background: particleColor,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: isAlive
                    ? `0 0 ${isBreak ? 6 : 8}px ${particleColor}`
                    : 'none',
                  opacity: isAlive ? 0.9 : 0.15,
                }}
                animate={
                  !isAlive
                    ? {
                        opacity: [0.9, 0.15],
                        left: [
                          `calc(50% + ${p.x}px)`,
                          `calc(50% + ${p.x * collapseFactor}px)`,
                        ],
                        top: [
                          `calc(50% + ${p.y}px)`,
                          `calc(50% + ${p.y * collapseFactor}px)`,
                        ],
                      }
                    : {}
                }
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            );
          })}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.p
              className="text-[56px] font-light font-mono tracking-tight"
              style={{ color: isBreak ? '#FCD34D' : '#F1F5F9' }}
              key={timeLeft}
              initial={{ scale: 1.08, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {formatTime(timeLeft)}
            </motion.p>
            <p
              className="text-sm mt-3 font-light transition-colors duration-[2000ms]"
              style={{ color: isBreak ? 'rgba(252, 211, 77, 0.6)' : 'rgba(241, 245, 249, 0.5)' }}
            >
              {isBreak ? '休息中' : focusMessages[currentMessageIndex]}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowFlashNote(true)}
        className="absolute bottom-24 right-6 w-12 h-12 rounded-full flex items-center justify-center z-40"
        style={{
          background: 'rgba(34, 28, 56, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(167, 139, 250, 0.15)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isBreak ? '#FCD34D' : '#A78BFA'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        {hasNotes && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
            style={{ background: '#F43F5E' }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {showFlashNote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => setShowFlashNote(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md px-6 pb-10"
            >
              <div
                className="rounded-3xl p-6"
                style={{
                  background: 'rgba(30, 24, 50, 0.9)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(167, 139, 250, 0.12)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="text-cloud-white font-medium">闪念记录</p>
                  <button
                    onClick={() => setShowFlashNote(false)}
                    className="text-text-dim hover:text-cloud-white transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <input
                  type="text"
                  value={flashNoteText}
                  onChange={(e) => setFlashNoteText(e.target.value)}
                  placeholder="记下此刻的想法..."
                  className="w-full bg-transparent text-cloud-white text-lg placeholder:text-text-dim pb-3 mb-5 focus:outline-none"
                  style={{ borderBottom: '1px solid rgba(167, 139, 250, 0.3)', caretColor: '#A78BFA' }}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveFlashNote();
                  }}
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFlashNote(false)}
                    className="flex-1 py-3 rounded-xl text-cloud-white/60 font-medium transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.06)' }}
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveFlashNote}
                    disabled={!flashNoteText.trim()}
                    className="flex-1 py-3 rounded-xl font-medium transition-all"
                    style={{
                      background: flashNoteText.trim()
                        ? 'linear-gradient(135deg, #A78BFA, #8B5CF6)'
                        : 'rgba(255, 255, 255, 0.08)',
                      color: flashNoteText.trim() ? '#fff' : 'rgba(241, 245, 249, 0.3)',
                    }}
                  >
                    记录
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConfirmExit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(40, 10, 20, 0.95) 0%, rgba(26, 21, 40, 0.98) 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="mb-6"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ background: 'rgba(244, 63, 94, 0.15)' }}
                >
                  <span className="text-2xl">⚠️</span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-cloud-white text-xl font-medium mb-3"
              >
                心流已中断
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-text-dim text-base leading-relaxed mb-10"
              >
                专注状态很珍贵，确定要放弃吗？
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="space-y-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowConfirmExit(false)}
                  className="w-full h-[48px] rounded-[24px] font-medium text-lg text-white transition-all glow-violet"
                  style={{ background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)' }}
                >
                  返回专注
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onEnd}
                  className="w-full py-3 text-text-dim hover:text-cloud-white/70 text-base font-light transition-colors"
                >
                  残忍离开
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};