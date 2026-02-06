export type StoredProgress = {
  masteryBySkill: Record<string, boolean>;
  accessoriesOwned: string[];
  accessoryEquipped: string | null;
  lastPlayedTopicId: string | null;
};

export type StorageResult =
  | { ok: true; value: StoredProgress }
  | { ok: false; error: string };

const STORAGE_KEY = "grammarPalsProgress_v1";

const defaultProgress: StoredProgress = {
  masteryBySkill: {},
  accessoriesOwned: [],
  accessoryEquipped: null,
  lastPlayedTopicId: null,
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isString = (value: unknown): value is string => typeof value === "string";

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const hasWindowStorage = (): boolean =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const parseProgress = (raw: string | null): StoredProgress | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return null;
    }

    const masteryBySkill: Record<string, boolean> = isRecord(
      parsed.masteryBySkill
    )
      ? (Object.fromEntries(
          Object.entries(parsed.masteryBySkill).filter(([, value]) =>
            isBoolean(value)
          )
        ) as Record<string, boolean>)
      : {};

    const accessoriesOwned = isStringArray(parsed.accessoriesOwned)
      ? parsed.accessoriesOwned
      : [];

    const accessoryEquipped = isString(parsed.accessoryEquipped)
      ? parsed.accessoryEquipped
      : null;

    const lastPlayedTopicId = isString(parsed.lastPlayedTopicId)
      ? parsed.lastPlayedTopicId
      : null;

    return {
      masteryBySkill,
      accessoriesOwned,
      accessoryEquipped,
      lastPlayedTopicId,
    };
  } catch {
    return null;
  }
};

export const loadProgress = (): StorageResult => {
  if (!hasWindowStorage()) {
    return { ok: false, error: "Storage unavailable" };
  }

  const parsed = parseProgress(window.localStorage.getItem(STORAGE_KEY));
  if (!parsed) {
    return { ok: true, value: defaultProgress };
  }

  return { ok: true, value: parsed };
};

export const saveProgress = (progress: StoredProgress): StorageResult => {
  if (!hasWindowStorage()) {
    return { ok: false, error: "Storage unavailable" };
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return { ok: true, value: progress };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Storage failed";
    return { ok: false, error: message };
  }
};

export const mergeProgress = (
  existing: StoredProgress,
  update: Partial<StoredProgress>
): StoredProgress => ({
  masteryBySkill: {
    ...existing.masteryBySkill,
    ...update.masteryBySkill,
  },
  accessoriesOwned: update.accessoriesOwned ?? existing.accessoriesOwned,
  accessoryEquipped: update.accessoryEquipped ?? existing.accessoryEquipped,
  lastPlayedTopicId: update.lastPlayedTopicId ?? existing.lastPlayedTopicId,
});

export const getDefaultProgress = (): StoredProgress => ({ ...defaultProgress });
