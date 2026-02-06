export type Accessory = {
  id: string;
  name: string;
};

const ACCESSORIES: Accessory[] = [
  { id: "star-cape", name: "Star Cape" },
  { id: "leaf-hat", name: "Leaf Hat" },
  { id: "rain-boots", name: "Rain Boots" },
  { id: "moon-mask", name: "Moon Mask" },
  { id: "sun-band", name: "Sun Band" },
  { id: "cloud-scarf", name: "Cloud Scarf" },
  { id: "comet-bow", name: "Comet Bow" },
  { id: "sparkle-belt", name: "Sparkle Belt" },
  { id: "forest-cape", name: "Forest Cape" },
  { id: "bubble-backpack", name: "Bubble Backpack" },
  { id: "shell-hat", name: "Shell Hat" },
  { id: "tide-bracelet", name: "Tide Bracelet" },
  { id: "safari-vest", name: "Safari Vest" },
  { id: "puffy-jacket", name: "Puffy Jacket" },
  { id: "glow-collar", name: "Glow Collar" },
  { id: "trail-pouch", name: "Trail Pouch" },
  { id: "rainbow-hood", name: "Rainbow Hood" },
  { id: "meadow-crown", name: "Meadow Crown" },
  { id: "starlight-cape", name: "Starlight Cape" },
  { id: "breeze-bandana", name: "Breeze Bandana" },
];

export type UnlockResult = {
  owned: string[];
  unlocked: Accessory | null;
  allOwned: boolean;
};

const normalizeOwned = (owned: string[]): string[] => {
  const validIds = new Set(ACCESSORIES.map((item) => item.id));
  const unique = Array.from(new Set(owned));
  return unique.filter((id) => validIds.has(id));
};

export const getAllAccessories = (): Accessory[] => [...ACCESSORIES];

export const getAccessoryById = (id: string | null | undefined): Accessory | null => {
  if (!id) {
    return null;
  }
  return ACCESSORIES.find((accessory) => accessory.id === id) ?? null;
};

export const getNextUnlock = (owned: string[]): Accessory | null => {
  const normalized = normalizeOwned(owned);
  return ACCESSORIES.find((accessory) => !normalized.includes(accessory.id)) ?? null;
};

export const unlockNextAccessory = (owned: string[]): UnlockResult => {
  const normalized = normalizeOwned(owned);
  const next = getNextUnlock(normalized);
  if (!next) {
    return { owned: normalized, unlocked: null, allOwned: true };
  }

  return {
    owned: [...normalized, next.id],
    unlocked: next,
    allOwned: false,
  };
};
