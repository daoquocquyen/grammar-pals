"use client";

import Link from "next/link";
import { useAudio } from "./audio/AudioProvider";

type TopBarProps = {
  showHomeLink?: boolean;
};

export default function TopBar({ showHomeLink = true }: TopBarProps) {
  const { isMuted, toggleMute, repeat, isSupported } = useAudio();
  const muteLabel = isMuted ? "Unmute" : "Mute";
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
          aria-pressed={isMuted}
          title={isSupported ? "Toggle mute" : "Speech not supported"}
          onClick={toggleMute}
          disabled={!isSupported}
        >
          {muteLabel}
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Repeat audio"
          title={isSupported ? "Repeat" : "Speech not supported"}
          onClick={repeat}
          disabled={!isSupported}
        >
          Repeat
        </button>
      </div>
    </header>
  );
}
