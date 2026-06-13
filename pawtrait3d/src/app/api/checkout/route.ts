import { NextResponse, type NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { business, products, collarColors, type ProductId } from "@/config/business";

type CheckoutBody = {
  productId: ProductId;
  petName: string;
  collar: string;
  quantity: number;
  uploadRef?: string;
};

export async function POST(request: NextRequest) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const product = products[body.productId];
  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 400 });
  }

  const quantity = Math.min(Math.max(Math.floor(body.quantity) || 1, 1), 25);
  const collar = collarColors.find((c) => c.id === body.collar);
  const petName = (body.petName || "").trim().slice(0, 40);

  const stripe = getStripe();

  // Graceful fallback so the site demos cleanly before keys are added.
  if (!stripe) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "Payments aren't switched on yet. Add your Stripe keys to .env.local to start accepting orders. (Your order details were received correctly!)",
        preview: { product: product.name, petName, collar: collar?.label, quantity },
      },
      { status: 200 },
    );
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "http://localhost:3000";

  const freeShipping =
    business.freeShippingOver > 0 && product.price * quantity >= business.freeShippingOver;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: business.currency,
            unit_amount: Math.round(product.price * 100),
            product_data: {
              name: product.name,
              description: [
                petName && `Pet: ${petName}`,
                collar && `Collar: ${collar.label}`,
              ]
                .filter(Boolean)
                .join(" · ") || product.blurb,
            },
          },
        },
      ],
      shipping_options: freeShipping
        ? undefined
        : [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                display_name: "Standard shipping",
                fixed_amount: {
                  amount: Math.round(business.shippingFee * 100),
                  currency: business.currency,
                },
              },
            },
          ],
      shipping_address_collection: { allowed_countries: ["US", "CA", "MX", "GB", "ES"] },
      metadata: {
        productId: product.id,
        petName,
        collar: collar?.label ?? "",
        quantity: String(quantity),
        uploadRef: body.uploadRef ?? "",
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancelled`,
    });

    return NextResponse.json({ configured: true, url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
