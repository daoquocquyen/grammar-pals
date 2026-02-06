type PetReaction = "idle" | "happy" | "thinking" | "cheer" | "curious";

type PetPanelProps = {
  message: string;
  reaction?: PetReaction;
  badge?: string;
  accessoryLabel?: string;
  className?: string;
};

export default function PetPanel({
  message,
  reaction = "idle",
  badge,
  accessoryLabel,
  className,
}: PetPanelProps) {
  return (
    <section className={`pet-panel pet-panel--${reaction} ${className ?? ""}`}>
      <div className="pet-avatar" aria-hidden="true">
        <span className="pet-eye" />
        <span className="pet-eye" />
        <span className="pet-smile" />
        {accessoryLabel ? (
          <span className="pet-accessory">{accessoryLabel}</span>
        ) : null}
      </div>
      <div className="pet-bubble">
        <p>{message}</p>
        {badge ? <span className="pet-reaction">{badge}</span> : null}
      </div>
    </section>
  );
}
