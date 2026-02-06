"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "../../../lib/content/types";
import {
  applyAnswerSelection,
  createAnswerState,
  requestAdvance,
  resetForRetry,
} from "../../../lib/mission/answerState";
import {
  initMissionSession,
  loadMissionSession,
  updateMissionSession,
} from "../../../lib/mission/sessionProgress";
import SceneCard from "../../components/visual/SceneCard";
import StickerTile from "../../components/visual/StickerTile";
import PuppyCoachBar from "../../components/visual/PuppyCoachBar";

type MissionPlayClientProps = {
  question: Question;
  progressLabel: string;
  nextHref: string;
  currentStep: number;
  totalQuestions: number;
  topicId: string;
};

const animalAssetMap: Record<string, string> = {
  cat: "animals.animal_cat",
  dog: "animals.animal_dog",
  bird: "animals.animal_bird",
  rabbit: "animals.animal_rabbit",
  fish: "animals.animal_fish",
  turtle: "animals.animal_turtle",
  frog: "animals.animal_frog",
  hamster: "animals.animal_hamster",
};

export default function MissionPlayClient({
  question,
  progressLabel,
  nextHref,
  currentStep,
  totalQuestions,
  topicId,
}: MissionPlayClientProps) {
  const router = useRouter();
  const [answerState, setAnswerState] = useState(createAnswerState);
  const animalKey =
    animalAssetMap[question.scene.animal] ?? "animals.animal_cat";

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

  const puppyMood: "idle" | "happy" | "thinking" | "celebrate" = (() => {
    if (!isFeedback) {
      return "idle";
    }

    if (answerState.feedback === "correct") {
      return "happy";
    }

    if (answerState.feedback === "retry") {
      return "thinking";
    }

    return "celebrate";
  })();

  const handleSelect = (optionId: "A" | "B", isCorrect: boolean) => {
    setAnswerState((prev) =>
      applyAnswerSelection(prev, { optionId, isCorrect })
    );
  };

  useEffect(() => {
    if (currentStep === 1) {
      initMissionSession(totalQuestions, topicId);
      return;
    }

    const existing = loadMissionSession();
    if (existing.ok && existing.value?.totalCount === totalQuestions) {
      return;
    }

    initMissionSession(totalQuestions, topicId);
  }, [currentStep, totalQuestions, topicId]);

  const handleRetry = () => {
    setAnswerState((prev) => resetForRetry(prev));
  };

  const handleContinue = () => {
    setAnswerState((prev) => {
      const result = requestAdvance(prev);
      if (result.shouldAdvance) {
        if (prev.feedback === "correct") {
          updateMissionSession(true, totalQuestions, topicId);
        }
        if (prev.feedback === "reveal") {
          updateMissionSession(false, totalQuestions, topicId);
        }
        router.push(nextHref);
      }
      return result.state;
    });
  };

  return (
    <div className="mission-play">
      <div className="mission-play__header">
        <span className="progress-pill">{progressLabel}</span>
        <span className="mission-play__note">Rescue in progress</span>
      </div>

      <SceneCard
        backgroundKey="world.bg_park_day"
        animalKey={animalKey}
        count={question.scene.count}
        numberBadge={question.scene.numberBadge}
        highlight={answerState.highlightClue}
      />

      <div className="mission-play__choices">
        {question.options.map((option) => {
          const isSelected = highlightedOptionId === option.id;
          return (
            <StickerTile
              key={option.id}
              label={option.text}
              assetKey="ui.ui_pawprint"
              selected={isSelected}
              disabled={answerState.phase !== "question"}
              onClick={() => handleSelect(option.id, option.isCorrect)}
            />
          );
        })}
      </div>

      <PuppyCoachBar message={petMessage} mood={puppyMood} autoSpeak />

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
    </div>
  );
}
