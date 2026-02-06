import { describe, expect, it } from "vitest";
import samplePack from "../content/sample-pack.json";
import type { QuestionPack } from "../lib/content/types";
import {
  advanceMission,
  MISSION_QUESTION_COUNT,
  selectMissionQuestions,
} from "../lib/mission/progression";

describe("mission progression", () => {
  const questions = samplePack as QuestionPack;

  it("selects 8 questions when available", () => {
    const result = selectMissionQuestions(questions, MISSION_QUESTION_COUNT);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.questions).toHaveLength(MISSION_QUESTION_COUNT);
    }
  });

  it("returns an error when fewer than 8 questions exist", () => {
    const result = selectMissionQuestions(questions.slice(0, 3), 8);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Not enough questions");
    }
  });

  it("advances to the next question", () => {
    const result = advanceMission({
      currentIndex: 1,
      totalQuestions: MISSION_QUESTION_COUNT,
      halfwayShown: false,
    });

    expect(result.nextIndex).toBe(2);
    expect(result.isComplete).toBe(false);
  });

  it("signals the halfway beat after question 4", () => {
    const result = advanceMission({
      currentIndex: 3,
      totalQuestions: MISSION_QUESTION_COUNT,
      halfwayShown: false,
    });

    expect(result.showHalfway).toBe(true);
    expect(result.nextIndex).toBe(4);
  });
});
