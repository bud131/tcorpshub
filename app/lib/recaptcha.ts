// lib/recaptcha.ts
export function getRecaptchaToken(action: string, timeoutMs = 10000): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const g = (window as any).grecaptcha;
      if (g?.ready && g?.execute) {
        g.ready(() => {
          g.execute(siteKey, { action }).then(resolve).catch(reject);
        });
        return;
      }
      if (Date.now() - start > timeoutMs) return reject(new Error("reCAPTCHA not ready"));
      setTimeout(tick, 100);
    };
    tick();
  });
}
