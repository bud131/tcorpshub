// app/api/recaptcha/verify/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, action } = await req.json();
  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const body = new URLSearchParams({ secret, response: token });

  const r = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body,
  });
  const data = await r.json();

  const ok =
    data.success === true &&
    (data.action ? data.action === action : true) &&
    (typeof data.score === "number" ? data.score >= 0.5 : true);

  return NextResponse.json({ ok, data }, { status: ok ? 200 : 400 });
}
