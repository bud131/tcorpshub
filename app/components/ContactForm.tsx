"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // send form data here
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black border border-gray-600 rounded"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-black border border-gray-600 rounded"
        />
      </div>
      <input
        type="email"
        name="email"
        placeholder="Email *"
        required
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 bg-black border border-gray-600 rounded"
      />
      <textarea
        name="message"
        placeholder="Your Message *"
        required
        value={form.message}
        onChange={handleChange}
        className="w-full px-4 py-2 h-32 bg-black border border-gray-600 rounded resize-none"
      />
      <div className="pt-4 flex justify-center">
      <div className="g-recaptcha" data-sitekey="YOUR_RECAPTCHA_SITE_KEY" />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
      >
        Submit Form
      </button>
    </form>
  );
}
