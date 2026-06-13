# 🐾 Pawtrait 3D — Custom Pet Keychain Store

A complete, ready-to-launch website for a business selling **custom 3D-printed pet
keychains and shot glasses**. Customers upload a photo of their pet, choose a collar
color and name, and pay online. Built with Next.js, Tailwind CSS, Framer Motion, and
Stripe Checkout.

> **The site works right now** with built-in artwork and a graceful "payments not
> configured yet" message. You only need to add your Stripe keys when you're ready to
> take real money.

---

## 1. Run it on your computer

The website lives in the `pawtrait3d/` folder of this repository:

```bash
cd pawtrait3d
npm install
npm run dev
```

Open <http://localhost:3000>. That's the whole site.

> An unrelated Flappy Bird demo from an earlier project lives in the repo's
> `flappy-bird/` folder and is not part of the website.

---

## 2. Make it yours (one file)

Open **`src/config/business.ts`** and edit:

- Business name & tagline
- Contact email, Instagram, TikTok
- Product prices (keychain, shot glass)
- Shipping fee & free-shipping threshold
- Production / shipping times

Everything on the site reads from this one file. The collar colors there match your
prototype's spec sheet (pink, blue, red, lilac, purple, black, cyan, turquoise).

To change the prototype showcase image, replace **`public/prototype.png`**.

---

## 3. Turn on payments (Stripe)

1. Create a free account at <https://stripe.com> (you'll add your business details and a
   bank account for payouts).
2. Go to <https://dashboard.stripe.com/apikeys> and copy your **Publishable** and
   **Secret** keys. Start with the **test** keys (`pk_test_…` / `sk_test_…`) so you can
   try everything without real charges.
3. In the `pawtrait3d` folder, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Paste your keys into `.env.local`:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```
5. Restart `npm run dev`. The order page now sends customers to a real Stripe checkout.

When you're ready for real money, swap in your **live** keys (`sk_live_…` / `pk_live_…`).
Test cards for trying checkout: card number `4242 4242 4242 4242`, any future date, any CVC.

Each paid order arrives in your **Stripe Dashboard → Payments**, including the pet's
name, collar color, quantity, and a photo reference in the payment metadata. The
uploaded photo for that reference is saved in the `uploads/` folder on the server.

---

## 4. Put it online (free) with Vercel

1. Push this project to GitHub (already done in this repo).
2. Go to <https://vercel.com>, sign in with GitHub, and **Import** the repo. Set the
   project's **Root Directory** to **`pawtrait3d`** (the website lives in that folder);
   Vercel then detects Next.js automatically.
3. In Vercel **Settings → Environment Variables**, add the same three values from your
   `.env.local`, plus `NEXT_PUBLIC_SITE_URL` set to your Vercel URL (e.g.
   `https://your-project.vercel.app`).
4. Deploy. You get a live `https://…vercel.app` address. You can attach your own domain
   later in Vercel for a few dollars a year.

> **Note on photo uploads:** Vercel's serverless filesystem is temporary, so for
> production you'll want photos to persist. The simplest upgrade is to have customers
> email or DM the photo after ordering (the order already collects everything else), or
> wire `src/app/api/upload/route.ts` to a storage service like Vercel Blob or AWS S3.
> Locally and for getting started, saving to `uploads/` works fine.

---

## 5. Optional: generate marketing images with Higgsfield AI

The site ships with clean built-in artwork, but you can generate photorealistic product
shots with [Higgsfield AI](https://higgsfield.ai):

```bash
npx -y --package=@higgsfield/cli higgsfield auth login   # sign in once
npm run gen-images                                        # creates images in public/generated/
```

The CLI is fetched on demand by `npx`, so it is **not** a project dependency and never
runs during a deploy build. Edit the prompts in `scripts/gen-images.mjs` to taste, then
reference the generated files (e.g. `/generated/hero.png`) in your pages.

---

## 6. Making the keychains (Bambu Lab P1S workflow)

This site sells the product — here's the rough production loop on your printer:

1. **Model:** Turn the customer's photo into a low-poly 3D model. Tools like a photo→3D
   service, Blender, or an AI mesh generator work; keep it low-poly to match the brand.
2. **Slice:** Open the model in **Bambu Studio**, choose PETG, and slice. PETG is tough
   and slightly flexible — great for keychains that live on keyrings.
3. **Multi-color:** The P1S Combo's AMS lets you print the collar and name tag in the
   color the customer picked without swapping filament by hand.
4. **Finish:** Add the stainless-steel ring/chain and inspect details by hand.
5. **Ship:** Pack and send. Update the customer; production target is set in
   `business.ts` (default 3–5 business days).

---

## Project structure

```
pawtrait3d/                      ← the website (set this as the Vercel Root Directory)
├── src/
│   ├── config/business.ts      ← edit your business info & prices here
│   ├── components/             ← Navbar, Footer, 3D keychain art, animations
│   ├── lib/stripe.ts           ← Stripe client (no-op until keys are set)
│   └── app/
│       ├── page.tsx            ← animated landing page
│       ├── order/              ← custom order form + live preview
│       ├── shop/ faq/ contact/ ← supporting pages
│       ├── success/ cancelled/ ← post-checkout pages
│       └── api/
│           ├── checkout/       ← creates Stripe Checkout sessions
│           └── upload/         ← receives pet photos
├── scripts/gen-images.mjs      ← optional Higgsfield image generator
├── vercel.json                 ← pins the Next.js build settings
└── .env.example                ← copy to .env.local and add your keys

flappy-bird/                     ← unrelated demo from an earlier project
```

Happy printing! 🐾
