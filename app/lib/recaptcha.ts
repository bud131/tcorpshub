// lib/recaptcha.ts
export async function ensureRecaptchaReady(timeoutMs = 8000) {
  const start = Date.now();
  while (!((window as any).__greReady && (window as any).grecaptcha?.execute)) {
    if (Date.now() - start > timeoutMs) throw new Error("reCAPTCHA not ready");
    await new Promise(r => setTimeout(r, 100));
  }
}
