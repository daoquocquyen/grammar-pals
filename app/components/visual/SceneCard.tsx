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
  const sparkleSrc = getAssetPath("ui.ui_sparkle");
  const pawprintSrc = getAssetPath("ui.ui_pawprint");
  const critters = buildCritters(count);

  return (
    <section
      className={`scene-card${highlight ? " is-highlight" : ""}`}
      aria-label="Scene clue"
    >
      <div className="scene-card__inner">
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
          <div className="scene-card__stickers" aria-hidden="true">
            {sparkleSrc ? (
              <Image
                className="scene-card__sticker scene-card__sticker--sparkle"
                src={sparkleSrc}
                alt=""
                width={48}
                height={48}
              />
            ) : null}
            {pawprintSrc ? (
              <Image
                className="scene-card__sticker scene-card__sticker--paw"
                src={pawprintSrc}
                alt=""
                width={44}
                height={44}
              />
            ) : null}
          </div>
          {numberBadge ? (
            <span className="scene-card__badge">{count}</span>
          ) : null}
          <div className="scene-card__animal-stage" aria-hidden="true">
            <div className="scene-card__ground" />
            <div className="scene-card__animals">
              {critters.map((critter) => (
                <span key={critter} className="scene-card__critter">
                  <Image
                    className="scene-card__animal"
                    src={animalSrc}
                    alt=""
                    width={120}
                    height={120}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
