import { describe, expect, it } from "vitest";
import { hasMastery } from "../lib/mission/mastery";

describe("mastery", () => {
  it("awards mastery with 6/8 and last three correct", () => {
    const result = hasMastery({
      correctCount: 6,
      totalCount: 8,
      lastAnswersCorrect: [true, true, true],
    });

    expect(result).toBe(true);
  });

  it("fails when fewer than 6 answers are correct", () => {
    const result = hasMastery({
      correctCount: 5,
      totalCount: 8,
      lastAnswersCorrect: [true, true, true],
    });

    expect(result).toBe(false);
  });

  it("fails when last three answers are not all correct", () => {
    const result = hasMastery({
      correctCount: 7,
      totalCount: 8,
      lastAnswersCorrect: [true, false, true],
    });

    expect(result).toBe(false);
  });
});
