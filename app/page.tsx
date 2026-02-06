import Image from "next/image";
import Link from "next/link";
import TopBar from "./components/TopBar";
import { getAssetPath } from "../lib/assets/manifest";

export default function Home() {
  const parkSrc = getAssetPath("world.bg_park_day");
  const puppySrc = getAssetPath("puppy.puppy_idle");
  const bubbleSrc = getAssetPath("ui.ui_speech_bubble");
  const pawSrc = getAssetPath("ui.ui_pawprint");
  const sparkleSrc = getAssetPath("ui.ui_sparkle");
  const ballSrc = getAssetPath("ui.ui_ball");
  const catSrc = getAssetPath("animals.animal_cat");
  const hatSrc = getAssetPath("accessories.acc_001_hat");
  const rewardSrc = getAssetPath("accessories.acc_002_cape");

  return (
    <main className="screen home-hub">
      <TopBar />
      <section className="home-park" aria-label="Puppy Park">
        <div className="home-park__bg" aria-hidden="true">
          {parkSrc ? (
            <Image
              src={parkSrc}
              alt=""
              className="home-park__bg-image"
              fill
              sizes="100vw"
              priority
            />
          ) : null}
          <span className="home-park__cloud home-park__cloud--one" />
          <span className="home-park__cloud home-park__cloud--two" />
          <span className="home-park__cloud home-park__cloud--three" />
          <span className="home-park__sparkle home-park__sparkle--one" />
          <span className="home-park__sparkle home-park__sparkle--two" />
          <span className="home-park__bubble home-park__bubble--one" />
          <span className="home-park__bubble home-park__bubble--two" />
          {ballSrc ? (
            <Image
              src={ballSrc}
              alt=""
              className="home-park__toy"
              width={60}
              height={60}
            />
          ) : null}
        </div>
        <div className="home-park__content">
          <div className="home-hero">
            <div className="home-hero__puppy">
              <div className="puppy-hero" aria-hidden="true">
                {puppySrc ? (
                  <Image
                    src={puppySrc}
                    alt=""
                    className="puppy-hero__image"
                    width={420}
                    height={420}
                    priority
                  />
                ) : null}
                <span className="puppy-hero__tail" />
                <span className="puppy-hero__blink puppy-hero__blink--left" />
                <span className="puppy-hero__blink puppy-hero__blink--right" />
              </div>
              <div className="puppy-speech">
                {bubbleSrc ? (
                  <Image
                    src={bubbleSrc}
                    alt=""
                    className="puppy-speech__bubble"
                    width={360}
                    height={210}
                  />
                ) : null}
                <p className="puppy-speech__text">Ready to rescue?</p>
              </div>
            </div>
            <div className="home-hero__stickers">
              <div className="sticker-card mission-card">
                <span className="sticker-card__title">Today&apos;s Mission</span>
                <div className="mission-card__preview" aria-hidden="true">
                  {catSrc ? (
                    <>
                      <Image src={catSrc} alt="" width={44} height={44} />
                      <Image src={catSrc} alt="" width={44} height={44} />
                      <Image src={catSrc} alt="" width={44} height={44} />
                    </>
                  ) : null}
                </div>
                <span className="sticker-card__note">is / are</span>
              </div>
              <div className="sticker-card reward-card">
                <span className="sticker-card__title">Win a new accessory!</span>
                {rewardSrc ? (
                  <Image
                    src={rewardSrc}
                    alt=""
                    className="reward-card__image"
                    width={70}
                    height={70}
                  />
                ) : null}
              </div>
              <div className="paw-trail" aria-label="Rescue path">
                <div className="paw-trail__prints" aria-hidden="true">
                  {pawSrc ? (
                    <>
                      <Image src={pawSrc} alt="" width={30} height={30} />
                      <Image src={pawSrc} alt="" width={30} height={30} />
                      <Image src={pawSrc} alt="" width={30} height={30} />
                      <Image src={pawSrc} alt="" width={30} height={30} />
                      <Image src={pawSrc} alt="" width={30} height={30} />
                    </>
                  ) : null}
                </div>
                <div className="paw-trail__nodes">
                  <div className="paw-node is-today">
                    {pawSrc ? (
                      <Image
                        src={pawSrc}
                        alt=""
                        className="paw-node__icon"
                        width={32}
                        height={32}
                      />
                    ) : null}
                    <span className="paw-node__label">Start</span>
                    <span className="paw-node__tag">Today</span>
                  </div>
                  <div className="paw-node">
                    {sparkleSrc ? (
                      <Image
                        src={sparkleSrc}
                        alt=""
                        className="paw-node__icon"
                        width={32}
                        height={32}
                      />
                    ) : null}
                    <span className="paw-node__label">Quiz</span>
                  </div>
                  <div className="paw-node">
                    <svg
                      className="paw-node__icon paw-node__icon--gift"
                      viewBox="0 0 64 64"
                      aria-hidden="true"
                    >
                      <rect
                        x="10"
                        y="26"
                        width="44"
                        height="28"
                        rx="6"
                        fill="#FFC6FF"
                        stroke="#5B4A3A"
                        strokeWidth="4"
                      />
                      <rect
                        x="10"
                        y="18"
                        width="44"
                        height="12"
                        rx="6"
                        fill="#FFE17B"
                        stroke="#5B4A3A"
                        strokeWidth="4"
                      />
                      <rect
                        x="30"
                        y="18"
                        width="4"
                        height="36"
                        fill="#FFE17B"
                        stroke="#5B4A3A"
                        strokeWidth="2"
                      />
                      <circle
                        cx="24"
                        cy="18"
                        r="6"
                        fill="#FFD3A1"
                        stroke="#5B4A3A"
                        strokeWidth="3"
                      />
                      <circle
                        cx="40"
                        cy="18"
                        r="6"
                        fill="#FFD3A1"
                        stroke="#5B4A3A"
                        strokeWidth="3"
                      />
                    </svg>
                    <span className="paw-node__label">Gift</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-actions">
        <Link className="sticker-button sticker-button--primary" href="/mission/intro">
          {pawSrc ? (
            <Image
              src={pawSrc}
              alt=""
              className="sticker-button__icon"
              width={34}
              height={34}
            />
          ) : null}
          Start Rescue!
        </Link>
        <Link className="sticker-button sticker-button--secondary" href="/closet">
          {hatSrc ? (
            <Image
              src={hatSrc}
              alt=""
              className="sticker-button__icon"
              width={34}
              height={34}
            />
          ) : null}
          Toy Box
        </Link>
      </div>

      <footer className="home-footer">
        <button className="text-link" type="button">
          Grown-ups
        </button>
        <span className="helper-note">No accounts. No tracking.</span>
      </footer>
    </main>
  );
}
