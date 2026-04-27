import Image from "next/image";
import type { Content } from "@/lib/content";
import { CountUp } from "@/components/CountUp";

export function Community({ community }: { community: Content["community"] }) {
  return (
    <section className="cs-community cs-light" id="about">
      <div className="cs-section-head">
        <span className="cs-section-name">{community.section}</span>
      </div>

      <div className="cs-community-grid">
        <div className="cs-community-text">
          <h2 className="cs-h2 cs-community-title">{community.title}</h2>

          <p className="cs-community-line">
            LevelUp Learning is more than a platform—<em>it&apos;s a community.</em>
          </p>

          <p className="cs-community-mission-q">
            Our <em>mission?</em>
          </p>

          <p className="cs-community-line">
            To make learning <em>simple, affordable, and engaging</em> by working with the finest minds in India to bring their expertise directly to our students.
          </p>
        </div>

        <aside className="cs-community-card" aria-label="Community by the numbers">
          <div className="cs-community-stats">
            {community.stats.map((s, i) => (
              <div key={i} className="cs-community-stat">
                <strong>
                  <CountUp value={s.num} />
                </strong>
                <span>{s.label.toLowerCase()}</span>
              </div>
            ))}
          </div>

          <figure className="cs-community-collage">
            <Image
              src={community.collage}
              alt={community.collageCaption}
              width={1400}
              height={1000}
              sizes="(max-width: 900px) 100vw, 50vw"
              loading="lazy"
            />
          </figure>
        </aside>
      </div>
    </section>
  );
}
