import Link from "next/link";

type TopBarProps = {
  showHomeLink?: boolean;
};

export default function TopBar({ showHomeLink = true }: TopBarProps) {
  return (
    <header className="top-bar">
      <div className="top-bar__left">
        {showHomeLink ? (
          <Link className="logo-chip" href="/">
            GrammarPals
          </Link>
        ) : (
          <span className="logo-chip">GrammarPals</span>
        )}
      </div>
      <div className="top-bar__actions">
        <button
          className="icon-button"
          type="button"
          aria-label="Mute audio"
          title="Mute (coming soon)"
        >
          Mute
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Repeat audio"
          title="Repeat (coming soon)"
        >
          Repeat
        </button>
      </div>
    </header>
  );
}
