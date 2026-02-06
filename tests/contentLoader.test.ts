import { describe, expect, it } from "vitest";
import samplePack from "../content/sample-pack.json";
import { loadSampleQuestionPack } from "../lib/content/loader";
import { validateQuestionPack } from "../lib/content/validate";

describe("content loading", () => {
  it("validates the sample content pack", () => {
    const result = validateQuestionPack(samplePack);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.questions.length).toBe(samplePack.length);
    }
  });

  it("rejects packs with invalid options", () => {
    const invalidPack = [
      {
        ...samplePack[0],
        options: [],
      },
    ];

    const result = validateQuestionPack(invalidPack);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("options");
    }
  });

  it("loads the sample pack through the loader", () => {
    const result = loadSampleQuestionPack();

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.questions.length).toBe(samplePack.length);
    }
  });
});
