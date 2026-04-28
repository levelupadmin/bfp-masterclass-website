import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// 1) Favicon — stacked LevelUp mark (logo + Up wordmark). Already shipped
//    as a square 512×512, just normalize and copy to app/icon.png so Next
//    picks it up automatically.
{
  const src = resolve(root, "public/assets/levelup-live-stacked.png");
  const out = resolve(root, "app/icon.png");
  const meta = await sharp(src).metadata();
  await sharp(src).resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(out);
  console.log(`icon.png  512x512  ← stacked ${meta.width}x${meta.height}`);
}

// 2) Apple touch icon — 180×180, same source so iOS home-screen matches.
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
