// lib/recaptcha.ts
export async function ensureRecaptchaReady() {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.grecaptcha?.execute) return;
  await w.__grecaptchaPromise; // ορίζεται στο RecaptchaScript
}
