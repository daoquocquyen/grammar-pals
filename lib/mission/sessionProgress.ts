import { createMissionProgress, recordAnswerResult } from "./missionProgress";

export type MissionSessionProgress = ReturnType<typeof createMissionProgress> & {
  topicId: string;
};

export type MissionSessionResult =
  | { ok: true; value: MissionSessionProgress | null }
  | { ok: false; error: string };

const SESSION_KEY = "grammarPalsMissionSession_v1";

const hasSessionStorage = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.sessionStorage !== "undefined";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isBooleanArray = (value: unknown): value is boolean[] =>
  Array.isArray(value) && value.every((item) => typeof item === "boolean");

const isString = (value: unknown): value is string => typeof value === "string";

const parseSession = (raw: string | null): MissionSessionProgress | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }

    if (!isNumber(parsed.totalCount) || !isNumber(parsed.correctCount)) {
      return null;
    }

    if (!isBooleanArray(parsed.lastAnswersCorrect)) {
      return null;
    }

    const topicId = isString(parsed.topicId) ? parsed.topicId : "is_are";

    return {
      totalCount: parsed.totalCount,
      correctCount: parsed.correctCount,
      lastAnswersCorrect: parsed.lastAnswersCorrect,
      topicId,
    };
  } catch {
    return null;
  }
};

export const loadMissionSession = (): MissionSessionResult => {
  if (!hasSessionStorage()) {
    return { ok: false, error: "Session storage unavailable" };
  }

  const parsed = parseSession(window.sessionStorage.getItem(SESSION_KEY));
  return { ok: true, value: parsed };
};

export const saveMissionSession = (
  session: MissionSessionProgress
): MissionSessionResult => {
  if (!hasSessionStorage()) {
    return { ok: false, error: "Session storage unavailable" };
  }

  try {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { ok: true, value: session };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Storage failed";
    return { ok: false, error: message };
  }
};

export const clearMissionSession = (): MissionSessionResult => {
  if (!hasSessionStorage()) {
    return { ok: false, error: "Session storage unavailable" };
  }

  try {
    window.sessionStorage.removeItem(SESSION_KEY);
    return { ok: true, value: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Storage failed";
    return { ok: false, error: message };
  }
};

export const initMissionSession = (
  totalCount: number,
  topicId: string
): MissionSessionResult => {
  const base = createMissionProgress(totalCount);
  return saveMissionSession({ ...base, topicId });
};

export const updateMissionSession = (
  isCorrect: boolean,
  totalCount: number,
  topicId: string
): MissionSessionResult => {
  const currentResult = loadMissionSession();
  if (!currentResult.ok) {
    return currentResult;
  }

  const current = currentResult.value ?? {
    ...createMissionProgress(totalCount),
    topicId,
  };

  const next = {
    ...recordAnswerResult(current, isCorrect),
    topicId,
    totalCount,
  };

  return saveMissionSession(next);
};
