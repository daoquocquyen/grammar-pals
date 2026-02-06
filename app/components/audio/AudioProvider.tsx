"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  createSpeechController,
  type SpeechController,
  type SpeechDriver,
} from "../../../lib/audio/speechController";

export type AudioContextValue = {
  isMuted: boolean;
  isSupported: boolean;
  speak: (text: string) => void;
  repeat: () => void;
  toggleMute: () => void;
  cancel: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

const createBrowserDriver = (): SpeechDriver => {
  if (
    typeof window === "undefined" ||
    typeof window.speechSynthesis === "undefined" ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    return {
      isSupported: false,
      speak: () => {},
      cancel: () => {},
    };
  }

  return {
    isSupported: true,
    speak: (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    },
    cancel: () => {
      window.speechSynthesis.cancel();
    },
  };
};

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);

  const driver = useMemo(() => createBrowserDriver(), []);
  const controller = useMemo<SpeechController>(
    () => createSpeechController(driver),
    [driver]
  );
  const isSupported = driver.isSupported;

  useEffect(() => {
    controller.handleNavigation();
  }, [controller, pathname]);

  const speak = useCallback(
    (text: string) => {
      controller.speak(text);
    },
    [controller]
  );

  const repeat = useCallback(() => {
    controller.repeat();
  }, [controller]);

  const cancel = useCallback(() => {
    controller.cancel();
  }, [controller]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      controller.setMuted(next);
      return next;
    });
  }, [controller]);

  const value = useMemo(
    () => ({
      isMuted,
      isSupported,
      speak,
      repeat,
      toggleMute,
      cancel,
    }),
    [isMuted, isSupported, speak, repeat, toggleMute, cancel]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export const useAudio = (): AudioContextValue => {
  const context = useContext(AudioContext);
  if (!context) {
    return {
      isMuted: false,
      isSupported: false,
      speak: () => {},
      repeat: () => {},
      toggleMute: () => {},
      cancel: () => {},
    };
  }

  return context;
};
