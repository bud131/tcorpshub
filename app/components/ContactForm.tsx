"use client";
import { useState } from "react";
import { getRecaptchaToken } from "@/lib/recaptcha";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      const recaptchaToken = await getRecaptchaToken("contact");

      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken, action: "contact" }),
      });
      const data = await r.json().catch(() => ({} as any));
      if (!r.ok || !data.ok) throw new Error(data?.error || `HTTP ${r.status}`);

      setStatus("Message sent ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setStatus(`Failed to send: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl mx-auto space-y-4">
      <input className="w-full p-3 rounded bg-neutral-900"
             placeholder="Name"
             value={form.name}
             onChange={(e) => setForm(v => ({ ...v, name: e.target.value }))} required />
      <input className="w-full p-3 rounded bg-neutral-900"
             placeholder="Email" type="email"
             value={form.email}
             onChange={(e) => setForm(v => ({ ...v, email: e.target.value }))} required />
      <textarea className="w-full p-3 rounded bg-neutral-900 min-h-[140px]"
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm(v => ({ ...v, message: e.target.value }))} required />
      <button disabled={loading} className="w-full p-3 rounded bg-blue-600">
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status && <p className="text-sm opacity-80">{status}</p>}
    </form>
  );
}
