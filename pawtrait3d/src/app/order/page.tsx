import { Suspense } from "react";
import OrderForm from "./OrderForm";

export const metadata = { title: "Create your order" };

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">
          Design your <span className="gradient-text">custom piece</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Upload a photo, choose a collar color, add your pet&apos;s name, and watch the preview update.
        </p>
      </div>
      <Suspense fallback={<div className="text-center text-muted">Loading…</div>}>
        <OrderForm />
      </Suspense>
    </section>
  );
}
