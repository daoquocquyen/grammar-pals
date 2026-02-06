import Link from "next/link";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

export default function MissionEndPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel end-card">
        <div className="end-burst" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <h1>Mission Complete!</h1>
          <p className="subtext">Remember: is = one, are = many.</p>
        </div>
      </section>

      <PetPanel message="Nice work! Is is for one, are is for many." mood="happy" />

      <div className="action-row">
        <Link className="btn btn-primary" href="/reward">
          Get Reward
        </Link>
      </div>
    </main>
  );
}
