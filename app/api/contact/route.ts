import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend("re_aiFZnMUG_2uyZcoBx66FXQKC7Qti5ivBn");
const RECAPTCHA_SECRET = "6LfIuAUrAAAAANK5tx7x05DPqr-C92BuMKk7MkPn";

export async function POST(req: Request) {
  console.log("📩 New form submission received!");

  try {
    const body = await req.json();
    const { name, email, message, token } = body;

    console.log("🧾 Parsed body:", body);

    if (!name || !email || !message || !token) {
      console.warn("⚠️ Missing one or more required fields.");
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    console.log("🔐 Verifying reCAPTCHA token:", token);

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    });

    const verifyData = await verifyRes.json();
    console.log("✅ reCAPTCHA verification result:", verifyData);

    if (!verifyData.success || verifyData.score < 0.5) {
      console.warn("❌ reCAPTCHA check failed or low score:", verifyData.score);
      return NextResponse.json({ success: false, error: "reCAPTCHA failed" }, { status: 403 });
    }

    console.log("📨 Sending email via Resend...");
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tcorps.eu@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("✅ Email successfully sent.");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ success: false, error: err.message || "Unknown error" }, { status: 500 });
  }
}
