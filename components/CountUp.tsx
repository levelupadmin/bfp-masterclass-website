"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
  durationMs?: number;
};

/**
 * Counts up from 0 to the parsed numeric portion of `value` when the
 * element first scrolls into view. Preserves the prefix, the comma
 * separator style (US or Indian), and any trailing suffix like "+".
 *
 *   "3,00,000+" -> Indian formatting, animates 0 -> 300000, suffix "+"
 *   "60,000+"   -> US formatting,     animates 0 -> 60000,  suffix "+"
 *
 * SSR renders the final formatted value, so search engines and
 * non-JS users see the real number.
 */
export function CountUp({ value, durationMs = 1800 }: Props) {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const match = value.match(/^(\D*)([\d,]+)(\D*)$/);
    if (!match) return;
    const [, prefix, digitsRaw, suffix] = match;
    const target = Number.parseInt(digitsRaw.replace(/,/g, ""), 10);
    if (!Number.isFinite(target)) return;

    const useIndian = /^\d{1,2}(,\d{2})+,\d{3}$/.test(digitsRaw);
    const formatter = useIndian
      ? new Intl.NumberFormat("en-IN")
      : new Intl.NumberFormat("en-US");
    const format = (n: number) => `${prefix}${formatter.format(n)}${suffix}`;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          const cur = Math.round(eased * target);
          setDisplay(format(cur));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, durationMs]);

  return <span ref={elRef}>{display}</span>;
}
