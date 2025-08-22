// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const ok = (b:any)=>NextResponse.json(b,{status:200});
const bad=(s:number,b:any)=>NextResponse.json(b,{status:s});

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();
    if (!name || !email || !message) return bad(400,{ok:false,error:"Missing fields"});

    // reCAPTCHA
    const secret = process.env.RECAPTCHA_SECRET_KEY!;
    const vr = await fetch("https://www.google.com/recaptcha/api/siteverify",{
      method:"POST",
      headers:{ "Content-Type":"application/x-www-form-urlencoded" },
      body:new URLSearchParams({ secret, response: token }),
    }).then(r=>r.json());
    if (!vr?.success || (typeof vr.score==="number" && vr.score<0.5))
      return bad(400,{ok:false,error:"reCAPTCHA failed",details:vr});

    // SMTP (Hostinger 465/SSL)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.hostinger.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      logger: true, // <-- γράφει αναλυτικά στα Function logs
    });

    await transporter.verify().then(()=>console.log("SMTP ready"));

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,                // ίδια με auth user
      sender: process.env.SMTP_USER,
      to: process.env.CONTACT_TO,                 // κύριος παραλήπτης
      bcc: process.env.SMTP_USER,                 // για να βλέπεις αν έφυγε
      replyTo: email,
      subject: `New contact from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message.replace(/\n/g,"<br/>")}</p>`,
      headers: { "List-Unsubscribe": `<mailto:${process.env.SMTP_USER}>` },
    });

    console.log("MAIL result:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });

    return ok({ ok: true, id: info.messageId, accepted: info.accepted, rejected: info.rejected });
  } catch (e:any) {
    console.error("CONTACT API error:", e?.message || e);
    return bad(500,{ ok:false, error:"Server error" });
  }
}
