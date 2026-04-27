import type { Content } from "@/lib/content";

export function Audience({ audience }: { audience: Content["audience"] }) {
  return (
    <section className="cs-audience">
      <div className="cs-section-head">
        <span className="cs-section-name">{audience.section}</span>
      </div>
      <h2 className="cs-h2">
        Is this masterclass <em>for you?</em>
      </h2>
      <p className="cs-section-sub">{audience.sub}</p>
      <div className="cs-audience-grid">
        {audience.items.map((a, i) => (
          <div key={i} className="cs-audience-item">
            <span className="cs-check">✓ {String(i + 1).padStart(2, "0")}</span>
            <p>{a}</p>
          </div>
        ))}
      </div>
      <aside className="cs-not-for">
        <h3 className="cs-not-for-h">{audience.notForTitle}</h3>
        <p className="cs-not-for-body">{audience.notFor}</p>
      </aside>
    </section>
  );
}
