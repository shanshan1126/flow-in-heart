import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BreathePageProps {
  onComplete: () => void;
}

const TOTAL_CYCLES = 3;
const INHALE_DURATION = 4000;
const EXHALE_DURATION = 4000;

export const BreathePage: React.FC<BreathePageProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);

  const runCycle = useCallback(() => {
    setPhase('inhale');

    setTimeout(() => {
      setPhase('exhale');
    }, INHALE_DURATION);

    setTimeout(() => {
      setBreathCount((prev) => {
        const next = prev + 1;
        if (next >= TOTAL_CYCLES) {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowWhiteFlash(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 400);
          return next;
        }
        return next;
      });
    }, INHALE_DURATION + EXHALE_DURATION);
  }, [onComplete]);

  useEffect(() => {
    if (isTransitioning) return;

    runCycle();

    const cycleInterval = setInterval(() => {
      runCycle();
    }, INHALE_DURATION + EXHALE_DURATION);

    return () => clearInterval(cycleInterval);
  }, [runCycle, isTransitioning]);

  const currentCycle = Math.min(breathCount + 1, TOTAL_CYCLES);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0 bg-noise pointer-events-none z-30" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-10 flex items-center justify-center" style={{ width: 200, height: 200 }}>
          <motion.div
            className="rounded-full absolute"
            style={{
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.6) 0%, rgba(167, 139, 250, 0.1) 50%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              width: phase === 'inhale' ? [120, 180] : [180, 120],
              height: phase === 'inhale' ? [120, 180] : [180, 120],
              opacity: phase === 'inhale' ? [0.6, 1] : [1, 0.6],
              x: '-50%',
              y: '-50%',
            }}
            transition={{
              duration: phase === 'inhale' ? INHALE_DURATION / 1000 : EXHALE_DURATION / 1000,
              ease: 'easeInOut',
            }}
          />

          <motion.div
            className="rounded-full absolute"
            style={{
              width: 40,
              height: 40,
              background: '#C4B5FD',
              filter: 'blur(8px)',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          key={phase + breathCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <motion.p
            className="text-cloud-white text-3xl font-light font-mono tracking-wider mb-2"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {phase === 'inhale' ? '吸气...' : '呼气...'}
          </motion.p>
          <p className="text-text-dim text-sm">跟随光球，深呼吸...</p>
        </motion.div>

        <motion.div className="flex items-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: i < breathCount ? '#A78BFA' : 'rgba(255, 255, 255, 0.15)',
                boxShadow: i < breathCount ? '0 0 8px rgba(167, 139, 250, 0.5)' : 'none',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: 'spring' }}
            />
          ))}
        </motion.div>

        <motion.p
          className="text-text-dim text-xs"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          第 {currentCycle} / {TOTAL_CYCLES} 次呼吸
        </motion.p>
      </motion.div>

      <AnimatePresence>
        {showWhiteFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};