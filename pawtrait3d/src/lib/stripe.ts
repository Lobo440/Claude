import Stripe from "stripe";

/**
 * Returns a configured Stripe client, or `null` if no secret key is set yet.
 * This lets the whole site run (and the order form work) before Victor adds
 * his real keys — checkout simply reports that payments aren't configured.
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("REPLACE_ME")) return null;
  return new Stripe(key);
}

export function isStripeConfigured(): boolean {
  return getStripe() !== null;
}
