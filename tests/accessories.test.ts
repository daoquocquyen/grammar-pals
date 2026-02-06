import { describe, expect, it } from "vitest";
import {
  getAllAccessories,
  unlockNextAccessory,
} from "../lib/progress/accessories";

describe("accessory unlocks", () => {
  it("unlocks one new accessory per mission", () => {
    const all = getAllAccessories();
    const first = unlockNextAccessory([]);

    expect(first.unlocked?.id).toBe(all[0].id);
    expect(first.owned).toContain(all[0].id);

    const second = unlockNextAccessory(first.owned);
    expect(second.unlocked?.id).toBe(all[1].id);
    expect(second.owned).toContain(all[1].id);
  });

  it("does not duplicate owned accessories", () => {
    const all = getAllAccessories();
    const result = unlockNextAccessory([all[0].id, all[0].id]);

    expect(result.unlocked?.id).toBe(all[1].id);
    expect(result.owned.filter((id) => id === all[0].id)).toHaveLength(1);
  });

  it("handles when all accessories are owned", () => {
    const all = getAllAccessories();
    const result = unlockNextAccessory(all.map((item) => item.id));

    expect(result.unlocked).toBeNull();
    expect(result.allOwned).toBe(true);
  });
});
