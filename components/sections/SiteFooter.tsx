import Image from "next/image";
import type { Content } from "@/lib/content";

type Props = { footer: Content["footer"]; brand: Content["brand"] };

export function SiteFooter({ footer, brand }: Props) {
  return (
    <footer className="cs-footer">
      <Image src={brand.logoSrc} alt={brand.name} width={120} height={32} />
      <nav aria-label="Footer">
        {footer.links.map((l, i) => (
          <a key={i} href="#">
            {l}
          </a>
        ))}
      </nav>
      <span>{footer.copyright}</span>
    </footer>
  );
}
