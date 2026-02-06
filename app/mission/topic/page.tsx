import Link from "next/link";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function TopicIntroPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel topic-card">
        <div className="topic-visual">
          <div className="topic-side">
            <span className="topic-label">one</span>
            <div className="topic-icons">
              <span className="topic-dot" />
            </div>
          </div>
          <div className="topic-side">
            <span className="topic-label">many</span>
            <div className="topic-icons">
              <span className="topic-dot" />
              <span className="topic-dot" />
              <span className="topic-dot" />
            </div>
          </div>
        </div>
        <p className="subtext">Is is for one. Are is for many.</p>
      </section>

      <PetPanel message="Is is for one. Are is for many. Now you try!" />

      <div className="action-row">
        <Link className="btn btn-primary" href="/mission/play">
          Start Quiz
        </Link>
        <Link className="btn btn-ghost" href="/mission/play">
          Skip
        </Link>
      </div>
    </main>
  );
}
