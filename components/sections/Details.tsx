import type { Content } from "@/lib/content";

export function Details({ details }: { details: Content["details"] }) {
  return (
    <section className="cs-details">
      <div className="cs-section-head">
        <span className="cs-section-name">{details.section}</span>
      </div>
      <h2 className="cs-h2">
        Here&apos;s everything <em>you need to know.</em>
      </h2>
      <p className="cs-section-sub">{details.sub}</p>
      <div className="cs-details-grid">
        {details.items.map((d, i) => (
          <div key={i} className="cs-detail-card">
            <span className="cs-detail-icon" aria-hidden>{d.icon}</span>
            <h4>{d.label}</h4>
            <strong>{d.primary}</strong>
            <p>{d.secondary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
