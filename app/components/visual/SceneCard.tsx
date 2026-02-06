import Image from "next/image";
import { getAssetPath } from "../../../lib/assets/manifest";

export type SceneCardProps = {
  backgroundKey: string;
  animalKey: string;
  count: number;
  numberBadge?: boolean;
  highlight?: boolean;
};

const buildCritters = (count: number): number[] =>
  Array.from({ length: Math.min(count, 4) }, (_, index) => index);

export default function SceneCard({
  backgroundKey,
  animalKey,
  count,
  numberBadge = false,
  highlight = false,
}: SceneCardProps) {
  const backgroundSrc = getAssetPath(backgroundKey);
  const animalSrc = getAssetPath(animalKey);
  const critters = buildCritters(count);

  return (
    <section
      className={`scene-card${highlight ? " is-highlight" : ""}`}
      aria-label="Scene clue"
    >
      {backgroundSrc ? (
        <Image
          className="scene-card__background"
          src={backgroundSrc}
          alt=""
          fill
          sizes="100vw"
          priority={false}
        />
      ) : null}
      <div className="scene-card__overlay">
        {numberBadge ? (
          <span className="scene-card__badge">{count}</span>
        ) : null}
        <div className="scene-card__animals" aria-hidden="true">
          {critters.map((critter) => (
            <Image
              key={critter}
              className="scene-card__animal"
              src={animalSrc}
              alt=""
              width={120}
              height={120}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
