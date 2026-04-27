# Editing the BFP Masterclass site

All copy on https://bfp.leveluplearning.in lives in **one file**:

> `lib/content.ts`

To change a word, a number, a date, or a list — open that file, edit the string, save, and push. Vercel auto-deploys.

You almost never need to touch any other file. Images, layout, and styling are separate; copy is here.

---

## How to edit

### Option A — local editor (Cursor / VS Code)

```bash
cd "Downloads/BFP Masterclass"
code .                        # or `cursor .`
```

Open `lib/content.ts`, change the string between the quotes, save the file. To preview locally:

```bash
npm run dev
# open http://localhost:3000
```

To publish:

```bash
git add lib/content.ts
git commit -m "copy: update masterclass time"
git push
```

(See the **"Where does the code live?"** section below for git setup.)

### Option B — quick cloud edit via Vercel dashboard

1. Go to your project on https://vercel.com/level-up4/bfp-masterclass
2. Click **"Source"** → **"Open in editor"** (or open the linked GitHub repo if connected)
3. Edit `lib/content.ts` in the browser
4. Commit → Vercel auto-deploys in ~30s

### Option C — tell me

Send me the change in chat. I'll edit and redeploy.

---

## Section → field map

When you open `lib/content.ts`, scroll to find the section. Here's where each piece of the page comes from:

| On the page | In `lib/content.ts` |
|---|---|
| Header logo + brand name | `brand.name`, `brand.logoSrc` |
| Hero eyebrow `— A 2-HOUR MASTERCLASS —` | `hero.eyebrow` |
| Hero big title `How to start your filmmaking career in 2026.` | `hero.title` (this is the SSR version; the on-page H1 also uses split spans for the fade animation — change [components/sections/HeroCinematic.tsx](components/sections/HeroCinematic.tsx) if you reword it) |
| Hero sub paragraph | `hero.sub` |
| Hero `ENROLL NOW` button | `hero.cta` |
| Header `RESERVE SEAT` button | `hero.headerCta` |
| Hero note under the CTA | `hero.note` |
| Infinity scroll text | `hero.ticker` |
| Date / Time / Where / Bonus cards under the hero | `session.metrics[]` |
| `Learn from a mentor who has worked with…` heading | `pedigree.title` + `pedigree.titleEm` |
| Pedigree collage image | `pedigree.collage` (path inside `/public/assets/`) |
| `100 people say "I want to make a film."` section | `pattern.bullets[]` + `pattern.closer` |
| `What you'll learn in two hours.` modules | `curriculum.modules[]` (5 entries — `tag`, `title`, `body`, `image`) |
| Mentor portrait + bio | `mentor.portrait`, `mentor.role`, `mentor.paras[]` |
| `Is this masterclass for you?` items | `audience.items[]` |
| `NOT FOR YOU` body copy | `audience.notFor` |
| `India's Largest Filmmaking Community` heading | `community.title` |
| Community body / mission copy | `community.body` (currently rendered as JSX in [components/sections/Community.tsx](components/sections/Community.tsx) — see note below) |
| 3,00,000+ / 60,000+ stats | `community.stats[]` |
| Testimonial quotes | `testimonials.quotes[]` |
| Bonus stack countdown values + items | `bonus.countdown`, `bonus.items[]` |
| FAQ questions + answers | `faq.items[]` |
| Final "1 will register." pitch | `finale.body[]` |
| Footer links | `footer.links[]` |
| **Masterclass start date/time** (drives countdown) | `REGISTRATION_DEADLINE` constant at the very bottom |
| **CTA destination** (LevelUp checkout URL) | `CHECKOUT_URL` in [app/page.tsx](app/page.tsx) |

> **Note on the Community body:** the mission copy is broken into 3 visual lines with amber emphasis on `it's a community.`, `mission?`, and `simple, affordable, and engaging`. That's hardcoded in [components/sections/Community.tsx](components/sections/Community.tsx) so the styling stays — `community.body` in content.ts is a simpler one-paragraph version kept for future use. If you want to change that copy, edit the JSX in `Community.tsx`.

---

## Editing checklist (any change)

1. Edit the string in `lib/content.ts`
2. Save the file
3. Run `npm run dev` and visit http://localhost:3000 to preview (optional)
4. `git add . && git commit -m "your message" && git push` (or commit via Vercel/GitHub UI)
5. Wait ~30s for Vercel to redeploy. Check https://bfp.leveluplearning.in

If something's wrong after deploy, the Vercel dashboard has a "Promote" button on every previous deployment — click it and the old version is back live in seconds.

---

## What lives outside content.ts

Things you typically don't change but might need to know about:

| What | Where |
|---|---|
| Hero background image | `public/assets/hero-bg.jpg` (replace the file, keep the name) |
| Curriculum module images | `public/assets/curriculum/mod-1.jpg`…`mod-5.jpg` |
| Director collage in pedigree | `public/assets/filmmakers-collage.png` |
| Mentor portrait | `public/assets/rahul-portrait.png` |
| Logo | `public/assets/levelup-logo.png` |
| Meta Pixel ID, Clarity ID, Checkout URL | Vercel **Project Settings → Environment Variables** |
| Layout, fonts, colours | `app/globals.css` |
| Section components | `components/sections/*.tsx` |

---

## Where does the code live?

Right now: **only on this Mac**, under `~/Downloads/BFP Masterclass/`. Vercel pulls it directly via the CLI when you (or I) run `vercel --prod`.

This means:
- ✅ The live site at `bfp.leveluplearning.in` is fine.
- ⚠️ But there's no remote backup. If this Mac dies, the source code dies with it.

**Recommended: connect a GitHub repo so the code is backed up + Vercel auto-deploys on every push.**

### Option 1 — set up GitHub now (10 minutes)

```bash
# in the project folder
cd "Downloads/BFP Masterclass"

# create a git repo locally
git init
git add .
git commit -m "initial commit"

# create a private GitHub repo via the gh CLI
gh repo create levelup-learning/bfp-masterclass --private --source=. --remote=origin --push

# (or do it via github.com UI, then:)
# git remote add origin https://github.com/<you>/bfp-masterclass.git
# git push -u origin main

# link the GitHub repo to Vercel
# go to https://vercel.com/level-up4/bfp-masterclass/settings/git
# click "Connect Git Repository" → pick your GitHub repo
```

After that, **every `git push` triggers a Vercel deploy automatically**. No CLI deploy needed.

### Option 2 — keep deploying via CLI (the current setup)

You can keep doing what we're doing now — every change triggers a manual `vercel --prod --scope level-up4` from this Mac. It works, but you're one disk failure away from losing the source.

I strongly recommend Option 1. Tell me when you want to do it and I'll walk you through it.

---

## Cheat sheet — the 5 most common edits

```ts
// 1. Change the masterclass time
session.metrics[1].primary = "11:00 AM – 1:00 PM IST";

// 2. Change the date
session.metrics[0].primary = "Sun, 03 May 2026";
// + update the countdown:
REGISTRATION_DEADLINE = new Date("2026-05-03T05:30:00.000Z");
// (in UTC — IST is UTC+5:30, so 11 AM IST = 5:30 AM UTC)

// 3. Change the checkout URL
// → edit CHECKOUT_URL in app/page.tsx (or set NEXT_PUBLIC_CHECKOUT_URL in Vercel env)

// 4. Change a curriculum module title or body
curriculum.modules[0].title = "The New Filmmaking Landscape";
curriculum.modules[0].body  = "...";

// 5. Change a testimonial
testimonials.quotes[0] = { text: "...", name: "...", role: "..." };
```
