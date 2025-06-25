"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const token = await grecaptcha.execute("6LfIuAUrAAAAAH1bMnYN7tuYogCIpZvcgo_ZpKkK", { action: "submit" });

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ An error occurred.");
    }
  };

  return (
    <>
      <script src="https://www.google.com/recaptcha/api.js?render=6LfIuAUrAAAAAH1bMnYN7tuYogCIpZvcgo_ZpKkK" />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 rounded bg-black text-white border border-gray-600"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full p-3 rounded bg-black text-white border border-gray-600"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          rows={6}
          className="w-full p-3 rounded bg-black text-white border border-gray-600"
        />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
          Send Message
        </Button>
        {status && <p className="text-sm text-center mt-2">{status}</p>}
      </form>
    </>
  );
}
