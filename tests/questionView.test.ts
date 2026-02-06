import { describe, expect, it } from "vitest";
import { getQuestionView } from "../lib/mission/questionView";

describe("question view", () => {
  it("shows picture clue for T3", () => {
    expect(getQuestionView("T3").showPictureClue).toBe(true);
  });

  it("hides picture clue for T2", () => {
    expect(getQuestionView("T2").showPictureClue).toBe(false);
  });
});
