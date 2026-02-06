import Link from "next/link";
import PetPanel from "../components/PetPanel";
import TopBar from "../components/TopBar";

export default function RewardPage() {
  return (
    <main className="screen">
      <TopBar />
      <section className="panel reward-card">
        <div className="reward-item" aria-hidden="true">
          <div className="reward-icon" />
          <div className="reward-name">Star Cape</div>
        </div>
        <p className="subtext">You earned a new accessory!</p>
      </section>

      <PetPanel
        message="You earned a new accessory! Try it on."
        mood="cheer"
      />

      <div className="action-row">
        <Link className="btn btn-primary" href="/closet">
          Equip
        </Link>
        <Link className="btn btn-secondary" href="/">
          Later
        </Link>
      </div>
    </main>
  );
}
