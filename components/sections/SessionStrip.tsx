import type { Content } from "@/lib/content";

type Props = { session: Content["session"] };

export function SessionStrip({ session }: Props) {
  return (
    <section className="cs-session-strip" aria-label="Session details">
      <div className="cs-session-grid">
        {session.metrics.map((m) => (
          <article className="cs-session-card" key={m.id}>
            <div className="cs-session-card-head">
              <span className="cs-session-card-icon" aria-hidden>
                {m.icon}
              </span>
              <span className="cs-session-card-label">{m.label}</span>
            </div>
            <strong className="cs-session-card-primary">{m.primary}</strong>
            <span className="cs-session-card-secondary">{m.secondary}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
