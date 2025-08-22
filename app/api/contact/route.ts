import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function json(status: number, body: any) { return NextResponse.json(body, { status }); }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, company } = body;
    const recaptcha = body.token || body.recaptchaToken;

    if (company) return json(200, { ok: true }); // honeypot: κάνε silent success
    if (!name || !email || !message) return json(400, { ok: false, error: "Missing fields" });
    if (!recaptcha) return json(400, { ok: false, error: "Missing reCAPTCHA token" });

    // reCAPTCHA verify
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: recaptcha }),
    }).then(r => r.json());

    if (!verify?.success || (typeof verify.score === "number" && verify.score < 0.5))
      return json(400, { ok: false, error: "reCAPTCHA failed", details: verify });

    // SMTP (Hostinger 465 SSL)
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
      subject: `New contact from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br/>${String(message).replace(/\n/g,"<br/>")}</p>`,
    });

    return json(200, { ok: true });
  } catch (e: any) {
    console.error("CONTACT API error:", e?.message || e);
    return json(500, { ok: false, error: "Server error" });
  }
}
