"use client";

import Image from "next/image";
import type { Content } from "@/lib/content";

type Props = {
  brand: Content["brand"];
  cta: string;
  onRegister: () => void;
};

export function SiteHeader({ brand, cta, onRegister }: Props) {
  return (
    <header className="cs-topbar">
      <a className="cs-topbar-logo" href="#" aria-label={brand.name}>
        <Image src={brand.logoSrc} alt={brand.name} width={140} height={32} priority />
      </a>
      <button type="button" className="cs-btn cs-btn-sm" onClick={onRegister}>
        {cta} <span aria-hidden>→</span>
      </button>
    </header>
  );
}
