import samplePack from "../../content/sample-pack.json";
import type { QuestionPack } from "./types";
import { validateQuestionPack } from "./validate";

export type ContentLoadResult =
  | { ok: true; questions: QuestionPack }
  | { ok: false; error: string };

export const loadSampleQuestionPack = (): ContentLoadResult => {
  const validation = validateQuestionPack(samplePack);
  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  return validation;
};
