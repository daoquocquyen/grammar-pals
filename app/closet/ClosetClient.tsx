"use client";

import { useMemo, useState } from "react";
import PetPanel from "../components/PetPanel";
import {
  getAccessoryById,
  getAllAccessories,
} from "../../lib/progress/accessories";
import {
  getDefaultProgress,
  loadProgress,
  mergeProgress,
  saveProgress,
} from "../../lib/progress/storage";

type ClosetState = {
  accessoriesOwned: string[];
  accessoryEquipped: string | null;
  storageOk: boolean;
};

const buildClosetState = (): ClosetState => {
  const progressResult = loadProgress();
  if (!progressResult.ok) {
    return {
      accessoriesOwned: [],
      accessoryEquipped: null,
      storageOk: false,
    };
  }

  return {
    accessoriesOwned: progressResult.value.accessoriesOwned,
    accessoryEquipped: progressResult.value.accessoryEquipped,
    storageOk: true,
  };
};

export default function ClosetClient() {
  const [state, setState] = useState<ClosetState>(buildClosetState);
  const accessories = useMemo(() => getAllAccessories(), []);
  const equippedAccessory = getAccessoryById(state.accessoryEquipped);

  const handleEquip = (id: string) => {
    if (!state.accessoriesOwned.includes(id)) {
      return;
    }

    const progressResult = loadProgress();
    const baseProgress = progressResult.ok
      ? progressResult.value
      : getDefaultProgress();
    const updated = mergeProgress(baseProgress, {
      accessoriesOwned: baseProgress.accessoriesOwned.includes(id)
        ? baseProgress.accessoriesOwned
        : [...baseProgress.accessoriesOwned, id],
      accessoryEquipped: id,
    });

    if (progressResult.ok) {
      saveProgress(updated);
    }

    setState((prev) => ({
      ...prev,
      accessoryEquipped: id,
      accessoriesOwned: updated.accessoriesOwned,
      storageOk: progressResult.ok,
    }));
  };

  return (
    <>
      <section className="panel closet-card">
        <div>
          <p className="eyebrow">Accessories</p>
          <h1>Pick a look</h1>
          <p className="subtext">Tap an owned item to equip it.</p>
          {!state.storageOk ? (
            <p className="subtext">Progress will not be saved in this browser.</p>
          ) : null}
        </div>
        <div className="closet-grid">
          {accessories.map((accessory) => {
            const isOwned = state.accessoriesOwned.includes(accessory.id);
            const isEquipped = state.accessoryEquipped === accessory.id;
            return (
              <button
                key={accessory.id}
                className={`closet-item${
                  isOwned ? " closet-item--owned" : " closet-item--locked"
                }${isEquipped ? " closet-item--equipped" : ""}`}
                type="button"
                onClick={() => handleEquip(accessory.id)}
                disabled={!isOwned}
              >
                <span className="closet-icon" aria-hidden="true">
                  {accessory.name.slice(0, 1)}
                </span>
                <span>{accessory.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <PetPanel
        message={
          equippedAccessory
            ? `Nice look! ${equippedAccessory.name} equipped.`
            : "Pick an owned accessory and your pal will try it on!"
        }
        reaction={equippedAccessory ? "happy" : "curious"}
        accessoryLabel={equippedAccessory?.name}
      />
    </>
  );
}
