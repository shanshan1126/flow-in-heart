import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoalPageProps {
  onComplete: (goal: string) => void;
}

const quickTags = [
  { icon: '📖', label: '深度阅读' },
  { icon: '💻', label: '代码编写' },
  { icon: '📝', label: '方案构思' },
];

export const GoalPage: React.FC<GoalPageProps> = ({ onComplete }) => {
  const [goal, setGoal] = useState('');
  const [showNext, setShowNext] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setShowNext(goal.trim().length > 0);
  }, [goal]);

  const handleTagClick = (tag: string) => {
    setGoal(tag);
  };

  const handleNext = () => {
    if (goal.trim()) {
      onComplete(goal.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-glow-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-glow-600/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="w-full max-w-md relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-center text-[20px] font-medium text-cloud-white tracking-wide mb-6"
        >
          此刻，你想完成什么？
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="输入你的专注目标..."
              className="w-full bg-transparent text-cloud-white text-xl font-light placeholder:text-text-dim pb-3 focus:outline-none transition-all"
              style={{
                caretColor: '#A78BFA',
                borderBottom: '2px solid #A78BFA',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && showNext) {
                  handleNext();
                }
              }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {quickTags.map((tag, index) => (
            <motion.button
              key={tag.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTagClick(tag.label)}
              className="px-5 py-2.5 rounded-full text-cloud-white/80 text-sm font-medium transition-all"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              <span className="mr-1.5">{tag.icon}</span>
              {tag.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {showNext && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-full h-[48px] rounded-[24px] font-medium text-lg text-white transition-all glow-violet"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
                }}
              >
                下一步
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};