"use client";
import Script from "next/script";

declare global {
  interface Window { grecaptcha?: any; grecaptchaReady?: () => void; }
}

export default function RecaptchaScript() {
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      strategy="afterInteractive"
      onLoad={() => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            if (window.grecaptchaReady) window.grecaptchaReady();
          });
        }
      }}
    />
  );
}
