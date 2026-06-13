/**
 * ─────────────────────────────────────────────────────────────
 *  BUSINESS CONFIGURATION
 *  This is the ONLY file you need to edit to make the site yours.
 *  Payment keys go in `.env.local` (see `.env.example`).
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  // Brand
  name: "Pawtrait 3D",
  tagline: "Your pet, in your pocket.",
  description:
    "Custom 3D-printed keychains and shot glasses featuring your pet's face. Hand-finished, low-poly art you can carry everywhere.",

  // Contact (shown in footer / contact page)
  email: "hello@pawtrait3d.com",
  instagram: "https://instagram.com/pawtrait3d",
  tiktok: "https://tiktok.com/@pawtrait3d",

  // Currency for Stripe Checkout (lowercase ISO code)
  currency: "usd",

  // Shipping (in dollars; 0 = free shipping)
  shippingFee: 4.99,
  freeShippingOver: 50,

  // Production / shipping expectations shown to customers
  productionTime: "3–5 business days",
  shippingTime: "2–5 business days",
} as const;

export type ProductId = "keychain" | "shotglass";

export const products: Record<
  ProductId,
  {
    id: ProductId;
    name: string;
    price: number; // dollars
    blurb: string;
    details: string[];
  }
> = {
  keychain: {
    id: "keychain",
    name: "Custom Pet Keychain",
    price: 24.99,
    blurb:
      "A low-poly 3D portrait of your pet, printed in durable PETG with a stainless-steel ring and an engraved name tag.",
    details: [
      "≈ 4 cm × 5.5 cm — light and tough",
      "3D modeled from your photo in low-poly style",
      "Premium PETG print, hand-finished details",
      "Stainless-steel ring and chain",
      "Personalized collar tag with your pet's name",
    ],
  },
  shotglass: {
    id: "shotglass",
    name: "Custom Pet Shot Glass",
    price: 19.99,
    blurb:
      "A party-ready shot glass holder sculpted with your pet's face. Includes a removable food-safe glass insert.",
    details: [
      "3D printed sleeve modeled from your photo",
      "Removable food-safe glass insert",
      "Personalized name on the base",
      "The conversation starter of every party",
    ],
  },
};

// Collar / tag colors from the product spec sheet
export const collarColors = [
  { id: "pink", label: "Pink", hex: "#F472B6" },
  { id: "blue", label: "Blue", hex: "#3B82F6" },
  { id: "red", label: "Red", hex: "#EF4444" },
  { id: "lilac", label: "Lilac", hex: "#C4B5FD" },
  { id: "purple", label: "Purple", hex: "#8B5CF6" },
  { id: "black", label: "Black", hex: "#1F2937" },
  { id: "cyan", label: "Cyan", hex: "#22D3EE" },
  { id: "turquoise", label: "Turquoise", hex: "#2DD4BF" },
] as const;
