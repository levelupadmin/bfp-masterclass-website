import Link from "next/link";

type Variant = {
  id: string;
  name: string;
  subtitle: string;
  display: string;
  serif: string;
  emStyle: "italic" | "normal";
};

const variants: Variant[] = [
  {
    id: "anton-spectral",
    name: "Anton + Spectral",
    subtitle: "Current — baseline for comparison",
    display: 'var(--font-display), "Anton", Impact, sans-serif',
    serif: 'var(--font-serif), "Spectral", Georgia, serif',
    emStyle: "italic",
  },
  {
    id: "bebas-marcellus",
    name: "Bebas Neue + Marcellus",
    subtitle: "Cleaner cinema poster — less aggressive condensed",
    display: 'var(--lab-bebas), Impact, sans-serif',
    serif: "var(--lab-marcellus), Georgia, serif",
    emStyle: "normal",
  },
  {
    id: "oswald-cormorant",
    name: "Oswald + Cormorant Italic",
    subtitle: "Editorial restraint — classic poster pairing",
    display: "var(--lab-oswald), sans-serif",
    serif: "var(--lab-cormorant), Georgia, serif",
    emStyle: "italic",
  },
  {
    id: "teko-yatra",
    name: "Teko + Yatra One",
    subtitle: "Modern Indian display — Tamil/Telugu cinema feel",
    display: "var(--lab-teko), sans-serif",
    serif: "var(--lab-yatra), Georgia, serif",
    emStyle: "normal",
  },
  {
    id: "rozha-cormorant",
    name: "Rozha One + Cormorant Italic",
    subtitle: "Devanagari heritage — regal, very Indian",
    display: "var(--lab-rozha), Georgia, serif",
    serif: "var(--lab-cormorant), Georgia, serif",
    emStyle: "italic",
  },
  {
    id: "yatra-marcellus",
    name: "Yatra One + Marcellus",
    subtitle: "Vintage Bollywood billboard — pulpy poster vibe",
    display: "var(--lab-yatra), Georgia, serif",
    serif: "var(--lab-marcellus), Georgia, serif",
    emStyle: "normal",
  },
  {
    id: "bigshoulders-playfair",
    name: "Big Shoulders + Playfair Italic",
    subtitle: "Editorial with character — newsroom-meets-cinema",
    display: "var(--lab-bigshoulders), sans-serif",
    serif: "var(--lab-playfair), Georgia, serif",
    emStyle: "italic",
  },
  {
    id: "anton-marcellus",
    name: "Anton + Marcellus",
    subtitle: "Same display as current, regal upright italic accent",
    display: 'var(--font-display), "Anton", Impact, sans-serif',
    serif: "var(--lab-marcellus), Georgia, serif",
    emStyle: "normal",
  },
];

export default function FontLab() {
  return (
    <main className="lab-root">
      <header className="lab-topbar">
        <div className="lab-topbar-l">
          <span className="lab-stamp">FONT LAB</span>
          <span className="lab-meta">BFP Masterclass · Heading type experiments</span>
        </div>
        <Link href="/" className="lab-back">
          ← Back to live site
        </Link>
      </header>

      <section className="lab-intro">
        <h1 className="lab-intro-h">Heading type experiments.</h1>
        <p className="lab-intro-p">
          Same colour, layout, monospace metadata. Only the display heading and the italic accent change.
          Tell me which numbered pairing feels right and I&apos;ll wire it into the live site.
        </p>
      </section>

      <div className="lab-grid">
        {variants.map((v, i) => (
          <article key={v.id} className="lab-variant" data-variant={v.id}>
            <div className="lab-variant-meta">
              <span className="lab-variant-no">{String(i + 1).padStart(2, "0")}</span>
              <strong className="lab-variant-name">{v.name}</strong>
              <span className="lab-variant-sub">{v.subtitle}</span>
            </div>
            <div
              className="lab-sample"
              style={
                {
                  "--lab-display": v.display,
                  "--lab-serif": v.serif,
                  "--lab-em-style": v.emStyle,
                } as React.CSSProperties
              }
            >
              <span className="lab-eyebrow">— A LEVEL UP LEARNING FEATURE —</span>
              <h2 className="lab-h1">
                <span>How to start your</span>
                <span>filmmaking career</span>
                <span>
                  in <em>2026.</em>
                </span>
              </h2>
              <div className="lab-section">
                <span className="lab-section-no">01</span>
                <span className="lab-section-name">THE PATTERN</span>
              </div>
              <h3 className="lab-h2">
                100 people say <em>&ldquo;I want to make a film.&rdquo;</em>
                <br />
                Only <em>1</em> actually does.
              </h3>
              <div className="lab-pull">1 / 100</div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
