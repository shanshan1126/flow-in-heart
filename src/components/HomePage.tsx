import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HomePageProps {
  onGenerate: (currentStatus: string, flowGoal: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onGenerate }) => {
  const [currentStatus, setCurrentStatus] = useState('');
  const [flowGoal, setFlowGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStatus.trim() && flowGoal.trim()) {
      onGenerate(currentStatus.trim(), flowGoal.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">心流模式</h1>
          <p className="text-gray-500">帮你快速进入专注的心流状态</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 ml-1">
              <Zap className="w-4 h-4 mr-2 text-orange-500" />
              当前状态
            </label>
            <input
              type="text"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              placeholder="例如：刷短视频"
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-800 placeholder:text-gray-400",
                !currentStatus.trim() && currentStatus && "border-red-300"
              )}
              autoFocus
            />
            <p className="text-xs text-gray-400 ml-1">你现在正在做的事情（通常是干扰项）</p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 ml-1">
              <Target className="w-4 h-4 mr-2 text-indigo-500" />
              心流目标
            </label>
            <input
              type="text"
              value={flowGoal}
              onChange={(e) => setFlowGoal(e.target.value)}
              placeholder="例如：阅读《人类简史》"
              className={cn(
                "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-gray-800 placeholder:text-gray-400",
                !flowGoal.trim() && flowGoal && "border-red-300"
              )}
            />
            <p className="text-xs text-gray-400 ml-1">你想要进入心流去完成的事情</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!currentStatus.trim() || !flowGoal.trim()}
            className={cn(
              "w-full py-4 rounded-xl font-semibold text-white text-lg transition-all shadow-lg",
              currentStatus.trim() && flowGoal.trim()
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-200"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            生成心流方案
          </motion.button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>一步一步，带你进入深度专注</p>
        </div>
      </motion.div>
    </div>
  );
};