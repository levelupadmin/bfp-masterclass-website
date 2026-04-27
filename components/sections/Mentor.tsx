import Image from "next/image";
import type { Content } from "@/lib/content";

export function Mentor({ mentor }: { mentor: Content["mentor"] }) {
  return (
    <section className="cs-mentor" id="mentor">
      <div className="cs-section-head">
        <span className="cs-section-name">{mentor.section}</span>
      </div>
      <div className="cs-mentor-grid">
        <figure className="cs-portrait">
          <Image
            src={mentor.portrait}
            alt="Rahul Srinivas, founder of LevelUp Learning"
            width={800}
            height={1000}
            sizes="(max-width: 900px) 100vw, 40vw"
            priority={false}
          />
        </figure>
        <div className="cs-mentor-body">
          <h2 className="cs-h2">
            Meet <em>Rahul Srinivas.</em>
          </h2>
          <p className="cs-mentor-role">{mentor.role}</p>
          {mentor.paras.map((p, i) => (
            <p key={i} className="cs-mentor-p">
              {p}
            </p>
          ))}

          <div className="cs-mentor-brands" aria-label={mentor.brandsLabel}>
            <span className="cs-mentor-brands-label">{mentor.brandsLabel}</span>
            <ul className="cs-mentor-brands-list">
              {mentor.brands.map((b) => (
                <li key={b.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.src} alt={b.name} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
