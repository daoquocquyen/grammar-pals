"use client";

import Image from "next/image";
import { useEffect } from "react";
import { getAssetPath } from "../../../lib/assets/manifest";
import { useAudio } from "../audio/AudioProvider";

export type PuppyMood = "idle" | "happy" | "thinking" | "celebrate";

export type PuppyCoachBarProps = {
  message: string;
  mood?: PuppyMood;
  autoSpeak?: boolean;
};

const moodToKey: Record<PuppyMood, string> = {
  idle: "puppy.puppy_idle",
  happy: "puppy.puppy_happy",
  thinking: "puppy.puppy_thinking",
  celebrate: "puppy.puppy_celebrate",
};

export default function PuppyCoachBar({
  message,
  mood = "idle",
  autoSpeak = false,
}: PuppyCoachBarProps) {
  const { speak } = useAudio();
  const puppySrc = getAssetPath(moodToKey[mood]);
  const bubbleSrc = getAssetPath("ui.ui_speech_bubble");
  const sparkleSrc = getAssetPath("ui.ui_sparkle");
  const pawprintSrc = getAssetPath("ui.ui_pawprint");
  const confettiSrc = getAssetPath("ui.ui_confetti");
  const showCelebrate = mood === "happy" || mood === "celebrate";

  useEffect(() => {
    if (autoSpeak) {
      speak(message);
    }
  }, [autoSpeak, message, speak]);

  return (
    <section className={`puppy-coach puppy-coach--${mood}`} aria-label="Puppy coach">
      <div className="puppy-coach__avatar">
        <span className="puppy-coach__halo" aria-hidden="true" />
        {puppySrc ? (
          <Image
            src={puppySrc}
            alt=""
            className="puppy-coach__puppy"
            width={140}
            height={140}
          />
        ) : null}
        {showCelebrate && confettiSrc ? (
          <Image
            src={confettiSrc}
            alt=""
            className="puppy-coach__confetti"
            width={64}
            height={64}
          />
        ) : null}
      </div>
      <div className="puppy-coach__bubble">
        {bubbleSrc ? (
          <Image
            src={bubbleSrc}
            alt=""
            className="puppy-coach__bubble-art"
            width={420}
            height={220}
          />
        ) : null}
        <div className="puppy-coach__sparkles" aria-hidden="true">
          {sparkleSrc ? (
            <Image
              src={sparkleSrc}
              alt=""
              className="puppy-coach__sparkle puppy-coach__sparkle--one"
              width={32}
              height={32}
            />
          ) : null}
          {pawprintSrc ? (
            <Image
              src={pawprintSrc}
              alt=""
              className="puppy-coach__sparkle puppy-coach__sparkle--two"
              width={28}
              height={28}
            />
          ) : null}
        </div>
        <p className="puppy-coach__message">{message}</p>
      </div>
    </section>
  );
}
