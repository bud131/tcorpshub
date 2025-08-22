// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const json = (status: number, body: any) => NextResponse.json(body, { status });

export async function POST(req: Request) {
  try {
    const { name, email, message, token, action } = await req.json();

    if (!name || !email || !message) return json(400, { ok: false, error: "Missing fields" });

    // reCAPTCHA verify
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    }).then(r => r.json());

    if (!verify?.success || (typeof verify.score === "number" && verify.score < 0.5))
      return json(400, { ok: false, error: "reCAPTCHA failed", details: verify });

    // SMTP (Hostinger 465/SSL)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Tcorps Hub" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New contact (${action || "contact"}) from ${name}`,
      text: message,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6">
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
             </div>`,
    });

    return json(200, { ok: true });
  } catch (e: any) {
    console.error("CONTACT API error:", e?.message || e);
    return json(500, { ok: false, error: "Server error" });
  }
}
