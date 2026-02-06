import Link from "next/link";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function MissionHalfwayPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel halfway-card">
        <div className="halfway-art" aria-hidden="true">
          <div className="halfway-creature" />
          <div className="halfway-sparkles">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div>
          <h1>You are helping!</h1>
          <p className="subtext">The animals are feeling better.</p>
        </div>
      </section>

      <PetPanel message="Wow! They are feeling better already." mood="cheer" />

      <div className="action-row">
        <Link className="btn btn-primary" href="/mission/play">
          Continue
        </Link>
        <Link className="btn btn-ghost" href="/mission/end">
          Jump to end
        </Link>
      </div>
    </main>
  );
}
