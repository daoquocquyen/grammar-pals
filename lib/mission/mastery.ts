export type MasteryInput = {
  correctCount: number;
  totalCount: number;
  lastAnswersCorrect: boolean[];
};

export const hasMastery = ({
  correctCount,
  totalCount,
  lastAnswersCorrect,
}: MasteryInput): boolean => {
  if (totalCount <= 0) {
    return false;
  }

  const requiredCorrect = 6;
  const meetsCorrectThreshold = correctCount >= requiredCorrect;

  const lastThree = lastAnswersCorrect.slice(-3);
  const meetsLastThree =
    lastThree.length === 3 && lastThree.every((value) => value);

  return meetsCorrectThreshold && meetsLastThree;
};
