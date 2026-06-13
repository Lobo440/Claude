import Link from "next/link";

export const metadata = { title: "Checkout cancelled" };

export default function CancelledPage() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-24 pt-40 text-center">
      <div className="text-6xl">🐾</div>
      <h1 className="mt-6 text-4xl font-extrabold">No worries!</h1>
      <p className="mt-4 max-w-md text-muted">
        Your checkout was cancelled and you haven&apos;t been charged. Your design is
        still waiting whenever you&apos;re ready.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/order"
          className="rounded-full bg-accent px-8 py-3.5 font-semibold text-[#1c1407] transition-transform hover:scale-105 hover:bg-accent-soft"
        >
          Return to my order
        </Link>
        <Link href="/" className="glass rounded-full px-8 py-3.5 font-semibold">
          Back to home
        </Link>
      </div>
    </section>
  );
}
