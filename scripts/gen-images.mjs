#!/usr/bin/env node
/**
 * Generate marketing imagery with the Higgsfield AI CLI.
 *
 * Setup (one time):
 *   1. npx -y --package=@higgsfield/cli higgsfield auth login
 *   2. npm run gen-images
 *
 * The CLI is fetched on demand by npx — it is deliberately not a project
 * dependency, so it never runs during a Vercel/production build.
 *
 * Generated files land in /public so you can drop them straight into the site.
 * Until you run this, the site uses its built-in SVG art and looks complete.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "generated");
mkdirSync(outDir, { recursive: true });

const MODEL = "text2image_soul_v2";

const shots = [
  {
    name: "hero",
    prompt:
      "Professional product photograph of a small 3D-printed low-poly dog head keychain with a pink collar name tag, glossy PETG plastic, stainless steel keyring, dramatic warm studio lighting, dark moody background with soft amber glow, ultra detailed, commercial advertising shot",
  },
  {
    name: "keychain-cat",
    prompt:
      "Professional product photograph of a small 3D-printed low-poly cat head keychain with a blue collar name tag, matte plastic finish, held between fingers, soft bokeh background, warm cinematic lighting, premium e-commerce product shot",
  },
  {
    name: "shotglass",
    prompt:
      "Professional product photograph of a custom 3D-printed shot glass holder shaped like a low-poly dog face, clear glass insert, sitting on a dark slate bar top, warm party lighting, shallow depth of field, premium advertising photography",
  },
  {
    name: "lifestyle",
    prompt:
      "Lifestyle photo of a custom low-poly 3D-printed pet keychain hanging from a set of car keys, cozy warm home background out of focus, golden hour light, Instagram-worthy, high end product marketing",
  },
];

console.log(`Generating ${shots.length} images with Higgsfield (${MODEL})…\n`);

for (const shot of shots) {
  console.log(`→ ${shot.name}`);
  // The Higgsfield CLI is fetched on demand via npx (it is intentionally NOT a
  // project dependency, so it never runs during a deploy build).
  const res = spawnSync(
    "npx",
    [
      "-y",
      "--package=@higgsfield/cli",
      "higgsfield",
      "generate",
      "create",
      MODEL,
      "--prompt",
      shot.prompt,
      "--output",
      join(outDir, `${shot.name}.png`),
    ],
    { stdio: "inherit", cwd: root },
  );
  if (res.status !== 0) {
    console.error(
      `\n⚠  Could not generate "${shot.name}". First run:\n     npx -y --package=@higgsfield/cli higgsfield auth login\n   and set HIGGSFIELD_API_KEY.\n`,
    );
  }
}

console.log("\nDone. Check public/generated/ for your images.");
