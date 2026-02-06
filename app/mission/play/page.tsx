import Link from "next/link";
import { loadSampleQuestionPack } from "../../../lib/content/loader";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function MissionPlayPage() {
  const packResult = loadSampleQuestionPack();

  if (!packResult.ok) {
    return (
      <main className="screen">
        <TopBar />
        <section className="panel">
          <h1>Oops! Something went wrong with this rescue.</h1>
          <p className="subtext">Please head back home and try again.</p>
          <Link className="btn btn-primary" href="/">
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  const question = packResult.questions[0];
  const critterCount = Math.min(question.scene.count, 4);
  const critters = Array.from({ length: critterCount }, (_, index) => index);

  return (
    <main className="screen">
      <TopBar />
      <div className="progress-row">
        <span className="progress-pill">1 / 8</span>
        <span className="progress-note">Question in progress</span>
      </div>

      <section className="panel clue-card">
        <div className="clue-picture" aria-hidden="true">
          {question.scene.numberBadge ? (
            <span className="clue-count">{question.scene.count}</span>
          ) : null}
          <div className="clue-critters">
            {critters.map((critter) => (
              <span key={critter} />
            ))}
          </div>
        </div>
        <p className="subtext">{question.prompt.text}</p>
      </section>

      <div className="sentence-grid">
        {question.options.map((option) => (
          <Link
            className="sentence-card"
            href="/mission/halfway"
            key={option.id}
          >
            {option.text}
          </Link>
        ))}
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
