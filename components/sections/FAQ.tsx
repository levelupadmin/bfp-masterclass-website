import type { Content } from "@/lib/content";

export function FAQ({ faq }: { faq: Content["faq"] }) {
  return (
    <section className="cs-faq" id="faq">
      <div className="cs-section-head">
        <span className="cs-section-name">{faq.section}</span>
      </div>
      <h2 className="cs-h2">
        Questions you <em>might have.</em>
      </h2>
      <div className="cs-faq-list">
        {faq.items.map((f, i) => (
          <details key={i} className="cs-faq-item">
            <summary>
              <span className="cs-faq-no">Q / {String(i + 1).padStart(2, "0")}</span>
              <span className="cs-faq-q">{f.q}</span>
              <span className="cs-faq-toggle" aria-hidden>+</span>
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
