"use client";

import { useState } from "react";
import { business } from "@/config/business";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Mailto fallback — works with zero backend setup. Victor can later swap
  // this for a form service (Formspree, Resend, etc.) if he wants.
  const href = `mailto:${business.email}?subject=${encodeURIComponent(
    `Website message from ${name || "a customer"}`,
  )}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`;

  return (
    <form
      className="glass space-y-4 rounded-2xl p-7"
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
    >
      <div>
        <label htmlFor="name" className="mb-1 block text-sm text-muted">Your name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-muted">Your email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm text-muted">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-surface/60 px-4 py-2.5 outline-none focus:border-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-accent py-3 font-semibold text-[#1c1407] transition-transform hover:scale-[1.02] hover:bg-accent-soft"
      >
        Send message
      </button>
    </form>
  );
}
