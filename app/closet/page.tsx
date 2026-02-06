import Link from "next/link";
import TopBar from "../components/TopBar";
import ClosetClient from "./ClosetClient";

export default function ClosetPage() {
  return (
    <main className="screen">
      <TopBar />
      <ClosetClient />

      <div className="action-row">
        <Link className="btn btn-primary" href="/">
          Back to Home
        </Link>
      </div>
    </main>
  );
}
