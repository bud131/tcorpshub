import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend("re_aiFZnMUG_2uyZcoBx66FXQKC7Qti5ivBn");

console.log("✅ route.ts with Resend loaded");

export async function POST(req: Request) {
  console.log("📩 New form submission received!");

  try {
    const { name, email, message } = await req.json();
    console.log("🧾 Form Data:", { name, email, message });

    if (!name || !email || !message) {
      console.warn("❗ Missing fields in submission");
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Tcorps Contact <contact@tcorpshub.com>",
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
    console.error("❌ Resend email error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to send email" }, { status: 500 });
  }
}
