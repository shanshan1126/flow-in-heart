import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { FlowStep } from '../types';
import { generateId } from '../utils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CustomizeModalProps {
  open: boolean;
  steps: FlowStep[];
  onClose: () => void;
  onStart: (steps: FlowStep[]) => void;
  onAddStep: (step: FlowStep) => void;
  onRemoveStep: (id: string) => void;
  onUpdateStep: (id: string, title: string, description: string) => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  open,
  steps,
  onClose,
  onStart,
  onAddStep,
  onRemoveStep,
  onUpdateStep,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const handleAddStep = () => {
    if (newTitle.trim()) {
      onAddStep({
        id: generateId(),
        title: newTitle.trim(),
        description: newDescription.trim(),
      });
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleStart = () => {
    if (steps.length > 0) {
      onStart(steps);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">定制你的心流步骤</h2>
            <p className="text-sm text-gray-500">可以添加、删除或修改步骤</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
                    步骤 {index + 1}
                  </span>
                  <button
                    onClick={() => onRemoveStep(step.id)}
                    className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => onUpdateStep(step.id, e.target.value, step.description)}
                  className="w-full bg-transparent text-lg font-medium text-gray-900 outline-none mb-1"
                />
                <textarea
                  value={step.description}
                  onChange={(e) => onUpdateStep(step.id, step.title, e.target.value)}
                  placeholder="详细说明..."
                  className="w-full bg-transparent text-sm text-gray-600 outline-none resize-none h-16"
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-dashed border-indigo-200">
            <div className="text-sm font-medium text-gray-700 mb-2">添加新步骤</div>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="步骤标题"
              className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-indigo-200 outline-none focus:border-indigo-500 mb-2"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="步骤说明（可选）"
              className="w-full bg-white rounded-lg px-3 py-2 text-sm border border-indigo-200 outline-none focus:border-indigo-500 mb-2 resize-none h-16"
            />
            <button
              onClick={handleAddStep}
              disabled={!newTitle.trim()}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition-colors",
                newTitle.trim()
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Plus className="w-4 h-4" />
              添加
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleStart}
            disabled={steps.length === 0}
            className={cn(
              "flex-1 px-6 py-3 rounded-xl font-semibold text-white transition-all",
              steps.length > 0
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-200"
                : "bg-gray-300 cursor-not-allowed"
            )}
          >
            开始仪式
          </button>
        </div>
      </motion.div>
    </div>
  );
};