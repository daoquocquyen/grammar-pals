type PetReaction = "idle" | "happy" | "thinking" | "cheer" | "curious";

type PetPanelProps = {
  message: string;
  reaction?: PetReaction;
  badge?: string;
};

export default function PetPanel({
  message,
  reaction = "idle",
  badge,
}: PetPanelProps) {
  return (
    <section className={`pet-panel pet-panel--${reaction}`}>
      <div className="pet-avatar" aria-hidden="true">
        <span className="pet-eye" />
        <span className="pet-eye" />
        <span className="pet-smile" />
      </div>
      <div className="pet-bubble">
        <p>{message}</p>
        {badge ? <span className="pet-reaction">{badge}</span> : null}
      </div>
    </section>
  );
}
