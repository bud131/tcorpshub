// lib/recaptcha.ts
export async function ensureRecaptchaReady(timeoutMs = 8000) {
  const start = Date.now();
  while (
    !(window as any).grecaptcha?.execute &&
    Date.now() - start < timeoutMs
  ) {
    await new Promise((r) => setTimeout(r, 100));
  }
  if (!(window as any).grecaptcha?.execute) {
    throw new Error("reCAPTCHA not ready");
  }
}
