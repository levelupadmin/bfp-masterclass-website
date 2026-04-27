// One-off script: generate the 5 curriculum module images via OpenAI's
// gpt-image-1 endpoint and save to public/assets/curriculum/mod-N.jpg.
//
// Usage:
//   node scripts/gen-curriculum-images.mjs                # all 5
//   node scripts/gen-curriculum-images.mjs mod-1 mod-2    # subset
//
// Reads OPENAI_API_KEY from .env.local. Never commit the key.

import fs from "node:fs/promises";
import path from "node:path";

// load .env.local manually (no dotenv dependency)
async function loadEnv() {
  try {
    const txt = await fs.readFile(".env.local", "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) process.env[m[1]] = m[2];
    }
  } catch {}
}

// Each prompt embeds the full module BODY (not just the title) so the
// generated image actually reflects what the module teaches. Brand:
// cinematic Indian filmmaking, sepia-warmed amber palette, 35mm grain,
// portrait orientation, no readable text, no logos.
const PROMPTS = [
  {
    file: "mod-1.jpg",
    tag: "Landscape",
    prompt:
      "Cinematic conceptual still about the new Indian filmmaking landscape — the rise of OTT streaming, regional content and the creator economy. A dark cinematic interior with a wall of glowing rectangular screens floating in space, each screen displaying a different streaming platform interface: one screen prominently shows the Netflix logo with a film grid below it, one shows the Amazon Prime Video logo with a film grid, one shows the Disney+ Hotstar logo with a film grid, one shows a vertical short-form Reels-style interface with stacked content tiles, one shows a regional Indian film poster. Each screen spills warm amber and gold light into the otherwise empty room. Atmospheric haze, deep contrast, anamorphic film aesthetic, 35mm grain, sepia-warmed colour grade. Strictly NO PEOPLE, NO HUMAN FIGURES, NO SILHOUETTES anywhere in the frame — only the glowing screens and the light they cast. Portrait orientation. No extra unrelated text on the screens.",
  },
  {
    file: "mod-2.jpg",
    tag: "Pathways",
    prompt:
      "Cinematic conceptual still about the five entry routes into the Indian filmmaking industry: a softly lit warm hallway with five tall narrow doorways in a row, each door open and revealing a different filmmaking craft inside — door one a writer's desk with a typewriter, open script pages and a fountain pen, door two an empty director's chair with a wooden clapperboard and a pair of headphones beside it, door three a cinema camera mounted on a tripod with a soft lens flare, door four a glowing editing monitor with a film timeline strip visible on screen, door five a sound mixing console with a hanging boom microphone above it. Each doorway emits its own warm amber and gold light into the hallway, dramatic chiaroscuro, 35mm film grain, sepia-warmed colour grade, evokes the multiple craft paths into filmmaking. Strictly NO PEOPLE, NO HUMAN FIGURES, NO SILHOUETTES anywhere in the frame — only the doorways and the gear inside each one. Portrait orientation. No text, no logos.",
  },
  {
    file: "mod-3.jpg",
    tag: "Workflow",
    prompt:
      "Cinematic conceptual still about the methodical pre-production workflow that turns an idea into a real short film: top-down flat-lay view of a wooden production desk lit by a single warm lamp, neatly arranged with a printed shot list on graph paper, a storyboard sheet with six hand-drawn film frames, a one-page production schedule grid, a printed budget sheet with handwritten rupee figures in the margins, a small wooden clapperboard, a fountain pen, a small stack of polaroid stills used as references, a brass mug of chai, atmospheric warm light, deep shadows around the edges, 35mm film grain, sepia-warmed colour grade, evokes the seven pre-production documents and the disciplined planning behind a short film, portrait orientation, no readable text, no logos.",
  },
  {
    file: "mod-4.jpg",
    tag: "Craft",
    prompt:
      "Cinematic conceptual still about the five craft layers — writing, directing, cinematography, editing, sound — that go into a single great scene. A dark empty cinema interior with rows of empty velvet seats in the foreground and a large glowing film projection screen at the centre. On the film screen, a single epic dramatic frame from a sweeping Indian period-action blockbuster is playing: a heroic warrior figure silhouetted against a golden sunset on top of a high cliff, an ornate ancient Indian temple with sandstone carvings rising in the misty distance, a massive waterfall pouring down, dramatic stormy clouds in the sky, deep amber and teal cinematic colour grade on the on-screen image. Surrounding the projection screen, five translucent floating layers radiate outward showing the five crafts of cinema: one with a script page and marked dialogue, one with a director's blocking diagram with arrows, one with camera lens markings and angle indicators, one with an editing timeline strip, one with an audio waveform. Warm amber bounce light from the screen lights the empty cinema seats and dust motes in the air. Deep moody shadows, 35mm film grain, sepia-warmed colour grade. Strictly NO PEOPLE in the cinema seats, NO PEOPLE in the foreground or audience — the warrior on the projection screen is the only figure and is part of the projected film image, far in the background. Portrait orientation. No extra unrelated text on the layers, no logos.",
  },
  {
    file: "mod-5.jpg",
    tag: "Plan",
    prompt:
      "Cinematic conceptual still about a clear week-by-week thirty-day action plan from idea to first day of shoot: a wall in a young Indian filmmaker's room covered in a hand-built thirty-day plan — a four-column grid of sticky notes labelled week one, week two, week three, week four, each column has handwritten index cards with milestones, polaroid stills and storyboard cards pinned alongside, a length of red thread runs across the columns connecting them like a roadmap, a warm desk lamp lights the wall from one corner casting long shadows, atmospheric warm haze, 35mm film grain, sepia-warmed colour grade, evokes momentum and a structured action map from 'I want to make a film' to 'I am making a film', portrait orientation, no readable text, no logos.",
  },
];

async function generate(prompt) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      n: 1,
      size: "1024x1536",
      quality: "medium",
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI ${res.status}: ${errText.slice(0, 400)}`);
  }
  const data = await res.json();
  const b64 = data?.data?.[0]?.b64_json;
  if (!b64) throw new Error("No b64_json in response: " + JSON.stringify(data).slice(0, 300));
  return Buffer.from(b64, "base64");
}

async function main() {
  await loadEnv();
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY missing. Add it to .env.local");
    process.exit(1);
  }
  const outDir = path.join("public", "assets", "curriculum");
  await fs.mkdir(outDir, { recursive: true });

  // optional filter: pass `mod-1 mod-2` etc. to only regenerate those
  const argv = process.argv.slice(2).map((a) => a.replace(/\.jpg$/, ""));
  const filter = new Set(argv);
  const todo = filter.size
    ? PROMPTS.filter((p) => filter.has(p.file.replace(/\.jpg$/, "")))
    : PROMPTS;
  if (filter.size && todo.length === 0) {
    console.error("No matching modules. Available:", PROMPTS.map((p) => p.file.replace(/\.jpg$/, "")).join(", "));
    process.exit(1);
  }

  for (const item of todo) {
    const dest = path.join(outDir, item.file);
    process.stdout.write(`[${item.tag}] generating ${item.file}... `);
    try {
      const buf = await generate(item.prompt);
      await fs.writeFile(dest, buf);
      const stat = await fs.stat(dest);
      console.log(`done · ${(stat.size / 1024).toFixed(0)} KB`);
    } catch (err) {
      console.log("FAILED");
      console.error(err.message);
      process.exit(1);
    }
  }
  console.log(`${todo.length} of ${PROMPTS.length} module images written to`, outDir);
}

main();
