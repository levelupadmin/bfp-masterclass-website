// One-off script: generate the 5 mentor-pedigree placeholder photos via
// OpenAI's gpt-image-1 endpoint and save to public/assets/mentors/.
//
// These are PLACEHOLDERS only — replace with real on-set photography of
// Rahul Srinivas working alongside the named directors before launch.
//
// Usage:
//   node scripts/gen-mentor-photos.mjs            # all 5
//   node scripts/gen-mentor-photos.mjs mod-1 mod-3
//
// Reads OPENAI_API_KEY from .env.local.

import fs from "node:fs/promises";
import path from "node:path";

async function loadEnv() {
  try {
    const txt = await fs.readFile(".env.local", "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m) process.env[m[1]] = m[2];
    }
  } catch {}
}

const PROMPTS = [
  {
    file: "mod-1.jpg",
    tag: "Lokesh / Action set",
    prompt:
      "Cinematic behind-the-scenes still: two Indian filmmakers in their thirties standing on the set of an action film at dusk, both leaning over a small monitor on a c-stand reviewing a take, one holding a notebook with handwritten shot notes, professional film crew working in the warm bokeh background, large studio lights and a cinema camera on a tripod visible nearby, atmospheric haze, deep amber and gold cinematic colour grade, 35mm film grain, looks like a candid making-of photograph, portrait orientation, no readable text or signage, no logos.",
  },
  {
    file: "mod-2.jpg",
    tag: "Karthik / Camera",
    prompt:
      "Cinematic behind-the-scenes still: two Indian filmmakers in their thirties standing close together on a film set looking through the viewfinder of a vintage cinema camera, one operating the camera with hand on the focus ring, the other crouched beside watching the framing, soft warm key light from a window outside the frame, dust motes floating in the air, deep moody shadows around the edges, 35mm film grain, sepia-warmed cinematic colour grade, portrait orientation, no readable text, no logos.",
  },
  {
    file: "mod-3.jpg",
    tag: "Ravi / Music studio",
    prompt:
      "Cinematic photograph: two Indian men in their thirties working together inside a professional music recording studio at night, one seated at a large mixing console adjusting faders with concentration, the other standing behind the chair with headphones around his neck looking at the monitors showing audio waveforms, atmospheric warm orange and amber rim lighting from studio lamps, deep contrast, sepia-warmed cinematic colour grade, 35mm film grain, candid behind-the-scenes feel, portrait orientation, no readable text, no logos.",
  },
  {
    file: "mod-4.jpg",
    tag: "DRK / Director on set",
    prompt:
      "Cinematic behind-the-scenes still: two Indian filmmakers in their thirties sharing a quiet conversation between takes on a film set, one holding a wooden clapperboard, the other gesturing with his hand explaining a shot, soft warm late-afternoon sunlight filtering through, busy crew partially visible in the bokeh background, atmospheric haze, 35mm film grain, sepia-warmed cinematic colour grade, candid documentary feel, portrait orientation, no readable text, no logos.",
  },
  {
    file: "mod-5.jpg",
    tag: "Anthony / Editing room",
    prompt:
      "Cinematic photograph: two Indian men in their thirties inside a dim film editing suite at night, one seated at the editing console with multiple monitors showing a frozen cinematic frame and a glowing film timeline strip, the other standing behind looking at the screens with his arms crossed, warm amber bounce light from the monitors lighting their faces, dust motes floating in the air, deep moody shadows, 35mm film grain, sepia-warmed cinematic colour grade, portrait orientation, no readable text, no logos.",
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
      quality: "low",
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
  const outDir = path.join("public", "assets", "mentors");
  await fs.mkdir(outDir, { recursive: true });

  const argv = process.argv.slice(2).map((a) => a.replace(/\.jpg$/, ""));
  const filter = new Set(argv);
  const todo = filter.size
    ? PROMPTS.filter((p) => filter.has(p.file.replace(/\.jpg$/, "")))
    : PROMPTS;

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
  console.log(`${todo.length} of ${PROMPTS.length} mentor photos written to`, outDir);
}

main();
