import type { Content } from "@/lib/content";

export function Testimonials({ testimonials }: { testimonials: Content["testimonials"] }) {
  return (
    <section className="cs-testimonials">
      <div className="cs-section-head">
        <span className="cs-section-no">06</span>
        <span className="cs-section-name">{testimonials.section}</span>
      </div>
      <h2 className="cs-h2">
        You&apos;re not the first <em>to show up here.</em>
      </h2>
      <p className="cs-section-sub">{testimonials.sub}</p>
      <div className="cs-quotes">
        {testimonials.quotes.map((q, i) => (
          <blockquote key={i}>
            <span className="cs-quote-no">T / {String(i + 1).padStart(2, "0")}</span>
            <p>&ldquo;{q.text}&rdquo;</p>
            <footer>
              <strong>{q.name}</strong>
              <span>{q.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
