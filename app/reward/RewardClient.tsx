"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PetPanel from "../components/PetPanel";
import {
  getAccessoryById,
  getAllAccessories,
  unlockNextAccessory,
} from "../../lib/progress/accessories";
import {
  getDefaultProgress,
  loadProgress,
  mergeProgress,
  saveProgress,
} from "../../lib/progress/storage";
import { consumeRewardPending, peekRewardPending } from "../../lib/progress/rewardSession";

type RewardState = {
  unlockedId: string | null;
  allOwned: boolean;
  ownedCount: number;
  totalCount: number;
  pending: boolean;
  storageOk: boolean;
};

const buildRewardState = (): RewardState => {
  const totalCount = getAllAccessories().length;
  const progressResult = loadProgress();
  const baseProgress = progressResult.ok
    ? progressResult.value
    : getDefaultProgress();
  const pending = peekRewardPending();
  const storageOk = progressResult.ok;

  if (!pending) {
    return {
      unlockedId: null,
      allOwned: baseProgress.accessoriesOwned.length >= totalCount,
      ownedCount: baseProgress.accessoriesOwned.length,
      totalCount,
      pending: false,
      storageOk,
    };
  }

  const rewardPending = consumeRewardPending();
  if (!rewardPending) {
    return {
      unlockedId: null,
      allOwned: baseProgress.accessoriesOwned.length >= totalCount,
      ownedCount: baseProgress.accessoriesOwned.length,
      totalCount,
      pending: false,
      storageOk,
    };
  }

  const unlockResult = unlockNextAccessory(baseProgress.accessoriesOwned);
  if (progressResult.ok) {
    const updated = mergeProgress(baseProgress, {
      accessoriesOwned: unlockResult.owned,
    });
    saveProgress(updated);
  }

  return {
    unlockedId: unlockResult.unlocked?.id ?? null,
    allOwned: unlockResult.allOwned,
    ownedCount: unlockResult.owned.length,
    totalCount,
    pending: true,
    storageOk,
  };
};

export default function RewardClient() {
  const router = useRouter();
  const [rewardState, setRewardState] = useState<RewardState>(buildRewardState);

  const unlockedAccessory = useMemo(
    () => getAccessoryById(rewardState.unlockedId),
    [rewardState.unlockedId]
  );

  const statusLine = rewardState.allOwned
    ? "You have them all!"
    : unlockedAccessory
      ? "You earned a new accessory!"
      : rewardState.pending
        ? "No new accessory yet."
        : "Complete a mission to unlock an accessory.";

  const handleEquip = () => {
    if (!unlockedAccessory) {
      router.push("/closet");
      return;
    }

    const progressResult = loadProgress();
    const baseProgress = progressResult.ok
      ? progressResult.value
      : getDefaultProgress();

    const updated = mergeProgress(baseProgress, {
      accessoriesOwned: baseProgress.accessoriesOwned.includes(unlockedAccessory.id)
        ? baseProgress.accessoriesOwned
        : [...baseProgress.accessoriesOwned, unlockedAccessory.id],
      accessoryEquipped: unlockedAccessory.id,
    });

    if (progressResult.ok) {
      saveProgress(updated);
    }

    setRewardState((prev) => ({
      ...prev,
      unlockedId: unlockedAccessory.id,
    }));
    router.push("/closet");
  };

  const handleLater = () => {
    router.push("/");
  };

  const badgeLine = `${rewardState.ownedCount}/${rewardState.totalCount} owned`;

  return (
    <>
      <section className="panel reward-card">
        <div className="reward-item" aria-hidden="true">
          <div
            className={`reward-icon${unlockedAccessory ? " reward-icon--unlock" : ""}`}
          />
          <div className="reward-name">
            {unlockedAccessory ? unlockedAccessory.name : "Accessory Closet"}
          </div>
        </div>
        <p className="subtext">{statusLine}</p>
        <p className="subtext">{badgeLine}</p>
        {!rewardState.storageOk ? (
          <p className="subtext">Progress will not be saved in this browser.</p>
        ) : null}
      </section>

      <PetPanel
        message={
          unlockedAccessory
            ? `You earned ${unlockedAccessory.name}! Try it on.`
            : rewardState.allOwned
              ? "You have every accessory! Nice work."
              : "Finish a mission to earn a new accessory."
        }
        reaction={rewardState.allOwned ? "happy" : "cheer"}
        accessoryLabel={unlockedAccessory?.name ?? undefined}
        className={unlockedAccessory ? "pet-panel--tryon" : undefined}
      />

      <div className="action-row">
        {rewardState.allOwned ? (
          <button className="btn btn-primary" type="button" onClick={handleLater}>
            Back to Home
          </button>
        ) : unlockedAccessory ? (
          <>
            <button className="btn btn-primary" type="button" onClick={handleEquip}>
              Equip
            </button>
            <button className="btn btn-secondary" type="button" onClick={handleLater}>
              Later
            </button>
          </>
        ) : (
          <button className="btn btn-primary" type="button" onClick={handleLater}>
            Back to Home
          </button>
        )}
      </div>
    </>
  );
}
