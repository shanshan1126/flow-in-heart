import { FlowStep } from './types';

export const generateDefaultSteps = (goal: string): FlowStep[] => {
  return [
    {
      id: '1',
      title: '环境准备',
      description: '整理桌面，清理无关物品，为专注任务创造整洁空间',
    },
    {
      id: '2',
      title: '物理隔离干扰源',
      description: '将手机调至静音并放入抽屉，关闭电脑上无关的网页和应用',
    },
    {
      id: '3',
      title: '心理调适',
      description: '深呼吸三次，每次吸气4秒，屏息2秒，呼气6秒，让身心平静下来',
    },
    {
      id: '4',
      title: '明确任务',
      description: `在心里默念三次：我现在要专注于${goal ||'这项任务'}，排除杂念，全心投入`,
    },
    {
      id: '5',
      title: '开始行动',
      description: '从最简单的第一步开始，不需要完美，先行动起来',
    },
  ];
};

export const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes === 0) {
    return `${remainingSeconds}秒`;
  }
  return `${minutes}分${remainingSeconds}秒`;
};

export const getTotalTime = (stepStats: { [key: string]: number }): number => {
  return Object.values(stepStats).reduce((total, time) => total + time, 0);
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};