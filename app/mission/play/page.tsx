import Link from "next/link";
import { loadSampleQuestionPack } from "../../../lib/content/loader";
import {
  advanceMission,
  buildHalfwayHref,
  buildMissionPlayHref,
  clampIndex,
  parsePositiveInteger,
  selectMissionQuestions,
} from "../../../lib/mission/progression";
import TopBar from "../../components/TopBar";
import MissionPlayClient from "./MissionPlayClient";

type MissionPlayPageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

const getParam = (
  value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

export default async function MissionPlayPage({
  searchParams,
}: MissionPlayPageProps) {
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

  const missionSelection = selectMissionQuestions(packResult.questions);

  if (!missionSelection.ok) {
    return (
      <main className="screen">
        <TopBar />
        <section className="panel">
          <h1>We need a few more rescue questions.</h1>
          <p className="subtext">
            Our helpers are still getting the next questions ready. Please check
            back soon.
          </p>
          <Link className="btn btn-primary" href="/">
            Back to Home
          </Link>
        </section>
      </main>
    );
  }

  const resolvedParams = await searchParams;
  const stepParam = getParam(resolvedParams?.step);
  const halfwayParam = getParam(resolvedParams?.halfway);
  const currentStep = parsePositiveInteger(stepParam, 1);
  const totalQuestions = missionSelection.questions.length;
  const currentIndex = clampIndex(currentStep - 1, totalQuestions);
  const halfwayShown = halfwayParam === "1";

  const question = missionSelection.questions[currentIndex];
  const progressLabel = `${currentIndex + 1}/${totalQuestions}`;
  const advance = advanceMission({
    currentIndex,
    totalQuestions,
    halfwayShown,
  });
  const nextHref = advance.isComplete
    ? "/mission/end"
    : advance.showHalfway
      ? buildHalfwayHref(advance.nextIndex + 1)
      : buildMissionPlayHref(advance.nextIndex + 1, halfwayShown);

  return (
    <main className="screen">
      <TopBar />
      <MissionPlayClient
        key={question.id}
        question={question}
        progressLabel={progressLabel}
        nextHref={nextHref}
        currentStep={currentIndex + 1}
        totalQuestions={totalQuestions}
        topicId={question.skill}
      />

      <div className="helper-row">
        <Link className="text-link" href="/mission/end">
          Skip to mission end
        </Link>
      </div>
    </main>
  );
}
