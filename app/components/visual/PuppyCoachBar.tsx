import Image from "next/image";
import { getAssetPath } from "../../../lib/assets/manifest";

export type PuppyMood = "idle" | "happy" | "thinking" | "celebrate";

export type PuppyCoachBarProps = {
  message: string;
  mood?: PuppyMood;
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
}: PuppyCoachBarProps) {
  const puppySrc = getAssetPath(moodToKey[mood]);
  const bubbleSrc = getAssetPath("ui.ui_speech_bubble");

  return (
    <section className="puppy-coach" aria-label="Puppy coach">
      <div className="puppy-coach__avatar">
        {puppySrc ? (
          <Image
            src={puppySrc}
            alt=""
            className="puppy-coach__puppy"
            width={140}
            height={140}
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
        <p className="puppy-coach__message">{message}</p>
      </div>
    </section>
  );
}
