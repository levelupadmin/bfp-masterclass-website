import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// 1) Favicon — square crop of the LevelUp logo with cream padding.
//    Next.js picks up app/icon.png automatically and emits the link tags.
{
  const src = resolve(root, "public/assets/levelup-logo.png");
  const out = resolve(root, "app/icon.png");
  const meta = await sharp(src).metadata();
  const size = 512;
  const inner = Math.round(size * 0.78);
  const logo = await sharp(src)
    .resize({ width: inner, height: inner, fit: "inside", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: { r: 12, g: 10, b: 8, alpha: 1 } },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(out);
  console.log(`icon.png  ${size}x${size}  ← logo ${meta.width}x${meta.height}`);
}

// 2) Apple touch icon — same look, 180×180 is the iOS standard but Next will
//    upscale a 512 source automatically; we keep parity with icon.png.
{
  const src = resolve(root, "app/icon.png");
  const out = resolve(root, "app/apple-icon.png");
  await sharp(src).resize(180, 180).png().toFile(out);
  console.log(`apple-icon.png  180x180`);
}

// 3) Open Graph + Twitter share image — 1200×630, hero composition with the
//    cinematographer on the right. Slight darken so any future overlay text
//    would read; for now the image alone speaks.
{
  const src = resolve(root, "public/assets/hero-desktop.png");
  const out = resolve(root, "app/opengraph-image.png");
  const twOut = resolve(root, "app/twitter-image.png");
  const meta = await sharp(src).metadata();
  // Source 1672×941 (aspect 1.78). Target 1200×630 (aspect 1.90).
  // Crop a tighter horizontal slice that keeps the right-side figure centered.
  const targetAspect = 1200 / 630;
  const cropH = Math.round(meta.width / targetAspect);
  const top = Math.max(0, Math.round((meta.height - cropH) / 2));
  const buf = await sharp(src)
    .extract({ left: 0, top, width: meta.width, height: cropH })
    .resize({ width: 1200, height: 630, fit: "cover" })
    .png({ quality: 92 })
    .toBuffer();
  await sharp(buf).toFile(out);
  await sharp(buf).toFile(twOut);
  console.log(`opengraph-image.png  1200x630  ← hero ${meta.width}x${meta.height}`);
  console.log(`twitter-image.png    1200x630`);
}
