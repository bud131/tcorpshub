"use client";
import { useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

async function ensureRecaptchaReady() {
  const w = window as any;
  if (w.grecaptcha?.execute) return;
  await new Promise<void>((res) => (w.grecaptchaReady = res));
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" }); // company = honeypot
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!form.name.trim()) return setStatus("Enter your name.");
    if (!EMAIL_RE.test(form.email.trim())) return setStatus("Enter a valid email.");
    if (form.message.trim().length < 5) return setStatus("Message is too short.");

    setStatus(null);
    setLoading(true);

    try {
      // honeypot: αν έχει τιμή, σταμάτα σιωπηλά
      if (form.company) throw new Error("Spam detected");

      await ensureRecaptchaReady();
      const token = await (window as any).grecaptcha.execute(SITE_KEY, { action: "contact_submit" });

      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Idempotency-Key": crypto.randomUUID?.() ?? String(Math.random()) },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          token,            // <-- όπως στο web3
          company: form.company,
          action: "contact_submit",
        }),
      });

      const text = await r.text();
      const data = (() => { try { return JSON.parse(text); } catch { return { ok: false, error: text }; } })();
      if (!r.ok || !data.ok) throw new Error(data?.error || r.statusText);

      setStatus("Message sent ✅");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err: any) {
      setStatus(`Failed to send: ${err?.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-4">
      {/* 🪤 Honeypot (hidden) */}
      <input type="text" name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:"none"}} />

      <input className="w-full p-3 rounded bg-neutral-900" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input className="w-full p-3 rounded bg-neutral-900" name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <textarea className="w-full p-3 rounded bg-neutral-900 min-h-[140px]" name="message" placeholder="Message" value={form.message} onChange={onChange} required />
      <button disabled={loading} className="w-full p-3 rounded bg-blue-600">{loading ? "Sending..." : "Send Message"}</button>
      {status && <p className="text-sm opacity-80 text-center">{status}</p>}
    </form>
  );
}
