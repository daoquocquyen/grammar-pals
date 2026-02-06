import type {
  AudioText,
  Difficulty,
  Option,
  OptionId,
  Question,
  QuestionPack,
  QuestionTemplate,
  Scene,
  Skill,
} from "./types";

export type ContentValidationResult =
  | { ok: true; questions: QuestionPack }
  | { ok: false; error: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isString = (value: unknown): value is string => typeof value === "string";

const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isPositiveInteger = (value: unknown): value is number =>
  isNumber(value) && Number.isInteger(value) && value > 0;

const isTemplate = (value: unknown): value is QuestionTemplate =>
  value === "T2" || value === "T3";

const isSkill = (value: unknown): value is Skill => value === "is_are";

const isDifficulty = (value: unknown): value is Difficulty =>
  value === "very_easy" ||
  value === "easy" ||
  value === "medium" ||
  value === "medium_plus";

const isOptionId = (value: unknown): value is OptionId =>
  value === "A" || value === "B";

const validateAudioText = (
  value: unknown,
  label: string,
  index: number
): value is AudioText => {
  if (!isRecord(value)) {
    throw new Error(`Question ${index} ${label} must be an object.`);
  }
  if (!isString(value.text)) {
    throw new Error(`Question ${index} ${label}.text must be a string.`);
  }
  if (!isString(value.audioKey)) {
    throw new Error(`Question ${index} ${label}.audioKey must be a string.`);
  }
  return true;
};

const validateScene = (value: unknown, index: number): value is Scene => {
  if (!isRecord(value)) {
    throw new Error(`Question ${index} scene must be an object.`);
  }
  if (!isString(value.animal)) {
    throw new Error(`Question ${index} scene.animal must be a string.`);
  }
  if (!isPositiveInteger(value.count)) {
    throw new Error(`Question ${index} scene.count must be a positive integer.`);
  }
  if (!isBoolean(value.numberBadge)) {
    throw new Error(`Question ${index} scene.numberBadge must be a boolean.`);
  }
  return true;
};

const validateOption = (value: unknown, index: number): value is Option => {
  if (!isRecord(value)) {
    throw new Error(`Question ${index} option must be an object.`);
  }
  if (!isOptionId(value.id)) {
    throw new Error(`Question ${index} option.id must be "A" or "B".`);
  }
  if (!isString(value.text)) {
    throw new Error(`Question ${index} option.text must be a string.`);
  }
  if (!isBoolean(value.isCorrect)) {
    throw new Error(`Question ${index} option.isCorrect must be a boolean.`);
  }
  if (!isString(value.audioKey)) {
    throw new Error(`Question ${index} option.audioKey must be a string.`);
  }
  return true;
};

const validateQuestion = (value: unknown, index: number): value is Question => {
  if (!isRecord(value)) {
    throw new Error(`Question ${index} must be an object.`);
  }
  if (!isString(value.id)) {
    throw new Error(`Question ${index} id must be a string.`);
  }
  if (!isTemplate(value.template)) {
    throw new Error(`Question ${index} template must be "T2" or "T3".`);
  }
  if (!isSkill(value.skill)) {
    throw new Error(`Question ${index} skill must be "is_are".`);
  }
  if (!isDifficulty(value.difficulty)) {
    throw new Error(
      `Question ${index} difficulty must be very_easy, easy, medium, or medium_plus.`
    );
  }

  validateScene(value.scene, index);
  validateAudioText(value.prompt, "prompt", index);

  if (!Array.isArray(value.options) || value.options.length !== 2) {
    throw new Error(`Question ${index} options must have exactly 2 items.`);
  }

  value.options.forEach((option) => validateOption(option, index));

  const correctCount = value.options.filter((option) => option.isCorrect).length;
  if (correctCount !== 1) {
    throw new Error(`Question ${index} must have exactly one correct option.`);
  }

  const optionIds = new Set(value.options.map((option) => option.id));
  if (optionIds.size !== 2) {
    throw new Error(`Question ${index} options must include A and B.`);
  }

  if (!isRecord(value.explanations)) {
    throw new Error(`Question ${index} explanations must be an object.`);
  }

  validateAudioText(value.explanations.correct, "explanations.correct", index);
  validateAudioText(value.explanations.wrong, "explanations.wrong", index);
  validateAudioText(value.explanations.hint, "explanations.hint", index);

  return true;
};

export const validateQuestionPack = (data: unknown): ContentValidationResult => {
  try {
    if (!Array.isArray(data)) {
      return { ok: false, error: "Content pack must be an array." };
    }

    if (data.length === 0) {
      return { ok: false, error: "Content pack must include questions." };
    }

    data.forEach((question, index) => validateQuestion(question, index));

    return { ok: true, questions: data as QuestionPack };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }

    return { ok: false, error: "Content pack validation failed." };
  }
};
