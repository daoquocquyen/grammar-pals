"use client";

import { useEffect } from "react";
import { useAudio } from "./audio/AudioProvider";

type PetReaction = "idle" | "happy" | "thinking" | "cheer" | "curious";

type PetPanelProps = {
  message: string;
  reaction?: PetReaction;
  badge?: string;
  accessoryLabel?: string;
  className?: string;
  autoSpeak?: boolean;
};

export default function PetPanel({
  message,
  reaction = "idle",
  badge,
  accessoryLabel,
  className,
  autoSpeak = false,
}: PetPanelProps) {
  const { speak } = useAudio();

  useEffect(() => {
    if (autoSpeak) {
      speak(message);
    }
  }, [autoSpeak, message, speak]);

  return (
    <section className={`pet-panel pet-panel--${reaction} ${className ?? ""}`}>
      <div className="pet-avatar" aria-hidden="true">
        <span className="pet-eye" />
        <span className="pet-eye" />
        <span className="pet-smile" />
        {accessoryLabel ? (
          <span className="pet-accessory">{accessoryLabel}</span>
        ) : null}
      </div>
      <div className="pet-bubble">
        <p>{message}</p>
        {badge ? <span className="pet-reaction">{badge}</span> : null}
      </div>
    </section>
  );
}
