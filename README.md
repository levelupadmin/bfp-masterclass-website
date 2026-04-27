# BFP Masterclass — landing page

Live site: **https://bfp.leveluplearning.in**

Marketing landing page for the LevelUp Learning *Become a Filmmaker Program* — a free 2-hour live masterclass with Rahul Srinivas. Built with Next.js 14 (App Router), TypeScript, Tailwind, and a single content-source approach.

---

## Editing copy (the 90% case)

**All page copy lives in [`lib/content.ts`](lib/content.ts).** Open it, change the string, save, push. See [EDITING.md](EDITING.md) for a section-by-section field map and a 5-most-common-edits cheat sheet.

---

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

To preview a production build locally:

```bash
npm run build
npm start
```

---

## Deploying

Pushes to `main` auto-deploy via Vercel — there is **no manual deploy step**. The Vercel project is `level-up4/bfp-masterclass`, linked to this repository's `main` branch.

To roll back: open the [Vercel deployments page](https://vercel.com/level-up4/bfp-masterclass/deployments) and click "Promote to Production" on any earlier successful deployment.

---

## Project layout

```
app/
  layout.tsx              # fonts, metadata, JSON-LD event schema, Analytics mount
  page.tsx                # composes all sections; defines the CHECKOUT_URL and onRegister handler
  globals.css             # all section styling (cs-* prefix)
  fonts/                  # Aileron + Spectral local font files
  api/register/route.ts   # legacy registration endpoint (currently unused; CTAs go to checkout URL)
  font-lab/               # internal type-experiment route at /font-lab — safe to ignore
components/
  Analytics.tsx           # Meta Pixel + Microsoft Clarity loader (env-controlled)
  CountUp.tsx             # animated stat numbers (community section)
  RegistrationModal.tsx   # legacy modal (currently unused; kept in case CTAs revert)
  sections/               # one file per page section
lib/
  content.ts              # ALL copy + REGISTRATION_DEADLINE constant
  track.ts                # fbq + clarity tracking helpers
public/
  assets/                 # all imagery (hero, curriculum, mentor, brands, etc.)
scripts/
  gen-curriculum-images.mjs  # one-off OpenAI image-gen for module thumbnails
  gen-mentor-photos.mjs      # one-off OpenAI image-gen for mentor pedigree photos
prototype/                 # original wireframe HTML — gitignored, not part of the build
```

---

## Environment variables

Set on Vercel (**Project Settings → Environment Variables**, scoped to *Production* + *Preview*):

| Var | Purpose | Required? |
|---|---|---|
| `NEXT_PUBLIC_HERO_BG_URL` | Override hero background image (default `/assets/hero-bg.jpg`) | No |
| `NEXT_PUBLIC_CHECKOUT_URL` | Override the LevelUp checkout URL all CTAs go to | No |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID — pixel only loads if set | Yes for ads |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID — Clarity only loads if set | Optional |

Local `.env.local` is gitignored. Add any of the above there if you want to preview ads tracking locally.

---

## Imagery

| Asset | Path | How to replace |
|---|---|---|
| Hero background | `public/assets/hero-bg.jpg` | Replace the file with the same name |
| Curriculum module stills (5) | `public/assets/curriculum/mod-1.jpg`…`mod-5.jpg` | Replace files; or regen via `node scripts/gen-curriculum-images.mjs` (needs OPENAI_API_KEY in `.env.local`) |
| Mentor portrait | `public/assets/rahul-portrait.png` | Replace the file |
| Filmmakers collage | `public/assets/filmmakers-collage.png` | Replace the file (used in pedigree section) |
| Brand logos | `public/assets/brands/{tedx,canon,tata}.svg` | Replace files; add new logos by editing `mentor.brands` in `lib/content.ts` |

---

## Adding a section / changing layout

Each section is its own file in `components/sections/`. To add a new one:

1. Create `components/sections/MyNewSection.tsx` exporting a default-exported component.
2. Import it in [`app/page.tsx`](app/page.tsx) and place it in the section flow.
3. Add styles to `app/globals.css` under a unique class prefix (e.g. `.cs-mynew-…`).
4. Add any copy/data fields to `lib/content.ts` and the `Content` type at the top of that file.

---

## Tech notes

- **Fonts**: Aileron (local, body + display) + Spectral (Google, italic accent in hero) + JetBrains Mono (Google, mono labels). Loaded via `next/font` for zero FOUT.
- **Routing**: App Router, no client-side router needed; everything renders as one long page.
- **Tracking**: PageView fires automatically on Pixel init; `InitiateCheckout` fires on every CTA click before navigating to checkout.
- **Build size**: ~15.5 kB page, ~103 kB first-load JS, ~80 deployment files.

---

## Need to talk to a human?

The site was built collaboratively in conversation. For deeper changes (new components, redesigns, integrations), open an issue or talk to the maintainer. For copy changes, EDITING.md has everything you need.
