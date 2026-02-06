import type { QuestionTemplate } from "../content/types";

export type QuestionView = {
  showPictureClue: boolean;
};

export const getQuestionView = (template: QuestionTemplate): QuestionView => ({
  showPictureClue: template === "T3",
});
