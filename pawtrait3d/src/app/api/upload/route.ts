import { NextResponse, type NextRequest } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic"];

/**
 * Receives the customer's pet photo and returns a unique reference that gets
 * attached to the order's Stripe metadata, so each paid order links back to
 * its photo.
 *
 * Storage is best-effort: locally it writes to ./uploads; on a read-only
 * serverless host (e.g. Vercel) it falls back to the OS temp dir. If neither
 * is writable, it still returns a reference so the order flow is never blocked
 * — wire this route to durable storage (Vercel Blob, S3) for production.
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

  // Try the project's uploads/ dir, then the OS temp dir as a serverless fallback.
  const bytes = Buffer.from(await file.arrayBuffer());
  let stored = false;
  for (const dir of [join(process.cwd(), "uploads"), join(tmpdir(), "pawtrait-uploads")]) {
    try {
      await mkdir(dir, { recursive: true });
      await writeFile(join(dir, `${ref}.${ext}`), bytes);
      stored = true;
      break;
    } catch {
      // try the next location
    }
  }

  if (!stored) {
    console.warn(`Photo ${ref} could not be persisted on this host; returning ref anyway.`);
  }

  return NextResponse.json({ ref, stored });
}

