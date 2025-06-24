"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const name = `${firstName} ${lastName}`;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Your message has been sent successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        alert("❌ Failed to send message. " + (data.error || "Please try again later."));
      }
    } catch (err) {
      console.error(err);
      alert("❌ An error occurred while sending your message.");
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="px-4 py-2 rounded-md bg-black border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="px-4 py-2 rounded-md bg-black border border-gray-600"
          required
        />
      </div>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 rounded-md bg-black border border-gray-600"
        required
      />
      <textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={6}
        className="w-full px-4 py-2 rounded-md bg-black border border-gray-600"
        required
      />
      <Button type="submit" disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700">
        {submitting ? "Sending..." : "Submit"}
      </Button>
    </form>
  );
}
