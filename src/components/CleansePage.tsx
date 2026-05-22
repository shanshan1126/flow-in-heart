import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CleansePageProps {
  onComplete: () => void;
}

const checklist = [
  { id: 'phone', text: '手机已开启「勿扰模式」' },
  { id: 'desk', text: '桌面已清理，只留必要物品' },
  { id: 'water', text: '水杯已接满水' },
];

export const CleansePage: React.FC<CleansePageProps> = ({ onComplete }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const allChecked = checkedItems.length === checklist.length;

  const toggleItem = (id: string) => {
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-glow-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
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
          className="text-center text-[20px] font-medium text-cloud-white tracking-wide mb-2"
        >
          为了极致的专注，请确认：
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-center text-text-dim text-sm mb-10"
        >
          排除干扰，创造纯净的专注环境
        </motion.p>

        <div className="space-y-6 mb-10">
          {checklist.map((item, index) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.12, duration: 0.3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl transition-all"
                style={{
                  background: isChecked ? 'rgba(167, 139, 250, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                }}
              >
                <motion.div
                  className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    border: isChecked ? 'none' : '1.5px solid rgba(255, 255, 255, 0.25)',
                    background: isChecked ? '#A78BFA' : 'transparent',
                    boxShadow: isChecked ? '0 0 12px rgba(167, 139, 250, 0.4)' : 'none',
                  }}
                  animate={isChecked ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isChecked && (
                    <motion.svg
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                  )}
                </motion.div>
                <span
                  className="flex-1 text-left text-lg font-light transition-all duration-300"
                  style={{
                    color: isChecked ? 'rgba(241, 245, 249, 0.4)' : '#F1F5F9',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}
                >
                  {item.text}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {allChecked ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={onComplete}
                className="w-full h-[48px] rounded-[24px] font-medium text-lg text-white transition-all glow-violet"
                style={{
                  background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
                }}
              >
                开始仪式
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <span className="text-text-dim text-sm">
                完成 {checkedItems.length} / {checklist.length}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};