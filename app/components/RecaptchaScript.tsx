// app/components/RecaptchaScript.tsx
"use client";
import Script from "next/script";

declare global {
  interface Window {
    grecaptchaReady?: () => void;
    __grecaptchaPromise?: Promise<void>;
    __grecaptchaResolve?: () => void;
    grecaptcha?: any;
  }
}

export default function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  return (
    <>
      {/* Promise για να περιμένουμε το grecaptcha */}
      <Script id="recaptcha-ready" strategy="afterInteractive">
        {`
          (function () {
            const w = window as any;
            if (!w.__grecaptchaPromise) {
              w.__grecaptchaPromise = new Promise<void>(res => (w.__grecaptchaResolve = res));
              w.grecaptchaReady = () => w.__grecaptchaResolve && w.__grecaptchaResolve();
            }
          })();
        `}
      </Script>

      {/* Φόρτωση reCAPTCHA v3 */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />

      {/* Όταν είναι έτοιμο το API, κάνε resolve με grecaptcha.ready */}
      <Script id="recaptcha-init" strategy="afterInteractive">
        {`
          (function () {
            if (window.grecaptcha && window.grecaptcha.ready) {
              window.grecaptcha.ready(function () {
                if (window.grecaptchaReady) window.grecaptchaReady();
              });
            }
          })();
        `}
      </Script>
    </>
  );
}
