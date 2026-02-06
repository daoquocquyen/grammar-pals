import type { QuestionPack } from "../content/types";

export const MISSION_QUESTION_COUNT = 8;

export type MissionQuestionSelection =
  | { ok: true; questions: QuestionPack }
  | { ok: false; error: string };

export type MissionAdvanceInput = {
  currentIndex: number;
  totalQuestions: number;
  halfwayShown: boolean;
};

export type MissionAdvanceResult = {
  nextIndex: number;
  showHalfway: boolean;
  isComplete: boolean;
};

export const selectMissionQuestions = (
  questions: QuestionPack,
  totalQuestions: number = MISSION_QUESTION_COUNT
): MissionQuestionSelection => {
  if (totalQuestions <= 0) {
    return { ok: false, error: "Mission must include at least one question." };
  }

  if (questions.length < totalQuestions) {
    return {
      ok: false,
      error: "Not enough questions to start this mission.",
    };
  }

  if (questions.length === totalQuestions) {
    return { ok: true, questions };
  }

  return { ok: true, questions: questions.slice(0, totalQuestions) };
};

export const advanceMission = ({
  currentIndex,
  totalQuestions,
  halfwayShown,
}: MissionAdvanceInput): MissionAdvanceResult => {
  const lastIndex = Math.max(totalQuestions - 1, 0);
  if (currentIndex >= lastIndex) {
    return { nextIndex: lastIndex, showHalfway: false, isComplete: true };
  }

  const nextIndex = currentIndex + 1;
  const halfwayTriggerIndex = 4; // 0-based index for question 5 (after Q4).
  const showHalfway = !halfwayShown && nextIndex === halfwayTriggerIndex;

  return { nextIndex, showHalfway, isComplete: false };
};

export const parsePositiveInteger = (
  value: string | undefined,
  fallback: number
): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

export const clampIndex = (index: number, totalQuestions: number): number => {
  if (!Number.isFinite(index)) {
    return 0;
  }

  if (index < 0) {
    return 0;
  }

  return Math.min(index, Math.max(totalQuestions - 1, 0));
};

export const buildMissionPlayHref = (
  step: number,
  halfwayShown: boolean
): string => {
  const params = new URLSearchParams();
  params.set("step", String(step));
  if (halfwayShown) {
    params.set("halfway", "1");
  }
  return `/mission/play?${params.toString()}`;
};

export const buildHalfwayHref = (nextStep: number): string => {
  const params = new URLSearchParams();
  params.set("next", String(nextStep));
  params.set("halfway", "1");
  return `/mission/halfway?${params.toString()}`;
};
