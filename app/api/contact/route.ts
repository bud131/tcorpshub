import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

console.log("✅ route.ts loaded");

export async function POST(req: Request) {
  console.log("📩 New form submission received!");

  try {
    const { name, email, message } = await req.json();
    console.log("🧾 Form Data:", { name, email, message });

    if (!name || !email || !message) {
      console.warn("❗ Missing fields in submission");
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    console.log("📨 Sending email...");

    await transporter.sendMail({
      from: `"TcorpsHub Contact" <${process.env.GMAIL_USER}>`,
      to: "tcorps.eu@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    console.log("✅ Email sent successfully.");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("❌ Email sending error:", err);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
