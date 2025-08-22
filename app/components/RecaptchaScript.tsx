// app/components/RecaptchaScript.tsx
"use client"; // κάνε το client component

import Script from "next/script";

declare global {
  interface Window {
    grecaptchaReady?: () => void;
    grecaptcha?: any;
    __grecaptchaPromise?: Promise<void>;
  }
}

export default function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;

  return (
    <>
      {/* Promise so the app can await grecaptcha */}
      <Script id="recaptcha-ready" strategy="afterInteractive">
        {`
          (function(){
            const w = window;
            if (!w.__grecaptchaPromise) {
              w.__grecaptchaPromise = new Promise(res => w.grecaptchaReady = res);
            }
          })();
        `}
      </Script>

      {/* Load reCAPTCHA v3 */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />

      {/* Trigger the ready callback once loaded */}
      <Script id="recaptcha-onload" strategy="afterInteractive">
        {`
          if (window.grecaptchaReady) {
            window.grecaptchaReady();
          }
        `}
      </Script>
    </>
  );
}
