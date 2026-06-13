import { NextResponse, type NextRequest } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic"];

/**
 * Receives the customer's pet photo, stores it under /uploads with a unique
 * reference, and returns that reference so it can be attached to the order's
 * Stripe metadata. Each paid order therefore links back to its photo.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const file = form.get("photo");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No photo received." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Photo is too large (max 8 MB)." }, { status: 400 });
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Please upload a JPG, PNG, or WEBP image." },
      { status: 400 },
    );
  }

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const ref = `${Date.now()}-${randomUUID().slice(0, 8)}`;
  const dir = join(process.cwd(), "uploads");

  try {
    await mkdir(dir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(join(dir, `${ref}.${ext}`), bytes);
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Could not save photo." }, { status: 500 });
  }

  return NextResponse.json({ ref });
}
