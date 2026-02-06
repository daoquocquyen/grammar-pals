import Link from "next/link";
import PetPanel from "./components/PetPanel";
import TopBar from "./components/TopBar";

export default function Home() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel hero">
        <div className="hero-text">
          <p className="eyebrow">GrammarPals</p>
          <h1>Rescue missions for is/are.</h1>
          <p className="subtext">
            Help the animals by picking the right sentence.
          </p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-badge">Mission Ready</div>
          <div className="hero-shapes">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <PetPanel
        message="Hi! Ready to rescue and learn is/are?"
        reaction="cheer"
        badge="Lets go!"
      />

      <div className="action-row">
        <Link className="btn btn-primary" href="/mission/intro">
          Start Rescue
        </Link>
        <Link className="btn btn-secondary" href="/closet">
          Accessories
        </Link>
      </div>

      <div className="helper-row">
        <button className="text-link" type="button">
          Grown-ups
        </button>
        <span className="helper-note">No accounts. No tracking.</span>
      </div>
    </main>
  );
}
