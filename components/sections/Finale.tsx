"use client";

import type { Content } from "@/lib/content";

type Props = {
  finale: Content["finale"];
  onRegister: () => void;
};

export function Finale({ finale, onRegister }: Props) {
  return (
    <section className="cs-finale">
      <div className="cs-section-head">
        <span className="cs-section-name">{finale.section}</span>
      </div>
      <h2 className="cs-h2 cs-finale-h">
        You came here <em>for a reason.</em>
      </h2>
      <div className="cs-finale-body">
        {finale.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="cs-finale-cta">
        <button className="cs-btn" type="button" onClick={onRegister}>
          {finale.primary} →
        </button>
        <a href="#curriculum" className="cs-btn cs-btn-ghost">
          {finale.secondary}
        </a>
      </div>
      <p className="cs-finale-note">{finale.note}</p>
    </section>
  );
}
