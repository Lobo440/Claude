import Link from "next/link";
import PetKeychain from "@/components/PetKeychain";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { business, collarColors, products } from "@/config/business";

const steps = [
  {
    emoji: "📸",
    title: "Upload a photo",
    text: "Send us a clear photo of your pet's face. One good shot is all we need.",
  },
  {
    emoji: "🎨",
    title: "We sculpt it in 3D",
    text: "Our artists turn your photo into a striking low-poly 3D portrait, with the collar color and name tag you choose.",
  },
  {
    emoji: "🖨️",
    title: "Printed & hand-finished",
    text: `Each piece is 3D printed in premium PETG and finished by hand. Production takes ${business.productionTime}.`,
  },
  {
    emoji: "📦",
    title: "Shipped to your door",
    text: `Carefully packed and delivered in ${business.shippingTime}. Ready to gift — or keep.`,
  },
];

const testimonials = [
  {
    name: "Sofia M.",
    pet: "Luna 🐕",
    text: "It looks EXACTLY like her. I cried a little when I opened the box. Best gift I've ever bought myself.",
  },
  {
    name: "Jake R.",
    pet: "Biscuit 🐈",
    text: "Got one for my girlfriend with her cat's face. She shows it to literally everyone. 10/10.",
  },
  {
    name: "Dani V.",
    pet: "Rocky 🐕",
    text: "The detail on the ears and the little name tag... insane quality for the price. Ordering two more.",
  },
];

const marqueeItems = [
  "Custom 3D portraits",
  "Hand-finished",
  "Premium PETG",
  "Stainless-steel ring",
  "Personalized name tag",
  "8 collar colors",
  "Perfect gift",
];

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 pb-20 pt-32 md:flex-row md:gap-6 md:pt-40">
        <div className="max-w-xl text-center md:text-left">
          <Reveal>
            <p className="mb-4 inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-soft">
              Custom 3D printed pet art
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Your pet,
              <br />
              <span className="gradient-text">in your pocket.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-lg text-muted">
              We turn a photo of your pet into a one-of-a-kind low-poly 3D keychain —
              sculpted, printed, and hand-finished just for you.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/order"
                className="rounded-full bg-accent px-8 py-3.5 font-semibold text-[#1c1407] shadow-lg shadow-accent/25 transition-transform hover:scale-105 hover:bg-accent-soft"
              >
                Create yours — ${products.keychain.price}
              </Link>
              <Link
                href="/shop"
                className="glass rounded-full px-8 py-3.5 font-semibold transition-colors hover:border-accent/50"
              >
                Browse products
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="scene-3d relative flex flex-1 items-center justify-center">
          <div className="glow-ring absolute h-80 w-80 rounded-full md:h-96 md:w-96" />
          <div className="keychain-3d relative">
            <PetKeychain className="h-80 w-72 drop-shadow-2xl md:h-96 md:w-80" />
          </div>
        </div>
      </section>

      {/* ── Marquee strip ────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/10 bg-surface/50 py-3">
        <div className="marquee-track flex w-max gap-10 text-sm font-medium uppercase tracking-widest text-muted">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item} <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── How it works ─────────────────────────────────── */}
      <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
        <Reveal>
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            From photo to <span className="gradient-text">pocket-sized portrait</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted">
            Four simple steps. We handle all the 3D magic.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <TiltCard className="h-full p-7">
                <div className="text-4xl">{s.emoji}</div>
                <p className="mt-4 text-xs font-bold uppercase tracking-widest text-accent">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.text}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">The lineup</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted">
              Two ways to celebrate your best friend.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {Object.values(products).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.15}>
                <TiltCard className="flex h-full flex-col p-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-bold">{p.name}</h3>
                    <span className="rounded-full bg-accent/15 px-4 py-1.5 font-bold text-accent-soft">
                      ${p.price}
                    </span>
                  </div>
                  <p className="mt-3 text-muted">{p.blurb}</p>
                  <ul className="mt-5 space-y-2 text-sm text-muted">
                    {p.details.map((d) => (
                      <li key={d} className="flex gap-2">
                        <span className="text-accent">✓</span> {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/order?product=${p.id}`}
                    className="mt-auto inline-block pt-7 font-semibold text-accent-soft transition-colors hover:text-accent"
                  >
                    Customize yours →
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specs + colors ───────────────────────────────── */}
      <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-24 md:grid-cols-2">
        <Reveal>
          <div className="scene-3d flex justify-center">
            <div className="float-slow">
              <PetKeychain name="ROCKY" collarHex="#3B82F6" className="h-72 w-64 drop-shadow-2xl" />
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">
              Built to last, <span className="gradient-text">made to charm</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-8 grid grid-cols-2 gap-5 text-sm">
              {[
                ["Size", "≈ 4 × 5.5 cm"],
                ["Material", "Premium PETG"],
                ["Hardware", "Stainless ring + chain"],
                ["Finish", "Hand-detailed"],
              ].map(([k, v]) => (
                <div key={k} className="glass rounded-xl p-4">
                  <dt className="text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-semibold">Collar &amp; tag colors</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {collarColors.map((c) => (
                <span
                  key={c.id}
                  title={c.label}
                  className="h-9 w-9 rounded-full border-2 border-white/20 transition-transform hover:scale-110"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="border-y border-white/5 bg-surface/40 py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-bold md:text-4xl">
              Pet parents are <span className="gradient-text">obsessed</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <TiltCard className="h-full p-7">
                  <p className="text-accent-soft">★★★★★</p>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                    “{t.text}”
                  </p>
                  <p className="mt-5 text-sm font-semibold">
                    {t.name} <span className="font-normal text-muted">· {t.pet}</span>
                  </p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 py-28 text-center">
        <Reveal>
          <h2 className="text-4xl font-extrabold md:text-5xl">
            Ready to make your pet
            <br />
            <span className="gradient-text">immortal?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Upload a photo, pick a color, add their name. We&apos;ll handle the rest.
          </p>
          <Link
            href="/order"
            className="mt-9 inline-block rounded-full bg-accent px-10 py-4 text-lg font-bold text-[#1c1407] shadow-xl shadow-accent/25 transition-transform hover:scale-105 hover:bg-accent-soft"
          >
            Start your order 🐾
          </Link>
        </Reveal>
      </section>
    </>
  );
}
