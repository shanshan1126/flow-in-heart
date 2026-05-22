import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle } from 'lucide-react';
import { FlowStep } from '../types';
import { CountdownTimer } from './CountdownTimer';

interface FlowPageProps {
  steps: FlowStep[];
  currentStepIndex: number;
  onCompleteStep: () => void;
}

export const FlowPage: React.FC<FlowPageProps> = ({
  steps,
  currentStepIndex,
  onCompleteStep,
}) => {
  const [showTimer, setShowTimer] = useState(false);
  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  useEffect(() => {
    const el = document.getElementById('step-card');
    if (el) {
      el.focus();
    }
  }, [currentStepIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-400 to-purple-400"
          initial={{ width: `${((currentStepIndex) / steps.length) * 100}%` }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>

      <button
        onClick={() => setShowTimer(true)}
        className="absolute top-4 right-4 p-3 bg-white/10 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors"
      >
        <Clock className="w-6 h-6" />
      </button>

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            id="step-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.05 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12"
            tabIndex={0}
          >
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white/90 text-sm font-medium mb-4">
                步骤 {currentStepIndex + 1} / {steps.length}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
              {currentStep.title}
            </h2>

            {currentStep.description && (
              <p className="text-lg md:text-xl text-white/80 text-center leading-relaxed mb-12">
                {currentStep.description}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCompleteStep}
              className="w-full py-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white text-xl font-bold shadow-xl shadow-indigo-500/30 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle className="w-6 h-6" />
              {currentStepIndex === steps.length - 1 ? '完成所有步骤' : '完成，下一步'}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showTimer && <CountdownTimer onClose={() => setShowTimer(false)} />}
      </AnimatePresence>
    </div>
  );
};