export type SpeechDriver = {
  isSupported: boolean;
  speak: (text: string) => void;
  cancel: () => void;
};

export type SpeechControllerState = {
  muted: boolean;
  lastLine: string | null;
};

export type SpeechController = {
  speak: (text: string) => void;
  repeat: () => void;
  cancel: () => void;
  toggleMute: () => void;
  setMuted: (value: boolean) => void;
  handleNavigation: () => void;
  getState: () => SpeechControllerState;
};

const normalizeLine = (text: string): string => text.trim();

export const createSpeechController = (
  driver: SpeechDriver
): SpeechController => {
  const state: SpeechControllerState = {
    muted: false,
    lastLine: null,
  };

  const speak = (text: string) => {
    const normalized = normalizeLine(text);
    if (!normalized) {
      return;
    }

    state.lastLine = normalized;

    if (state.muted || !driver.isSupported) {
      return;
    }

    driver.cancel();
    driver.speak(normalized);
  };

  const repeat = () => {
    if (!state.lastLine) {
      return;
    }

    speak(state.lastLine);
  };

  const cancel = () => {
    if (!driver.isSupported) {
      return;
    }

    driver.cancel();
  };

  const setMuted = (value: boolean) => {
    state.muted = value;
    if (value) {
      cancel();
    }
  };

  const toggleMute = () => {
    setMuted(!state.muted);
  };

  const handleNavigation = () => {
    cancel();
  };

  const getState = () => ({ ...state });

  return {
    speak,
    repeat,
    cancel,
    toggleMute,
    setMuted,
    handleNavigation,
    getState,
  };
};
