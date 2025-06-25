import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend("re_aiFZnMUG_2uyZcoBx66FXQKC7Qti5ivBn");
const RECAPTCHA_SECRET = "6LfIuAUrAAAAANK5tx7x05DPqr-C92BuMKk7MkPn";

export async function POST(req: Request) {
  console.log("📩 New form submission received!");

  try {
    const { name, email, message, token } = await req.json();
    console.log("🧾 Form Data:", { name, email, message });

    if (!name || !email || !message || !token) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // 🛡️ Verify reCAPTCHA token
    const verifyRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${RECAPTCHA_SECRET}&response=${token}`,
    });

    const verifyData = await verifyRes.json();
    console.log("🔍 reCAPTCHA score:", verifyData);

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ success: false, error: "reCAPTCHA failed" }, { status: 403 });
    }

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

    console.log("✅ Email sent via Resend.");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed" }, { status: 500 });
  }
}
