# BFP Masterclass — Claude Code Build Document

A complete brief for taking this HTML prototype and turning it into a production-ready website using Claude Code. Hand this entire document to Claude Code as your first message in a fresh session.

---

## 1. What you're building

A high-conversion landing page for a **free 2-hour live filmmaking masterclass** ("BFP — Become a Filmmaker Program") hosted by Rahul Srinivas, founder of Level Up Learning, India's largest filmmaking community.

**Audience:** serious aspiring filmmakers in India (and globally). Treat them as future professionals, not hobbyists.

**Goal of the page:** the visitor registers for the free masterclass.

**Aesthetic direction:** cinematic dark. Film-still imagery. Editorial type. No SaaS gradients, no emoji, no rounded-corner-with-a-left-border-accent containers.

---

## 2. What's in this prototype folder

```
BFP Masterclass - Wireframes.html   ← entry point (open in browser)
content.jsx                          ← single source of truth for ALL copy
wireframe-callsheet.jsx              ← Direction 1: "Call Sheet" — the chosen direction
wireframe-marquee.jsx                ← Direction 2: "Marquee" — exploration only
wireframe-cahiers.jsx                ← Direction 3: "Cahiers" — exploration only
tweaks-panel.jsx                     ← in-page variant switcher (do NOT port)
styles-base.css                      ← Call Sheet styles + global tokens
styles-hero-cine.css                 ← Cinematic hero (video + grain + vignette)
styles-marquee.css                   ← Marquee variant (do NOT port)
styles-cahiers.css                   ← Cahiers variant (do NOT port)
assets/
  levelup-logo.png
  rahul-portrait.png
  filmmakers-collage.png
```

**The chosen direction is "Call Sheet" with the cinematic hero.** Marquee and Cahiers were exploration. Do not port them.

---

## 3. Recommended stack

- **Next.js 14+ (App Router)**
- **TypeScript**
- **Tailwind CSS** for utilities; raw CSS for the hero grain/vignette SVG noise
- **next/image** for image optimization
- **next/font** for Anton, Spectral, JetBrains Mono, Inter (currently loaded via Google Fonts CDN)
- **Vercel** for hosting
- **Cloudflare Stream / Mux / S3+CloudFront** for the hero video (do NOT serve a 12 MB MP4 from `public/`)

---

## 4. The prompt to paste into Claude Code

> Open this in a new Claude Code session at the root of an empty directory. The prototype folder lives at `./prototype/`.

```
I have a design prototype at ./prototype/. The entry point is
"prototype/BFP Masterclass - Wireframes.html". The target design we are
shipping is the "Call Sheet" wireframe (default tab) with its cinematic
hero (styles-hero-cine.css). Ignore wireframes 2 and 3, the tweaks panel,
and the app-shell tab switcher.

Please do the following, in order. Stop after each step, show me what
you built, and wait for my approval before moving on.

STEP 1 — Scaffold
  - Initialise Next.js 14 with App Router, TypeScript, and Tailwind:
    npx create-next-app@latest . --typescript --tailwind --app --eslint
  - Install lucide-react for icons.
  - Set up Prettier + a basic .editorconfig.

STEP 2 — Content layer
  - Convert prototype/content.jsx into a typed module at lib/content.ts.
  - Keep field names IDENTICAL (hero, pattern, curriculum, mentor,
    audience, community, testimonials, details, bonus, faq, finale,
    footer, brand). This is the single source of truth for copy.
  - Export type Content and a const content: Content.

STEP 3 — Tokens & fonts
  - In app/layout.tsx use next/font to load:
      Anton (display), Spectral (serif), JetBrains Mono (mono),
      Inter (sans). Weights: 400 for display/serif, 400/500/700 for
      mono and sans.
  - Map the tokens from prototype/styles-base.css :root and
    [data-theme="light"] into Tailwind theme.extend.colors and
    fontFamily in tailwind.config.ts.
  - Default theme is dark. No theme toggle in production.

STEP 4 — Components
  Split into atomic components in components/sections/. Each takes its
  slice of `content` as a prop.
    - HeroCinematic.tsx   — video bg, grain, vignette, slate strip,
                            title card, session sheet, timecode footer,
                            ticker
    - Pattern.tsx
    - Curriculum.tsx
    - Mentor.tsx
    - Audience.tsx
    - Community.tsx
    - Testimonials.tsx
    - Details.tsx
    - BonusStack.tsx       — countdown timer logic must be real
                              (use a target date prop)
    - FAQ.tsx              — native <details>/<summary>, animated
    - Finale.tsx
    - SiteHeader.tsx       — the "CALL SHEET" topbar
    - SiteFooter.tsx

STEP 5 — Hero video
  - Read NEXT_PUBLIC_HERO_VIDEO_URL and NEXT_PUBLIC_HERO_POSTER_URL
    from env. Fallback to the Pexels URLs in the prototype.
  - <video autoPlay muted loop playsInline preload="metadata">.
  - Add a <source media="(max-width: 800px)"> for a portrait crop URL
    (NEXT_PUBLIC_HERO_VIDEO_MOBILE_URL).
  - Apply the same grayscale/contrast/brightness filter as the
    prototype.

STEP 6 — Registration
  - The "Reserve My Free Seat" CTA opens a modal with a form:
    name, email, phone (with country code dropdown).
  - Form posts to app/api/register/route.ts.
  - The Route Handler validates with Zod and:
      • Logs the submission (TODO: integrate with the real CRM)
      • Returns 200 { ok: true }
  - On success the modal switches to a confirmation state with the
    Zoom join instructions and a "Add to calendar" .ics download.
  - Leave a clearly marked TODO block for me to wire the real CRM
    (we'll likely use Resend + a Google Sheet or ConvertKit).

STEP 7 — SEO + sharing
  - Title: "BFP Masterclass — Start your filmmaking career in 2026"
  - Description: pull from content.hero.sub
  - og:image: a static export of the hero poster (1200×630)
  - twitter:card = summary_large_image
  - Add JSON-LD Event schema with date, location (Online), organiser
    (Level Up Learning).
  - robots: index, follow. Add a sitemap.ts and robots.ts.

STEP 8 — Performance
  - Convert all PNGs in prototype/assets to WebP via next/image.
  - loading="lazy" on everything below the fold.
  - Preconnect to the video CDN.
  - Lighthouse target: Performance 90+, Accessibility 95+,
    Best Practices 100, SEO 100 on mobile.

STEP 9 — Analytics + pixels
  - Wire Plausible (or whatever I tell you) in app/layout.tsx.
  - Add the Meta Pixel + Google Ads conversion pixel as separate
    components I can toggle from env.
  - Track events: hero_cta_click, register_submit_attempt,
    register_submit_success, faq_open, scroll_75.

STEP 10 — Tests + polish
  - Vitest + Testing Library for the registration form validation.
  - Playwright smoke test: page loads, hero video element present,
    CTA opens modal, form submits, success state renders.
  - Run npm run build, fix any type errors, then npm run dev and
    confirm the page renders identically to the prototype.

DO NOT:
  - Port the tweaks panel
  - Port the app-shell tab switcher
  - Port wireframe-marquee or wireframe-cahiers
  - Add new sections without asking me first
  - Invent placeholder copy — every word lives in lib/content.ts

When in doubt, match the prototype pixel-for-pixel. The breakpoint
where the hero collapses to mobile portrait is 800px.
```

