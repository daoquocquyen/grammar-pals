import type { OptionId } from "../content/types";

export const MAX_ATTEMPTS = 2;

export type FeedbackType = "correct" | "retry" | "reveal";
export type AnswerPhase = "question" | "feedback";

export type AnswerState = {
  phase: AnswerPhase;
  attempt: number;
  feedback: FeedbackType | null;
  selectedOptionId: OptionId | null;
  highlightClue: boolean;
  canRetry: boolean;
  canAdvance: boolean;
  advanceLocked: boolean;
};

export type AnswerSelectionInput = {
  optionId: OptionId;
  isCorrect: boolean;
};

export type AdvanceRequest = {
  state: AnswerState;
  shouldAdvance: boolean;
};

export const createAnswerState = (): AnswerState => ({
  phase: "question",
  attempt: 0,
  feedback: null,
  selectedOptionId: null,
  highlightClue: false,
  canRetry: false,
  canAdvance: false,
  advanceLocked: false,
});

export const applyAnswerSelection = (
  state: AnswerState,
  selection: AnswerSelectionInput
): AnswerState => {
  if (state.phase !== "question") {
    return state;
  }

  const nextAttempt = Math.min(state.attempt + 1, MAX_ATTEMPTS);

  if (selection.isCorrect) {
    return {
      ...state,
      phase: "feedback",
      attempt: nextAttempt,
      feedback: "correct",
      selectedOptionId: selection.optionId,
      highlightClue: false,
      canRetry: false,
      canAdvance: true,
      advanceLocked: false,
    };
  }

  if (nextAttempt >= MAX_ATTEMPTS) {
    return {
      ...state,
      phase: "feedback",
      attempt: nextAttempt,
      feedback: "reveal",
      selectedOptionId: selection.optionId,
      highlightClue: false,
      canRetry: false,
      canAdvance: true,
      advanceLocked: false,
    };
  }

  return {
    ...state,
    phase: "feedback",
    attempt: nextAttempt,
    feedback: "retry",
    selectedOptionId: selection.optionId,
    highlightClue: true,
    canRetry: true,
    canAdvance: false,
    advanceLocked: false,
  };
};

export const resetForRetry = (state: AnswerState): AnswerState => {
  if (state.phase !== "feedback" || !state.canRetry) {
    return state;
  }

  return {
    ...state,
    phase: "question",
    feedback: null,
    selectedOptionId: null,
    highlightClue: false,
    canRetry: false,
    canAdvance: false,
    advanceLocked: false,
  };
};

export const requestAdvance = (state: AnswerState): AdvanceRequest => {
  if (state.phase !== "feedback" || !state.canAdvance) {
    return { state, shouldAdvance: false };
  }

  if (state.advanceLocked) {
    return { state, shouldAdvance: false };
  }

  return {
    state: {
      ...state,
      advanceLocked: true,
    },
    shouldAdvance: true,
  };
};
