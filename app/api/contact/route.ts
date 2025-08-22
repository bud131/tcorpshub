// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true, // 465 -> SSL
      auth: {
        user: process.env.SMTP_USER, // info@tcorpshub.com
        pass: process.env.SMTP_PASS, // Hostinger email password
      },
    });

    const to = process.env.CONTACT_TO || process.env.SMTP_USER; // π.χ. ίδιο το info@tcorpshub.com
    const from = `"Tcorps Hub" <${process.env.SMTP_USER}>`;

    await transporter.sendMail({
      from,
      to,
      subject: `New contact from ${name} (${email})`,
      replyTo: email,
      text: message,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Contact send error:", err);
    return NextResponse.json({ ok: false, error: "Send failed" }, { status: 500 });
  }
}
