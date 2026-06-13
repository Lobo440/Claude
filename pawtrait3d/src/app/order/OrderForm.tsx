"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import PetKeychain from "@/components/PetKeychain";
import {
  business,
  collarColors,
  products,
  type ProductId,
} from "@/config/business";

export default function OrderForm() {
  const params = useSearchParams();
  const initialProduct: ProductId =
    params.get("product") === "shotglass" ? "shotglass" : "keychain";

  const [productId, setProductId] = useState<ProductId>(initialProduct);
  const [petName, setPetName] = useState("");
  const [collar, setCollar] = useState<string>(collarColors[0].id);
  const [quantity, setQuantity] = useState(1);

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploadRef, setUploadRef] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const product = products[productId];
  const collarHex =
    collarColors.find((c) => c.id === collar)?.hex ?? collarColors[0].hex;
  const subtotal = product.price * quantity;
  const freeShip = business.freeShippingOver > 0 && subtotal >= business.freeShippingOver;

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setNotice(null);
    setPhotoPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("photo", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUploadRef(data.ref);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Could not upload photo.");
      setPhotoPreview(null);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    setNotice(null);
    if (!photoPreview) {
      setNotice("Please upload a photo of your pet first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          petName,
          collar,
          quantity,
          uploadRef,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setNotice(
        data.message || data.error || "Something went wrong. Please try again.",
      );
    } catch {
      setNotice("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      {/* ── Live preview ─────────────────────────────── */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="glass scene-3d flex aspect-square items-center justify-center rounded-3xl p-8">
          {productId === "keychain" ? (
            <div className="float-slow">
              <PetKeychain
                name={petName || "NAME"}
                collarHex={collarHex}
                className="h-72 w-64 drop-shadow-2xl"
              />
            </div>
          ) : (
            <ShotGlassPreview petName={petName} collarHex={collarHex} photo={photoPreview} />
          )}
        </div>
        {photoPreview && (
          <div className="glass mt-4 flex items-center gap-3 rounded-2xl p-3">
            <Image
              src={photoPreview}
              alt="Your pet"
              width={56}
              height={56}
              unoptimized
              className="h-14 w-14 rounded-xl object-cover"
            />
            <p className="text-sm text-muted">
              {uploading
                ? "Uploading your photo…"
                : "Photo received — we'll sculpt from this."}
            </p>
          </div>
        )}
      </div>

      {/* ── Controls ─────────────────────────────────── */}
      <div className="space-y-8">
        {/* Product */}
        <div>
          <label className="mb-3 block text-sm font-semibold">1. Choose your product</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(products).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProductId(p.id)}
                className={`rounded-2xl border p-4 text-left transition-all ${
                  productId === p.id
                    ? "border-accent bg-accent/10"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <p className="font-semibold">{p.name.replace("Custom ", "")}</p>
                <p className="text-sm text-muted">${p.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Upload */}
        <div>
          <label className="mb-3 block text-sm font-semibold">2. Upload your pet&apos;s photo</label>
          <div
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFile(e.dataTransfer.files?.[0]);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
              dragOver ? "border-accent bg-accent/10" : "border-white/15 hover:border-accent/50"
            }`}
          >
            <span className="text-3xl">📸</span>
            <p className="mt-2 text-sm font-medium">
              {photoPreview ? "Choose a different photo" : "Drag a photo here or click to browse"}
            </p>
            <p className="mt-1 text-xs text-muted">JPG, PNG or WEBP · up to 8 MB</p>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? undefined)}
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="petName" className="mb-3 block text-sm font-semibold">
            3. Pet&apos;s name <span className="font-normal text-muted">(engraved on the tag)</span>
          </label>
          <input
            id="petName"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            maxLength={10}
            placeholder="Luna"
            className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-3 outline-none focus:border-accent"
          />
        </div>

        {/* Collar color */}
        <div>
          <label className="mb-3 block text-sm font-semibold">4. Collar &amp; tag color</label>
          <div className="flex flex-wrap gap-3">
            {collarColors.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.label}
                onClick={() => setCollar(c.id)}
                className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${
                  collar === c.id ? "border-foreground ring-2 ring-accent" : "border-white/20"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-3 block text-sm font-semibold">5. Quantity</label>
          <div className="inline-flex items-center gap-4 rounded-xl border border-white/10 bg-surface/60 px-4 py-2">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-xl text-muted hover:text-foreground"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(25, q + 1))}
              className="text-xl text-muted hover:text-foreground"
            >
              +
            </button>
          </div>
        </div>

        {/* Summary + submit */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted">Shipping</span>
            <span className="font-semibold">
              {freeShip ? "Free" : `$${business.shippingFee.toFixed(2)}`}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold text-accent-soft">
              ${(subtotal + (freeShip ? 0 : business.shippingFee)).toFixed(2)}
            </span>
          </div>

          {notice && (
            <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm text-accent-soft">
              {notice}
            </p>
          )}

          <button
            type="button"
            disabled={submitting || uploading}
            onClick={handleSubmit}
            className="mt-5 w-full rounded-full bg-accent py-3.5 font-bold text-[#1c1407] transition-transform hover:scale-[1.02] hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Starting checkout…" : "Proceed to secure payment →"}
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            🔒 Secure checkout · {business.productionTime} production
          </p>
        </div>
      </div>
    </div>
  );
}

function ShotGlassPreview({
  petName,
  collarHex,
  photo,
}: {
  petName: string;
  collarHex: string;
  photo: string | null;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-56 w-40 items-end justify-center overflow-hidden rounded-b-[2.2rem] rounded-t-lg border-4"
        style={{ borderColor: collarHex, background: "rgba(255,255,255,0.05)" }}
      >
        {photo ? (
          <Image
            src={photo}
            alt="Your pet"
            fill
            unoptimized
            className="object-cover opacity-90"
          />
        ) : (
          <PetKeychain collarHex={collarHex} className="h-44 w-36" />
        )}
        <div className="absolute inset-x-0 top-0 h-6 bg-white/10" />
      </div>
      <p className="mt-3 text-sm font-semibold tracking-widest text-muted">
        {(petName || "YOUR PET").toUpperCase()}
      </p>
    </div>
  );
}