---

## 5. Replacing the hero video

Open `lib/content.ts` (or `.env.local`) and set `NEXT_PUBLIC_HERO_VIDEO_URL` to your own MP4. Specs:

- **Format:** MP4 (H.264 + AAC)
- **Desktop:** 1920×1080 minimum, 2560×1440 ideal, ~10 MB max
- **Mobile (portrait):** 1080×1920, ~5 MB max
- **Length:** 8–20s, seamless loop
- **No audio** (it's muted anyway — strip it to save bytes)
- **Poster JPG:** ~200 KB still frame from the video

Host the video on a CDN. Cloudflare Stream or Mux is easiest for adaptive streaming. If you only have an MP4, S3 + CloudFront is fine.

---

## 6. Decisions you need to make BEFORE you start the Claude Code session

| Decision | Options | Default |
|---|---|---|
| **Form provider** | Resend + Google Sheet, ConvertKit, Mailchimp, Tally, custom | Resend + Google Sheet |
| **Calendar invite** | .ics download, Google Calendar link, both | Both |
| **WhatsApp confirmation** | Yes (manual link), No | Yes |
| **Analytics** | Plausible, GA4, PostHog | Plausible |
| **Pixels** | Meta only, Meta + Google Ads, none | Meta + Google Ads |
| **Hosting** | Vercel, Cloudflare Pages, Netlify | Vercel |
| **Video CDN** | Cloudflare Stream, Mux, S3+CloudFront | Cloudflare Stream |

Tell Claude Code these on Step 1 so it doesn't have to ask.

---

## 7. Pre-launch checklist

Things you still need to source — Claude Code can't do these:

- [ ] Real hero video (desktop + mobile portrait)
- [ ] Real testimonial photos (4+, headshots)
- [ ] Real on-set production stills (for the curriculum module thumbnails, if you add them later)
- [ ] Final copy review — pass the strings in `lib/content.ts` to Rahul or your copywriter
- [ ] Privacy policy + Terms pages (the footer links are currently dead)
- [ ] Refund/Cancellation policy (it's a free event, but legal requires the page anyway)
- [ ] Real Zoom link — do NOT paste it on the page; it goes in the post-registration email only
- [ ] Pixel IDs (Meta, Google Ads)
- [ ] Domain + DNS pointed at Vercel
- [ ] An OG image for social sharing (1200×630 still from the hero)

---

## 8. After launch — what to track

Set up these dashboards in Plausible (or your analytics tool):

1. **Landing → CTA click rate** (target: 25%+)
2. **CTA click → form submit rate** (target: 60%+)
3. **Submit → live attendance rate** (track via webinar tool, target: 35%+)
4. **Source breakdown** — Meta, Google, organic, direct
5. **Drop-off scroll depth** — where do people leave?

If CTA click rate is below 15%, the hero isn't working. If submit rate is below 40%, the form is too long or asking for too much.

---

## 9. Editing copy after launch

All copy lives in `lib/content.ts`. Edit the strings there, push to Git, Vercel auto-deploys. Don't let anyone edit copy in the JSX files — it'll get overwritten the next time you regenerate components.

---

## 10. If something breaks

Common issues and their fixes:

- **Hero video doesn't play on iOS Safari:** ensure `playsInline muted` are both on the `<video>` tag. iOS won't autoplay without both.
- **Grain animation kills mobile battery:** wrap the `@keyframes cs-grain-shift` rule in `@media (prefers-reduced-motion: no-preference)`.
- **Anton font doesn't load:** check next/font config; weight must be 400.
- **Layout shift on hero load:** add `aspect-ratio: 16/9` to the video wrapper so it reserves space before the metadata loads.

---

That's everything. Open Claude Code, paste the prompt from Section 4, follow the steps. You should have a deployable site in 2–4 hours.
