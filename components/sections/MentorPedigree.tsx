import Image from "next/image";
import type { Content } from "@/lib/content";

export function MentorPedigree({ pedigree }: { pedigree: Content["pedigree"] }) {
  return (
    <section className="cs-pedigree cs-light" aria-labelledby="pedigree-h">
      <div className="cs-section-head">
        <span className="cs-section-name">{pedigree.section}</span>
      </div>
      <h2 className="cs-h2 cs-pedigree-h" id="pedigree-h">
        {pedigree.title} <em>{pedigree.titleEm}</em>
      </h2>
      <figure className="cs-pedigree-collage cs-pedigree-collage--desktop">
        <Image
          src={pedigree.desktopCollage}
          alt={pedigree.collageAlt}
          width={2000}
          height={1300}
          sizes="90vw"
          priority={false}
        />
      </figure>
      <figure className="cs-pedigree-collage cs-pedigree-collage--mobile">
        <Image
          src={pedigree.mobileCollage}
          alt={pedigree.collageAlt}
          width={900}
          height={1100}
          sizes="100vw"
          priority={false}
        />
      </figure>
    </section>
  );
}
