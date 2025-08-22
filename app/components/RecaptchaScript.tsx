// app/components/RecaptchaScript.tsx
"use client";
import Script from "next/script";

export default function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
      />
      {/* fire όταν το API γίνει ready */}
      <Script id="recaptcha-ready" strategy="afterInteractive">
        {`
          if (window.grecaptcha && window.grecaptcha.ready) {
            window.grecaptcha.ready(function(){ window.__greReady = true; });
          }
        `}
      </Script>
    </>
  );
}
