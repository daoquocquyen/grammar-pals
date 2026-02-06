import { describe, expect, it } from "vitest";
import {
  applyAnswerSelection,
  createAnswerState,
  requestAdvance,
  resetForRetry,
} from "../lib/mission/answerState";

describe("answer state machine", () => {
  it("advances after a correct answer", () => {
    const start = createAnswerState();
    const afterSelect = applyAnswerSelection(start, {
      optionId: "A",
      isCorrect: true,
    });

    expect(afterSelect.feedback).toBe("correct");
    expect(afterSelect.canAdvance).toBe(true);

    const firstAdvance = requestAdvance(afterSelect);
    expect(firstAdvance.shouldAdvance).toBe(true);
  });

  it("allows retry after the first wrong answer", () => {
    const start = createAnswerState();
    const afterSelect = applyAnswerSelection(start, {
      optionId: "B",
      isCorrect: false,
    });

    expect(afterSelect.feedback).toBe("retry");
    expect(afterSelect.canRetry).toBe(true);
    expect(afterSelect.canAdvance).toBe(false);
  });

  it("reveals and advances after the second wrong answer", () => {
    const start = createAnswerState();
    const firstWrong = applyAnswerSelection(start, {
      optionId: "B",
      isCorrect: false,
    });
    const retryState = resetForRetry(firstWrong);
    const secondWrong = applyAnswerSelection(retryState, {
      optionId: "B",
      isCorrect: false,
    });

    expect(secondWrong.feedback).toBe("reveal");
    expect(secondWrong.canAdvance).toBe(true);
  });

  it("prevents double advance on rapid taps", () => {
    const start = createAnswerState();
    const afterSelect = applyAnswerSelection(start, {
      optionId: "A",
      isCorrect: true,
    });

    const firstAdvance = requestAdvance(afterSelect);
    const secondAdvance = requestAdvance(firstAdvance.state);

    expect(firstAdvance.shouldAdvance).toBe(true);
    expect(secondAdvance.shouldAdvance).toBe(false);
  });
});
