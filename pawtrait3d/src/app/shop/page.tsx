import Link from "next/link";
import PetKeychain from "@/components/PetKeychain";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { products, collarColors } from "@/config/business";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-32">
      <Reveal>
        <h1 className="text-center text-4xl font-extrabold md:text-5xl">
          The <span className="gradient-text">shop</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Pick a product to start your custom order. Each one is sculpted from your
          photo and hand-finished.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {Object.values(products).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.12}>
            <TiltCard className="flex h-full flex-col overflow-hidden">
              <div className="scene-3d flex items-center justify-center bg-surface/50 py-10">
                <div className="float-slow">
                  <PetKeychain
                    name={p.id === "keychain" ? "LUNA" : "MAX"}
                    collarHex={collarColors[i % collarColors.length].hex}
                    className="h-56 w-48 drop-shadow-2xl"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-start justify-between">
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <span className="rounded-full bg-accent/15 px-4 py-1.5 font-bold text-accent-soft">
                    ${p.price}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted">{p.blurb}</p>
                <Link
                  href={`/order?product=${p.id}`}
                  className="mt-auto inline-block rounded-full bg-accent px-6 py-3 pt-3 text-center font-semibold text-[#1c1407] transition-transform hover:scale-[1.02] hover:bg-accent-soft"
                  style={{ marginTop: "1.75rem" }}
                >
                  Customize yours →
                </Link>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
