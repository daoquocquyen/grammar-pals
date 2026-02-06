import Link from "next/link";
import TopBar from "../../components/TopBar";
import MissionEndClient from "./MissionEndClient";

export default function MissionEndPage() {
  return (
    <main className="screen">
      <TopBar />
      <MissionEndClient />

      <div className="action-row">
        <Link className="btn btn-primary" href="/reward">
          Get Reward
        </Link>
      </div>
    </main>
  );
}
