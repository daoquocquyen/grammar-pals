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
import { getQuestionView } from "../../../lib/mission/questionView";
import PetPanel from "../../components/PetPanel";
import TopBar from "../../components/TopBar";

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
  const questionView = getQuestionView(question.template);
  const critterCount = Math.min(question.scene.count, 4);
  const critters = Array.from({ length: critterCount }, (_, index) => index);
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
      <div className="progress-row">
        <span className="progress-pill">{progressLabel}</span>
        <span className="progress-note">Question in progress</span>
      </div>

      {questionView.showPictureClue ? (
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
      ) : (
        <section className="panel prompt-card">
          <p className="prompt-text">{question.prompt.text}</p>
        </section>
      )}

      <div className="sentence-grid">
        {question.options.map((option) => (
          <Link className="sentence-card" href={nextHref} key={option.id}>
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
