// app/components/ContactForm.tsx
"use client";
import { useState } from "react";
import { getRecaptchaToken } from "@/lib/recaptcha";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" }); // honeypot 'company'
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    if (loading) return;
    setLoading(true);

    try {
      if (form.company) { setStatus("OK"); setLoading(false); return; } // honeypot: silent ok
      const recaptchaToken = await getRecaptchaToken("contact_submit");

      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          token: recaptchaToken,        // <-- token
          action: "contact_submit",
        }),
      });

      const data = await r.json().catch(() => ({} as any));
      if (!r.ok || !data.ok) throw new Error(data?.error || `HTTP ${r.status}`);

      setStatus("Message sent ✅");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err: any) {
      setStatus(`Failed to send: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-4">
      {/* honeypot (hidden) */}
      <input
        name="company" value={form.company}
        onChange={e => setForm(v => ({ ...v, company: e.target.value }))}
        tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }}
      />

      <input
        name="name" className="w-full p-3 rounded bg-neutral-900"
        placeholder="Name" value={form.name}
        onChange={e => setForm(v => ({ ...v, name: e.target.value }))} required
      />
      <input
        name="email" type="email" className="w-full p-3 rounded bg-neutral-900"
        placeholder="Email" value={form.email}
        onChange={e => setForm(v => ({ ...v, email: e.target.value }))} required
      />
      <textarea
        name="message" className="w-full p-3 rounded bg-neutral-900 min-h-[140px]"
        placeholder="Message" value={form.message}
        onChange={e => setForm(v => ({ ...v, message: e.target.value }))} required
      />
      <button disabled={loading} className="w-full p-3 rounded bg-blue-600">
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && <p className="text-sm opacity-80 text-center">{status}</p>}
    </form>
  );
}
