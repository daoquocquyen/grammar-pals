import type { Question } from "../content/types";
import { hasMastery } from "./mastery";

export type MissionProgressSnapshot = {
  correctCount: number;
  totalCount: number;
  lastAnswersCorrect: boolean[];
  masteryAchieved: boolean;
};

export type MissionProgressState = {
  correctCount: number;
  totalCount: number;
  lastAnswersCorrect: boolean[];
};

export const createMissionProgress = (
  totalCount: number
): MissionProgressState => ({
  correctCount: 0,
  totalCount,
  lastAnswersCorrect: [],
});

export const recordAnswerResult = (
  state: MissionProgressState,
  isCorrect: boolean
): MissionProgressState => {
  const nextCorrectCount = state.correctCount + (isCorrect ? 1 : 0);
  const nextLastAnswers = [...state.lastAnswersCorrect, isCorrect].slice(-3);

  return {
    ...state,
    correctCount: nextCorrectCount,
    lastAnswersCorrect: nextLastAnswers,
  };
};

export const getMissionSnapshot = (
  state: MissionProgressState
): MissionProgressSnapshot => {
  const masteryAchieved = hasMastery({
    correctCount: state.correctCount,
    totalCount: state.totalCount,
    lastAnswersCorrect: state.lastAnswersCorrect,
  });

  return {
    correctCount: state.correctCount,
    totalCount: state.totalCount,
    lastAnswersCorrect: [...state.lastAnswersCorrect],
    masteryAchieved,
  };
};

export const extractTopicId = (questions: Question[]): string => {
  const firstSkill = questions[0]?.skill ?? "is_are";
  return firstSkill;
};
