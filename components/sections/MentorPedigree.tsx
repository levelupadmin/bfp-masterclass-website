import Image from "next/image";
import type { Content } from "@/lib/content";

export function MentorPedigree({ pedigree }: { pedigree: Content["pedigree"] }) {
  return (
    <section className="cs-pedigree cs-light" aria-labelledby="pedigree-h">
      <h2 className="cs-h2 cs-pedigree-h" id="pedigree-h">
        {pedigree.title} <em>{pedigree.titleEm}</em>
      </h2>
      <figure className="cs-pedigree-collage">
        <Image
          src={pedigree.collage}
          alt={pedigree.collageAlt}
          width={2000}
          height={1200}
          sizes="(max-width: 900px) 100vw, 90vw"
          priority={false}
        />
      </figure>
    </section>
  );
}
