import Image from "next/image";
import Link from "next/link";
import TopBar from "./components/TopBar";
import PuppyCoachBar from "./components/visual/PuppyCoachBar";
import { getAssetPath } from "../lib/assets/manifest";

export default function Home() {
  const parkSrc = getAssetPath("world.bg_park_day");
  const pawSrc = getAssetPath("ui.ui_pawprint");
  const sparkleSrc = getAssetPath("ui.ui_sparkle");
  const hatSrc = getAssetPath("accessories.acc_001_hat");

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
          <span className="home-park__bubble home-park__bubble--one" />
          <span className="home-park__bubble home-park__bubble--two" />
        </div>
        <div className="home-park__content">
          <div className="home-hero">
            <div className="home-hero__coach">
              <PuppyCoachBar message="Ready to rescue?" mood="happy" autoSpeak />
              <span className="home-hero__tag">Let&apos;s go!</span>
            </div>
            <div className="home-hero__path" aria-label="Rescue path">
              <div className="rescue-path">
                <span className="rescue-path__line" aria-hidden="true" />
                <div className="rescue-node is-today" aria-label="Today's mission">
                  {pawSrc ? (
                    <Image
                      src={pawSrc}
                      alt=""
                      className="rescue-node__icon"
                      width={40}
                      height={40}
                    />
                  ) : null}
                  <span className="rescue-node__tag">Today</span>
                </div>
                <div className="rescue-node" aria-label="Quiz">
                  {sparkleSrc ? (
                    <Image
                      src={sparkleSrc}
                      alt=""
                      className="rescue-node__icon"
                      width={38}
                      height={38}
                    />
                  ) : null}
                </div>
                <div className="rescue-node" aria-label="Reward">
                  <svg
                    className="rescue-node__icon rescue-node__icon--gift"
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
