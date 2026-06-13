import Link from "next/link";
import { business } from "@/config/business";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold">
            🐾 {business.name.replace(" 3D", "")}
            <span className="gradient-text"> 3D</span>
          </p>
          <p className="mt-3 text-sm text-muted">{business.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold">Shop</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/shop" className="hover:text-foreground">All products</Link></li>
            <li><Link href="/order" className="hover:text-foreground">Custom order</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold">Help</p>
          <ul className="space-y-2 text-muted">
            <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact us</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 font-semibold">Follow us</p>
          <ul className="space-y-2 text-muted">
            <li>
              <a href={business.instagram} target="_blank" rel="noreferrer" className="hover:text-foreground">
                Instagram
              </a>
            </li>
            <li>
              <a href={business.tiktok} target="_blank" rel="noreferrer" className="hover:text-foreground">
                TikTok
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="hover:text-foreground">
                {business.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} {business.name}. Every piece is 3D printed and hand-finished with love.
      </div>
    </footer>
  );
}
