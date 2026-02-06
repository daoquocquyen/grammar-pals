import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getDefaultProgress,
  loadProgress,
  mergeProgress,
  saveProgress,
} from "../lib/progress/storage";

const createStorage = (): Storage => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
};

const globalWindow = globalThis as typeof globalThis & {
  window?: { localStorage?: Storage };
};

const originalWindow = globalWindow.window;

beforeEach(() => {
  globalWindow.window = { localStorage: createStorage() };
});

afterEach(() => {
  globalWindow.window = originalWindow;
});

describe("progress storage", () => {
  it("loads default progress when storage is empty", () => {
    const result = loadProgress();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(getDefaultProgress());
    }
  });

  it("saves and loads progress", () => {
    const progress = mergeProgress(getDefaultProgress(), {
      masteryBySkill: { is_are: true },
      accessoriesOwned: ["hat"],
      accessoryEquipped: "hat",
      lastPlayedTopicId: "is_are",
    });

    const saveResult = saveProgress(progress);
    expect(saveResult.ok).toBe(true);

    const loadResult = loadProgress();
    expect(loadResult.ok).toBe(true);
    if (loadResult.ok) {
      expect(loadResult.value).toEqual(progress);
    }
  });

  it("returns an error when storage is unavailable", () => {
    globalWindow.window = undefined;
    const result = loadProgress();

    expect(result.ok).toBe(false);
  });
});
