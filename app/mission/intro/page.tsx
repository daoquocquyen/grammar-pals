import Link from "next/link";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function MissionIntroPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel story-card">
        <div className="story-illustration" aria-hidden="true">
          <div className="story-creature" />
          <div className="story-spark">
            <span />
            <span />
          </div>
        </div>
        <div>
          <h1>Oh no! The kittens need help.</h1>
          <p className="subtext">We can rescue them with is and are.</p>
        </div>
      </section>

      <PetPanel
        message="Lets help them! We will use is and are."
        mood="thoughtful"
      />

      <div className="action-row">
        <Link className="btn btn-primary" href="/mission/topic">
          Continue
        </Link>
        <Link className="btn btn-ghost" href="/mission/topic">
          Skip
        </Link>
      </div>
    </main>
  );
}
