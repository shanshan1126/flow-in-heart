export interface FlowStep {
  id: string;
  title: string;
  description: string;
  startTime?: number;
  endTime?: number;
}

export interface FlowState {
  currentStatus: string;
  flowGoal: string;
  steps: FlowStep[];
  currentStepIndex: number;
  startTime: number;
  phase: 'home' | 'customize' | 'flow' | 'result';
  stepStats: { [key: string]: number };
}

export type FlowAction =
  | { type: 'SET_HOME_INPUTS'; payload: { currentStatus: string; flowGoal: string } }
  | { type: 'GENERATE_STEPS'; payload: FlowStep[] }
  | { type: 'ADD_STEP'; payload: FlowStep }
  | { type: 'REMOVE_STEP'; payload: string }
  | { type: 'UPDATE_STEP'; payload: { id: string; title: string; description: string } }
  | { type: 'START_FLOW' }
  | { type: 'COMPLETE_STEP' }
  | { type: 'RESET' };