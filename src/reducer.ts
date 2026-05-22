import { FlowState, FlowAction } from './types';

export const initialState: FlowState = {
  currentStatus: '',
  flowGoal: '',
  steps: [],
  currentStepIndex: 0,
  startTime: 0,
  phase: 'home',
  stepStats: {},
};

export function flowReducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'SET_HOME_INPUTS':
      return {
        ...state,
        currentStatus: action.payload.currentStatus,
        flowGoal: action.payload.flowGoal,
      };
    case 'GENERATE_STEPS':
      return {
        ...state,
        steps: action.payload,
        phase: 'customize',
      };
    case 'ADD_STEP':
      return {
        ...state,
        steps: [...state.steps, action.payload],
      };
    case 'REMOVE_STEP':
      return {
        ...state,
        steps: state.steps.filter((step) => step.id !== action.payload),
      };
    case 'UPDATE_STEP':
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.id === action.payload.id
            ? { ...step, title: action.payload.title, description: action.payload.description }
            : step
        ),
      };
    case 'START_FLOW':
      return {
        ...state,
        phase: 'flow',
        currentStepIndex: 0,
        startTime: Date.now(),
        stepStats: {},
      };
    case 'COMPLETE_STEP': {
      const currentStep = state.steps[state.currentStepIndex];
      const stepEndTime = Date.now();
      const stepDuration = stepEndTime - (currentStep.startTime || state.startTime);
      
      const newStats = {
        ...state.stepStats,
        [currentStep.id]: stepDuration,
      };

      if (state.currentStepIndex >= state.steps.length - 1) {
        return {
          ...state,
          stepStats: newStats,
          phase: 'result',
        };
      }

      return {
        ...state,
        stepStats: newStats,
        currentStepIndex: state.currentStepIndex + 1,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}