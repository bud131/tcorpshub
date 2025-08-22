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
      {/* inputs όπως τα έχεις */}
    </form>
  );
}
