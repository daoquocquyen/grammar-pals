"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "../../../lib/content/types";
import { getQuestionView } from "../../../lib/mission/questionView";
import {
  applyAnswerSelection,
  createAnswerState,
  requestAdvance,
  resetForRetry,
} from "../../../lib/mission/answerState";
import PetPanel from "../../components/PetPanel";

type MissionPlayClientProps = {
  question: Question;
  progressLabel: string;
  nextHref: string;
};

const buildCritterList = (count: number): number[] =>
  Array.from({ length: count }, (_, index) => index);

export default function MissionPlayClient({
  question,
  progressLabel,
  nextHref,
}: MissionPlayClientProps) {
  const router = useRouter();
  const [answerState, setAnswerState] = useState(createAnswerState);
  const questionView = getQuestionView(question.template);
  const critterCount = Math.min(question.scene.count, 4);
  const critters = buildCritterList(critterCount);

  const correctOptionId = useMemo(() => {
    const correctOption = question.options.find((option) => option.isCorrect);
    return correctOption?.id ?? question.options[0].id;
  }, [question.options]);

  const isFeedback = answerState.phase === "feedback";
  const showRetry = answerState.feedback === "retry";
  const highlightedOptionId = (() => {
    if (!isFeedback) {
      return null;
    }

    if (answerState.feedback === "correct") {
      return answerState.selectedOptionId;
    }

    if (answerState.feedback === "reveal") {
      return correctOptionId;
    }

    return null;
  })();

  const petMessage = (() => {
    if (!isFeedback) {
      return question.prompt.text;
    }

    if (answerState.feedback === "correct") {
      return question.explanations.correct.text;
    }

    if (answerState.feedback === "retry") {
      return question.explanations.hint.text;
    }

    return question.explanations.wrong.text;
  })();

  const petReaction: "curious" | "happy" | "thinking" | "cheer" = (() => {
    if (!isFeedback) {
      return "curious";
    }

    if (answerState.feedback === "correct") {
      return "happy";
    }

    if (answerState.feedback === "retry") {
      return "thinking";
    }

    return "cheer";
  })();

  const handleSelect = (optionId: "A" | "B", isCorrect: boolean) => {
    setAnswerState((prev) =>
      applyAnswerSelection(prev, { optionId, isCorrect })
    );
  };

  const handleRetry = () => {
    setAnswerState((prev) => resetForRetry(prev));
  };

  const handleContinue = () => {
    setAnswerState((prev) => {
      const result = requestAdvance(prev);
      if (result.shouldAdvance) {
        router.push(nextHref);
      }
      return result.state;
    });
  };

  return (
    <>
      <div className="progress-row">
        <span className="progress-pill">{progressLabel}</span>
        <span className="progress-note">Question in progress</span>
      </div>

      {questionView.showPictureClue ? (
        <section
          className={`panel clue-card${
            answerState.highlightClue ? " clue-card--highlight" : ""
          }`}
        >
          <div
            className={`clue-picture${
              answerState.highlightClue ? " clue-picture--highlight" : ""
            }`}
            aria-hidden="true"
          >
            {question.scene.numberBadge ? (
              <span
                className={`clue-count${
                  answerState.highlightClue ? " clue-count--highlight" : ""
                }`}
              >
                {question.scene.count}
              </span>
            ) : null}
            <div
              className={`clue-critters${
                answerState.highlightClue ? " clue-critters--highlight" : ""
              }`}
            >
              {critters.map((critter) => (
                <span key={critter} />
              ))}
            </div>
          </div>
          <p className="subtext">{question.prompt.text}</p>
        </section>
      ) : (
        <section
          className={`panel prompt-card${
            answerState.highlightClue ? " prompt-card--highlight" : ""
          }`}
        >
          <p className="prompt-text">{question.prompt.text}</p>
        </section>
      )}

      <div className="sentence-grid">
        {question.options.map((option) => {
          const isSelected = highlightedOptionId === option.id;
          return (
            <button
              className={`sentence-card${
                isSelected ? " sentence-card--selected" : ""
              }`}
              data-state={isSelected ? "selected" : undefined}
              type="button"
              onClick={() => handleSelect(option.id, option.isCorrect)}
              disabled={answerState.phase !== "question"}
              aria-pressed={isSelected}
              key={option.id}
            >
              {option.text}
            </button>
          );
        })}
      </div>

      <PetPanel message={petMessage} reaction={petReaction} />

      {isFeedback ? (
        <div className="action-row">
          {showRetry ? (
            <button className="btn btn-secondary" type="button" onClick={handleRetry}>
              Try again
            </button>
          ) : (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleContinue}
              disabled={answerState.advanceLocked}
            >
              Continue
            </button>
          )}
        </div>
      ) : null}
    </>
  );
}
