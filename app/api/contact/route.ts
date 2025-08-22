// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function json(status: number, body: any) {
  return NextResponse.json(body, { status });
}

export async function POST(req: Request) {
  try {
    const { name, email, message, recaptchaToken, action = "contact" } = await req.json();

    if (!name || !email || !message) return json(400, { ok: false, error: "Missing fields" });
    if (!recaptchaToken) return json(400, { ok: false, error: "Missing reCAPTCHA token" });

    // 1) Verify reCAPTCHA v3
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const verify = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: recaptchaToken }),
    }).then(r => r.json());

    if (!verify?.success || (verify.action && verify.action !== action) || (typeof verify.score === "number" && verify.score < 0.5)) {
      return json(400, { ok: false, error: "reCAPTCHA failed", details: verify });
    }

    // 2) SMTP send (tries 465 SSL, then 587 STARTTLS)
    const base = {
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 15_000,
    };

    async function send(secure: boolean, port: number) {
      const transporter = nodemailer.createTransport({ ...base, secure, port });
      // must use the authenticated mailbox as "from"
      const from = `"Tcorps Hub" <${process.env.SMTP_USER}>`;
      const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
      return transporter.sendMail({
        from,
        to,
        subject: `New contact from ${name} (${email})`,
        replyTo: email,
        text: message,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.6">
                 <h2>New Contact Message</h2>
                 <p><strong>Name:</strong> ${name}</p>
                 <p><strong>Email:</strong> ${email}</p>
                 <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
               </div>`,
      });
    }

    try {
      await send(true, Number(process.env.SMTP_PORT || 465));   // 465 SSL
    } catch (e1: any) {
      try {
        await send(false, 587);                                  // fallback 587 STARTTLS
      } catch (e2: any) {
        // log full errors to Vercel logs
        console.error("SMTP error 465:", e1?.message || e1);
        console.error("SMTP error 587:", e2?.message || e2);
        return json(500, { ok: false, error: "SMTP failed" });
      }
    }

    return json(200, { ok: true });
  } catch (err: any) {
    console.error("CONTACT API error:", err?.message || err);
    return json(500, { ok: false, error: "Server error" });
  }
}
