import Link from "next/link";
import Reveal from "@/components/Reveal";
import { business } from "@/config/business";

export const metadata = { title: "FAQ" };

const faqs = [
  {
    q: "How do you make the keychains?",
    a: `We turn your pet's photo into a low-poly 3D model, then print it in premium PETG on our printers and finish every detail by hand. Production takes about ${business.productionTime}.`,
  },
  {
    q: "What kind of photo should I send?",
    a: "A clear, well-lit photo of your pet's face works best — straight on or slightly angled. The more detail we can see, the better the portrait. You can upload it right in the order form.",
  },
  {
    q: "How long until I get it?",
    a: `Production takes ${business.productionTime}, then shipping is ${business.shippingTime}. You'll get tracking as soon as it ships.`,
  },
  {
    q: "Can I get my cat, rabbit, or other pet?",
    a: "Absolutely! Dogs, cats, bunnies, birds — if you love them, we can sculpt them.",
  },
  {
    q: "What colors can I choose?",
    a: "Eight collar and tag colors: pink, blue, red, lilac, purple, black, cyan, and turquoise. Pick yours in the order form and the name tag is engraved with your pet's name.",
  },
  {
    q: "Do you ship outside the US?",
    a: "Yes — we currently ship to the US, Canada, Mexico, the UK, and Spain. Shipping is calculated at checkout.",
  },
  {
    q: "What if something's wrong with my order?",
    a: `Just email us at ${business.email} with your order details and we'll make it right.`,
  },
];

export default function FaqPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <Reveal>
        <h1 className="text-center text-4xl font-extrabold md:text-5xl">
          Frequently asked <span className="gradient-text">questions</span>
        </h1>
      </Reveal>
      <div className="mt-12 space-y-4">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <details className="glass group rounded-2xl p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                {f.q}
                <span className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <p className="text-muted">Still have a question?</p>
        <Link href="/contact" className="font-semibold text-accent-soft hover:text-accent">
          Get in touch →
        </Link>
      </div>
    </section>
  );
}
