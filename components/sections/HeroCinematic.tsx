"use client";

import type { Content } from "@/lib/content";

type Props = {
  hero: Content["hero"];
  onRegister: () => void;
  bgImageUrl: string;
};

export function HeroCinematic({ hero, onRegister, bgImageUrl }: Props) {
  return (
    <section className="cs-hero-cine">
      <div className="cs-hero-bg-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cs-hero-bg"
          src={bgImageUrl}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
        />
        <div className="cs-hero-vignette" />
        <div className="cs-hero-gradient" />
      </div>

      <div className="cs-hero-stage">
        <div className="cs-hero-titlecard">
          <span className="cs-hero-eyebrow">{hero.eyebrow}</span>
          <h1 className="cs-h1-cine">
            <span className="cs-h1-line cs-h1-fade">How to start your</span>
            <span className="cs-h1-line cs-h1-fade cs-h1-d2">filmmaking career</span>
            <span className="cs-h1-line cs-h1-fade cs-h1-d3">
              in <em>2026.</em>
            </span>
          </h1>
          <p className="cs-hero-sub-cine">{hero.sub}</p>
          <div className="cs-cta-row">
            <button className="cs-btn" onClick={onRegister} type="button">
              {hero.cta} <span aria-hidden>→</span>
            </button>
            <span className="cs-cta-note">{hero.note}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
