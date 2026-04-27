import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "public/assets/hero-desktop.png");
const out = resolve(root, "public/assets/hero-mobile.png");

const image = sharp(src);
const meta = await image.metadata();
const { width: W, height: H } = meta;

// Source is 1672x941 — cinematographer figure is on the right side,
// centered roughly at x ≈ 1280, y ≈ 470. We want a mobile portrait crop
// that keeps the figure as the focal point, with the orange light streaks
// flowing in from the left for atmosphere.
//
// Target aspect: 4:5 portrait (1080 × 1350 final, scaled from source crop).

const cropAspect = 4 / 5;
const cropH = H;                          // use full height
const cropW = Math.round(cropH * cropAspect);
const figureCenterX = Math.round(W * 0.78);
let cropLeft = figureCenterX - Math.round(cropW / 2);
cropLeft = Math.max(0, Math.min(cropLeft, W - cropW));

await sharp(src)
  .extract({ left: cropLeft, top: 0, width: cropW, height: cropH })
  .resize({ width: 1080, height: 1350, fit: "cover", position: "center" })
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(out);

console.log(`source=${W}x${H}  crop=${cropW}x${cropH}@(${cropLeft},0)  out=1080x1350 → ${out}`);
