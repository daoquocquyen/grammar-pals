"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import PetPanel from "../../components/PetPanel";
import { getMissionSnapshot } from "../../../lib/mission/missionProgress";
import {
  clearMissionSession,
  loadMissionSession,
} from "../../../lib/mission/sessionProgress";
import {
  loadProgress,
  mergeProgress,
  saveProgress,
} from "../../../lib/progress/storage";

const DEFAULT_TOPIC_ID = "is_are";

type MissionSummary = {
  mastery: boolean | null;
  correctCount: number | null;
  totalCount: number | null;
  topicId: string;
  source: "session" | "progress" | "none";
};

const buildDefaultSummary = (): MissionSummary => ({
  mastery: null,
  correctCount: null,
  totalCount: null,
  topicId: DEFAULT_TOPIC_ID,
  source: "none",
});

const getSummarySnapshot = (): MissionSummary => {
  if (typeof window === "undefined") {
    return buildDefaultSummary();
  }

  const sessionResult = loadMissionSession();
  if (sessionResult.ok && sessionResult.value) {
    const snapshot = getMissionSnapshot(sessionResult.value);
    const topicId = sessionResult.value.topicId || DEFAULT_TOPIC_ID;
    return {
      mastery: snapshot.masteryAchieved,
      correctCount: snapshot.correctCount,
      totalCount: snapshot.totalCount,
      topicId,
      source: "session",
    };
  }

  const progressResult = loadProgress();
  if (progressResult.ok) {
    const topicId = progressResult.value.lastPlayedTopicId ?? DEFAULT_TOPIC_ID;
    const mastery = progressResult.value.masteryBySkill[topicId] ?? null;
    return {
      mastery,
      correctCount: null,
      totalCount: null,
      topicId,
      source: "progress",
    };
  }

  return buildDefaultSummary();
};

const subscribe = (): (() => void) => () => {};

export default function MissionEndClient() {
  const summary = useSyncExternalStore(
    subscribe,
    getSummarySnapshot,
    buildDefaultSummary
  );

  useEffect(() => {
    if (summary.source !== "session") {
      return;
    }

    const progressResult = loadProgress();
    if (progressResult.ok) {
      const updated = mergeProgress(progressResult.value, {
        masteryBySkill: { [summary.topicId]: summary.mastery === true },
        lastPlayedTopicId: summary.topicId,
      });
      saveProgress(updated);
    }

    clearMissionSession();
  }, [summary.mastery, summary.source, summary.topicId]);

  const masteryMessage = useMemo(() => {
    if (summary.mastery === true) {
      return "Mastery unlocked! Great rescue.";
    }
    if (summary.mastery === false) {
      return "Nice work! Keep practicing to earn mastery.";
    }
    return "Nice work!";
  }, [summary.mastery]);

  const scoreLine =
    summary.correctCount !== null && summary.totalCount !== null
      ? `Score: ${summary.correctCount}/${summary.totalCount}`
      : null;

  return (
    <>
      <section className="panel end-card">
        <div className="end-burst" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <h1>Mission Complete!</h1>
          <p className="subtext">Remember: is = one, are = many.</p>
          <p className="subtext">{masteryMessage}</p>
          {scoreLine ? <p className="subtext">{scoreLine}</p> : null}
        </div>
      </section>

      <PetPanel
        message={`${masteryMessage} Is is for one, are is for many.`}
        reaction={summary.mastery ? "happy" : "cheer"}
      />
    </>
  );
}
