type PetPanelProps = {
  message: string;
  mood?: "happy" | "curious" | "cheer" | "thoughtful";
  reaction?: string;
};

export default function PetPanel({
  message,
  mood = "happy",
  reaction,
}: PetPanelProps) {
  return (
    <section className={`pet-panel pet-panel--${mood}`}>
      <div className="pet-avatar" aria-hidden="true">
        <span className="pet-eye" />
        <span className="pet-eye" />
        <span className="pet-smile" />
      </div>
      <div className="pet-bubble">
        <p>{message}</p>
        {reaction ? <span className="pet-reaction">{reaction}</span> : null}
      </div>
    </section>
  );
}
