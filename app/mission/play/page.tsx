import Link from "next/link";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function MissionPlayPage() {
  return (
    <main className="screen">
      <TopBar />
      <div className="progress-row">
        <span className="progress-pill">1 / 8</span>
        <span className="progress-note">Question in progress</span>
      </div>

      <section className="panel clue-card">
        <div className="clue-picture" aria-hidden="true">
          <span className="clue-count">3</span>
          <div className="clue-critters">
            <span />
            <span />
            <span />
          </div>
        </div>
        <p className="subtext">Choose the correct sentence.</p>
      </section>

      <div className="sentence-grid">
        <Link className="sentence-card" href="/mission/halfway">
          The cats are happy.
        </Link>
        <Link className="sentence-card" href="/mission/halfway">
          The cats is happy.
        </Link>
      </div>

      <PetPanel
        message="Pick the sentence that matches the clue."
        reaction="curious"
      />

      <div className="helper-row">
        <Link className="text-link" href="/mission/end">
          Skip to mission end
        </Link>
      </div>
    </main>
  );
}
