"use client";

import { useEffect, useRef, useState } from "react";
import type { Content } from "@/lib/content";

type Props = { curriculum: Content["curriculum"]; onRegister: () => void };

export function Curriculum({ curriculum, onRegister }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".cs-curr-card"));
      if (!cards.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIdx(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToCard = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>(".cs-curr-card")[idx];
    if (!card) return;
    const targetLeft = card.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  const total = curriculum.modules.length;

  return (
    <section className="cs-curriculum cs-light" id="curriculum">
      <div className="cs-section-head">
        <span className="cs-section-no">02</span>
        <span className="cs-section-name">{curriculum.section}</span>
      </div>

      <div className="cs-curr-head">
        <div className="cs-curr-head-l">
          <h2 className="cs-h2">
            What you&apos;ll learn <em>in two hours.</em>
          </h2>
          <p className="cs-section-sub">{curriculum.sub}</p>
        </div>
        <div className="cs-curr-controls" aria-label="Module carousel controls">
          <button
            type="button"
            onClick={() => scrollToCard(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            aria-label="Previous module"
          >
            ←
          </button>
          <span className="cs-curr-counter">
            {String(activeIdx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => scrollToCard(Math.min(total - 1, activeIdx + 1))}
            disabled={activeIdx === total - 1}
            aria-label="Next module"
          >
            →
          </button>
        </div>
      </div>

      <div className="cs-curr-track" ref={trackRef}>
        {curriculum.modules.map((m, i) => (
          <article className="cs-curr-card" key={i}>
            <div className="cs-curr-card-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.image} alt={`${m.title} — module still`} loading="lazy" />
              <span className="cs-curr-card-no">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="cs-curr-card-body">
              <span className="cs-curr-card-tag">{m.tag}</span>
              <h3 className="cs-curr-card-title">{m.title}</h3>
              <p className="cs-curr-card-text">{m.body}</p>
              <div className="cs-curr-card-foot">
                <span>MODULE {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="cs-curr-dots" aria-hidden>
        {curriculum.modules.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`cs-curr-dot${i === activeIdx ? " is-active" : ""}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to module ${i + 1}`}
          />
        ))}
      </div>

      <div className="cs-curr-cta">
        <button type="button" className="cs-btn" onClick={onRegister}>
          Reserve my free seat <span aria-hidden>→</span>
        </button>
      </div>
    </section>
  );
}
