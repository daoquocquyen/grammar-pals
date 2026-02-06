const REWARD_PENDING_KEY = "grammarPalsRewardPending_v1";

const hasSessionStorage = (): boolean =>
  typeof window !== "undefined" &&
  typeof window.sessionStorage !== "undefined";

export const setRewardPending = (): boolean => {
  if (!hasSessionStorage()) {
    return false;
  }

  try {
    window.sessionStorage.setItem(REWARD_PENDING_KEY, "1");
    return true;
  } catch {
    return false;
  }
};

export const consumeRewardPending = (): boolean => {
  if (!hasSessionStorage()) {
    return false;
  }

  try {
    const value = window.sessionStorage.getItem(REWARD_PENDING_KEY);
    if (value !== "1") {
      return false;
    }
    window.sessionStorage.removeItem(REWARD_PENDING_KEY);
    return true;
  } catch {
    return false;
  }
};

export const peekRewardPending = (): boolean => {
  if (!hasSessionStorage()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(REWARD_PENDING_KEY) === "1";
  } catch {
    return false;
  }
};
