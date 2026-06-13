import ContactForm from "./ContactForm";
import { business } from "@/config/business";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 pt-32">
      <h1 className="text-center text-4xl font-extrabold md:text-5xl">
        Get in <span className="gradient-text">touch</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-center text-muted">
        Questions about an order, a custom request, or a bulk gift? We&apos;d love to hear from you.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <ContactForm />

        <div className="glass space-y-6 rounded-2xl p-7">
          <div>
            <p className="text-sm text-muted">Email</p>
            <a href={`mailto:${business.email}`} className="font-semibold text-accent-soft hover:text-accent">
              {business.email}
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">Instagram</p>
            <a href={business.instagram} target="_blank" rel="noreferrer" className="font-semibold hover:text-accent-soft">
              @{business.name.toLowerCase().replace(/\s+/g, "")}
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">TikTok</p>
            <a href={business.tiktok} target="_blank" rel="noreferrer" className="font-semibold hover:text-accent-soft">
              @{business.name.toLowerCase().replace(/\s+/g, "")}
            </a>
          </div>
          <div>
            <p className="text-sm text-muted">Production time</p>
            <p className="font-semibold">{business.productionTime}</p>
          </div>
          <div>
            <p className="text-sm text-muted">Shipping</p>
            <p className="font-semibold">{business.shippingTime} · US, CA, MX, UK, ES</p>
          </div>
        </div>
      </div>
    </section>
  );
}
