import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GoalPage } from './components/GoalPage';
import { CleansePage } from './components/CleansePage';
import { BreathePage } from './components/BreathePage';
import { FocusStartPage } from './components/FocusStartPage';
import { FocusSessionPage } from './components/FocusSessionPage';
import { ResultPage } from './components/ResultPage';

type Phase =
  | 'goal'
  | 'cleanse'
  | 'breathe'
  | 'focus-start'
  | 'focus-session'
  | 'break-session'
  | 'result';

function App() {
  const [phase, setPhase] = useState<Phase>('goal');
  const [goal, setGoal] = useState('');
  const [focusDuration, setFocusDuration] = useState(1500);
  const [autoBreak, setAutoBreak] = useState(true);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [flashNotes, setFlashNotes] = useState<string[]>([]);

  const handleGoalComplete = (goalText: string) => {
    setGoal(goalText);
    setPhase('cleanse');
  };

  const handleCleanseComplete = () => {
    setPhase('breathe');
  };

  const handleBreatheComplete = () => {
    setPhase('focus-start');
  };

  const handleFocusStart = (duration: number, autoBreakEnabled: boolean) => {
    setFocusDuration(duration);
    setAutoBreak(autoBreakEnabled);
    setPhase('focus-session');
  };

  const handleFocusComplete = () => {
    setTotalFocusTime((prev) => prev + focusDuration);
    if (autoBreak) {
      setPhase('break-session');
    } else {
      setPhase('result');
    }
  };

  const handleBreakComplete = () => {
    setPhase('result');
  };

  const handleEndSession = () => {
    setPhase('result');
  };

  const handleReset = () => {
    setPhase('goal');
    setGoal('');
    setFocusDuration(1500);
    setAutoBreak(true);
    setTotalFocusTime(0);
    setBreakCount(0);
    setFlashNotes([]);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-deep-space-800">
      <AnimatePresence mode="wait">
        {phase === 'goal' && (
          <motion.div
            key="goal"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <GoalPage onComplete={handleGoalComplete} />
          </motion.div>
        )}

        {phase === 'cleanse' && (
          <motion.div
            key="cleanse"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <CleansePage onComplete={handleCleanseComplete} />
          </motion.div>
        )}

        {phase === 'breathe' && (
          <motion.div
            key="breathe"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <BreathePage onComplete={handleBreatheComplete} />
          </motion.div>
        )}

        {phase === 'focus-start' && (
          <motion.div
            key="focus-start"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <FocusStartPage goal={goal} onStart={handleFocusStart} />
          </motion.div>
        )}

        {phase === 'focus-session' && (
          <motion.div
            key="focus-session"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <FocusSessionPage
              goal={goal}
              duration={focusDuration}
              isBreak={false}
              onComplete={handleFocusComplete}
              onEnd={handleEndSession}
              onFlashNote={(note) => setFlashNotes((prev) => [...prev, note])}
            />
          </motion.div>
        )}

        {phase === 'break-session' && (
          <motion.div
            key="break-session"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <FocusSessionPage
              goal="休息时间"
              duration={15 * 60}
              isBreak={true}
              onComplete={handleBreakComplete}
              onEnd={handleEndSession}
            />
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <ResultPage
              goal={goal}
              totalTime={totalFocusTime}
              breakCount={breakCount}
              flashNotes={flashNotes}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
