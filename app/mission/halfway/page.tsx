import Link from "next/link";
import {
  buildMissionPlayHref,
  MISSION_QUESTION_COUNT,
  parsePositiveInteger,
} from "../../../lib/mission/progression";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

type MissionHalfwayPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const getParam = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

export default function MissionHalfwayPage({
  searchParams,
}: MissionHalfwayPageProps) {
  const nextParam = getParam(searchParams?.next);
  const nextStep = parsePositiveInteger(nextParam, 5);
  const safeNextStep = Math.min(nextStep, MISSION_QUESTION_COUNT);
  const continueHref = buildMissionPlayHref(safeNextStep, true);

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

      <PetPanel message="Wow! They are feeling better already." reaction="cheer" />

      <div className="action-row">
        <Link className="btn btn-primary" href={continueHref}>
          Continue
        </Link>
        <Link className="btn btn-ghost" href="/mission/end">
          Jump to end
        </Link>
      </div>
    </main>
  );
}
