import type { Content } from "@/lib/content";

export function Pattern({ pattern }: { pattern: Content["pattern"] }) {
  return (
    <section className="cs-pattern">
      <div className="cs-section-head">
        <span className="cs-section-name">{pattern.section}</span>
      </div>
      <h2 className="cs-h2">
        100 people say <em>&ldquo;I want to make a film.&rdquo;</em>
        <br />
        Only <em>1</em> actually does.
      </h2>
      <p className="cs-pattern-sub">{pattern.sub}</p>
      <ul className="cs-pattern-list">
        {pattern.bullets.map((b, i) => (
          <li key={i}>
            <span className="cs-bullet-no">{String(i + 1).padStart(2, "0")}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="cs-pattern-closer">{pattern.closer}</p>
    </section>
  );
}
