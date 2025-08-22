// app/components/RecaptchaScript.tsx
import Script from "next/script";

declare global {
  interface Window {
    grecaptchaReady?: () => void;
    grecaptcha?: any;
  }
}

export default function RecaptchaScript() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!;
  return (
    <>
      {/* Promise so the app μπορεί να "περιμένει" το grecaptcha */}
      <Script id="recaptcha-ready" strategy="afterInteractive">
        {`(function(){
           const w = window as any;
           if (!w.__grecaptchaPromise) {
             w.__grecaptchaPromise = new Promise<void>(res => w.grecaptchaReady = res);
           }
         })();`}
      </Script>

      {/* Φόρτωση reCAPTCHA v3 */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
        strategy="afterInteractive"
        onLoad={() => window.grecaptchaReady && window.grecaptchaReady()}
      />
    </>
  );
}
