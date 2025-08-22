// lib/recaptcha.ts
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function loadScript(src: string) {
  return new Promise<void>((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src; s.async = true;
    s.onload = () => res();
    s.onerror = () => rej(new Error("reCAPTCHA script load failed"));
    document.head.appendChild(s);
  });
}

async function ensureGrecaptcha(timeoutMs = 10000) {
  if (!SITE_KEY) throw new Error("Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY");
  if (!(window as any).grecaptcha)
    await loadScript(`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`);

  const start = Date.now();
  while (!((window as any).grecaptcha?.ready && (window as any).grecaptcha?.execute)) {
    if (Date.now() - start > timeoutMs) throw new Error("reCAPTCHA not ready");
    await new Promise(r => setTimeout(r, 100));
  }
  return (window as any).grecaptcha;
}

export async function getRecaptchaToken(action: string): Promise<string> {
  const g = await ensureGrecaptcha();
  return new Promise<string>((resolve, reject) => {
    g.ready(() => g.execute(SITE_KEY, { action }).then(resolve).catch(reject));
  });
}
