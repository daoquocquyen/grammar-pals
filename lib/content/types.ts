export type QuestionTemplate = "T2" | "T3";
export type Skill = "is_are";
export type Difficulty = "very_easy" | "easy" | "medium" | "medium_plus";
export type AudioKey = string;
export type OptionId = "A" | "B";

export interface AudioText {
  text: string;
  audioKey: AudioKey;
}

export interface Prompt extends AudioText {}

export interface Option {
  id: OptionId;
  text: string;
  isCorrect: boolean;
  audioKey: AudioKey;
}

export interface Scene {
  animal: string;
  count: number;
  numberBadge: boolean;
}

export interface Explanations {
  correct: AudioText;
  wrong: AudioText;
  hint: AudioText;
}

export interface Question {
  id: string;
  template: QuestionTemplate;
  skill: Skill;
  difficulty: Difficulty;
  scene: Scene;
  prompt: Prompt;
  options: [Option, Option];
  explanations: Explanations;
}

export type QuestionPack = Question[];
