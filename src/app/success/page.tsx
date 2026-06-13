import Link from "next/link";
import { business } from "@/config/business";

export const metadata = { title: "Order confirmed" };

export default function SuccessPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-24 pt-40 text-center">
      <div className="text-6xl">🎉</div>
      <h1 className="mt-6 text-4xl font-extrabold">
        Order <span className="gradient-text">confirmed!</span>
      </h1>
      <p className="mt-4 text-muted">
        Thank you for your order. We&apos;ve received your photo and details, and our
        artists are getting to work.
      </p>

      <div className="glass mt-10 w-full rounded-2xl p-7 text-left">
        <h2 className="font-semibold">What happens next</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted">
          <li>1. We sculpt your pet&apos;s 3D portrait from your photo.</li>
          <li>2. We print it in premium PETG and hand-finish every detail.</li>
          <li>3. Production takes about {business.productionTime}.</li>
          <li>4. We ship it to you ({business.shippingTime}) with tracking.</li>
        </ol>
        <p className="mt-5 text-sm text-muted">
          A receipt is on its way to your email. Questions? Write us at{" "}
          <a href={`mailto:${business.email}`} className="text-accent-soft hover:text-accent">
            {business.email}
          </a>
          .
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-8 py-3.5 font-semibold text-[#1c1407] transition-transform hover:scale-105 hover:bg-accent-soft"
      >
        Back to home
      </Link>
    </section>
  );
}
